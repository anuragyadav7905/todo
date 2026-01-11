import { Environment, PerspectiveCamera } from '@react-three/drei'
import { SpaceEnvironment } from './components/SpaceEnvironment'
import { Mug } from './components/Mug'
import { CameraRig } from './components/CameraRig'
import { Debris } from './components/Debris'

export function Scene() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={45} />

            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <spotLight
                position={[0, 10, 0]}
                intensity={2}
                angle={0.5}
                penumbra={1}
                color="#00f3ff"
            />
            <pointLight position={[-5, 0, 5]} intensity={1} color="#ff00ff" />

            {/* Components */}
            <CameraRig />
            <Debris />
            <SpaceEnvironment />

            <group position={[0, -0.5, 0]}>
                <Mug />
            </group>

            {/* HDRI for reflections */}
            <Environment preset="city" blur={0.8} background={false} />
        </>
    )
}
