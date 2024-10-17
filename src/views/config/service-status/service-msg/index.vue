<script setup>
import {OnlineStatus} from '@/constants/monitor';
import moment from 'moment';
import {ref, watch} from 'vue';

// props
const props = defineProps({
  dots: {
    type: Array,
    default: () => ([]),
  },
});

// dots
const data = ref([]);
watch(() => props.dots, () => {
  data.value = props.dots;
  data.value.reverse();
});
</script>

<template>
  <div
    id="service-msg"
  >
    <a-list
      id="service-msg-list"
      :bordered="false"
      :scrollbar="true"
    >
      <template
        v-for="item in data"
        :key="item"
      >
        <a-list-item v-if="item.status !== OnlineStatus.online && item.status_msg">
          <a-list-item-meta
            :title="moment(item.timestamp * 1000).format('YYYY-MM-DD HH:mm:ss')"
            :description="item.status_msg"
          />
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<style scoped>
#service-msg {
  height: calc(100 * var(--vh) - 440px);
  overflow-y: scroll;
  margin-top: 10px;
  padding-right: 10px;
  box-sizing: border-box;
}

@media (min-height: 800px) {
  #service-msg {
    height: calc(100 * var(--vh) - 600px);
  }
}

#service-msg-list {
  width: 100%;
}

#service-msg-list :deep(.arco-list-item) {
  padding: 10px 10px 10px 0;
}
</style>
