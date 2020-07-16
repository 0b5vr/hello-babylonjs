import { Engine, Vector3, Scene, GPUParticleSystem, ArcRotateCamera, Texture, SphereParticleEmitter, NoiseProceduralTexture, Color4, ParticleSystem, DefaultRenderingPipeline, Mesh, StandardMaterial, HemisphericLight } from 'babylonjs';
import normalPerlinPng from './normal-perlin.png';
import catPng from './cat.png';
import jazzJpg from './jazz.jpg';

// == canvas and engine ============================================================================
const canvas = document.getElementById( 'canvas' ) as HTMLCanvasElement;
const engine = new Engine( canvas );

// == scene ========================================================================================
const scene = new Scene( engine );
scene.clearColor = new Color4( 0.0, 0.0, 0.0, 1.0 );

// == camera =======================================================================================
const camera = new ArcRotateCamera(
  'camera',
  1,
  0.8,
  5,
  new Vector3( 0, 0, 0 ),
  scene
);
camera.attachControl( canvas, true );
camera.wheelPrecision = 100;

// == particles ====================================================================================
const textureCat = new Texture( catPng, scene );

const noiseTexture = new NoiseProceduralTexture( 'perlin', 256, scene );
noiseTexture.animationSpeedFactor = 5;
noiseTexture.persistence = 2;
noiseTexture.brightness = 0.125;
noiseTexture.octaves = 6;

const particleSystem = new GPUParticleSystem(
  'particles',
  { capacity: 10000 },
  scene
);
particleSystem.emitRate = 1000;
particleSystem.particleEmitterType = new SphereParticleEmitter( 10 );
particleSystem.noiseTexture = noiseTexture;
particleSystem.noiseStrength = new Vector3( 10.0, 10.0, 10.0 );
particleSystem.particleTexture = textureCat;
particleSystem.color1 = new Color4( 1.0, 1.0, 1.0, 1.0 );
particleSystem.color2 = new Color4( 1.0, 1.0, 1.0, 1.0 );
particleSystem.colorDead = new Color4( 0.0, 0.0, 0.0, 0.0 );
particleSystem.minSize = 0.01;
particleSystem.maxSize = 1.0;
particleSystem.blendMode = ParticleSystem.BLENDMODE_ADD;
particleSystem.maxLifeTime = 1.0;

particleSystem.start();

// == ball =========================================================================================
const textureJazz = new Texture( jazzJpg, scene );

const textureNormal = new Texture( normalPerlinPng, scene );
textureNormal.level = 0.2;

const materialSphere = new StandardMaterial( 'materialSphere', scene );
materialSphere.diffuseTexture = textureJazz;
materialSphere.bumpTexture = textureNormal;

const sphere = Mesh.CreateSphere( 'sphere', 16, 4, scene );
sphere.material = materialSphere;

// == light ========================================================================================
const light = new HemisphericLight(
  'light1',
  new Vector3( 0, 1, 0 ),
  scene
);
light.intensity = 2.0;

// == pipeline =====================================================================================
const pipeline = new DefaultRenderingPipeline(
  'defaultPipeline',
  true,
  scene,
  [ camera ]
);
pipeline.samples = 4;
pipeline.fxaaEnabled = true;
pipeline.bloomEnabled = true;
pipeline.bloomThreshold = 1.0;
pipeline.bloomWeight = 2.0;

// == animate ======================================================================================
engine.runRenderLoop( () => {
  scene.render();
} );

// == resize =======================================================================================
window.addEventListener( 'resize', () => {
  engine.resize();
} );

// scene.debugLayer.show( { overlay: true } );
