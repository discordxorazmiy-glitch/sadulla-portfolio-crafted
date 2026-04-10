'use client';

import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useAspect, useTexture } from '@react-three/drei';
import { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three/webgpu';
import { bloom } from 'three/examples/jsm/tsl/display/BloomNode.js';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAspect, useTexture } from '@react-three/drei';
import { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three/webgpu';
import { bloom } from 'three/examples/jsm/tsl/display/BloomNode.js';

import {
  abs,
  blendScreen,
  float,
  mod,
  mx_cell_noise_float,
  oneMinus,
  smoothstep,
  texture,
  uniform,
  uv,
  vec2,
  vec3,
  pass,
  mix,
  add
} from 'three/tsl';

const TEXTUREMAP = { src: 'https://i.postimg.cc/XYwvXN8D/img-4.png' };
const DEPTHMAP = { src: 'https://i.postimg.cc/2SHKQh2q/raw-4.webp' };

extend(THREE as any);

const PostProcessing = ({
  strength = 1,
  threshold = 1,
  fullScreenEffect = true,
}: {
  strength?: number;
  threshold?: number;
  fullScreenEffect?: boolean;
}) => {
  const { gl, scene, camera } = useThree();
  const progressRef = useRef({ value: 0 });

  const render = useMemo(() => {
    const postProcessing = new THREE.PostProcessing(gl as any);
    const scenePass = pass(scene, camera);
    const scenePassColor = scenePass.getTextureNode('output');
    const bloomPass = bloom(scenePassColor, strength, 0.5, threshold);

    const uScanProgress = uniform(0);
    progressRef.current = uScanProgress;

    const scanPos = float(uScanProgress.value);
    const uvY = uv().y;
    const scanWidth = float(0.05);
    const scanLine = smoothstep(0, scanWidth, abs(uvY.sub(scanPos)));
    const redOverlay = vec3(1, 0, 0).mul(oneMinus(scanLine)).mul(0.4);

    const withScanEffect = mix(
      scenePassColor,
      add(scenePassColor, redOverlay),
      fullScreenEffect ? smoothstep(0.9, 1.0, oneMinus(scanLine)) : 1.0
    );

    const final = withScanEffect.add(bloomPass);
    postProcessing.outputNode = final;
    return postProcessing;
  }, [camera, gl, scene, strength, threshold, fullScreenEffect]);

  useFrame(({ clock }) => {
    progressRef.current.value = Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5;
    render.renderAsync();
  }, 1);

  return null;
};

const WIDTH = 300;
const HEIGHT = 300;

const Scene = () => {
  const [rawMap, depthMap] = useTexture([TEXTUREMAP.src, DEPTHMAP.src]);
  const meshRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (rawMap && depthMap) {
      setVisible(true);
    }
  }, [rawMap, depthMap]);

  const { material, uniforms } = useMemo(() => {
    const uPointer = uniform(new THREE.Vector2(0));
    const uProgress = uniform(0);
    const strength = 0.01;

    const tDepthMap = texture(depthMap);
    const tMap = texture(rawMap, uv().add(tDepthMap.r.mul(uPointer).mul(strength)));

    const aspect = float(WIDTH).div(HEIGHT);
    const tUv = vec2(uv().x.mul(aspect), uv().y);
    const tiling = vec2(120.0);
    const tiledUv = mod(tUv.mul(tiling), 2.0).sub(1.0);
    const brightness = mx_cell_noise_float(tUv.mul(tiling).div(2));
    const dist = float(tiledUv.length());
    const dot = float(smoothstep(0.5, 0.49, dist)).mul(brightness);
    const depth = tDepthMap;
    // @ts-ignore - experimental WebGPU TSL types
    const flow = oneMinus(smoothstep(0, 0.02, abs(depth.sub(uProgress))));
    const mask = dot.mul(flow).mul(vec3(10, 0, 0));
    const final = blendScreen(tMap, mask);

    const material = new THREE.MeshBasicNodeMaterial({
      colorNode: final,
      transparent: true,
      opacity: 0,
    });

    return { material, uniforms: { uPointer, uProgress } };
  }, [rawMap, depthMap]);

  const [w, h] = useAspect(WIDTH, HEIGHT);

  useFrame(({ clock }) => {
    uniforms.uProgress.value = Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5;
    if (meshRef.current && 'material' in meshRef.current && meshRef.current.material) {
      const mat = meshRef.current.material as any;
      if ('opacity' in mat) {
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, visible ? 1 : 0, 0.07);
      }
    }
  });

  useFrame(({ pointer }) => {
    uniforms.uPointer.value = pointer;
  });

  const scaleFactor = 0.40;
  return (
    <mesh ref={meshRef} scale={[w * scaleFactor, h * scaleFactor, 1]} material={material}>
      <planeGeometry />
    </mesh>
  );
};

