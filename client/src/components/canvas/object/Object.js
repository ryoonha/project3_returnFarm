import { RigidBody } from "@react-three/rapier";
import React from "react";
import { Cat } from "../../models/objects/Cat";
import { Lake } from "../../models/objects/Lake";
import { TreeTrunk } from "../../models/objects/TreeTrunk";
import { Well } from "../../models/objects/Well";

const Object = () => {
  // return <group>{<Well />}</group>;
  return (
    <group>
      <Lake
        position={[150, -6, -50]}
        rotation={[0, Math.PI / 2, 0]}
        scale={2}
      />
      {/* <group position={[-10, 0, -80]} rotation={[0, -Math.PI / 0.6, 0]}> */}
      <RigidBody type={"fixed"} colliders={"cuboid"}>
        <group position={[-90, 0, -60]} rotation={[0, -Math.PI / 0.6, 0]}>
          <TreeTrunk scale={5} />
          <Cat position={[0, 3.1, 0]} />
        </group>
      </RigidBody>
    </group>
  );
};

export default Object;
