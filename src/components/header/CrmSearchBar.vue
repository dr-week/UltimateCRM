<template>
  <div class="header-center">
    <div class="search-box">
      <Search class="search-icon" />
      <input 
        type="text" 
        :value="searchQuery"
        @input="$emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
        placeholder="Search leads, companies, or emails... ('/' to focus)"
        class="input-field search-input"
      />
    </div>

    <select 
      :value="selectedStageFilter" 
      @change="$emit('update:selectedStageFilter', ($event.target as HTMLSelectElement).value)"
      class="input-field stage-select"
    >
      <option value="all">All Pipeline Stages</option>
      <option value="Lead">Stage: Lead</option>
      <option value="Qualified">Stage: Qualified</option>
      <option value="Proposal">Stage: Proposal</option>
      <option value="Negotiation">Stage: Negotiation</option>
      <option value="Closed Won">Stage: Closed Won</option>
      <option value="Closed Lost">Stage: Closed Lost</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { Search } from 'lucide-vue-next';

defineProps<{
  searchQuery: string;
  selectedStageFilter: string;
}>();

defineEmits(['update:searchQuery', 'update:selectedStageFilter']);
</script>

<style scoped>
.header-center {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  max-width: 550px;
}

.search-box {
  position: relative;
  flex: 1;
}

.search-icon {
  position: absolute;
  left: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-subtle);
  width: 16px;
  height: 16px;
}

.search-input { padding-left: 2.3rem; }
.stage-select { width: 180px; background-color: rgba(11, 15, 23, 0.6); }
</style>
