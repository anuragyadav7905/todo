import { Stars, Float, Sparkles } from '@react-three/drei'
import { useRef } from 'react'
import { Group } from 'three'
import { useFrame } from '@react-three/fiber'

export function SpaceEnvironment() {
    const starsRef = useRef<Group>(null)

    useFrame((state: any) => {
        if (starsRef.current) {
            starsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02
            starsRef.current.rotation.x = state.clock.getElapsedTime() * 0.01
        }
    })

    return (
        <>
            <color attach="background" args={['#050510']} />

            {/* Dynamic Starfield */}
            <group ref={starsRef}>
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            </group>

            {/* Sci-fi Particles/Dust */}
            <Sparkles
                count={200}
                scale={12}
                size={2}
                speed={0.4}
                opacity={0.5}
                color="#00f3ff"
            />

            <Sparkles
                count={100}
                scale={10}
                size={3}
                speed={0.2}
                opacity={0.3}
                color="#9d00ff"
            />

            {/* Distant Planet (Decorative) */}
            <Float speed={1} rotationIntegrity={1} floatIntensity={0.5}>
                <mesh position={[-15, 5, -20]}>
                    <sphereGeometry args={[4, 32, 32]} />
                    <meshStandardMaterial
                        color="#2a2a5a"
                        emissive="#1a1a3a"
                        emissiveIntensity={0.2}
                        roughness={0.8}
                    />
                </mesh>
            </Float>

            {/* Fog for depth */}
            <fog attach="fog" args={['#050510', 10, 40]} />
        </>
    )
}
