export interface IMovement {
  userIsMovingLaunchPad: boolean;
  launchPadPosition: number;
  launchPadWidth: number;
  ballInMotion: boolean;
  resetBall: () => void;
    animateBall: () => void;
    position: {
        x: number,
        y: number,
    }
}

export interface IMovementEmits {
  (event: "update", state: boolean): void;
}
