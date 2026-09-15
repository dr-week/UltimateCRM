import { ref } from 'vue';

export interface ToastAlert {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

const toasts = ref<ToastAlert[]>([]);

export function useToast() {
  function notify(message: string, type: 'success' | 'info' | 'warning' = 'success') {
    const id = `toast-${Date.now()}`;
    toasts.value.push({ id, message, type });
    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id);
    }, 3200);
  }

  return { toasts, notify };
}
