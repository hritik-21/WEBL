import React, { useState, useEffect } from 'react';
import {
  Smile,
  CloudLightning,
  BatteryLow,
  Zap,
  BookOpen,
  Music,
  CheckCircle,
  Coffee,
  ChevronRight,
  ExternalLink,
  Target,
  Sparkles,
  ArrowRight,
  Play,
  SkipForward,
  Github,
  Twitter,
  Instagram,
  Send
} from 'lucide-react';
import './App.css';

const MOODS = {
  happy: {
    id: 'happy',
    label: 'Happy',
    icon: <Smile size={24} />,
    color: 'var(--accent-happy)',
    tagline: "Ride the wave of positive energy!",
    suggestions: {
      study: "Today is perfect for high-energy learning! Dive into creative projects, start a new course, or engage in group discussions. Your brain is wired for connection and synthesis right now. Try active recall techniques or teaching a concept to someone else to solidify your knowledge.",
      playlist: "https://open.spotify.com/embed/playlist/37i9dQZF1DXdPec7WLTqzq",
      queue: [
        { title: "Walking On Sunshine", artist: "Katrina & The Waves" },
        { title: "Happy", artist: "Pharrell Williams" },
        { title: "Good Vibrations", artist: "The Beach Boys" },
        { title: "Levitating", artist: "Dua Lipa" }
      ],
      tasks: [
        { task: "Draft a new project proposal", desc: "Use your optimism to pitch big ideas." },
        { task: "Record a video tutorial", desc: "Your natural energy will shine on camera." },
        { task: "Connect with 3 new mentors", desc: "Network while your confidence is peaking." },
        { task: "Plan a team-building outing", desc: "Share your positive vibes with the group." }
      ],
      breaks: "Engage in an 'Energy Burst' break. Put on a high-tempo track and dance for 5 minutes, or step outside and practice 10 jump squats in the sun. The goal is to keep the momentum going without burning out."
    }
  },
  stressed: {
    id: 'stressed',
    label: 'Stressed',
    icon: <CloudLightning size={24} />,
    color: 'var(--accent-stressed)',
    tagline: "Take a deep breath. We've got this.",
    suggestions: {
      study: "When stressed, focus on 'Micro-Learning'. Don't try to tackle huge chapters. Instead, review flashcards for 10 minutes or organize your existing notes. Categorizing information provides a sense of control and reduces cognitive load. Avoid new, complex topics until you feel centered.",
      playlist: "https://open.spotify.com/embed/playlist/37i9dQZF1DWZqd5YICuMqP",
      queue: [
        { title: "Weightless", artist: "Marconi Union" },
        { title: "Clair de Lune", artist: "Claude Debussy" },
        { title: "River Flows In You", artist: "Yiruma" },
        { title: "Sunset Lover", artist: "Petit Biscuit" }
      ],
      tasks: [
        { task: "Clear your physical workspace", desc: "External order creates internal calm." },
        { task: "Respond to 3 urgent emails", desc: "Knock out the high-pressure items first." },
        { task: "Update your time-tracking log", desc: "See exactly where your energy is going." },
        { task: "Automate one repetitive task", desc: "Reduce future stress by setting up a system." }
      ],
      breaks: "Practice the 4-7-8 breathing technique. Inhale for 4, hold for 7, exhale for 8. Alternatively, try a 'Digital Detox' break—leave your phone in another room and focus on the textures of a physical object for 5 minutes."
    }
  },
  lazy: {
    id: 'lazy',
    label: 'Lazy',
    icon: <BatteryLow size={24} />,
    color: 'var(--accent-lazy)',
    tagline: "Slow and steady wins the race.",
    suggestions: {
      study: "Low energy days are perfect for 'Passive Consumption'. Watch a high-quality documentary relative to your field, listen to an industry podcast while reclining, or read an inspiring biography. You don't always need to produce; sometimes, absorption is enough. Let the interest pull you in naturally.",
      playlist: "https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM3M",
      queue: [
        { title: "Coffee", artist: "Beabadoobee" },
        { title: "Death Bed", artist: "Powfu" },
        { title: "Sunday Morning", artist: "Maroon 5" },
        { title: "Banana Pancakes", artist: "Jack Johnson" }
      ],
      tasks: [
        { task: "Archive old slack/email threads", desc: "Low-stakes cleanup that feels productive." },
        { task: "Update your portfolio text", desc: "Tweak descriptions without heavy lifting." },
        { task: "Organize your desktop folders", desc: "Satisfying visual progress with minimal effort." },
        { task: "Curate a new inspiration board", desc: "Gather ideas for when the energy returns." }
      ],
      breaks: "Take a 'Horizontal Reset'. Lie flat on the floor or a bed for 15 minutes with no screens. Allow your mind to wander without a destination. If you feel like a nap, keep it to exactly 22 minutes to avoid sleep inertia."
    }
  },
  focused: {
    id: 'focused',
    label: 'Focused',
    icon: <Zap size={24} />,
    color: 'var(--accent-focused)',
    tagline: "Unleash your maximum productivity.",
    suggestions: {
      study: "You are in 'Deep Work' mode. Tackle the hardest, most complex part of your project right now. Eliminate all distractions and set a Pomodoro timer for 50 minutes of work followed by 10 minutes of rest. Use active problem-solving and logic-based learning. Your brain is a laser—use it.",
      playlist: "https://open.spotify.com/embed/playlist/37i9dQZF1DWWQRwui0ExPn",
      nowPlaying: {
        title: "Eternal Youth",
        artist: "RUDE",
        cover: "https://i.scdn.co/image/ab67616d0000b27376045d0f6f0592985f8f8ed9"
      },
      queue: [
        { title: "Midnight City", artist: "M83" },
        { title: "Harder, Better, Faster, Stronger", artist: "Daft Punk" },
        { title: "Power", artist: "Kanye West" },
        { title: "Starboy", artist: "The Weeknd" }
      ],
      tasks: [
        { task: "Write 1500 lines of core logic", desc: "The deep architecture requires this focus." },
        { task: "Debug the critical blocker", desc: "You have the patience for complex errors now." },
        { task: "Finalize the quarterly report", desc: "Review the data with your current precision." },
        { task: "Code a new feature prototype", desc: "Move from idea to execution in one sitting." }
      ],
      breaks: "Try a 'Physiological Reset'. Take a cold shower if possible, or splash ice-cold water on your face. This triggers the diving reflex and resets your nervous system, keeping you in the zone for the next deep block."
    }
  }
};

