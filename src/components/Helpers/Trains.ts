import { NodesMap, Train, TrainData } from "@/app/type";
import { Object3D } from "three";
import stationData from "@/data/stationData.json";

export const CleanId = (stationId: string) => {
    return stationId.replace(/\./g, "");
}

export const formatPlatformId = (platformNumber: string) => {
    let formattedPlatform = platformNumber.trim();
    // If platform is a letter (A, B, C, D, etc.), don't pad with zeros
    if (!isNaN(Number(formattedPlatform))) {
        formattedPlatform = formattedPlatform.toString().padStart(3, "0");
    }

    return formattedPlatform;

}

export const getTrainPosition = (platformNumber: string, stationId: string, meshNodes: Record<string, Object3D>) => {
    const formattedPlatform = formatPlatformId(platformNumber);
    const trainKey = `${CleanId(stationId)}${formattedPlatform}`;
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

// This function filters the mesh nodes to include only the stations and the trains selected
export const filterTrains = (meshNodes: NodesMap, trainsData: TrainData) => {
    const rawStationId = trainsData?.station || "";
    const trains = trainsData?.trains || [];

    const validTrainKeys = new Set(
        trains
            .filter((t: Train) => t.platform && t.platform !== "?")
            .map((t: Train) => {
                const formattedPlatform = formatPlatformId(t.platform);
                return `${CleanId(rawStationId)}${formattedPlatform}`;
            })
    ); 

    // this will hold keys like "BENMBS008821121002" which are platform nodes, which is the station id + platform number
    const validStationIds = new Set(stationData.allStations.map(s => CleanId(s.id)));

    const selectedNodes: NodesMap = {};
        
    for (const [name, node] of Object.entries(meshNodes)) {
        if (validStationIds.has(name)) {
            // This is a station node
            selectedNodes[name] = node;
        } else if (validTrainKeys.has(name)) {
            // These are the selected train/platform nodes 
            selectedNodes[name] = node;
        } else if (!name.startsWith("BE")) {
            // This is the rest of the map nodes (not train or station)
            selectedNodes[name] = node;
        } 
    }

    
    return selectedNodes;
}