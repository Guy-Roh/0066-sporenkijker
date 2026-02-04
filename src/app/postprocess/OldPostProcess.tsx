"use client";

import { useEffect, useMemo, forwardRef, useImperativeHandle } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { PostProcessing, WebGPURenderer } from "three/webgpu";
import { pass, uniform } from "three/tsl"; // Added 'uniform'
import { dof } from 'three/addons/tsl/display/DepthOfFieldNode.js';

// Define what methods the parent can call on this component
export interface PostProcessHandle {
    setFocusDistance: (value: number) => void;
}

interface PostProcessProps {
    // We can keep these as initial/default values
    initialFocusDistance?: number;
    focalLength?: number;
    bokehScale?: number;
}

// Wrap in forwardRef to expose the handle
// eslint-disable-next-line react/display-name
export const PostProcess = forwardRef<PostProcessHandle, PostProcessProps>(
    ({ initialFocusDistance = 20, focalLength = 1, bokehScale = 8 }, ref) => {
        const { gl, scene, camera } = useThree();

        // 1. Create TSL Uniforms
        // These are "live" variables the GPU can read.
        // We use useMemo to ensure the specific uniform objects don't change identity.
        const focusDistUniform = useMemo(() => uniform(initialFocusDistance), []);
        const focalLengthUniform = useMemo(() => uniform(focalLength), []);
        const bokehScaleUniform = useMemo(() => uniform(bokehScale), []);

        const postProcessing = useMemo(() => {
            return new PostProcessing(gl as unknown as WebGPURenderer);
        }, [gl]);

        // 2. Expose the setter to the parent via Ref
        useImperativeHandle(ref, () => ({
            setFocusDistance: (value: number) => {
                // Directly update the uniform value. No React render needed.
                focusDistUniform.value = value;
            }
        }));

        useEffect(() => {
            const scenePass = pass(scene, camera);
            const sceneColor = scenePass.getTextureNode();
            const sceneViewZ = scenePass.getViewZNode();

            // 3. Pass the Uniforms (not numbers) to the DOF node
            const dofNode = dof(
                sceneColor,
                sceneViewZ,
                focusDistUniform, // dynamic node
                focalLengthUniform,
                bokehScaleUniform
            );

            postProcessing.outputNode = dofNode;
        }, [gl, scene, camera, postProcessing, focusDistUniform, focalLengthUniform, bokehScaleUniform]);

        useFrame(() => {
            postProcessing.render();
        }, 1);

        return null;
    }
);

