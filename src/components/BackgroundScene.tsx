import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import type { InstancedMesh, Points } from "three";
import { Object3D, Color } from "three";

function FloatingCubes({ count = 60 }: { count?: number }) {
  const mesh = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const data = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 30,
        y: (Math.random() - 0.5) * 20,
        z: (Math.random() - 0.5) * 20 - 5,
        rx: Math.random() * Math.PI,
        ry: Math.random() * Math.PI,
        s: 0.15 + Math.random() * 0.45,
        speed: 0.2 + Math.random() * 0.6,
      })),
    [count]
  );

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    data.forEach((d, i) => {
      const y = d.y + Math.sin(t * d.speed + i) * 0.6;
      dummy.position.set(d.x, y, d.z);
      dummy.rotation.set(d.rx + t * 0.2, d.ry + t * 0.3, 0);
      dummy.scale.setScalar(d.s);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={new Color("#e11d48")}
        emissive={new Color("#f43f5e")}
        emissiveIntensity={0.4}
        metalness={0.8}
        roughness={0.3}
        transparent
        opacity={0.55}
      />
    </instancedMesh>
  );
}

function Starfield({ count = 800 }: { count?: number }) {
  const ref = useRef<Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 60;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 40;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 30 - 10;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#06b6d4" transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

export function BackgroundScene() {
  return (
    <Canvas camera={{ position: [0, 0, 12], fov: 60 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} color="#f43f5e" intensity={2} />
        <pointLight position={[-10, -5, 5]} color="#06b6d4" intensity={1.5} />
        <Starfield />
        <FloatingCubes />
      </Suspense>
    </Canvas>
  );
}
