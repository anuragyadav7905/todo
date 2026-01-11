import { useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'

export function CameraRig() {
    useFrame((state: any, delta: number) => {
        // Parallax effect: Moving mouse shifts camera slightly
        // state.pointer.x/y are normalized coordinates (-1 to 1)

        // Target position calculation
        const targetX = state.pointer.x * 1 // Max shift on X
        const targetY = 2 + state.pointer.y * 0.5 // Base Y is 2, shift slightly

        // Smoothly interpolate current camera position to target
        state.camera.position.lerp(new Vector3(targetX, targetY, 8), 2 * delta)

        // Always look at center (0, 1, 0) - slightly above origin
        state.camera.lookAt(0, 1, 0)
    })

    return null
}