function App() {
  const [currentMood, setCurrentMood] = useState('happy');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  const moodData = MOODS[currentMood];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus(''), 3000);
    }, 1500);
  };

  return (
    <div className="app-wrapper">
      <div className="bg-gradient">
        <div
          className="gradient-sphere blob-1"
          style={{ background: moodData.color }}
        />
        <div
          className="gradient-sphere blob-2"
          style={{ background: moodData.color }}
        />
        <div
          className="gradient-sphere blob-3"
          style={{ background: moodData.color }}
        />
        <div
          className="grid-overlay"
        />
      </div>

      <nav className="navbar full-width">
        <div className="nav-container container">
          <div className="logo">
            <Zap className="logo-icon" style={{ color: moodData.color }} />
            <span>MoodFlow</span>
          </div>
          <div className="nav-links">
            <a href="#hero">Home</a>
            <a href="#planner">Planner</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      <header id="hero" className="hero-expanded container">
        <div className="hero-grid">
          <div className="hero-text-side">
            <h1 className="hero-title">
              Design Your Day Around <br />
              <span style={{ color: moodData.color }}>Your Feelings.</span>
            </h1>
            <p className="hero-subtitle">Optimize your workflow based on your emotional energy.</p>
            <div className="hero-actions">
              <button className="cta-btn" style={{ background: moodData.color }}>Get Started</button>
              <button className="secondary-btn">How it works</button>
            </div>
          </div>

          <div className="hero-interactive-side">
            <div className="mood-card-large glass">
              <p className="card-label">Set Your Current Vibe</p>
              <div className="mood-selector-vertical">
                {Object.values(MOODS).map((mood) => (
                  <button
                    key={mood.id}
                    className={`mood - btn - alt ${currentMood === mood.id ? 'active' : ''} `}
                    onClick={() => setCurrentMood(mood.id)}
                    style={{
                      '--btn-color': mood.color,
                      borderColor: currentMood === mood.id ? mood.color : 'rgba(255,255,255,0.1)'
                    }}
                  >
                    <div className="btn-icon" style={{ color: currentMood === mood.id ? mood.color : '#fff' }}>
                      {mood.icon}
                    </div>
                    <div className="btn-label">
                      <strong>{mood.label}</strong>
                      <span>{mood.id === 'happy' ? 'Energetic' : mood.id === 'stressed' ? 'Calm down' : mood.id === 'lazy' ? 'Casual' : 'Laser focus'}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="planner" className="planner-grid-section container">
        <div className="section-header-compact">
          <p className="section-label" style={{ color: moodData.color }}>Personalized Planner</p>
          <h2 className="tagline">{moodData.tagline}</h2>
        </div>

        <div className="compact-grid">
          {/* Card 1: Study */}
          <div className="grid-card glass animate-in" key={`study - ${currentMood} `}>
            <div className="grid-card-header">
              <div className="icon-box-small" style={{ background: `${moodData.color} 20`, color: moodData.color }}>
                <BookOpen size={24} />
              </div>
              <h3>Study Strategy</h3>
            </div>
            <div className="grid-card-content">
              <p>{moodData.suggestions.study}</p>
            </div>
          </div>

          {/* Card 2: Playlist */}
          <div className="grid-card glass animate-in" key={`playlist - ${currentMood} `}>
            <div className="grid-card-header">
              <div className="icon-box-small" style={{ background: `${moodData.color} 20`, color: moodData.color }}>
                <Music size={24} />
              </div>
              <h3>Mood Sync Audio</h3>
            </div>
            <div className="grid-card-content">
              {/* Custom Player UI */}
              <div className="custom-player glass">
                <div className="player-main">
                  <div className="album-art-wrapper">
                    <img
                      src={moodData.suggestions.nowPlaying?.cover || "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop"}
                      alt="Album Cover"
                      className="album-cover-img"
                    />
                  </div>
                  <div className="song-details">
                    <span className="current-song-title">{moodData.suggestions.nowPlaying?.title || "Lofi Afternoon"}</span>
                    <span className="current-song-artist">{moodData.suggestions.nowPlaying?.artist || "MoodFlow Curated"}</span>
                  </div>
                  <div className="player-controls">
                    <button className="ctrl-btn"><Play size={24} fill="currentColor" /></button>
                    <button className="ctrl-btn"><SkipForward size={24} fill="currentColor" /></button>
                  </div>
                </div>
              </div>

              <div className="mini-player-hidden">
                <iframe
                  src={moodData.suggestions.playlist}
                  width="100%"
                  height="80"
                  frameBorder="0"
                  allowFullScreen=""
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
              </div>

              <div className="mini-queue mt-4">
                <p className="mini-queue-label">Next Tracks:</p>
                <ul className="mini-queue-list">
                  {moodData.suggestions.queue.slice(0, 3).map((song, idx) => (
                    <li key={idx}><strong>{song.title}</strong> • {song.artist}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Card 3: Tasks */}
          <div className="grid-card glass animate-in" key={`tasks - ${currentMood} `}>
            <div className="grid-card-header">
              <div className="icon-box-small" style={{ background: `${moodData.color} 20`, color: moodData.color }}>
                <CheckCircle size={24} />
              </div>
              <h3>Task List</h3>
            </div>
            <div className="grid-card-content">
              <ul className="mini-task-list">
                {moodData.suggestions.tasks.map((item, idx) => (
                  <li key={idx}>
                    <span className="bullet-dot" style={{ background: moodData.color }}></span>
                    <div>
                      <strong>{item.task}</strong>
                      <p className="task-subtext">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 4: Breaks */}
          <div className="grid-card glass animate-in" key={`break-${currentMood} `}>
            <div className="grid-card-header">
              <div className="icon-box-small" style={{ background: `${moodData.color} 20`, color: moodData.color }}>
                <Coffee size={24} />
              </div>
              <h3>Perfect Reset</h3>
            </div>
            <div className="grid-card-content">
              <p>{moodData.suggestions.breaks}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section container">
        <div className="contact-card glass">
          <div className="contact-info">
            <h2>Let's Connect</h2>
            <p>Tell us how you're using MoodFlow or suggest a new mood!</p>
            <div className="social-links">
              <Github className="social-icon" />
              <Twitter className="social-icon" />
              <Instagram className="social-icon" />
            </div>
          </div>
          <form className="contact-form" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Your Feedback"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>
            <button type="submit" disabled={formStatus === 'sending'}>
              {formStatus === 'sending' ? 'Sending...' : (
                <>
                  Send Message <Send size={18} style={{ marginLeft: '10px' }} />
                </>
              )}
            </button>
            {formStatus === 'success' && <p className="success-msg">Message sent successfully!</p>}
          </form>
        </div>
      </section>

      <footer className="footer container">
        <p>&copy; 2026 MoodFlow. All rights reserved.</p>
        <div className="footer-links">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
