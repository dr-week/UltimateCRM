<template>
  <div class="analytics-panel glass-panel">
    <div class="panel-header">
      <div class="header-left">
        <BarChart3 :size="18" class="icon-violet" />
        <h3>Pipeline Stage Distribution & Funnel</h3>
      </div>
      <span class="subtitle">Live Stage Analytics</span>
    </div>

    <div class="funnel-bars">
      <div 
        v-for="stage in stageMetrics" 
        :key="stage.name" 
        class="funnel-item"
      >
        <div class="stage-info">
          <span class="stage-name">{{ stage.name }}</span>
          <span class="stage-val">${{ stage.totalValue.toLocaleString() }} ({{ stage.count }})</span>
        </div>
        <div class="bar-track">
          <div 
            class="bar-fill" 
            :style="{ width: `${stage.percentage}%`, backgroundColor: stage.color }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCrmStore } from '@/stores/crmStore';
import { StageType } from '@/types/crm';
import { BarChart3 } from 'lucide-vue-next';

const store = useCrmStore();

const STAGES: { id: StageType; name: string; color: string }[] = [
  { id: 'Lead', name: 'New Lead', color: '#38bdf8' },
  { id: 'Qualified', name: 'Qualified', color: '#818cf8' },
  { id: 'Proposal', name: 'Proposal', color: '#fbbf24' },
  { id: 'Negotiation', name: 'Negotiation', color: '#c084fc' },
  { id: 'Closed Won', name: 'Closed Won', color: '#34d399' }
];

const stageMetrics = computed(() => {
  const maxVal = Math.max(...STAGES.map(s => getStageValue(s.id)), 1);

  return STAGES.map(s => {
    const totalValue = getStageValue(s.id);
    const count = store.leads.filter(l => l.status === s.id).length;
    const percentage = Math.max(Math.round((totalValue / maxVal) * 100), count > 0 ? 8 : 0);

    return {
      name: s.name,
      totalValue,
      count,
      percentage,
      color: s.color
    };
  });
});

function getStageValue(stageId: StageType): number {
  return store.leads
    .filter(l => l.status === stageId)
    .reduce((sum, l) => sum + l.value, 0);
}
</script>

<style scoped>
.analytics-panel {
  padding: 1.25rem;
  margin-bottom: 1.5rem;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.header-left h3 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-main);
}

.icon-violet { color: var(--accent-primary); }

.subtitle {
  font-size: 0.75rem;
  color: var(--text-subtle);
  font-weight: 500;
}

.funnel-bars {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.funnel-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stage-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  font-weight: 600;
}

.stage-name { color: var(--text-main); }
.stage-val { color: var(--text-muted); font-family: 'Outfit', sans-serif; }

.bar-track {
  height: 8px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 9999px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: 9999px;
  transition: width 0.5s ease;
}
</style>
