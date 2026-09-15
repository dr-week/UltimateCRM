<template>
  <nav class="sidebar-nav">
    <div class="nav-group-title" v-if="!store.isSidebarCollapsed">MAIN WORKSPACE</div>

    <button 
      v-for="item in navItems" 
      :key="item.id"
      class="nav-item"
      :class="{ active: store.activeNav === item.id }"
      @click="store.activeNav = item.id"
    >
      <component :is="item.icon" :size="18" class="nav-icon" />
      <span v-if="!store.isSidebarCollapsed" class="nav-label">{{ item.label }}</span>
      <span v-if="!store.isSidebarCollapsed && item.count !== undefined" class="nav-badge">{{ item.count }}</span>
    </button>

    <div class="nav-group-title" v-if="!store.isSidebarCollapsed">PINNED VIEWS</div>
    <button v-if="!store.isSidebarCollapsed" class="nav-item sub-item" @click="store.selectedStageFilter = 'Lead'">
      <span class="dot yellow"></span> My Leads
    </button>
    <button v-if="!store.isSidebarCollapsed" class="nav-item sub-item" @click="store.selectedStageFilter = 'Closed Won'">
      <span class="dot green"></span> High Value Deals
    </button>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCrmStore } from '@/stores/crmStore';
import { LayoutDashboard, Flame, Briefcase, Users, CheckSquare, PhoneCall } from 'lucide-vue-next';

const store = useCrmStore();
type NavId = 'kanban' | 'dashboard' | 'leads' | 'contacts' | 'tasks' | 'calls';

const navItems = computed<{ id: NavId; label: string; icon: any; count?: number }[]>(() => [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'leads', label: 'Leads', icon: Flame, count: store.leads.filter(l => l.status === 'Lead').length },
  { id: 'kanban', label: 'Deals Pipeline', icon: Briefcase, count: store.leads.length },
  { id: 'contacts', label: 'Contacts & Orgs', icon: Users },
  { id: 'tasks', label: 'Tasks & Notes', icon: CheckSquare },
  { id: 'calls', label: 'Call Logs', icon: PhoneCall }
]);
</script>

<style scoped>
.sidebar-nav { flex: 1; padding: 0.75rem 0.5rem; display: flex; flex-direction: column; gap: 0.25rem; overflow-y: auto; }
.nav-group-title { font-size: 0.65rem; font-weight: 700; color: var(--text-subtle); padding: 0.5rem 0.5rem 0.25rem 0.5rem; letter-spacing: 0.05em; }
.nav-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.6rem 0.75rem; border-radius: 8px; background: transparent; border: none; color: var(--text-muted); font-size: 0.85rem; font-weight: 500; cursor: pointer; text-align: left; width: 100%; transition: all 0.15s ease; }
.nav-item:hover { background: rgba(255, 255, 255, 0.05); color: var(--text-main); }
.nav-item.active { background: rgba(99, 102, 241, 0.15); color: var(--accent-primary); font-weight: 600; }
.nav-badge { margin-left: auto; background: rgba(255, 255, 255, 0.08); padding: 0.15rem 0.45rem; border-radius: 999px; font-size: 0.7rem; color: var(--text-subtle); }
.sub-item { padding-left: 1.25rem; font-size: 0.8rem; }
.dot { width: 6px; height: 6px; border-radius: 50%; display: inline-block; }
.dot.yellow { background: #fbbf24; }
.dot.green { background: #34d399; }
</style>
