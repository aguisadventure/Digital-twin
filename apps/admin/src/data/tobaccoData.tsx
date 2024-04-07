//原料入库表格数据

import { useEffect, useState } from 'react';
import axios from 'axios';

const TobaccoData = () => {
  // 定义存储数据的状态
  const [tobaccoData, setTobaccoData] = useState([]);

  useEffect(() => {
    // 发送 GET 请求获取数据
    axios.get('http://localhost:8080/dashboard/tobacco_list/raw_tobacco', {
        params: {
            columns: ['tobacco_id', 'name', 'supplier', 'amount', 'raw_rank', 'origin' ] // 指定要返回的列
        }
    })
      .then(tobaccoResponse => {
        // 获取 raw_accessories 表数据
        const tobaccoData = tobaccoResponse.data;
        setTobaccoData(tobaccoData); // 设置数据状态
      })
      .catch(error => {
        // 请求失败，输出错误信息
        console.error('获取 raw_accessories 表数据失败：', error);
      });
  }, []); // 第二个参数传入空数组，表示只在组件挂载时执行一次

  // 如果数据为空，可以显示加载中的提示
  if (tobaccoData.length === 0) {
    return <div>Loading...</div>;
  }

  return tobaccoData;
};

export default TobaccoData;
