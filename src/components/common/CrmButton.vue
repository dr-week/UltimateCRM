<template>
  <button 
    class="crm-btn" 
    :class="[variant, { iconOnly }]" 
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  disabled?: boolean;
  iconOnly?: boolean;
}>(), {
  variant: 'primary',
  disabled: false,
  iconOnly: false
});

defineEmits(['click']);
</script>

<style scoped>
.crm-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem; padding: 0.45rem 0.9rem; border-radius: 6px; font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.15s ease; border: none; }
.crm-btn.iconOnly { padding: 0.4rem; }
.crm-btn.primary { background: linear-gradient(135deg, var(--accent-primary), #8b5cf6); color: #fff; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25); }
.crm-btn.primary:hover { opacity: 0.92; transform: translateY(-1px); }
.crm-btn.secondary { background: rgba(255, 255, 255, 0.04); border: 1px solid var(--border-subtle); color: var(--text-muted); }
.crm-btn.secondary:hover { color: var(--text-main); border-color: rgba(255, 255, 255, 0.2); }
.crm-btn.ghost { background: transparent; color: var(--text-subtle); }
.crm-btn.ghost:hover { color: var(--text-main); background: rgba(255, 255, 255, 0.05); }
.crm-btn.danger { background: rgba(251, 113, 133, 0.15); border: 1px solid rgba(251, 113, 133, 0.3); color: #fb7185; }
.crm-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
</style>
