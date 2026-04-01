'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import questions from '@/data/questions'

const DOMAINS = Object.values(questions)

export default function HomePage() {
  const router = useRouter()
  const [scores, setScores] = useState({})

  useEffect(() => {
    try {
      const saved = localStorage.getItem('nash-scores')
      if (saved) setScores(JSON.parse(saved))
    } catch {}
  }, [])

  const totalAttempts = Object.values(scores).reduce((sum, s) => sum + (s?.attempts || 0), 0)
  const totalCorrect = Object.values(scores).reduce((sum, s) => sum + (s?.correct || 0), 0)
  const totalQs = DOMAINS.reduce((sum, d) => sum + d.questions.length, 0)
  const overallPct = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0

  const getDomainScore = (domainId) => scores[domainId]

  const startQuiz = (domainId) => {
    router.push(`/quiz?domain=${domainId}`)
  }

  const startMix = () => {
    router.push('/quiz?domain=mix')
  }

  const clearProgress = () => {
    if (confirm('Clear all progress? This cannot be undone.')) {
      localStorage.removeItem('nash-scores')
      setScores({})
    }
  }

  return (
    <div className="page">
      <div className="container">

        {/* Header */}
        <header className="site-header fade-in">
          <span className="logo">NASH <span>Reviewer</span></span>
          {totalAttempts > 0 && (
            <button
              onClick={clearProgress}
              style={{
                background: 'none',
                border: '1px solid rgba(255,75,75,0.3)',
                color: 'rgba(255,75,75,0.7)',
                padding: '0.3rem 0.8rem',
                borderRadius: '6px',
                fontSize: '0.72rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.05em'
              }}
            >
              Clear Progress
            </button>
          )}
        </header>

        {/* Hero */}
        <div className="hero fade-in fade-in-1">
          <div className="hero-badge">
            <span>⚡</span>
            PPSSH · All Five Domains · Scenario-Based
          </div>
          <h1 className="hero-title">
            Master the<br />
            <span className="accent">NASH Exam</span>
          </h1>
          <p className="hero-subtitle">
            50 policy-grounded scenario questions across all PPSSH domains.
            Built for School Head candidates in the Philippine DepEd system.
          </p>
        </div>

        {/* Stats */}
        <div className="stats-bar fade-in fade-in-2">
          <div className="stat-item">
            <span className="stat-value">{totalQs}</span>
            <span className="stat-label">Questions</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-value">5</span>
            <span className="stat-label">Domains</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-value">{totalAttempts}</span>
            <span className="stat-label">Attempted</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-value" style={{ color: overallPct >= 75 ? 'var(--green)' : overallPct > 0 ? 'var(--orange)' : 'var(--gold)' }}>
              {overallPct > 0 ? `${overallPct}%` : '—'}
            </span>
            <span className="stat-label">Accuracy</span>
          </div>
        </div>

        {/* Domain Grid */}
        <div className="fade-in fade-in-3">
          <p className="domains-label">Choose a Domain</p>
          <div className="domains-grid">
            {DOMAINS.map((domain, idx) => {
              const s = getDomainScore(domain.questions[0]?.id?.slice(0,2) === 'd1' ? 1 : parseInt(domain.questions[0]?.id?.charAt(1)))
              // Simpler: use the first question id prefix
              const domainNum = domain.questions[0]?.id?.slice(1, 2)
              const domainScore = scores[domainNum]
              const pct = domainScore?.attempts > 0
                ? Math.round((domainScore.correct / domainScore.attempts) * 100)
                : null

              return (
                <button
                  key={idx}
                  className="domain-card"
                  onClick={() => startQuiz(idx + 1)}
                  style={{
                    '--card-color': domain.color,
                    '--card-glow': domain.glow,
                  }}
                >
                  <span className="domain-card-icon">{domain.icon}</span>
                  <div className="domain-card-tag">{domain.name}</div>
                  <div className="domain-card-name">{domain.fullName}</div>
                  <div className="domain-card-desc">{domain.description}</div>
                  <div className="domain-card-footer">
                    <span className="domain-card-count">{domain.questions.length} questions</span>
                    {pct !== null ? (
                      <span className="domain-card-score" style={{
                        color: pct >= 75 ? 'var(--green)' : 'var(--orange)',
                        borderColor: pct >= 75 ? 'rgba(80,200,120,0.3)' : 'rgba(255,140,66,0.3)',
                        background: pct >= 75 ? 'rgba(80,200,120,0.08)' : 'rgba(255,140,66,0.08)'
                      }}>
                        Best: {pct}%
                      </span>
                    ) : (
                      <span className="domain-card-arrow" style={{ color: domain.color }}>→</span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Mix Mode */}
          <button className="mix-card" onClick={startMix}>
            <div className="mix-card-left">
              <div className="mix-card-icon">🎯</div>
              <div>
                <div className="mix-card-title">All Domains Mix</div>
                <div className="mix-card-sub">{totalQs} questions · Random shuffle · Full NASH simulation</div>
              </div>
            </div>
            <span style={{ color: 'var(--gold)', fontSize: '1.2rem' }}>→</span>
          </button>
        </div>

        {/* Footer note */}
        <div className="fade-in fade-in-5" style={{
          textAlign: 'center',
          marginTop: '3rem',
          paddingTop: '2rem',
          borderTop: '1px solid var(--border)'
        }}>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', lineHeight: 1.6 }}>
            Based on PPSSH, DepEd Orders, RA 9184, DO 8 s. 2015, DO 36 s. 2016 & related issuances<br />
            Built with Next.js · Deployed on Vercel
          </p>
        </div>

      </div>
    </div>
  )
}
