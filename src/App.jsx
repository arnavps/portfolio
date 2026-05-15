import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Volume2 } from 'lucide-react';
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaTwitter, FaDribbble } from 'react-icons/fa';
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
      <section style={{ paddingTop: '10px', paddingBottom: '40px', position: 'relative' }}>
        <div className="blob" style={{ width: '800px', height: '800px', top: '-10%', right: '-5%' }}></div>
        
        <div style={{ position: 'relative', display: 'inline-block', width: '100%', zIndex: 2 }}>
          <h1 style={{ fontSize: 'min(16vw, 220px)', lineHeight: '0.8', margin: 0, letterSpacing: '-0.04em' }}>Arnav</h1>
          <h1 className="serif-italic" style={{ fontSize: 'min(16vw, 220px)', lineHeight: '0.8', margin: 0, transform: 'translateX(8vw)', letterSpacing: '-0.02em', color: '#111' }}>
            Shirwadkar.
          </h1>
          
          {/* Avatar & Bubble */}
          <div style={{ position: 'absolute', top: '15%', left: '48%', zIndex: 3, display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', border: '6px solid #f7f7f7', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80" alt="Arnav" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ background: '#fff', padding: '16px 24px', borderRadius: '40px', marginLeft: '-24px', zIndex: -1, boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', fontWeight: 600 }}>
              <Volume2 size={18} /> Let's solve problems and create new ones
            </div>
          </div>
        </div>

        {/* Bio & Socials */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '20px', flexWrap: 'wrap', gap: '20px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button className="icon-btn"><FaInstagram size={18} /></button>
            <button className="icon-btn"><FaFacebookF size={18} /></button>
            <button className="icon-btn"><FaLinkedinIn size={18} /></button>
            <button className="icon-btn"><FaTwitter size={18} /></button>
            <button className="icon-btn"><FaDribbble size={18} /></button>
          </div>
          <div style={{ maxWidth: '600px' }}>
            <p style={{ fontSize: '1.25rem', lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '40px', fontWeight: 400 }}>
              Hello, I'm Arnav Shirwadkar, an experienced UI/UX Designer and Frontend Developer. I have successfully overseen numerous digital projects spanning various sectors. I'm eager to collaborate with you!
            </p>
            <button className="pill-btn">Contact me</button>
          </div>
        </div>
      </section>

      {/* Works Grid */}
      <section id="works" style={{ paddingTop: '100px', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '60px' }}>
          
          {/* Project 1 */}
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.75rem', marginBottom: '8px' }}>ARTVISTA GALLERY</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Art Gallery Website</p>
            </div>
            <div className="project-card-image">
              <img src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80" alt="Artvista" />
              <button className="project-btn">
                <ArrowUpRight size={36} strokeWidth={1.5} />
              </button>
            </div>
          </div>
          
          {/* Project 2 */}
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.75rem', marginBottom: '8px' }}>PERUM</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Real Estate Dashboard</p>
            </div>
            <div className="project-card-image">
              <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80" alt="Perum" />
              <button className="project-btn">
                <ArrowUpRight size={36} strokeWidth={1.5} />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Experience Section */}
      <section style={{ padding: '120px 0 160px 0' }}>
        <h2 style={{ fontSize: '3.5rem', marginBottom: '80px', letterSpacing: '-0.03em' }}>Experience</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          
          {/* Exp 1 */}
          <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '40px', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '50px', paddingBottom: '50px' }}>
            <div style={{ padding: '10px 20px', background: 'rgba(0,0,0,0.05)', borderRadius: '30px', display: 'inline-block', justifySelf: 'start', height: 'fit-content', fontSize: '0.9rem', fontWeight: 600 }}>
              2021 - Current
            </div>
            <div>
              <h3 style={{ fontSize: '2rem', marginBottom: '20px', fontWeight: 700, letterSpacing: '-0.02em' }}>Senior UI/UX Designer at Vektora Studio</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', maxWidth: '650px', fontSize: '1.15rem' }}>
                Work on various UI/UX related projects across various business sectors. Driving design strategy and leading multiple successful product launches.
              </p>
            </div>
          </div>
          
          {/* Exp 2 */}
          <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '40px', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '50px', paddingBottom: '50px' }}>
            <div style={{ padding: '10px 20px', background: 'rgba(0,0,0,0.05)', borderRadius: '30px', display: 'inline-block', justifySelf: 'start', height: 'fit-content', fontSize: '0.9rem', fontWeight: 600 }}>
              2020 - 2021
            </div>
            <div>
              <h3 style={{ fontSize: '2rem', marginBottom: '20px', fontWeight: 700, letterSpacing: '-0.02em' }}>Webflow Developer at Hvolen Studio</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', maxWidth: '650px', fontSize: '1.15rem' }}>
                Take part in various web development related projects in various business sectors, specializing in high-fidelity interactive Webflow builds.
              </p>
            </div>
          </div>

        </div>
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
