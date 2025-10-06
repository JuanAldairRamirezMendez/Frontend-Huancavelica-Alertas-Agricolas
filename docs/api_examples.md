# Ejemplos de API y modelos de BD

Este documento contiene ejemplos de endpoints REST, cuerpos de request/response y esquemas de base de datos recomendados para la plataforma de alertas agrícolas. Úsalo como contrato API / guía para implementar backend.

Base: `/api/v1`
Formato de fechas: ISO 8601 (UTC), ej. `2025-10-06T03:00:00Z`
Autenticación: Bearer JWT (Authorization: Bearer <token>)
Content-Type: `application/json`

---

## 1. Auth / Users

### POST /api/v1/auth/register
Request
```json
{
  "phone": "+51987654321",
  "password": "password123",
  "name": "Juan Perez"
}
```
Response 201
```json
{
  "id": "user_abc123",
  "phone": "+51987654321",
  "name": "Juan Perez",
  "createdAt": "2025-10-06T03:00:00Z"
}
```

---

### POST /api/v1/auth/login
Request
```json
{ "phone": "+51987654321", "password": "password123" }
```
Response 200
```json
{
  "token": "<jwt>",
  "refreshToken": "<refresh>",
  "user": { "id":"user_abc123","phone":"+51987654321","name":"Juan Perez" }
}
```

---

### GET /api/v1/users/me
Headers: `Authorization: Bearer <token>`
Response 200
```json
{
  "id": "user_abc123",
  "phone": "+51987654321",
  "name": "Juan Perez",
  "location": "Huancavelica Centro",
  "notifications": { "sms": true, "telegram": false, "email": false },
  "createdAt": "2025-10-06T03:00:00Z"
}
```

DB - tabla `users` (Postgres)
```sql
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone varchar(20) UNIQUE NOT NULL,
  password_hash varchar NOT NULL,
  name varchar,
  location varchar,
  notifications_sms boolean DEFAULT true,
  notifications_telegram boolean DEFAULT false,
  notifications_email boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz
);
```

---

## 2. Reports (Temperature data) — endpoints claves

### GET /api/v1/reports/:id
Response 200 (ejemplo)
```json
{
  "id": "rpt_123",
  "userId": "user_abc123",
  "cropType": "papa",
  "dateRange": { "start": "2025-09-01T00:00:00Z", "end": "2025-09-07T23:59:59Z" },
  "temperatureData": [
    { "date": "2025-09-01T03:00:00Z", "temperature": 2.1, "hasAlert": false },
    { "date": "2025-09-02T03:00:00Z", "temperature": -1.4, "hasAlert": true, "severity": "alto" }
  ],
  "alertsCount": { "alto": 1, "medio": 0, "bajo": 0 }
}
```

### POST /api/v1/reports
Crea un reporte (ingesta en bloque)
Request
```json
{
  "userId": "user_abc123",
  "cropType": "papa",
  "dateRange": { "start": "2025-09-01T00:00:00Z", "end": "2025-09-07T23:59:59Z" },
  "temperatureData": [ { "date":"2025-09-01T03:00:00Z", "temperature":2.1 }, ... ]
}
```
Response 201
```json
{ "id": "rpt_123", "message": "Report created" }
```

DB - `reports` y `temperature_points` (Postgres)
```sql
CREATE TABLE reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  crop_type varchar NOT NULL,
  start_at timestamptz,
  end_at timestamptz,
  alerts_alto int DEFAULT 0,
  alerts_medio int DEFAULT 0,
  alerts_bajo int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz
);

CREATE TABLE temperature_points (
  id bigserial PRIMARY KEY,
  report_id uuid REFERENCES reports(id) ON DELETE CASCADE,
  ts timestamptz NOT NULL,
  temperature numeric(5,2) NOT NULL,
  has_alert boolean DEFAULT false,
  alert_severity smallint NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(report_id, ts)
);
-- Índices
CREATE INDEX idx_temperature_points_report_ts ON temperature_points(report_id, ts);
```

