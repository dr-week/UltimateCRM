<template>
  <div class="backend-badge" :class="badgeClass">
    <span class="dot"></span>
    {{ backendType.toUpperCase() }} MODE
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { BackendType } from '@/types/config';

const props = defineProps<{ backendType: BackendType }>();

const badgeClass = computed(() => {
  if (props.backendType === 'directus') return 'backend-directus';
  if (props.backendType === 'frappe') return 'backend-frappe';
  return 'backend-mock';
});
</script>

<style scoped>
.backend-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.6rem;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  border: 1px solid var(--border-subtle);
}

.backend-badge .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.backend-mock {
  background: rgba(6, 182, 212, 0.1);
  color: #38bdf8;
  border-color: rgba(6, 182, 212, 0.3);
}
.backend-mock .dot { background: #38bdf8; }

.backend-directus {
  background: rgba(139, 92, 246, 0.1);
  color: #c084fc;
  border-color: rgba(139, 92, 246, 0.3);
}
.backend-directus .dot { background: #c084fc; }

.backend-frappe {
  background: rgba(16, 185, 129, 0.1);
  color: #34d399;
  border-color: rgba(16, 185, 129, 0.3);
}
.backend-frappe .dot { background: #34d399; }
</style>
