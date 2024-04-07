// 添加场景相机
import { useThree, PerspectiveCameraProps } from '@react-three/fiber';
import {
  PerspectiveCamera,
  CameraControls,
  PresentationControls,
  FlyControls,
  OrbitControls,
  FirstPersonControls,
  MapControls,
} from '@react-three/drei';
import * as THREE from 'three';

import PointerCtrl from './CtrlPointerLock';
import React, { useContext, useEffect, useRef } from 'react';
import { observer, ThreeStoreContext } from 'mobx-threejs-store';

const Camera = (props: any) => {
  const threeObj = useThree();
  const camera = threeObj.camera;
  const mobxStore = useContext(ThreeStoreContext);

  // 创建一个对相机的引用
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

    // 在每次选择不同的相机控制器时，设置相机的朝向
    useEffect(() => {
      if (cameraRef.current) {
        const camera = cameraRef.current;
  
        // 根据选择的相机控制器设置相机的朝向
        switch (mobxStore.threeStore.cameraCtrls.choiceCtrls) {
          case '0':
            camera.lookAt(0, 0, 0);
            break;
          case '1':
            camera.lookAt(0, 0, 0); // 如果需要修改朝向，可以在这里调整
            break;
          case '2':
            camera.lookAt(-3150, 150, 200); // 如果需要修改朝向，可以在这里调整
            break;
          case '3':
            camera.lookAt(200, 200, 200); // 如果需要修改朝向，可以在这里调整
            break;
          case '4':
            camera.lookAt(3400, 150, 200); // 如果需要修改朝向，可以在这里调整
            break;
          case '5':
            camera.lookAt(200, 200, -2800); // 如果需要修改朝向，可以在这里调整
            break;
          // 在需要添加更多相机控制器时，可以在这里继续添加case
          default:
            break;
        }
      }
    }, [mobxStore.threeStore.cameraCtrls.choiceCtrls]);

  return (
    <>
      {mobxStore.threeStore.cameraCtrls.choiceCtrls === '0' && (
        <group>
          <CameraControls />
          <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={[0, 800, -1200]}
            fov={48}
            near={1}
            far={100000}
            maxDistance={10}
            {...props}
          />
        </group>
      )}
      {mobxStore.threeStore.cameraCtrls.choiceCtrls === '1' && (
        <group>
          <FirstPersonControls far={100000} movementSpeed={100} activeLook={false} lookVertical={true} />
          <MapControls zoomSpeed={0.1} />
          <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={[0, 800, -1200]}
            fov={48}
            near={1}
            far={100000}
            maxDistance={10}
            {...props}
          />
        </group>
      )}
      {mobxStore.threeStore.cameraCtrls.choiceCtrls === '2' && (
        <group>
          <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={[-3150, 800, -1200]}
            fov={48}
            near={1}
            far={100000}
            maxDistance={10}
            {...props}
          />
        </group>
      )}
      {mobxStore.threeStore.cameraCtrls.choiceCtrls === '3' && (
        <group>
          <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={[200, 800, -1200]}
            fov={48}
            near={1}
            far={100000}
            maxDistance={10}
            {...props}
          />
        </group>
      )}
      {mobxStore.threeStore.cameraCtrls.choiceCtrls === '4' && (
        <group>
          <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={[3400, 800, -1200]}
            fov={48}
            near={1}
            far={100000}
            maxDistance={10}
            {...props}
          />
        </group>
      )}
      {mobxStore.threeStore.cameraCtrls.choiceCtrls === '5' && (
        <group>
          <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={[200, 800, -4200]}
            fov={48}
            near={1}
            far={100000}
            maxDistance={10}
            {...props}
          />
        </group>
      )}
      {/* 其他相机控制器的选择和设置可以在这里继续添加 */}
    </>
  );
};

export default observer(Camera);
