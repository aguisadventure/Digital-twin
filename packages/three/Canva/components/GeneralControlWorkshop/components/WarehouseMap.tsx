import { useEffect, useRef, useMemo } from 'react';
import { useFBX } from '@react-three/drei';
import Stats from 'three/examples/jsm/libs/stats.module';
import { useFrame } from '@react-three/fiber';
import React, { useState } from 'react';
import CigarettMachine from './cigaretteMachine';
import CigarettMachine2 from './cigaretteMachine2';
import MxwCar from './mxwCar';
import { observer } from 'mobx-threejs-store';
import { useThree } from '@react-three/fiber';

import * as THREE from 'three';
import animationData from '../data/animation';
const { Vector3 } = THREE;

let index = 0;
let cntTime = 0;

const WarehouseMap = observer(() => {
  const { camera } = useThree();

  const [cigaretteMachineData, setcigaretteMachineData] = useState({
    position: [2600, 0, -700],
    rotation: [0, -1.57, 0],
  });
  /* const [cigaretteMachineData2, setcigaretteMachineData2] = useState({
    position: [-2700, 0, 1150],
    rotation: [0, 0, 0],
  }); */
  const [mxwCarData, setMxwCarData] = useState({
    position: [400, 0, 700],
    hasGoods: false,
    radian: 0,
  });

  const statsRef = useRef<Stats | null>(null);

  function getDis(delta: number, data: any) {
    const { from, to, time } = data;
    const [x1, y1, z1] = from;
    const [x2, y2, z2] = to;
    const dis_x = ((x2 - x1) / time) * delta;
    const dis_y = ((y2 - y1) / time) * delta;
    const dis_z = ((z2 - z1) / time) * delta;
    return [dis_x, dis_y, dis_z];
  }

  function getRad(delta: number, data: any) {
    const { varyRadian, time } = data;
    const rad = (varyRadian / time) * delta;
    return rad;
  }

  useFrame((_, delta) => {
    if (index > animationData.length) return;
    delta *= 1000;
    const curList = animationData[index];
    const time = curList[0].time;
    for (let j = 0; j < curList.length; j++) {
      const cur = curList[j];
      const { el, hasGoods, radian, type } = cur;
      let dis: number[] = [0, 0, 0];
      let rad = 0;
      if (type === 'move') dis = getDis(delta, cur);
      if (type === 'rotate') rad = getRad(delta, cur);
      const [dis_x, dis_y, dis_z] = dis;
      if (el === 'mxwCar') {
        setMxwCarData((state) => {
          const [x, y, z] = state.position;
          return {
            position: [x + dis_x, y + dis_y, z + dis_z],
            hasGoods,
            radian: (state.radian || radian) + rad,
          };
        });

/*         // 相机始终跟随mxwCar
        camera.position.set(
          mxwCarData.position[0],
          mxwCarData.position[1] + 100,
          mxwCarData.position[2] + 300
        );
        //相机跟随小车旋转
        //camera.rotation.setY(mxwCarData.radian);
        camera.rotation.set(0, mxwCarData.radian, 0);
        // 相机角度跟随
        camera.lookAt(mxwCarData.position[0], mxwCarData.position[1], mxwCarData.position[2]); */
        
      }
    }
    cntTime += delta;
    if (cntTime >= time) {
      cntTime = 0;
      index++;
      if (index >= animationData.length) {
        setMxwCarData({ position: [400, 0, 700], hasGoods: false, radian: 0 });
        index = 0;
      }
    }
  });

  const mxwCar = useMemo(() => <MxwCar {...mxwCarData}></MxwCar>, [mxwCarData]);
  const cigaretteMachine1 = useMemo(() => <CigarettMachine {...cigaretteMachineData}></CigarettMachine>, [cigaretteMachineData])
  /* const cigaretteMachine2 = useMemo(() => <CigarettMachine2 {...cigaretteMachineData2}></CigarettMachine2>, [cigaretteMachineData2]) */
  return (
    <group>
      {/* <Ground /> */}
      {cigaretteMachine1}
      {mxwCar}
      {/* {cigaretteMachine2} */}
    </group>
  );
});

export default WarehouseMap;
