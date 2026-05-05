import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import type { Mesh, PlaneGeometry, Points } from "three";
import { Color } from "three";

function resetStar(arr: Float32Array, index: number, z = -16 - Math.random() * 12) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 0.8 + Math.random() * 11;
  arr[index * 3] = Math.cos(angle) * radius;
  arr[index * 3 + 1] = Math.sin(angle) * radius * 0.34 + 0.8;
  arr[index * 3 + 2] = z;
}

function WaterWavePlane() {
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
        Math.sin(x * 1.1 + time * 1.35) * 0.22 +
        Math.cos(y * 1.7 + time * 1.05) * 0.18 +
        Math.sin((x + y) * 0.75 + time * 0.8) * 0.12;
    }
    position.needsUpdate = true;

    if (mesh.current) {
      mesh.current.rotation.z = Math.sin(time * 0.18) * 0.035;
      mesh.current.position.y = Math.sin(time * 0.3) * 0.08 - 1.25;
    }
  });

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2.55, 0, 0]} position={[0, -1.25, -2.5]}>
      <planeGeometry ref={geomRef} args={[28, 13, 90, 42]} />
      <meshStandardMaterial
        color={new Color("#06141f")}
        emissive={new Color("#06b6d4")}
        emissiveIntensity={0.7}
        wireframe
        transparent
        opacity={0.56}
      />
    </mesh>
  );
}

function StarLayer({ count = 700 }: { count?: number }) {
  const ref = useRef<Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      resetStar(arr, i, -1 - Math.random() * 27);
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    const points = ref.current;
    if (!points) return;

    const arr = points.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const xIndex = i * 3;
      const yIndex = xIndex + 1;
      const zIndex = xIndex + 2;
      const depthBoost = Math.max(0.4, 1 + arr[zIndex] * -0.045);
      arr[zIndex] += delta * 8.5 * depthBoost;
      arr[xIndex] *= 1 + delta * 0.018;
      arr[yIndex] *= 1 + delta * 0.018;
      if (arr[zIndex] > 4.5) resetStar(arr, i);
    }

    points.geometry.attributes.position.needsUpdate = true;
    points.rotation.z = Math.sin(state.clock.elapsedTime * 0.25) * 0.025;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#dffaff"
        transparent
        opacity={1}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export function FooterVoidScene() {
  return (
    <Canvas
      camera={{ position: [0, 2.2, 7], fov: 58 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.8} />
        <pointLight position={[0, 4, 4]} color="#06b6d4" intensity={1.8} />
        <pointLight position={[5, 2, 2]} color="#e11d48" intensity={1.2} />
        <WaterWavePlane />
        <StarLayer />
      </Suspense>
    </Canvas>
  );
}
