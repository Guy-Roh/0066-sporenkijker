import { Station } from "@/app/type";
import { CameraControls } from "@react-three/drei";
import { RefObject } from "react";
import { Vector3Tuple } from "three";

export const cameraConfig = {
    position: {
        default: [16, 80, 50],
        mobile: [36, 160, 90],
    },
    offset: {
        default: [1, 3, 8],
        mobile: [0.6, 0.7, 8],
        selectedPlatform: [0, 0.3, 6],
    },
    zoomLevel: {
        default: 4,
        mobile: 3.2,
        selectedPlatform: 8,
    }
};

const getStationOffset = (station: Station | null, isMobile: boolean) => {
    if (station?.offset) {
        return isMobile ? station.offset.mobile : station.offset.desktop;
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
    console.log("Using offset:", currentOffset);
    console.log("Active station:", activeStation);
    if (activeStation && activeStation.position) {
        const target: Vector3Tuple = [
            activeStation.position[0],
            activeStation.position[1],
            activeStation.position[2] + (isMobile ? 0.5 : 1),
        ];

        const camPos: Vector3Tuple = [
            target[0] + currentOffset[0],
            target[1] + currentOffset[1],
            target[2] + currentOffset[2],
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
    platformPosition: Vector3Tuple,
    activeStation: Station | null,
) => {
    if (!cameraControlsRef?.current) return;

    const currentOffset = activeStation?.offset?.selectedPlatform || cameraConfig.offset.selectedPlatform;

    const currentZoom = cameraConfig.zoomLevel.selectedPlatform;
    const target: Vector3Tuple = [
        platformPosition[0],
        platformPosition[1],
        platformPosition[2],
    ];

    const camPos: Vector3Tuple = [
        target[0] + currentOffset[0],
        target[1] + currentOffset[1],
        target[2] + currentOffset[2],
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
    isMobile: boolean,
    initialRender: boolean = true
) => {
    if (!cameraControlsRef?.current) return;
    const animation = !initialRender;

    const type = isMobile ? 'mobile' : 'default';
    const defaultPos = cameraConfig.position[type];

    cameraControlsRef.current.setLookAt(
        defaultPos[0], defaultPos[1], defaultPos[2],
        0, 0, 0,
        animation
    );
    cameraControlsRef.current.zoomTo(1, animation);
    cameraControlsRef.current.truck(0, 30, true);
}