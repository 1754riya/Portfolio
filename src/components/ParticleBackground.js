import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    // Load the full tsParticles package
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    console.log("Star particles loaded:", container);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 3,
            },
            repulse: {
              distance: 80,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            enable: false, // No connecting lines for star effect
          },
          collisions: {
            enable: false,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "out",
            },
            random: true,
            speed: 1, // Slow drifting effect
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 1000,
            },
            value: 100, // More particles for star field effect
          },
          opacity: {
            value: {
              min: 0.3,
              max: 1,
            },
            animation: {
              enable: true,
              speed: 0.5,
              minimumValue: 0.3,
              sync: false,
            },
          },
          shape: {
            type: "star", // Star-shaped particles
            options: {
              star: {
                sides: 5,
                inset: 2,
              },
            },
          },
          size: {
            value: {
              min: 1,
              max: 4,
            },
            animation: {
              enable: true,
              speed: 2,
              minimumValue: 1,
              sync: false,
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticleBackground;