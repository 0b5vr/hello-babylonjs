import { DynamicTexture, Scene } from "babylonjs";

export function createDynamicTexture( name: string, scene: Scene ) {
  const dynamicTexture = new DynamicTexture(
    name,
    512,
    scene,
    false
  );
  dynamicTexture.drawText(
    'Grass',
    256,
    256,
    '500 48px Impact, sans-serif',
    '#fff',
    null,
    false
  );

  return dynamicTexture;
}
