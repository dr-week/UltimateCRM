<template>
  <div class="frappe-deal-card glass-panel-hover" @click="$emit('click')">
    <!-- Top Row: Company Logo + Name -->
    <div class="card-company-row">
      <div class="company-logo-avatar">{{ lead.company.charAt(0) }}</div>
      <div class="company-name">{{ lead.company }}</div>
    </div>

    <!-- Value Row -->
    <div class="card-value-row">${{ lead.value.toLocaleString() }}</div>

    <!-- Contact Info -->
    <div class="card-contact-details">
      <div class="contact-line">{{ lead.email || 'no-email@company.com' }}</div>
      <div v-if="lead.phone" class="contact-line phone">{{ lead.phone }}</div>
    </div>

    <!-- Assignee & Time Row -->
    <div class="card-assignee-row">
      <div class="assignee-avatar">{{ lead.assignedTo.split(' ').map(n=>n[0]).join('') }}</div>
      <div class="assignee-name">{{ lead.assignedTo }}</div>
      <div class="time-ago">{{ lead.lastContacted }}</div>
    </div>

    <!-- Frappe Micro-Actions Footer Bar -->
    <div class="frappe-card-footer">
      <div class="action-item"><AtSign :size="12" /><span>2</span></div>
      <div class="action-item"><Paperclip :size="12" /></div>
      <div class="action-item"><CheckSquare :size="12" /></div>
      <div class="action-item"><MessageSquare :size="12" /><span>1</span></div>
      <button class="btn-card-add" title="Log Activity" @click.stop="$emit('click')"><Plus :size="13" /></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Lead } from '@/types/lead';
import { AtSign, Paperclip, CheckSquare, MessageSquare, Plus } from 'lucide-vue-next';

defineProps<{ lead: Lead }>();
defineEmits(['click']);
</script>

<style scoped>
.frappe-deal-card { background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 0.85rem; cursor: grab; transition: all 0.2s ease; display: flex; flex-direction: column; gap: 0.4rem; }
.frappe-deal-card:hover { border-color: rgba(99, 102, 241, 0.4); transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.3); }
.card-company-row { display: flex; align-items: center; gap: 0.5rem; }
.company-logo-avatar { width: 22px; height: 22px; border-radius: 4px; background: rgba(255,255,255,0.08); color: var(--accent-primary); font-size: 0.7rem; font-weight: 700; display: flex; align-items: center; justify-content: center; }
.company-name { font-size: 0.875rem; font-weight: 700; color: var(--text-main); }
.card-value-row { font-family: 'Outfit', sans-serif; font-size: 1rem; font-weight: 700; color: var(--accent-emerald); }
.card-contact-details { display: flex; flex-direction: column; gap: 0.15rem; font-size: 0.75rem; color: var(--text-muted); }
.phone { color: var(--text-subtle); }
.card-assignee-row { display: flex; align-items: center; gap: 0.4rem; margin-top: 0.2rem; font-size: 0.72rem; }
.assignee-avatar { width: 18px; height: 18px; border-radius: 50%; background: var(--accent-primary); color: #fff; font-size: 0.6rem; font-weight: 700; display: flex; align-items: center; justify-content: center; }
.assignee-name { font-weight: 600; color: var(--text-main); }
.time-ago { margin-left: auto; color: var(--text-subtle); font-size: 0.68rem; }
.frappe-card-footer { display: flex; align-items: center; gap: 0.6rem; margin-top: 0.4rem; padding-top: 0.4rem; border-top: 1px solid rgba(255,255,255,0.05); color: var(--text-subtle); font-size: 0.7rem; }
.action-item { display: flex; align-items: center; gap: 0.2rem; }
.btn-card-add { margin-left: auto; background: transparent; border: none; color: var(--text-subtle); cursor: pointer; padding: 0.1rem; border-radius: 3px; display: flex; align-items: center; }
.btn-card-add:hover { color: var(--accent-primary); background: rgba(255,255,255,0.08); }
</style>
