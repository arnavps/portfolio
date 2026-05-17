import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Volume2 } from 'lucide-react';
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaTwitter, FaDribbble, FaGithub } from 'react-icons/fa';
import './index.css';
import profilePic from './profilepic.png';

export default function App() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time as shown in design: e.g. 09:41 AM GMT+7
      const timeStr = now.toLocaleTimeString('en-US', { 
        timeZone: 'Asia/Jakarta', 
        hour12: true, 
        hour: '2-digit', 
        minute: '2-digit' 
      }) + ' GMT+7';
      setTime(timeStr);
    };
    updateTime();
    const int = setInterval(updateTime, 1000);
    return () => clearInterval(int);
  }, []);

  return (
    <div style={{ maxWidth: '1800px', margin: '0 auto', padding: '0 5vw', position: 'relative', overflow: 'hidden', boxSizing: 'border-box' }}>
      
      {/* Navbar */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid rgba(0,0,0,0.05)', flexWrap: 'wrap', gap: '20px' }}>
        <nav style={{ display: 'flex', gap: '40px' }}>
          <a href="#" className="nav-link">Home</a>
          <a href="#works" className="nav-link">Works</a>
          <a href="#bookmarks" className="nav-link">Bookmarks</a>
          <a href="#design-gallery" className="nav-link">Design Gallery</a>
        </nav>
        <div style={{ display: 'flex', gap: '40px', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>
          <div>Purwokerto, Indonesia</div>
          <div>{time}</div>
        </div>
      </header>

      {/* Hero */}
      <section style={{ paddingTop: '6vh', paddingBottom: '30px', position: 'relative' }}>
        <div className="blob" style={{ width: '800px', height: '800px', top: '-10%', right: '0', opacity: 0.4 }}></div>
        
        <div style={{ position: 'relative', display: 'inline-block', width: '100%', zIndex: 2 }}>
          <h1 style={{ fontSize: '14vw', lineHeight: '0.85', margin: 0, letterSpacing: '-0.04em' }}>Arnav</h1>
          <h1 className="serif-italic" style={{ fontSize: '14vw', lineHeight: '0.85', margin: 0, transform: 'translateX(5vw)', letterSpacing: '-0.02em', color: '#111' }}>
            Shirwadkar.
          </h1>
          
          {/* Avatar & Bubble */}
          <div style={{ position: 'absolute', top: '15%', left: '55%', zIndex: 3, display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '14vw', height: '14vw', maxWidth: '180px', maxHeight: '180px', minWidth: '100px', minHeight: '100px', borderRadius: '50%', overflow: 'hidden', border: '6px solid #f7f7f7', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
              <img src={profilePic} alt="Arnav" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.2)' }} />
            </div>
            <div style={{ background: '#fff', padding: '16px 24px', borderRadius: '40px', marginLeft: '-24px', zIndex: -1, boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', fontWeight: 600 }}>
              <Volume2 size={18} /> Let's solve problems and create new ones
            </div>
          </div>
        </div>

        {/* Bio & Socials */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '10vw', marginTop: '4vw', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button className="icon-btn"><FaInstagram size={18} /></button>
              <button className="icon-btn"><FaFacebookF size={18} /></button>
              <button className="icon-btn"><FaTwitter size={18} /></button>
              <button className="icon-btn"><FaGithub size={18} /></button>
            </div>
            <button className="pill-btn" style={{ alignSelf: 'flex-start' }}>Contact Me</button>
          </div>
          
          <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '20px', justifySelf: 'end', textAlign: 'right' }}>
            <p style={{ fontSize: '1.25rem', lineHeight: '1.6', margin: 0, color: 'var(--text-secondary)', fontWeight: 400 }}>
              Hello, I'm Arnav Shirwadkar, an experienced UI/UX Designer and Frontend Developer. I have successfully overseen numerous digital projects spanning various sectors. I'm eager to collaborate with you!
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" style={{ paddingTop: '80px' }}>
        <h2 className="section-title">Skills & Arsenal</h2>
        <div className="skills-grid">
          <div className="skill-card">
            <h3 className="skill-category">Offensive Security</h3>
            <ul className="skill-list">
              <li className="skill-item">Web Application Testing</li>
              <li className="skill-item">Reconnaissance</li>
              <li className="skill-item">Vulnerability Assessment</li>
              <li className="skill-item">OWASP Top 10</li>
              <li className="skill-item">Enumeration</li>
              <li className="skill-item">Basic Exploit Development</li>
            </ul>
          </div>
          <div className="skill-card">
            <h3 className="skill-category">Networking</h3>
            <ul className="skill-list">
              <li className="skill-item">TCP/IP</li>
              <li className="skill-item">DNS</li>
              <li className="skill-item">HTTP/HTTPS</li>
              <li className="skill-item">Routing & Switching</li>
              <li className="skill-item">Subnetting</li>
            </ul>
          </div>
          <div className="skill-card">
            <h3 className="skill-category">Tools</h3>
            <ul className="skill-list">
              <li className="skill-item">Burp Suite</li>
              <li className="skill-item">Nmap</li>
              <li className="skill-item">Wireshark</li>
              <li className="skill-item">Metasploit</li>
              <li className="skill-item">ffuf / gobuster</li>
              <li className="skill-item">sqlmap / nuclei</li>
            </ul>
          </div>
          <div className="skill-card">
            <h3 className="skill-category">Programming & Platforms</h3>
            <ul className="skill-list">
              <li className="skill-item">Python / Bash</li>
              <li className="skill-item">JavaScript / HTML/CSS</li>
              <li className="skill-item">Linux</li>
              <li className="skill-item">Git / Docker</li>
              <li className="skill-item">TryHackMe / Hack The Box</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" style={{ paddingTop: '80px' }}>
        <h2 className="section-title">Operations & Projects</h2>
        
        <div className="projects-container">
          {/* Project 1 */}
          <div className="project-wrapper">
            <div className="project-header">
              <div>
                <h3 className="project-title">Project Alpha</h3>
                <p className="project-tagline">Advanced Network Intrusion Detection</p>
              </div>
              <div className="project-number">01/04</div>
            </div>
            
            <div className="tech-stack">
              <span>Python</span> <span className="tech-separator">|</span>
              <span>Scapy</span> <span className="tech-separator">|</span>
              <span>ELK Stack</span> <span className="tech-separator">|</span>
              <span>Suricata</span> <span className="tech-separator">|</span>
              <span>Network Defense</span> <span className="tech-separator">|</span>
              <span>Linux</span>
            </div>

            <div className="project-silhouette">
              <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80" alt="Project 1" />
            </div>

            <p className="project-overview">
              An AI-driven intrusion detection system designed to identify and mitigate real-time network threats. It utilizes deep packet inspection and behavioral analysis to defend against zero-day exploits and sophisticated lateral movement.
            </p>
          </div>

          {/* Project 2 */}
          <div className="project-wrapper">
            <div className="project-header">
              <div>
                <h3 className="project-title">Project Beta</h3>
                <p className="project-tagline">Automated Penetration Testing Framework</p>
              </div>
              <div className="project-number">02/04</div>
            </div>
            
            <div className="tech-stack">
              <span>Go</span> <span className="tech-separator">|</span>
              <span>Docker</span> <span className="tech-separator">|</span>
              <span>Metasploit API</span> <span className="tech-separator">|</span>
              <span>Vulnerability Scanning</span> <span className="tech-separator">|</span>
              <span>Offensive Security</span>
            </div>

            <div className="project-silhouette">
              <img src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=80" alt="Project 2" />
            </div>

            <p className="project-overview">
              A modular framework that orchestrates complex attack chains to validate security controls. By simulating realistic adversary behavior, it provides actionable insights into defensive gaps and misconfigurations across hybrid environments.
            </p>
          </div>

          {/* Project 3 */}
          <div className="project-wrapper">
            <div className="project-header">
              <div>
                <h3 className="project-title">Project Gamma</h3>
                <p className="project-tagline">Cloud Security Posture Management</p>
              </div>
              <div className="project-number">03/04</div>
            </div>
            
            <div className="tech-stack">
              <span>Terraform</span> <span className="tech-separator">|</span>
              <span>AWS</span> <span className="tech-separator">|</span>
              <span>Cloud Custodian</span> <span className="tech-separator">|</span>
              <span>IAM Analysis</span> <span className="tech-separator">|</span>
              <span>Infrastructure as Code</span>
            </div>

            <div className="project-silhouette">
              <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80" alt="Project 3" />
            </div>

            <p className="project-overview">
              A comprehensive toolset for auditing and securing multi-cloud infrastructures. It automatically identifies overly permissive IAM policies, unencrypted storage, and exposed services, ensuring compliance with industry standards and best practices.
            </p>
          </div>

          {/* Project 4 */}
          <div className="project-wrapper">
            <div className="project-header">
              <div>
                <h3 className="project-title">Project Delta</h3>
                <p className="project-tagline">Zero Trust Architecture Implementation</p>
              </div>
              <div className="project-number">04/04</div>
            </div>
            
            <div className="tech-stack">
              <span>Kubernetes</span> <span className="tech-separator">|</span>
              <span>Istio</span> <span className="tech-separator">|</span>
              <span>OAuth2</span> <span className="tech-separator">|</span>
              <span>OPA</span> <span className="tech-separator">|</span>
              <span>Network Segmentation</span>
            </div>

            <div className="project-silhouette">
              <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80" alt="Project 4" />
            </div>

            <p className="project-overview">
              A reference implementation of a Zero Trust network for microservices. It enforces granular access control, mutual TLS, and continuous verification, significantly reducing the attack surface in cloud-native environments.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section style={{ paddingTop: '80px', paddingBottom: '60px' }}>
        <h2 className="section-title" style={{ marginBottom: '50px', fontSize: '2.8rem' }}>Experience</h2>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          borderLeft: '2px solid rgba(0,0,0,0.08)', 
          paddingLeft: '50px', 
          paddingRight: '50px', // Added symmetry on the right
          marginLeft: '10px' 
        }}>
          
          {/* Exp 1 */}
          <div style={{ position: 'relative', paddingBottom: '50px' }}>
            <div style={{ position: 'absolute', left: '-57px', top: '8px', width: '13px', height: '13px', borderRadius: '50%', background: '#111', border: '3px solid #f7f7f7', boxShadow: '0 0 0 1px rgba(0,0,0,0.1)' }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px', flexWrap: 'nowrap', gap: '20px' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0, letterSpacing: '-0.01em' }}>Security Researcher / Penetration Tester</h3>
              <span style={{ fontFamily: '"Courier New", monospace', fontSize: '0.85rem', fontWeight: 600, color: '#666', whiteSpace: 'nowrap' }}>2023 - Current</span>
            </div>
            <div style={{ fontSize: '1.05rem', color: '#111', marginBottom: '16px', fontWeight: 600 }}>Company Name</div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '1rem', margin: 0, width: '100%', display: 'block' }}>
              Conducted comprehensive vulnerability assessments and penetration testing on web applications and internal networks. Discovered and remediated critical security flaws, implemented advanced security protocols, and mentored junior staff on offensive security techniques.
            </p>
          </div>

          {/* Exp 2 */}
          <div style={{ position: 'relative', paddingBottom: '50px' }}>
            <div style={{ position: 'absolute', left: '-57px', top: '8px', width: '13px', height: '13px', borderRadius: '50%', background: '#888', border: '3px solid #f7f7f7', boxShadow: '0 0 0 1px rgba(0,0,0,0.1)' }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px', flexWrap: 'nowrap', gap: '20px' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0, letterSpacing: '-0.01em' }}>Junior Security Analyst</h3>
              <span style={{ fontFamily: '"Courier New", monospace', fontSize: '0.85rem', fontWeight: 600, color: '#666', whiteSpace: 'nowrap' }}>2022 - 2023</span>
            </div>
            <div style={{ fontSize: '1.05rem', color: '#111', marginBottom: '16px', fontWeight: 600 }}>Previous Company</div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '1rem', margin: 0, width: '100%', display: 'block' }}>
              Assisted in SOC operations, monitored security alerts, and participated in incident response. Performed initial triage and documentation of security incidents while developing automated scripts for log analysis.
            </p>
          </div>

          {/* Exp 3 */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '-57px', top: '8px', width: '13px', height: '13px', borderRadius: '50%', background: '#ccc', border: '3px solid #f7f7f7', boxShadow: '0 0 0 1px rgba(0,0,0,0.1)' }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px', flexWrap: 'nowrap', gap: '20px' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0, letterSpacing: '-0.01em' }}>Cybersecurity Intern</h3>
              <span style={{ fontFamily: '"Courier New", monospace', fontSize: '0.85rem', fontWeight: 600, color: '#666', whiteSpace: 'nowrap' }}>2021 - 2022</span>
            </div>
            <div style={{ fontSize: '1.05rem', color: '#111', marginBottom: '16px', fontWeight: 600 }}>Tech Solutions Inc.</div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '1rem', margin: 0, width: '100%', display: 'block' }}>
              Supported the security team in vulnerability scanning and patch management. Gained hands-on experience with network monitoring tools and security documentation standards.
            </p>
          </div>
        </div>
      </section>

      {/* Education */}
      <section style={{ paddingTop: '60px' }}>
        <h2 className="section-title">Education</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          <div style={{ borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '30px' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>B.Tech</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '8px' }}>University Name Placeholder</p>
            <p style={{ fontFamily: '"Courier New", monospace', fontSize: '0.9rem', color: '#888' }}>2021 - 2025</p>
          </div>
          <div style={{ borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '30px' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>HSC</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '8px' }}>High School Name Placeholder</p>
            <p style={{ fontFamily: '"Courier New", monospace', fontSize: '0.9rem', color: '#888' }}>2019 - 2021</p>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section style={{ paddingTop: '80px' }}>
        <h2 className="section-title">Certifications</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
          <div className="cert-silhouette">
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '10px' }}>OSCP</h3>
            <p style={{ color: '#aaa', fontFamily: '"Courier New", monospace' }}>Offensive Security Certified Professional</p>
          </div>
          <div className="cert-silhouette">
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '10px' }}>Security+</h3>
            <p style={{ color: '#aaa', fontFamily: '"Courier New", monospace' }}>CompTIA</p>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section style={{ paddingTop: '80px' }}>
        <h2 className="section-title">Achievements</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          <div style={{ background: '#111', color: '#fff', padding: '30px', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '2.5rem', marginBottom: '10px', fontFamily: '"Courier New", monospace' }}>Top 1%</h3>
            <p style={{ fontSize: '1.2rem', color: '#aaa' }}>TryHackMe Global Ranking</p>
          </div>
          <div style={{ background: '#111', color: '#fff', padding: '30px', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '2.5rem', marginBottom: '10px', fontFamily: '"Courier New", monospace' }}>5+</h3>
            <p style={{ fontSize: '1.2rem', color: '#aaa' }}>Valid Bug Bounty Reports</p>
          </div>
          <div style={{ background: '#111', color: '#fff', padding: '30px', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '2.5rem', marginBottom: '10px', fontFamily: '"Courier New", monospace' }}>1st Place</h3>
            <p style={{ fontSize: '1.2rem', color: '#aaa' }}>University CTF Competition</p>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="quote-section">
        <h2 className="quote-text">
          "Thinking like an attacker is not about the tool you use; it’s about figuring out how things connect in ways the creator never imagined."
        </h2>
      </section>
      
      {/* Footer */}
      <footer style={{ 
        background: '#0a0a0a', 
        color: '#fff', 
        width: '100vw', 
        marginLeft: 'calc(-50vw + 50%)', 
        padding: '120px 5vw 40px', 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative' }}>
          
          <h1 style={{ fontSize: 'min(16vw, 240px)', lineHeight: '0.9', margin: 0, zIndex: 2, position: 'relative', letterSpacing: '-0.04em' }}>Let's</h1>
          <h1 className="serif-italic" style={{ fontSize: 'min(16vw, 240px)', lineHeight: '0.9', margin: 0, zIndex: 2, position: 'relative', transform: 'translateX(10vw)', letterSpacing: '-0.02em', color: '#fff' }}>Collaborate</h1>
          
          {/* Footer Avatar */}
          <div style={{ position: 'absolute', top: '10%', right: '15%', width: 'min(20vw, 250px)', height: 'min(20vw, 250px)', borderRadius: '50%', overflow: 'hidden', border: '6px solid #222', zIndex: 1 }}>
             <img src={profilePic} alt="Arnav" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.2)' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '180px', fontSize: '0.85rem', color: '#888', textTransform: 'uppercase', fontWeight: 600 }}>
            <div>PURWOKERTO, INDONESIA</div>
            <div>{time}</div>
          </div>

        </div>
      </footer>
    </div>
  );
}
