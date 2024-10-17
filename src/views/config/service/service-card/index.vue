<script setup>
import {computed} from 'vue';
import {OnlineStatus} from '@/constants/monitor';

// props
const props = defineProps({
  service: {
    type: Object,
    default: () => (
      {
        id: '',
        name: '',
        status: '',
      }
    ),
  },
});

// status
const statusColor = computed(() => {
  switch (props.service.status) {
    case OnlineStatus.online:
      return 'rgb(var(--green-4))';
    case OnlineStatus.offline:
      return 'rgb(var(--red-4))';
    default:
      return 'rgb(var(--orange-4))';
  }
});
</script>

<template>
  <a-card
    class="service-card"
    :style="{backgroundColor: statusColor}"
  >
    {{ service.name }}
  </a-card>
</template>

<style scoped>
.service-card {
  width: 100%;
  border-radius: var(--border-radius-medium);
  border: unset;
  cursor: pointer;
}

.service-card :deep(.arco-card-body) {
  color: white;
}

.service-card:hover {
  box-shadow: var(--shadow2-center);
}
</style>
