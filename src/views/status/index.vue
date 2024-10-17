<script setup>
import Service from '@/views/status/service/index.vue';
import ServiceStatus from '@/views/status/service-status/index.vue';
import {computed, onMounted, ref} from 'vue';
import {listServicesAPI} from '@/api/service';
import {Message} from '@arco-design/web-vue';
import {useI18n} from 'vue-i18n';
import {OnlineStatus} from '@/constants/monitor';

// i18n
const i18n = useI18n();

// services
const currentService = ref('');
const currentServiceName = computed(() => {
  for (const index in services.value) {
    if (services.value[index].id === currentService.value) {
      return services.value[index].name;
    }
  }
  return currentService.value;
});
const services = ref([]);
const serviceSearchParams = ref({
  keyword: '',
});
const loadServices = () => {
  listServicesAPI(serviceSearchParams.value).then(
      (res) => services.value = res.data,
      (err) => Message.error(err.response.data.message),
  );
};
const clickService = (id) => {
  if (currentService.value === id) {
    currentService.value = '';
    return;
  }
  currentService.value = id;
};
onMounted(() => loadServices());
const allServiceOk = computed(() => {
  for (const index in services.value) {
    if (services.value[index].status !== OnlineStatus.online) {
      return false;
    }
  }
  return true;
});
</script>

<template>
  <a-space
    :fill="true"
    id="config"
  >
    <a-layout id="config-layout">
      <a-layout-sider id="config-sider">
        <div id="config-sider-search-box">
          <a-input
            v-model="serviceSearchParams.keyword"
            :placeholder="i18n.t('SearchByServiceName')"
          />
          <a-button
            @click="loadServices"
            style="margin-left: 10px"
          >
            <icon-search />
          </a-button>
        </div>
        <service
          :services="services"
          :current-service="currentService"
          @click-service="clickService"
        />
      </a-layout-sider>
      <a-layout-content id="config-content">
        <service-status
          :all-service-ok="allServiceOk"
          :service-id="currentService"
          :service-name="currentServiceName"
        />
      </a-layout-content>
    </a-layout>
  </a-space>
</template>

<style scoped>
#config {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

#config > :deep(.arco-space-item),
#config-layout {
  width: 100%;
  height: 100%;
}

#config-layout {
  overflow-x: auto;
}

#config-sider {
  box-shadow: none;
  width: 320px!important;
}

@media (min-width: 1600px) {
  #config-sider {
    width: 400px!important;
  }
}

#config-content {
  width: 100%;
  height: 100%;
  min-width: 600px;
  margin-left: 20px;
  overflow-y: hidden;
}

#config-sider-search-box {
  overflow-y: scroll;
  padding-right: 20px;
  box-sizing: border-box;
  margin-bottom: 10px;
  color: #a0dc76;
  display: flex;
}
</style>
