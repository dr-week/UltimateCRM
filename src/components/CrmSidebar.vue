<template>
  <aside class="sidebar" :class="{ collapsed: store.isSidebarCollapsed }">
    <CrmSidebarHeader />
    <CrmSidebarNav />
    <CrmSidebarFooter />
  </aside>
</template>

<script setup lang="ts">
import { useCrmStore } from '@/stores/crmStore';
import CrmSidebarHeader from '@/components/sidebar/CrmSidebarHeader.vue';
import CrmSidebarNav from '@/components/sidebar/CrmSidebarNav.vue';
import CrmSidebarFooter from '@/components/sidebar/CrmSidebarFooter.vue';

const store = useCrmStore();
</script>

<style scoped>
.sidebar {
  width: 240px;
  height: 100vh;
  background: var(--bg-surface);
  border-right: 1px solid var(--border-subtle);
  display: flex;
  flex-direction: column;
  transition: width 0.25s ease;
  flex-shrink: 0;
}
.sidebar.collapsed { width: 68px; }
</style>
