import { useEffect, useRef, useMemo } from 'react';
import { useFBX } from '@react-three/drei';
import Stats from 'three/examples/jsm/libs/stats.module';
import { useFrame } from '@react-three/fiber';
import React, { useState } from 'react';
import CigarettMachine from './cigaretteMachine';
import SLeafOT from './sLeafOT';
import LeafOne from './leafOne';
import LeafTwo from './leafTwo';
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
    position: [-4250, 0, -100],
    rotation: [0, 3.1415, 0],
  });
  const [sLeafOTData2, setSLeafOTData2] = useState({
    position: [-3750, 215, 150],
    rotation: [0, 0, 0],
  });
  const [sLeafOTData3, setSLeafOTData3] = useState({
    position: [-4280, 10, 150],
    rotation: [0, 0, 0],
  });
  const [leafOneData, setLeafOneData] = useState({
    position: [-4070, 0, 150],
    radian: 0,
  });
  const [leafTwoData, setLeafTwoData] = useState({
    position: [-3500, 0, 150],
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
      const { el, radian, type } = cur;
      let dis: number[] = [0, 0, 0];
      let rad = 0;
      if (type === 'move') dis = getDis(delta, cur);
      if (type === 'rotate') rad = getRad(delta, cur);
      const [dis_x, dis_y, dis_z] = dis;
      if (el === 'leafOne') {
        setLeafOneData((state) => {
          const [x, y, z] = state.position;
          return {
            position: [x + dis_x, y + dis_y, z + dis_z],
            radian: (state.radian || radian) + rad,
          };
        });

        /* // 相机始终跟随leafOne
        camera.position.set(
          leafOneData.position[0],
          leafOneData.position[1] + 100,
          leafOneData.position[2] + 300
        );
        //相机跟随小车旋转
        //camera.rotation.setY(leafOneData.radian);
        camera.rotation.set(0, leafOneData.radian, 0);
        // 相机角度跟随
        camera.lookAt(leafOneData.position[0], leafOneData.position[1], leafOneData.position[2]); */
        
      } else if(el === 'leafTwo') {
        setLeafTwoData((state) => {
          const [x, y, z] = state.position;
          return {
            position: [x + dis_x, y + dis_y, z + dis_z],
            radian: (state.radian || radian) + rad,
          };
        });
      }
    }
    cntTime += delta;
    if (cntTime >= time) {
      cntTime = 0;
      index++;
      if (index >= animationData.length) {
        setLeafOneData({ position: [-4070, 0, 150], radian: 0 });
        setLeafTwoData({ position: [-3500, 0, 150], radian: 0 });
        index = 0;
      }
    }
  });

  const leafOne = useMemo(() => <LeafOne {...leafOneData}></LeafOne>, [leafOneData]);
  const leafTwo = useMemo(() => <LeafTwo {...leafTwoData}></LeafTwo>, [leafTwoData]);
  const cigaretteMachine1 = useMemo(() => <CigarettMachine {...cigaretteMachineData}></CigarettMachine>, [cigaretteMachineData])
  const sLeafOT2 = useMemo(() => <SLeafOT {...sLeafOTData2}></SLeafOT>, [sLeafOTData2])
  const sLeafOT3 = useMemo(() => <SLeafOT {...sLeafOTData3}></SLeafOT>, [sLeafOTData3])
  return (
    <group>
      {/* <Ground /> */}
      {cigaretteMachine1}
      {sLeafOT2}
      {sLeafOT3}
      {leafOne}
      {leafTwo}
    </group>
  );
});

export default WarehouseMap;
