import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { ThreeElements, useLoader, extend } from '@react-three/fiber';
import { Geometry, Base, Subtraction, Addition } from '@react-three/csg';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
extend({ TextGeometry });

interface IHouse {
  // 墙的厚度
  wallThickness?: number;
  floorThickness?: number;
  width?: number;
  length?: number;
  // aside 仓库周围的宽度，主要是算仓库地板的大小
  aside_width?: number;
  aside_length: number;
  height?: number;
  position?: THREE.Vector3;
  // 整个空间的大小
  space_width?: number;
  space_length?: number;
  // 门口的马路的宽度
  road_width?: number;
  // 草坪的宽度
  grass_width: number;
  // 下水管道的宽度
  cross_width: number;
}

type extraAry = {
  i?: number;
  setShape?: (shape: THREE.Shape, point: THREE.Vector2) => void;
};

const House = (props: IHouse) => {
  const {
    wallThickness = 2,
    width = 1400,
    length = 1200,
    height = 400,
    position = new THREE.Vector3(3500, 0, 0),
    space_width = 10000,
    space_length = 12000,
  } = props;

  const getPointToShape = (points: THREE.Vector2[], extra?: extraAry[]) => {
    const shape = new THREE.Shape();
    const obj: Record<string, any> = {};
    extra?.forEach((item: any) => {
      obj[item.i] = item.setShape;
    });
    points.forEach((point, index) => {
      const { x, y } = point;
      if (!index) {
        shape.moveTo(x, y);
      }
      if (obj[index]) {
        obj[index](shape, point);
      } else {
        shape.lineTo(x, y);
      }
    });
    return shape;
  };

  const texture = new THREE.TextureLoader().load(
    process.env.NODE_ENV == 'development'
      ? '/static/wall_pic5.jpg'
      : `/degital-twin-3d/static/wall_pic5.jpg`
  );
  console.log('env', process.env.NODE_ENV);

  texture.wrapS = THREE.RepeatWrapping; // 水平方向重复
  texture.repeat.set(0.02, 0.02);

  const roofTexture = new THREE.TextureLoader().load(
    process.env.NODE_ENV == 'development'
      ? '/static/wall_pic7.png'
      : `/degital-twin-3d/static/wall_pic7.png`
  );
  roofTexture.wrapS = THREE.RepeatWrapping; // 水平方向重复
  roofTexture.wrapT = THREE.RepeatWrapping; // 垂直方向重复
  roofTexture.rotation = Math.PI / 2;
  roofTexture.repeat.set(0.005, 0.005);

  const getBackWallShape = () => {
    const shape = getPointToShape([
      new THREE.Vector2(-length, -height),
      new THREE.Vector2(-length, height),
      new THREE.Vector2(length, height),
      new THREE.Vector2(length, -height),
    ]);
    const doorHoles = new THREE.Path();
    doorHoles.moveTo(-width / 30, -height);
    doorHoles.lineTo(-width / 30, (-2 * height) / 5);
    doorHoles.lineTo(width / 30, (-2 * height) / 5);
    doorHoles.lineTo(width / 30, -height);
    doorHoles.moveTo(-width / 30, -height);
    shape.holes.push(doorHoles);
    return shape;
  };

  // 第一层
  const getBackWallTopShape = () => {
    const shape = getPointToShape([
      new THREE.Vector2(-length, -height / 2),
      new THREE.Vector2(-length, -(height / 2 - 5)),
      new THREE.Vector2(-length / 2, height / 4),
      new THREE.Vector2(0, -(height / 2 - 5)),
      new THREE.Vector2(length / 2, height / 4),
      new THREE.Vector2(length, -(height / 2 - 5)), // 右边。x轴是一样的，不断加厚度
      new THREE.Vector2(length, -height / 2),
      new THREE.Vector2(-length, -height / 2),
    ]);
    return shape;
  };

  // 第二层
  const getRoofShape = () => {
    const shape = getPointToShape(
      [
        new THREE.Vector2(-length, -(height / 2 - 5)), // 第一个点,椭圆曲线加载第一第二个点之间
        new THREE.Vector2(-length, -(height / 2 + 5)),
        new THREE.Vector2(-length - wallThickness - 5, -(height / 2 + 5)),
        // new THREE.Vector2(-length - (5 * length) / (height / 2 - 10), -(height / 2 + 10)),
        new THREE.Vector2(-length - wallThickness - 5, -(height / 2 - 5) + 2 * wallThickness), // 做曲线的那一条
        // new THREE.Vector2(-length - wallThickness, -(height / 2 - 5) + wallThickness),
        new THREE.Vector2(-length, -(height / 2 - 5) + 2 * wallThickness),
        new THREE.Vector2(-length, -(height / 2 - 5) + wallThickness), // 第二个点
        new THREE.Vector2(-length / 2, height / 4 + wallThickness),
        new THREE.Vector2(0, -(height / 2 - 5) + wallThickness), // 第二低点顶点
        new THREE.Vector2(length / 2, height / 4 + wallThickness),
        new THREE.Vector2(length, -(height / 2 - 5) + wallThickness), // 第三低点顶点
        // 在这里做圆柱
        new THREE.Vector2(length, -(height / 2 - 5) + 2 * wallThickness),
        new THREE.Vector2(length + 5, -(height / 2 - 5) + 2 * wallThickness),
        new THREE.Vector2(length + 5, -(height / 2 - 5) + 2 * wallThickness - 15), // 做曲线的那一条
        new THREE.Vector2(length, -(height / 2 - 5) + 2 * wallThickness - 15),
        // over
        new THREE.Vector2(length, -(height / 2 - 5)), // 第三低点底点
        new THREE.Vector2(length / 2, height / 4),
        new THREE.Vector2(0, -(height / 2 - 5)), // 第二低点底点
        new THREE.Vector2(-length / 2, height / 4),
        new THREE.Vector2(-length, -(height / 2 - 5)), // 原点
      ],
      [
        {
          i: 3,
          setShape: (shape: THREE.Shape, point: THREE.Vector2) => {
            const { x, y } = point;
            shape.bezierCurveTo(
              -length - wallThickness - 5 - 2.5,
              -(height / 2 + 5 - 14 / 4),
              -length - wallThickness - 5 - 2.5,
              -(height / 2 + 5 - (14 * 3) / 4),
              x,
              y
            );
          },
        },
        {
          i: 12,
          setShape: (shape: THREE.Shape, point: THREE.Vector2) => {
            const { x, y } = point;
            shape.bezierCurveTo(
              length + 5 + 2.5,
              -(height / 2 - 5) + 2 * wallThickness - 14 / 4,
              length + 5 + 2.5,
              -(height / 2 - 5) + 2 * wallThickness - (14 * 3) / 4,
              x,
              y
            );
          },
        },
      ]
    );
    return shape;
  };

  // 第三层
  const getTopRoofShape = () => {
    const shape = getPointToShape([
      new THREE.Vector2(-length, -(height / 2 - 5) + wallThickness),
      new THREE.Vector2(-length, -(height / 2 - 5) + 2 * wallThickness),
      new THREE.Vector2(-length / 2, height / 4 + 2 * wallThickness),
      new THREE.Vector2(0, -(height / 2 - 5) + 2 * wallThickness),
      new THREE.Vector2(length / 2, height / 4 + 2 * wallThickness),
      new THREE.Vector2(length, -(height / 2 - 5) + 2 * wallThickness),
      new THREE.Vector2(length, -(height / 2 - 5) + wallThickness),
      new THREE.Vector2(length / 2, height / 4 + wallThickness),
      new THREE.Vector2(0, -(height / 2 - 5) + wallThickness),
      new THREE.Vector2(-length / 2, height / 4 + wallThickness),
    ]);
    return shape;
  };

  return (
    <group position={position} receiveShadow>
      {/* 后面的墙壁,招牌的另一面 */}
      <mesh position={new THREE.Vector3(0, height, length - wallThickness)} receiveShadow>
        <extrudeGeometry
          args={[
            getPointToShape([
              new THREE.Vector2(-width, -height),
              new THREE.Vector2(-width, height),
              new THREE.Vector2(width, height),
              new THREE.Vector2(width, -height),
            ]),
            { depth: wallThickness },
          ]}
        />
        <meshPhongMaterial map={texture} metalness={1.0} reflectivity={1.5}></meshPhongMaterial>
      </mesh>
      {/* 前面的墙壁,有招牌的那一边 */}
      <mesh position={new THREE.Vector3(0, height, -length)} receiveShadow>
        <extrudeGeometry
          args={[
            getPointToShape([
              new THREE.Vector2(-width, -height),
              new THREE.Vector2(-width, height),
              new THREE.Vector2(width, height),
              new THREE.Vector2(width, -height),
            ]),
            { depth: wallThickness },
          ]}
        />
        <meshPhongMaterial map={texture} metalness={1.0} reflectivity={1.5}></meshPhongMaterial>
      </mesh>
      {/* 左边的墙壁，有个校门的那一边 */}
      <mesh
        position={new THREE.Vector3(width, height, 0)}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
      >
        <extrudeGeometry args={[getBackWallShape(), { depth: wallThickness }]} />
        <meshPhysicalMaterial map={texture} metalness={1.0} roughness={0.8}></meshPhysicalMaterial>
      </mesh>
      {/* 后面墙壁的顶部 */}
      <mesh
        position={new THREE.Vector3(width, (5 / 2) * height, 0)}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
      >
        <extrudeGeometry args={[getBackWallTopShape(), { depth: 2 || wallThickness }]} />
        <meshPhysicalMaterial
          color={'#0069c5'}
          metalness={1.0}
          roughness={0.8}
        ></meshPhysicalMaterial>
      </mesh>
      {/* 顶部第二层 */}
      <mesh
        position={new THREE.Vector3(-width - 5, (5 / 2) * height, 0)}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
      >
        <extrudeGeometry args={[getRoofShape(), { depth: 2 * width + 10 || wallThickness }]} />
        <meshPhysicalMaterial
          color={'#4895f6'}
          metalness={1.0}
          roughness={0.8}
        ></meshPhysicalMaterial>
      </mesh>
      {/* 顶部第三层 */}
      <mesh
        position={new THREE.Vector3(-width, (5 / 2) * height, 0)}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
      >
        <extrudeGeometry args={[getTopRoofShape(), { depth: 2 * width || wallThickness }]} />
        <meshPhysicalMaterial
          map={roofTexture}
          metalness={1.0}
          roughness={0.8}
        ></meshPhysicalMaterial>
      </mesh>
    </group>
  );
};

export default House;
