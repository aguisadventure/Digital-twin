import { useEffect, useState } from 'react';
import axios from 'axios';

const AccessoryPanel = () => {
  // 定义存储数据的状态
  const [accessoriesData, setAccessoriesData] = useState([]);

  useEffect(() => {
    // 发送 GET 请求获取数据
    axios.get('http://localhost:8080/api/accessories', {
      params: {
        columns: ['入库单号', '种类', '名称', '供应商'] // 指定要返回的列
      }
    })
      .then(response => {
        // 请求成功，设置数据状态
        setAccessoriesData(response.data);
      })
      .catch(error => {
        // 请求失败，输出错误信息
        console.error('请求失败：', error);
      });
  }, []); // 第二个参数传入空数组，表示只在组件挂载时执行一次

  // 如果数据为空，可以显示加载中的提示
  if (accessoriesData.length === 0) {
    return <div>Loading...</div>;
  }

  return
};

export default AccessoryPanel;