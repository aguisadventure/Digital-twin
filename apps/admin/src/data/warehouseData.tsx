//出入库数据

import { useEffect, useState } from 'react';
import axios from 'axios';

const WarehouseData = () => {
  // 定义存储数据的状态
  const [warehouseData, setWarehouseData] = useState([]);

  useEffect(() => {
    // 发送 GET 请求获取 warehousing 表数据
    const warehousingPromise = axios.get('http://localhost:8080/dashboard/warehouse/warehousing', {
      params: {
        columns: ['id', 'storage_time', 'principal'] // 指定要返回的列
      }
    });

    // 发送 GET 请求获取 outbound 表数据
    const outboundPromise = axios.get('http://localhost:8080/dashboard/warehouse/outbound', {
      params: {
        columns: ['id', 'outbound_time', 'pricipal'] // 指定要返回的列
      }
    });

    // 并行发送请求
    Promise.all([warehousingPromise, outboundPromise])
      .then(([warehousingResponse, outboundResponse]) => {
        // 获取 warehousing 表数据
        const warehousingData = warehousingResponse.data;
        // 获取 outbound 表数据
        const outboundData = outboundResponse.data;
        
        // 合并两个数据数组
        const warehouseData = mergeData(warehousingData, outboundData);
        
        // 设置数据状态
        setWarehouseData(warehouseData);
      })
      .catch(error => {
        // 请求失败，输出错误信息
        console.error('获取数据失败：', error);
      });
  }, []); // 第二个参数传入空数组，表示只在组件挂载时执行一次

  // 如果数据为空，可以显示加载中的提示
  if (warehouseData.length === 0) {
    return <div>Loading...</div>;
  }

  // 返回 JSX 元素
  return warehouseData;
};

// 合并两个数据数组的函数
const mergeData = (warehousingData, outboundData) => {
  // 使用 concat() 方法将两个数组连接起来
  const mergedData = warehousingData.concat(outboundData);
  return mergedData;
};

export default WarehouseData;
