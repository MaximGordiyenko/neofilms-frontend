import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

import './style.scss'; // Import your Sass file

const GlitchEffect = ({ imgSrc }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);
  const [hoverDuration, setHoverDuration] = useState(0);
  const [glitchIntensity, setGlitchIntensity] = useState(0);

  const ANIMATION_CONFIG = {
    updateFrequency: 0.1,
    glitchIntensityMod: 0.5,
  };

  let scene, camera, renderer; // Declare scene, camera, and renderer

  useEffect(() => {
    const initializeScene = (texture) => {
      // camera setup
      camera = new THREE.PerspectiveCamera(
        80,
        imageRef.current.offsetWidth / imageRef.current.offsetHeight,
        0.01,
        10,
      );
      camera.position.z = 1;

      // scene creation
      scene = new THREE.Scene();

      // uniforms
      const shaderUniforms = {
        tDiffuse: { value: texture },
        glitchIntensity: { value: 0.0 },
      };

      // creating a plane mesh with materials
      const planeMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2),
        new THREE.ShaderMaterial({
          uniforms: shaderUniforms,
          vertexShader: `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform sampler2D tDiffuse;
            uniform float glitchIntensity;
            varying vec2 vUv;

            void main() {
              vec2 uv = vUv;
              vec4 baseState = texture2D(tDiffuse, uv);

              if (glitchIntensity > 0.0) {
                float segment = floor(uv.y * 12.0);
                float randomValue = fract(sin(segment * 12345.6789 + glitchIntensity) * 43758.5453);
                vec2 offset = vec2(randomValue * 0.03, 0.0) * glitchIntensity;

                vec4 redGlitch = texture2D(tDiffuse, uv + offset);
                vec4 greenGlitch = texture2D(tDiffuse, uv - offset);
                vec4 blueGlitch = texture2D(tDiffuse, uv);

                if (mod(segment, 3.0) == 0.0) {
                  gl_FragColor = vec4(redGlitch.r, greenGlitch.g, baseState.b, 1.0);
                } else if (mod(segment, 3.0) == 1.0) {
                  gl_FragColor = vec4(baseState.r, greenGlitch.g, blueGlitch.b, 1.0);
                } else {
                  gl_FragColor = vec4(redGlitch.r, baseState.g, blueGlitch.b, 1.0);
                }
              } else {
                gl_FragColor = baseState;
              }
            }
          `,
        }),
      );

      // add mesh to scene
      scene.add(planeMesh);

      // render
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(imageRef.current.offsetWidth, imageRef.current.offsetHeight);

      // create a new canvas in imageContainer
      containerRef.current.appendChild(renderer.domElement);

      // if mouse is over the image, isHovered is true
      containerRef.current.addEventListener('mouseover', () => {
        setIsHovered(true);
      });

      // if mouse is out of the image, isHovered is false and glitchIntensity value is 0
      containerRef.current.addEventListener('mouseout', () => {
        setIsHovered(false);
        shaderUniforms.glitchIntensity.value = 0;
      });
    };

    // use the existing image from html in the canvas
    initializeScene(new THREE.TextureLoader().load(imgSrc));

    animateScene();

    return () => {
      // Clean up if needed
    };
  }, [imgSrc]);

  const animateScene = () => {
    requestAnimationFrame(animateScene);

    if (isHovered) {
      setHoverDuration((prevDuration) => prevDuration + ANIMATION_CONFIG.updateFrequency);

      if (hoverDuration >= 0.5) {
        setHoverDuration(0);
        setGlitchIntensity(() => Math.random() * ANIMATION_CONFIG.glitchIntensityMod);
      }
    }

    renderer.render(scene, camera);
  };

  return (
    <div className="glitch-container" ref={containerRef}>
      <img className="glitch-image" ref={imageRef} src={imgSrc} alt={`glitch-image`} />
    </div>
  );
};

export default GlitchEffect;
