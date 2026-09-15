<template>
  <div v-if="store.isNewLeadOpen" class="modal-overlay" @click.self="store.isNewLeadOpen = false">
    <div class="modal-panel glass-panel">
      <div class="modal-header">
        <div class="modal-title">
          <PlusCircle :size="20" class="icon-violet" />
          <h2>Create New Deal / Lead</h2>
        </div>
        <button @click="store.isNewLeadOpen = false" class="btn-icon">
          <X :size="18" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="modal-body">
        <div class="form-row">
          <div class="form-group">
            <label>Contact Full Name *</label>
            <input v-model="form.name" type="text" required placeholder="e.g. Eleanor Vance" class="input-field" />
          </div>
          <div class="form-group">
            <label>Company / Organization *</label>
            <input v-model="form.company" type="text" required placeholder="e.g. Vanguard Tech" class="input-field" />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Email Address</label>
            <input v-model="form.email" type="email" placeholder="eleanor@vanguard.io" class="input-field" />
          </div>
          <div class="form-group">
            <label>Phone Number</label>
            <input v-model="form.phone" type="tel" placeholder="+1 (555) 019-8833" class="input-field" />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Estimated Deal Value ($)</label>
            <input v-model.number="form.value" type="number" min="0" placeholder="50000" class="input-field" />
          </div>
          <div class="form-group">
            <label>Initial Stage</label>
            <select v-model="form.status" class="input-field">
              <option value="Lead">New Lead</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal">Proposal</option>
              <option value="Negotiation">Negotiation</option>
              <option value="Closed Won">Closed Won</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label>Assigned Rep</label>
          <select v-model="form.assignedTo" class="input-field">
            <option value="Alex Mercer">Alex Mercer</option>
            <option value="Diana Prince">Diana Prince</option>
            <option value="Marcus Vance">Marcus Vance</option>
          </select>
        </div>

        <div class="form-group">
          <label>Deal Notes</label>
          <textarea v-model="form.notes" placeholder="Key notes, scope, timeline..." class="input-field textarea" rows="3"></textarea>
        </div>

        <div class="modal-footer">
          <button type="button" @click="store.isNewLeadOpen = false" class="btn-secondary">Cancel</button>
          <button type="submit" class="btn-primary">Create Deal</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useCrmStore } from '@/stores/crmStore';
import { StageType } from '@/types/crm';
import { PlusCircle, X } from 'lucide-vue-next';

const store = useCrmStore();

const form = reactive({
  name: '',
  company: '',
  email: '',
  phone: '',
  value: 25000,
  status: 'Lead' as StageType,
  assignedTo: 'Alex Mercer',
  notes: ''
});

async function handleSubmit() {
  if (!form.name || !form.company) return;
  await store.createLead({
    name: form.name,
    company: form.company,
    email: form.email,
    phone: form.phone,
    value: form.value || 0,
    status: form.status,
    assignedTo: form.assignedTo,
    notes: form.notes
  });

  // Reset form
  form.name = '';
  form.company = '';
  form.email = '';
  form.phone = '';
  form.value = 25000;
  form.status = 'Lead';
  form.notes = '';
}
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
  max-width: 580px;
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
  gap: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.form-group label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-main);
}

.textarea {
  resize: vertical;
}

.modal-footer {
  padding-top: 0.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}
</style>