Notas: Para series grandes usar TimescaleDB (hypertable) o una TSDB (InfluxDB) para mejor escalabilidad.

---

## 3. Alerts (incidentes)

### POST /api/v1/alerts
Request (backend-generated)
```json
{
  "reportId": "rpt_123",
  "userId": "user_abc123",
  "ts": "2025-09-02T03:00:00Z",
  "type": "temperature",
  "severity": "alto",
  "title": "Helada detectada",
  "description": "Temperatura -1.4°C registrada"
}
```
Response 201
```json
{ "id": "alert_1", "status": "created" }
```

DB - `alerts`
```sql
CREATE TABLE alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id uuid REFERENCES reports(id),
  user_id uuid REFERENCES users(id) NOT NULL,
  ts timestamptz NOT NULL,
  type varchar NOT NULL,
  severity smallint NOT NULL,
  title varchar NOT NULL,
  description text,
  status varchar DEFAULT 'active',
  resolved_at timestamptz NULL,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX idx_alerts_user_ts ON alerts(user_id, ts DESC);
```

---

## 4. Crops / user-crops

### POST /api/v1/user-crops
```json
{ "userId":"user_abc123", "cropType":"papa", "areaHa": 1.2, "location":"-12.75,-74.95" }
```
Response 201
```json
{ "id":"ucrop_1", "message":"Created" }
```

DB - `user_crops`
```sql
CREATE TABLE user_crops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  crop_type varchar,
  area_ha numeric,
  location_geo varchar,
  planted_at date,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);
```

---

## 5. Recommendations

### GET /api/v1/recommendations?userId=...
Response
```json
[
  { "id":"rec_1", "title":"Cubrir cultivo por helada", "body":"Cubra con fibra...", "severity":"alto", "relatedCrop":"papa", "is_read": false }
]
```

DB - `recommendations`
```sql
CREATE TABLE recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  title varchar,
  body text,
  severity smallint,
  related_crop_id uuid NULL,
  related_alert_id uuid NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
```

---

## 6. Notifications / devices

### POST /api/v1/devices
Registra un token de push / telegram para envíos
```json
{ "userId":"user_abc123", "platform":"android", "token":"abcdef" }
```

DB - `devices` y `notification_logs`
```sql
CREATE TABLE devices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  platform varchar,
  token text,
  last_seen timestamptz DEFAULT now()
);

CREATE TABLE notification_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  channel varchar,
  status varchar,
  payload jsonb,
  sent_at timestamptz DEFAULT now()
);
```

---

## 7. Ejemplo completo de response para `TemperatureChart` (lista mínima)

GET /api/v1/reports/rpt_123
```json
{
  "id":"rpt_123",
  "cropType":"papa",
  "dateRange": { "start":"2025-09-01T00:00:00Z", "end":"2025-09-07T23:59:59Z" },
  "temperatureData":[
    { "date":"2025-09-01T03:00:00Z","temperature":2.1,"hasAlert":false },
    { "date":"2025-09-02T03:00:00Z","temperature":-1.4,"hasAlert":true, "severity":"alto" }
  ],
  "alertsCount": { "alto": 1, "medio": 0, "bajo": 0 }
}
```

---

## 8. Recomendaciones operativas rápidas
- Usar `import.meta.env.VITE_API_BASE` para la URL base en Vite.
- Para series largas usar TimescaleDB o InfluxDB; para consultas rápidas almacenar resúmenes diarios en `reports`.
- Validar payloads con JSON Schema (AJV) o Zod.
- Proteger endpoints con rate-limiting y CORS.

---

Si quieres, genero ahora el OpenAPI (YAML) con los endpoints críticos (`auth`, `reports`, `alerts`) listo para importar en Swagger / Postman. Indícame si lo quieres en YAML o JSON y lo creo en `docs/openapi.{yml,json}`.
