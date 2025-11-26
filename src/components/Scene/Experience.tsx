import { OrbitControls, Environment } from '@react-three/drei';
import { Desk } from './Desk';
import { Bookshelf } from './Bookshelf';

export const Experience = () => {
    return (
        <>
            {/* Lights */}
            <ambientLight intensity={0.5} color="#b9d5ff" />
            <directionalLight
                position={[5, 5, 5]}
                intensity={1}
                castShadow
                shadow-mapSize={[1024, 1024]}
            />
            <pointLight position={[-2, 3, 2]} intensity={0.5} color="#ff9000" />

            {/* Environment for reflections */}
            <Environment preset="city" />

            {/* Controls - restricted for "fixed view" feel but allowing some debug movement for now */}
            <OrbitControls
                makeDefault
                enablePan={false}
                minPolarAngle={Math.PI / 6} // Allow looking up more (was PI/4)
                maxPolarAngle={Math.PI / 1.8} // Allow looking down a bit more
                minAzimuthAngle={-Math.PI / 3}
                maxAzimuthAngle={Math.PI / 3}
            />

            {/* Scene Objects */}
            <group position={[0, -1, 0]}>
                <Desk />
                <Bookshelf />
            </group>
        </>
    );
};
