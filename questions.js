'use client'
import { useState, useEffect, useCallback, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import questions from '@/data/questions'

const LETTERS = ['A', 'B', 'C', 'D']
const TIMER_SECONDS = 60

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildQuizSet(domainParam) {
  if (domainParam === 'mix') {
    const all = Object.entries(questions).flatMap(([id, d]) =>
      d.questions.map(q => ({ ...q, domainId: id, domainName: d.name, domainColor: d.color }))
    )
    return shuffle(all)
  }
  const domainId = parseInt(domainParam)
  const d = questions[domainId]
  if (!d) return []
  return shuffle(d.questions).map(q => ({
    ...q, domainId: String(domainId), domainName: d.name, domainColor: d.color
  }))
}

function QuizContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const domainParam = searchParams.get('domain') || '1'

  const [quizQuestions, setQuizQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS)
  const [results, setResults] = useState([]) // {correct, questionId}
  const [phase, setPhase] = useState('quiz') // 'quiz' | 'results'
  const [domainInfo, setDomainInfo] = useState(null)

  // Build quiz questions once
  useEffect(() => {
    const qs = buildQuizSet(domainParam)
    setQuizQuestions(qs)
    if (domainParam !== 'mix') {
      setDomainInfo(questions[parseInt(domainParam)])
    } else {
      setDomainInfo({ name: 'All Domains Mix', fullName: 'All Domains Mix', color: '#C9A84C', glow: 'rgba(201,168,76,0.35)', icon: '🎯' })
    }
  }, [domainParam])

  // Timer
  useEffect(() => {
    if (phase !== 'quiz' || answered || quizQuestions.length === 0) return
    if (timeLeft <= 0) {
      handleTimeout()
      return
    }
    const t = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(t)
  }, [timeLeft, answered, phase, quizQuestions.length])

  const handleTimeout = useCallback(() => {
    setAnswered(true)
    setSelected(-1) // timeout = no selection
    setResults(r => [...r, { correct: false, timedOut: true }])
  }, [])

  const handleSelect = (idx) => {
    if (answered) return
    setSelected(idx)
    setAnswered(true)
    const q = quizQuestions[current]
    const isCorrect = idx === q.answer
    setResults(r => [...r, { correct: isCorrect }])

    // Save score to localStorage
    try {
      const domainKey = q.domainId
      const saved = JSON.parse(localStorage.getItem('nash-scores') || '{}')
      const prev = saved[domainKey] || { correct: 0, attempts: 0 }
      saved[domainKey] = {
        correct: prev.correct + (isCorrect ? 1 : 0),
        attempts: prev.attempts + 1
      }
      localStorage.setItem('nash-scores', JSON.stringify(saved))
    } catch {}
  }

  const handleNext = () => {
    if (current + 1 >= quizQuestions.length) {
      setPhase('results')
      return
    }
    setCurrent(c => c + 1)
    setSelected(null)
    setAnswered(false)
    setTimeLeft(TIMER_SECONDS)
  }

  if (quizQuestions.length === 0 || !domainInfo) {
    return (
      <div className="quiz-page" style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
        <div style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>Loading questions...</div>
      </div>
    )
  }

  // --- RESULTS PHASE ---
  if (phase === 'results') {
    const correct = results.filter(r => r.correct).length
    const total = results.length
    const pct = Math.round((correct / total) * 100)
    const passed = pct >= 75

    return (
      <div className="results-page">
        <div className="results-container">
          <div className="results-header fade-in">
            <span className="results-icon">{passed ? '🏆' : '📖'}</span>
            <h1 className="results-title" style={{ color: passed ? 'var(--gold)' : 'var(--text)' }}>
              {passed ? 'Well Done!' : 'Keep Practicing'}
            </h1>
            <p className="results-subtitle">
              {domainInfo.name} · {domainParam === 'mix' ? 'All Domains Mix' : domainInfo.fullName}
            </p>
          </div>

          <div className="score-circle-wrapper fade-in fade-in-1">
            <div className="score-circle" style={{
              borderColor: passed ? 'var(--green)' : pct >= 50 ? 'var(--gold)' : 'var(--red)',
              boxShadow: `0 0 40px ${passed ? 'rgba(80,200,120,0.25)' : 'rgba(201,168,76,0.2)'}`
            }}>
              <span className="score-number" style={{ color: passed ? 'var(--green)' : pct >= 50 ? 'var(--gold)' : 'var(--red)' }}>
                {correct}
              </span>
              <span className="score-denom">out of {total}</span>
              <span className="score-pct" style={{ color: passed ? 'var(--green)' : pct >= 50 ? 'var(--gold)' : 'var(--red)' }}>
                {pct}%
              </span>
            </div>
          </div>

          <div className="results-details fade-in fade-in-2">
            <div className="results-details-title">Session Summary</div>
            <div className="results-row">
              <span className="results-row-label">✅ Correct Answers</span>
              <span className="results-row-val neutral">{correct} / {total}</span>
            </div>
            <div className="results-row">
              <span className="results-row-label">❌ Wrong Answers</span>
              <span className="results-row-val neutral">{total - correct}</span>
            </div>
            <div className="results-row">
              <span className="results-row-label">📊 Accuracy</span>
              <span className="results-row-val" style={{ color: passed ? 'var(--green)' : 'var(--orange)' }}>{pct}%</span>
            </div>
            <div className="results-row">
              <span className="results-row-label">🎯 Passing Mark (75%)</span>
              <span className={`results-row-val ${passed ? 'pass' : 'fail'}`}>
                {passed ? 'PASSED ✓' : 'NOT YET ✗'}
              </span>
            </div>
            <div className="results-row">
              <span className="results-row-label">📋 Domain</span>
              <span className="results-row-val neutral" style={{ fontSize: '0.8rem' }}>
                {domainParam === 'mix' ? 'All Domains Mix' : domainInfo.fullName}
              </span>
            </div>
          </div>

          {/* Recommendation */}
          <div style={{
            background: 'var(--surface)',
            border: `1px solid ${passed ? 'rgba(80,200,120,0.2)' : 'rgba(255,140,66,0.2)'}`,
            borderRadius: 'var(--radius-sm)',
            padding: '1.2rem 1.5rem',
            marginBottom: '1.5rem',
            fontSize: '0.85rem',
            color: 'var(--text-dim)',
            lineHeight: '1.6'
          }} className="fade-in fade-in-3">
            {passed
              ? `🎉 Excellent work! You scored ${pct}% — above the 75% passing threshold. Your mastery of ${domainParam === 'mix' ? 'all PPSSH domains' : domainInfo.fullName} is strong. Continue reviewing other domains to ensure full readiness for NASH.`
              : `💡 You scored ${pct}% this round. Review the explanations for questions you missed, then re-take this domain. Aim for 75% or higher before the actual NASH exam. Consistent practice is key!`
            }
          </div>

          <div className="results-actions fade-in fade-in-4">
            <button className="btn-primary" onClick={() => {
              setPhase('quiz')
              const qs = buildQuizSet(domainParam)
              setQuizQuestions(qs)
              setCurrent(0)
              setSelected(null)
              setAnswered(false)
              setTimeLeft(TIMER_SECONDS)
              setResults([])
            }}>
              🔄 Try Again
            </button>
            <button className="btn-secondary" onClick={() => router.push('/')}>
              ← Back to Domains
            </button>
          </div>
        </div>
      </div>
    )
  }

  // --- QUIZ PHASE ---
  const q = quizQuestions[current]
  const progress = ((current) / quizQuestions.length) * 100
  const timerWarning = timeLeft <= 10

  return (
    <div className="quiz-page">

      {/* Header */}
      <header className="quiz-header" style={{ maxWidth: '700px', margin: '0 auto', width: '100%' }}>
        <button className="quiz-back" onClick={() => router.push('/')}>
          ← Domains
        </button>
        <span
          className="quiz-domain-badge"
          style={{ color: domainInfo.color, borderColor: `${domainInfo.color}60` }}
        >
          {domainInfo.icon} {domainInfo.name}
        </span>
        <div className={`quiz-timer ${timerWarning ? 'warning' : ''}`} style={{ color: timerWarning ? 'var(--red)' : 'var(--text-dim)' }}>
          ⏱ {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:{String(timeLeft % 60).padStart(2, '0')}
        </div>
      </header>

      {/* Progress */}
      <div className="progress-track" style={{ maxWidth: '700px', margin: '0 auto', width: 'calc(100% - 0px)' }}>
        <div className="progress-fill" style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${domainInfo.color}, ${domainInfo.color}CC)` }} />
      </div>

      {/* Content */}
      <div className="quiz-content">

        <div className="question-counter">
          Question {current + 1} of {quizQuestions.length}
          {domainParam === 'mix' && (
            <span style={{ color: q.domainColor, marginLeft: '0.5rem' }}>· {q.domainName}</span>
          )}
        </div>

        <div className="question-card fade-in" key={`q-${current}`}>
          <p className="question-text">{q.question}</p>
        </div>

        <div className="options-list fade-in" key={`opts-${current}`}>
          {q.options.map((opt, idx) => {
            let cls = 'option-btn'
            if (answered) {
              if (idx === q.answer) cls += ' correct'
              else if (idx === selected && idx !== q.answer) cls += ' wrong'
              else cls += ' wrong'
            } else if (idx === selected) {
              cls += ' selected'
            }

            return (
              <button
                key={idx}
                className={cls}
                onClick={() => handleSelect(idx)}
                disabled={answered}
              >
                <span className="option-letter">{LETTERS[idx]}</span>
                <span className="option-text">{opt}</span>
              </button>
            )
          })}
        </div>

        {/* Feedback */}
        {answered && (
          <div className={`feedback-card ${results[results.length - 1]?.correct ? 'correct' : 'wrong'}`} key={`fb-${current}`}>
            <div className="feedback-header">
              {results[results.length - 1]?.correct
                ? '✓ Correct!'
                : results[results.length - 1]?.timedOut
                  ? '⏰ Time\'s up!'
                  : '✗ Incorrect'
              }
            </div>
            <div className="feedback-text">{q.explanation}</div>
          </div>
        )}

        {/* Next */}
        <button
          className="next-btn"
          onClick={handleNext}
          disabled={!answered}
          style={{
            background: answered ? `linear-gradient(135deg, ${domainInfo.color}, ${domainInfo.color}AA)` : undefined
          }}
        >
          {current + 1 >= quizQuestions.length ? 'View Results →' : 'Next Question →'}
        </button>

      </div>
    </div>
  )
}

export default function QuizPage() {
  return (
    <Suspense fallback={
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
        Loading...
      </div>
    }>
      <QuizContent />
    </Suspense>
  )
}
