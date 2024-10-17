<script setup>
import {onMounted, ref, watch} from 'vue';
import {listServiceStatusAPI} from '@/api/monitor';
import {useI18n} from 'vue-i18n';
import moment from 'moment';
import {Message} from '@arco-design/web-vue';
import {handleLoading} from '@/utils/loading';
import ServiceLine from '@/views/config/service-status/service-line/index.vue';
import ServiceMsg from '@/views/config/service-status/service-msg/index.vue';

// i18n
const i18n = useI18n();

// loading
const pointsLoading = ref(false);

// props
const props = defineProps({
  serviceId: {
    type: String,
    default: '',
  },
  serviceName: {
    type: String,
    default: '',
  },
});

// time filter
const timeFilterKeyLocalStoreKey = ref('time-filter-key');
const timeFilterKey = ref('-3h');
const handleTimeFilterChange = (value) => {
  localStorage.setItem(timeFilterKeyLocalStoreKey.value, JSON.stringify(value));
  loadStatusPoints();
};
onMounted(() => {
  try {
    const value = JSON.parse(localStorage.getItem(timeFilterKeyLocalStoreKey.value));
    if (value) {
      timeFilterKey.value = value;
    }
  } catch (_) {}
});
const timeFilter = ref({});
const timeFilterChoices = ref([
  {
    key: '-30m',
    name: i18n.t('Recent30Minutes'),
    amount: -30,
    unit: 'm',
  },
  {
    key: '-1h',
    name: i18n.t('Recent1Hour'),
    amount: -1,
    unit: 'h',
  },
  {
    key: '-3h',
    name: i18n.t('Recent3Hours'),
    amount: -3,
    unit: 'h',
  },
  {
    key: '-6h',
    name: i18n.t('Recent6Hours'),
    amount: -6,
    unit: 'h',
  },
  {
    key: '-12h',
    name: i18n.t('Recent12Hours'),
    amount: -12,
    unit: 'h',
  },
  {
    key: '-1d',
    name: i18n.t('Recent1Day'),
    amount: -1,
    unit: 'd',
  },
  {
    key: '-3d',
    name: i18n.t('Recent3Day'),
    amount: -3,
    unit: 'd',
  },
  {
    key: '-7d',
    name: i18n.t('Recent7Days'),
    amount: -7,
    unit: 'd',
  },
]);

// status
const statusPoints = ref([]);
const loadStatusPoints = () => {
  handleLoading(pointsLoading, true);
  // load filter
  for (const i in timeFilterChoices.value) {
    if (timeFilterChoices.value[i].key === timeFilterKey.value) {
      timeFilter.value = timeFilterChoices.value[i];
      break;
    }
  }
  if (timeFilter.value.key === undefined) {
    timeFilter.value = timeFilterChoices.value[0];
  }
  // load data
  listServiceStatusAPI(
      props.serviceId,
      {
        start_time: moment().add(timeFilter.value.amount, timeFilter.value.unit).unix(),
        end_time: moment().unix(),
      },
  ).then(
      (res) => statusPoints.value = res.data,
      (err) => Message.error(err.response.data.message),
  ).finally(() => handleLoading(pointsLoading, false));
};
watch(() => props.serviceId, () => {
  statusPoints.value = [];
  if (props.serviceId ) {
    loadStatusPoints();
  }
});

// settings
const showSettings = () => {

};
</script>

<template>
  <a-space id="service-status">
    <a-spin
      :loading="pointsLoading"
      :tip="i18n.t('dataLoading')"
    >
      <a-space
        id="service-status-control"
        v-if="serviceId"
      >
        <a-select
          v-model="timeFilterKey"
          @change="handleTimeFilterChange"
          style="width: 240px"
        >
          <a-option
            v-for="item in timeFilterChoices"
            :key="item.key"
            :value="item.key"
          >
            {{ item.name }}
          </a-option>
        </a-select>
        <a-button
          @click="showSettings"
        >
          <icon-settings />
        </a-button>
        <a-button
          @click="loadStatusPoints"
        >
          <icon-refresh />
        </a-button>
      </a-space>
      <service-line
        v-show="serviceId"
        :dots="statusPoints"
      />
      <service-msg
        v-show="serviceId"
        :dots="statusPoints"
      />
    </a-spin>
  </a-space>
</template>

<style scoped>
#service-status {
  width: 100%;
  height: 100%;
}

#service-status > :deep(.arco-space-item),
#service-status > :deep(.arco-space-item) > .arco-spin {
  width: 100%;
  height: 100%;
}

#service-status-control {
  width: 100%;
}
</style>
