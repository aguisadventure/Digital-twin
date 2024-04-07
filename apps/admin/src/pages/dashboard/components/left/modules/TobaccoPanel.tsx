//展示原料入库情况记录

import { ScrollBoard } from '@jiaminghi/data-view-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const TobaccoPanel = () => {
  const [tobaccoData, setTobaccoData] = useState([]);
  // 数据库实时加载
  useEffect(() => {
    // 发送 GET 请求获取数据
    axios.get('http://47.109.192.248:8088/dashboard/tobacco_list/raw_tobacco', {
    })
      .then(response => {
        // 在控制台输出获取的数据
        console.log('从数据库获取到的数据：', response.data);
        // 请求成功，处理数据
        const formattedData = response.data.data.map(item => {
          return [
            item.warehousingId,
            item.name,
            item.supplier,
            item.amount,
            item.rawRank,
            item.origin
          ];
        });
        // 在控制台输出格式化后的数据
        console.log('格式化后的数据：', formattedData);
        setTobaccoData(formattedData);
      })
      .catch(error => {
        // 请求失败，输出错误信息
        console.error('请求失败：', error);
      });
  }, []); // 第二个参数传入空数组，表示只在组件挂载时执行一次


  const config = {
    header: ['入库单号', '名称', '供应商', '数量', '等级', '原产地'],
    data: tobaccoData,
    /* data: [
      ['RK2024008', '烤烟', 'ABC烟草公司', '10t', 'A', '美国北卡罗莱纳州'],
      ['RK2024009', '华南烟叶', 'YXZ烟草公司', '10t', 'B', '中国广东省'],
      ['RK20240010', '黄钻烟叶', 'AAA烟草公司', '10t', '特级', '巴西'],
      ['RK20240011', '金满堂烟叶', 'VVV烟草公司', '10t', 'A', '中国云南省'],
      ['RK20240012', '丝绸之路烟叶', 'DSV烟草公司', '10t', '特级', '土耳其'],
    ], */
    headerBGC: '#00fff138',
    oddRowBGC: '#00000017',
    evenRowBGC: '#ededed13',
    headerHeight: 28,
    rowNum: 5,
    columnWidth: [80, 120, 140, 50, 50, 80],
  };
  return (
    <ScrollBoard
      config={config}
      style={{ width: '100%', height: '220px', fontSize: '12px', marginBottom: '8px' }}
    />
  );
};

export default TobaccoPanel;
