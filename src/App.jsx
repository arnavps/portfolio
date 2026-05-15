import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Volume2 } from 'lucide-react';
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaTwitter, FaDribbble, FaGithub } from 'react-icons/fa';
import './index.css';

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
    <div style={{ maxWidth: '1800px', margin: '0 auto', padding: '0 5vw', position: 'relative' }}>
      
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
        <div className="blob" style={{ width: '800px', height: '800px', top: '-10%', right: '-5%' }}></div>
        
        <div style={{ position: 'relative', display: 'inline-block', width: '100%', zIndex: 2 }}>
          <h1 style={{ fontSize: '14vw', lineHeight: '0.85', margin: 0, letterSpacing: '-0.04em' }}>Arnav</h1>
          <h1 className="serif-italic" style={{ fontSize: '14vw', lineHeight: '0.85', margin: 0, transform: 'translateX(5vw)', letterSpacing: '-0.02em', color: '#111' }}>
            Shirwadkar.
          </h1>
          
          {/* Avatar & Bubble */}
          <div style={{ position: 'absolute', top: '15%', left: '55%', zIndex: 3, display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '14vw', height: '14vw', maxWidth: '180px', maxHeight: '180px', minWidth: '100px', minHeight: '100px', borderRadius: '50%', overflow: 'hidden', border: '6px solid #f7f7f7', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80" alt="Arnav" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ background: '#fff', padding: '16px 24px', borderRadius: '40px', marginLeft: '-24px', zIndex: -1, boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', fontWeight: 600 }}>
              <Volume2 size={18} /> Let's solve problems and create new ones
            </div>
          </div>
        </div>

        {/* Bio & Socials */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '4vw', flexWrap: 'wrap', gap: '20px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button className="icon-btn"><FaInstagram size={18} /></button>
              <button className="icon-btn"><FaFacebookF size={18} /></button>
              <button className="icon-btn"><FaTwitter size={18} /></button>
              <button className="icon-btn"><FaGithub size={18} /></button>
            </div>
            <button className="pill-btn" style={{ alignSelf: 'flex-start' }}>Contact Me</button>
          </div>
          
          <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p style={{ fontSize: '1.25rem', lineHeight: '1.6', margin: 0, color: 'var(--text-secondary)', fontWeight: 400 }}>
              Hello, I'm Arnav Shirwadkar, an experienced UI/UX Designer and Frontend Developer. I have successfully overseen numerous digital projects spanning various sectors. I'm eager to collaborate with you!
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" style={{ paddingTop: '100px' }}>
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
      <section id="projects" style={{ paddingTop: '160px' }}>
        <h2 className="section-title">Operations & Projects</h2>
        
        {/* Project 1 */}
        <div className="project-wrapper">
          <div className="project-header">
            <div>
              <h3 className="project-title">Project Name</h3>
              <p className="project-tagline">One-Line High-Level Tagline</p>
            </div>
            <div className="project-number">01/02</div>
          </div>
          
          <div className="tech-stack">
            <span>Tech 1</span> <span className="tech-separator">|</span>
            <span>Tech 2</span> <span className="tech-separator">|</span>
            <span>Tech 3</span> <span className="tech-separator">|</span>
            <span>Tech 4</span> <span className="tech-separator">|</span>
            <span>Key Feature/Domain</span> <span className="tech-separator">|</span>
            <span>Key Infrastructure</span>
          </div>

          <div className="project-silhouette">
            {/* REPLACE THIS IMAGE SOURCE WITH YOUR SCREENSHOT */}
            <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80" alt="Project Screenshot Placeholder" />
          </div>

          <p className="project-overview">
            A 2-3 sentence high-level overview explaining the core mission of the project, the primary problem it solves, and the ultimate value it provides to the end user. This placeholder text will be replaced by your actual project description.
          </p>
        </div>

        {/* Project 2 */}
        <div className="project-wrapper">
          <div className="project-header">
            <div>
              <h3 className="project-title">Another Project</h3>
              <p className="project-tagline">Secondary High-Level Tagline</p>
            </div>
            <div className="project-number">02/02</div>
          </div>
          
          <div className="tech-stack">
            <span>Python</span> <span className="tech-separator">|</span>
            <span>Docker</span> <span className="tech-separator">|</span>
            <span>AWS</span> <span className="tech-separator">|</span>
            <span>Vulnerability Scanning</span>
          </div>

          <div className="project-silhouette">
            {/* REPLACE THIS IMAGE SOURCE WITH YOUR SCREENSHOT */}
            <img src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=80" alt="Project 2 Placeholder" />
          </div>

          <p className="project-overview">
            A 2-3 sentence high-level overview explaining the core mission of the project, the primary problem it solves, and the ultimate value it provides to the end user. This placeholder text will be replaced by your actual project description.
          </p>
        </div>
      </section>

      {/* Experience Section */}
      <section style={{ paddingTop: '100px' }}>
        <h2 className="section-title">Experience</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          
          {/* Exp 1 */}
          <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '40px', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '50px', paddingBottom: '50px' }}>
            <div style={{ fontFamily: '"Courier New", monospace', padding: '10px 20px', background: 'rgba(0,0,0,0.05)', borderRadius: '4px', display: 'inline-block', justifySelf: 'start', height: 'fit-content', fontSize: '0.9rem', fontWeight: 600 }}>
              2023 - Current
            </div>
            <div>
              <h3 style={{ fontSize: '2rem', marginBottom: '10px', fontWeight: 700, letterSpacing: '-0.02em' }}>Security Researcher / Penetration Tester</h3>
              <h4 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '20px', fontWeight: 500 }}>Company Name</h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', maxWidth: '650px', fontSize: '1.15rem' }}>
                Conducted comprehensive vulnerability assessments and penetration testing on web applications and internal networks. Discovered and remediated critical security flaws.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Certs */}
      <section style={{ paddingTop: '100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '80px' }}>
          
          <div>
            <h2 className="section-title" style={{ marginBottom: '40px' }}>Education</h2>
            <div style={{ borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '30px', paddingBottom: '30px' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>B.S. Cybersecurity (Example)</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '8px' }}>University Name</p>
              <p style={{ fontFamily: '"Courier New", monospace', fontSize: '0.9rem', color: '#888' }}>2019 - 2023</p>
            </div>
          </div>

          <div>
            <h2 className="section-title" style={{ marginBottom: '40px' }}>Certifications</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fdfdfd', padding: '20px', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '8px' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>Offensive Security Certified Professional (OSCP)</span>
                <span style={{ fontFamily: '"Courier New", monospace', color: 'var(--text-secondary)' }}>Active</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fdfdfd', padding: '20px', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '8px' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>CompTIA Security+</span>
                <span style={{ fontFamily: '"Courier New", monospace', color: 'var(--text-secondary)' }}>Active</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section style={{ paddingTop: '100px' }}>
        <h2 className="section-title">Achievements</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          <div style={{ background: '#111', color: '#fff', padding: '40px', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '3rem', marginBottom: '10px', fontFamily: '"Courier New", monospace' }}>Top 1%</h3>
            <p style={{ fontSize: '1.2rem', color: '#aaa' }}>TryHackMe Global Ranking</p>
          </div>
          <div style={{ background: '#111', color: '#fff', padding: '40px', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '3rem', marginBottom: '10px', fontFamily: '"Courier New", monospace' }}>5+</h3>
            <p style={{ fontSize: '1.2rem', color: '#aaa' }}>Valid Bug Bounty Reports</p>
          </div>
          <div style={{ background: '#111', color: '#fff', padding: '40px', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '3rem', marginBottom: '10px', fontFamily: '"Courier New", monospace' }}>1st Place</h3>
            <p style={{ fontSize: '1.2rem', color: '#aaa' }}>University CTF Competition</p>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="quote-section">
        <h2 className="quote-text">
          "Amateurs hack systems, professionals hack people."
        </h2>
        <div className="quote-author">Bruce Schneier</div>
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
             <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80" alt="Johan" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
