/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useGLTF } from "@react-three/drei";
import React, { useRef } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import ReplaceAlphanumericString from "../../utils/ReplaceAlphanumericString";
import Bin from "./Bin";

type GLTFResult = GLTF & {
  nodes: {
    Cube006: THREE.Mesh;
    Cube: THREE.Mesh;
    Cube007: THREE.Mesh;
    Cube008: THREE.Mesh;
    Cube009: THREE.Mesh;
    Cube010: THREE.Mesh;
    Cube011: THREE.Mesh;
    Cube012: THREE.Mesh;
    Cube013: THREE.Mesh;
    Cube015: THREE.Mesh;
    Cube016: THREE.Mesh;
    Cube014: THREE.Mesh;
    Cube017: THREE.Mesh;
    Cube018: THREE.Mesh;
    Cube019: THREE.Mesh;
    Cube020: THREE.Mesh;
    Cube021: THREE.Mesh;
    Cube022: THREE.Mesh;
    Cube002: THREE.Mesh;
    Cube004: THREE.Mesh;
    Cube023: THREE.Mesh;
    Cube024: THREE.Mesh;
    Cube025: THREE.Mesh;
    Cube026: THREE.Mesh;
    Cube027: THREE.Mesh;
    Cube028: THREE.Mesh;
    Cube029: THREE.Mesh;
    Cube030: THREE.Mesh;
    Cube031: THREE.Mesh;
    Cube032: THREE.Mesh;
    Cube033: THREE.Mesh;
    Cube034: THREE.Mesh;
    Cube035: THREE.Mesh;
    Cube036: THREE.Mesh;
    Cube037: THREE.Mesh;
    Cube038: THREE.Mesh;
    Cube039: THREE.Mesh;
    Cube040: THREE.Mesh;
    Cube049: THREE.Mesh;
    Cube052: THREE.Mesh;
    Cube072: THREE.Mesh;
    Cube003: THREE.Mesh;
    Cube001: THREE.Mesh;
    Cube005: THREE.Mesh;
    Cube041: THREE.Mesh;
    Cube042: THREE.Mesh;
    Cube043: THREE.Mesh;
    Cube044: THREE.Mesh;
    Cube045: THREE.Mesh;
    Cube046: THREE.Mesh;
    Cube047: THREE.Mesh;
    Cube048: THREE.Mesh;
    Cube050: THREE.Mesh;
    Cube051: THREE.Mesh;
    Cube053: THREE.Mesh;
    Cube054: THREE.Mesh;
    Cube055: THREE.Mesh;
    Cube056: THREE.Mesh;
    Cube057: THREE.Mesh;
    Cube058: THREE.Mesh;
    Cube059: THREE.Mesh;
    Cube060: THREE.Mesh;
    Cube061: THREE.Mesh;
    Cube062: THREE.Mesh;
    Cube063: THREE.Mesh;
    Cube064: THREE.Mesh;
    Cube065: THREE.Mesh;
    Cube066: THREE.Mesh;
    Cube067: THREE.Mesh;
    Cube068: THREE.Mesh;
    Cube069: THREE.Mesh;
    Cube070: THREE.Mesh;
    Cube071: THREE.Mesh;
    Cube073: THREE.Mesh;
    Cube074: THREE.Mesh;
    Cube075: THREE.Mesh;
    Cube076: THREE.Mesh;
    Cube077: THREE.Mesh;
    Cube078: THREE.Mesh;
    Cube079: THREE.Mesh;
    Cube080: THREE.Mesh;
    Cube081: THREE.Mesh;
    Cube082: THREE.Mesh;
    Cube083: THREE.Mesh;
    Cube084: THREE.Mesh;
    Cube085: THREE.Mesh;
    Cube086: THREE.Mesh;
    Cube087: THREE.Mesh;
    Cube088: THREE.Mesh;
    Cube089: THREE.Mesh;
    Cube090: THREE.Mesh;
    Cube091: THREE.Mesh;
    Cube092: THREE.Mesh;
    Cube093: THREE.Mesh;
    Cube094: THREE.Mesh;
    Cube095: THREE.Mesh;
    Cube096: THREE.Mesh;
    Cube097: THREE.Mesh;
    Cube098: THREE.Mesh;
    Cube099: THREE.Mesh;
    Cube100: THREE.Mesh;
    Cube101: THREE.Mesh;
    Cube102: THREE.Mesh;
    Cube103: THREE.Mesh;
    Cube104: THREE.Mesh;
    Cube105: THREE.Mesh;
    Cube106: THREE.Mesh;
    Cube107: THREE.Mesh;
    Cube108: THREE.Mesh;
    Cube109: THREE.Mesh;
    Cube110: THREE.Mesh;
    Cube111: THREE.Mesh;
    Cube112: THREE.Mesh;
    Cube113: THREE.Mesh;
    Cube114: THREE.Mesh;
    Cube115: THREE.Mesh;
    Cube116: THREE.Mesh;
    Cube117: THREE.Mesh;
  };
  materials: {};
};

