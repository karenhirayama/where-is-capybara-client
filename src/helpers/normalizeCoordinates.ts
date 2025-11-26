export interface NormalizedCoordinates {
  normalizedX: number;
  normalizedY: number;
}

export const normalizeCoordinates = (clickX: number, clickY: number, screenWidth: number, screenHeight: number): NormalizedCoordinates => {
    return {
      normalizedX: clickX / screenWidth,
      normalizedY: clickY / screenHeight
    };
  }
