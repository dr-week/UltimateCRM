<template>
  <div class="view-toggle">
    <button 
      @click="$emit('update:viewMode', 'kanban')" 
      :class="['toggle-btn', { active: viewMode === 'kanban' }]"
      title="Kanban Board View"
    >
      <Kanban :size="18" />
    </button>
    <button 
      @click="$emit('update:viewMode', 'table')" 
      :class="['toggle-btn', { active: viewMode === 'table' }]"
      title="Table Contacts View"
    >
      <Table :size="18" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Kanban, Table } from 'lucide-vue-next';

defineProps<{ viewMode: 'kanban' | 'table' }>();
defineEmits(['update:viewMode']);
</script>

<style scoped>
.view-toggle {
  display: flex;
  background: rgba(11, 15, 23, 0.6);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 3px;
}

.toggle-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  padding: 0.4rem 0.6rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.toggle-btn.active {
  background: var(--accent-primary);
  color: #ffffff;
}
</style>
