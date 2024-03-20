import { Canvas } from '@react-three/fiber';
import React, { useState, useContext } from 'react';
import BaseSence from './components/BaseSence';
import Factory from './components/Factory';
import CenterFactory from './components/CenterFactory';
import FirstFactory from './components/FirstFactory';
import SecondFactory from './components/SecondFactory';
import Gizmo from './components/Help';
import { ThreeMobx, ThreeStoreContext, observer } from 'mobx-threejs-store';
import Tools from './components/Tools';
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
        <CenterFactory />
        <FirstFactory/>
        <SecondFactory/>
        {props.children}
        {/* 帮助类 */}
        <Gizmo />
      </Canvas>
    </>
  );
};
export default Canva;
