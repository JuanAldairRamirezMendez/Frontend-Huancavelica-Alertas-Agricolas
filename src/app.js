// Simulación de datos de usuario y alertas
const userData = {
    name: 'Juan',
    lastName: 'Pérez',
    location: 'Acobamba, Huancavelica',
    // ... otros datos del usuario
};

// Función para mostrar una pantalla y ocultar las demás
function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    const activeScreen = document.getElementById(screenId);
    if (activeScreen) {
        activeScreen.classList.add('active');
    }
}

// Función para renderizar el dashboard
function renderDashboard() {
    // Aquí podrías usar los datos de userData para personalizar el saludo
    // Por ahora, es estático
    showScreen('dashboard');
}

// Función para mostrar la pantalla de alertas
function renderAlerts() {
    // Aquí podrías cargar y mostrar una lista de alertas
    showScreen('alerts');
}

// Función para mostrar detalles de alerta
function showAlertDetail(alertId) {
    // Aquí podrías cargar datos específicos de la alerta según el ID
    showScreen('alert-detail');
}

// Función para compartir alerta
function shareAlert() {
    // Simular compartir por Telegram
    alert('Función de compartir por Telegram simulada. En una app real, esto abriría Telegram con el mensaje de la alerta.');
}

// --- NUEVA FUNCIÓN DE LOGIN ---
function login() {
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value; // La contraseña es el DNI

    if (!phone || !password) {
        alert('Por favor, ingrese su número de teléfono y DNI.');
        return;
    }

    // 1. Obtener los datos del formulario guardados en el navegador
    const savedFormData = localStorage.getItem('agriculturalForm');

    if (!savedFormData) {
        alert('No se encontraron datos de registro. Por favor, regístrese primero.');
        return;
    }

    const userData = JSON.parse(savedFormData);

    // 2. Verificar si el teléfono y el DNI (contraseña) coinciden
    if (phone === userData.telefono && password === userData.dni) {
        // 3. Si coinciden, personalizar el dashboard y mostrarlo
        const userNameElement = document.querySelector('#dashboard .user-name');
        if (userNameElement) {
            // Mostramos solo el primer nombre
            userNameElement.textContent = userData.nombre.split(' ')[0];
        }
        showScreen('dashboard');
    } else {
        // 4. Si no coinciden, mostrar error
        alert('El número de teléfono o DNI son incorrectos.');
    }
}


// Inicialización cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Aquí puedes agregar cualquier inicialización adicional necesaria
    
    // Ejemplo: Manejar el botón de retroceso en el detalle de alertas
    const backButtons = document.querySelectorAll('.nav-back');
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Determinar a qué pantalla regresar basado en el contexto
            const currentScreen = document.querySelector('.screen.active').id;
            
            if (currentScreen === 'alert-detail') {
                showScreen('alerts');
            } else {
                showScreen('dashboard');
            }
        });
    });
    
    // Ejemplo: Cambiar el tipo de alerta principal basado en condiciones simuladas
    const mainAlert = document.getElementById('mainAlert');
    const alertTypes = [
        { type: 'frost', text: 'Alerta de Helada Severa' },
        { type: 'rain', text: 'Alerta de Lluvia Intensa' },
        { type: 'wind', text: 'Alerta de Vientos Fuertes' }
    ];
    let currentAlertType = 0;
    
    if (mainAlert) {
        setInterval(() => {
            currentAlertType = (currentAlertType + 1) % alertTypes.length;
            mainAlert.className = 'main-alert-card'; // Reset class
            mainAlert.classList.add(alertTypes[currentAlertType].type);
            mainAlert.querySelector('h2').textContent = alertTypes[currentAlertType].text;
        }, 5000); // Cambia cada 5 segundos
    }

    // Navegación principal (footer)
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const screen = this.getAttribute('data-screen');
            if (screen) {
                // Quitar clase 'active' de todos los items
                navItems.forEach(i => i.classList.remove('active'));
                // Agregar clase 'active' al item clickeado
                this.classList.add('active');
                showScreen(screen);
    
                // Casos especiales para botones que no son pantallas
                if (screen === 'new-report') {
                    alert('Función para crear nuevo reporte aún no implementada.');
                    // Prevenir que se quede en un estado "activo" sin pantalla
                    this.classList.remove('active');
                    // Opcional: regresar a la pantalla anterior o al dashboard
                    showScreen('dashboard'); 
                    document.querySelector('.nav-item[data-screen="dashboard"]').classList.add('active');
                }
            }
        });
    });

    // Estado inicial: mostrar pantalla de login y activar el ícono correspondiente
    showScreen('login');
    // Ningún ícono del footer activo en la pantalla de login.
});