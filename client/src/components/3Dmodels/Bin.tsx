/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { Html, useGLTF } from "@react-three/drei";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import config from "../../config/config";
import "../../Styles/BinLocation.scss";
// import { color } from "@mui/system";

type GLTFResult = GLTF & {
  nodes: {
    Cube024: THREE.Mesh;
  };
  materials: {};
};

interface ModelProps {
  areatag: string;
  racktag: string;
  leveltag: string;
  sectiontag: string;
  currentbintags?: string[];
  position: [x: number, y: number, z: number];
}

const Model: React.FC<ModelProps> = ({
  areatag,
  racktag,
  leveltag,
  sectiontag,
  position,
  currentbintags
}) => {
  const group = useRef<THREE.Group>();
  const [BinsData, setBinsData] = useState<any>(null);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [exists, setExists] = useState<boolean>(true);
  const { nodes, materials } = useGLTF("/box.glb") as GLTFResult;
  const [CurrentBinID, setCurrentBinID] = useState([]);
  const bintag = `${areatag}${racktag}${leveltag}${sectiontag}`;

  // Get Bin Information
  // function Bins () {
  //   const [BinsData, setBinsData ] = useState([]);

  //   const getBinsData = async () => {
  //     const response = await axios.get(`${config.baseURL}/bintag/${bintag}`);

  //     setBinsData(response.data);
  //   };

  // }

  // get bin tag by bin tag

  useEffect(() => {
    axios.get(`${config.baseURL}/bintag/${bintag}`).then((data) => {
      console.log(data.data[0])
      if (data.data[0] == null) {
        setExists(false)
      } else {
        setBinsData(data.data[0]);
      }
    });
  }, []);

  // get bin products and amount of items

  // useEffect(() => {
  //   axios.get(`${config.baseURL}/bintag/${bintag}`).then((data) => {
  //     setBinsData(data.data[0]);
  //   });
  // }, []);

  // // get bin qty by bin id

  //    useEffect(() => {
  //     axios.get(`${config.baseURL}/binqtybinid/${binid}`).then((data) => {
  //         setCurrentBinID(data.data[0])
  //     });

  //    }, []);

  //   console.log(BinsData);

  if (currentbintags?.includes(bintag)) {
    console.log("this bin tag is included: ", bintag)
  }

  return (
    <>
    {exists?
    <group
      onPointerOver={() => setIsSelected(true)}
      onPointerOut={() => setIsSelected(false)}
      ref={group}
      dispose={null}
      position={position}
      scale={[2.5, 2.5, 2.5]}
    >
      <mesh
        geometry={nodes.Cube024.geometry}
        material={nodes.Cube024.material}
        position={[-1.42, 0.55, -3.13]}
        scale={[0.85, 0.29, 0.51]}
      >
        {isSelected ? (
          <Html distanceFactor={10}>
            <div className="content">
              BinTag:{BinsData.BinTag}
              <br />
              Column: {sectiontag}
              <br />
              Rack: {racktag}
              <br />
              Level: {leveltag}
              <br />
              Capacity:{BinsData.Volume} cm3
              <br />
              Amount of Items:
              <br />
            </div>
          </Html>
        ) : null}

        <meshStandardMaterial color={currentbintags?.includes(bintag) || isSelected ? "#8b0000" : "gray"} />
      </mesh>
    </group> : null}
    </>
  );
};

useGLTF.preload("/box.glb");

export default Model;