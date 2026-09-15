<template>
  <div class="crm-card glass-panel" :class="{ hoverable }" @click="$emit('click', $event)">
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ hoverable?: boolean }>(), { hoverable: false });
defineEmits(['click']);
</script>

<style scoped>
.crm-card { padding: 1.25rem; border-radius: var(--radius-md); background: var(--bg-card); border: 1px solid var(--border-subtle); transition: all 0.2s ease; }
.crm-card.hoverable:hover { border-color: rgba(99, 102, 241, 0.4); transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.3); cursor: pointer; }
</style>
