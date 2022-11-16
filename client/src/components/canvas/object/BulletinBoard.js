import React, { useRef, useState } from "react";
import { Html, useGLTF } from "@react-three/drei";

export function BulletinBoard() {
  const { nodes, materials } = useGLTF(
    "/models/objects/bulletinBoard/scene.gltf"
  );
  const [hidden, set] = useState();
  const arr = ["곽규명", "냥냥고", "이름없음", "사과농장"];
  return (
    <group
      dispose={null}
      position={[0, -2, 20]}
      rotation={[0, (180 * Math.PI) / 180, 0]}
      scale={0.04}
    >
      {arr.map((item, index) => (
        <Html
          transform
          occlude
          onOcclude={set}
          scale={10}
          position={[-70 + index * 48, 180, -40]}
          rotation={[0, 0, -0.2]}
          style={{
            transition: "all 0.2s",
            opacity: hidden ? 0 : 1,
            transform: `scale(${hidden ? 0.25 : 1})`,
          }}
        >
          <div style={{ fontSize: "26px" }}>{item}</div>
          <img
            style={{ transition: "0.2s" }}
            onMouseOver={(e) => {
              e.target.style.opacity = "0.5";
            }}
            onMouseOut={(e) => {
              e.target.style.opacity = "1";
            }}
            src="https://via.placeholder.com/150"
            alt=""
          />
        </Html>
      ))}
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            geometry={nodes.defaultMaterial.geometry}
            material={materials.lambert1}
          />
          <mesh
            geometry={nodes.defaultMaterial_1.geometry}
            material={materials.lambert2}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/objects/bulletinBoard/scene.gltf");
