import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows } from "@react-three/drei";
import { useRef, Suspense } from "react";
import type { Mesh, Group } from "three";

function Robot() {
  const group = useRef<Group>(null);
  const blade = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.3;
    }
    if (blade.current) {
      blade.current.rotation.x += delta * 12;
    }
  });

  return (
    <group ref={group} position={[0, -0.4, 0]}>
      {/* Chassis */}
      <mesh castShadow position={[0, 0.3, 0]}>
        <boxGeometry args={[2.2, 0.5, 1.4]} />
        <meshStandardMaterial color="#1a0a14" metalness={0.9} roughness={0.3} />
      </mesh>
      {/* Top armor wedge */}
      <mesh castShadow position={[-0.3, 0.7, 0]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[1.6, 0.2, 1.3]} />
        <meshStandardMaterial
          color="#e11d48"
          metalness={0.8}
          roughness={0.25}
          emissive="#e11d48"
          emissiveIntensity={0.15}
        />
      </mesh>
      {/* Spinning blade */}
      <mesh ref={blade} position={[1.3, 0.45, 0]} castShadow>
        <cylinderGeometry args={[0.6, 0.6, 0.08, 6]} />
        <meshStandardMaterial
          color="#f43f5e"
          metalness={1}
          roughness={0.1}
          emissive="#f43f5e"
          emissiveIntensity={0.4}
        />
      </mesh>
      {/* Wheels */}
      {[
        [-0.8, 0, 0.75],
        [0.8, 0, 0.75],
        [-0.8, 0, -0.75],
        [0.8, 0, -0.75],
      ].map((p, i) => (
        <mesh
          key={i}
          position={p as [number, number, number]}
          rotation={[Math.PI / 2, 0, 0]}
          castShadow
        >
          <cylinderGeometry args={[0.35, 0.35, 0.3, 24]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
        </mesh>
      ))}
      {/* Glow underlight */}
      <pointLight position={[0, 0.1, 0]} color="#f43f5e" intensity={2} distance={3} />
    </group>
  );
}

export function RobotScene() {
  return (
    <Canvas shadows camera={{ position: [4, 2.5, 5], fov: 45 }} dpr={[1, 2]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <spotLight
          position={[5, 8, 5]}
          angle={0.4}
          penumbra={1}
          intensity={2}
          color="#f43f5e"
          castShadow
        />
        <spotLight
          position={[-5, 5, -5]}
          angle={0.5}
          penumbra={1}
          intensity={1.5}
          color="#06b6d4"
        />
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
          <Robot />
        </Float>
        <ContactShadows position={[0, -0.5, 0]} opacity={0.6} blur={2} far={4} />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
}
