import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface ILeafOne {
  position?: THREE.Vector3;
  radian?: number;
}

function LeafOne(props: ILeafOne) {
  const {position, radian } = props;
  
  const leafModel = useMemo(() => {
    // const res = useLoader(GLTFLoader, '/static/models/烟叶阵列.glb');
    const res = useLoader(
      GLTFLoader,
      process.env.NODE_ENV == 'development'
        ? '/static/models/烟叶阵列.glb'
        : `/tobacco factory/static/models/烟叶阵列.glb`
    );
    res.scene.scale.set(250, 250, 250);
    res.scene.rotation.z = 0.54;
    const clonedScene = res.scene.clone();
    return clonedScene;
  }, []);
  return (
    <group position={position} rotation-y={radian}>
      {leafModel && <primitive object={leafModel} />}
    </group>
  );
}

export default LeafOne;
