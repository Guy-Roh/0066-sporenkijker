"use client";

import { Canvas } from "@react-three/fiber";
import MainScene from "@/components/Scene/MainScene";
import WebGPU from "three/addons/capabilities/WebGPU.js";
import { Effects } from "@react-three/drei";

const FallBack = () => <div>Loading...</div>;

const WebGLApp = () => {
    return (
        <Canvas
            className="main-app"
            fallback={<FallBack />}
<<<<<<< HEAD
            shadows={{ type: THREE.PCFSoftShadowMap }}
            dpr={[1, 1]}
            gl={{ antialias: true }}
=======
            shadows
            gl={{antialias: true}}
            dpr={[1,1]}
            
>>>>>>> 895249b (update: baked textures)
        >
            <MainScene />
        </Canvas>

    );
};

const WebGPUApp = () => {
    const glPass = async (props: any) => {
        const renderer = new THREE.WebGPURenderer(props);
        await renderer.init();
        return renderer;
    }

    return (
            <Canvas
                shadows
                id="main-scene-canvas"
                gl={glPass}
                camera={{ position: [0, 10, 15], fov: 50 }}
            >
                <Effects DepthOfField={{ focusDistance: 4, focalLength: 1, bokehScale: 8 }} />
                <MainScene />
            </Canvas>
    );
}

const MainApp = () => {
    if (WebGPU.isAvailable()) {
        return <WebGPUApp />;
    } else {
        return <WebGLApp />;
    }
};

export default MainApp;
