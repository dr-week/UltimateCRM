<template>
  <header class="header glass-panel">
    <div class="header-left">
      <CrmLogo />
      <CrmBackendBadge :backend-type="store.apiConfig.backendType" />
    </div>

    <CrmSearchBar 
      v-model:search-query="store.searchQuery" 
      v-model:selected-stage="store.selectedStageFilter" 
    />

    <div class="header-right">
      <CrmViewToggle v-model:view-mode="store.viewMode" />

      <button @click="store.isNewLeadOpen = true" class="btn-primary">
        <Plus :size="18" />
        New Deal
      </button>

      <button @click="store.isSettingsOpen = true" class="btn-icon" title="API Settings">
        <Settings :size="18" />
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useCrmStore } from '@/stores/crmStore';
import { Plus, Settings } from 'lucide-vue-next';
import CrmLogo from '@/components/header/CrmLogo.vue';
import CrmBackendBadge from '@/components/header/CrmBackendBadge.vue';
import CrmSearchBar from '@/components/header/CrmSearchBar.vue';
import CrmViewToggle from '@/components/header/CrmViewToggle.vue';

const store = useCrmStore();
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1.5rem;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.header-left, .header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
