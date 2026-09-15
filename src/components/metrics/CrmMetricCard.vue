<template>
  <div class="metric-card glass-panel">
    <div class="metric-header">
      <span class="metric-title">{{ title }}</span>
      <div class="metric-icon" :class="iconClass">
        <component :is="icon" :size="18" />
      </div>
    </div>
    <div class="metric-body">
      <div class="metric-value">{{ value }}</div>
      <div class="metric-change" :class="{ positive: isPositive, neutral: !isPositive }">
        <TrendingUp v-if="isPositive" :size="14" /> {{ change }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue';
import { TrendingUp } from 'lucide-vue-next';


defineProps<{
  title: string;
  value: string | number;
  change: string;
  isPositive?: boolean;
  icon: Component;
  iconClass: string;
}>();
</script>

<style scoped>
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

.metric-title { font-size: 0.825rem; font-weight: 500; color: var(--text-muted); }

.metric-icon {
  width: 34px;
  height: 34px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
}

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
