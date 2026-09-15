<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-panel glass-panel">
      <div class="modal-header">
        <h3>{{ title }}</h3>
        <button class="btn-close" @click="$emit('close')"><X :size="16" /></button>
      </div>
      <div class="modal-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next';
defineProps<{ isOpen: boolean; title: string }>();
defineEmits(['close']);
</script>

<style scoped>
.modal-overlay { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.65); backdrop-filter: blur(4px); z-index: 100; display: flex; align-items: center; justify-content: center; }
.modal-panel { width: 100%; max-width: 480px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1.25rem; animation: popIn 0.2s ease-out; }
@keyframes popIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
.modal-header { display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem; margin-bottom: 1rem; }
.modal-header h3 { font-size: 1rem; font-weight: 700; color: var(--text-main); }
.btn-close { background: transparent; border: none; color: var(--text-subtle); cursor: pointer; padding: 0.2rem; border-radius: 4px; }
.btn-close:hover { color: var(--text-main); background: rgba(255,255,255,0.08); }
</style>
