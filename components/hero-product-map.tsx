"use client";

import { animate, createScope, type Scope } from "animejs";
import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import * as THREE from "three";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const PORTRAIT_SRC = "/portraits/point-cloud-source.jpeg";
const DEPTH_IMAGE_SRC = "/portraits/depth-anything-3-image.webp";

type SpatialMode = "original" | "three" | "depth";

function easePointer(value: number) {
  return Math.max(-1, Math.min(1, value));
}

export function HeroProductMap() {
  const root = useRef<HTMLDivElement>(null);
  const mount = useRef<HTMLDivElement>(null);
  const scope = useRef<Scope | null>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const manualRotation = useRef({ x: -0.05, y: 0.18 });
  const [mode, setMode] = useState<SpatialMode>("original");
  const modeRef = useRef<SpatialMode>("original");
  const [isLocked, setIsLocked] = useState(false);
  const scrollPercent = useRef(0);
  const layers = useRef<{
    scene?: THREE.Object3D;
    color?: THREE.Points;
  }>({});
  const resetCameraRef = useRef<() => void>(undefined);

  const applyMode = (nextMode: SpatialMode) => {
    modeRef.current = nextMode;
    if (layers.current.scene) {
      layers.current.scene.visible = nextMode === "three";
    }
    if (layers.current.color) {
      layers.current.color.visible = nextMode === "three";
      const material = layers.current.color.material as THREE.PointsMaterial;
      material.opacity = 0.96;
    }
  };

  useEffect(() => {
    applyMode(mode);
  }, [mode]);

  useEffect(() => {
    const container = mount.current;
    if (!container) return;

    let disposed = false;
    let frameId = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.z = 145;

    resetCameraRef.current = () => {
      manualRotation.current = { x: -0.05, y: 0.18 };
      camera.position.z = 145;
    };

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const makeDotTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const context = canvas.getContext("2d");
      if (!context) return null;

      const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 31);
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(0.36, "rgba(255,255,255,0.94)");
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, 64, 64);

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    };

    const makeFallback = () => {
      const points = 1800;
      const positions = new Float32Array(points * 3);
      const colors = new Float32Array(points * 3);

      for (let i = 0; i < points; i += 1) {
        const angle = i * 0.18;
        const radius = 8 + Math.sqrt(i) * 1.2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius * 0.9;
        const z = Math.sin(i * 0.07) * 12;
        positions.set([x, y, z], i * 3);
        colors.set([0.55, 0.78, 1], i * 3);
      }

      return { positions, colors };
    };

    const buildPointCloud = async () => {
      const response = await fetch("/portraits/pointcloud.bin");
      if (!response.ok) throw new Error("Failed to load pointcloud.bin");
      const buffer = await response.arrayBuffer();
      const dataView = new DataView(buffer);
      const numPoints = dataView.getUint32(0, true);

      const positions = new Float32Array(numPoints * 3);
      const colors = new Float32Array(numPoints * 3);

      let offset = 4;
      for (let i = 0; i < numPoints; i++) {
        const x = dataView.getFloat32(offset, true);
        const y = dataView.getFloat32(offset + 4, true);
        const z = dataView.getFloat32(offset + 8, true);

        const r = dataView.getUint8(offset + 12);
        const g = dataView.getUint8(offset + 13);
        const b = dataView.getUint8(offset + 14);

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        colors[i * 3] = r / 255;
        colors[i * 3 + 1] = g / 255;
        colors[i * 3 + 2] = b / 255;

        offset += 15;
      }

      return { positions, colors };
    };

    const makePoints = (
      positions: Float32Array,
      colors: Float32Array,
      opacity: number,
      size: number
    ) => {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      // NOTE: geometry.center() is removed here so that the rotation pivots
      // on the custom centroid centered on the person computed in python.

      const material = new THREE.PointsMaterial({
        map: makeDotTexture() ?? undefined,
        size,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity,
        alphaTest: 0.02,
        depthWrite: false,
        blending: THREE.NormalBlending,
      });

      return new THREE.Points(geometry, material);
    };

    buildPointCloud()
      .catch(makeFallback)
      .then((colorCloud) => {
        if (disposed) return;

        const colorPoints = makePoints(colorCloud.positions, colorCloud.colors, 0.96, 0.18);
        colorPoints.scale.setScalar(1);
        group.add(colorPoints);
        layers.current.color = colorPoints;

        applyMode(modeRef.current);

        scope.current = createScope({
          root,
          mediaQueries: { reducedMotion: "(prefers-reduced-motion: reduce)" },
        }).add((self) => {
          if (!self || self.matches.reducedMotion) return;

          animate(".point-cloud-label", {
            opacity: [0, 1],
            y: [12, 0],
            duration: 900,
            delay: 180,
            ease: "out(3)",
          });
        });

        const render = () => {
          if (disposed) return;

          if (!reducedMotion.matches) {
            // Scroll-driven camera parallax effect (tilt & rotate slightly on scroll)
            const scrollRotationY = scrollPercent.current * 0.7;
            const scrollRotationX = scrollPercent.current * 0.24;

            const targetY = manualRotation.current.y + pointer.current.x * 0.1 + scrollRotationY;
            const targetX = manualRotation.current.x + pointer.current.y * 0.06 - scrollRotationX;
            
            group.rotation.y += (targetY - group.rotation.y) * 0.075;
            group.rotation.x += (targetX - group.rotation.x) * 0.075;
            group.position.x += (pointer.current.x * 4 - group.position.x) * 0.04;
            group.position.y += (-pointer.current.y * 3 - group.position.y) * 0.04;
          }

          renderer.render(scene, camera);
          frameId = window.requestAnimationFrame(render);
        };

        render();
      });

    // Window scroll listener for scroll-driven viewpoint
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollPercent.current = maxScroll > 0 ? scrollY / maxScroll : 0;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Resize handler
    const resize = () => {
      if (!container || disposed) return;
      const nextWidth = container.clientWidth;
      const nextHeight = container.clientHeight;
      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(nextWidth, nextHeight);
    };
    window.addEventListener("resize", resize);

    // Pointer Lock change listener
    const handleLockChange = () => {
      const locked = document.pointerLockElement === container;
      setIsLocked(locked);
    };
    document.addEventListener("pointerlockchange", handleLockChange);

    // Zoom on wheel listener
    const handleWheel = (event: WheelEvent) => {
      if (modeRef.current !== "three") return;
      event.preventDefault();
      camera.position.z += event.deltaY * 0.12;
      camera.position.z = Math.max(30, Math.min(220, camera.position.z));
    };
    container.addEventListener("wheel", handleWheel, { passive: false });

    // Request Pointer Lock on double click
    const handleCanvasDblClick = (event: MouseEvent) => {
      if (modeRef.current !== "three") return;
      const target = event.target as HTMLElement;
      if (target.closest(".point-cloud-label") || target.closest("button")) {
        return;
      }
      container.requestPointerLock();
    };
    container.addEventListener("dblclick", handleCanvasDblClick);

    return () => {
      resetCameraRef.current = undefined;
      disposed = true;
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", resize);
      document.removeEventListener("pointerlockchange", handleLockChange);
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("dblclick", handleCanvasDblClick);
      scope.current?.revert();
      renderer.dispose();
      layers.current = {};
      container.replaceChildren();
    };
  }, []);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const isPointerLocked = document.pointerLockElement === mount.current;

    if (isPointerLocked) {
      manualRotation.current.y += event.movementX * 0.003;
      manualRotation.current.x += event.movementY * 0.003;
      manualRotation.current.x = Math.max(-0.9, Math.min(0.9, manualRotation.current.x));
    } else if (dragging.current) {
      const deltaX = event.clientX - lastPointer.current.x;
      const deltaY = event.clientY - lastPointer.current.y;
      manualRotation.current.y += deltaX * 0.008;
      manualRotation.current.x += deltaY * 0.006;
      manualRotation.current.x = Math.max(-0.9, Math.min(0.9, manualRotation.current.x));
      lastPointer.current = { x: event.clientX, y: event.clientY };
    }

    if (!isPointerLocked) {
      pointer.current.x =
        modeRef.current === "three"
          ? easePointer(((event.clientX - rect.left) / rect.width - 0.5) * 2)
          : 0;
      pointer.current.y =
        modeRef.current === "three"
          ? easePointer(((event.clientY - rect.top) / rect.height - 0.5) * 2)
          : 0;
    } else {
      pointer.current.x = 0;
      pointer.current.y = 0;
    }
  };

  const onPointerLeave = () => {
    const isPointerLocked = document.pointerLockElement === mount.current;
    if (!dragging.current && !isPointerLocked) {
      pointer.current.x = 0;
      pointer.current.y = 0;
    }
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (modeRef.current !== "three") return;
    const isPointerLocked = document.pointerLockElement === mount.current;
    if (isPointerLocked) return;

    const target = event.target as HTMLElement;
    if (target.closest(".point-cloud-label") || target.closest("button")) {
      return;
    }
    dragging.current = true;
    lastPointer.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    const isPointerLocked = document.pointerLockElement === mount.current;
    if (!isPointerLocked) {
      pointer.current.x = 0;
      pointer.current.y = 0;
    }
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div
      ref={root}
      className="relative hidden min-h-[28rem] select-none lg:block"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
      aria-label="Interactive point-cloud portrait"
    >
      <div className="absolute inset-0 rounded-[3rem] border border-border/60 bg-card/20 shadow-[inset_0_1px_0_hsl(210_33%_96%_/_0.06)] backdrop-blur-sm" />
      <div
        ref={mount}
        className="absolute inset-0 overflow-hidden rounded-[3rem]"
        style={{
          opacity: mode === "three" ? 1 : 0,
          pointerEvents: mode === "three" ? "auto" : "none",
          cursor: mode === "three" ? (isLocked ? "none" : "grab") : "default",
        }}
      />
      {/* {mode === "three" && (
        <div className="absolute top-6 left-6 pointer-events-none z-10 select-none rounded-full border border-border/50 bg-background/80 px-3.5 py-1.5 text-2xs font-semibold text-muted-foreground backdrop-blur-xl transition-all">
          {isLocked 
            ? "Press ESC to release cursor" 
            : "Double click to lock cursor | Scroll to zoom | Move to rotate"}
        </div>
      )} */}
      {mode === "three" && (
        <button
          onClick={() => resetCameraRef.current?.()}
          className="absolute bottom-6 right-6 z-10 rounded-full border border-border/50 bg-background/85 px-4 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/70 backdrop-blur-xl transition-all cursor-pointer shadow-sm"
        >
          reset view
        </button>
      )}
      <div
        className="absolute inset-4 overflow-hidden rounded-[2.4rem]"
        style={{
          opacity: mode === "original" ? 1 : 0,
          pointerEvents: mode === "original" ? "auto" : "none",
        }}
      >
        <Image
          src={PORTRAIT_SRC}
          alt="Riddhiman Rana portrait"
          fill
          className="object-cover"
          sizes="472px"
          priority
        />
      </div>
      <div
        className="absolute inset-4 overflow-hidden rounded-[2.4rem]"
        style={{
          opacity: mode === "depth" ? 1 : 0,
          pointerEvents: mode === "depth" ? "auto" : "none",
        }}
      >
        <Image
          src={DEPTH_IMAGE_SRC}
          alt="Depth map"
          fill
          className="object-cover"
          sizes="472px"
        />
      </div>
      <div className="point-cloud-label absolute bottom-6 left-6 opacity-0">
        <ToggleGroup
          type="single"
          value={mode}
          onValueChange={(value) => value && setMode(value as SpatialMode)}
          variant="outline"
          size="sm"
          className="rounded-full border border-border bg-background/70 p-1 backdrop-blur-xl"
          aria-label="Spatial image mode"
        >
          <ToggleGroupItem value="original" className="h-7 rounded-full px-3 text-xs">
            original
          </ToggleGroupItem>
          <ToggleGroupItem value="three" className="h-7 rounded-full px-3 text-xs">
            3d
          </ToggleGroupItem>
          <ToggleGroupItem value="depth" className="h-7 rounded-full px-3 text-xs">
            depth
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
