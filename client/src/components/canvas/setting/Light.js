import { Sky, useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { PointLightHelper, Vector3 } from "three";
import { weatherChange } from "../../../stores/reducers/stateSlice";

export const Light = () => {
  const dispatch = useDispatch();
  const pointLight = useRef();

  const [dayOrNight, setDayOrNight] = useState({
    dx: false,
    dy: false,
    dz: false,
  });
  const [weather, setWeather] = useState(null);
  useHelper(pointLight, PointLightHelper, 1.5, "lightblue");

  useFrame(() => {
    //pointLight.current.position.set((x -= 0.11), y, z);
    if (pointLight.current) {
      const { x, y, z } = pointLight.current.position;
      const { dx, dy, dz } = dayOrNight;
      if (x >= 100 && dx) {
        setDayOrNight({ ...dayOrNight, dx: false });
      } else if (y <= -100 && !dx) {
        setDayOrNight({ ...dayOrNight, dx: true });
      }
      if (y >= 100 && dy) {
        setDayOrNight({ ...dayOrNight, dy: false });
      } else if (y <= -100 && !dy) {
        setDayOrNight({ ...dayOrNight, dy: true });
      }
      if (z >= 100 && dz) {
        setDayOrNight({ ...dayOrNight, dz: false });
      } else if (z <= -100 && !dz) {
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
          dx ? x + 0.1 : x - 0.1,
          dy ? y + 0.1 : y - 0.1,
          dz ? z + 0.1 : z - 0.1
        ),
        0.2
      );
    }
  });

  return (
    <>
      <pointLight
        castShadow
        ref={pointLight}
        position={[0, 100, 0]}
        intensity={1.5}
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={5000}
        shadow-camera-near={0.5}
        shadow-camera-left={-5000}
        shadow-camera-right={5000}
        shadow-camera-top={-5000}
        shadow-camera-bottom={5000}
      />
      <ambientLight intensity={0.3} />
      {/* inclination={inclination} */}
      <Sky sunPosition={1} rayleigh={0} />
    </>
  );
};
