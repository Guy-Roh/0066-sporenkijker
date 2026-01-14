import { Station } from "@/app/type";
import { CameraControls } from "@react-three/drei";
import { RefObject } from "react";

const cameraConfig = {
    position: {
        default: [0, 40, 0] as [number, number, number],
        mobile: [0, 140, 0] as [number, number, number],
    },
    offset: {
        default: { x: 1, y: 3, z: 8 },
        mobile: { x: .6, y: .7, z: 8 },
        selectedPlatform: { x: 0, y: .3, z: 6 },
    },
    zoomLevel: {
        default: 4,
        mobile: 3.2,
        selectedPlatform: 12,
    }
};

const getStationOffset = (station: Station | null, isMobile: boolean) => {
    if (station?.offset) {
        return station.offset;
    }
    return isMobile ? cameraConfig.offset.mobile : cameraConfig.offset.default;
};

export const MoveCameraToStation = (
    cameraControlsRef: RefObject<CameraControls | null>,
    activeStation: Station | null,
    isMobile: boolean
) => {
    if (!cameraControlsRef?.current) return;

    const type = isMobile ? 'mobile' : 'default';
    const currentOffset = getStationOffset(activeStation, isMobile);
    const currentZoom = cameraConfig.zoomLevel[type];
    const defaultPos = cameraConfig.position[type];

    if (activeStation && activeStation.position) {
        const target: [number, number, number] = [
            activeStation.position[0],
            activeStation.position[1],
            activeStation.position[2] + (isMobile ? 0.5 : 1),
        ];

        const camPos: [number, number, number] = [
            target[0] + currentOffset.x,
            target[1] + currentOffset.y,
            target[2] + currentOffset.z,
        ];

        cameraControlsRef.current.setLookAt(
            camPos[0], camPos[1], camPos[2],
            target[0], target[1], target[2],
            true
        );

        cameraControlsRef.current.zoomTo(currentZoom, true);


    } else {
        cameraControlsRef.current.setLookAt(
            defaultPos[0], defaultPos[1], defaultPos[2],
            0, 0, 0,
            true
        );
        cameraControlsRef.current.zoomTo(1, true);

    }
};

export const PanCameraToPlatform = (
    cameraControlsRef: RefObject<CameraControls | null>,
    platformPosition: [number, number, number],
    isMobile: boolean
) => {
    if (!cameraControlsRef?.current) return;

    const currentOffset = cameraConfig.offset.selectedPlatform;
    const currentZoom = cameraConfig.zoomLevel.selectedPlatform;
    const target: [number, number, number] = [
        platformPosition[0],
        platformPosition[1],
        platformPosition[2] + (isMobile ? 0.5 : 1),
    ];

    const camPos: [number, number, number] = [
        target[0] + currentOffset.x,
        target[1] + currentOffset.y,
        target[2] + currentOffset.z,
    ];

    cameraControlsRef.current.setLookAt(
        camPos[0], camPos[1], camPos[2],
        target[0], target[1], target[2],
        true
    );

    cameraControlsRef.current.zoomTo(currentZoom, true);

}

export const ResetCamera = (
    cameraControlsRef: RefObject<CameraControls | null>,
    isMobile: boolean
) => {
    if (!cameraControlsRef?.current) return;

    const type = isMobile ? 'mobile' : 'default';
    const defaultPos = cameraConfig.position[type];

    cameraControlsRef.current.setLookAt(
        defaultPos[0], defaultPos[1], defaultPos[2],
        0, 0, 0,
        true
    );
    cameraControlsRef.current.zoomTo(1, true);
}