interface ModelProps {
  areatag: string;
  racktag: string;
  position: [x: number, y: number, z: number];
  changeposition?: (num: [x: number, y: number, z: number]) => void;
  currentbintags?: string[];
}

const Model: React.FC<ModelProps> = ({
  areatag,
  racktag,
  position,
  changeposition,
  currentbintags
}) => {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF("/rack.glb") as GLTFResult;

  const CreateBoxes = () => {
    const initialx = -6.5;
    const initialy = -10.5;
    const boxarray = [];
    for (let i = 0; i < 11; i += 1) {
      for (let j = 0; j < 4; j += 1) {
        boxarray.push(
          <Bin
            position={[initialx + j * 5, initialy + i * 2, 8]}
            areatag={areatag}
            racktag={racktag}
            leveltag={ReplaceAlphanumericString("L01", i)}
            sectiontag={ReplaceAlphanumericString("S01", j)}
            currentbintags={currentbintags}
          />
        );
      }
    }
    return boxarray;
  };

  return (
    <group
      ref={group}
      dispose={null}
      position={position}
      onClick={() => changeposition(position)}
    >
      {CreateBoxes()}
      <mesh
        geometry={nodes.Cube006.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-12.5, 0.5, -2]}
        scale={[0.15, 11.5, 0.15]}
      />
      <mesh
        geometry={nodes.Cube.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[2.5, -6, 0.01]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube007.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[2.5, -10, 0.01]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube008.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[2.5, -8, 0.01]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube009.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[2.5, -4, 0.01]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube010.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[2.5, 0, 0.01]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube011.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[2.5, 2, 0.01]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube012.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[2.5, 4, 0.01]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube013.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[2.5, 6, 0.01]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube015.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[2.5, -2, 0.01]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube016.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-12.5, -4, 0.05]}
        rotation={[2.36, 0, 0]}
        scale={[0.21, 0.2, 2.8]}
      />
      <mesh
        geometry={nodes.Cube014.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[2.5, 8, 0.01]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube017.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[7.5, -6, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube018.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-12.5, 8.03, 0.05]}
        rotation={[Math.PI / 4, 0, 0]}
        scale={[0.21, 0.2, 2.8]}
      />
      <mesh
        geometry={nodes.Cube019.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-12.5, 4, 0.05]}
        rotation={[2.36, 0, 0]}
        scale={[0.21, 0.2, 2.8]}
      />
      <mesh
        geometry={nodes.Cube020.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-12.5, -8, 0.05]}
        rotation={[Math.PI / 4, 0, 0]}
        scale={[0.21, 0.2, 2.8]}
      />
      <mesh
        geometry={nodes.Cube021.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-12.5, 0, 0.05]}
        rotation={[Math.PI / 4, 0, 0]}
        scale={[0.21, 0.2, 2.8]}
      />
      <mesh
        geometry={nodes.Cube022.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[7.5, 0, 0.05]}
        rotation={[Math.PI / 4, 0, 0]}
        scale={[0.21, 0.2, 2.8]}
      />
      <mesh
        geometry={nodes.Cube002.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[2.5, 0, 0.05]}
        rotation={[Math.PI / 4, 0, 0]}
        scale={[0.21, 0.2, 2.8]}
      />
      <mesh
        geometry={nodes.Cube004.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[2.5, 0, 0.05]}
        rotation={[Math.PI / 4, 0, 0]}
        scale={[0.21, 0.2, 2.8]}
      />
      <mesh
        geometry={nodes.Cube023.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[7.5, -8, 0.05]}
        rotation={[Math.PI / 4, 0, 0]}
        scale={[0.21, 0.2, 2.8]}
      />
      <mesh
        geometry={nodes.Cube024.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[7.5, 4, 0.05]}
        rotation={[2.36, 0, 0]}
        scale={[0.21, 0.2, 2.8]}
      />
      <mesh
        geometry={nodes.Cube025.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[7.5, 8.03, 0.05]}
        rotation={[Math.PI / 4, 0, 0]}
        scale={[0.21, 0.2, 2.8]}
      />
      <mesh
        geometry={nodes.Cube026.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[2.5, 10, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube027.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[7.5, -4, 0.05]}
        rotation={[2.36, 0, 0]}
        scale={[0.21, 0.2, 2.8]}
      />
      <mesh
        geometry={nodes.Cube028.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[2.5, -2, 0.01]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube029.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[2.5, 8, 0.01]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube030.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[2.5, 6, 0.01]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube031.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[2.5, 4, 0.01]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube032.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[2.5, 2, 0.01]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube033.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[2.5, 0, 0.01]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube034.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[2.5, -4, 0.01]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube035.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[2.5, -8, 0.01]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube036.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[2.5, -10, 0.01]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube037.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[2.5, 0.5, -2]}
        scale={[0.15, 11.5, 0.15]}
      />
      <mesh
        geometry={nodes.Cube038.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-12.5, 0.5, 2]}
        scale={[0.15, 11.5, 0.15]}
      />
      <mesh
        geometry={nodes.Cube039.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[2.5, -6, 0.01]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube040.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-2.5, 0.5, 2]}
        scale={[0.15, 11.5, 0.15]}
      />
      <mesh
        geometry={nodes.Cube049.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-2.5, -8, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube052.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-12.5, -8, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube072.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-2.5, 0.5, -2]}
        scale={[0.15, 11.5, 0.15]}
      />
      <mesh
        geometry={nodes.Cube003.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-2.5, 8, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube001.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-2.5, 6, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube005.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-2.5, 4, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube041.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-2.5, 2, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube042.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-2.5, 0, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube043.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-2.5, -2, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube044.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-2.5, -4, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube045.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-2.5, -6, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube046.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[2.5, 8.03, 0.05]}
        rotation={[Math.PI / 4, 0, 0]}
        scale={[0.21, 0.2, 2.8]}
      />
      <mesh
        geometry={nodes.Cube047.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[2.5, 4, 0.05]}
        rotation={[2.36, 0, 0]}
        scale={[0.21, 0.2, 2.8]}
      />
      <mesh
        geometry={nodes.Cube048.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[2.5, 0, 0.05]}
        rotation={[Math.PI / 4, 0, 0]}
        scale={[0.21, 0.2, 2.8]}
      />
      <mesh
        geometry={nodes.Cube050.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[2.5, -4, 0.05]}
        rotation={[2.36, 0, 0]}
        scale={[0.21, 0.2, 2.8]}
      />
      <mesh
        geometry={nodes.Cube051.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[2.5, -8, 0.05]}
        rotation={[Math.PI / 4, 0, 0]}
        scale={[0.21, 0.2, 2.8]}
      />
      <mesh
        geometry={nodes.Cube053.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[2.5, 0.5, 2]}
        scale={[0.15, 11.5, 0.15]}
      />
      <mesh
        geometry={nodes.Cube054.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[2.5, 0.5, -2]}
        scale={[0.15, 11.5, 0.15]}
      />
      <mesh
        geometry={nodes.Cube055.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[7.5, 0.5, -2]}
        scale={[0.15, 11.5, 0.15]}
      />
      <mesh
        geometry={nodes.Cube056.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[7.5, 0.5, 2]}
        scale={[0.15, 11.5, 0.15]}
      />
      <mesh
        geometry={nodes.Cube057.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[2.5, 10, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube058.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[7.5, 10, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube059.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[7.5, 10, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube060.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[7.5, 8, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube061.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[7.5, 6, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube062.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[7.5, 4, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube063.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[7.5, 2, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube064.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[7.5, 0, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube065.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[7.5, -2, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube066.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[7.5, -4, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube067.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-12.5, -10, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube068.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[7.5, -8, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube069.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[2.5, 8.03, 0.05]}
        rotation={[Math.PI / 4, 0, 0]}
        scale={[0.21, 0.2, 2.8]}
      />
      <mesh
        geometry={nodes.Cube070.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[2.5, 4, 0.05]}
        rotation={[2.36, 0, 0]}
        scale={[0.21, 0.2, 2.8]}
      />
      <mesh
        geometry={nodes.Cube071.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-2.5, 10, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube073.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-12.5, 10, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube074.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-12.5, 8, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube075.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-12.5, 6, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube076.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-12.5, 4, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube077.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-12.5, 2, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube078.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-12.5, 0, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube079.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-12.5, -2, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube080.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-12.5, -4, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube081.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-12.5, -6, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube082.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-2.5, 8.03, 0.05]}
        rotation={[Math.PI / 4, 0, 0]}
        scale={[0.21, 0.2, 2.8]}
      />
      <mesh
        geometry={nodes.Cube083.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-2.5, 4, 0.05]}
        rotation={[2.36, 0, 0]}
        scale={[0.21, 0.2, 2.8]}
      />
      <mesh
        geometry={nodes.Cube084.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-2.5, 0, 0.05]}
        rotation={[Math.PI / 4, 0, 0]}
        scale={[0.21, 0.2, 2.8]}
      />
      <mesh
        geometry={nodes.Cube085.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-2.5, -4, 0.05]}
        rotation={[2.36, 0, 0]}
        scale={[0.21, 0.2, 2.8]}
      />
      <mesh
        geometry={nodes.Cube086.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-2.5, -8, 0.05]}
        rotation={[Math.PI / 4, 0, 0]}
        scale={[0.21, 0.2, 2.8]}
      />
      <mesh
        geometry={nodes.Cube087.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-2.5, -10, 0]}
        scale={[10, 0.19, 2]}
      />
      <mesh
        geometry={nodes.Cube088.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-2.5, 10, 0]}
        scale={[10, 0.19, 2]}
      />
      <mesh
        geometry={nodes.Cube089.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-2.5, 8, 0]}
        scale={[10, 0.19, 2]}
      />
      <mesh
        geometry={nodes.Cube090.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-2.5, 6, 0]}
        scale={[10, 0.19, 2]}
      />
      <mesh
        geometry={nodes.Cube091.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-2.5, 4, 0]}
        scale={[10, 0.19, 2]}
      />
      <mesh
        geometry={nodes.Cube092.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-2.5, 2, 0]}
        scale={[10, 0.19, 2]}
      />
      <mesh
        geometry={nodes.Cube093.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-2.5, 0, 0]}
        scale={[10, 0.19, 2]}
      />
      <mesh
        geometry={nodes.Cube094.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-2.5, -2, 0]}
        scale={[10, 0.19, 2]}
      />
      <mesh
        geometry={nodes.Cube095.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-2.5, -4, 0]}
        scale={[10, 0.19, 2]}
      />
      <mesh
        geometry={nodes.Cube096.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-2.5, -6, 0]}
        scale={[10, 0.19, 2]}
      />
      <mesh
        geometry={nodes.Cube097.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[7.5, -10, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube098.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-2.5, -10, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube099.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-2.5, -8, 0]}
        scale={[10, 0.19, 2]}
      />
      <mesh
        geometry={nodes.Cube100.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-7.5, 0.5, -2]}
        scale={[0.15, 11.5, 0.15]}
      />
      <mesh
        geometry={nodes.Cube101.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-7.5, 0.5, 2]}
        scale={[0.15, 11.5, 0.15]}
      />
      <mesh
        geometry={nodes.Cube102.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-7.5, 10, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube103.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-7.5, 8, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube104.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-7.5, 4, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube105.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-7.5, 6, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube106.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-7.5, 2, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube107.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-7.5, 0, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube108.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-7.5, -2, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube109.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-7.5, -4, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube110.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-7.5, -8, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube111.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-7.5, -6, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube112.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-7.5, -10, -0.04]}
        scale={[0.16, 0.14, 2]}
      />
      <mesh
        geometry={nodes.Cube113.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-7.5, 8.03, 0.05]}
        rotation={[Math.PI / 4, 0, 0]}
        scale={[0.21, 0.2, 2.8]}
      />
      <mesh
        geometry={nodes.Cube114.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-7.5, 4, 0.05]}
        rotation={[2.36, 0, 0]}
        scale={[0.21, 0.2, 2.8]}
      />
      <mesh
        geometry={nodes.Cube115.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-7.5, 0, 0.05]}
        rotation={[Math.PI / 4, 0, 0]}
        scale={[0.21, 0.2, 2.8]}
      />
      <mesh
        geometry={nodes.Cube116.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-7.5, -4, 0.05]}
        rotation={[2.36, 0, 0]}
        scale={[0.21, 0.2, 2.8]}
      />
      <mesh
        geometry={nodes.Cube117.geometry}
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("black"),
            transparent: true,
          })
        }
        position={[-7.5, -8, 0.05]}
        rotation={[Math.PI / 4, 0, 0]}
        scale={[0.21, 0.2, 2.8]}
      />
    </group>
  );
};

useGLTF.preload("/rack.glb");

export default Model;