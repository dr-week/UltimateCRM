<template>
  <div class="toast-container">
    <transition-group name="toast-slide">
      <div 
        v-for="toast in toasts" 
        :key="toast.id" 
        :class="['toast-item', 'glass-panel', toast.type]"
      >
        <div class="toast-icon">
          <CheckCircle2 v-if="toast.type === 'success'" :size="16" />
          <Info v-else-if="toast.type === 'info'" :size="16" />
          <AlertCircle v-else :size="16" />
        </div>
        <div class="toast-message">{{ toast.message }}</div>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '@/composables/useToast';
import { CheckCircle2, Info, AlertCircle } from 'lucide-vue-next';

const { toasts, notify } = useToast();

defineExpose({ addToast: notify });
</script>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 200;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  pointer-events: none;
}

.toast-item {
  pointer-events: auto;
  padding: 0.75rem 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-main);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  border-radius: var(--radius-md);
  min-width: 260px;
}

.toast-item.success {
  border-color: rgba(16, 185, 129, 0.4);
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
}

.toast-item.info {
  border-color: rgba(99, 102, 241, 0.4);
  background: rgba(99, 102, 241, 0.15);
  color: #818cf8;
}

.toast-item.warning {
  border-color: rgba(245, 158, 11, 0.4);
  background: rgba(245, 158, 11, 0.15);
  color: #fbbf24;
}

.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.3s ease;
}

.toast-slide-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.toast-slide-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>
