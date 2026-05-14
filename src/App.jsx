import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import './index.css';

// ---- Audio Engine ----
const AudioEngine = {
  ctx: null,
  ambientOsc: null,
  ambientNoise: null,
  masterGain: null,
  isMuted: false,

  init() {
      if (this.ctx) {
          if (this.ctx.state === 'suspended') this.ctx.resume();
          return;
      }
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.connect(this.ctx.destination);
      this.masterGain.gain.value = 1.0;
  },
  
  playCrack() {
      if (!this.ctx || this.isMuted) return;
      const bufferSize = this.ctx.sampleRate * 1.5; 
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.05));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 1000;
      noise.connect(filter);
      filter.connect(this.masterGain);
      noise.start();
  },
  
  startAmbient() {
      if (!this.ctx || this.ambientOsc) return;
      // Deep drone
      this.ambientOsc = this.ctx.createOscillator();
      this.ambientOsc.type = 'sine';
      this.ambientOsc.frequency.value = 45;
      const droneGain = this.ctx.createGain();
      droneGain.gain.value = 0.05;
      this.ambientOsc.connect(droneGain);
      droneGain.connect(this.masterGain);
      this.ambientOsc.start();
      this.ambientOsc.loop = true;
  },
  
  playFootstep() {
      if (!this.ctx || this.isMuted) return;
      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
  },
  
  toggleMute() {
      this.isMuted = !this.isMuted;
      if (this.masterGain) {
          this.masterGain.gain.value = this.isMuted ? 0 : 1;
      }
      return this.isMuted;
  }
};

// ---- Phase 0: Entry ----
const EntryScreen = ({ onStart }) => {
  return (
      <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'white', color: 'black', fontFamily: 'sans-serif' }}>
          <button 
              onClick={(e) => {
                  AudioEngine.init();
                  onStart(e);
              }}
              style={{ padding: '15px 30px', fontSize: '20px', cursor: 'pointer', border: '2px solid black', background: 'white', borderRadius: '5px' }}
          >
              Start the Journey
          </button>
      </div>
  );
};

// ---- Phase 1: Crack Animation ----
const CrackTransition = ({ pos, onComplete }) => {
  useEffect(() => {
      AudioEngine.playCrack();
      const canvas = document.getElementById('crackCanvas');
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Fill white initially
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 3;
      
      const cracks = [];
      const numCracks = 15;
      for(let i=0; i<numCracks; i++) {
          cracks.push({
              x: pos.x, y: pos.y,
              angle: (i / numCracks) * Math.PI * 2 + (Math.random() * 0.5),
              length: 0,
              maxLength: Math.max(window.innerWidth, window.innerHeight) * (Math.random() * 0.5 + 0.6)
          });
      }

      let frame;
      let progress = 0;
      const draw = () => {
          progress += 2;
          ctx.beginPath();
          cracks.forEach(c => {
              if(c.length < c.maxLength) {
                  let cx = pos.x;
                  let cy = pos.y;
                  ctx.moveTo(cx, cy);
                  let currentAngle = c.angle;
                  
                  c.length += 40; 
                  let segLen = c.length / 20;
                  
                  for(let j=1; j<=20; j++) {
                      currentAngle += (Math.random() - 0.5) * 0.5;
                      cx += Math.cos(currentAngle) * segLen;
                      cy += Math.sin(currentAngle) * segLen;
                      ctx.lineTo(cx, cy);
                  }
              }
          });
          ctx.stroke();
          
          if(progress < 100) frame = requestAnimationFrame(draw);
      };
      draw();

      // Start fade out
      const fadeTimeout = setTimeout(() => {
          if (canvas) {
              canvas.style.opacity = '0';
              canvas.style.transition = 'opacity 1.5s ease-in';
          }
          setTimeout(onComplete, 1500);
      }, 1000);

      return () => {
          cancelAnimationFrame(frame);
          clearTimeout(fadeTimeout);
      };
  }, [pos, onComplete]);

  return <canvas id="crackCanvas" style={{ position: 'fixed', top:0, left:0, zIndex: 9999, pointerEvents: 'none', width: '100%', height: '100%' }} />;
};

