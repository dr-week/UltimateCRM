<template>
  <div class="search-box">
    <Search :size="14" class="search-icon" />
    <input 
      v-model="store.searchQuery" 
      type="text" 
      placeholder="Filter deals, contacts ( / )..." 
      class="toolbar-search"
    />
  </div>
</template>

<script setup lang="ts">
import { useCrmStore } from '@/stores/crmStore';
import { Search } from 'lucide-vue-next';

const store = useCrmStore();
</script>

<style scoped>
.search-box { position: relative; display: flex; align-items: center; }
.search-icon { position: absolute; left: 0.6rem; color: var(--text-subtle); }
.toolbar-search { background: rgba(255,255,255,0.04); border: 1px solid var(--border-subtle); border-radius: 6px; padding: 0.35rem 0.6rem 0.35rem 2rem; font-size: 0.78rem; color: var(--text-main); width: 220px; transition: width 0.2s ease; }
.toolbar-search:focus { width: 280px; outline: none; border-color: var(--accent-primary); }
</style>
