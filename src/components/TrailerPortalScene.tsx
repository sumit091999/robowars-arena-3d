import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import type { Group, Mesh, Points } from "three";
import { AdditiveBlending } from "three";

function ProjectionBeam() {
  const group = useRef<Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.7) * 0.035;
    group.current.scale.set(pulse, 1, pulse);
  });

  return (
    <group ref={group} position={[0, -0.52, -2.4]} rotation={[Math.PI, 0, 0]}>
      <mesh>
        <coneGeometry args={[2.45, 3.45, 64, 1, true]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.12}
          blending={AdditiveBlending}
          depthWrite={false}
          side={2}
        />
      </mesh>
      <mesh>
        <coneGeometry args={[1.55, 3.2, 64, 1, true]} />
        <meshBasicMaterial
          color="#e11d48"
          transparent
          opacity={0.06}
          blending={AdditiveBlending}
          depthWrite={false}
          side={2}
        />
      </mesh>
    </group>
  );
}

function BeamParticles({ count = 180 }: { count?: number }) {
  const ref = useRef<Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const height = Math.random();
      const radius = 0.12 + height * 1.65 * Math.random();
      const angle = Math.random() * Math.PI * 2;
      arr[i * 3] = Math.cos(angle) * radius;
      arr[i * 3 + 1] = -2.2 + height * 3.05;
      arr[i * 3 + 2] = -2.35 + Math.sin(angle) * radius * 0.35;
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    const points = ref.current;
    if (!points) return;
    const arr = points.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const y = i * 3 + 1;
      arr[y] += delta * 0.42;
      if (arr[y] > 0.92) arr[y] = -2.2;
    }
    points.geometry.attributes.position.needsUpdate = true;
    points.rotation.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.12;
    points.rotation.z += delta * 0.08;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        color="#dffaff"
        transparent
        opacity={0.82}
        sizeAttenuation
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function ProjectorBase() {
  const group = useRef<Group>(null);
  const core = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.18;
      group.current.position.y = -2.38 + Math.sin(state.clock.elapsedTime * 0.8) * 0.025;
    }
    if (core.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.6) * 0.08;
      core.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={group} position={[0, -2.38, -1.9]}>
      <mesh>
        <cylinderGeometry args={[0.9, 1.05, 0.28, 48]} />
        <meshStandardMaterial
          color="#120814"
          metalness={0.85}
          roughness={0.28}
          emissive="#e11d48"
          emissiveIntensity={0.18}
        />
      </mesh>
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.55, 0.72, 0.2, 48]} />
        <meshStandardMaterial
          color="#07141b"
          metalness={0.9}
          roughness={0.2}
          emissive="#06b6d4"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh ref={core} position={[0, 0.34, 0]}>
        <sphereGeometry args={[0.18, 32, 16]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.9} blending={AdditiveBlending} />
      </mesh>
      <pointLight position={[0, 0.45, 0]} color="#06b6d4" intensity={1.8} distance={4} />
    </group>
  );
}

function HologramFrameGlow() {
  const group = useRef<Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.018;
  });

  return (
    <group ref={group} position={[0, 0.78, -2.75]}>
      <mesh>
        <planeGeometry args={[4.95, 2.62]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.035}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh>
        <ringGeometry args={[1.75, 1.78, 96]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.16}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export function TrailerPortalScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 54 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.45} />
        <pointLight position={[4, 3, 3]} color="#e11d48" intensity={1.2} />
        <ProjectionBeam />
        <BeamParticles />
        <HologramFrameGlow />
        <ProjectorBase />
      </Suspense>
    </Canvas>
  );
}
