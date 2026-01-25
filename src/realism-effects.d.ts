declare module 'realism-effects' {
  export class SSGIEffect {
    constructor(scene: any, camera: any, velocityDepthNormalPass: any, options?: any);
  }
  export class VelocityDepthNormalPass {
    constructor(scene: any, camera: any);
  }
  export class TRAAEffect {
    constructor(scene: any, camera: any, velocityDepthNormalPass: any);
  }
  export class MotionBlurEffect {
    constructor(velocityDepthNormalPass: any);
  }
}