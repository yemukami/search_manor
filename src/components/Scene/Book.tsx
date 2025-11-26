import { useRef, useState } from 'react';
import { Box, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { BookData } from '@/lib/store';
import * as THREE from 'three';

interface BookProps {
    data: BookData;
    position: [number, number, number];
    onClick: (book: BookData) => void;
}

export const Book = ({ data, position, onClick }: BookProps) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);

    // Smooth animation for hover
    useFrame((state, delta) => {
        if (meshRef.current) {
            const targetZ = hovered ? position[2] + 0.2 : position[2];
            meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, delta * 10);
        }
    });

    return (
        <group position={[position[0], position[1], 0]}>
            {/* We use a group to handle the base position, and animate the mesh inside for Z-offset */}
            <mesh
                ref={meshRef}
                position={[0, 0, position[2]]}
                onClick={(e) => {
                    e.stopPropagation();
                    onClick(data);
                }}
                onPointerOver={(e) => {
                    e.stopPropagation();
                    setHover(true);
                    document.body.style.cursor = 'pointer';
                }}
                onPointerOut={(e) => {
                    setHover(false);
                    document.body.style.cursor = 'auto';
                }}
                castShadow
                receiveShadow
            >
                {/* Book Geometry: Thickness, Height, Depth */}
                <boxGeometry args={[0.05, 0.25, 0.2]} />
                <meshStandardMaterial color={data.color} roughness={0.4} />

                {/* Spine Text */}
                <Text
                    position={[0, 0, 0.101]} // Slightly in front of the spine face
                    rotation={[0, 0, -Math.PI / 2]} // Rotate text to run along spine
                    fontSize={0.03}
                    maxWidth={0.2}
                    lineHeight={1}
                    color="gold"
                    anchorX="center"
                    anchorY="middle"
                >
                    {data.title.substring(0, 20)}
                </Text>
            </mesh>
        </group>
    );
};
