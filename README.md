# 🎓 NASH Practice Quiz App

An interactive reviewer for the **National Assessment for School Heads (NASH)** covering all five **PPSSH domains**, built with **Next.js** and ready to deploy on **Vercel**.

---

## Features

- ✅ 50 scenario-based PPSSH questions (10 per domain)
- ⏱️ 60-second timer per question
- 🔀 Fisher-Yates question shuffling
- 💾 Progress tracking via localStorage
- 📊 Score analytics per domain
- 🎯 All Domains Mix mode (full NASH simulation)
- 🌑 Dark luxury UI design

---

## How to Deploy (Step by Step)

### 1. Upload to GitHub
1. Go to **github.com** → New Repository
2. Name it `nash-quiz-app`
3. Upload all these files (drag and drop the folder)
4. Click **Commit changes**

### 2. Deploy on Vercel
1. Go to **vercel.com**
2. Click **Sign Up → Continue with GitHub**
3. Click **Add New Project**
4. Select `nash-quiz-app` from your repositories
5. Framework Preset: **Next.js** (auto-detected)
6. Click **Deploy**
7. Done! Your site is live at `nash-quiz-app.vercel.app`

---

## Running Locally (Optional)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Custom CSS with CSS Variables
- **Fonts**: Playfair Display + DM Mono (Google Fonts)
- **State**: React useState + localStorage
- **Deployment**: Vercel

---

## Adding More Questions

Edit `/data/questions.js` — each domain has a `questions` array. Copy any existing question object and modify it. The app automatically picks up new questions.

---

*Built for Sir Orlando V. Pasion, Jr. · NNHS · SDO Urdaneta City · Region I*
