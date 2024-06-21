import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BehaviorSubject } from 'rxjs';
import { pipeline, env, RawImage } from '@xenova/transformers';

@Injectable({
  providedIn: 'root',
})
export class DepthEstimationService {
  private statusSubject = new BehaviorSubject<string>('');
  status$ = this.statusSubject.asObservable();
  private isProcessingSubject = new BehaviorSubject<boolean>(false);
  isProcessing$ = this.isProcessingSubject.asObservable();

  camera!: THREE.PerspectiveCamera;
  controls!: OrbitControls;
  animationId: number | null = null;

  onDisplacementScaleChange!: (value: number) => void;
  onAnimationLengthChange!: (value: number) => void;

  private motionAmount = 40;
  private animationLength = 3;
  private focusPoint = 50;
  private edgeDilation = 0;

  private imageDimensionsSource = new BehaviorSubject<{ width: number, height: number }>({ width: 0, height: 0 });
  imageDimensions$ = this.imageDimensionsSource.asObservable();

  constructor() {
    env.allowLocalModels = false;
    env.backends.onnx.wasm.proxy = true;
    this.onAnimationLengthChange = this.setAnimationLength.bind(this);
  }

  async predictFromUrl(url: string) {
    this.displayImage(url);
    this.setStatus('Loading model...');
    const depthEstimator = await pipeline(
      'depth-estimation',
      'Xenova/depth-anything-small-hf'
    );
    this.setStatus('Ready');
    
    this.setProcessing(true);

    const image = await RawImage.fromURL(url);
    await this.setupScene(
      url,
      image.width,
      image.height,
      depthEstimator,
      image
    );
  }

  predictFromFile(file: File) {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const url = e.target!.result as string;
      await this.predictFromUrl(url);
    };
    reader.readAsDataURL(file);
  }

  updateImageDimensions(dimensions: { width: number, height: number }): void {
    this.imageDimensionsSource.next(dimensions);
  }

  private setStatus(status: string) {
    this.statusSubject.next(status);
  }

  private setProcessing(isProcessing: boolean) {
    this.isProcessingSubject.next(isProcessing);
  }

  private displayImage(url: string) {
    const container = document.getElementById('container');
    if (!container) return;

    container.innerHTML = '';
    const img = document.createElement('img');
    img.src = url;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'contain';

    container.appendChild(img);
  }

  private async setupScene(
    url: string,
    w: number,
    h: number,
    depthEstimator: any,
    image: any
  ) {
    const container = document.getElementById('container');
    if (!container) return;

    container.innerHTML = '';

    const canvas = document.createElement('canvas');
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    const scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(30, width / height, 0.01, 10);
    this.camera.position.z = 2;
    scene.add(this.camera);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    const light = new THREE.AmbientLight(0xffffff, 3);
    scene.add(light);

    const texture = new THREE.TextureLoader().load(url);
    texture.colorSpace = THREE.SRGBColorSpace;
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    material.displacementScale = 0.75;

    const setDisplacementMap = (canvas: HTMLCanvasElement) => {
      material.displacementMap = new THREE.CanvasTexture(canvas);
      material.needsUpdate = true;
    };

    const setDisplacementScale = (scale: number) => {
      material.displacementScale = scale;
      material.needsUpdate = true;
    };
    this.onDisplacementScaleChange = setDisplacementScale;

    const [pw, ph] = w > h ? [1, h / w] : [w / h, 1];
    const geometry = new THREE.PlaneGeometry(pw, ph, w, h);
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    this.controls = new OrbitControls(this.camera, renderer.domElement);
    this.controls.enableDamping = true;

    renderer.setAnimationLoop(() => {
      renderer.render(scene, this.camera);
      this.controls.update();
    });

    window.addEventListener(
      'resize',
      () => {
        const width = container.offsetWidth;
        const height = container.offsetHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      },
      false
    );

    this.setStatus('Analysing...');
    const { depth } = await depthEstimator(image);
    setDisplacementMap(depth.toCanvas());
    this.setStatus('');

    container.appendChild(renderer.domElement);
  }

  startCameraMovement(preset: string) {
    this.stopCurrentAnimation();
    switch (preset) {
      case 'upDown':
        this.animateCamera(this.upDownMotion);
        break;
      case 'leftRight':
        this.animateCamera(this.leftRightMotion);
        break;
      case 'circular':
        this.animateCamera(this.circularMotion);
        break;
      case 'dolly':
        this.animateCamera(this.dollyMotion);
        break;
      default:
        console.warn('Unknown preset:', preset);
    }
  }

  stopCurrentAnimation() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  animateCamera(motionFunction: (progress: number) => void) {
    let start: number | null = null;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = (timestamp - start) / (1000 * Math.log10(this.animationLength + 1));
      motionFunction(progress);
      this.animationId = requestAnimationFrame(step);
    };
    this.animationId = requestAnimationFrame(step);
  }

  upDownMotion = (progress: number) => {
    const speed = 0.1;
    this.camera.position.y = Math.sin(progress * speed) * 0.5;
    this.camera.updateProjectionMatrix();
    this.controls.update();
  };

  leftRightMotion = (progress: number) => {
    const speed = 0.1;
    this.camera.position.x = Math.sin(progress * speed) * 0.5;
    this.camera.updateProjectionMatrix();
    this.controls.update();
  };

  circularMotion = (progress: number) => {
    const speed = 0.1;
    this.camera.position.x = Math.sin(progress * speed) * 0.5;
    this.camera.position.z = Math.cos(progress * speed) * 0.5;
    this.camera.updateProjectionMatrix();
    this.controls.update();
  };

  dollyMotion = (progress: number) => {
    const speed = 0.1;
    this.camera.position.z = Math.sin(progress * speed) * 0.5 + 2;
    this.camera.updateProjectionMatrix();
    this.controls.update();
  };

  setMotionAmount(value: number) {
    this.motionAmount = value;
    // Add logic
  }

  setAnimationLength(value: number) {
    this.animationLength = value;
    // Additional logic can be added here if necessary
  }

  setFocusPoint(value: number) {
    this.focusPoint = value;
    // Add logic
  }

  setEdgeDilation(value: number) {
    this.edgeDilation = value;
    // Add logic
  }
}
