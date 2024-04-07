import { Canvas } from '@react-three/fiber';
import React, { useState, useContext } from 'react';
import BaseSence from './components/BaseSence';
import Factory from './components/Factory';
import Gizmo from './components/Help';
import { ThreeMobx, ThreeStoreContext, observer } from 'mobx-threejs-store';
import Tools from './components/Tools';
import ManufacturingWorkshop from './components/ManufacturingWorkshop';
import PackageWorkshop from './components/PackageWorkshop';
import GeneralControlWorkshop from './components/GeneralControlWorkshop';
import StorageWorkshop from './components/StorageWorkshop';
import { isOrthographicCamera } from '@react-three/fiber/dist/declarations/src/core/utils';
// 创建Canva组件
const Canva = (props) => {
  return (
    <>
      {/* <Tools /> */}
      <Canvas
        shadows
        gl={{
          logarithmicDepthBuffer: true,
        }}
      >
        {/* 场景类 */}
        <BaseSence />
        {/* 工厂类 */}
        <ManufacturingWorkshop />
        <PackageWorkshop />
        <GeneralControlWorkshop />
        {/* <Factory /> */}
        <StorageWorkshop />
        {props.children}
        {/* 帮助类 */}
        <Gizmo />
      </Canvas>
    </>
  );
};
export default Canva;
