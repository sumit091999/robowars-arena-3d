import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import type { Mesh, PlaneGeometry, Points } from "three";
import { Color } from "three";

function resetHeroStar(arr: Float32Array, index: number, z = -24 - Math.random() * 24) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 1.2 + Math.random() * 13;
  arr[index * 3] = Math.cos(angle) * radius;
  arr[index * 3 + 1] = Math.sin(angle) * radius * 0.42 + 1.45;
  arr[index * 3 + 2] = z;
}

function HeroStarsBehindWave({ count = 900 }: { count?: number }) {
  const ref = useRef<Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) resetHeroStar(arr, i, -11 - Math.random() * 37);
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    const points = ref.current;
    if (!points) return;
    const arr = points.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const x = i * 3;
      const y = x + 1;
      const z = x + 2;
      const speed = Math.max(0.35, 1 + arr[z] * -0.02);
      arr[z] += delta * 4.4 * speed;
      arr[x] *= 1 + delta * 0.006;
      arr[y] *= 1 + delta * 0.006;
      if (arr[z] > -10) resetHeroStar(arr, i);
    }
    points.geometry.attributes.position.needsUpdate = true;
    points.rotation.z = Math.sin(state.clock.elapsedTime * 0.22) * 0.018;
  });

  return (
    <points ref={ref} renderOrder={0}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#e7fbff"
        transparent
        opacity={0.68}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function HeroWaveGrid() {
  const mesh = useRef<Mesh>(null);
  const geomRef = useRef<PlaneGeometry>(null);
  const basePositions = useRef<Float32Array | null>(null);

  useFrame((state) => {
    const geometry = geomRef.current;
    if (!geometry) return;
    const position = geometry.attributes.position;
    const arr = position.array as Float32Array;
    if (!basePositions.current) basePositions.current = arr.slice();
    const base = basePositions.current;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < arr.length; i += 3) {
      const x = base[i];
      const y = base[i + 1];
      arr[i + 2] =
        Math.sin(x * 0.9 + time * 1.15) * 0.24 +
        Math.cos(y * 1.35 + time * 0.9) * 0.18 +
        Math.sin((x - y) * 0.55 + time * 0.7) * 0.12;
    }
    position.needsUpdate = true;

    if (mesh.current) {
      mesh.current.rotation.z = Math.sin(time * 0.16) * 0.025;
      mesh.current.position.y = -2.8 + Math.sin(time * 0.25) * 0.08;
    }
  });

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2.45, 0, 0]} position={[1.5, -2.8, -5]} renderOrder={2}>
      <planeGeometry ref={geomRef} args={[34, 18, 95, 45]} />
      <meshStandardMaterial
        color={new Color("#080a16")}
        emissive={new Color("#e11d48")}
        emissiveIntensity={0.28}
        wireframe
        transparent
        opacity={0.18}
      />
    </mesh>
  );
}

export function HeroEnergyScene() {
  return (
    <Canvas
      camera={{ position: [0, 1.6, 9], fov: 62 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.65} />
        <pointLight position={[5, 5, 5]} color="#e11d48" intensity={1.4} />
        <pointLight position={[-4, 2, 3]} color="#06b6d4" intensity={1.2} />
        <HeroStarsBehindWave />
        <HeroWaveGrid />
      </Suspense>
    </Canvas>
  );
}
