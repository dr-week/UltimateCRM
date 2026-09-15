<template>
  <div class="contacts-panel glass-panel">
    <div class="panel-header">
      <div class="header-left">
        <Building2 :size="18" class="icon-violet" />
        <h3>Contacts & Organization Directory</h3>
      </div>
      <span class="count-badge">{{ store.filteredLeads.length }} Organizations</span>
    </div>

    <div class="contacts-grid">
      <div 
        v-for="lead in store.filteredLeads" 
        :key="lead.id" 
        class="contact-card glass-panel-hover"
        @click="store.openLeadDetails(lead)"
      >
        <div class="contact-avatar">{{ lead.company.charAt(0) }}</div>
        <div class="contact-info">
          <span class="company-title">{{ lead.company }}</span>
          <span class="contact-name">{{ lead.name }}</span>
          <span class="contact-email">{{ lead.email }}</span>
        </div>
        <div class="contact-value">${{ lead.value.toLocaleString() }}</div>
        <div class="stage-tag" :class="lead.status.toLowerCase().replace(' ', '-')">
          {{ lead.status }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCrmStore } from '@/stores/crmStore';
import { Building2 } from 'lucide-vue-next';

const store = useCrmStore();
</script>

<style scoped>
.contacts-panel { padding: 1.25rem; }
.panel-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
.header-left { display: flex; align-items: center; gap: 0.5rem; }
.header-left h3 { font-size: 0.95rem; font-weight: 700; color: var(--text-main); }
.icon-violet { color: var(--accent-primary); }
.count-badge { font-size: 0.72rem; color: var(--text-subtle); background: rgba(255,255,255,0.06); padding: 0.2rem 0.5rem; border-radius: 999px; }
.contacts-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 0.85rem; }
.contact-card { padding: 0.85rem; border: 1px solid var(--border-subtle); border-radius: 8px; display: flex; align-items: center; gap: 0.75rem; cursor: pointer; transition: all 0.2s ease; }
.contact-card:hover { border-color: rgba(99,102,241,0.4); transform: translateY(-2px); }
.contact-avatar { width: 36px; height: 36px; border-radius: 8px; background: rgba(99,102,241,0.15); color: var(--accent-primary); font-weight: 700; font-size: 0.9rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.contact-info { display: flex; flex-direction: column; gap: 0.1rem; flex: 1; overflow: hidden; }
.company-title { font-size: 0.85rem; font-weight: 700; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.contact-name { font-size: 0.75rem; color: var(--text-muted); }
.contact-email { font-size: 0.7rem; color: var(--text-subtle); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.contact-value { font-family: 'Outfit', sans-serif; font-size: 0.85rem; font-weight: 700; color: var(--accent-emerald); }
.stage-tag { font-size: 0.65rem; padding: 0.15rem 0.4rem; border-radius: 4px; font-weight: 600; text-transform: uppercase; background: rgba(255,255,255,0.06); color: var(--text-muted); }
</style>
