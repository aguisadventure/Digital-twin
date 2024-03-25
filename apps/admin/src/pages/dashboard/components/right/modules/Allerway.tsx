//记录出入库信息

import { ScrollBoard } from '@jiaminghi/data-view-react';

const Allerway = () => {
  const config = {
    header: ['id', '时间', '类型', '负责人'],
    data: [
      ['1', '2023-06-01 12:00', '入库', '大黄'],
      ['2', '2023-06-01 12:00', '出库', '小黑'],
      ['3', '2023-06-01 12:00', '入库', '粉粉'],
      ['4', '2023-06-01 12:00', '出库', '阿绿'],
      ['5', '2023-06-01 12:00', '入库', '毛毛'],
      ['6', '2023-06-01 12:00', '出库', '瑞瑞'],
      ['7', '2023-06-01 12:00', '入库', '小帅'],
      ['8', '2023-06-01 12:00', '出库', '小美'],
    ],
    headerBGC: '#00fff138',
    oddRowBGC: '#00000017',
    evenRowBGC: '#ededed13',
    headerHeight: 28,
    rowNum: 8,
    columnWidth: [30, 175, 50, 100],
  };
  return (
    <ScrollBoard
      config={config}
      style={{ width: '100%', height: '220px', fontSize: '12px', marginBottom: '8px' }}
    />
  );
};

export default Allerway;
