<template>
  <div class="crm-app-layout">
    <!-- Frappe-Style Left Sidebar -->
    <CrmSidebar />

    <!-- Main Workspace Column -->
    <div class="crm-main-viewport">
      <CrmToolbar />

      <main class="viewport-content">
        <transition name="fade" mode="out-in">
          <CrmDashboardView v-if="store.activeNav === 'dashboard'" />
          <CrmContactsView v-else-if="store.activeNav === 'contacts'" />
          <CrmKanban v-else-if="store.viewMode === 'kanban'" @notify="showToast" />
          <CrmTable v-else />
        </transition>
      </main>
    </div>

    <!-- Modals & Drawers -->
    <CrmLeadDrawer />
    <CrmSettingsModal />
    <CrmNewLeadModal />
    <CrmToast ref="toastRef" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useCrmStore } from '@/stores/crmStore';
import CrmSidebar from '@/components/CrmSidebar.vue';
import CrmToolbar from '@/components/CrmToolbar.vue';
import CrmDashboardView from '@/components/CrmDashboardView.vue';
import CrmContactsView from '@/components/CrmContactsView.vue';
import CrmKanban from '@/components/CrmKanban.vue';
import CrmTable from '@/components/CrmTable.vue';
import CrmLeadDrawer from '@/components/CrmLeadDrawer.vue';
import CrmSettingsModal from '@/components/CrmSettingsModal.vue';
import CrmNewLeadModal from '@/components/CrmNewLeadModal.vue';
import CrmToast from '@/components/CrmToast.vue';

const store = useCrmStore();
const toastRef = ref<any>(null);

function showToast(msg: string) {
  toastRef.value?.addToast(msg, 'success');
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
    e.preventDefault();
    const searchInput = document.querySelector('.toolbar-search') as HTMLInputElement;
    if (searchInput) searchInput.focus();
  }
}

onMounted(() => {
  store.fetchLeads();
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

<style scoped>
.crm-app-layout { display: flex; height: 100vh; width: 100vw; overflow: hidden; background: var(--bg-dark); }
.crm-main-viewport { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
.viewport-content { flex: 1; overflow-y: auto; padding: 1.25rem; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
