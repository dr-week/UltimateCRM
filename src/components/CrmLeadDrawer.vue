<template>
  <div v-if="store.isDrawerOpen && lead" class="drawer-overlay" @click.self="store.closeLeadDetails">
    <div class="drawer-panel glass-panel">
      <div class="drawer-header">
        <div class="header-left">
          <div class="company-tag">{{ lead.company }}</div>
          <h2>{{ lead.name }}</h2>
        </div>
        <button @click="store.closeLeadDetails" class="btn-icon">
          <X :size="18" />
        </button>
      </div>

      <div class="drawer-content">
        <!-- Deal Overview Card -->
        <div class="section-card">
          <div class="card-grid">
            <div class="info-item">
              <span class="label">Deal Value</span>
              <span class="value value-highlight">${{ lead.value.toLocaleString() }}</span>
            </div>
            <div class="info-item">
              <span class="label">Stage</span>
              <select 
                :value="lead.status" 
                @change="onStageChange"
                class="input-field select-stage"
              >
                <option value="Lead">Lead</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal">Proposal</option>
                <option value="Negotiation">Negotiation</option>
                <option value="Closed Won">Closed Won</option>
                <option value="Closed Lost">Closed Lost</option>
              </select>
            </div>
            <div class="info-item">
              <span class="label">Email</span>
              <span class="value">{{ lead.email || 'N/A' }}</span>
            </div>
            <div class="info-item">
              <span class="label">Phone</span>
              <span class="value">{{ lead.phone || 'N/A' }}</span>
            </div>
            <div class="info-item">
              <span class="label">Assigned To</span>
              <span class="value">{{ lead.assignedTo }}</span>
            </div>
            <div class="info-item">
              <span class="label">Created Date</span>
              <span class="value">{{ lead.createdAt }}</span>
            </div>
          </div>

          <div class="card-actions">
            <button @click="isPortalOpen = true" class="btn-secondary btn-full">
              <Building2 :size="16" />
              Open Client Company Portal
            </button>
          </div>

          <div v-if="lead.notes" class="notes-box">
            <span class="label">Notes</span>
            <p>{{ lead.notes }}</p>
          </div>
        </div>

        <!-- Add Activity Form -->
        <div class="section-title">
          <ActivityIcon :size="16" />
          <span>Log Activity</span>
        </div>

        <div class="add-activity-form">
          <div class="form-row">
            <select v-model="activityType" class="input-field select-type">
              <option value="note">📝 Note</option>
              <option value="call">📞 Phone Call</option>
              <option value="email">✉️ Email</option>
              <option value="meeting">🤝 Meeting</option>
            </select>
            <input 
              v-model="activityTitle"
              type="text" 
              placeholder="Activity Title (e.g. Discovery Call)..."
              class="input-field"
            />
          </div>
          <textarea 
            v-model="activityDesc"
            placeholder="Add details, outcome, or follow-up tasks..."
            class="input-field textarea-field"
            rows="2"
          ></textarea>
          <div class="form-actions">
            <button @click="handleAddActivity" class="btn-primary btn-sm">
              Log Activity
            </button>
          </div>
        </div>

        <!-- Activity Timeline -->
        <div class="section-title">
          <Clock :size="16" />
          <span>Activity Timeline</span>
        </div>

        <div class="timeline">
          <div 
            v-for="act in leadActivities" 
            :key="act.id" 
            class="timeline-item"
          >
            <div class="timeline-badge" :class="act.type">
              <Phone v-if="act.type === 'call'" :size="12" />
              <Mail v-else-if="act.type === 'email'" :size="12" />
              <Users v-else-if="act.type === 'meeting'" :size="12" />
              <FileText v-else :size="12" />
            </div>
            <div class="timeline-content">
              <div class="timeline-header">
                <span class="act-title">{{ act.title }}</span>
                <span class="act-time">{{ act.timestamp }}</span>
              </div>
              <p class="act-desc">{{ act.description }}</p>
              <span class="act-author">by {{ act.author }}</span>
            </div>
          </div>

          <div v-if="leadActivities.length === 0" class="empty-timeline">
            No activity logged yet for this deal.
          </div>
        </div>
      </div>
    </div>

    <!-- Client Portal Modal -->
    <CrmClientPortalModal 
      :is-open="isPortalOpen" 
      :lead="lead"
      @close="isPortalOpen = false" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCrmStore } from '@/stores/crmStore';
