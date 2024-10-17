<script setup>
import ServiceCard from '@/views/status/service/service-card/index.vue';

// props
defineProps({
  services: {
    type: Array,
    default: () => ([]),
  },
  currentService: {
    type: String,
    default: '',
  },
});

// emits
const emits = defineEmits(['clickService']);
</script>

<template>
  <a-space
    id="service-list"
    direction="vertical"
    :size="10"
  >
    <template
      v-for="item in services"
      :key="item.id"
    >
      <service-card
        :service="item"
        :high-light="currentService === item.id"
        @click="emits('clickService', item.id)"
      />
    </template>
  </a-space>
</template>

<style scoped>
#service-list {
  width: 100%;
  height: calc(100 * var(--vh) - 200px);
  overflow-y: scroll;
  padding-right: 20px;
  box-sizing: border-box;
}
</style>
