<template>
  <div class="sidebar-header">
    <div class="logo-area" @click="store.activeNav = 'kanban'">
      <div class="logo-icon">⚡</div>
      <div v-if="!store.isSidebarCollapsed" class="logo-text">
        <span class="app-name">CRM</span>
        <span class="tenant-name">Ultimate CRM</span>
      </div>
    </div>
    <button class="btn-collapse" @click="store.isSidebarCollapsed = !store.isSidebarCollapsed">
      <ChevronLeft v-if="!store.isSidebarCollapsed" :size="16" />
      <ChevronRight v-else :size="16" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useCrmStore } from '@/stores/crmStore';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';

const store = useCrmStore();
</script>

<style scoped>
.sidebar-header { padding: 1rem; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); }
.logo-area { display: flex; align-items: center; gap: 0.6rem; cursor: pointer; }
.logo-icon { width: 32px; height: 32px; border-radius: 8px; background: linear-gradient(135deg, var(--accent-primary), #8b5cf6); display: flex; align-items: center; justify-content: center; font-size: 1rem; }
.logo-text { display: flex; flex-direction: column; }
.app-name { font-size: 0.9rem; font-weight: 700; color: var(--text-main); }
.tenant-name { font-size: 0.7rem; color: var(--text-subtle); }
.btn-collapse { background: transparent; border: none; color: var(--text-subtle); cursor: pointer; padding: 0.25rem; border-radius: 4px; }
.btn-collapse:hover { color: var(--text-main); background: rgba(255,255,255,0.05); }
</style>
