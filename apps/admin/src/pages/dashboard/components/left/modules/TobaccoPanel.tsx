//展示原料入库情况记录

import { ScrollBoard } from '@jiaminghi/data-view-react';

const TobaccoPanel = () => {
  const config = {
    header: ['入库单号', '名称', '供应商', '数量', '等级', '原产地'],
    data: [
      ['RK2024008', '烤烟', 'ABC烟草公司', '10t', 'A', '美国北卡罗莱纳州'],
      ['RK2024009', '华南烟叶', 'YXZ烟草公司', '10t', 'B', '中国广东省'],
      ['RK20240010', '黄钻烟叶', 'AAA烟草公司', '10t', '特级', '巴西'],
      ['RK20240011', '金满堂烟叶', 'VVV烟草公司', '10t', 'A', '中国云南省'],
      ['RK20240012', '丝绸之路烟叶', 'DSV烟草公司', '10t', '特级', '土耳其'],
    ],
    headerBGC: '#00fff138',
    oddRowBGC: '#00000017',
    evenRowBGC: '#ededed13',
    headerHeight: 28,
    rowNum: 5,
    columnWidth: [95, 85, 100, 50, 50, 135],
  };
  return (
    <ScrollBoard
      config={config}
      style={{ width: '100%', height: '220px', fontSize: '12px', marginBottom: '8px' }}
    />
  );
};

export default TobaccoPanel;
