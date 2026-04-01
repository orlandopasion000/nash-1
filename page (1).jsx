@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;900&family=DM+Mono:wght@300;400;500&family=Inter:wght@300;400;500;600&display=swap');

:root {
  --bg: #07070F;
  --surface: #0F0F1C;
  --surface2: #15152A;
  --border: rgba(255, 255, 255, 0.07);
  --border-accent: rgba(201, 168, 76, 0.3);
  --gold: #C9A84C;
  --gold-light: #E8C96A;
  --gold-dim: rgba(201, 168, 76, 0.15);
  --blue: #4A9EFF;
  --green: #50C878;
  --pink: #FF6B9D;
  --orange: #FF8C42;
  --red: #FF4B4B;
  --text: #E8E8F5;
  --text-dim: rgba(232, 232, 245, 0.5);
  --text-muted: rgba(232, 232, 245, 0.25);
  --font-display: 'Playfair Display', serif;
  --font-mono: 'DM Mono', monospace;
  --font-body: 'Inter', sans-serif;
  --radius: 16px;
  --radius-sm: 10px;
  --shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  --shadow-glow: 0 0 40px rgba(201, 168, 76, 0.15);
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

/* Noise texture overlay */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 0;
  opacity: 0.4;
}

/* Radial gradient backdrop */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  background: radial-gradient(ellipse 80% 60% at 50% -10%, rgba(201,168,76,0.08) 0%, transparent 60%),
              radial-gradient(ellipse 60% 40% at 80% 100%, rgba(74,158,255,0.06) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

/* ---- LAYOUT ---- */
.page {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  padding: 0 1.5rem;
}

.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 3rem 0;
}

/* ---- TYPOGRAPHY ---- */
.display {
  font-family: var(--font-display);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.mono {
  font-family: var(--font-mono);
  font-weight: 400;
}

/* ---- HEADER ---- */
.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--border);
}

.logo {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--gold);
  letter-spacing: 0.05em;
  text-decoration: none;
}

.logo span {
  color: var(--text-dim);
  font-weight: 300;
}

/* ---- HERO ---- */
.hero {
  text-align: center;
  padding: 4rem 0 3rem;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--gold-dim);
  border: 1px solid var(--border-accent);
  border-radius: 100px;
  padding: 0.4rem 1rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--gold);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.03em;
  margin-bottom: 1.2rem;
}

.hero-title .accent {
  color: var(--gold);
}

.hero-subtitle {
  font-size: 1.05rem;
  color: var(--text-dim);
  max-width: 480px;
  margin: 0 auto 2.5rem;
  line-height: 1.6;
}

/* ---- STATS BAR ---- */
.stats-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 1.2rem 2rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--gold);
  display: block;
}

.stat-label {
  font-size: 0.72rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-family: var(--font-mono);
}

.stat-divider {
  width: 1px;
  height: 2.5rem;
  background: var(--border);
}

/* ---- DOMAIN GRID ---- */
.domains-label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--text-muted);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 1.2rem;
}

.domains-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

/* ---- DOMAIN CARD ---- */
.domain-card {
  position: relative;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.25s ease;
  overflow: hidden;
  text-align: left;
}

.domain-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--card-glow, transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: var(--radius);
}

.domain-card:hover::before {
  opacity: 1;
}

.domain-card:hover {
  border-color: var(--card-color, var(--gold));
  transform: translateY(-3px);
  box-shadow: 0 12px 40px var(--card-glow);
}

.domain-card-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
  display: block;
}

.domain-card-tag {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--card-color);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 0.4rem;
}

.domain-card-name {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.domain-card-desc {
  font-size: 0.8rem;
  color: var(--text-dim);
  line-height: 1.5;
  margin-bottom: 1rem;
}

.domain-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.domain-card-count {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--text-muted);
}

.domain-card-score {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  padding: 0.25rem 0.7rem;
  border-radius: 100px;
  background: var(--gold-dim);
  color: var(--gold);
  border: 1px solid var(--border-accent);
}

.domain-card-arrow {
  color: var(--card-color);
  font-size: 1.2rem;
  transition: transform 0.2s;
}

.domain-card:hover .domain-card-arrow {
  transform: translateX(4px);
}

/* Mix mode card */
.mix-card {
  background: linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%);
  border: 1px solid var(--border-accent);
  border-radius: var(--radius);
  padding: 1.2rem 1.5rem;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.mix-card:hover {
  background: var(--gold-dim);
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow);
}

.mix-card-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.mix-card-icon {
  font-size: 1.5rem;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gold-dim);
  border: 1px solid var(--border-accent);
  border-radius: var(--radius-sm);
}

.mix-card-title {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
  color: var(--gold);
}

.mix-card-sub {
  font-size: 0.75rem;
  color: var(--text-dim);
  margin-top: 0.15rem;
}

/* ---- QUIZ PAGE ---- */
.quiz-page {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
}

.quiz-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--border);
  gap: 1rem;
  flex-wrap: wrap;
}

.quiz-back {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-dim);
  cursor: pointer;
  transition: color 0.2s;
  background: none;
  border: none;
  font-family: var(--font-body);
}

.quiz-back:hover {
  color: var(--text);
}

.quiz-domain-badge {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.35rem 1rem;
  border-radius: 100px;
  border: 1px solid currentColor;
}

.quiz-timer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 1.1rem;
  font-weight: 500;
}

.quiz-timer.warning {
  color: var(--red);
  animation: pulse 0.5s ease infinite alternate;
}

@keyframes pulse {
  from { opacity: 1; }
  to { opacity: 0.5; }
}

/* Progress bar */
.progress-track {
  height: 3px;
  background: var(--border);
  position: relative;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--gold), var(--gold-light));
  transition: width 0.4s ease;
  position: relative;
}

