<script setup>
import * as echarts from 'echarts/core';
import {LineChart} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
} from 'echarts/components';
import {LabelLayout, UniversalTransition} from 'echarts/features';
import {CanvasRenderer} from 'echarts/renderers';
import {watch} from 'vue';
import moment from 'moment';
import {OnlineStatus} from '@/constants/monitor';

// props
const props = defineProps({
  dots: {
    type: Array,
    default: () => ([]),
  },
});

// chart
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);
const dispatchChart = () => {
  // data
  const xData = [];
  const yData = [];
  props.dots.forEach((item) => {
    xData.push(moment(item.timestamp * 1000).format('MM/DD HH:mm'));
    yData.push({value: item.duration, itemStyle: {color: item.status === OnlineStatus.online ? '#9fe46f' : '#d64343'}});
  });
  if (xData.length === 0) {
    xData.push(moment().unix());
    yData.push(null);
  }
  // chart
  const component = document.getElementById('service-line');
  try {
    echarts.dispose(component);
  } catch (error) {
    console.error(error);
  }
  try {
    const chart = echarts.init(component, null, {useCoarsePointer: true});
    chart.setOption({
      color: '#dcdcdc',
      grid: {
        x: 100,
        y: 40,
        x2: 50,
        y2: 40,
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: xData,
        boundaryGap: false,
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value}ms',
        },
      },
      series: [
        {
          data: yData,
          type: 'line',
          smooth: true,
          lineStyle: {
            width: 2,
          },
          connectNulls: false,
        },
      ],
    });
  } catch (error) {
    console.error(error);
  }
};
watch(() => props.dots, () => dispatchChart());
</script>

<template>
  <div
    id="service-line"
  />
</template>

<style scoped>
#service-line {
  height: 200px;
  margin-top: 10px;
  border: 6px solid var(--color-border-1);
  border-radius: var(--border-radius-medium);
}

@media (min-height: 800px) {
  #service-line {
    height: 360px;
  }
}
</style>
