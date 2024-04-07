//记录成品出入库情况

import { React, useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { useRequest } from 'ahooks';
import { config } from '../../config';
import * as echarts from 'echarts/core';
import { GetCurrentLocationSummary } from 'apis';
import axios from 'axios';

const Statistics: React.FC = () => {
  /* const [warehousingData, setWarehousingData] = useState({
    "code": 1,
    "data": [
      {
        "productId": null,
        "warehousingId": null,
        "outboundId": null,
        "accessories1Id": null,
        "accessories2Id": null,
        "accessories3Id": null,
        "accessories4Id": null,
        "accessories5Id": null,
        "accessories6Id": null,
        "accessories7Id": null,
        "tobaccoId": null,
        "productDate": "2024-04-11T16:00:00.000+00:00",
        "output": null,
        "amount": 2920
      },
      {
        "productId": null,
        "warehousingId": null,
        "outboundId": null,
        "accessories1Id": null,
        "accessories2Id": null,
        "accessories3Id": null,
        "accessories4Id": null,
        "accessories5Id": null,
        "accessories6Id": null,
        "accessories7Id": null,
        "tobaccoId": null,
        "productDate": "2024-04-10T16:00:00.000+00:00",
        "output": null,
        "amount": 3550
      },
      {
        "productId": null,
        "warehousingId": null,
        "outboundId": null,
        "accessories1Id": null,
        "accessories2Id": null,
        "accessories3Id": null,
        "accessories4Id": null,
        "accessories5Id": null,
        "accessories6Id": null,
        "accessories7Id": null,
        "tobaccoId": null,
        "productDate": "2024-04-09T16:00:00.000+00:00",
        "output": null,
        "amount": 2700
      },
      {
        "productId": null,
        "warehousingId": null,
        "outboundId": null,
        "accessories1Id": null,
        "accessories2Id": null,
        "accessories3Id": null,
        "accessories4Id": null,
        "accessories5Id": null,
        "accessories6Id": null,
        "accessories7Id": null,
        "tobaccoId": null,
        "productDate": "2024-04-08T16:00:00.000+00:00",
        "output": null,
        "amount": 2700
      },
      {
        "productId": null,
        "warehousingId": null,
        "outboundId": null,
        "accessories1Id": null,
        "accessories2Id": null,
        "accessories3Id": null,
        "accessories4Id": null,
        "accessories5Id": null,
        "accessories6Id": null,
        "accessories7Id": null,
        "tobaccoId": null,
        "productDate": "2024-04-07T16:00:00.000+00:00",
        "output": null,
        "amount": 2691
      },
      {
        "productId": null,
        "warehousingId": null,
        "outboundId": null,
        "accessories1Id": null,
        "accessories2Id": null,
        "accessories3Id": null,
        "accessories4Id": null,
        "accessories5Id": null,
        "accessories6Id": null,
        "accessories7Id": null,
        "tobaccoId": null,
        "productDate": "2024-04-06T16:00:00.000+00:00",
        "output": null,
        "amount": 2842
      }
    ]
  });

  const dateValues = warehousingData.data.map(item => {
    return [
      item.productDate.substring(5,10)
    ];
  });

  const warehousingDataValues = warehousingData.data.map(item => item.amount);
  console.log(warehousingDataValues); */

  const [warehousingData, setWarehousingData] = useState([]);
  const [outboundData, setOutboundData] = useState([]);
  const [dateData, setDateData] = useState([]);
  // 数据库实时加载
  useEffect(() => {
    // 发送 GET 请求获取数据
    const warehousingPromise = axios.get('http://47.109.192.248:8088/dashboard/product_chart/product_warehousing', {
    });
    const outboundPromise = axios.get('http://47.109.192.248:8088/dashboard/product_chart/product_outbound', {
    });

    Promise.all([warehousingPromise, outboundPromise])
      .then(([warehousingResponse, outboundResponse]) => {
        // 在控制台输出获取的数据
        console.log('从数据库获取到的原料数据：', warehousingResponse.data);
        console.log('从数据库获取到的辅料数据：', outboundResponse.data);
        // 请求成功，处理数据
        const warehousingDataValues = warehousingResponse.data.data.map(item => item.amount);
        const outboundDataValues = outboundResponse.data.data.map(item => item.amount);
        const dateValues = outboundResponse.data.data.map(item => {
          return [
            item.productDate.substring(5,10)
          ];
        });
        // 在控制台输出格式化后的数据
        console.log('格式化后的入库数据：', warehousingDataValues);
        console.log('格式化后的出库数据：', outboundDataValues);
        console.log('格式化后的日期：', dateValues);
        setWarehousingData(warehousingDataValues);
        setOutboundData(outboundDataValues);
        setDateData(dateValues);
      })
      .catch(error => {
        // 请求失败，输出错误信息
        console.error('请求失败：', error);
      });
  }, []); // 第二个参数传入空数组，表示只在组件挂载时执行一次

  let chartData = {
    //xdata: ['01/01', '01/02', '01/03', '01/04', '01/05'],
    //warehousing: [1, 1, 1, 1, 1],
    //outbound: [5000, 1500, 1000, 5000, 7000, 1000],
    //keeping: [500, 1000, 3000, 3000, 1000, 1000],
    xdata: dateData,
    warehousing: warehousingData,
    outbound: outboundData,
    keeping: warehousingData
  };
  let dataZoomFlag = false;
  let zoomEnd = 100;
  if (chartData.xdata.length > 8) {
    dataZoomFlag = true;
    zoomEnd = 60;
  }
  let option = {
    grid: {
      top: '10%',
      left: '3%',
      right: '18%',
      bottom: '13%',
    },
    barWidth: 6,
    tooltip: {
      show: true,
      trigger: 'axis',
      formatter: (params) => {
        return (
          params[0].name +
          '<br/>' +
          params[0].seriesName +
          ':' +
          params[0].value +
          '<br/>' +
          params[1].seriesName +
          ':' +
          params[1].value +
          '<br/>' +
          params[2].seriesName +
          ':' +
          params[2].value //+
          //'%'
        );
      },
    },
    dataZoom: [
      {
        show: dataZoomFlag,
        realtime: true,
        height: 8,
        start: 0,
        textStyle: {
          show: false,
        },
        end: zoomEnd,
        borderColor: 'rgba(255,255,255,0.20)',
        backgroundColor: 'rgba(255,255,255,0.10)',
        bottom: '1%',
      },
      {
        type: 'inside',
        realtime: true,
        start: 0,
        end: 100,
      },
    ],
    xAxis: [
      {
        type: 'category',
        data: chartData.xdata,
        splitLine: {
          lineStyle: {
            color: 'rgba(255,255,255,0.2)',
          },
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          //  改变x轴颜色
          lineStyle: {
            color: 'rgba(255,255,255,0.2)',
            type: 'solid',
          },
        },
        axisLabel: {
          //  改变x轴字体颜色和大小
          show: true,
          textStyle: {
            color: 'rgba(250,250,250,1)',
            fontSize: 12,
          },
        },
      },
    ],
    yAxis: [
      {
        name: '',
        nameTextStyle: {
          color: 'rgb(250,250,250,.7)',
          fontSize: 12,
          padding: [0, 25, 0, 0],
        },
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255,255,255,0.1)',
            type: 'dotted',
          },
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          //  改变y轴颜色
          show: false,
          lineStyle: {
            color: 'rgba(255,255,255,0.2)',
            type: 'solid',
          },
        },
        axisLabel: {
          //  改变y轴字体颜色和大小
          textStyle: {
            color: 'rgba(250,250,250,0.6)',
            fontSize: 12,
          },
        },
      },
      {
        name: '',
        nameTextStyle: {
          color: 'rgb(250,250,250,.7)',
          fontSize: 12,
          padding: [0, 0, 0, 40],
        },
        show: true,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          textStyle: {
            fontSize: 12,
            color: 'rgba(255,255,255, .7)',
          },
        },
      },
    ],
    series: [
      {
        type: 'bar',
        barMinHeight: 0,
        name: '入库量',
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#1AA0FF',
              },
              {
                offset: 1,
                color: 'rgba(3,14,55,0.6)',
              },
            ]),
            borderWidth: 2,
          },
        },
        data: chartData.warehousing,
      },
      {
        type: 'bar',
        barMinHeight: 0,
        name: '出库量',
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#FFBD46',
              },
              {
                offset: 1,
                color: 'rgba(3,14,55,0.6)',
              },
            ]),
            borderWidth: 2,
          },
        },
        data: chartData.outbound,
        barCategoryGap: '40%',
      },
      {
        z: 9,
        yAxisIndex: 1,
        name: '总仓储量',
        type: 'line',
        showAllSymbol: true,
        symbol: 'rect',
        symbolSize: 5,
        itemStyle: {
          color: '#fff',
          width: 1,
          shadowColor: '#fff',
          borderColor: '#44E5BE',
          shadowBlur: 2,
        },
        lineStyle: {
          width: 1,
          color: '#44E5BE',
        },
        data: chartData.keeping,
      },
    ],
  };

  return (
    <>
      <div>
        <ReactECharts style={{ height: '200px' }} option={option} />
      </div>
    </>
  );
};

export default Statistics;
