import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  Shield, 
  Cpu, 
  Terminal, 
  Network, 
  Award, 
  BookOpen, 
  Clock, 
  Activity, 
  Send, 
  Globe, 
  AlertTriangle,
  Lock,
  Layers,
  ChevronRight,
  Database,
  ExternalLink
} from 'lucide-react';
import { FaLinkedinIn, FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';
import './index.css';
import profilePic from './profilepic.png';

export default function App() {
  const [time, setTime] = useState('');
  const [activeSection, setActiveSection] = useState('HOME');
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [contactSuccess, setContactSuccess] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format as high-end military/telemetry log time: e.g. 18:40:02 GMT+7
      const options = {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const timeStr = now.toLocaleTimeString('en-US', options) + ' GMT+7';
      setTime(timeStr);
    };
    updateTime();
    const int = setInterval(updateTime, 1000);
    return () => clearInterval(int);
  }, []);

  const handleInterestToggle = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setContactSuccess(true);
    setTimeout(() => setContactSuccess(false), 5000);
  };

  return (
    <div style={{ 
      backgroundColor: 'var(--bg-main)', 
      color: 'var(--text-primary)', 
      position: 'relative', 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      
      {/* Sticky frosted glass header / console */}
      <header style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 100, 
        backdropFilter: 'blur(12px)', 
        WebkitBackdropFilter: 'blur(12px)', 
        borderBottom: '1px solid var(--border)',
        backgroundColor: 'rgba(8, 8, 12, 0.75)',
        width: '100%'
      }}>
        <div style={{ 
          maxWidth: '1440px', 
          margin: '0 auto', 
          padding: '16px 24px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '15px' 
        }}>
          {/* Operator ID Node */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--accent)', 
              boxShadow: '0 0 10px var(--accent-glow)' 
            }} />
            <span style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '0.85rem', 
              letterSpacing: '0.1em', 
              fontWeight: 700 
            }}>
              ARNAV.SHIRVADKAR // SEC_OPS
            </span>
          </div>

          {/* Monospace Sticky Nav */}
          <nav style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <a href="#" className="nav-link" onClick={() => setActiveSection('HOME')}>ABOUT</a>
            <a href="#capabilities" className="nav-link" onClick={() => setActiveSection('CAPABILITIES')}>CAPABILITIES</a>
            <a href="#operations" className="nav-link" onClick={() => setActiveSection('OPERATIONS')}>OPERATIONS</a>
            <a href="#history" className="nav-link" onClick={() => setActiveSection('HISTORY')}>HISTORY</a>
            <a href="#credentials" className="nav-link" onClick={() => setActiveSection('CREDENTIALS')}>CREDENTIALS</a>
            <a href="#terminal" className="nav-link" onClick={() => setActiveSection('TERMINAL')}>TERMINAL</a>
          </nav>

          {/* Live Telemetry Status Widget */}
          <div style={{ 
            display: 'flex', 
            gap: '24px', 
            fontFamily: 'var(--font-mono)', 
            fontSize: '0.72rem', 
            color: 'var(--text-secondary)',
            textTransform: 'uppercase'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Globe size={12} color="var(--accent)" />
              <span>PURWOKERTO, ID</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={12} color="var(--accent)" />
              <span>{time}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px', width: '100%', flex: 1 }}>
        
        {/* Layered Tactical Hero */}
        <section style={{ 
          paddingTop: '8vh', 
          paddingBottom: '8vh', 
          position: 'relative', 
          borderBottom: '1px solid var(--border)'
        }}>
          {/* Scanline Effect */}
          <div className="scanning-line" />
          
          {/* Electric Spotlight */}
          <div className="blob" style={{ top: '-10%', right: '20%' }}></div>
          
          <div style={{ position: 'relative', zIndex: 2 }}>
            {/* Top Operational Heading */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              marginBottom: '24px', 
              fontFamily: 'var(--font-mono)' 
            }}>
              <span style={{ 
                color: 'var(--accent)', 
                background: 'var(--accent-dim)', 
                padding: '2px 8px', 
                borderRadius: '3px',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.1em'
              }}>
                [ STATUS: ACTIVE ]
              </span>
              <span className="telemetry-text">
                OFFENSIVE SECURITY ENGINEER • APPLICATION RECON • RED TEAMING
              </span>
            </div>

            {/* Large Clean Nameplate */}
            <div style={{ margin: '0 0 32px 0' }}>
              <h1 style={{ 
                fontSize: 'clamp(3rem, 8vw, 6.5rem)', 
                lineHeight: '0.9', 
                fontWeight: 800, 
                letterSpacing: '-0.04em',
                color: 'var(--text-primary)'
              }}>
                ARNAV
              </h1>
              <h1 style={{ 
                fontSize: 'clamp(3rem, 8vw, 6.5rem)', 
                lineHeight: '0.9', 
                fontWeight: 800, 
                letterSpacing: '-0.03em',
                color: 'transparent',
                WebkitTextStroke: '1px var(--text-primary)'
              }}>
                SHIRVADKAR.
              </h1>
            </div>

            {/* Tactical Columns */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '40px',
              marginTop: '40px'
            }}>
              {/* Operator Social Nodes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', justifyContent: 'center' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button className="icon-btn" onClick={() => window.open('https://github.com', '_blank')}><FaGithub size={18} /></button>
                  <button className="icon-btn" onClick={() => window.open('https://linkedin.com', '_blank')}><FaLinkedinIn size={18} /></button>
                  <button className="icon-btn" onClick={() => window.open('https://twitter.com', '_blank')}><FaTwitter size={18} /></button>
                  <button className="icon-btn" onClick={() => window.open('https://instagram.com', '_blank')}><FaInstagram size={18} /></button>
                </div>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <a href="#terminal" className="pill-btn">INITIATE DEPLOYMENT</a>
                  <span style={{ 
                    fontFamily: 'var(--font-mono)', 
                    fontSize: '0.7rem', 
                    color: 'var(--text-muted)' 
                  }}>
                    SYS_V: 1.0.4 // LOCAL
                  </span>
                </div>
              </div>

              {/* Tactical Bio Intro */}
              <div style={{ 
                borderLeft: '2px solid var(--accent)', 
                paddingLeft: '24px', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center' 
              }}>
                <p style={{ 
                  fontSize: '1.15rem', 
                  lineHeight: '1.6', 
                  color: 'var(--text-secondary)', 
                  fontWeight: 400 
                }}>
                  "Investigating system architectures, constructing automated security tooling, and executing offensive security research focused on understanding exactly how modern enterprise boundaries and trust logic fail."
                </p>
              </div>
            </div>

            {/* Technical Metadata Bar Strip */}
            <div style={{ 
              marginTop: '80px', 
              border: '1px solid var(--border)', 
              borderRadius: '4px',
              background: 'var(--bg-surface)',
              padding: '20px 24px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
              fontFamily: 'var(--font-mono)'
            }}>
              <div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>CORE_LOC</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>INDIA // AP-SOUTH-1</div>
              </div>
              <div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>FOCUS_VECTOR</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>WEB APP & CLOUD INT</div>
              </div>
              <div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>CURRENT_STATUS</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent)', animation: 'pulse 1.5s infinite' }} />
                  RESEARCHING LABS
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>CERT_TRACK</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>CEH → PNPT → OSCP</div>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section id="capabilities" style={{ paddingTop: '100px', paddingBottom: '100px', borderBottom: '1px solid var(--border)' }}>
          <h2 className="section-title">Tactical Capabilities</h2>
          <div className="skills-grid">
            
            {/* Panel 1 */}
            <div className="skill-card">
              <div className="skill-category">
                <span>OFFENSIVE SECURITY</span>
                <Shield size={16} color="var(--accent)" />
              </div>
              <ul className="skill-list">
                <li className="skill-item">Web Application Testing</li>
                <li className="skill-item">Reconnaissance & Intel</li>
                <li className="skill-item">Vulnerability Assessment</li>
                <li className="skill-item">OWASP Top 10 Auditing</li>
                <li className="skill-item">System Enumeration</li>
                <li className="skill-item">Exploit Delivery Logic</li>
              </ul>
            </div>

            {/* Panel 2 */}
            <div className="skill-card">
              <div className="skill-category">
                <span>NETWORKING LAYER</span>
                <Network size={16} color="var(--accent)" />
              </div>
              <ul className="skill-list">
                <li className="skill-item">TCP/IP Packet Profiling</li>
                <li className="skill-item">DNS & Protocol Hijack vectors</li>
                <li className="skill-item">HTTP/HTTPS Tunneling</li>
                <li className="skill-item">Routing Analysis</li>
                <li className="skill-item">Network Segmentation Audit</li>
              </ul>
            </div>

            {/* Panel 3 */}
            <div className="skill-card">
              <div className="skill-category">
                <span>OFFENSIVE TOOLKIT</span>
                <Terminal size={16} color="var(--accent)" />
              </div>
              <ul className="skill-list">
                <li className="skill-item">Burp Suite Professional</li>
                <li className="skill-item">Nmap Network Scanner</li>
                <li className="skill-item">Wireshark Packet Capture</li>
                <li className="skill-item">Metasploit Exploitation</li>
                <li className="skill-item">ffuf / Gobuster fuzzing</li>
                <li className="skill-item">Sqlmap & Nuclei scanners</li>
              </ul>
            </div>

            {/* Panel 4 */}
            <div className="skill-card">
              <div className="skill-category">
                <span>ENGINEERING DEPS</span>
                <Cpu size={16} color="var(--accent)" />
              </div>
              <ul className="skill-list">
                <li className="skill-item">Python Scripting & Automation</li>
                <li className="skill-item">Bash Command Pipeline</li>
                <li className="skill-item">JavaScript / HTML / CSS</li>
                <li className="skill-item">Docker Containment</li>
                <li className="skill-item">Linux Enterprise Admin</li>
              </ul>
            </div>

          </div>
        </section>

        {/* Projects / Operations Section */}
        <section id="operations" style={{ paddingTop: '100px', paddingBottom: '100px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '20px' }}>
            <h2 className="section-title">ACTIVE OPERATIONS DOSSIERS</h2>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              LOADED: 4 ACTIVE MISSION PROFILES
            </span>
          </div>

          <div className="projects-container" style={{ marginTop: '20px' }}>
            {/* Op 1 */}
            <div className="project-wrapper">
              <div>
                <div className="project-header" style={{ marginBottom: '8px' }}>
                  <h3 className="project-title" style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '0.95rem', lineHeight: '1.4' }}>
                    OP_ALPHA // DETECT – High-Fidelity Network Intrusion & Alert Agent
                  </h3>
                  <span className="project-number">OP-01</span>
                </div>
                
                <div style={{ 
                  fontFamily: 'var(--font-mono)', 
                  fontSize: '0.72rem', 
                  color: 'var(--accent)', 
                  letterSpacing: '0.05em',
                  marginBottom: '14px',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid var(--border)',
                  paddingBottom: '8px'
                }}>
                  Python | Scapy | ELK Stack | Suricata | Threat Parsing & Alerting | Linux Kernel API
                </div>
                
                <div className="project-silhouette">
                  <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80" alt="Operation Alpha" />
                  <div style={{ position: 'absolute', bottom: '10px', left: '10px', display: 'flex', gap: '6px' }}>
                    <span style={{ background: 'rgba(0,0,0,0.8)', border: '1px solid var(--border)', borderRadius: '3px', padding: '2px 6px', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>
                      STATUS: VERIFIED
                    </span>
                  </div>
                </div>

                <p className="project-overview" style={{ fontSize: '0.85rem', lineHeight: '1.6', color: 'var(--text-secondary)', marginTop: '14px' }}>
                  Designed as an automated network intrusion agent, this project acts to capture and isolate active lateral host movements in real-time. By implementing low-level packet heuristics alongside a deep-inspection engine, it eliminates the risk of silent threat actor reconnaissance. The ultimate value delivered to operators is a high-fidelity alert console that drops containment response windows from hours to seconds.
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                  <button className="pill-btn" style={{ flex: 1, justifyContent: 'center', padding: '8px' }}>
                    [ VIEW CASE FILE ]
                  </button>
                  <button className="icon-btn" onClick={() => window.open('https://github.com', '_blank')}>
                    <FaGithub size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Op 2 */}
            <div className="project-wrapper">
              <div>
                <div className="project-header" style={{ marginBottom: '8px' }}>
                  <h3 className="project-title" style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '0.95rem', lineHeight: '1.4' }}>
                    OP_BETA // AUTO_PENTEST – Orchestrated Threat Simulation Framework
                  </h3>
                  <span className="project-number">OP-02</span>
                </div>
                
                <div style={{ 
                  fontFamily: 'var(--font-mono)', 
                  fontSize: '0.72rem', 
                  color: 'var(--accent)', 
                  letterSpacing: '0.05em',
                  marginBottom: '14px',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid var(--border)',
                  paddingBottom: '8px'
                }}>
                  Go | Docker | Metasploit API | Recon Vector | Vulnerability Discovery | Isolated Sandboxes
                </div>
                
                <div className="project-silhouette">
                  <img src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=80" alt="Operation Beta" />
                  <div style={{ position: 'absolute', bottom: '10px', left: '10px', display: 'flex', gap: '6px' }}>
                    <span style={{ background: 'rgba(0,0,0,0.8)', border: '1px solid var(--border)', borderRadius: '3px', padding: '2px 6px', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>
                      STATUS: BUILDING
                    </span>
                  </div>
                </div>

                <p className="project-overview" style={{ fontSize: '0.85rem', lineHeight: '1.6', color: 'var(--text-secondary)', marginTop: '14px' }}>
                  This modular Go framework orchestrates concurrent adversarial scripts to simulate complex threat actor maneuvers across target environments. It systematically solves the manual bottleneck of asset auditing by automating vulnerability discovery and target compromise pathways. This provides offensive operators with rapid, standardized security postures and repeatable gap validations without interrupting live operations.
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                  <button className="pill-btn" style={{ flex: 1, justifyContent: 'center', padding: '8px' }}>
                    [ VIEW CASE FILE ]
                  </button>
                  <button className="icon-btn" onClick={() => window.open('https://github.com', '_blank')}>
                    <FaGithub size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Op 3 */}
            <div className="project-wrapper">
              <div>
                <div className="project-header" style={{ marginBottom: '8px' }}>
                  <h3 className="project-title" style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '0.95rem', lineHeight: '1.4' }}>
                    OP_GAMMA // CLOUD_POSTURE – Multi-Cloud IAM & Compliance Ledger
                  </h3>
                  <span className="project-number">OP-03</span>
                </div>
                
                <div style={{ 
                  fontFamily: 'var(--font-mono)', 
                  fontSize: '0.72rem', 
                  color: 'var(--accent)', 
                  letterSpacing: '0.05em',
                  marginBottom: '14px',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid var(--border)',
                  paddingBottom: '8px'
                }}>
                  Terraform | AWS Cloud | IAM Analyzer | Custodian | Configuration Monitoring | Multi-Tenant VPCs
                </div>
                
                <div className="project-silhouette">
                  <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80" alt="Operation Gamma" />
                  <div style={{ position: 'absolute', bottom: '10px', left: '10px', display: 'flex', gap: '6px' }}>
                    <span style={{ background: 'rgba(0,0,0,0.8)', border: '1px solid var(--border)', borderRadius: '3px', padding: '2px 6px', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>
                      STATUS: STANDBY
                    </span>
                  </div>
                </div>

                <p className="project-overview" style={{ fontSize: '0.85rem', lineHeight: '1.6', color: 'var(--text-secondary)', marginTop: '14px' }}>
                  This automation engine establishes continuous drift tracking and configuration audits across highly complex multi-cloud deployments. It actively mitigates the threat of exposed services and overly permissive trust loops by auto-remediating compliance violations in real-time. The final system provides security teams with an immutable audit trail and unified posture intelligence to prevent cloud data leaks.
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                  <button className="pill-btn" style={{ flex: 1, justifyContent: 'center', padding: '8px' }}>
                    [ VIEW CASE FILE ]
                  </button>
                  <button className="icon-btn" onClick={() => window.open('https://github.com', '_blank')}>
                    <FaGithub size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Op 4 */}
            <div className="project-wrapper">
              <div>
                <div className="project-header" style={{ marginBottom: '8px' }}>
                  <h3 className="project-title" style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '0.95rem', lineHeight: '1.4' }}>
                    OP_DELTA // ZERO_TRUST – Secure Microservices Mesh Architecture
                  </h3>
                  <span className="project-number">OP-04</span>
                </div>
                
                <div style={{ 
                  fontFamily: 'var(--font-mono)', 
                  fontSize: '0.72rem', 
                  color: 'var(--accent)', 
                  letterSpacing: '0.05em',
                  marginBottom: '14px',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid var(--border)',
                  paddingBottom: '8px'
                }}>
                  Kubernetes | Istio Service Mesh | OPA Core | OAuth2 | Mutual TLS (mTLS) | Encrypted Transit Gateways
                </div>
                
                <div className="project-silhouette">
                  <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80" alt="Operation Delta" />
                  <div style={{ position: 'absolute', bottom: '10px', left: '10px', display: 'flex', gap: '6px' }}>
                    <span style={{ background: 'rgba(0,0,0,0.8)', border: '1px solid var(--border)', borderRadius: '3px', padding: '2px 6px', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>
                      STATUS: COMPLETED
                    </span>
                  </div>
                </div>

                <p className="project-overview" style={{ fontSize: '0.85rem', lineHeight: '1.6', color: 'var(--text-secondary)', marginTop: '14px' }}>
                  This reference architecture secures enterprise-scale container communication by enforcing strict identity assertions on every request hop. It completely solves the vulnerability of implicit network trust by implementing mutual TLS encryption and fine-grained authorization gates. The core utility ensures that a compromised service remains isolated, fully protecting consumer data from unauthorized access.
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                  <button className="pill-btn" style={{ flex: 1, justifyContent: 'center', padding: '8px' }}>
                    [ VIEW CASE FILE ]
                  </button>
                  <button className="icon-btn" onClick={() => window.open('https://github.com', '_blank')}>
                    <FaGithub size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="history" style={{ paddingTop: '100px', paddingBottom: '100px', borderBottom: '1px solid var(--border)' }}>
          <h2 className="section-title">OPERATIONAL TIMELINE HISTORY</h2>
          
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            position: 'relative',
            marginTop: '40px'
          }}>
            {/* Central Glowing Cyber Core Line */}
            <div style={{ 
              position: 'absolute', 
              left: '12px', 
              top: '8px', 
              bottom: '8px', 
              width: '2px', 
              background: 'linear-gradient(180deg, var(--accent) 0%, rgba(77, 163, 255, 0.15) 100%)',
              boxShadow: '0 0 10px rgba(77, 163, 255, 0.2)'
            }} />

            {/* Role 1 */}
            <div style={{ 
              position: 'relative', 
              paddingLeft: '48px', 
              paddingBottom: '48px',
              display: 'grid',
              gridTemplateColumns: '120px 1fr',
              gap: '24px',
              alignItems: 'start'
            }}>
              {/* Core Node Marker */}
              <div style={{ 
                position: 'absolute', 
                left: '7px', 
                top: '6px', 
                width: '12px', 
                height: '12px', 
                borderRadius: '50%', 
                backgroundColor: 'var(--accent)', 
                border: '3px solid var(--bg-main)',
                boxShadow: '0 0 8px var(--accent-glow)',
                zIndex: 2
              }} />
              
              <div style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '0.85rem', 
                fontWeight: 600, 
                color: 'var(--accent)',
                marginTop: '3px'
              }}>
                2023 - CURRENT
              </div>
              
              <div style={{ 
                background: 'var(--bg-surface)', 
                border: '1px solid var(--border)', 
                borderRadius: '6px', 
                padding: '24px' 
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'baseline', 
                  flexWrap: 'wrap', 
                  gap: '10px', 
                  marginBottom: '12px' 
                }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
                    Security Researcher & Penetration Tester
                  </h3>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    // ON-SITE CONTRACT
                  </span>
                </div>
                <div style={{ 
                  fontFamily: 'var(--font-mono)', 
                  fontSize: '0.9rem', 
                  color: 'var(--text-secondary)', 
                  marginBottom: '16px',
                  fontWeight: 500
                }}>
                  RED COMMAND SECURITY SERVICES
                </div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem', margin: 0 }}>
                  Conducted threat reconnaissance modeling, executed regular black-box web app vulnerability audits, discovered deep server logic failures, built custom payloads to bypass restrictive filters, and mentored junior assets on modern cyber threat landscapes.
                </p>
              </div>
            </div>

            {/* Role 2 */}
            <div style={{ 
              position: 'relative', 
              paddingLeft: '48px', 
              paddingBottom: '48px',
              display: 'grid',
              gridTemplateColumns: '120px 1fr',
              gap: '24px',
              alignItems: 'start'
            }}>
              {/* Core Node Marker */}
              <div style={{ 
                position: 'absolute', 
                left: '7px', 
                top: '6px', 
                width: '12px', 
                height: '12px', 
                borderRadius: '50%', 
                backgroundColor: 'var(--text-muted)', 
                border: '3px solid var(--bg-main)',
                zIndex: 2
              }} />
              
              <div style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '0.85rem', 
                fontWeight: 600, 
                color: 'var(--text-secondary)',
                marginTop: '3px'
              }}>
                2022 - 2023
              </div>
              
              <div style={{ 
                background: 'var(--bg-surface)', 
                border: '1px solid var(--border)', 
                borderRadius: '6px', 
                padding: '24px' 
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'baseline', 
                  flexWrap: 'wrap', 
                  gap: '10px', 
                  marginBottom: '12px' 
                }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
                    Junior Security Analyst
                  </h3>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    // SOC OPERATIONS
                  </span>
                </div>
                <div style={{ 
                  fontFamily: 'var(--font-mono)', 
                  fontSize: '0.9rem', 
                  color: 'var(--text-secondary)', 
                  marginBottom: '16px',
                  fontWeight: 500
                }}>
                  INTELLIGENT DEFENSE CORP
                </div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem', margin: 0 }}>
                  Assisted in Security Operation Center telemetry routing, logged host events, triaged incoming malware reports, and wrote automated bash pipelines to quickly analyze server authentication attempts.
                </p>
              </div>
            </div>

            {/* Role 3 */}
            <div style={{ 
              position: 'relative', 
              paddingLeft: '48px',
              display: 'grid',
              gridTemplateColumns: '120px 1fr',
              gap: '24px',
              alignItems: 'start'
            }}>
              {/* Core Node Marker */}
              <div style={{ 
                position: 'absolute', 
                left: '7px', 
                top: '6px', 
                width: '12px', 
                height: '12px', 
                borderRadius: '50%', 
                backgroundColor: 'var(--text-muted)', 
                border: '3px solid var(--bg-main)',
                zIndex: 2
              }} />
              
              <div style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '0.85rem', 
                fontWeight: 600, 
                color: 'var(--text-secondary)',
                marginTop: '3px'
              }}>
                2021 - 2022
              </div>
              
              <div style={{ 
                background: 'var(--bg-surface)', 
                border: '1px solid var(--border)', 
                borderRadius: '6px', 
                padding: '24px' 
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'baseline', 
                  flexWrap: 'wrap', 
                  gap: '10px', 
                  marginBottom: '12px' 
                }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
                    Cybersecurity Intern
                  </h3>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    // LOGISTICS & PATCH
                  </span>
                </div>
                <div style={{ 
                  fontFamily: 'var(--font-mono)', 
                  fontSize: '0.9rem', 
                  color: 'var(--text-secondary)', 
                  marginBottom: '16px',
                  fontWeight: 500
                }}>
                  TECH SOLUTIONS INC.
                </div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem', margin: 0 }}>
                  Assisted internal teams on patch deployment cycles, scheduled Nmap auditing passes across developer dev machines, and maintained documentation catalogs of existing system dependencies.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Academic Background Section */}
        <section style={{ paddingTop: '100px', paddingBottom: '100px', borderBottom: '1px solid var(--border)' }}>
          <h2 className="section-title">ACADEMIC BACKGROUND</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginTop: '30px' }}>
            
            {/* Degree 1 */}
            <div style={{ 
              border: '1px solid var(--border)', 
              borderRadius: '6px',
              background: 'var(--bg-surface)', 
              padding: '30px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', display: 'block', marginBottom: '8px' }}>
                  // DEGREE PROFILE
                </span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '12px', letterSpacing: '-0.01em' }}>
                  Bachelor of Technology (B.Tech)
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '12px' }}>
                  University Name Placeholder
                </p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
                  YEARS: 2021 - 2025 // STATUS: CONCLUDING
                </p>
              </div>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
                  FOCUS CODES
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-secondary)', background: 'var(--bg-main)', border: '1px solid var(--border)', padding: '2px 6px', borderRadius: '2px' }}>
                    CompSci Fundamentals
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-secondary)', background: 'var(--bg-main)', border: '1px solid var(--border)', padding: '2px 6px', borderRadius: '2px' }}>
                    Information Security
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-secondary)', background: 'var(--bg-main)', border: '1px solid var(--border)', padding: '2px 6px', borderRadius: '2px' }}>
                    Network Structures
                  </span>
                </div>
              </div>
            </div>

            {/* Degree 2 */}
            <div style={{ 
              border: '1px solid var(--border)', 
              borderRadius: '6px',
              background: 'var(--bg-surface)', 
              padding: '30px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', display: 'block', marginBottom: '8px' }}>
                  // SECONDARY PROFILE
                </span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '12px', letterSpacing: '-0.01em' }}>
                  Higher Secondary Certificate (HSC)
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '12px' }}>
                  High School Name Placeholder
                </p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
                  YEARS: 2019 - 2021 // STATUS: VERIFIED
                </p>
              </div>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
                  FOCUS CODES
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-secondary)', background: 'var(--bg-main)', border: '1px solid var(--border)', padding: '2px 6px', borderRadius: '2px' }}>
                    Mathematics & Calculus
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-secondary)', background: 'var(--bg-main)', border: '1px solid var(--border)', padding: '2px 6px', borderRadius: '2px' }}>
                    Physics
                  </span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Credentials & Certifications Section */}
        <section id="credentials" style={{ paddingTop: '100px', paddingBottom: '100px', borderBottom: '1px solid var(--border)' }}>
          <h2 className="section-title">VERIFIED OPERATOR ROADMAP</h2>
          
          {/* Progress Timeline Matrix */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
            gap: '24px', 
            marginTop: '30px' 
          }}>
            
            {/* Cert 1 */}
            <div style={{ 
              background: 'var(--bg-surface)', 
              border: '1px solid var(--border)', 
              borderRadius: '6px', 
              padding: '24px',
              position: 'relative' 
            }}>
              <span style={{ 
                position: 'absolute', 
                top: '16px', 
                right: '16px', 
                fontFamily: 'var(--font-mono)', 
                fontSize: '0.65rem', 
                color: '#22c55e', 
                background: 'rgba(34, 197, 94, 0.1)', 
                padding: '2px 8px', 
                borderRadius: '3px',
                fontWeight: 600
              }}>
                COMPLETED
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '16px' }}>
                ID: COMP-SECPLUS
              </span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>
                Security+
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)', marginBottom: '16px' }}>
                ISSUED BY: CompTIA
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                Validated core foundational competence in network architecture, cryptographic application protocols, threat response, and basic risk logic.
              </p>
            </div>

            {/* Cert 2 */}
            <div style={{ 
              background: 'var(--bg-surface)', 
              border: '1px solid var(--accent)', 
              borderRadius: '6px', 
              padding: '24px',
              position: 'relative',
              boxShadow: '0 0 15px rgba(77, 163, 255, 0.05)'
            }}>
              <span style={{ 
                position: 'absolute', 
                top: '16px', 
                right: '16px', 
                fontFamily: 'var(--font-mono)', 
                fontSize: '0.65rem', 
                color: 'var(--accent)', 
                background: 'var(--accent-dim)', 
                padding: '2px 8px', 
                borderRadius: '3px',
                fontWeight: 600
              }}>
                IN PROGRESS
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '16px' }}>
                ID: EC-CEH
              </span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>
                CEH (ANSI)
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)', marginBottom: '16px' }}>
                TARGET: MID-2026
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                Refining methodology vectors mapping against systematic enterprise system scanning, vulnerability mapping, and general offensive protocols.
              </p>
            </div>

            {/* Cert 3 */}
            <div style={{ 
              background: 'var(--bg-surface)', 
              border: '1px solid var(--border)', 
              borderRadius: '6px', 
              padding: '24px',
              position: 'relative' 
            }}>
              <span style={{ 
                position: 'absolute', 
                top: '16px', 
                right: '16px', 
                fontFamily: 'var(--font-mono)', 
                fontSize: '0.65rem', 
                color: 'var(--text-muted)', 
                background: 'rgba(255,255,255,0.03)', 
                padding: '2px 8px', 
                borderRadius: '3px',
                fontWeight: 600
              }}>
                TARGET
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '16px' }}>
                ID: SEC-PNPT
              </span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>
                PNPT
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)', marginBottom: '16px' }}>
                ROADMAP TARGET
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                Practical network penetration testing certification focusing on external recon sweeps, AD exploitation sequences, and technical report writing.
              </p>
            </div>

            {/* Cert 4 */}
            <div style={{ 
              background: 'var(--bg-surface)', 
              border: '1px solid var(--border)', 
              borderRadius: '6px', 
              padding: '24px',
              position: 'relative' 
            }}>
              <span style={{ 
                position: 'absolute', 
                top: '16px', 
                right: '16px', 
                fontFamily: 'var(--font-mono)', 
                fontSize: '0.65rem', 
                color: 'var(--text-muted)', 
                background: 'rgba(255,255,255,0.03)', 
                padding: '2px 8px', 
                borderRadius: '3px',
                fontWeight: 600
              }}>
                TARGET
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '16px' }}>
                ID: OFFSEC-OSCP
              </span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>
                OSCP
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)', marginBottom: '16px' }}>
                ROADMAP TARGET
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                Rigorous 24-hour hands-on network system compromise exam validating advanced penetration testing, payload delivery, and exploit scripting.
              </p>
            </div>

          </div>
        </section>

        {/* Achievements Section */}
        <section style={{ paddingTop: '100px', paddingBottom: '100px', borderBottom: '1px solid var(--border)' }}>
          <h2 className="section-title">THREAT LEDGER & LOGS</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginTop: '30px' }}>
            
            {/* Ach 1 */}
            <div style={{ 
              border: '1px solid var(--border)', 
              borderRadius: '6px', 
              background: 'var(--bg-surface)', 
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600 }}>
                    // LOG_ENTRY: THM_01
                  </span>
                  <Award size={18} color="var(--accent)" />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '10px' }}>
                  Top 1% Global Rank
                </h3>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  PLATFORM: TRYHACKME
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Ranked within the top 1% of registered operators globally, systematically solving capture-the-flag challenges in offensive scripting, malware triage, and systems intrusion.
                </p>
              </div>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '14px', marginTop: '20px', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)' }}>
                ▶ VERIFIED CHALLENGE POINTS LOADED
              </div>
            </div>

            {/* Ach 2 */}
            <div style={{ 
              border: '1px solid var(--border)', 
              borderRadius: '6px', 
              background: 'var(--bg-surface)', 
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600 }}>
                    // LOG_ENTRY: BOUNTY_05
                  </span>
                  <Lock size={18} color="var(--accent)" />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '10px' }}>
                  5+ Valid Bug Reports
                </h3>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  PLATFORM: RESPONSIBLE DISCLOSURE
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Successfully identified, documented, and responsibly reported 5+ high-priority vulnerabilities in active web structures helping lock public endpoints down.
                </p>
              </div>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '14px', marginTop: '20px', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)' }}>
                ▶ DISCLOSURE COGNIZANCE REGISTERED
              </div>
            </div>

            {/* Ach 3 */}
            <div style={{ 
              border: '1px solid var(--border)', 
              borderRadius: '6px', 
              background: 'var(--bg-surface)', 
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600 }}>
                    // LOG_ENTRY: CTF_LEAGUE
                  </span>
                  <Terminal size={18} color="var(--accent)" />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '10px' }}>
                  1st Place CTF Winner
                </h3>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  PLATFORM: UNIVERSITY SEC LEAGUE
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Steered the core offensive payload team to victory in the university-wide capture the flag competition, cracking logic bugs, reversing compiled targets, and resolving cipher files.
                </p>
              </div>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '14px', marginTop: '20px', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)' }}>
                ▶ ACADEMIC COMMAND MATRIX VERIFIED
              </div>
            </div>

          </div>
        </section>

        {/* Analytical Quote Section */}
        <section className="quote-section">
          <div className="quote-text">
            "Security is not about having tools. It is about understanding trust boundaries, identifying assumptions, and testing them until they fail."
          </div>
          <div className="quote-author">
            // ARNAV SHIRVADKAR // PRINCIPLE_01
          </div>
        </section>

        {/* Initiate Contact Terminal CTA */}
        <section id="terminal" style={{ paddingTop: '100px', paddingBottom: '120px' }}>
          <div style={{ 
            border: '1px solid var(--border)', 
            borderRadius: '6px', 
            background: 'var(--bg-surface)',
            overflow: 'hidden'
          }}>
            {/* Terminal Window Header Bar */}
            <div style={{ 
              background: 'var(--bg-surface-elevated)', 
              borderBottom: '1px solid var(--border)',
              padding: '12px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#eab308' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '12px' }}>
                  CONSOLE://SEC_COMM_ESTABLISH
                </span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                SSL_ENCRYPTED_256BIT
              </span>
            </div>

            {/* Terminal Body Content */}
            <div style={{ padding: '40px 30px' }}>
              <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                
                <h2 style={{ 
                  fontSize: '2rem', 
                  fontWeight: 700, 
                  marginBottom: '16px', 
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                  fontFamily: 'var(--font-sans)'
                }}>
                  INITIATE_CONTACT()
                </h2>
                
                <p style={{ 
                  color: 'var(--text-secondary)', 
                  lineHeight: '1.6', 
                  marginBottom: '32px',
                  fontSize: '0.95rem'
                }}>
                  Target operational parameters for collaboration, deep research integrations, security audits, or tooling setups. Choose target directives below to establish active telemetry pipelines.
                </p>

                <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  
                  {/* Select Directives Parameters */}
                  <div>
                    <span style={{ 
                      fontFamily: 'var(--font-mono)', 
                      fontSize: '0.7rem', 
                      color: 'var(--text-muted)', 
                      display: 'block', 
                      marginBottom: '12px',
                      textTransform: 'uppercase'
                    }}>
                      [ SELECT TARGET DIRECTIVES ]
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {[
                        'OFFENSIVE SECURITY',
                        'TOOLING DEVELOPMENT',
                        'RESEARCH COOPERATION',
                        'INTERNSHIPS / CAREERS',
                        'INFRASTRUCTURE AUDITING'
                      ].map(param => {
                        const isChecked = selectedInterests.includes(param);
                        return (
                          <div key={param}>
                            <input 
                              type="checkbox" 
                              id={`param-${param}`}
                              className="terminal-checkbox"
                              checked={isChecked}
                              onChange={() => handleInterestToggle(param)}
                            />
                            <label 
                              htmlFor={`param-${param}`}
                              className="terminal-checkbox-label"
                            >
                              {param}
                            </label>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Input Telemetry Details */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                    gap: '20px' 
                  }}>
                    <div>
                      <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                        OPERATOR_NAME *
                      </label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Anonymous" 
                        style={{ 
                          width: '100%', 
                          background: 'var(--bg-main)', 
                          border: '1px solid var(--border)', 
                          borderRadius: '4px', 
                          padding: '12px 16px', 
                          color: 'var(--text-primary)', 
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.85rem'
                        }} 
                      />
                    </div>
                    <div>
                      <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                        CONTACT_EMAIL *
                      </label>
                      <input 
                        type="email" 
                        required 
                        placeholder="operator@system.domain" 
                        style={{ 
                          width: '100%', 
                          background: 'var(--bg-main)', 
                          border: '1px solid var(--border)', 
                          borderRadius: '4px', 
                          padding: '12px 16px', 
                          color: 'var(--text-primary)', 
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.85rem'
                        }} 
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                      OPERATIONAL_MESSAGE_BURST *
                    </label>
                    <textarea 
                      required 
                      rows={5} 
                      placeholder="Outline mission profile, target boundary variables, or research goals..." 
                      style={{ 
                        width: '100%', 
                        background: 'var(--bg-main)', 
                        border: '1px solid var(--border)', 
                        borderRadius: '4px', 
                        padding: '12px 16px', 
                        color: 'var(--text-primary)', 
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.85rem',
                        resize: 'none'
                      }} 
                    />
                  </div>

                  {contactSuccess && (
                    <div style={{ 
                      background: 'rgba(34, 197, 94, 0.1)', 
                      border: '1px solid #22c55e', 
                      borderRadius: '4px', 
                      padding: '16px',
                      color: '#22c55e',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
                      TELEMETRY BURST SENT SUCCESSFULLY. CONSOLE AWAITING INCOMING RESPONSE.
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                    <button type="submit" className="pill-btn">
                      <Send size={14} /> TRANSMIT ENCRYPTED BURST
                    </button>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                      BY TRANSMITTING, YOU COMPLY WITH DIRECTIVE 44-SEC
                    </span>
                  </div>

                </form>

              </div>
            </div>

          </div>
        </section>

      </main>

      {/* High-End Technical System Footer */}
      <footer style={{ 
        borderTop: '1px solid var(--border)', 
        backgroundColor: 'var(--bg-darker)', 
        padding: '60px 0 40px',
        width: '100%'
      }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px' }}>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '40px',
            marginBottom: '40px'
          }}>
            {/* Left Node */}
            <div>
              <div style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '0.9rem', 
                fontWeight: 700, 
                color: 'var(--text-primary)',
                marginBottom: '12px' 
              }}>
                ARNAV SHIRVADKAR // SEC_ENG
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '350px', lineHeight: '1.5' }}>
                Securing application surfaces and mapping complex vulnerabilities through coordinated offensive security sequences.
              </p>
            </div>

            {/* Center Node: Navigation */}
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent)', fontWeight: 600, marginBottom: '16px', textTransform: 'uppercase' }}>
                [ SYSTEM LINKS ]
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }} className="nav-link">BACK TO TOP</a>
                <a href="#capabilities" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }} className="nav-link">CAPABILITIES</a>
                <a href="#operations" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }} className="nav-link">CASE DOSSIERS</a>
                <a href="#history" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }} className="nav-link">HISTORY</a>
              </div>
            </div>

            {/* Right Node: Network Status */}
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent)', fontWeight: 600, marginBottom: '16px', textTransform: 'uppercase' }}>
                [ NETWORK STATUS ]
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <div>GATEWAY: active.arnav.ops</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  SECURE COMPLIANCE: 
                  <span style={{ color: '#22c55e', background: 'rgba(34, 197, 94, 0.1)', padding: '1px 6px', borderRadius: '2px', fontSize: '0.65rem' }}>
                    100% SECURE
                  </span>
                </div>
                <div>LOCAL SIGN: PGP_KEY_8146F</div>
              </div>
            </div>
          </div>

          <hr style={{ borderColor: 'var(--border)', margin: '40px 0 20px' }} />

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            flexWrap: 'wrap', 
            gap: '15px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)'
          }}>
            <div>
              © {new Date().getFullYear()} ARNAV SHIRVADKAR. ALL PRIVILEGES RESERVED.
            </div>
            <div>
              [ BUILT TO AUDIT SYSTEM TRUST VECTOR BOUNDARIES ]
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
