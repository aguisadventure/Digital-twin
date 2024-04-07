//展示各个库房的存储情况

import { React, useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { useRequest } from 'ahooks';
import { config } from '../../config';
import * as echarts from 'echarts/core';
import { GetCurrentLocationSummary } from 'apis';
import axios from 'axios';

const Buffer: React.FC = () => {
  const [combinedData, setCombinedData] = useState<any[]>([]);
  // 数据库实时加载
  useEffect(() => {
    // 发送 GET 请求获取数据
    const tobaccoPromise = axios.get('http://47.109.192.248:8088/dashboard/storage_chart/raw_tobacco', {
    });
    const accessoriesPromise = axios.get('http://47.109.192.248:8088/dashboard/storage_chart/raw_accessories', {
    });

    Promise.all([tobaccoPromise, accessoriesPromise])
      .then(([tobaccoResponse, accessoriesResponse]) => {
        // 在控制台输出获取的数据
        console.log('从数据库获取到的原料数据：', tobaccoResponse.data);
        console.log('从数据库获取到的辅料数据：', accessoriesResponse.data);
        // 请求成功，处理数据
        const storageDataValues = [tobaccoResponse.data.data];
        const storageDataValues2 = Object.values(accessoriesResponse.data.data);
        // 在控制台输出格式化后的数据
        console.log('格式化后的原料数据：', storageDataValues);
        console.log('格式化后的辅料数据：', storageDataValues2);
        // 将两个数组合并成一个数组
        const combinedValues = [...storageDataValues, ...storageDataValues2];
        setCombinedData(combinedValues);
      })
      .catch(error => {
        // 请求失败，输出错误信息
        console.error('请求失败：', error);
      });
  }, []); // 第二个参数传入空数组，表示只在组件挂载时执行一次

  // 如果数据为空，显示加载中的提示
  if (combinedData.length === 0) {
    return <div>Loading...</div>;
  }

  var barWidth = 3;
  const option3_xdata = [
    '原料仓A',
    '辅料仓B1',
    '辅料仓C1',
    '辅料仓D1',
    '辅料仓E1',
    '辅料仓F1',
    '辅料仓G1',
    '辅料仓H1',
  ];
  //const option3_Ydata = [75, 62, 57, 42, 35, 32, 29, 27];
  const option3_Ydata = combinedData;

  const option3_Ydatamax = [];
  var yMax2 = Math.max.apply(null, option3_Ydata);
  for (var i = 0; i < option3_Ydata.length; i++) {
    option3_Ydatamax.push(yMax2);
  }

  const option = {
    title: {
      show: false,
    },
    tooltip: {
      trigger: 'item',
    },
    grid: {
      borderWidth: 0,
      top: '10',
      left: '10',
      right: '30',
      bottom: '3%',
    },
    // color: color,
    yAxis: [
      {
        inverse: true,
        type: 'category',
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: false,
          inside: false,
        },
        data: option3_xdata,
      },
    ],
    xAxis: {
      type: 'value',

      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
    },
    dataZoom: [
      {
        type: 'slider',
        show: true,
        yAxisIndex: [0],
        right: 0,
        width: 8,
        height: '84%',
        top: '7%',
        start: 0,
        end: 50,
        zoomLock: true,
        // show: false,
        showDetail: false,
        showDataShadow: false,
        brushSelect: false,
        fillerColor: 'rgba(200,200,200,.3)',
        backgroundColor: 'rgba(200,200,200,.05)',
        borderColor: 'transparent',
        handleSize: '0%',
      },
    ],

    series: [
      {
        name: '',
        type: 'bar',
        zlevel: 2,
        barWidth: barWidth,
        itemStyle: {
          normal: {
            barBorderRadius: 2,
            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
              {
                offset: 0,
                color: '#248ff7',
              },
              {
                offset: 1,
                color: '#6851f1',
              },
            ]),
          },
          emphasis: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 1, color: '#83bff6' },
            ]),
          },
        },
        data: option3_Ydata,
        animationDuration: 1500,
        label: {
          normal: {
            color: '#555',
            show: true,
            position: [0, '-16px'],
            textStyle: {
              fontSize: 12,
              color: '#fff',
            },
            formatter: function (a, b) {
              return a.name;
            },
          },
        },
      },
      {
        // 背景
        type: 'pictorialBar',
        animationDuration: 0,
        symbolRepeat: 'fixed',
        symbolMargin: '20%',
        symbol: 'roundRect',
        symbolSize: [barWidth * 1.2, barWidth],
        itemStyle: {
          normal: {
            color: 'rgba(200,200,200,.06)',
          },
        },
        label: {
          normal: {
            color: '#fff',
            show: true,
            position: 'right',
            textStyle: {
              fontSize: 12,
              color: '#fff',
            },
            formatter: function (a) {
              return option3_Ydata[a.dataIndex];
            },
          },
        },
        data: option3_Ydatamax,
        z: 0,
        animationEasing: 'elasticOut',
      },
    ],
    animationEasing: 'cubicOut',
  };

  return (
    <>
      <div>
        <ReactECharts style={{ height: '240px' }} option={option} />
      </div>
    </>
  );
};

export default Buffer;
