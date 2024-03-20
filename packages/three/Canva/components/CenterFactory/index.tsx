/**
 * @file index.tsx
 * @description 存放仓库模型
 */

import React from 'react';
import House from './components/house';

import WarehouseMap from './components/WarehouseMap';

const CenterFactory = () => {
  return (
    <>
      <House />
      <WarehouseMap />
    </>
  );
};

export default CenterFactory;
