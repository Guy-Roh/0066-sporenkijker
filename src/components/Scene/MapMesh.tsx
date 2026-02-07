"use client";

import { useAppContext } from "@/app/AppContext";
import { Mesh, Object3D } from "three";
import { CleanId, formatPlatformId } from "../Helpers/Trains";

const MapMesh = () => {
    const { activeStation, nodes, currentPlatform } = useAppContext();

    const getSelectedTrainKey = () => {
        if (!currentPlatform || !activeStation) return null;
        const formattedPlatform = formatPlatformId(currentPlatform.number);
        return `${CleanId(activeStation.id)}${formattedPlatform}`;
    };

    const selectedTrainKey = getSelectedTrainKey();

    return (
        <group dispose={null}>
            {nodes &&
                Object.entries(nodes).map(
                    ([name, node]: [string, Object3D]) => {
                        if (node instanceof Mesh) {
                            const isSelectedTrain = name === selectedTrainKey;

                            return (
                                <mesh
                                    key={name}
                                    geometry={node.geometry}
                                    material={node.material}
                                    position={node.position}
                                    rotation={node.rotation}
                                >
                                    {isSelectedTrain && (
                                        <meshStandardMaterial
                                            emissive="#1d82ff"
                                            emissiveIntensity={10}
                                        />
                                    )}
                                </mesh>
                            );
                        }
                        return (
                            <group
                                key={name}
                                position={node.position}
                                rotation={node.rotation}
                            />
                        );
                    }
                )}
        </group>
    );
};

export default MapMesh;
