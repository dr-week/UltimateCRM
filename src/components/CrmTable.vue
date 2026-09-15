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
        <tr 
          v-for="lead in store.filteredLeads" 
          :key="lead.id" 
          class="table-row"
          @click="store.openLeadDetails(lead)"
        >
          <td class="font-semibold text-white">
            <div class="contact-cell">
              <div class="avatar">{{ lead.name.charAt(0) }}</div>
              <span>{{ lead.name }}</span>
            </div>
          </td>
          <td>{{ lead.company }}</td>
          <td class="text-muted">{{ lead.email }}</td>
          <td class="text-muted">{{ lead.phone }}</td>
          <td>
            <span :class="['badge', getBadgeClass(lead.status)]">
              {{ lead.status }}
            </span>
          </td>
          <td class="font-outfit font-bold">${{ lead.value.toLocaleString() }}</td>
          <td>{{ lead.assignedTo }}</td>
          <td class="text-right" @click.stop>
            <button @click="store.removeLead(lead.id)" class="btn-icon btn-danger" title="Delete Deal">
              <Trash2 :size="14" />
            </button>
          </td>
        </tr>
        <tr v-if="store.filteredLeads.length === 0">
          <td colspan="8" class="empty-table">No contacts or deals found matching filter criteria.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useCrmStore } from '@/stores/crmStore';
import { StageType } from '@/types/crm';
import { Trash2 } from 'lucide-vue-next';

const store = useCrmStore();

function getBadgeClass(status: StageType) {
  switch (status) {
    case 'Lead': return 'badge-lead';
    case 'Qualified': return 'badge-qualified';
    case 'Proposal': return 'badge-proposal';
    case 'Negotiation': return 'badge-negotiation';
    case 'Closed Won': return 'badge-won';
    case 'Closed Lost': return 'badge-lost';
  }
}
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

.table-row {
  cursor: pointer;
  transition: background 0.15s ease;
}

.table-row:hover {
  background: var(--bg-glass-hover);
}

.contact-cell {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--accent-primary);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
}

.font-semibold { font-weight: 600; }
.font-outfit { font-family: 'Outfit', sans-serif; }
.font-bold { font-weight: 700; }
.text-muted { color: var(--text-muted); }
.text-white { color: #ffffff; }
.text-right { text-align: right; }

.btn-danger:hover {
  border-color: var(--accent-rose);
  color: var(--accent-rose);
}

.empty-table {
  text-align: center;
  padding: 3rem;
  color: var(--text-subtle);
}
</style>
