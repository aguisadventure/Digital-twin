//记录出入库信息

import { useEffect, useState } from 'react';
import { ScrollBoard } from '@jiaminghi/data-view-react';
import axios from 'axios';

const Allerway = () => {
  const [mergedData, setMergedData] = useState<any[]>([]);
  // 数据库实时加载
  useEffect(() => {
    // 发送 GET 请求获取数据
    const warehousingPromise = axios.get('http://47.109.192.248:8088/dashboard/warehouse/warehousing', {
    });
    const outboundPromise = axios.get('http://47.109.192.248:8088/dashboard/warehouse/outbound', {
    });

    Promise.all([warehousingPromise, outboundPromise])
      .then(([warehousingResponse, outboundResponse]) => {
        // 在控制台输出获取的数据
        console.log('从数据库获取到的入库数据：', warehousingResponse.data);
        console.log('从数据库获取到的出库数据：', outboundResponse.data);
        
        // 合并 warehousingData 和 outboundData，形成格式化数组
        const mergeData = [];
        // 将 warehousingData 中的数据格式化并添加到 mergeData 中
        warehousingResponse.data.data.forEach(item => {
          mergeData.push([
            item.id,
            item.storageTime.substring(5, 16),
            '入库',
            item.principalId
          ]);
        });

        // 将 outboundData 中的数据格式化并添加到 mergeData 中
        outboundResponse.data.data.forEach(item => {
          mergeData.push([
            item.id,
            item.outboundTime.substring(5, 16),
            '出库',
            item.principalId
          ]);
        });

        // 对 mergeData 中的数据按照时间进行排序
        mergeData.sort((a, b) => new Date(a[1]) - new Date(b[1]));
        setMergedData(mergeData);
        console.log(mergedData);
      })
      .catch(error => {
        // 请求失败，输出错误信息
        console.error('请求失败：', error);
      });
  }, []); // 第二个参数传入空数组，表示只在组件挂载时执行一次


  const config = {
    header: ['id', '时间', '类型', '责任id'],
    data: mergedData,
    /* data: [
      ['1', '2023-06-01 12:00', '入库', '大黄'],
      ['2', '2023-06-01 12:00', '出库', '小黑'],
      ['3', '2023-06-01 12:00', '入库', '粉粉'],
      ['4', '2023-06-01 12:00', '出库', '阿绿'],
      ['5', '2023-06-01 12:00', '入库', '毛毛'],
      ['6', '2023-06-01 12:00', '出库', '瑞瑞'],
      ['7', '2023-06-01 12:00', '入库', '小帅'],
      ['8', '2023-06-01 12:00', '出库', '小美'],
    ], */
    headerBGC: '#00fff138',
    oddRowBGC: '#00000017',
    evenRowBGC: '#ededed13',
    headerHeight: 28,
    rowNum: 8,
    columnWidth: [60, 150, 80, 80],
  };
  return (
    <ScrollBoard
      config={config}
      style={{ width: '100%', height: '220px', fontSize: '12px', marginBottom: '8px' }}
    />
  );
};

export default Allerway;
