import { Float, Cylinder, Torus } from '@react-three/drei'
import { useRef } from 'react'
import { Group } from 'three'
import { useFrame } from '@react-three/fiber'

export function Mug() {
    const groupRef = useRef<Group>(null)

    useFrame(() => {
        if (groupRef.current) {
            // Gentle bobbing is handled by Float, but we can add subtle extra rotation
            groupRef.current.rotation.y += 0.005
        }
    })

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1} floatingRange={[-0.2, 0.2]}>
            <group ref={groupRef}>
                {/* Main Body */}
                <Cylinder args={[1, 0.8, 2, 32]} position={[0, 0, 0]}>
                    <meshStandardMaterial
                        color="#1a1a2e"
                        roughness={0.2}
                        metalness={0.8}
                        envMapIntensity={1}
                    />
                </Cylinder>

                {/* Glowing Rim (Torus at the top) */}
                <Torus args={[1, 0.05, 16, 32]} position={[0, 1, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <meshBasicMaterial color="#00f3ff" tonalMapped={false} />
                </Torus>

                {/* Glowing Base Border (Torus at the bottom) */}
                <Torus args={[0.8, 0.05, 16, 32]} position={[0, -1, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <meshBasicMaterial color="#9d00ff" tonalMapped={false} />
                </Torus>

                {/* Handle */}
                <Torus args={[0.6, 0.15, 16, 32]} position={[1.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <meshStandardMaterial color="#1a1a2e" roughness={0.2} metalness={0.8} />
                </Torus>

                {/* Liquid Surface */}
                <Cylinder args={[0.9, 0.9, 0.1, 32]} position={[0, 0.8, 0]}>
                    <meshStandardMaterial
                        color="#2a0a0a"
                        emissive="#3d1515"
                        emissiveIntensity={0.5}
                        roughness={0.3}
                        metalness={0.5}
                    />
                </Cylinder>
            </group>
        </Float>
    )
}
