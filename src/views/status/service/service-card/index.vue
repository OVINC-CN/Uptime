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
  highLight: {
    type: Boolean,
    default: false,
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
    <div>
      {{ service.name }}
      <icon-eye
        v-if="highLight"
        style="margin-right: 10px;"
      />
    </div>
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
  box-shadow: var(--shadow3-center);
}

.service-card > :deep(.arco-card-body) > div {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
