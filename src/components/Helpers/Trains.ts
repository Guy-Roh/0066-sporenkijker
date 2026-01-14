import { NodesMap, Train, TrainData } from "@/app/type";
import { Object3D } from "three";
import stationData from "@/data/stationData.json";

export const CleanId = (stationId: string) => {
    return stationId.replace(/\./g, "");
}

export const getTrainPosition = (platformNumber: string, stationId: string, meshNodes: Record<string, Object3D>) => {
    const paddedPlatform = platformNumber.toString().padStart(3, "0");
    const trainKey = `${CleanId(stationId)}${paddedPlatform}`;

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

// This function filters the mesh nodes to include only the stations and the platforms relevant to the trains at the specified station
export const filterTrains = (meshNodes: NodesMap, trainsData: TrainData) => {
    const rawStationId = trainsData?.station || "";
    const trains = trainsData?.trains || [];

    const validTrainKeys = new Set(
        trains
            .filter((t: Train) => t.platform && t.platform !== "?")
            .map((t: Train) => {
                const paddedPlatform = t.platform
                    .toString()
                    .padStart(3, "0");
                return `${CleanId(rawStationId)}${paddedPlatform}`;
            })
    ); 
    // this will hold keys like "BENMBS008821121002"

    const validStationIds = new Set(stationData.allStations.map(s => CleanId(s.id)));

    const selectedNodes: NodesMap = {};
    
    console.log("Valid train keys:", Array.from(validTrainKeys));
    
    for (const [name, node] of Object.entries(meshNodes)) {
        if (validStationIds.has(name)) {
            // This is a station node
            selectedNodes[name] = node;
        } else if (validTrainKeys.has(name)) {
            // This is a platform with an active train
            selectedNodes[name] = node;
        } else if (!name.startsWith("BE")) {
            // Keep all non-station/platform nodes
            selectedNodes[name] = node;
        } 
    }

    
    return selectedNodes;
}