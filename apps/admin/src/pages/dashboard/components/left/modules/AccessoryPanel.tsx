//展示辅料入库情况记录

import { useEffect, useState } from 'react';
import { ScrollBoard } from '@jiaminghi/data-view-react';

const AccessoryPanel = () => {
  /* // 定义存储数据的状态
  const [accessoriesData, setAccessoriesData] = useState([]);
  // 定义后端 API 的基本 URL
  const baseURL = 'http://localhost:8080';
  // 构建参数对象
  const params = {
    columns: ['入库单号', '种类', '名称', '供应商'], // 指定要返回的列
    filters: {
      入库单号: '某某' // 指定入库单号的值
    }
  };

  useEffect(() => {
    // 发送 GET 请求获取数据
    axios.get('/api/accessories', {
      baseURL: baseURL,
      params: params
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

  // 如果数据为空，显示加载中的提示
  if (accessoriesData.length === 0) {
    return <div>Loading...</div>;
  } */

  // 构建配置对象
/*   const config = {
    header: ['入库单号', '种类', '名称', '供应商', '数量'],
    data: accessoriesData,
    headerBGC: '#00fff138',
    oddRowBGC: '#00000017',
    evenRowBGC: '#ededed13',
    headerHeight: 28,
    rowNum: 7,
    columnWidth: [100, 80, 90, 100, 110],
  }; */

  const config = {
    header: ['入库单号', '种类', '名称', '供应商', '数量'],
    data: [
      ['RK2024001', '加香剂', '水果香料', 'ABC香料厂', '10kg'],
      ['RK2024002', '填充剂', '木浆', 'XYZ纤维公司', '1t'],
      ['RK2024003', '滤嘴', '滤棒', 'DEF滤棒厂', '100箱(50件/箱)'],
      ['RK2024004', '纸张', '米色卷烟纸', 'ABC烟草公司', '60kg'],
      ['RK2024005', '胶水', '水溶性胶水', 'ABC烟草公司', '500L'],
      ['RK2024006', '添加剂', '防腐剂', 'ABC烟草公司', '50kg'],
      ['RK2024007', '印刷油墨', 'UV彩色油墨', 'ABC烟草公司', '600L'],
    ],
    headerBGC: '#00fff138',
    oddRowBGC: '#00000017',
    evenRowBGC: '#ededed13',
    headerHeight: 28,
    rowNum: 7,
    columnWidth: [100, 80, 90, 100, 110],
  };
  return (
    <ScrollBoard
      config={config}
      style={{ width: '100%', height: '220px', fontSize: '12px', marginBottom: '8px' }}
    />
  );
};

export default AccessoryPanel;
