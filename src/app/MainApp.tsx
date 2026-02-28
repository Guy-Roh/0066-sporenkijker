"use client";

import { Canvas } from "@react-three/fiber";
import MainScene from "@/components/Scene/MainScene";
import Loading from "@/components/UI/Loading";
import { PostProcess } from "./postprocess/PostProcess";

const WebGPUApp = () => {
    return (
        <Canvas
            shadows
            className="main-app"
            renderer={{ antialias: true }}
            fallback={<Loading />}
            background={"#202020"}
        >
            <PostProcess />
            <MainScene />
        </Canvas>

    );
}

const MainApp = () => {
    return (
        <WebGPUApp />
    )
};

export default MainApp;
