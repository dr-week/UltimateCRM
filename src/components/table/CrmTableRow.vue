<template>
  <tr class="table-row" @click="$emit('open', lead)">
    <td class="font-semibold text-white">
      <div class="contact-cell">
        <CrmAvatar :name="lead.name" />
        <span>{{ lead.name }}</span>
      </div>
    </td>
    <td>{{ lead.company }}</td>
    <td class="text-muted">{{ lead.email }}</td>
    <td class="text-muted">{{ lead.phone }}</td>
    <td><CrmBadge :status="lead.status" /></td>
    <td class="font-outfit font-bold">${{ lead.value.toLocaleString() }}</td>
    <td>{{ lead.assignedTo }}</td>
    <td class="text-right" @click.stop>
      <button @click="$emit('delete', lead.id)" class="btn-icon btn-danger" title="Delete Deal">
        <Trash2 :size="14" />
      </button>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { Lead } from '@/types/lead';
import { Trash2 } from 'lucide-vue-next';
import CrmBadge from '@/components/ui/CrmBadge.vue';
import CrmAvatar from '@/components/ui/CrmAvatar.vue';

defineProps<{ lead: Lead }>();
defineEmits(['open', 'delete']);
</script>

<style scoped>
.table-row {
  cursor: pointer;
  transition: background 0.15s ease;
}

.table-row:hover { background: var(--bg-glass-hover); }

.contact-cell {
  display: flex;
  align-items: center;
  gap: 0.6rem;
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
</style>
