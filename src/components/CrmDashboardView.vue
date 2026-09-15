<template>
  <div class="dashboard-view">
    <CrmMetrics />
    
    <div class="dash-grid-2">
      <!-- Call Logs Donut Overview -->
      <div class="glass-panel dash-card">
        <div class="card-header">
          <h3>📞 Phone Call Distribution</h3>
          <span class="badge-sub">Live Telephony</span>
        </div>
        <div class="donut-wrapper">
          <div class="donut-chart">
            <div class="donut-center">
              <span class="donut-val">65%</span>
              <span class="donut-lbl">Answered</span>
            </div>
          </div>
          <div class="donut-legend">
            <div class="leg-item"><span class="dot blue"></span> Answered (65%)</div>
            <div class="leg-item"><span class="dot orange"></span> Missed (25%)</div>
            <div class="leg-item"><span class="dot red"></span> Voicemail (10%)</div>
          </div>
        </div>
      </div>

      <!-- Pipeline Stage Funnel Chart -->
      <CrmAnalyticsChart />
    </div>

    <!-- Recent Contacts Grid -->
    <CrmContactsView />
  </div>
</template>

<script setup lang="ts">
import CrmMetrics from '@/components/CrmMetrics.vue';
import CrmAnalyticsChart from '@/components/CrmAnalyticsChart.vue';
import CrmContactsView from '@/components/CrmContactsView.vue';
</script>

<style scoped>
.dashboard-view { display: flex; flex-direction: column; gap: 1.25rem; }
.dash-grid-2 { display: grid; grid-template-columns: 320px 1fr; gap: 1.25rem; align-items: start; }
.dash-card { padding: 1.25rem; }
.card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
.card-header h3 { font-size: 0.95rem; font-weight: 700; color: var(--text-main); }
.badge-sub { font-size: 0.7rem; color: var(--text-subtle); }
.donut-wrapper { display: flex; flex-direction: column; align-items: center; gap: 1rem; }
.donut-chart { width: 140px; height: 140px; border-radius: 50%; background: conic-gradient(#38bdf8 0% 65%, #f59e0b 65% 90%, #fb7185 90% 100%); display: flex; align-items: center; justify-content: center; position: relative; }
.donut-center { width: 95px; height: 95px; border-radius: 50%; background: var(--bg-surface); display: flex; flex-direction: column; align-items: center; justify-content: center; }
.donut-val { font-family: 'Outfit', sans-serif; font-size: 1.25rem; font-weight: 700; color: var(--text-main); }
.donut-lbl { font-size: 0.65rem; color: var(--text-subtle); }
.donut-legend { display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.75rem; color: var(--text-muted); width: 100%; }
.leg-item { display: flex; align-items: center; gap: 0.4rem; }
.dot { width: 8px; height: 8px; border-radius: 50%; }
.dot.blue { background: #38bdf8; }
.dot.orange { background: #f59e0b; }
.dot.red { background: #fb7185; }
</style>
