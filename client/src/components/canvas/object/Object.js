import React from "react";
import { Lake } from "../../models/objects/Lake";
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
    </group>
  );
};

export default Object;
