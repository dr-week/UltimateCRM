<template>
  <div class="crm-input-wrapper">
    <component :is="icon" v-if="icon" :size="14" class="input-icon" />
    <input 
      :value="modelValue" 
      :type="type" 
      :placeholder="placeholder"
      class="crm-input"
      :class="{ hasIcon: !!icon }"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  modelValue: string;
  placeholder?: string;
  type?: string;
  icon?: any;
}>(), {
  placeholder: '',
  type: 'text',
  icon: null
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
.crm-input-wrapper { position: relative; display: flex; align-items: center; width: 100%; }
.input-icon { position: absolute; left: 0.6rem; color: var(--text-subtle); }
.crm-input { background: rgba(255, 255, 255, 0.04); border: 1px solid var(--border-subtle); border-radius: 6px; padding: 0.4rem 0.7rem; font-size: 0.8rem; color: var(--text-main); width: 100%; transition: border-color 0.2s ease; }
.crm-input.hasIcon { padding-left: 2rem; }
.crm-input:focus { outline: none; border-color: var(--accent-primary); }
</style>
