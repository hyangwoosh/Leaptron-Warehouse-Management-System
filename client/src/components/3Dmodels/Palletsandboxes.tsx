/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { Euler, useFrame, useLoader, useThree } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    Object_16: THREE.Mesh;
    Object_2: THREE.Mesh;
    Object_3: THREE.Mesh;
    Object_4: THREE.Mesh;
    Object_5: THREE.Mesh;
    Object_6: THREE.Mesh;
    Cube_0002: THREE.Mesh;
    Cube_0003: THREE.Mesh;
    Cube_0004: THREE.Mesh;
    Cube_0005: THREE.Mesh;
    Object_2001: THREE.Mesh;
    Object_3001: THREE.Mesh;
    Object_4001: THREE.Mesh;
    Object_5001: THREE.Mesh;
    Object_6001: THREE.Mesh;
    Cube_0006: THREE.Mesh;
    Cube_0007: THREE.Mesh;
    Object_2002: THREE.Mesh;
    Object_3002: THREE.Mesh;
    Object_4002: THREE.Mesh;
    Object_5002: THREE.Mesh;
    Object_6002: THREE.Mesh;
    Cube_0008: THREE.Mesh;
    Cube_0009: THREE.Mesh;
    Object_2003: THREE.Mesh;
    Object_3003: THREE.Mesh;
    Object_4003: THREE.Mesh;
    Object_5003: THREE.Mesh;
    Object_6003: THREE.Mesh;
    Cube_0010: THREE.Mesh;
    Cube_0011: THREE.Mesh;
    Cube_0012: THREE.Mesh;
    Cube_0013: THREE.Mesh;
    Cube_0015: THREE.Mesh;
    Object_2009: THREE.Mesh;
    Object_3007: THREE.Mesh;
    Object_4007: THREE.Mesh;
    Object_5006: THREE.Mesh;
    Object_6006: THREE.Mesh;
    Cube_0026: THREE.Mesh;
    Cube_0027: THREE.Mesh;
    Cube_0028: THREE.Mesh;
    Cube_0029: THREE.Mesh;
    Object_2010: THREE.Mesh;
    Object_3008: THREE.Mesh;
    Object_4008: THREE.Mesh;
    Object_5007: THREE.Mesh;
    Object_6007: THREE.Mesh;
    Cube008: THREE.Mesh;
    Cube017: THREE.Mesh;
    Cube025: THREE.Mesh;
    Cube032: THREE.Mesh;
    Cube050: THREE.Mesh;
    Cube051: THREE.Mesh;
    Cube089: THREE.Mesh;
    Cube090: THREE.Mesh;
    Cube091: THREE.Mesh;
    Cube092: THREE.Mesh;
  };
  materials: {
    ["5_-_Default"]: THREE.MeshStandardMaterial;
    material_0: THREE.MeshStandardMaterial;
    ["Material.005"]: THREE.MeshStandardMaterial;
    ["Material.006"]: THREE.MeshStandardMaterial;
    ["Material.008"]: THREE.MeshStandardMaterial;
    ["Material.009"]: THREE.MeshStandardMaterial;
    ["material_0.001"]: THREE.MeshStandardMaterial;
    ["Material.010"]: THREE.MeshStandardMaterial;
    ["Material.011"]: THREE.MeshStandardMaterial;
    ["material_0.002"]: THREE.MeshStandardMaterial;
    ["Material.012"]: THREE.MeshStandardMaterial;
    ["Material.013"]: THREE.MeshStandardMaterial;
    ["material_0.003"]: THREE.MeshStandardMaterial;
    ["Material.014"]: THREE.MeshStandardMaterial;
    ["Material.015"]: THREE.MeshStandardMaterial;
    ["Material.016"]: THREE.MeshStandardMaterial;
    ["Material.017"]: THREE.MeshStandardMaterial;
    ["Material.019"]: THREE.MeshStandardMaterial;
    ["material_0.007"]: THREE.MeshStandardMaterial;
    ["Material.049"]: THREE.MeshStandardMaterial;
    ["Material.050"]: THREE.MeshStandardMaterial;
    ["Material.051"]: THREE.MeshStandardMaterial;
    ["Material.052"]: THREE.MeshStandardMaterial;
    ["material_0.008"]: THREE.MeshStandardMaterial;
  };
};

