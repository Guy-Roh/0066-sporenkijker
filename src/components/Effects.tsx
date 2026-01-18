import { useEffect, useMemo } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { PostProcessing, WebGPURenderer } from "three/webgpu";
import { pass } from "three/tsl";
import { dof } from 'three/addons/tsl/display/DepthOfFieldNode.js';

interface EffectsProps {
    DepthOfField: {
        focusDistance: number;
        focalLength: number;
        bokehScale: number;
    }
}

export const Effects = ({DepthOfField}: EffectsProps) => {
  const { gl, scene, camera } = useThree();

  const postProcessing = useMemo(() => {
     // specific cast to WebGPURenderer to satisfy TS if needed
     return new PostProcessing(gl as unknown as WebGPURenderer);
  }, [gl]);

  useEffect(() => {
    const scenePass = pass(scene, camera);
    const sceneColor = scenePass.getTextureNode();
    const sceneViewZ = scenePass.getViewZNode();

    // Adjust these numbers to change focus
    // focusDistance, focalLength, bokehScale
    const dofNode = dof(sceneColor, sceneViewZ, DepthOfField.focusDistance, DepthOfField.focalLength, DepthOfField.bokehScale);

    postProcessing.outputNode = dofNode;
  }, [gl, scene, camera, postProcessing]);

  useFrame(() => {
    postProcessing.render();
  }, 1);

  return null;
};