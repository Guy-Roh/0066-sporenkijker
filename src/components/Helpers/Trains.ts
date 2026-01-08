import { Train, TrainData } from "@/app/type";

export const getTrainPosition = (platformNumber: string, stationId: string, meshNodes: any) => {
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

export const filterTrains = (meshNodes: any, trainsData: TrainData) => {
    const rawStationId = trainsData?.station || "";
    const trains = trainsData?.trains || [];

    const cleanStationId = rawStationId.replace(/\./g, "");

    const validTrainKeys = new Set(
        trains
            .filter((t: any) => t.platform && t.platform !== "?")
            .map((t: any) => {
                const paddedPlatform = t.platform
                    .toString()
                    .padStart(3, "0");
                return `${cleanStationId}${paddedPlatform}`;
            })
    ); // this will hold keys like "BENMBS008821006001"

    const filteredEntries = Object.entries(meshNodes).filter(
        ([name, _]: [string, any]) => {
            if (name.startsWith("BENMBS")) {
                return validTrainKeys.has(name);
            }
            return true;
        }
    ); // this keeps all non-station nodes plus only the active station platforms

    const selectedNodes = Object.fromEntries(filteredEntries);
    return selectedNodes;
}