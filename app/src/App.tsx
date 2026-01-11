import { Canvas } from '@react-three/fiber'
import { Scene } from './Scene'
import { UI } from './UI'

function App() {
    return (
        <div className="relative w-full h-full bg-space-dark">
            <Canvas
                camera={{ position: [0, 2, 8], fov: 45 }}
                dpr={1}
            >
                <Scene />
            </Canvas>
            <UI />
        </div>
    )
}

export default App
