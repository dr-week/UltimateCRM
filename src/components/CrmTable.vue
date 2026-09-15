<template>
  <div class="table-container glass-panel">
    <table class="crm-table">
      <thead>
        <tr>
          <th>Contact Name</th>
          <th>Company</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Stage</th>
          <th>Value</th>
          <th>Assigned To</th>
          <th class="text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        <CrmTableRow 
          v-for="lead in store.filteredLeads" 
          :key="lead.id" 
          :lead="lead"
          @open="store.openLeadDetails"
          @delete="store.removeLead"
        />
        <tr v-if="store.filteredLeads.length === 0">
          <td colspan="8" class="empty-table">No contacts or deals found matching filter criteria.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useCrmStore } from '@/stores/crmStore';
import CrmTableRow from '@/components/table/CrmTableRow.vue';

const store = useCrmStore();
</script>

<style scoped>
.table-container {
  overflow-x: auto;
  border-radius: var(--radius-lg);
}

.crm-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.875rem;
}

.crm-table th {
  padding: 1rem;
  font-weight: 600;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-subtle);
  background: rgba(18, 24, 38, 0.9);
}

.crm-table td {
  padding: 0.875rem 1rem;
  border-bottom: 1px solid var(--border-subtle);
  color: var(--text-main);
  vertical-align: middle;
}

.text-right { text-align: right; }

.empty-table {
  text-align: center;
  padding: 3rem;
  color: var(--text-subtle);
}
</style>
