import { Box } from '@react-three/drei';

export const Desk = () => {
    return (
        <group position={[0, 0, 2]}>
            {/* Desk Top */}
            <Box args={[4, 0.1, 2]} position={[0, 1, 0]} receiveShadow castShadow>
                <meshStandardMaterial color="#3d2817" roughness={0.6} />
            </Box>

            {/* Legs */}
            <Box args={[0.1, 1, 0.1]} position={[-1.8, 0.5, 0.8]} receiveShadow castShadow>
                <meshStandardMaterial color="#2a1b0e" />
            </Box>
            <Box args={[0.1, 1, 0.1]} position={[1.8, 0.5, 0.8]} receiveShadow castShadow>
                <meshStandardMaterial color="#2a1b0e" />
            </Box>
            <Box args={[0.1, 1, 0.1]} position={[-1.8, 0.5, -0.8]} receiveShadow castShadow>
                <meshStandardMaterial color="#2a1b0e" />
            </Box>
            <Box args={[0.1, 1, 0.1]} position={[1.8, 0.5, -0.8]} receiveShadow castShadow>
                <meshStandardMaterial color="#2a1b0e" />
            </Box>
        </group>
    );
};
