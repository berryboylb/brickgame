export interface IMovement {
  userIsMovingLaunchPad: boolean;
  launchPadPosition: number;
  launchPadWidth: number;
  ballInMotion: boolean;
  resetBall: () => void;
  animateBall: () => void;
  position: {
    x: number;
    y: number;
  };
}

export interface IMovementEmits {
  (event: "update", state: boolean): void;
  (event: "updatePosition", position: number): void;
}

export interface ILives {
  lives: number;
  currentLife: number;
}

export interface IPaused {
  currentLife: number;
  animateBall: () => void;
}

