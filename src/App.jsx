import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ImmersivePortfolio() {
  const [phase, setPhase] = useState('entry'); // 'entry', 'transition', '3d'
  const [clickPos, setClickPos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const sceneContainerRef = useRef(null);
  const scrollProgress = useRef(0);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const sectionsRef = useRef([]);
  const [showClassic, setShowClassic] = useState(false);

  // Glass crack animation
  useEffect(() => {
    if (phase === 'transition' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Create crack lines
      const cracks = [];
      const numCracks = 30;
      
      for (let i = 0; i < numCracks; i++) {
        const angle = (Math.PI * 2 * i) / numCracks + (Math.random() - 0.5) * 0.5;
        const length = 100 + Math.random() * 400;
        cracks.push({
          x: clickPos.x,
          y: clickPos.y,
          angle: angle,
          length: 0,
          targetLength: length,
          branches: []
        });
      }

      // Add branches
      cracks.forEach(crack => {
        const numBranches = Math.floor(Math.random() * 3);
        for (let i = 0; i < numBranches; i++) {
          crack.branches.push({
            startDist: Math.random() * crack.targetLength * 0.7,
            angle: crack.angle + (Math.random() - 0.5) * Math.PI / 3,
            length: 0,
            targetLength: Math.random() * 100 + 50
          });
        }
      });

      let progress = 0;
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Background fade to transparent
        ctx.fillStyle = `rgba(255, 255, 255, ${1 - progress})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw cracks
        ctx.strokeStyle = `rgba(0, 0, 0, ${0.8 - progress * 0.5})`;
        ctx.lineWidth = 2;

        cracks.forEach(crack => {
          // Main crack
          const currentLength = Math.min(crack.length, crack.targetLength);
          const endX = crack.x + Math.cos(crack.angle) * currentLength;
          const endY = crack.y + Math.sin(crack.angle) * currentLength;
          
          ctx.beginPath();
          ctx.moveTo(crack.x, crack.y);
          ctx.lineTo(endX, endY);
          ctx.stroke();

          // Branches
          crack.branches.forEach(branch => {
            if (crack.length > branch.startDist) {
              const branchStartX = crack.x + Math.cos(crack.angle) * branch.startDist;
              const branchStartY = crack.y + Math.sin(crack.angle) * branch.startDist;
              const branchLength = Math.min(branch.length, branch.targetLength);
              const branchEndX = branchStartX + Math.cos(branch.angle) * branchLength;
              const branchEndY = branchStartY + Math.sin(branch.angle) * branchLength;
              
              ctx.beginPath();
              ctx.moveTo(branchStartX, branchStartY);
              ctx.lineTo(branchEndX, branchEndY);
              ctx.stroke();

              branch.length += 8;
            }
          });

          crack.length += 12;
        });

        progress += 0.012;

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setPhase('3d');
        }
      };

      // Play crack sound
      const audio = new Audio();
      audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBDGH0fPTgjMGHm7A7+OZSBAJT6nh8KtfFwlBmN/zuW4gBi+Cz/L';
      audio.volume = 0.3;
      audio.play().catch(() => {});

      animate();
    }
  }, [phase, clickPos]);

  // Three.js 3D Scene
  useEffect(() => {
    if (phase === '3d' && sceneContainerRef.current && !sceneRef.current) {
      // Scene setup
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x0a001a, 0.015);
      sceneRef.current = scene;

      // Camera
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(0, 3, 8);
      cameraRef.current = camera;

      // Renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x0a001a);
      sceneContainerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
      scene.add(ambientLight);

      const dirLight1 = new THREE.DirectionalLight(0x00ffff, 0.5);
      dirLight1.position.set(-10, 10, 10);
      scene.add(dirLight1);

      const dirLight2 = new THREE.DirectionalLight(0xff00ff, 0.3);
      dirLight2.position.set(10, 5, -10);
      scene.add(dirLight2);

      // Road
      const roadGeometry = new THREE.PlaneGeometry(10, 120);
      const roadMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a0033,
        roughness: 0.8,
        metalness: 0.2
      });
      const road = new THREE.Mesh(roadGeometry, roadMaterial);
      road.rotation.x = -Math.PI / 2;
      road.position.z = -60;
      scene.add(road);

      // Grid lines on road
      const gridHelper = new THREE.GridHelper(120, 60, 0x00ffff, 0x440088);
      gridHelper.position.z = -60;
      gridHelper.material.opacity = 0.3;
      gridHelper.material.transparent = true;
      scene.add(gridHelper);

      // Character (simple capsule)
      const characterGeometry = new THREE.CapsuleGeometry(0.5, 1.5, 4, 8);
      const characterMaterial = new THREE.MeshStandardMaterial({
        color: 0x00ffff,
        emissive: 0x00ffff,
        emissiveIntensity: 0.5,
        roughness: 0.3,
        metalness: 0.7
      });
      const character = new THREE.Mesh(characterGeometry, characterMaterial);
      character.position.set(0, 1.5, 0);
      scene.add(character);

      // Cyberpunk buildings (simple boxes with neon)
      const buildingPositions = [
        [-8, 0, -20], [8, 0, -20],
        [-8, 0, -40], [8, 0, -40],
        [-8, 0, -60], [8, 0, -60],
        [-8, 0, -80], [8, 0, -80],
        [-8, 0, -100], [8, 0, -100]
      ];

      buildingPositions.forEach(([x, y, z], i) => {
        const height = 5 + Math.random() * 10;
        const buildingGeometry = new THREE.BoxGeometry(3, height, 3);
        const buildingMaterial = new THREE.MeshStandardMaterial({
          color: 0x1a0033,
          emissive: i % 2 === 0 ? 0x00ffff : 0xff00ff,
          emissiveIntensity: 0.2,
          roughness: 0.7,
          metalness: 0.3
        });
        const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
        building.position.set(x, height / 2, z);
        scene.add(building);

        // Neon sign
        const signGeometry = new THREE.PlaneGeometry(2, 0.5);
        const signMaterial = new THREE.MeshBasicMaterial({
          color: i % 2 === 0 ? 0x00ffff : 0xff00ff,
          side: THREE.DoubleSide
        });
        const sign = new THREE.Mesh(signGeometry, signMaterial);
        sign.position.set(x, height * 0.7, z);
        sign.rotation.y = x > 0 ? Math.PI / 2 : -Math.PI / 2;
        scene.add(sign);
      });

      // Section panels
      const sections = [
        { name: 'About Me', position: [-5, 2.5, -15], side: 'left' },
        { name: 'Skills', position: [5, 2.5, -30], side: 'right' },
        { name: 'Projects', position: [-5, 2.5, -45], side: 'left' },
        { name: 'Achievements', position: [5, 2.5, -60], side: 'right' },
        { name: 'Experience', position: [-5, 2.5, -75], side: 'left' },
        { name: 'Certifications', position: [5, 2.5, -90], side: 'right' },
        { name: 'Connect', position: [0, 3, -105], side: 'center' }
      ];

      sections.forEach(section => {
        const panelWidth = section.side === 'center' ? 8 : 4;
        const panelHeight = section.side === 'center' ? 5 : 3.5;
        
        const panelGeometry = new THREE.PlaneGeometry(panelWidth, panelHeight);
        const panelMaterial = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0,
          roughness: 0.1,
          metalness: 0.9,
          emissive: 0x00ffff,
          emissiveIntensity: 0.2,
          side: THREE.DoubleSide
        });
        const panel = new THREE.Mesh(panelGeometry, panelMaterial);
        panel.position.set(...section.position);
        panel.userData = { name: section.name, side: section.side };
        
        scene.add(panel);
        sectionsRef.current.push(panel);

        // Border glow
        const borderGeometry = new THREE.EdgesGeometry(panelGeometry);
        const borderMaterial = new THREE.LineBasicMaterial({
          color: 0x00ffff,
          transparent: true,
          opacity: 0
        });
        const border = new THREE.LineSegments(borderGeometry, borderMaterial);
        panel.add(border);
      });

      // End wall
      const wallGeometry = new THREE.BoxGeometry(12, 8, 1);
      const wallMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a0033,
        emissive: 0xff00ff,
        emissiveIntensity: 0.3,
        roughness: 0.5,
        metalness: 0.5
      });
      const wall = new THREE.Mesh(wallGeometry, wallMaterial);
      wall.position.set(0, 4, -110);
      scene.add(wall);

      // Animation loop
      let time = 0;
      const animate = () => {
        requestAnimationFrame(animate);
        time += 0.01;

        // Character idle animation
        character.position.y = 1.5 + Math.sin(time * 2) * 0.05;
        character.rotation.y = Math.sin(time * 0.5) * 0.1;

        // Camera follow with smooth interpolation
        const targetZ = -scrollProgress.current * 110;
        camera.position.z += (targetZ + 8 - camera.position.z) * 0.1;
        camera.position.x += (0 - camera.position.x) * 0.05;
        camera.lookAt(0, 2, targetZ);

        // Section panel fade-in based on proximity
        sectionsRef.current.forEach(panel => {
          const distance = Math.abs(panel.position.z - camera.position.z);
          let targetOpacity = 0;
          
          if (distance < 15) {
            targetOpacity = Math.max(0, 1 - distance / 15) * 0.3;
          }

          panel.material.opacity += (targetOpacity - panel.material.opacity) * 0.1;
          
          if (panel.children[0]) {
            panel.children[0].material.opacity = panel.material.opacity * 3;
          }
        });

        renderer.render(scene, camera);
      };
      animate();

      // Handle resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        if (sceneContainerRef.current && renderer.domElement) {
          sceneContainerRef.current.removeChild(renderer.domElement);
        }
      };
    }
  }, [phase]);

  // Scroll handler for 3D navigation
  useEffect(() => {
    if (phase === '3d') {
      const handleScroll = (e) => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        scrollProgress.current = Math.min(Math.max(scrolled / scrollable, 0), 1);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [phase]);

  const handleStartJourney = (e) => {
    setClickPos({ x: e.clientX, y: e.clientY });
    setPhase('transition');
  };

  const restartJourney = () => {
    window.scrollTo(0, 0);
    scrollProgress.current = 0;
    setPhase('entry');
  };

  if (showClassic) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '60px 20px',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <button 
            onClick={() => setShowClassic(false)}
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              padding: '12px 24px',
              background: 'rgba(255,255,255,0.2)',
              border: '2px solid white',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              zIndex: 1000
            }}
          >
            Back to 3D
          </button>

          <h1 style={{ fontSize: '48px', marginBottom: '10px' }}>Your Name</h1>
          <p style={{ fontSize: '20px', opacity: 0.9, marginBottom: '40px' }}>
            Cybersecurity • Web Development • AI/ML
          </p>

          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>About Me</h2>
            <p style={{ lineHeight: '1.8', fontSize: '18px' }}>
              Passionate technologist focused on building secure, intelligent systems. 
              Experience spans web development, security research, and machine learning applications.
            </p>
          </section>

          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {['React', 'Node.js', 'Python', 'Cybersecurity', 'Machine Learning', 'Docker', 'AWS', 'Penetration Testing'].map(skill => (
                <span key={skill} style={{
                  padding: '10px 20px',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '20px',
                  fontSize: '16px'
                }}>{skill}</span>
              ))}
            </div>
          </section>

          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>Contact</h2>
            <div style={{ display: 'flex', gap: '20px', fontSize: '18px' }}>
              <a href="#" style={{ color: 'white', textDecoration: 'underline' }}>GitHub</a>
              <a href="#" style={{ color: 'white', textDecoration: 'underline' }}>LinkedIn</a>
              <a href="#" style={{ color: 'white', textDecoration: 'underline' }}>Email</a>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      margin: 0, 
      padding: 0, 
      width: '100%',
      minHeight: phase === '3d' ? '400vh' : '100vh',
      position: 'relative',
      overflow: phase === '3d' ? 'auto' : 'hidden'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          overflow-x: hidden;
        }

        .glass-panel {
          background: rgba(0, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(0, 255, 255, 0.3);
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 8px 32px rgba(0, 255, 255, 0.1),
                      inset 0 0 20px rgba(0, 255, 255, 0.05);
          transition: all 0.3s ease;
        }

        .glass-panel:hover {
          border-color: rgba(0, 255, 255, 0.6);
          box-shadow: 0 8px 32px rgba(0, 255, 255, 0.3),
                      inset 0 0 30px rgba(0, 255, 255, 0.1);
          transform: scale(1.02);
        }

        .neon-text {
          color: #00ffff;
          text-shadow: 0 0 10px #00ffff,
                       0 0 20px #00ffff,
                       0 0 30px #00ffff;
          font-family: 'Orbitron', sans-serif;
        }

        .skill-icon {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .skill-icon:hover {
          transform: scale(1.2);
          box-shadow: 0 0 20px currentColor;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>

      {/* Skip Button - Always visible */}
      <button
        onClick={() => setShowClassic(true)}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '12px 24px',
          background: 'rgba(0, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(0, 255, 255, 0.5)',
          borderRadius: '8px',
          color: '#00ffff',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '600',
          fontFamily: 'Orbitron, sans-serif',
          zIndex: 10000,
          transition: 'all 0.3s ease',
          textShadow: '0 0 10px #00ffff'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(0, 255, 255, 0.2)';
          e.target.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(0, 255, 255, 0.1)';
          e.target.style.boxShadow = 'none';
        }}
      >
        Skip to Classic Portfolio
      </button>

      {/* Phase 0: Entry Screen */}
      {phase === 'entry' && (
        <div style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'white'
        }}>
          <button
            onClick={handleStartJourney}
            style={{
              padding: '15px 30px',
              fontSize: '16px',
              background: 'white',
              border: '1px solid black',
              cursor: 'pointer'
            }}
          >
            Start the Journey
          </button>
        </div>
      )}

      {/* Phase 1: Transition */}
      {phase === 'transition' && (
        <canvas
          ref={canvasRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 9999
          }}
        />
      )}

      {/* Phase 2: 3D World */}
      {phase === '3d' && (
        <>
          <div
            ref={sceneContainerRef}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100vh',
              zIndex: 1
            }}
          />

          {/* Scroll Progress Indicator */}
          <div style={{
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            padding: '10px 20px',
            background: 'rgba(0, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(0, 255, 255, 0.3)',
            borderRadius: '8px',
            color: '#00ffff',
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '14px',
            zIndex: 100
          }}>
            Progress: {Math.round(scrollProgress.current * 100)}%
          </div>

          {/* Content Overlays */}
          <div style={{
            position: 'absolute',
            top: '100vh',
            left: '0',
            width: '100%',
            zIndex: 10,
            pointerEvents: 'none'
          }}>
            {/* Section 1: About Me */}
            <div style={{
              position: 'absolute',
              top: '15vh',
              left: '5%',
              width: '400px',
              pointerEvents: 'all'
            }}>
              <div className="glass-panel">
                <h2 className="neon-text" style={{ fontSize: '32px', marginBottom: '20px', fontWeight: '900' }}>
                  ABOUT ME
                </h2>
                <div style={{ 
                  width: '120px', 
                  height: '120px', 
                  borderRadius: '50%', 
                  background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
                  marginBottom: '20px',
                  boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)'
                }}></div>
                <h3 style={{ 
                  color: 'white', 
                  fontSize: '24px', 
                  marginBottom: '10px',
                  fontFamily: 'Orbitron, sans-serif'
                }}>
                  Your Name
                </h3>
                <p style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  lineHeight: '1.6',
                  fontFamily: 'Rajdhani, sans-serif',
                  fontSize: '16px'
                }}>
                  Digital architect crafting secure, intelligent systems at the intersection of 
                  cybersecurity, web development, and artificial intelligence. Passionate about 
                  building the future, one line of code at a time.
                </p>
                <div style={{ 
                  marginTop: '15px', 
                  display: 'flex', 
                  gap: '10px',
                  flexWrap: 'wrap'
                }}>
                  {['Cybersecurity', 'Web Dev', 'AI/ML'].map(tag => (
                    <span key={tag} style={{
                      padding: '6px 12px',
                      background: 'rgba(255, 0, 255, 0.2)',
                      border: '1px solid rgba(255, 0, 255, 0.5)',
                      borderRadius: '4px',
                      color: '#ff00ff',
                      fontSize: '12px',
                      fontFamily: 'Rajdhani, sans-serif',
                      fontWeight: '600'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 2: Skills */}
            <div style={{
              position: 'absolute',
              top: '120vh',
              right: '5%',
              width: '450px',
              pointerEvents: 'all'
            }}>
              <div className="glass-panel">
                <h2 className="neon-text" style={{ fontSize: '32px', marginBottom: '25px', fontWeight: '900' }}>
                  SKILLS
                </h2>
                
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ 
                    color: '#00ffff', 
                    fontSize: '16px', 
                    marginBottom: '12px',
                    fontFamily: 'Orbitron, sans-serif'
                  }}>
                    Web Development
                  </h4>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {['React', 'Node.js', 'TypeScript', 'Next.js', 'GraphQL'].map(skill => (
                      <div key={skill} className="skill-icon" style={{
                        padding: '10px 16px',
                        background: 'rgba(0, 255, 255, 0.1)',
                        border: '1px solid rgba(0, 255, 255, 0.3)',
                        borderRadius: '6px',
                        color: 'white',
                        fontSize: '13px',
                        fontFamily: 'Rajdhani, sans-serif',
                        cursor: 'pointer'
                      }}>
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ 
                    color: '#ff00ff', 
                    fontSize: '16px', 
                    marginBottom: '12px',
                    fontFamily: 'Orbitron, sans-serif'
                  }}>
                    Cybersecurity
                  </h4>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {['Penetration Testing', 'Burp Suite', 'Metasploit', 'Wireshark', 'OWASP'].map(skill => (
                      <div key={skill} className="skill-icon" style={{
                        padding: '10px 16px',
                        background: 'rgba(255, 0, 255, 0.1)',
                        border: '1px solid rgba(255, 0, 255, 0.3)',
                        borderRadius: '6px',
                        color: 'white',
                        fontSize: '13px',
                        fontFamily: 'Rajdhani, sans-serif',
                        cursor: 'pointer'
                      }}>
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 style={{ 
                    color: '#00ff88', 
                    fontSize: '16px', 
                    marginBottom: '12px',
                    fontFamily: 'Orbitron, sans-serif'
                  }}>
                    AI/ML
                  </h4>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenAI API', 'Computer Vision'].map(skill => (
                      <div key={skill} className="skill-icon" style={{
                        padding: '10px 16px',
                        background: 'rgba(0, 255, 136, 0.1)',
                        border: '1px solid rgba(0, 255, 136, 0.3)',
                        borderRadius: '6px',
                        color: 'white',
                        fontSize: '13px',
                        fontFamily: 'Rajdhani, sans-serif',
                        cursor: 'pointer'
                      }}>
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Projects */}
            <div style={{
              position: 'absolute',
              top: '200vh',
              left: '5%',
              width: '500px',
              pointerEvents: 'all'
            }}>
              <div className="glass-panel">
                <h2 className="neon-text" style={{ fontSize: '32px', marginBottom: '25px', fontWeight: '900' }}>
                  PROJECTS
                </h2>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                  gap: '15px' 
                }}>
                  {[
                    { name: 'SecureAuth System', tech: 'Node.js, JWT', desc: 'Zero-trust authentication' },
                    { name: 'AI Threat Detector', tech: 'Python, TensorFlow', desc: 'ML-powered security' },
                    { name: 'Blockchain Explorer', tech: 'React, Web3', desc: 'Real-time crypto tracking' },
                    { name: 'Vulnerability Scanner', tech: 'Python, Nmap', desc: 'Automated pentesting' },
                    { name: 'Smart Dashboard', tech: 'Next.js, D3.js', desc: 'Analytics platform' },
                    { name: 'Encryption Suite', tech: 'Go, AES', desc: 'End-to-end encryption' }
                  ].map((project, i) => (
                    <div key={i} style={{
                      padding: '20px',
                      background: 'rgba(0, 255, 255, 0.05)',
                      border: '1px solid rgba(0, 255, 255, 0.2)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 255, 255, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}>
                      <h4 style={{ 
                        color: '#00ffff', 
                        fontSize: '16px', 
                        marginBottom: '8px',
                        fontFamily: 'Orbitron, sans-serif'
                      }}>
                        {project.name}
                      </h4>
                      <p style={{ 
                        color: 'rgba(255, 255, 255, 0.6)', 
                        fontSize: '12px',
                        marginBottom: '8px',
                        fontFamily: 'Rajdhani, sans-serif'
                      }}>
                        {project.desc}
                      </p>
                      <p style={{ 
                        color: '#ff00ff', 
                        fontSize: '11px',
                        fontFamily: 'Rajdhani, sans-serif',
                        fontWeight: '600'
                      }}>
                        {project.tech}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 4: Achievements */}
            <div style={{
              position: 'absolute',
              top: '280vh',
              right: '5%',
              width: '420px',
              pointerEvents: 'all'
            }}>
              <div className="glass-panel">
                <h2 className="neon-text" style={{ fontSize: '32px', marginBottom: '25px', fontWeight: '900' }}>
                  ACHIEVEMENTS
                </h2>
                {[
                  { icon: '🏆', title: 'CTF Champion', desc: 'Top 3 at CyberSec CTF 2024' },
                  { icon: '🎓', title: 'CEH Certified', desc: 'Ethical Hacking certification' },
                  { icon: '⭐', title: 'Open Source', desc: '500+ GitHub contributions' },
                  { icon: '🚀', title: 'Startup Launch', desc: 'Co-founded SecureTech startup' }
                ].map((achievement, i) => (
                  <div key={i} style={{
                    padding: '15px',
                    marginBottom: '12px',
                    background: 'rgba(255, 0, 255, 0.05)',
                    border: '1px solid rgba(255, 0, 255, 0.2)',
                    borderRadius: '8px',
                    display: 'flex',
                    gap: '15px',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 0, 255, 0.1)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 0, 255, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 0, 255, 0.05)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                    <div style={{ fontSize: '32px' }}>{achievement.icon}</div>
                    <div>
                      <h4 style={{ 
                        color: '#ff00ff', 
                        fontSize: '16px', 
                        marginBottom: '4px',
                        fontFamily: 'Orbitron, sans-serif'
                      }}>
                        {achievement.title}
                      </h4>
                      <p style={{ 
                        color: 'rgba(255, 255, 255, 0.7)', 
                        fontSize: '13px',
                        fontFamily: 'Rajdhani, sans-serif'
                      }}>
                        {achievement.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 5: Experience */}
            <div style={{
              position: 'absolute',
              top: '350vh',
              left: '5%',
              width: '480px',
              pointerEvents: 'all'
            }}>
              <div className="glass-panel">
                <h2 className="neon-text" style={{ fontSize: '32px', marginBottom: '25px', fontWeight: '900' }}>
                  EXPERIENCE
                </h2>
                <div style={{ position: 'relative', paddingLeft: '30px' }}>
                  {/* Timeline line */}
                  <div style={{
                    position: 'absolute',
                    left: '10px',
                    top: '0',
                    bottom: '0',
                    width: '2px',
                    background: 'linear-gradient(to bottom, #00ffff, #ff00ff)',
                    opacity: '0.5'
                  }}></div>

                  {[
                    { 
                      role: 'Security Researcher', 
                      org: 'CyberDefense Labs', 
                      period: '2023 - Present',
                      tasks: ['Conducted penetration testing', 'Developed security tools']
                    },
                    { 
                      role: 'Full Stack Developer', 
                      org: 'TechInnovate Inc', 
                      period: '2022 - 2023',
                      tasks: ['Built scalable web apps', 'Led frontend architecture']
                    },
                    { 
                      role: 'ML Engineering Intern', 
                      org: 'AI Solutions Co', 
                      period: '2021 - 2022',
                      tasks: ['Trained computer vision models', 'Optimized inference pipeline']
                    }
                  ].map((exp, i) => (
                    <div key={i} style={{ marginBottom: '25px', position: 'relative' }}>
                      {/* Timeline dot */}
                      <div style={{
                        position: 'absolute',
                        left: '-25px',
                        top: '5px',
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: i % 2 === 0 ? '#00ffff' : '#ff00ff',
                        boxShadow: `0 0 10px ${i % 2 === 0 ? '#00ffff' : '#ff00ff'}`
                      }}></div>

                      <h4 style={{ 
                        color: '#00ffff', 
                        fontSize: '18px', 
                        marginBottom: '5px',
                        fontFamily: 'Orbitron, sans-serif'
                      }}>
                        {exp.role}
                      </h4>
                      <p style={{ 
                        color: '#ff00ff', 
                        fontSize: '14px',
                        marginBottom: '5px',
                        fontFamily: 'Rajdhani, sans-serif',
                        fontWeight: '600'
                      }}>
                        {exp.org} • {exp.period}
                      </p>
                      <ul style={{ 
                        color: 'rgba(255, 255, 255, 0.7)', 
                        fontSize: '13px',
                        marginLeft: '20px',
                        fontFamily: 'Rajdhani, sans-serif',
                        lineHeight: '1.6'
                      }}>
                        {exp.tasks.map((task, j) => (
                          <li key={j}>{task}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 6: Certifications */}
            <div style={{
              position: 'absolute',
              top: '430vh',
              right: '5%',
              width: '440px',
              pointerEvents: 'all'
            }}>
              <div className="glass-panel">
                <h2 className="neon-text" style={{ fontSize: '32px', marginBottom: '25px', fontWeight: '900' }}>
                  CERTIFICATIONS
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {[
                    { name: 'Certified Ethical Hacker', org: 'EC-Council', year: '2024' },
                    { name: 'AWS Solutions Architect', org: 'Amazon', year: '2023' },
                    { name: 'CompTIA Security+', org: 'CompTIA', year: '2023' },
                    { name: 'TensorFlow Developer', org: 'Google', year: '2022' }
                  ].map((cert, i) => (
                    <div key={i} style={{
                      padding: '18px',
                      background: 'rgba(0, 255, 255, 0.05)',
                      border: '1px solid rgba(0, 255, 255, 0.3)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'rotateY(5deg) translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 255, 255, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'rotateY(0) translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
                        opacity: '0.3'
                      }}></div>
                      <h4 style={{ 
                        color: '#00ffff', 
                        fontSize: '16px', 
                        marginBottom: '6px',
                        fontFamily: 'Orbitron, sans-serif'
                      }}>
                        {cert.name}
                      </h4>
                      <p style={{ 
                        color: 'rgba(255, 255, 255, 0.6)', 
                        fontSize: '13px',
                        fontFamily: 'Rajdhani, sans-serif'
                      }}>
                        {cert.org} • {cert.year}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 7: Connect Wall */}
            <div style={{
              position: 'absolute',
              top: '500vh',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '600px',
              pointerEvents: 'all'
            }}>
              <div className="glass-panel" style={{ textAlign: 'center', padding: '50px' }}>
                <h2 className="neon-text" style={{ 
                  fontSize: '42px', 
                  marginBottom: '20px', 
                  fontWeight: '900',
                  animation: 'pulse 2s infinite'
                }}>
                  LET'S BUILD SOMETHING
                </h2>
                <p style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  fontSize: '18px',
                  marginBottom: '35px',
                  fontFamily: 'Rajdhani, sans-serif',
                  lineHeight: '1.6'
                }}>
                  Ready to collaborate on the next big thing? Let's connect and create something extraordinary.
                </p>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  gap: '25px',
                  marginBottom: '35px'
                }}>
                  {[
                    { name: 'GitHub', icon: '⚡', color: '#00ffff' },
                    { name: 'LinkedIn', icon: '💼', color: '#ff00ff' },
                    { name: 'Email', icon: '📧', color: '#00ff88' }
                  ].map((link) => (
                    <a
                      key={link.name}
                      href="#"
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '12px',
                        background: `rgba(${link.color === '#00ffff' ? '0,255,255' : link.color === '#ff00ff' ? '255,0,255' : '0,255,136'},0.1)`,
                        border: `2px solid ${link.color}`,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-10px)';
                        e.currentTarget.style.boxShadow = `0 10px 40px ${link.color}`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{ fontSize: '32px', marginBottom: '5px' }}>{link.icon}</div>
                      <span style={{ 
                        color: link.color, 
                        fontSize: '12px',
                        fontFamily: 'Orbitron, sans-serif',
                        fontWeight: '600'
                      }}>
                        {link.name}
                      </span>
                    </a>
                  ))}
                </div>

                <button
                  onClick={restartJourney}
                  style={{
                    padding: '15px 40px',
                    background: 'rgba(255, 0, 255, 0.2)',
                    border: '2px solid #ff00ff',
                    borderRadius: '8px',
                    color: '#ff00ff',
                    fontSize: '16px',
                    fontWeight: '700',
                    fontFamily: 'Orbitron, sans-serif',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textShadow: '0 0 10px #ff00ff'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 0, 255, 0.4)';
                    e.target.style.boxShadow = '0 0 30px #ff00ff';
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 0, 255, 0.2)';
                    e.target.style.boxShadow = 'none';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  ↻ Start the Journey Again
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