interface ModelProps {
  position: [x: number, y: number, z: number];
}

const Model: React.FC<ModelProps> = ({ position }) => {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF("/palletsandboxes.glb") as GLTFResult;
  const colorMap = useLoader(THREE.TextureLoader, "cardboard_texture.png");

  return (
    <group
      ref={group}
      dispose={null}
      position={position}
      scale={[1.5, 1.5, 1.5]}
    >
      <group
        position={[6, -0.57, 50]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={2.63}
      >
        <group rotation={[Math.PI / 2, 0, 0]} />
      </group>
      <group
        position={[24, 0.43, 54]}
        rotation={[-Math.PI / 2, 0, -3.14]}
        scale={0.06}
      >
        <group rotation={[Math.PI / 2, 0, 0]} />
      </group>
      <group
        position={[-2, 6.43, 59]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.09, 0.11, 0.09]}
      />
      <group position={[21.04, 0.8, -0.31]} />
      {/* <group position={[-33.86, -0.91, -40.49]}>
        <mesh geometry={nodes.Object_16.geometry} material={materials['5_-_Default']} position={[0, 0, -1.92]} />
      </group> */}
      <group
        position={[-5, 2.43, 50]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1.8}
      >
        <group position={[-5.69, -6.22, 6.25]} rotation={[-0.27, 0.6, 1.93]} />
        <group position={[2.71, 3.57, -5.48]} rotation={[-2.26, 0.75, -1.96]} />
      </group>
      <group
        position={[-31, 1.43, 52]}
        rotation={[-Math.PI, 0, 0]}
        scale={[2.46, 2.46, 3.58]}
      >
        <mesh
          geometry={nodes.Object_2.geometry}
          material={materials.material_0}
          position={[-0.52, -0.08, 0.03]}
          scale={0.72}
        />
        <mesh
          geometry={nodes.Object_3.geometry}
          material={materials.material_0}
          position={[-0.52, -0.08, 0.03]}
          scale={0.72}
        />
        <mesh
          geometry={nodes.Object_4.geometry}
          material={materials.material_0}
          position={[-0.52, -0.08, 0.03]}
          scale={0.72}
        />
        <mesh
          geometry={nodes.Object_5.geometry}
          material={materials.material_0}
          position={[-0.52, -0.08, 0.03]}
          scale={0.72}
        />
        <mesh
          geometry={nodes.Object_6.geometry}
          material={materials.material_0}
          position={[-0.52, -0.08, 0.03]}
          scale={0.72}
        />
      </group>
      <group
        position={[3, 6.43, 61]}
        rotation={[-1.86, 0.06, -0.46]}
        scale={0.01}
      />
      <group
        position={[7, 5.43, 61]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={2.83}
      />
      <group
        position={[8, 7.43, 60]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.01}
      >
        <group rotation={[Math.PI / 2, 0, 0]} />
      </group>
      <group
        position={[7, 0.43, 68]}
        rotation={[-Math.PI / 2, 0, -2.13]}
        scale={0.06}
      />
      <group
        position={[-36, 0.43, 119]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.1}
      >
        <group rotation={[Math.PI / 2, 0, 0]} />
      </group>
      <group
        position={[-14, 9.43, 69]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={2.68}
      >
        <group rotation={[Math.PI / 2, 0, 0]} />
      </group>
      <group
        position={[-5, 2.43, 70]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={2.64}
      >
        <group rotation={[Math.PI / 2, 0, 0]} />
      </group>
      <group
        position={[-5, 2.43, 50]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1.8}
      >
        <mesh
          geometry={nodes.Cube_0002.geometry}
          material={materials["Material.005"]}
          position={[-13.94, 0.11, 0.83]}
          rotation={[0, 0, 1.57]}
          scale={[1.16, 0.72, 0.72]}
        >
          <meshBasicMaterial map={colorMap} side={THREE.DoubleSide} />
        </mesh>
      </group>
      <group
        position={[-11, 0.43, 53]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1.8}
      >
        <mesh
          geometry={nodes.Cube_0003.geometry}
          material={materials["Material.006"]}
          position={[-12.99, -0.68, 1.67]}
          rotation={[0, 0, 1.35]}
          scale={[1.16, 0.72, 0.72]}
        >
          <meshBasicMaterial map={colorMap} side={THREE.DoubleSide} />
        </mesh>
      </group>
      <group
        position={[-22, 0.43, 53]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1.8}
      >
        <mesh
          geometry={nodes.Cube_0004.geometry}
          material={materials["Material.008"]}
          position={[-12.99, 1, 1.14]}
          rotation={[0, 0, 1.66]}
          scale={[1.7, 0.71, 0.2]}
        >
          <meshBasicMaterial map={colorMap} side={THREE.DoubleSide} />
        </mesh>
      </group>
      <group
        position={[-16, 2.43, 50]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1.8}
      >
        <mesh
          geometry={nodes.Cube_0005.geometry}
          material={materials["Material.009"]}
          position={[-13.78, -0.11, 0.51]}
          rotation={[0, 0, 1.63]}
          scale={[1.16, 0.72, 0.72]}
        >
          <meshBasicMaterial map={colorMap} side={THREE.DoubleSide} />
        </mesh>
      </group>
      <group
        position={[-42, 1.43, 50]}
        rotation={[-Math.PI, 0, 0]}
        scale={[2.46, 2.46, 3.58]}
      >
        <mesh
          geometry={nodes.Object_2001.geometry}
          material={materials["material_0.001"]}
          position={[-0.52, -0.08, -0.59]}
          scale={0.72}
        />
        <mesh
          geometry={nodes.Object_3001.geometry}
          material={materials["material_0.001"]}
          position={[-0.52, -0.08, -0.59]}
          scale={0.72}
        />
        <mesh
          geometry={nodes.Object_4001.geometry}
          material={materials["material_0.001"]}
          position={[-0.52, -0.08, -0.59]}
          scale={0.72}
        />
        <mesh
          geometry={nodes.Object_5001.geometry}
          material={materials["material_0.001"]}
          position={[-0.52, -0.08, -0.59]}
          scale={0.72}
        />
        <mesh
          geometry={nodes.Object_6001.geometry}
          material={materials["material_0.001"]}
          position={[-0.52, -0.08, -0.59]}
          scale={0.72}
        />
      </group>
      <group
        position={[-23, 0.43, 67]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1.8}
      >
        <mesh
          geometry={nodes.Cube_0006.geometry}
          material={materials["Material.010"]}
          position={[-12.86, 2.88, 2.47]}
          rotation={[0, 0, 1.57]}
          scale={[1.16, 0.72, 1.61]}
        >
          <meshBasicMaterial map={colorMap} side={THREE.DoubleSide} />
        </mesh>
      </group>
      <group
        position={[-16, 2.43, 64]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1.8}
      >
        <mesh
          geometry={nodes.Cube_0007.geometry}
          material={materials["Material.011"]}
          position={[-14.89, -1.09, 0.78]}
          rotation={[0, 0, 1.57]}
          scale={[1.16, 1.15, 0.97]}
        >
          <meshBasicMaterial map={colorMap} side={THREE.DoubleSide} />
        </mesh>
      </group>
      <group
        position={[-42, 1.43, 64]}
        rotation={[-Math.PI, 0, 0]}
        scale={[2.46, 2.46, 3.58]}
      >
        <mesh
          geometry={nodes.Object_2002.geometry}
          material={materials["material_0.002"]}
          position={[-0.52, -0.08, 0.03]}
          scale={0.72}
        />
        <mesh
          geometry={nodes.Object_3002.geometry}
          material={materials["material_0.002"]}
          position={[-0.52, -0.08, 0.03]}
          scale={0.72}
        />
        <mesh
          geometry={nodes.Object_4002.geometry}
          material={materials["material_0.002"]}
          position={[-0.52, -0.08, 0.03]}
          scale={0.72}
        />
        <mesh
          geometry={nodes.Object_5002.geometry}
          material={materials["material_0.002"]}
          position={[-0.52, -0.08, 0.03]}
          scale={0.72}
        />
        <mesh
          geometry={nodes.Object_6002.geometry}
          material={materials["material_0.002"]}
          position={[-0.52, -0.08, 0.03]}
          scale={0.72}
        />
      </group>
      <group
        position={[-11, 0.43, 67]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1.8}
      >
        <mesh
          geometry={nodes.Cube_0008.geometry}
          material={materials["Material.012"]}
          position={[-12.99, 1.63, 1.19]}
          rotation={[0, 0, -3.14]}
          scale={[1.09, 1.66, 0.68]}
        >
          <meshBasicMaterial map={colorMap} side={THREE.DoubleSide} />
        </mesh>
      </group>
      <group
        position={[-5, 2.43, 64]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1.8}
      >
        <mesh
          geometry={nodes.Cube_0009.geometry}
          material={materials["Material.013"]}
          position={[-13.8, 0.01, -0.04]}
          rotation={[0, 1.57, -3.12]}
          scale={[0.27, 1.55, 1.42]}
        >
          <meshBasicMaterial map={colorMap} side={THREE.DoubleSide} />
        </mesh>
      </group>
      <group
        position={[-31, 1.43, 64]}
        rotation={[-Math.PI, 0, 0]}
        scale={[2.46, 2.46, 3.58]}
      >
        <mesh
          geometry={nodes.Object_2003.geometry}
          material={materials["material_0.003"]}
          position={[-0.52, -0.08, 0.03]}
          scale={0.72}
        />
        <mesh
          geometry={nodes.Object_3003.geometry}
          material={materials["material_0.003"]}
          position={[-0.52, -0.08, 0.03]}
          scale={0.72}
        />
        <mesh
          geometry={nodes.Object_4003.geometry}
          material={materials["material_0.003"]}
          position={[-0.52, -0.08, 0.03]}
          scale={0.72}
        />
        <mesh
          geometry={nodes.Object_5003.geometry}
          material={materials["material_0.003"]}
          position={[-0.52, -0.08, 0.03]}
          scale={0.72}
        />
        <mesh
          geometry={nodes.Object_6003.geometry}
          material={materials["material_0.003"]}
          position={[-0.52, -0.08, 0.03]}
          scale={0.72}
        />
      </group>
      <group
        position={[-8, 0.43, 67]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1.8}
      >
        <mesh
          geometry={nodes.Cube_0010.geometry}
          material={materials["Material.014"]}
          position={[-12.99, 2.7, 1.64]}
          rotation={[0, 0, 1.57]}
          scale={[0.55, 0.34, 0.34]}
        >
          <meshBasicMaterial map={colorMap} side={THREE.DoubleSide} />
        </mesh>
      </group>
      <group
        position={[-8, 0.43, 67]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1.8}
      >
        <mesh
          geometry={nodes.Cube_0011.geometry}
          material={materials["Material.015"]}
          position={[-11.97, 1.63, 1.69]}
          rotation={[0, 0, 1.57]}
          scale={[0.55, 0.34, 0.34]}
        >
          <meshBasicMaterial map={colorMap} side={THREE.DoubleSide} />
        </mesh>
      </group>
      <group
        position={[-8, 0.43, 67]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1.8}
      >
        <mesh
          geometry={nodes.Cube_0012.geometry}
          material={materials["Material.016"]}
          position={[-12.99, 1.63, 1.61]}
          rotation={[0, 0, 1.57]}
          scale={[0.55, 0.34, 0.34]}
        >
          <meshBasicMaterial map={colorMap} side={THREE.DoubleSide} />
        </mesh>
      </group>
      <group
        position={[-8, 0.43, 70]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1.8}
      >
        <mesh
          geometry={nodes.Cube_0013.geometry}
          material={materials["Material.017"]}
          position={[-12.77, 1.71, 1.62]}
          rotation={[0, 0, 1.19]}
          scale={[0.55, 0.34, 0.34]}
        >
          <meshBasicMaterial map={colorMap} side={THREE.DoubleSide} />
        </mesh>
      </group>
      <group
        position={[-8, 2.43, 67]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1.8}
      />
      <group
        position={[-8, 0.43, 67]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1.8}
      >
        <mesh
          geometry={nodes.Cube_0015.geometry}
          material={materials["Material.019"]}
          position={[-11.83, 2.81, 1.65]}
          rotation={[0, 0, 1.57]}
          scale={[0.55, 0.34, 0.34]}
        >
          <meshBasicMaterial map={colorMap} side={THREE.DoubleSide} />
        </mesh>
      </group>
      <group
        position={[-9, 2.43, 56]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1.8}
      />
      <group
        position={[11, 7.43, 60]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.01}
      >
        <group rotation={[Math.PI / 2, 0, 0]} />
      </group>
      <group
        position={[10, 4.43, 60]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.01}
      >
        <group rotation={[Math.PI / 2, 0, 0]} />
      </group>
      <group
        position={[7, 4.43, 60]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.01}
      >
        <group rotation={[Math.PI / 2, 0, 0]} />
      </group>
      <group
        position={[1, 4.43, 60]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.01}
      >
        <group rotation={[Math.PI / 2, 0, 0]} />
      </group>
      <group
        position={[4, 4.43, 60]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.01}
      >
        <group rotation={[Math.PI / 2, 0, 0]} />
      </group>
      <group
        position={[7, 2.43, 60]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.01}
      >
        <group rotation={[Math.PI / 2, 0, 0]} />
      </group>
      <group
        position={[10, 2.43, 60]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.01}
      >
        <group rotation={[Math.PI / 2, 0, 0]} />
      </group>
      <group
        position={[4, 2.43, 60]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.01}
      >
        <group rotation={[Math.PI / 2, 0, 0]} />
      </group>
      <group
        position={[1, 2.43, 60]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.01}
      >
        <group rotation={[Math.PI / 2, 0, 0]} />
      </group>
      <group
        position={[-10, 2.43, 60]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.01}
      >
        <group rotation={[Math.PI / 2, 0, 0]} />
      </group>
      <group
        position={[-7, 2.43, 60]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.01}
      >
        <group rotation={[Math.PI / 2, 0, 0]} />
      </group>
      <group
        position={[-2, 2.43, 60]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.01}
      >
        <group rotation={[Math.PI / 2, 0, 0]} />
      </group>
      <group
        position={[-4, 2.43, 60]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.01}
      >
        <group rotation={[Math.PI / 2, 0, 0]} />
      </group>
      <group
        position={[-7, 4.43, 60]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.01}
      >
        <group rotation={[Math.PI / 2, 0, 0]} />
      </group>
      <group
        position={[-10, 4.43, 60]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.01}
      >
        <group rotation={[Math.PI / 2, 0, 0]} />
      </group>
      <group
        position={[-4, 4.43, 60]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.01}
      >
        <group rotation={[Math.PI / 2, 0, 0]} />
      </group>
      <group
        position={[-2, 4.43, 60]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.01}
      >
        <group rotation={[Math.PI / 2, 0, 0]} />
      </group>
      <group
        position={[-68, 0.43, 28]}
        rotation={[-Math.PI / 2, 0, -3.1]}
        scale={1.8}
      />
      <group
        position={[-68, 0.43, 26]}
        rotation={[-Math.PI / 2, 0, -3.1]}
        scale={1.8}
      />
      <group
        position={[-68, 0.43, 28]}
        rotation={[-Math.PI / 2, 0, -3.1]}
        scale={1.8}
      />
      <group
        position={[-68, 0.43, 28]}
        rotation={[-Math.PI / 2, 0, -3.1]}
        scale={1.8}
      />
      <group
        position={[-68, 0.43, 28]}
        rotation={[-Math.PI / 2, 0, -3.1]}
        scale={1.8}
      />
      <group
        position={[-45, 1.43, 30]}
        rotation={[0, 0.04, -Math.PI]}
        scale={[2.46, 2.46, 3.58]}
      />
      <group
        position={[-70, 2.43, 31]}
        rotation={[-Math.PI / 2, 0, -3.1]}
        scale={1.8}
      />
      <group
        position={[-64, 0.43, 28]}
        rotation={[-Math.PI / 2, 0, -3.1]}
        scale={1.8}
      />
      <group
        position={[-34, 1.43, 30]}
        rotation={[0, 0.04, -Math.PI]}
        scale={[2.46, 2.46, 3.58]}
      />
      <group
        position={[-59, 2.43, 31]}
        rotation={[-Math.PI / 2, 0, -3.1]}
        scale={1.8}
      />
      <group
        position={[-53, 0.43, 28]}
        rotation={[-Math.PI / 2, 0, -3.1]}
        scale={1.8}
      />
      <group
        position={[-33, 1.43, 44]}
        rotation={[0, 0.04, -Math.PI]}
        scale={[2.46, 2.46, 3.58]}
      >
        <mesh
          geometry={nodes.Object_2009.geometry}
          material={materials["material_0.007"]}
          position={[-0.52, -0.08, -0.59]}
          scale={0.72}
        />
        <mesh
          geometry={nodes.Object_3007.geometry}
          material={materials["material_0.007"]}
          position={[-0.52, -0.08, -0.59]}
          scale={0.72}
        />
        <mesh
          geometry={nodes.Object_4007.geometry}
          material={materials["material_0.007"]}
          position={[-0.52, -0.08, -0.59]}
          scale={0.72}
        />
        <mesh
          geometry={nodes.Object_5006.geometry}
          material={materials["material_0.007"]}
          position={[-0.52, -0.08, -0.59]}
          scale={0.72}
        />
        <mesh
          geometry={nodes.Object_6006.geometry}
          material={materials["material_0.007"]}
          position={[-0.52, -0.08, -0.59]}
          scale={0.72}
        />
      </group>
      <group
        position={[-59, 2.43, 45]}
        rotation={[-Math.PI / 2, 0, -3.1]}
        scale={1.8}
      >
        <mesh
          geometry={nodes.Cube_0026.geometry}
          material={materials["Material.049"]}
          position={[-13.94, -0.02, 0.83]}
          rotation={[0, 0, 1.57]}
          scale={[1.16, 0.72, 0.72]}
        >
          <meshBasicMaterial map={colorMap} side={THREE.DoubleSide} />
        </mesh>
      </group>
      <group
        position={[-53, 0.43, 41]}
        rotation={[-Math.PI / 2, 0, -3.1]}
        scale={1.8}
      >
        <mesh
          geometry={nodes.Cube_0027.geometry}
          material={materials["Material.050"]}
          position={[-12.99, 1, 1.14]}
          rotation={[0, 0, 1.66]}
          scale={[1.7, 0.71, 0.2]}
        >
          <meshBasicMaterial map={colorMap} side={THREE.DoubleSide} />
        </mesh>
      </group>
      <group
        position={[-64, 0.43, 42]}
        rotation={[-Math.PI / 2, 0, -3.1]}
        scale={1.8}
      >
        <mesh
          geometry={nodes.Cube_0028.geometry}
          material={materials["Material.051"]}
          position={[-12.99, -0.68, 1.66]}
          rotation={[0, 0, 1.35]}
          scale={[1.16, 0.72, 0.72]}
        >
          <meshBasicMaterial map={colorMap} side={THREE.DoubleSide} />
        </mesh>
      </group>
      <group
        position={[-70, 2.43, 45]}
        rotation={[-Math.PI / 2, 0, -3.1]}
        scale={1.8}
      >
        <mesh
          geometry={nodes.Cube_0029.geometry}
          material={materials["Material.052"]}
          position={[-13.94, 0.11, 0.82]}
          rotation={[0, 0, 1.57]}
          scale={[1.16, 0.72, 0.72]}
        >
          <meshBasicMaterial map={colorMap} side={THREE.DoubleSide} />
        </mesh>
      </group>
      <group
        position={[-45, 1.43, 42]}
        rotation={[0, 0.04, -Math.PI]}
        scale={[2.46, 2.46, 3.58]}
      >
        <mesh
          geometry={nodes.Object_2010.geometry}
          material={materials["material_0.008"]}
          position={[-0.52, -0.08, 0.03]}
          scale={0.72}
        />
        <mesh
          geometry={nodes.Object_3008.geometry}
          material={materials["material_0.008"]}
          position={[-0.52, -0.08, 0.03]}
          scale={0.72}
        />
        <mesh
          geometry={nodes.Object_4008.geometry}
          material={materials["material_0.008"]}
          position={[-0.52, -0.08, 0.03]}
          scale={0.72}
        />
        <mesh
          geometry={nodes.Object_5007.geometry}
          material={materials["material_0.008"]}
          position={[-0.52, -0.08, 0.03]}
          scale={0.72}
        />
        <mesh
          geometry={nodes.Object_6007.geometry}
          material={materials["material_0.008"]}
          position={[-0.52, -0.08, 0.03]}
          scale={0.72}
        />
      </group>
      <group
        position={[-11, 0.43, 34]}
        rotation={[Math.PI / 2, 0, -3.14]}
        scale={-0.06}
      >
        <group rotation={[Math.PI / 2, 0, 0]} />
      </group>
      <group
        position={[-11, -0.57, 56]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[2.05, 1.8, 1.8]}
      />
      <group
        position={[-10, -0.57, 58]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[2.24, 1.8, 1.8]}
      />
      <group
        position={[-10, -0.57, 63]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[2.24, 1.8, 1.8]}
      />
      <group
        position={[-11, -0.57, 61]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[2.05, 1.8, 1.8]}
      />
      <group
        position={[-10, -0.57, 68]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[2.24, 1.8, 1.8]}
      />
      <group
        position={[-11, -0.57, 66]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[2.05, 1.8, 1.8]}
      />
      <group
        position={[-11, -2.57, 66]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[2.05, 1.8, 1.8]}
      />
      <group
        position={[-10, -2.57, 68]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[2.24, 1.8, 1.8]}
      />
      <group
        position={[-11, -2.57, 61]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[2.05, 1.8, 1.8]}
      />
      <group
        position={[-10, -2.57, 63]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[2.24, 1.8, 1.8]}
      />
      <group
        position={[-10, -2.57, 58]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[2.24, 1.8, 1.8]}
      />
      <group
        position={[-11, -2.57, 56]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[2.05, 1.8, 1.8]}
      />
      <group
        position={[25, -2.57, 58]}
        rotation={[-Math.PI / 2, 0, 1.54]}
        scale={[2.24, 1.8, 1.8]}
      />
      <group
        position={[23, -2.57, 58]}
        rotation={[-Math.PI / 2, 0, 1.54]}
        scale={[2.05, 1.8, 1.8]}
      />
      <group
        position={[30, -2.57, 58]}
        rotation={[-Math.PI / 2, 0, 1.54]}
        scale={[2.24, 1.8, 1.8]}
      />
      <group
        position={[27, -2.57, 58]}
        rotation={[-Math.PI / 2, 0, 1.54]}
        scale={[2.05, 1.8, 1.8]}
      />
      <group
        position={[27, -0.57, 58]}
        rotation={[-Math.PI / 2, 0, 1.54]}
        scale={[2.05, 1.8, 1.8]}
      />
      <group
        position={[30, -0.57, 58]}
        rotation={[-Math.PI / 2, 0, 1.54]}
        scale={[2.24, 1.8, 1.8]}
      />
      <group
        position={[23, -0.57, 58]}
        rotation={[-Math.PI / 2, 0, 1.54]}
        scale={[2.05, 1.8, 1.8]}
      />
      <group
        position={[25, -0.57, 58]}
        rotation={[-Math.PI / 2, 0, 1.54]}
        scale={[2.24, 1.8, 1.8]}
      />
      <group
        position={[3, -2.57, 58]}
        rotation={[-Math.PI / 2, 0, 1.57]}
        scale={[2.24, 1.8, 1.8]}
      />
      <group
        position={[0, -2.57, 58]}
        rotation={[-Math.PI / 2, 0, 1.57]}
        scale={[2.05, 1.8, 1.8]}
      />
      <group
        position={[7, -2.57, 58]}
        rotation={[-Math.PI / 2, 0, 1.57]}
        scale={[2.24, 1.8, 1.8]}
      />
      <group
        position={[5, -2.57, 58]}
        rotation={[-Math.PI / 2, 0, 1.57]}
        scale={[2.05, 1.8, 1.8]}
      />
      <group
        position={[5, -0.57, 58]}
        rotation={[-Math.PI / 2, 0, 1.57]}
        scale={[2.05, 1.8, 1.8]}
      />
      <group
        position={[7, -0.57, 58]}
        rotation={[-Math.PI / 2, 0, 1.57]}
        scale={[2.24, 1.8, 1.8]}
      />
      <group
        position={[0, -0.57, 58]}
        rotation={[-Math.PI / 2, 0, 1.57]}
        scale={[2.05, 1.8, 1.8]}
      />
      <group
        position={[3, -0.57, 58]}
        rotation={[-Math.PI / 2, 0, 1.57]}
        scale={[2.24, 1.8, 1.8]}
      />
      <group
        position={[3, -0.57, 66]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1.8}
      />
      <group
        position={[3, -2.57, 66]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1.8}
      />
      <group
        position={[-11, -0.57, 67]}
        rotation={[-Math.PI / 2, 0, 0.04]}
        scale={[2.05, 1.8, 1.8]}
      />
      <group
        position={[-9, 2.43, 59]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1.8}
      />
      <group
        position={[-9, 2.43, 63]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1.8}
      />
      <mesh
        geometry={nodes.Cube008.geometry}
        material={nodes.Cube008.material}
        position={[-5, 0.43, 50]}
        rotation={[0, 0, Math.PI / 2]}
        scale={0.1}
      >
        <meshBasicMaterial map={colorMap} side={THREE.DoubleSide} />
      </mesh>
      <mesh
        geometry={nodes.Cube017.geometry}
        material={nodes.Cube017.material}
        position={[-5, 0.43, 50]}
        rotation={[-Math.PI, 1.57, -Math.PI]}
        scale={0.1}
      >
        <meshBasicMaterial map={colorMap} side={THREE.DoubleSide} />
      </mesh>
      <mesh
        geometry={nodes.Cube025.geometry}
        material={nodes.Cube025.material}
        position={[-28, 1.43, 55]}
        rotation={[3.06, 0, 3.08]}
        scale={0.1}
      >
        <meshBasicMaterial map={colorMap} side={THREE.DoubleSide} />
      </mesh>
      <mesh
        geometry={nodes.Cube032.geometry}
        material={nodes.Cube032.material}
        position={[-15, 3.43, 69]}
        rotation={[-Math.PI / 2, 0, 1.57]}
        scale={0.1}
      >
        <meshBasicMaterial map={colorMap} side={THREE.DoubleSide} />
      </mesh>
      <mesh
        geometry={nodes.Cube050.geometry}
        material={nodes.Cube050.material}
        position={[-5, 0.43, 50]}
        rotation={[-Math.PI / 2, 0, -2.44]}
        scale={0.1}
      >
        <meshBasicMaterial map={colorMap} side={THREE.DoubleSide} />
      </mesh>
      <mesh
        geometry={nodes.Cube051.geometry}
        material={nodes.Cube051.material}
        position={[19, 0.43, 30]}
        rotation={[Math.PI / 2, 0, -2.44]}
        scale={-0.1}
      >
        <meshBasicMaterial map={colorMap} side={THREE.DoubleSide} />
      </mesh>
      <mesh
        geometry={nodes.Cube089.geometry}
        material={nodes.Cube089.material}
        rotation={[-Math.PI, 0, -Math.PI]}
      >
        <meshBasicMaterial map={colorMap} side={THREE.DoubleSide} />
      </mesh>
      <mesh
        geometry={nodes.Cube090.geometry}
        material={nodes.Cube090.material}
        rotation={[0, 0.04, 0]}
      >
        <meshBasicMaterial map={colorMap} side={THREE.DoubleSide} />
      </mesh>
      <mesh
        geometry={nodes.Cube091.geometry}
        material={nodes.Cube091.material}
        rotation={[0, -1.57, 0]}
      >
        <meshBasicMaterial map={colorMap} side={THREE.DoubleSide} />
      </mesh>
      <mesh
        geometry={nodes.Cube092.geometry}
        material={nodes.Cube092.material}
        rotation={[-Math.PI, 1.57, -Math.PI]}
      >
        <meshBasicMaterial map={colorMap} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

useGLTF.preload("/palletsandboxes.glb");
export default Model;