.progress-fill::after {
  content: '';
  position: absolute;
  right: 0;
  top: -3px;
  width: 10px;
  height: 10px;
  background: var(--gold-light);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--gold);
}

/* Quiz content */
.quiz-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 0;
  max-width: 700px;
  margin: 0 auto;
  width: 100%;
}

.question-counter {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--text-muted);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 1.2rem;
  align-self: flex-start;
}

.question-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 2rem;
  width: 100%;
  margin-bottom: 1.2rem;
}

.question-text {
  font-family: var(--font-mono);
  font-size: 0.95rem;
  font-weight: 400;
  line-height: 1.7;
  color: var(--text);
}

/* Options */
.options-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  margin-bottom: 1.2rem;
}

.option-btn {
  display: flex;
  align-items: flex-start;
  gap: 0.9rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 1rem 1.2rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  font-family: var(--font-body);
  color: var(--text);
  width: 100%;
}

.option-btn:hover:not(:disabled) {
  border-color: rgba(201, 168, 76, 0.4);
  background: var(--gold-dim);
}

.option-btn.selected {
  border-color: var(--gold);
  background: var(--gold-dim);
}

.option-btn.correct {
  border-color: var(--green);
  background: rgba(80, 200, 120, 0.12);
  color: var(--green);
}

.option-btn.wrong {
  border-color: var(--red);
  background: rgba(255, 75, 75, 0.1);
  color: var(--red);
  opacity: 0.7;
}

.option-btn:disabled {
  cursor: default;
}

.option-letter {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 500;
  color: var(--text-muted);
  min-width: 1.2rem;
  padding-top: 0.15rem;
  letter-spacing: 0.05em;
}

.option-btn.selected .option-letter,
.option-btn.correct .option-letter {
  color: inherit;
}

.option-text {
  font-size: 0.9rem;
  line-height: 1.5;
}

/* Feedback */
.feedback-card {
  width: 100%;
  padding: 1.2rem 1.5rem;
  border-radius: var(--radius-sm);
  margin-bottom: 1rem;
  border-left: 3px solid;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.feedback-card.correct {
  background: rgba(80, 200, 120, 0.08);
  border-color: var(--green);
}

.feedback-card.wrong {
  background: rgba(255, 75, 75, 0.06);
  border-color: var(--red);
}

.feedback-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.feedback-card.correct .feedback-header { color: var(--green); }
.feedback-card.wrong .feedback-header { color: var(--red); }

.feedback-text {
  font-size: 0.82rem;
  color: var(--text-dim);
  line-height: 1.6;
}

/* Next button */
.next-btn {
  background: linear-gradient(135deg, var(--gold), #B8913A);
  color: #0A0A12;
  border: none;
  border-radius: var(--radius-sm);
  padding: 0.9rem 2rem;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  align-self: flex-end;
  letter-spacing: 0.02em;
}

.next-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(201, 168, 76, 0.4);
}

.next-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
}

/* ---- RESULTS PAGE ---- */
.results-page {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  padding: 0 1.5rem;
}

.results-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 3rem 0;
}

.results-header {
  text-align: center;
  margin-bottom: 3rem;
}

.results-icon {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  display: block;
}

.results-title {
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 0.5rem;
}

.results-subtitle {
  color: var(--text-dim);
  font-size: 0.95rem;
}

.score-circle-wrapper {
  display: flex;
  justify-content: center;
  margin: 2.5rem 0;
}

.score-circle {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border: 3px solid var(--gold);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle, var(--gold-dim), transparent);
  box-shadow: 0 0 40px rgba(201,168,76,0.2);
}

.score-number {
  font-family: var(--font-display);
  font-size: 2.8rem;
  font-weight: 900;
  color: var(--gold);
  line-height: 1;
}

.score-denom {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 0.25rem;
}

.score-pct {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--gold);
  margin-top: 0.3rem;
}

.results-details {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.results-details-title {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 1rem;
}

.results-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--border);
  font-size: 0.875rem;
}

.results-row:last-child {
  border-bottom: none;
}

.results-row-label {
  color: var(--text-dim);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.results-row-val {
  font-family: var(--font-mono);
  font-weight: 500;
}

.results-row-val.pass { color: var(--green); }
.results-row-val.fail { color: var(--red); }
.results-row-val.neutral { color: var(--text); }

.results-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-primary {
  flex: 1;
  background: linear-gradient(135deg, var(--gold), #B8913A);
  color: #0A0A12;
  border: none;
  border-radius: var(--radius-sm);
  padding: 0.9rem 1.5rem;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 0.02em;
  min-width: 140px;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(201, 168, 76, 0.4);
}

.btn-secondary {
  flex: 1;
  background: transparent;
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 0.9rem 1.5rem;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 140px;
}

.btn-secondary:hover {
  border-color: var(--gold);
  color: var(--gold);
}

/* ---- RESPONSIVE ---- */
@media (max-width: 640px) {
  .hero-title { font-size: 2.2rem; }
  .stats-bar { gap: 1rem; }
  .stat-divider { display: none; }
  .domain-card-name { font-size: 1rem; }
  .quiz-content { padding: 1.5rem 0; }
  .question-card { padding: 1.5rem; }
  .question-text { font-size: 0.875rem; }
  .results-title { font-size: 1.8rem; }
  .score-circle { width: 130px; height: 130px; }
  .score-number { font-size: 2.2rem; }
}

/* ---- ANIMATIONS ---- */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in {
  animation: fadeIn 0.5s ease both;
}

.fade-in-1 { animation-delay: 0.1s; }
.fade-in-2 { animation-delay: 0.2s; }
.fade-in-3 { animation-delay: 0.3s; }
.fade-in-4 { animation-delay: 0.4s; }
.fade-in-5 { animation-delay: 0.5s; }
