<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-panel glass-panel">
      <div class="modal-header">
        <div class="modal-title">
          <Building2 :size="20" class="icon-violet" />
          <h2>Client & Company Profile Portal</h2>
        </div>
        <button @click="$emit('close')" class="btn-icon">
          <X :size="18" />
        </button>
      </div>

      <div class="modal-body">
        <div v-if="lead" class="company-card glass-panel">
          <div class="company-header">
            <div class="company-avatar">{{ lead.company.charAt(0) }}</div>
            <div class="company-info">
              <h3>{{ lead.company }}</h3>
              <span class="contact-name">Primary Contact: {{ lead.name }} ({{ lead.email }})</span>
            </div>
            <span class="badge badge-won">Active Client</span>
          </div>

          <div class="portal-grid">
            <div class="portal-stat">
              <span class="stat-label">Total Contract Value</span>
              <span class="stat-val">${{ lead.value.toLocaleString() }}</span>
            </div>
            <div class="portal-stat">
              <span class="stat-label">Account Manager</span>
              <span class="stat-val">{{ lead.assignedTo }}</span>
            </div>
            <div class="portal-stat">
              <span class="stat-label">Portal Access</span>
              <span class="stat-val text-emerald">Enabled</span>
            </div>
          </div>
        </div>

        <!-- Portal Document & Ticket Sections -->
        <div class="portal-tabs">
          <div class="tab-header">
            <span class="tab active">Client Documents</span>
            <span class="tab">Support Tickets (0)</span>
          </div>
          
          <div class="doc-list">
            <div class="doc-item">
              <FileCheck :size="16" class="text-emerald" />
              <div class="doc-info">
                <span class="doc-title">Master Service Agreement (MSA.pdf)</span>
                <span class="doc-sub">Signed on {{ lead?.createdAt }}</span>
              </div>
              <button class="btn-secondary btn-sm">Download</button>
            </div>
            <div class="doc-item">
              <FileText :size="16" class="text-indigo" />
              <div class="doc-info">
                <span class="doc-title">Statement of Work (SOW_v1.pdf)</span>
                <span class="doc-sub">Approved & Onboarded</span>
              </div>
              <button class="btn-secondary btn-sm">Download</button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button @click="$emit('close')" class="btn-secondary">Close Portal</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Lead } from '@/types/crm';
import { Building2, X, FileCheck, FileText } from 'lucide-vue-next';

defineProps<{
  isOpen: boolean;
  lead: Lead | null;
}>();

defineEmits(['close']);
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(6px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.modal-panel {
  width: 100%;
  max-width: 620px;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--border-subtle);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-title {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.modal-title h2 {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-main);
}

.icon-violet { color: var(--accent-primary); }

.modal-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.company-card {
  padding: 1.25rem;
}

.company-header {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin-bottom: 1rem;
}

.company-avatar {
  width: 42px;
  height: 42px;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-purple));
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 700;
}

.company-info h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-main);
}

.contact-name {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.portal-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding-top: 0.85rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.portal-stat {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.stat-label {
  font-size: 0.7rem;
  color: var(--text-subtle);
}

.stat-val {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-main);
}

.text-emerald { color: var(--accent-emerald); }
.text-indigo { color: var(--accent-primary); }

.portal-tabs {
  background: rgba(11, 15, 23, 0.4);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 1rem;
}

.tab-header {
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid var(--border-subtle);
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.tab {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-subtle);
  cursor: pointer;
}

.tab.active {
  color: var(--accent-primary);
  border-bottom: 2px solid var(--accent-primary);
  padding-bottom: 0.5rem;
}

.doc-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.doc-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
}

.doc-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.doc-title {
  font-size: 0.825rem;
  font-weight: 600;
  color: var(--text-main);
}

.doc-sub {
  font-size: 0.7rem;
  color: var(--text-subtle);
}

.btn-sm {
  padding: 0.3rem 0.6rem;
  font-size: 0.75rem;
}

.modal-footer {
  padding: 1.25rem 1.5rem;
  border-top: 1px solid var(--border-subtle);
  display: flex;
  justify-content: flex-end;
}
</style>
