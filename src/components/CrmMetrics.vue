<template>
  <div class="metrics-grid">
    <div class="metric-card glass-panel">
      <div class="metric-header">
        <span class="metric-title">Total Pipeline Value</span>
        <div class="metric-icon icon-indigo">
          <DollarSign :size="18" />
        </div>
      </div>
      <div class="metric-body">
        <div class="metric-value">${{ store.totalPipelineValue.toLocaleString() }}</div>
        <div class="metric-change positive">
          <TrendingUp :size="14" /> +18.4% from last month
        </div>
      </div>
    </div>

    <div class="metric-card glass-panel">
      <div class="metric-header">
        <span class="metric-title">Revenue Won</span>
        <div class="metric-icon icon-emerald">
          <CheckCircle2 :size="18" />
        </div>
      </div>
      <div class="metric-body">
        <div class="metric-value">${{ store.wonPipelineValue.toLocaleString() }}</div>
        <div class="metric-change positive">
          <TrendingUp :size="14" /> +24% closed deals
        </div>
      </div>
    </div>

    <div class="metric-card glass-panel">
      <div class="metric-header">
        <span class="metric-title">Active Deals</span>
        <div class="metric-icon icon-cyan">
          <Briefcase :size="18" />
        </div>
      </div>
      <div class="metric-body">
        <div class="metric-value">{{ store.activeDealsCount }}</div>
        <div class="metric-change neutral">
          In active negotiation stages
        </div>
      </div>
    </div>

    <div class="metric-card glass-panel">
      <div class="metric-header">
        <span class="metric-title">Win Rate</span>
        <div class="metric-icon icon-purple">
          <Award :size="18" />
        </div>
      </div>
      <div class="metric-body">
        <div class="metric-value">{{ store.winRate }}%</div>
        <div class="metric-change positive">
          <TrendingUp :size="14" /> Top performer tier
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCrmStore } from '@/stores/crmStore';
import { DollarSign, CheckCircle2, Briefcase, Award, TrendingUp } from 'lucide-vue-next';

const store = useCrmStore();
</script>

<style scoped>
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}

.metric-card {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.metric-card:hover {
  transform: translateY(-2px);
  border-color: rgba(99, 102, 241, 0.4);
}

.metric-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.metric-title {
  font-size: 0.825rem;
  font-weight: 500;
  color: var(--text-muted);
}

.metric-icon {
  width: 34px;
  height: 34px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-indigo { background: rgba(99, 102, 241, 0.15); color: #818cf8; }
.icon-emerald { background: rgba(16, 185, 129, 0.15); color: #34d399; }
.icon-cyan { background: rgba(6, 182, 212, 0.15); color: #38bdf8; }
.icon-purple { background: rgba(139, 92, 246, 0.15); color: #c084fc; }

.metric-value {
  font-family: 'Outfit', sans-serif;
  font-size: 1.65rem;
  font-weight: 700;
  color: var(--text-main);
  line-height: 1.2;
  margin-bottom: 0.35rem;
}

.metric-change {
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 500;
}

.metric-change.positive { color: var(--accent-emerald); }
.metric-change.neutral { color: var(--text-subtle); }
</style>
