<template>
  <span :class="['badge', badgeClass]">
    <slot>{{ status }}</slot>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { StageType } from '@/types/lead';

const props = defineProps<{ status: StageType }>();

const badgeClass = computed(() => {
  switch (props.status) {
    case 'Lead': return 'badge-lead';
    case 'Qualified': return 'badge-qualified';
    case 'Proposal': return 'badge-proposal';
    case 'Negotiation': return 'badge-negotiation';
    case 'Closed Won': return 'badge-won';
    case 'Closed Lost': return 'badge-lost';
  }
});
</script>
