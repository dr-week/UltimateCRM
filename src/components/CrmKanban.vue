<template>
  <div class="kanban-board">
    <div 
      v-for="stage in STAGES" 
      :key="stage.id" 
      class="kanban-column glass-panel"
    >
      <div class="column-header">
        <div class="header-title">
          <span class="stage-dot" :style="{ backgroundColor: stage.color }"></span>
          <h3>{{ stage.title }}</h3>
          <span class="deal-count">{{ getLeadsForStage(stage.id).length }}</span>
        </div>
        <div class="column-sum">${{ getStageTotalValue(stage.id).toLocaleString() }}</div>
      </div>

      <draggable
        :list="getLeadsForStage(stage.id)"
        group="deals"
        item-key="id"
        class="column-cards"
        @change="(evt) => onDraggableChange(evt, stage.id)"
      >
        <template #item="{ element: lead }">
          <CrmDealCard :lead="lead" @click="store.openLeadDetails(lead)" />
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable';
import { useCrmStore } from '@/stores/crmStore';
import { StageType } from '@/types/lead';
import CrmDealCard from '@/components/kanban/CrmDealCard.vue';

const emit = defineEmits(['notify']);
const store = useCrmStore();

const STAGES: { id: StageType; title: string; color: string }[] = [
  { id: 'Lead', title: 'New Leads', color: '#38bdf8' },
  { id: 'Qualified', title: 'Qualified', color: '#818cf8' },
  { id: 'Proposal', title: 'Proposal Sent', color: '#fbbf24' },
  { id: 'Negotiation', title: 'Negotiation', color: '#c084fc' },
  { id: 'Closed Won', title: 'Closed Won', color: '#34d399' },
  { id: 'Closed Lost', title: 'Closed Lost', color: '#fb7185' }
];

function getLeadsForStage(stageId: StageType) {
  return store.filteredLeads.filter(l => l.status === stageId);
}

function getStageTotalValue(stageId: StageType): number {
  return getLeadsForStage(stageId).reduce((sum, l) => sum + l.value, 0);
}

function onDraggableChange(evt: any, targetStage: StageType) {
  if (evt.added) {
    const lead = evt.added.element;
    store.updateStage(lead.id, targetStage);
    emit('notify', `Moved "${lead.name}" to ${targetStage}`);
  }
}
</script>

<style scoped>
.kanban-board {
  display: grid;
  grid-template-columns: repeat(6, minmax(240px, 1fr));
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1.5rem;
  min-height: 600px;
}

.kanban-column {
  background: var(--bg-surface);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  max-height: 75vh;
}

.column-header {
  padding: 1rem;
  border-bottom: 1px solid var(--border-subtle);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stage-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.header-title h3 {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-main);
}

.deal-count {
  background: rgba(255, 255, 255, 0.08);
  padding: 0.1rem 0.4rem;
  border-radius: 9999px;
  font-size: 0.7rem;
  color: var(--text-muted);
}

.column-sum {
  font-family: 'Outfit', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-muted);
}

.column-cards {
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  overflow-y: auto;
  flex: 1;
  min-height: 150px;
}
</style>
