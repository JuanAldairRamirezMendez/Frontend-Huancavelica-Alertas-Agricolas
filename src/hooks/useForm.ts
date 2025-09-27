import { useState, useEffect } from 'react';
import { FormData } from '../types/form';

export const useForm = (initialState: FormData) => {
  const [form, setForm] = useState<FormData>(initialState);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState('');

  useEffect(() => {
    localStorage.setItem('agriculturalForm', JSON.stringify(form));
  }, [form]);

  useEffect(() => {
    const savedForm = localStorage.getItem('agriculturalForm');
    if (savedForm) {
      setForm(JSON.parse(savedForm));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === 'cultivos' || name === 'medio_alerta') {
        setForm(prev => ({
          ...prev,
          [name]: checked
            ? [...(prev[name as keyof FormData] as string[]), value]
            : (prev[name as keyof FormData] as string[]).filter(v => v !== value)
        }));
      }
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
      if (value && !form[name as keyof FormData]) {
        setShowSuccessAnimation(name);
        setTimeout(() => setShowSuccessAnimation(''), 1500);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      window.location.href = '/login';
    }, 3000);
  };

  return {
    form,
    setForm,
    isSubmitted,
    showSuccessAnimation,
    handleChange,
    handleSubmit
  };
};