export const HeroFuturistic = () => {
  const { t } = useLanguage();
  const nameWords = t.hero.name.split(' ');
  const [visibleWords, setVisibleWords] = useState(0);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [delays, setDelays] = useState<number[]>([]);
  const [subtitleDelay, setSubtitleDelay] = useState(0);
  const [webGPUSupported, setWebGPUSupported] = useState<boolean | null>(null);

  useEffect(() => {
    const checkWebGPU = async () => {
      if (!navigator.gpu) {
        setWebGPUSupported(false);
        return;
      }
      const adapter = await navigator.gpu.requestAdapter();
      setWebGPUSupported(!!adapter);
    };
    checkWebGPU();
  }, []);

  useEffect(() => {
    setDelays(nameWords.map(() => Math.random() * 0.07));
    setSubtitleDelay(Math.random() * 0.1);
  }, [nameWords.length]);

  useEffect(() => {
    if (visibleWords < nameWords.length) {
      const timeout = setTimeout(() => setVisibleWords(visibleWords + 1), 600);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => setSubtitleVisible(true), 800);
      return () => clearTimeout(timeout);
    }
  }, [visibleWords, nameWords.length]);

  useEffect(() => {
    if (subtitleVisible) {
      const timeout = setTimeout(() => setButtonsVisible(true), 600);
      return () => clearTimeout(timeout);
    }
  }, [subtitleVisible]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {webGPUSupported === false && (
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/5 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      )}

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground text-lg">{t.hero.greeting}</p>

          <div className="flex flex-wrap justify-center gap-4">
            {nameWords.map((word, index) => (
              <span
                key={index}
                className="text-5xl md:text-7xl font-bold gradient-text transition-all duration-700"
                style={{
                  opacity: index < visibleWords ? 1 : 0,
                  transform: index < visibleWords ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${(delays[index] || 0)}s`,
                }}
              >
                {word}
              </span>
            ))}
          </div>

          <p
            className="text-xl md:text-2xl text-primary font-mono transition-all duration-700"
            style={{
              opacity: subtitleVisible ? 0.9 : 0,
              transform: subtitleVisible ? 'translateY(0)' : 'translateY(10px)',
              transitionDelay: `${subtitleDelay}s`,
            }}
          >
            &lt; {t.hero.role} /&gt;
          </p>

          <p
            className="text-muted-foreground max-w-lg mx-auto leading-relaxed transition-all duration-700"
            style={{
              opacity: subtitleVisible ? 1 : 0,
              transform: subtitleVisible ? 'translateY(0)' : 'translateY(10px)',
            }}
          >
            {t.hero.description}
          </p>

          <div
            className="flex flex-wrap justify-center gap-4 pt-4 pointer-events-auto transition-all duration-700"
            style={{
              opacity: buttonsVisible ? 1 : 0,
              transform: buttonsVisible ? 'translateY(0)' : 'translateY(10px)',
            }}
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 hover:scale-105"
              style={{ background: 'var(--gradient-primary)', color: 'hsl(var(--primary-foreground))' }}
            >
              {t.hero.viewProjects}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm border border-border text-foreground hover:border-primary/50 transition-all duration-300 hover:scale-105"
            >
              {t.hero.contactMe}
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted-foreground text-sm">
        Scroll to explore
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="animate-bounce">
          <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {webGPUSupported && (
        <Canvas
          className="absolute inset-0"
          // @ts-ignore - WebGPU renderer async init
          gl={async (props: any) => {
            const renderer = new THREE.WebGPURenderer(props as any);
            await renderer.init();
            return renderer;
          }}
        >
          <Scene />
          <PostProcessing />
        </Canvas>
      )}
    </div>
  );
};

export default HeroFuturistic;
