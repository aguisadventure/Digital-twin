//辅料入库表格数据

import { useEffect, useState } from 'react';
import axios from 'axios';

const AccessoryData = () => {
  // 定义存储数据的状态
  const [accessoryData, setAccessoryData] = useState([]);

  useEffect(() => {
    // 发送 GET 请求获取数据
    axios.get('http://localhost:8080/dashboard/accessory_list/raw_accessories', {
        params: {
            columns: ['accessories_id', 'type', 'name', 'supplier', 'amount'] // 指定要返回的列
        }
    })
      .then(accessoryResponse => {
        // 获取 raw_accessories 表数据
        const accessoryData = accessoryResponse.data;
        setAccessoryData(accessoryData); // 设置数据状态
      })
      .catch(error => {
        // 请求失败，输出错误信息
        console.error('获取 raw_accessories 表数据失败：', error);
      });
  }, []); // 第二个参数传入空数组，表示只在组件挂载时执行一次

  // 如果数据为空，可以显示加载中的提示
  if (accessoryData.length === 0) {
    return <div>Loading...</div>;
  }

  return accessoryData;
};

export default AccessoryData;
