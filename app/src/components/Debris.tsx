import { Float } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'

function SingleDebris({ position, color, geometry }: { position: [number, number, number], color: string, geometry: THREE.BufferGeometry }) {
    return (
        <Float
            speed={1 + Math.random()}
            rotationIntensity={1 + Math.random() * 2}
            floatIntensity={1 + Math.random()}
        >
            <mesh position={position} geometry={geometry}>
                <meshStandardMaterial color={color} roughness={0.4} metalness={0.6} />
            </mesh>
        </Float>
    )
}

export function Debris() {
    const count = 20
    const debrisData = useMemo(() => {
        const items = []
        const geometries = [
            new THREE.TetrahedronGeometry(0.2),
            new THREE.BoxGeometry(0.15, 0.15, 0.15),
            new THREE.OctahedronGeometry(0.15)
        ]
        const colors = ['#00f3ff', '#9d00ff', '#ff00ff', '#ffffff']

        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 15 // Wide spread
            const y = (Math.random() - 0.5) * 10
            const z = (Math.random() - 0.5) * 10 - 2 // Mostly behind or around

            items.push({
                position: [x, y, z] as [number, number, number],
                geometry: geometries[Math.floor(Math.random() * geometries.length)],
                color: colors[Math.floor(Math.random() * colors.length)]
            })
        }
        return items
    }, [])

    return (
        <group>
            {debrisData.map((data, i) => (
                <SingleDebris key={i} {...data} />
            ))}
        </group>
    )
}
