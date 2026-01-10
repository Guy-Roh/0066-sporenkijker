"use client";

import { MeshTransmissionMaterial } from "@react-three/drei";
import { useAppContext } from "@/app/AppContext";

const MapMesh = () => {
    const { activeStation, nodes, currentPlatform } = useAppContext();


    const getSelectedTrainKey = () => {
        if (!currentPlatform || !activeStation) return null;
        const cleanStationId = activeStation.id.replace(/\./g, "");
        const paddedPlatform = currentPlatform.number.toString().padStart(3, "0");
        return `${cleanStationId}${paddedPlatform}`;
    };

    const selectedTrainKey = getSelectedTrainKey();

    return (
        <group dispose={null}>
            {nodes &&
                Object.entries(nodes).map(([name, node]: [string, any]) => {
                    if (node.isMesh) {
                        const isGlass = node.material?.name === "Glass";
                        const isSelectedTrain = name === selectedTrainKey;

                        return (
                            <mesh 
                                key={name} 
                                geometry={node.geometry}
                                material={node.material}
                                position={node.position}
                                rotation={node.rotation}
                                castShadow 
                                receiveShadow
                            >
                                {isGlass && (
                                    <MeshTransmissionMaterial
                                        transmission={1}
                                        thickness={0.5}
                                        roughness={0.05}
                                        chromaticAberration={0.03}
                                    />
                                )}
                                {isSelectedTrain && (
                                    <meshStandardMaterial
                                        emissive="#1d82ff"
                                        emissiveIntensity={6}
                                    />
                                )}
                            </mesh>
                        );
                    }
                    return null;
                })}
        </group>
    );
};

export default MapMesh;
