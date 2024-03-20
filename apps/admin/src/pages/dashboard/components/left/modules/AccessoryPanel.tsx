//展示辅料入库情况记录

import { ScrollBoard } from '@jiaminghi/data-view-react';

const AccessoryPanel = () => {
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
