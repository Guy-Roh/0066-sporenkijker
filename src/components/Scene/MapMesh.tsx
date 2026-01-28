"use client";

import { MeshTransmissionMaterial } from "@react-three/drei";
import { useAppContext } from "@/app/AppContext";
import { Mesh, Object3D } from "three";
import { CleanId } from "../Helpers/Trains";

const MapMesh = () => {
    const { activeStation, nodes, currentPlatform } = useAppContext();

    const getSelectedTrainKey = () => {
        if (!currentPlatform || !activeStation) return null;
        const paddedPlatform = currentPlatform.number
            .toString()
            .padStart(3, "0");
        return `${CleanId(activeStation.id)}${paddedPlatform}`;
    };

    const selectedTrainKey = getSelectedTrainKey();

    return (
        <group dispose={null}>
            {nodes &&
                Object.entries(nodes).map(
                    ([name, node]: [string, Object3D]) => {
                        if (node instanceof Mesh) {
                            const isGlass = node.material?.name === "Glass";
                            const isSelectedTrain = name === selectedTrainKey;

                            return (
                                <mesh
                                    key={name}
                                    geometry={node.geometry}
                                    material={node.material}
                                    position={node.position}
                                    rotation={node.rotation}
                                >
                                    {isGlass && (
                                        <MeshTransmissionMaterial
                                            transmission={1}
                                            thickness={0.6}
                                            roughness={0.05}
                                            chromaticAberration={0.03}
                                            ior={1.5}
                                            color={"rgba(168, 229, 255, 1)"}
                                        />
                                    )}
                                    {isSelectedTrain && (
                                        <meshStandardMaterial
                                            emissive="#1d82ff"
                                            emissiveIntensity={10}
                                        />
                                    )}
                                </mesh>
                            );
                        }
                        // for the empties that carry the location of the stations
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