import { StageType } from '@/types/crm';
import { X, Activity as ActivityIcon, Clock, Phone, Mail, Users, FileText, Building2 } from 'lucide-vue-next';
import CrmClientPortalModal from '@/components/CrmClientPortalModal.vue';

const store = useCrmStore();
const isPortalOpen = ref(false);

const lead = computed(() => store.selectedLead);

const leadActivities = computed(() => {
  if (!lead.value) return [];
  return store.activities.filter(a => a.leadId === lead.value!.id);
});

const activityType = ref<'call' | 'email' | 'meeting' | 'note'>('note');
const activityTitle = ref('');
const activityDesc = ref('');

function onStageChange(e: Event) {
  const target = e.target as HTMLSelectElement;
  if (lead.value) {
    store.updateStage(lead.value.id, target.value as StageType);
  }
}

async function handleAddActivity() {
  if (!activityTitle.value || !lead.value) return;
  await store.addLogActivity(
    lead.value.id,
    activityType.value,
    activityTitle.value,
    activityDesc.value
  );
  activityTitle.value = '';
  activityDesc.value = '';
}
</script>

<style scoped>
.drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
  z-index: 100;
  display: flex;
  justify-content: flex-end;
}

.drawer-panel {
  width: 100%;
  max-width: 520px;
  height: 100vh;
  background: var(--bg-surface);
  border-left: 1px solid var(--border-subtle);
  display: flex;
  flex-direction: column;
  animation: slideIn 0.25s ease-out;
}

@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

.drawer-header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--border-subtle);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.company-tag {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--accent-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}

.drawer-header h2 {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--text-main);
}

.drawer-content {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 1.25rem;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.label {
  font-size: 0.75rem;
  color: var(--text-subtle);
  font-weight: 500;
}

.value {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-main);
}

.value-highlight {
  font-family: 'Outfit', sans-serif;
  font-size: 1.35rem;
  color: var(--accent-emerald);
}

.select-stage {
  padding: 0.4rem 0.6rem;
  font-size: 0.8rem;
}

.card-actions {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.btn-full {
  width: 100%;
  justify-content: center;
}

.notes-box {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.notes-box p {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.4;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-main);
}

.add-activity-form {
  background: rgba(11, 15, 23, 0.6);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.form-row {
  display: flex;
  gap: 0.75rem;
}

.select-type {
  width: 140px;
}

.textarea-field {
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}

.btn-sm {
  padding: 0.4rem 0.8rem;
  font-size: 0.8rem;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.timeline-item {
  display: flex;
  gap: 0.85rem;
}

.timeline-badge {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
}

.timeline-badge.call { background: rgba(6, 182, 212, 0.2); color: #38bdf8; }
.timeline-badge.email { background: rgba(139, 92, 246, 0.2); color: #c084fc; }
.timeline-badge.meeting { background: rgba(16, 185, 129, 0.2); color: #34d399; }
.timeline-badge.note { background: rgba(99, 102, 241, 0.2); color: #818cf8; }

.timeline-content {
  flex: 1;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  padding: 0.75rem;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.35rem;
}

.act-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-main);
}

.act-time {
  font-size: 0.7rem;
  color: var(--text-subtle);
}

.act-desc {
  font-size: 0.8rem;
  color: var(--text-muted);
  line-height: 1.4;
  margin-bottom: 0.35rem;
}

.act-author {
  font-size: 0.7rem;
  color: var(--accent-primary);
}

.empty-timeline {
  text-align: center;
  color: var(--text-subtle);
  font-size: 0.8rem;
  padding: 1rem;
}
</style>
