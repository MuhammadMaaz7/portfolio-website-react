import { useEffect, useMemo, useRef } from "react";
import { Canvas, ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
export type DeskTarget = "work" | "experience" | "about" | "contact";
type Position = [number, number, number];
type SceneProps = {
  night: boolean;
  motion: boolean;
  greeting: number;
  onSelect: (target: DeskTarget) => void;
  onGreet: () => void;
  onToggleLight: () => void;
  onReady: () => void;
};
function Rounded({
  size,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color,
  radius = 0.06,
  onClick,
}: {
  size: Position;
  position?: Position;
  rotation?: Position;
  color: string;
  radius?: number;
  onClick?: () => void;
}) {
  const geometry = useMemo(
    () =>
      new RoundedBoxGeometry(
        ...size,
        3,
        Math.min(radius, ...size.map((n) => n / 3)),
      ),
    [size[0], size[1], size[2], radius],
  );
  useEffect(() => () => geometry.dispose(), [geometry]);
  return (
    <mesh
      geometry={geometry}
      position={position}
      rotation={rotation}
      castShadow
      receiveShadow
      onClick={
        onClick
          ? (e) => {
              e.stopPropagation();
              onClick();
            }
          : undefined
      }
      onPointerOver={
        onClick
          ? (e) => {
              e.stopPropagation();
              document.body.style.cursor = "pointer";
            }
          : undefined
      }
      onPointerOut={
        onClick
          ? () => {
              document.body.style.cursor = "";
            }
          : undefined
      }
    >
      <meshStandardMaterial color={color} roughness={0.77} />
    </mesh>
  );
}
function Ball({
  position,
  scale = [1, 1, 1],
  color,
}: {
  position: Position;
  scale?: Position;
  color: string;
}) {
  return (
    <mesh position={position} scale={scale} castShadow>
      <sphereGeometry args={[1, 24, 16]} />
      <meshStandardMaterial color={color} roughness={0.8} />
    </mesh>
  );
}
function Label({
  text,
  position,
  width = 1.2,
  height = 0.5,
  bg = "#f6eedc",
  color = "#30383d",
  size = 50,
}: {
  text: string;
  position: Position;
  width?: number;
  height?: number;
  bg?: string;
  color?: string;
  size?: number;
}) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 512, 256);
    ctx.fillStyle = color;
    ctx.font = `700 ${size}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    text
      .split("\n")
      .forEach((line, i, lines) =>
        ctx.fillText(
          line,
          256,
          128 + (i - (lines.length - 1) / 2) * size * 1.3,
        ),
      );
    const map = new THREE.CanvasTexture(canvas);
    map.colorSpace = THREE.SRGBColorSpace;
    return map;
  }, [text, bg, color, size]);
  useEffect(() => () => texture.dispose(), [texture]);
  return (
    <mesh position={position}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}
function CameraRig({ onReady }: { onReady: () => void }) {
  const { camera, size, invalidate } = useThree();
  useEffect(() => {
    const c = camera as THREE.OrthographicCamera;
    c.position.set(5.8, 4.7, 7);
    c.lookAt(0, 1.5, 0);
    c.zoom = Math.min(size.width / 7.2, size.height / 5.5);
    c.updateProjectionMatrix();
    invalidate();
    onReady();
  }, [camera, size.width, size.height, invalidate, onReady]);
  return null;
}
function Buddy({
  greeting,
  motion,
  onGreet,
}: {
  greeting: number;
  motion: boolean;
  onGreet: () => void;
}) {
  const arm = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const started = useRef(0);
  const { invalidate } = useThree();
  useEffect(() => {
    if (greeting > 0) {
      started.current = performance.now();
      invalidate();
    }
  }, [greeting, invalidate]);
  useFrame(() => {
    if (!arm.current || !head.current) return;
    const t = (performance.now() - started.current) / 1000;
    const active = motion && started.current > 0 && t < 1.8;
    arm.current.rotation.z = active ? -0.55 + Math.sin(t * 13) * 0.36 : -0.15;
    head.current.rotation.z = active ? Math.sin(t * 5) * 0.04 : 0;
    if (active) invalidate();
  });
  return (
    <group
      position={[-1.18, 1.51, 0.24]}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        onGreet();
      }}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "";
      }}
    >
      <Ball
        position={[-0.18, -0.01, 0.12]}
        scale={[0.16, 0.09, 0.23]}
        color="#344b8b"
      />
      <Ball
        position={[0.18, -0.01, 0.12]}
        scale={[0.16, 0.09, 0.23]}
        color="#344b8b"
      />
      <Rounded
        size={[0.55, 0.55, 0.42]}
        position={[0, 0.27, 0]}
        color="#edaa8e"
        radius={0.12}
      />
      <group ref={head} position={[0, 0.72, 0]}>
        <Rounded size={[0.7, 0.57, 0.55]} color="#f2b69b" radius={0.13} />
        <Ball
          position={[-0.14, 0.02, 0.282]}
          scale={[0.035, 0.055, 0.025]}
          color="#29343b"
        />
        <Ball
          position={[0.14, 0.02, 0.282]}
          scale={[0.035, 0.055, 0.025]}
          color="#29343b"
        />
        <Ball
          position={[-0.24, -0.085, 0.267]}
          scale={[0.07, 0.032, 0.016]}
          color="#dc816f"
        />
        <Ball
          position={[0.24, -0.085, 0.267]}
          scale={[0.07, 0.032, 0.016]}
          color="#dc816f"
        />
        <mesh position={[0, -0.09, 0.285]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.055, 0.012, 8, 18, Math.PI]} />
          <meshStandardMaterial color="#7e4137" />
        </mesh>
        <Rounded
          size={[0.73, 0.12, 0.58]}
          position={[0, 0.32, 0]}
          color="#536bba"
          radius={0.05}
        />
        <Rounded
          size={[0.42, 0.2, 0.4]}
          position={[0, 0.43, -0.04]}
          color="#617cc4"
          radius={0.07}
        />
      </group>
      <group ref={arm} position={[0.32, 0.42, 0]}>
        <Ball
          position={[0.09, 0.1, 0]}
          scale={[0.1, 0.25, 0.1]}
          color="#edaa8e"
        />
      </group>
      <Ball
        position={[-0.32, 0.32, 0.02]}
        scale={[0.1, 0.23, 0.1]}
        color="#edaa8e"
      />
    </group>
  );
}
function Scene(props: SceneProps) {
  const { night, onSelect } = props;
  return (
    <>
      <CameraRig onReady={props.onReady} />
      <ambientLight intensity={night ? 0.7 : 1.2} />
      <hemisphereLight
        args={[night ? "#a7bbf0" : "#fff7e5", "#b6a18e", night ? 0.8 : 1.2]}
      />
      <directionalLight
        position={[-3, 7, 5]}
        intensity={night ? 1.1 : 2.8}
        color={night ? "#bdc8ff" : "#fff1d5"}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={6}
        shadow-camera-bottom={-4}
        shadow-bias={-0.001}
      />
      <group rotation={[0, -0.12, 0]}>
        <Rounded
          size={[5.9, 0.24, 4]}
          position={[0, -0.17, 0]}
          color={night ? "#9fa7bc" : "#e5d7c2"}
          radius={0.12}
        />
        <Rounded
          size={[5.9, 3.5, 0.18]}
          position={[0, 1.7, -1.88]}
          color={night ? "#8790b2" : "#e9c9b9"}
          radius={0.09}
        />
        <Rounded
          size={[0.18, 3.5, 4]}
          position={[-2.9, 1.7, 0]}
          color={night ? "#7885aa" : "#efdbca"}
          radius={0.09}
        />
        {/* Window and a small view outside. */}
        <Rounded
          size={[1.7, 1.85, 0.12]}
          position={[-1.57, 2.15, -1.72]}
          color="#fff7e9"
          radius={0.12}
        />
        <Rounded
          size={[1.48, 1.63, 0.05]}
          position={[-1.57, 2.15, -1.63]}
          color={night ? "#394d7e" : "#b9d8de"}
          radius={0.07}
        />
        <Ball
          position={[-1.9, 2.55, -1.56]}
          scale={[0.18, 0.18, 0.025]}
          color={night ? "#f3e9c4" : "#f7d990"}
        />
        <Rounded
          size={[0.065, 1.68, 0.08]}
          position={[-1.57, 2.15, -1.56]}
          color="#fff7e9"
          radius={0.01}
        />
        <Rounded
          size={[1.55, 0.065, 0.08]}
          position={[-1.57, 2.15, -1.54]}
          color="#fff7e9"
          radius={0.01}
        />
        {/* A personal nameplate, not a project dashboard. */}
        <Rounded
          size={[1.2, 0.85, 0.09]}
          position={[0.65, 2.6, -1.73]}
          rotation={[0, 0, -0.06]}
          color="#5367ad"
          radius={0.02}
        />
        <Label
          text={"MAAZ’S\nWORKSHOP"}
          position={[0.65, 2.6, -1.672]}
          width={1.07}
          height={0.68}
          color="#fcf4df"
          bg="#5367ad"
          size={46}
        />
        {/* Desk. */}
        <Rounded
          size={[4.65, 0.24, 1.85]}
          position={[0, 1.31, 0]}
          color="#c89373"
          radius={0.08}
        />
        <Rounded
          size={[4.58, 0.06, 1.8]}
          position={[0, 1.46, 0]}
          color="#e8bd96"
          radius={0.03}
        />
        {[-1.95, 1.95].map((x) => (
          <group key={x}>
            <Rounded
              size={[0.18, 1.3, 0.2]}
              position={[x, 0.58, -0.61]}
              color="#b47e61"
            />
            <Rounded
              size={[0.18, 1.3, 0.2]}
              position={[x, 0.58, 0.62]}
              color="#b47e61"
            />
          </group>
        ))}
        {/* Work: an illustrated monitor. */}
        <group
          position={[0.02, 2.02, -0.43]}
          onClick={(e) => {
            e.stopPropagation();
            onSelect("work");
          }}
          onPointerOver={() => {
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            document.body.style.cursor = "";
          }}
        >
          <Rounded size={[1.72, 1.16, 0.16]} color="#4d625e" radius={0.08} />
          <Rounded
            size={[1.47, 0.9, 0.035]}
            position={[0, 0.04, 0.1]}
            color="#f7efdb"
            radius={0.035}
          />
          <Label
            text={"THINGS\nI’VE BUILT"}
            position={[-0.1, 0.1, 0.125]}
            width={1.26}
            height={0.67}
            bg="#f7efdb"
            color="#4b625b"
            size={56}
          />
          <Rounded
            size={[0.12, 0.32, 0.16]}
            position={[0, -0.73, 0]}
            color="#4d625e"
          />
          <Rounded
            size={[0.65, 0.07, 0.4]}
            position={[0, -0.88, 0.04]}
            color="#4d625e"
          />
        </group>
        <Rounded
          size={[1.35, 0.08, 0.5]}
          position={[0.07, 1.54, 0.42]}
          rotation={[-0.03, 0, 0]}
          color="#f3e7d4"
          radius={0.025}
        />
        {[0, 1, 2].map((r) =>
          [0, 1, 2, 3, 4, 5].map((c) => (
            <Rounded
              key={`${r}-${c}`}
              size={[0.14, 0.025, 0.095]}
              position={[-0.45 + c * 0.2, 1.595, 0.27 + r * 0.12]}
              color={c === 5 ? "#9eadbd" : "#c4b9a7"}
              radius={0.007}
            />
          )),
        )}
        <Buddy
          greeting={props.greeting}
          motion={props.motion}
          onGreet={props.onGreet}
        />
        {/* Experience: a blue notebook. */}
        <group
          position={[1.25, 1.52, -0.2]}
          rotation={[0, -0.15, -0.09]}
          onClick={(e) => {
            e.stopPropagation();
            onSelect("experience");
          }}
          onPointerOver={() => {
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            document.body.style.cursor = "";
          }}
        >
          <Rounded
            size={[0.65, 0.88, 0.23]}
            position={[0, 0.42, 0]}
            color="#5c73b4"
            radius={0.04}
          />
          <Label
            text={"MY\nJOURNEY"}
            position={[0, 0.45, 0.125]}
            width={0.54}
            height={0.61}
            bg="#5c73b4"
            color="#fff2db"
            size={51}
          />
        </group>
        {/* About: a growing little plant. */}
        <group
          position={[-2.04, 1.48, -0.45]}
          onClick={(e) => {
            e.stopPropagation();
            onSelect("about");
          }}
          onPointerOver={() => {
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            document.body.style.cursor = "";
          }}
        >
          <mesh position={[0, 0.16, 0]} castShadow>
            <cylinderGeometry args={[0.24, 0.17, 0.32, 24]} />
            <meshStandardMaterial color="#dd8e6b" roughness={0.8} />
          </mesh>
          <Ball
            position={[0, 0.33, 0]}
            scale={[0.2, 0.035, 0.2]}
            color="#796451"
          />
          {[-0.7, 0, 0.7].map((a, i) => (
            <group key={i} rotation={[0, a * 2, a * 0.8]}>
              <Ball
                position={[a * 0.15, 0.55, 0]}
                scale={[0.1, 0.3, 0.08]}
                color={i === 1 ? "#72906e" : "#91aa7f"}
              />
            </group>
          ))}
        </group>
        {/* A tactile lamp that changes the room lighting. */}
        <group
          position={[2.03, 1.5, -0.55]}
          onClick={(e) => {
            e.stopPropagation();
            props.onToggleLight();
          }}
          onPointerOver={() => {
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            document.body.style.cursor = "";
          }}
        >
          <Rounded size={[0.5, 0.07, 0.4]} color="#d6a34e" />
          <mesh position={[0, 0.55, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 1.1, 12]} />
            <meshStandardMaterial color="#d6a34e" />
          </mesh>
          <mesh position={[-0.08, 1.08, 0]} rotation={[0, 0, 0.15]} castShadow>
            <coneGeometry args={[0.38, 0.42, 24, 1, true]} />
            <meshStandardMaterial color="#f2cf7c" side={THREE.DoubleSide} />
          </mesh>
          {night && (
            <pointLight
              position={[-0.08, 0.86, 0.1]}
              intensity={2}
              color="#ffcc85"
              distance={3}
            />
          )}
        </group>
        {/* Contact: an envelope sitting on a small stool. */}
        <group
          position={[2.1, 0.4, 1.25]}
          rotation={[0, -0.25, 0]}
          onClick={(e) => {
            e.stopPropagation();
            onSelect("contact");
          }}
          onPointerOver={() => {
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            document.body.style.cursor = "";
          }}
        >
          <Rounded size={[0.95, 0.13, 0.75]} color="#75958b" />
          <Rounded
            size={[0.15, 0.4, 0.15]}
            position={[-0.29, -0.25, -0.2]}
            color="#75958b"
          />
          <Rounded
            size={[0.15, 0.4, 0.15]}
            position={[0.29, -0.25, 0.2]}
            color="#75958b"
          />
          <Rounded
            size={[0.67, 0.47, 0.05]}
            position={[0, 0.31, 0]}
            rotation={[-0.2, 0, 0]}
            color="#fff4d8"
            radius={0.015}
          />
          <Label
            text={"HELLO!"}
            position={[0, 0.32, 0.035]}
            width={0.57}
            height={0.33}
            color="#a9624b"
            bg="#fff4d8"
            size={59}
          />
        </group>
        <Rounded
          size={[1.5, 0.1, 0.48]}
          position={[1.6, 2.87, -1.6]}
          color="#c18c6d"
        />
        {["#d9b16e", "#a2b0a4", "#d7957c"].map((color, i) => (
          <Rounded
            key={color}
            size={[0.19, 0.43 + i * 0.04, 0.24]}
            position={[1.2 + i * 0.25, 3.12, -1.58]}
            rotation={[0, 0, i === 2 ? -0.12 : 0]}
            color={color}
            radius={0.015}
          />
        ))}
      </group>
    </>
  );
}
export default function WorkshopScene(props: SceneProps) {
  return (
    <Canvas
      aria-hidden="true"
      shadows
      frameloop="demand"
      dpr={[1, 1.5]}
      orthographic
      camera={{ position: [5.8, 4.7, 7], zoom: 75, near: 0.1, far: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      onPointerMissed={() => {
        document.body.style.cursor = "";
      }}
    >
      <Scene {...props} />
    </Canvas>
  );
}
