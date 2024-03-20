import { useEffect, useRef, useMemo } from 'react';
import { useFBX } from '@react-three/drei';
import Stats from 'three/examples/jsm/libs/stats.module';
import { useFrame } from '@react-three/fiber';
import React, { useState } from 'react';
import CigarettMachine from './cigaretteMachine';
import CigarettMachine2 from './cigaretteMachine2';
import { observer } from 'mobx-threejs-store';
import { useThree } from '@react-three/fiber';

import * as THREE from 'three';
const { Vector3 } = THREE;

let index = 0;
let cntTime = 0;

const WarehouseMap = observer(() => {
  const { camera } = useThree();

  const [cigaretteMachineData, setcigaretteMachineData] = useState({
    position: [3100, 0, 1000],
    rotation: [0, 0, 0],
  });
  const [cigaretteMachineData2, setcigaretteMachineData2] = useState({
    position: [-2700, 0, 1150],
    rotation: [0, 0, 0],
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

  function getHeight(type: string, data: any, delta: number) {
    let h = 0;
    if (type === 'liftArm') {
      const { formLiftH, toLiftH, time } = data;
      h = ((toLiftH - formLiftH) / time) * delta;
    } else if (type === 'forkArm') {
      const { formForkH, toForkH, time } = data;
      h = ((toForkH - formForkH) / time) * delta;
    }
    return h;
  }

  const cigaretteMachine1 = useMemo(() => <CigarettMachine {...cigaretteMachineData}></CigarettMachine>, [cigaretteMachineData])
  const cigaretteMachine2 = useMemo(() => <CigarettMachine2 {...cigaretteMachineData2}></CigarettMachine2>, [cigaretteMachineData2])
  return (
    <group>
      {/* <Ground /> */}
      {cigaretteMachine1}
      {cigaretteMachine2}
    </group>
  );
});

export default WarehouseMap;
