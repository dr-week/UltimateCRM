<template>
  <aside class="sidebar" :class="{ collapsed: store.isSidebarCollapsed }">
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
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCrmStore } from '@/stores/crmStore';
import { LayoutDashboard, Flame, Briefcase, Users, CheckSquare, PhoneCall, Settings, ChevronLeft, ChevronRight } from 'lucide-vue-next';

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
.sidebar-header { padding: 1rem; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); }
.logo-area { display: flex; align-items: center; gap: 0.6rem; cursor: pointer; }
.logo-icon { width: 32px; height: 32px; border-radius: 8px; background: linear-gradient(135deg, var(--accent-primary), #8b5cf6); display: flex; align-items: center; justify-content: center; font-size: 1rem; }
.logo-text { display: flex; flex-direction: column; }
.app-name { font-size: 0.9rem; font-weight: 700; color: var(--text-main); }
.tenant-name { font-size: 0.7rem; color: var(--text-subtle); }
.btn-collapse { background: transparent; border: none; color: var(--text-subtle); cursor: pointer; padding: 0.25rem; border-radius: 4px; }
.btn-collapse:hover { color: var(--text-main); background: rgba(255,255,255,0.05); }
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
.sidebar-footer { padding: 0.75rem; border-top: 1px solid var(--border-subtle); display: flex; align-items: center; gap: 0.6rem; }
.user-avatar { width: 32px; height: 32px; border-radius: 50%; background: var(--accent-primary); color: #fff; font-size: 0.75rem; font-weight: 700; display: flex; align-items: center; justify-content: center; }
.user-info { display: flex; flex-direction: column; flex: 1; overflow: hidden; }
.user-name { font-size: 0.8rem; font-weight: 600; color: var(--text-main); white-space: nowrap; }
.user-role { font-size: 0.68rem; color: var(--text-subtle); }
.btn-settings { background: transparent; border: none; color: var(--text-subtle); cursor: pointer; padding: 0.35rem; border-radius: 4px; }
.btn-settings:hover { color: var(--text-main); background: rgba(255,255,255,0.08); }
</style>
