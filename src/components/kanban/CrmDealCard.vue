<template>
  <div class="deal-card glass-panel-hover" @click="$emit('click')">
    <div class="card-top">
      <div class="company-badge">{{ lead.company }}</div>
      <div class="card-value">${{ lead.value.toLocaleString() }}</div>
    </div>

    <div class="card-lead-name">{{ lead.name }}</div>

    <div class="card-footer">
      <div class="assignee">
        <User :size="12" />
        <span>{{ lead.assignedTo }}</span>
      </div>
      <div class="contact-time">
        <Clock :size="12" />
        <span>{{ lead.lastContacted }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Lead } from '@/types/lead';
import { User, Clock } from 'lucide-vue-next';

defineProps<{ lead: Lead }>();
defineEmits(['click']);
</script>

<style scoped>
.deal-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 0.875rem;
  cursor: grab;
  transition: all 0.2s ease;
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.company-badge {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--accent-primary);
  background: rgba(99, 102, 241, 0.1);
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
}

.card-value {
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--text-main);
}

.card-lead-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-main);
  margin-bottom: 0.75rem;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.7rem;
  color: var(--text-subtle);
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  padding-top: 0.5rem;
}

.assignee, .contact-time {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
</style>
