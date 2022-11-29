import { Sky, useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { PointLightHelper, Vector3 } from "three";
import { weatherChange } from "../../../stores/reducers/stateSlice";

let initLightPos = 150;
let lightSpeed = 0.01;
export const Light = () => {
  const dispatch = useDispatch();
  const pointLight = useRef();
  const axisLight = useRef();
  const ref = useRef();

  const [dayOrNight, setDayOrNight] = useState({
    dx: false,
    dy: false,
    dz: false,
  });
  const [weather, setWeather] = useState(null);
  //useHelper(pointLight, PointLightHelper, 10.5, "red");

  useFrame(() => {
    //pointLight.current.position.set((x -= 0.11), y, z);
    if (pointLight.current) {
      const { x, y, z } = pointLight.current.position;
      const { dx, dy, dz } = dayOrNight;
      if (x >= initLightPos && dx) {
        setDayOrNight({ ...dayOrNight, dx: false });
      } else if (x <= -initLightPos && !dx) {
        setDayOrNight({ ...dayOrNight, dx: true });
      }
      if (y >= initLightPos && dy) {
        setDayOrNight({ ...dayOrNight, dy: false });
      } else if (y <= -initLightPos && !dy) {
        setDayOrNight({ ...dayOrNight, dy: true });
      }
      if (z >= initLightPos && dz) {
        setDayOrNight({ ...dayOrNight, dz: false });
      } else if (z <= -initLightPos && !dz) {
        setDayOrNight({ ...dayOrNight, dz: true });
      }
      if (y > 0 && weather !== "sun") {
        dispatch(weatherChange({ change: "sun" }));
        setWeather("sun");
      } else if (y < 0 && weather !== "moon") {
        dispatch(weatherChange({ change: "moon" }));
        setWeather("moon");
      }
      pointLight.current.position.lerp(
        new Vector3(
          dx ? x + lightSpeed : x - lightSpeed,
          dy ? y + lightSpeed : y - lightSpeed,
          dz ? z + lightSpeed : z - lightSpeed
        ),
        0.2
      );
      // 빛 자체 회전
      // let rAxis = axisLight.current.rotation;
      // if (dy) {
      //   axisLight.current.rotation.set(0, rAxis.y + 0.0001, 0);
      // } else {
      //   axisLight.current.rotation.set(0, rAxis.y - 0.0001, 0);
      // }
      ref.current.material.uniforms.sunPosition.value = new Vector3(x, y, z);
    }
  });

  return (
    <>
      <group ref={axisLight}>
        <pointLight
          castShadow
          ref={pointLight}
          position={[0, initLightPos, 0]}
          intensity={1}
          shadow-mapSize-width={4096} //4096
          shadow-mapSize-height={4096}
          shadow-camera-far={5000}
          shadow-camera-near={0.5}
          shadow-camera-left={-5000}
          shadow-camera-right={5000}
          shadow-camera-top={-5000}
          shadow-camera-bottom={5000}
        />
      </group>
      <ambientLight intensity={0.3} />
      {/* inclination={inclination} */}
      <Sky ref={ref} rayleigh={0} />
    </>
  );
};