// ---- Sections Data ----
const sectionsData = [
  { id: 1, type: 'about', title: 'ABOUT ME', z: 15, align: 'left' },
  { id: 2, type: 'skills', title: 'SKILLS', z: 30, align: 'right' },
  { id: 3, type: 'projects', title: 'PROJECTS', z: 45, align: 'left' },
  { id: 4, type: 'achievements', title: 'KEY ACHIEVEMENTS', z: 60, align: 'right' },
  { id: 5, type: 'experience', title: 'EXPERIENCE', z: 75, align: 'left' },
  { id: 6, type: 'certs', title: 'CERTIFICATIONS', z: 90, align: 'right' },
  { id: 7, type: 'connect', title: "LET'S BUILD SOMETHING", z: 105, align: 'center' },
];

// ---- Phase 2: 3D World ----
const ThreeWorld = ({ onSkip, onRestart }) => {
  const mountRef = useRef(null);
  const sectionRefs = useRef([]);
  const [modal, setModal] = useState(null);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hoveredSection, setHoveredSection] = useState(null);

  useEffect(() => {
      AudioEngine.startAmbient();

      // 1. Scene Setup
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x1a0033, 0.05);
      scene.background = new THREE.Color(0x1a0033);

      const camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.1, 200);
      camera.position.set(0, 3, 0);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      if(mountRef.current) mountRef.current.appendChild(renderer.domElement);

      // 2. Lights
      const ambient = new THREE.AmbientLight(0xffffff, 0.3);
      scene.add(ambient);

      const dir1 = new THREE.DirectionalLight(0x00ffff, 1.2);
      dir1.position.set(20, 20, 0);
      scene.add(dir1);

      const dir2 = new THREE.DirectionalLight(0xff00ff, 1.2);
      dir2.position.set(-20, 20, 0);
      scene.add(dir2);

      // Point lights on neon signs
      const pLight1 = new THREE.PointLight(0xff00aa, 2, 50);
      pLight1.position.set(10, 5, -30);
      scene.add(pLight1);

      const pLight2 = new THREE.PointLight(0x00ffff, 2, 50);
      pLight2.position.set(-10, 5, -70);
      scene.add(pLight2);

      const pLight3 = new THREE.PointLight(0xff00ff, 2, 50);
      pLight3.position.set(10, 5, -100);
      scene.add(pLight3);

      // 3. World Geometry
      // Road
      const roadGeo = new THREE.PlaneGeometry(12, 150, 1, 1);
      const roadMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });
      const road = new THREE.Mesh(roadGeo, roadMat);
      road.rotation.x = -Math.PI / 2;
      road.position.z = -60;
      scene.add(road);

      const gridHelper = new THREE.GridHelper(150, 75, 0x00ffff, 0xff00ff);
      gridHelper.position.set(0, 0.05, -60);
      gridHelper.scale.set(1, 1, 2);
      scene.add(gridHelper);

      // Buildings (Instanced BufferGeometry)
      const boxGeo = new THREE.BoxGeometry(1, 1, 1);
      const boxMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.5, emissive: 0x1a0033, emissiveIntensity: 0.2 });
      const buildingCount = 200;
      const city = new THREE.InstancedMesh(boxGeo, boxMat, buildingCount);
      const dummy = new THREE.Object3D();
      
      for(let i=0; i<buildingCount; i++) {
          const h = Math.random() * 20 + 5;
          const w = Math.random() * 4 + 2;
          const d = Math.random() * 4 + 2;
          const side = Math.random() > 0.5 ? 1 : -1;
          const x = side * (Math.random() * 40 + 10);
          const z = -Math.random() * 150 + 20;
          dummy.position.set(x, h/2, z);
          dummy.scale.set(w, h, d);
          dummy.updateMatrix();
          city.setMatrixAt(i, dummy.matrix);
      }
      scene.add(city);

      // Character
      const charGroup = new THREE.Group();
      const bodyGeo = new THREE.CylinderGeometry(0.4, 0.3, 1.2, 8);
      const headGeo = new THREE.SphereGeometry(0.3, 8, 8);
      const charMat = new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0x00ffff, emissiveIntensity: 0.4 });
      const body = new THREE.Mesh(bodyGeo, charMat);
      body.position.y = 0.6;
      const head = new THREE.Mesh(headGeo, charMat);
      head.position.y = 1.4;
      charGroup.add(body);
      charGroup.add(head);
      charGroup.position.z = -5;
      scene.add(charGroup);

      // 4. Animation & Scroll Loop
      let currentZ = 0;
      let targetZ = 0;
      let lastStepZ = 0;
      const maxZ = 120;

      const handleWheel = (e) => {
          // Increased sensitivity and normalized delta for better responsiveness
          const delta = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY * 0.05), 5);
          targetZ += delta;
          targetZ = Math.max(0, Math.min(maxZ, targetZ));
      };
      
      // Keyboard support
      const keys = { w: false, s: false, arrowup: false, arrowdown: false };
      const handleKeyDown = (e) => { 
          const key = e.key.toLowerCase();
          if(keys[key] !== undefined) keys[key] = true; 
      };
      const handleKeyUp = (e) => { 
          const key = e.key.toLowerCase();
          if(keys[key] !== undefined) keys[key] = false; 
      };

      window.addEventListener('wheel', handleWheel, { passive: true });
      window.addEventListener('touchstart', handleTouchStart, { passive: true });
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);

      let frameId;
      const render = () => {
          // Handle keyboard continuous movement
          if (keys.w || keys.arrowup) targetZ += 0.6;
          if (keys.s || keys.arrowdown) targetZ -= 0.6;
          targetZ = Math.max(0, Math.min(maxZ, targetZ));

          currentZ += (targetZ - currentZ) * 0.08;
          
          camera.position.z = -currentZ;
          charGroup.position.z = -currentZ - 4;
          
          // Walking animation vs Idle animation
          if (Math.abs(targetZ - currentZ) > 0.1) {
              // Walking
              charGroup.rotation.y = Math.sin(Date.now() * 0.01) * 0.2;
              charGroup.position.y = Math.abs(Math.sin(Date.now() * 0.015)) * 0.3;
          } else {
              // Idle
              charGroup.rotation.y += (0 - charGroup.rotation.y) * 0.1;
              charGroup.position.y += (Math.sin(Date.now() * 0.005) * 0.1 - charGroup.position.y) * 0.1;
          }

          setProgress((currentZ / 105) * 100); // 105 is the last section

          if (Math.abs(currentZ - lastStepZ) > 1.5) {
              AudioEngine.playFootstep();
              lastStepZ = currentZ;
          }

          // Update DOM Panels directly to bypass React state bottlenecks
          sectionsData.forEach((sec, i) => {
              const el = sectionRefs.current[i];
              if (!el) return;
              
              const distance = sec.z - currentZ;
              
              let opacity = 0;
              // Fade in when 10 units away, full opacity at 5 units
              if (distance > 5 && distance <= 10) opacity = 1 - (distance - 5) / 5;
              else if (distance >= -5 && distance <= 5) opacity = 1;
              else if (distance < -5 && distance >= -15) opacity = 1 - Math.abs(distance + 5) / 10;
              
              if (opacity <= 0.01) {
                  el.style.display = 'none';
              } else {
                  el.style.display = 'block';
                  el.style.opacity = opacity.toString();
                  el.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none';
                  
                  // Check if this element is hovered (from React state via data attr if we want, or just assume)
                  const isHovered = el.getAttribute('data-hovered') === 'true';
                  
                  const scale = (distance > 0 ? Math.max(0.7, 1 - distance * 0.02) : Math.max(0.7, 1 + distance * 0.02)) * (isHovered ? 1.05 : 1);
                  const yOffset = distance * 12; 
                  
                  let transform = `translateY(${yOffset}px) scale(${scale})`;
                  if (sec.align === 'center') transform += ' translateX(-50%)';
                  el.style.transform = transform;
              }
          });

          renderer.render(scene, camera);
          frameId = requestAnimationFrame(render);
      };
      render();

      const handleResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', handleResize);

      return () => {
          window.removeEventListener('wheel', handleWheel);
          window.removeEventListener('touchstart', handleTouchStart);
          window.removeEventListener('touchmove', handleTouchMove);
          window.removeEventListener('keydown', handleKeyDown);
          window.removeEventListener('keyup', handleKeyUp);
          window.removeEventListener('resize', handleResize);
          cancelAnimationFrame(frameId);
          if(mountRef.current && renderer.domElement) {
            mountRef.current.removeChild(renderer.domElement);
          }
      };
  }, []);

  return (
      <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
          <div ref={mountRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
          
          {/* Fixed UI */}
          <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 100, display: 'flex', gap: '10px' }}>
              <button className="btn" onClick={() => setMuted(AudioEngine.toggleMute())}>
                  {muted ? 'UNMUTE' : 'MUTE'}
              </button>
              <button className="btn" onClick={onSkip}>Skip to Classic Portfolio</button>
          </div>

          <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${Math.min(100, progress)}%` }}></div>
          </div>
          <div style={{ position: 'fixed', bottom: '10px', width: '100%', textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '12px', zIndex: 100, pointerEvents: 'none' }}>
              SCROLL TO EXPLORE
          </div>

          {/* Sections Overlay */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }}>
              {sectionsData.map((sec, i) => {
                  let left = sec.align === 'left' ? '5%' : sec.align === 'center' ? '50%' : 'auto';
                  let right = sec.align === 'right' ? '5%' : 'auto';
                  
                  return (
                      <div 
                          key={sec.id} 
                          ref={el => sectionRefs.current[i] = el} 
                          className="glass-panel" 
                          data-hovered={hoveredSection === sec.id}
                          onMouseEnter={() => setHoveredSection(sec.id)}
                          onMouseLeave={() => setHoveredSection(null)}
                          style={{
                              left, right, top: '15%',
                              display: 'none',
                              transformOrigin: sec.align === 'center' ? 'center center' : (sec.align === 'left' ? 'left center' : 'right center')
                          }}
                      >
                          <h2 className="neon-text" style={{ margin: '0 0 20px 0', borderBottom: '1px solid rgba(255,0,255,0.5)', paddingBottom: '10px' }}>{sec.title}</h2>
                          <SectionContent type={sec.type} setModal={setModal} onRestart={onRestart} />
                      </div>
                  )
              })}
          </div>

          {/* Modal Overlay */}
          {modal && (
              <div className="modal-overlay" onClick={(e) => { if(e.target.className === 'modal-overlay') setModal(null); }}>
                  <div className="modal-content">
                      <h2 className="neon-text-magenta">{modal.title}</h2>
                      <p style={{ lineHeight: '1.6' }}>{modal.desc}</p>
                      <div style={{ marginTop: '20px', color: 'var(--cyan)' }}><strong>Tech Stack:</strong> {modal.tech}</div>
                      <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
                          <button className="btn" onClick={() => setModal(null)}>Close</button>
                          <button className="btn" onClick={() => window.open(modal.link, '_blank')}>View Link</button>
                      </div>
                  </div>
              </div>
          )}
      </div>
  );
};

// ---- Section Specific Content Components ----
const SectionContent = ({ type, setModal, onRestart }) => {
  if (type === 'about') {
      return (
          <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid var(--cyan)', background: 'var(--bg-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px' }}>
                      👽
                  </div>
                  <div>
                      <h3 className="neon-text-magenta" style={{ margin: 0, fontSize: '24px' }}>JOHN DOE</h3>
                      <div style={{ color: 'var(--cyan)', marginTop: '5px' }}>Cybersecurity Analyst & Dev</div>
                  </div>
              </div>
              <p style={{ lineHeight: '1.6', color: '#eaeaea' }}>
                  I bridge the gap between secure systems and immersive web experiences. Passionate about AIML, 
                  penetration testing, and building the future of the web.
              </p>
              <div style={{ marginTop: '15px', color: 'var(--pink)' }}>
                  <strong>Focus Areas:</strong> Cybersecurity, Web Development, AIML
              </div>
          </div>
      );
  }
  if (type === 'skills') {
      const skills = [
          { name: 'React', icon: '⚛️' }, { name: 'Three.js', icon: '🧊' }, { name: 'Node.js', icon: '🟢' },
          { name: 'Python', icon: '🐍' }, { name: 'Kali Linux', icon: '🐉' }, { name: 'Wireshark', icon: '🦈' },
          { name: 'Docker', icon: '🐋' }, { name: 'AWS', icon: '☁️' }, { name: 'AIML', icon: '🧠' }
      ];
      return (
          <div className="icon-grid">
              {skills.map(s => (
                  <div key={s.name} className="icon-box" title={s.name}>
                      <div style={{ fontSize: '24px', marginBottom: '5px' }}>{s.icon}</div>
                      <div style={{ fontSize: '10px' }}>{s.name}</div>
                  </div>
              ))}
          </div>
      );
  }
  if (type === 'projects') {
      const projects = [
          { id:1, title: 'Project Sentinel', desc: 'Automated network anomaly detection system.', tech: 'Python, Scikit-learn', link: '#' },
          { id:2, title: 'CyberDash', desc: 'Real-time security analytics dashboard.', tech: 'React, D3.js', link: '#' },
          { id:3, title: 'EncryptChat', desc: 'E2E encrypted messaging platform.', tech: 'Node, Socket.io, AES', link: '#' },
          { id:4, title: 'Honeypot Beta', desc: 'Low-interaction honeypot data collection.', tech: 'Python, AWS', link: '#' },
          { id:5, title: 'CryptoWallet', desc: 'Secure decentralized web wallet interface.', tech: 'React, Web3.js', link: '#' },
          { id:6, title: 'AI Fuzzer', desc: 'ML-powered payload generator for fuzzing.', tech: 'TensorFlow, Python', link: '#' },
      ];
      return (
          <div className="project-grid">
              {projects.map(p => (
                  <div key={p.id} className="project-card" onClick={() => setModal(p)}>
                      <h4 style={{ margin: '0 0 10px 0', color: 'var(--cyan)' }}>{p.title}</h4>
                      <p style={{ fontSize: '12px', margin: 0, color: '#ccc' }}>{p.desc}</p>
                  </div>
              ))}
          </div>
      );
  }
  if (type === 'achievements') {
      return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div className="icon-box" style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ fontSize: '30px' }}>🏆</span>
                  <div>
                      <strong style={{ color: 'var(--cyan)' }}>DefCon Qualifier 2025</strong><br/>
                      <span style={{ fontSize: '12px' }}>Top 50 team placement globally</span>
                  </div>
              </div>
              <div className="icon-box" style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ fontSize: '30px' }}>🎯</span>
                  <div>
                      <strong style={{ color: 'var(--magenta)' }}>HackTheBox Pro</strong><br/>
                      <span style={{ fontSize: '12px' }}>Achieved Elite Hacker rank</span>
                  </div>
              </div>
              <div className="icon-box" style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ fontSize: '30px' }}>🚀</span>
                  <div>
                      <strong style={{ color: 'var(--cyan)' }}>Open Source Impact</strong><br/>
                      <span style={{ fontSize: '12px' }}>50+ merged PRs in major security tools</span>
                  </div>
              </div>
          </div>
      );
  }
  if (type === 'experience') {
      return (
          <div className="timeline">
              <div className="timeline-item">
                  <h4 style={{ margin: 0, color: 'var(--cyan)' }}>Security Analyst</h4>
                  <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '5px' }}>CyberTech Inc | 2024 - Present</div>
                  <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.4' }}>
                      <li>Conducted vulnerability assessments and pentesting</li>
                      <li>Reduced critical system vulnerabilities by 40%</li>
                  </ul>
              </div>
              <div className="timeline-item">
                  <h4 style={{ margin: 0, color: 'var(--magenta)' }}>Frontend Developer</h4>
                  <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '5px' }}>WebSolutions | 2023 - 2024</div>
                  <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.4' }}>
                      <li>Built interactive React dashboards for clients</li>
                      <li>Optimized application performance reaching 98 Lighthouse</li>
                  </ul>
              </div>
          </div>
      );
  }
  if (type === 'certs') {
      const certs = ['CEH Certified', 'CompTIA Security+', 'AWS Solutions Arch'];
      return (
          <div style={{ display: 'flex', overflowX: 'auto', gap: '15px', paddingBottom: '10px' }}>
              {certs.map((c, i) => (
                  <div key={i} className="project-card" style={{ minWidth: '150px', flexShrink: 0 }}>
                      <div style={{ height: '80px', background: 'rgba(255,255,255,0.05)', borderRadius: '5px', marginBottom: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '30px' }}>
                          📜
                      </div>
                      <h4 style={{ margin: '0 0 5px 0', textAlign: 'center', color: 'var(--cyan)', fontSize: '14px' }}>{c}</h4>
                  </div>
              ))}
          </div>
      );
  }
  if (type === 'connect') {
      return (
          <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '16px', marginBottom: '30px' }}>Ready to collaborate on the next big thing in Web Development or Cybersecurity?</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '40px' }}>
                  <a href="#" className="btn" style={{ textDecoration: 'none' }}>GitHub</a>
                  <a href="#" className="btn" style={{ textDecoration: 'none' }}>LinkedIn</a>
                  <a href="#" className="btn" style={{ textDecoration: 'none' }}>Email</a>
              </div>
              <button className="btn" onClick={onRestart} style={{ borderColor: 'var(--magenta)', color: 'var(--magenta)', background: 'transparent' }}>
                  Start Journey Again
              </button>
          </div>
      );
  }
  return null;
};

// ---- Phase 3: Classic Fallback ----
const ClassicPortfolio = ({ onRestart }) => {
  return (
      <div className="classic-body">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h1 style={{ color: '#1a0033', margin: 0 }}>John Doe - Portfolio</h1>
                  <button onClick={onRestart} style={{ padding: '10px 20px', cursor: 'pointer', background: '#1a0033', color: 'white', border: 'none', borderRadius: '5px' }}>Back to 3D View</button>
              </div>
              <hr style={{ borderColor: '#ccc' }} />
              <h2 style={{ color: '#00ffff', textShadow: '0 0 2px #00ffff', background: '#1a0033', padding: '10px', display: 'inline-block' }}>About Me</h2>
              <p>I bridge the gap between secure systems and immersive web experiences. Passionate about AIML, penetration testing, and building the future of the web.</p>
              
              <h2 style={{ color: '#ff00ff', textShadow: '0 0 2px #ff00ff', background: '#1a0033', padding: '10px', display: 'inline-block', marginTop: '20px' }}>Skills</h2>
              <ul>
                  <li>React, Three.js, Node.js</li>
                  <li>Python, Cybersecurity, Pentesting, AIML</li>
              </ul>
              
              <h2 style={{ color: '#00ffff', textShadow: '0 0 2px #00ffff', background: '#1a0033', padding: '10px', display: 'inline-block', marginTop: '20px' }}>Projects</h2>
              <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px', marginBottom: '10px', background: 'white', color: '#333' }}>
                  <h3 style={{ margin: '0 0 10px 0' }}>Project Sentinel</h3>
                  <p style={{ margin: 0 }}>Automated network anomaly detection system.</p>
              </div>
              <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px', background: 'white', color: '#333' }}>
                  <h3 style={{ margin: '0 0 10px 0' }}>CyberDash</h3>
                  <p style={{ margin: 0 }}>Real-time security analytics dashboard.</p>
              </div>
              
              <h2 style={{ color: '#ff00ff', textShadow: '0 0 2px #ff00ff', background: '#1a0033', padding: '10px', display: 'inline-block', marginTop: '20px' }}>Experience</h2>
              <p><strong>Security Analyst</strong> at CyberTech Inc (2024 - Present)</p>
              <p><strong>Frontend Developer</strong> at WebSolutions (2023 - 2024)</p>
          </div>
      </div>
  );
};

// ---- Main App Component ----
export default function App() {
  const [phase, setPhase] = useState(0);
  const [clickPos, setClickPos] = useState({x: 0, y: 0});

  const handleStart = (e) => {
      setClickPos({ x: e.clientX, y: e.clientY });
      setPhase(1);
  };

  return (
      <div style={{ width: '100%', height: '100%' }}>
          {phase === 0 && <EntryScreen onStart={handleStart} />}
          {phase === 1 && <CrackTransition pos={clickPos} onComplete={() => setPhase(2)} />}
          {phase === 2 && <ThreeWorld onSkip={() => setPhase(3)} onRestart={() => setPhase(0)} />}
          {phase === 3 && <ClassicPortfolio onRestart={() => setPhase(0)} />}
      </div>
  );
}
