import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface ICigaretteMachineProps {
  position?: THREE.Vector3;
  rotation?: THREE.Euler;
}

function CigarettMachine(props: ICigaretteMachineProps) {
  const { position = new THREE.Vector3(0, 0, 0), rotation = new THREE.Euler(0, 0, 0) } = props;

  const model = useMemo(() => {
    const gltfRef = useRef(null);
    const gltf = useLoader(
      GLTFLoader,
      process.env.NODE_ENV === 'development'
        ? '/static/models/卷包车间.glb'
        : '/degital-twin-3d/static/models/卷包车间.glb'
    );
    gltf.scene.scale.set(70, 70, 70);
    const clonedScene = gltf.scene.clone();
    // 如果需要对模型进行额外的操作，可以在这里添加代码
    return clonedScene;
  }, []);

  return <primitive object={model} position={position} rotation={rotation} />;
}

export default CigarettMachine;
