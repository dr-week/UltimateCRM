<template>
  <div class="metrics-grid">
    <CrmMetricCard
      title="Total Pipeline Value"
      :value="`$${store.totalPipelineValue.toLocaleString()}`"
      change="+18.4% from last month"
      :is-positive="true"
      :icon="DollarSign"
      icon-class="icon-indigo"
    />

    <CrmMetricCard
      title="Revenue Won"
      :value="`$${store.wonPipelineValue.toLocaleString()}`"
      change="+24% closed deals"
      :is-positive="true"
      :icon="CheckCircle2"
      icon-class="icon-emerald"
    />

    <CrmMetricCard
      title="Active Deals"
      :value="store.activeDealsCount"
      change="In active negotiation stages"
      :is-positive="false"
      :icon="Briefcase"
      icon-class="icon-cyan"
    />

    <CrmMetricCard
      title="Win Rate"
      :value="`${store.winRate}%`"
      change="Top performer tier"
      :is-positive="true"
      :icon="Award"
      icon-class="icon-purple"
    />
  </div>
</template>

<script setup lang="ts">
import { useCrmStore } from '@/stores/crmStore';
import { DollarSign, CheckCircle2, Briefcase, Award } from 'lucide-vue-next';
import CrmMetricCard from '@/components/metrics/CrmMetricCard.vue';

const store = useCrmStore();
</script>

<style scoped>
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}

:deep(.icon-indigo) { background: rgba(99, 102, 241, 0.15); color: #818cf8; }
:deep(.icon-emerald) { background: rgba(16, 185, 129, 0.15); color: #34d399; }
:deep(.icon-cyan) { background: rgba(6, 182, 212, 0.15); color: #38bdf8; }
:deep(.icon-purple) { background: rgba(139, 92, 246, 0.15); color: #c084fc; }
</style>
