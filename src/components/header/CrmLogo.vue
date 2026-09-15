<template>
  <div class="logo">
    <div class="logo-icon">
      <Layers class="icon-violet" />
    </div>
    <div class="logo-text">
      <h1>Ultimate<span>CRM</span></h1>
      <span class="logo-subtitle">Decoupled Vue 3 & TypeScript</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Layers } from 'lucide-vue-next';
</script>

<style scoped>
.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2));
  border: 1px solid var(--border-glow);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-violet { color: var(--accent-primary); }

.logo-text h1 {
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.1;
  color: var(--text-main);
  letter-spacing: -0.02em;
}

.logo-text h1 span { color: var(--accent-primary); }

.logo-subtitle {
  font-size: 0.7rem;
  color: var(--text-subtle);
  font-weight: 500;
}
</style>
