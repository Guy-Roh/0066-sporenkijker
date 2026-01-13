import { Train, TrainData } from "@/app/type";
import { Object3D } from "three";

export const getTrainPosition = (platformNumber: string, stationId: string, meshNodes: Record<string, Object3D>) => {
    const cleanStationId = stationId.replace(/\./g, "");
    const paddedPlatform = platformNumber.toString().padStart(3, "0");
    const trainKey = `${cleanStationId}${paddedPlatform}`;

    const trainNode = meshNodes[trainKey];
    if (trainNode) {
        return [
            trainNode.position.x,
            trainNode.position.y,
            trainNode.position.z,
        ];
    } else {
        return undefined;
    }
}

export const filterTrains = (meshNodes: Record<string, Object3D>, trainsData: TrainData) => {
    const rawStationId = trainsData?.station || "";
    const trains = trainsData?.trains || [];

    const cleanStationId = rawStationId.replace(/\./g, "");

    const validTrainKeys = new Set(
        trains
            .filter((t: Train) => t.platform && t.platform !== "?")
            .map((t: Train) => {
                const paddedPlatform = t.platform
                    .toString()
                    .padStart(3, "0");
                return `${cleanStationId}${paddedPlatform}`;
            })
    ); // this will hold keys like "BENMBS008821006001"

    const selectedNodes: Record<string, Object3D> = {};
    console.log("The selected nodes are", selectedNodes);
    
    for (const [name, node] of Object.entries(meshNodes)) {
        if (name.startsWith("BENMBS")) {
            if (validTrainKeys.has(name)) {
                selectedNodes[name] = node;
            }
        } else {
            selectedNodes[name] = node;
        }
    }
    
    return selectedNodes;
}