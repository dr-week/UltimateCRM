<template>
  <div class="sidebar-footer">
    <div class="user-avatar">AM</div>
    <div v-if="!store.isSidebarCollapsed" class="user-info">
      <span class="user-name">Alex Mercer</span>
      <span class="user-role">Sales Director</span>
    </div>
    <button @click="store.isSettingsOpen = true" class="btn-settings" title="CRM Settings">
      <Settings :size="16" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useCrmStore } from '@/stores/crmStore';
import { Settings } from 'lucide-vue-next';

const store = useCrmStore();
</script>

<style scoped>
.sidebar-footer { padding: 0.75rem; border-top: 1px solid var(--border-subtle); display: flex; align-items: center; gap: 0.6rem; }
.user-avatar { width: 32px; height: 32px; border-radius: 50%; background: var(--accent-primary); color: #fff; font-size: 0.75rem; font-weight: 700; display: flex; align-items: center; justify-content: center; }
.user-info { display: flex; flex-direction: column; flex: 1; overflow: hidden; }
.user-name { font-size: 0.8rem; font-weight: 600; color: var(--text-main); white-space: nowrap; }
.user-role { font-size: 0.68rem; color: var(--text-subtle); }
.btn-settings { background: transparent; border: none; color: var(--text-subtle); cursor: pointer; padding: 0.35rem; border-radius: 4px; }
.btn-settings:hover { color: var(--text-main); background: rgba(255,255,255,0.08); }
</style>
