//展示原料入库信息饼状图

import { React, useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { useRequest } from 'ahooks';
import { config } from '../../config';
import * as echarts from 'echarts/core';
import { GetCurrentLocationSummary } from 'apis';
import axios from 'axios';

const Task: React.FC = () => {
  const [trafficWay, setTrafficWay] = useState([]);
  // 数据库实时加载
  useEffect(() => {
    // 发送 GET 请求获取数据
    axios.get('http://47.109.192.248:8088/dashboard/tobacco_list/raw_tobacco', {
    })
      .then(response => {
        // 在控制台输出获取的数据
        console.log('从数据库获取到的数据：', response.data);
        // 请求成功，处理数据
        const data = response.data.data.map(item => ({
          name: item.name,
          amount: item.amount
        }));
        // 在控制台输出格式化后的数据
        console.log('格式化后的数据：', data);
        setTrafficWay(data);
        console.log('用的：', trafficWay);
      })
      .catch(error => {
        // 请求失败，输出错误信息
        console.error('请求失败：', error);
      });
  }, []); // 第二个参数传入空数组，表示只在组件挂载时执行一次


  /* const trafficWay = [
    {
      name: '华南烟叶',
      amount: 10,
    },
    {
      name: '烤烟',
      amount: 10,
    },
    {
      name: '黄钻烟叶',
      amount: 10,
    },
    {
      name: '金满堂烟叶',
      amount: 10,
    },
    {
      name: '丝绸之路烟叶',
      amount: 10,
    },
  ]; */

  const data = [];
  const color = ['#00ffff', '#00cfff', '#006ced', '#ffe000', '#ffa800', '#ff5b00'];
  for (let i = 0; i < trafficWay.length; i++) {
    data.push(
      {
        value: trafficWay[i].amount,
        name: trafficWay[i].name,
        itemStyle: {
          normal: {
            borderWidth: 5,
            shadowBlur: 20,
            borderColor: color[i],
            shadowColor: color[i],
          },
        },
      }
    );
  }
  const seriesOption = [
    {
      name: '',
      type: 'pie',
      clockWise: false,
      radius: [35, 39],
      center: ['50%', '45%'],
      hoverAnimation: false,
      itemStyle: {
        normal: {
          label: {
            show: true,
            position: 'outside',
            color: '#ddd',
            formatter: function (params) {
              let percent = 0;
              let total = 0;
              for (let i = 0; i < trafficWay.length; i++) {
                total += trafficWay[i].amount;
              }
              percent = ((params.value / total) * 100).toFixed(0);
              if (params.name !== '') {
                return '' + params.name + '\n' + '\n' + '' + percent + '%';
              } else {
                return '';
              }
            },
          },
          labelLine: {
            length: 10,
            length2: 20,
            show: true,
            color: '#00ffff',
          },
        },
      },
      data: data,
    },
  ];
  const option = {
    color: color,
    title: {
      text: '',
      top: '30%',
      textAlign: 'center',
      left: '49%',
      textStyle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '400',
      },
    },
    tooltip: {
      show: true,
    },
    legend: {
      show: false,
    },
    toolbox: {
      show: false,
    },
    grid: {
      left: '25%', // 调整网格左侧位置
      top: '30%', // 调整网格顶部位置
      right: '25%', // 调整网格右侧位置
      bottom: '20%', // 调整网格底部位置
    },
    series: seriesOption,
  };
  return (
    <>
      <div>
        <ReactECharts style={{ height: '220px' }} option={option} />
      </div>
    </>
  );
};

export default Task;
