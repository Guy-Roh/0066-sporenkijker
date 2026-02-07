import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three/webgpu";
import { pass } from "three/tsl";
import { bloom } from "three/examples/jsm/tsl/display/BloomNode.js";
import { useMemo } from "react";

export const PostProcess = () => {
  const { renderer, scene, camera } = useThree();

  const postProcessing = useMemo(() => {
    const post = new THREE.PostProcessing(renderer as unknown as THREE.WebGPURenderer);
    
    const scenePass = pass(scene, camera);
    
    //bloom effect, the numbers are strength, radius, threshold
    const bloomPass = bloom(scenePass, 0.7, 0.8, 0.9);

    post.outputNode = scenePass.add(bloomPass);
    return post;
  }, [renderer, scene, camera]);

  useFrame(() => {
    postProcessing.render();
  }, { phase: "render" });

  return null;
};