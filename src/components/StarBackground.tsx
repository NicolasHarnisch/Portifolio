import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points } from "@react-three/drei/core/Points";
import { PointMaterial } from "@react-three/drei/core/PointMaterial";
import { useInView, usePageVisible } from "@/hooks/useVisible";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import * as THREE from "three";
import { useTheme } from "@/contexts/theme-provider";
interface StarsLayerProps {
  count: number;
  radius: number;
  color: string;
  size: number;
  animate: boolean;
}

function StarsLayer({ count, radius, color, size, animate }: StarsLayerProps) {
  const ref = useRef<THREE.Points>(null);
  const baseRotation = useRef({ x: 0, y: 0 });
  const pointerTilt = useRef({ x: 0, y: 0 });
  const { pointer } = useThree();

  // Gera as posições das estrelas em uma esfera 3D manualmente para evitar bugs do maath
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * radius;
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, [count, radius]);

  // Mantém a rotação contínua separada da inclinação limitada pelo ponteiro.
  useFrame((_, delta) => {
    if (ref.current && animate) {
      const elapsed = Math.min(delta, 0.05);
      baseRotation.current.x -= elapsed / 10;
      baseRotation.current.y -= elapsed / 15;

      // A interpolação por tempo produz o mesmo movimento em 60 Hz e 120 Hz.
      const response = 1 - Math.exp(-elapsed * 5);
      pointerTilt.current.x += (pointer.x * 0.08 - pointerTilt.current.x) * response;
      pointerTilt.current.y += (pointer.y * 0.08 - pointerTilt.current.y) * response;
      ref.current.rotation.x = baseRotation.current.x + pointerTilt.current.x;
      ref.current.rotation.y = baseRotation.current.y + pointerTilt.current.y;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={size}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function StarBackground({ visible = true }: { visible?: boolean }) {
  const { resolvedTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef);
  const pageVisible = usePageVisible();
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const active = visible && inView && pageVisible;
  const animate = active && !reduced;
  const isLightMode = resolvedTheme === "light";

  // Cores dinâmicas dependendo do tema
  const starColor = isLightMode ? "#7c3aed" : "#fafafa"; // Roxo escuro no light, branco no dark
  const neonColor = isLightMode ? "#5b21b6" : "#a5b4fc"; // Roxo mais profundo no light, roxo claro/neon no dark

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 w-full h-full overflow-hidden"
      aria-hidden="true"
      role="presentation"
    >
      {(
        <Canvas
          frameloop={animate ? "always" : active ? "demand" : "never"}
          fallback={null}
          camera={{ position: [0, 0, 1] }}
          gl={{
            antialias: false, // Desativado para ganhar performance, já que são só pontos
            powerPreference: "high-performance",
          }}
          dpr={[1, 2]} // Suporte para telas Retina (Mac/iPhones)
        >
          <Suspense fallback={null}>
            {/* Camada 1: Muitas estrelas finas */}
            <StarsLayer
              count={3000} // Reduzido de 4000 para performance extra
              radius={1.5}
              color={starColor}
              size={0.002}
              animate={animate}
            />
            {/* Camada 2: Estrelas de destaque */}
            <StarsLayer animate={animate} count={500} radius={1.5} color={neonColor} size={0.003} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
