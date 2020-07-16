import { Engine, FreeCamera, Vector3, Scene, HemisphericLight, Mesh } from 'babylonjs';

// == canvas and engine ============================================================================
const canvas = document.getElementById( 'canvas' ) as HTMLCanvasElement;
const engine = new Engine( canvas );

// == scene ========================================================================================
const scene = new Scene( engine );

// == camera =======================================================================================
const camera = new FreeCamera(
  'camera1',
  new Vector3( 0, 5, -10 ),
  scene
);
camera.setTarget( Vector3.Zero() );
camera.attachControl( canvas, true );

// == light ========================================================================================
const light = new HemisphericLight(
  'light1',
  new Vector3( 0, 1, 0 ),
  scene
);
light.intensity = 0.7;

// == objects ======================================================================================
const sphere = Mesh.CreateSphere(
  'sphere1',
  16,
  2,
  scene
);
sphere.position.y = 1;

const ground = Mesh.CreateGround(
  'ground1',
  6,
  6,
  2,
  scene
);

// == animate ======================================================================================
engine.runRenderLoop( () => {
  scene.render();
} );

// == resize =======================================================================================
window.addEventListener( 'resize', () => {
  engine.resize();
} );
