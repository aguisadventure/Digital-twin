import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface ILeafTwo {
  position?: THREE.Vector3;
  radian?: number;
}

function LeafTwo(props: ILeafTwo) {
  const {position, radian } = props;
  
  const leafModel2 = useMemo(() => {
    // const res = useLoader(GLTFLoader, '/static/models/烟叶阵列.glb');
    const res2 = useLoader(
      GLTFLoader,
      process.env.NODE_ENV == 'development'
        ? '/static/models/烟叶阵列.glb'
        : `/tobacco factory/static/models/烟叶阵列.glb`
    );
    res2.scene.scale.set(250, 250, 250);
    //res.scene.rotation.z = 0.54;
    const clonedScene = res2.scene.clone();
    return clonedScene;
  }, []);
  return (
    <group position={position} rotation-y={radian}>
      {leafModel2 && <primitive object={leafModel2} />}
    </group>
  );
}

export default LeafTwo;
