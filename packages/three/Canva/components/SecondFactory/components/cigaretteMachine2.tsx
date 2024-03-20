import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface ICigaretteMachine2Props {
  position?: THREE.Vector3;
  rotation?: THREE.Euler;
}

function CigarettMachine2(props: ICigaretteMachine2Props) {
  const { position = new THREE.Vector3(0, 0, 0), rotation = new THREE.Euler(0, 0, 0) } = props;

  const model = useMemo(() => {
    const gltfRef = useRef(null);
    const gltf = useLoader(
      GLTFLoader,
      process.env.NODE_ENV === 'development'
        ? '/static/models/工厂模型.glb'
        : '/degital-twin-3d/static/models/工厂模型.glb'
    );
    gltf.scene.scale.set(50, 50, 50);
    const clonedScene = gltf.scene.clone();
    // 如果需要对模型进行额外的操作，可以在这里添加代码
    return clonedScene;
  }, []);

  return <primitive object={model} position={position} rotation={rotation} />;
}

export default CigarettMachine2;
