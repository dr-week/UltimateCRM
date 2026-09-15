<template>
  <div class="app-wrapper">
    <CrmHeader />
    <main class="main-content">
      <CrmMetrics />
      <CrmAnalyticsChart />

      <transition name="fade" mode="out-in">
        <CrmKanban v-if="store.viewMode === 'kanban'" @notify="showToast" />
        <CrmTable v-else />
      </transition>
    </main>

    <CrmLeadDrawer />
    <CrmSettingsModal />
    <CrmNewLeadModal />
    <CrmToast ref="toastRef" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useCrmStore } from '@/stores/crmStore';
import CrmHeader from '@/components/CrmHeader.vue';
import CrmMetrics from '@/components/CrmMetrics.vue';
import CrmAnalyticsChart from '@/components/CrmAnalyticsChart.vue';
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
  // Shortcut '/' key to focus search
  if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
    e.preventDefault();
    const searchInput = document.querySelector('.search-input') as HTMLInputElement;
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
.app-wrapper {
  max-width: 1700px;
  margin: 0 auto;
  padding: 1.5rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
