# 🎓 VedaAI — AI-Powered Question Paper Generator

<div align="center">

![VedaAI](https://img.shields.io/badge/VedaAI-Question%20Paper%20Generator-orange?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen?style=for-the-badge&logo=mongodb)
![Redis](https://img.shields.io/badge/Redis-BullMQ-red?style=for-the-badge&logo=redis)
![Gemini](https://img.shields.io/badge/Google-Gemini%20AI-blue?style=for-the-badge&logo=google)

**Upload your study material → Define question structure → Get a fully generated question paper in seconds.**

</div>

---

## 📌 What is VedaAI?

VedaAI is a full-stack SaaS tool built for teachers. Upload a PDF or image of your study material, configure your desired question paper structure (question types, number of questions, marks per question), and let Google Gemini AI generate a complete, structured question paper — complete with an answer key.

The system is built with a **decoupled worker architecture** using Redis queues, so paper generation happens asynchronously in the background while the UI polls for real-time status updates.

---

## ✨ Features

- 📄 **Upload study material** — PDFs and images via Cloudinary
- 🧠 **AI-powered generation** — Google Gemini reads your material and writes questions
- 🗂️ **Flexible structure** — Configure multiple sections (MCQs, Short, Long answer, etc.) with custom marks
- ⚡ **Async job queue** — BullMQ + Redis decouples generation from the HTTP request
- 🔄 **Real-time polling** — Frontend polls every 3 seconds until paper is `completed` or `failed`
- 🗑️ **Assignment management** — View, browse, and delete past assignments
- 📱 **Responsive UI** — Full mobile support with a bottom navigation bar and FAB

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                   Next.js Frontend                  │
│  ┌──────────┐  ┌────────────┐  ┌────────────────┐  │
│  │Dashboard │  │Create Form │  │  Output Page   │  │
│  │(listings)│  │(Zustand)   │  │ (polling loop) │  │
│  └────┬─────┘  └─────┬──────┘  └───────┬────────┘  │
└───────┼──────────────┼─────────────────┼────────────┘
        │   Axios      │  POST /create   │  GET /get-assessment/:id (every 3s)
        ▼              ▼                 ▼
┌─────────────────────────────────────────────────────┐
│               Express REST API (Node.js)            │
│  GET /get-assessments   POST /create-assessment     │
│  GET /get-assessment/:id   DELETE /delete-assessment│
└──────────────┬──────────────────────────────────────┘
               │ saves to MongoDB + enqueues job
               ▼
┌──────────────────────────┐      ┌──────────────────┐
│       MongoDB Atlas      │      │   Redis (BullMQ) │
│  assignments collection  │      │  assignment-queue│
└──────────────────────────┘      └────────┬─────────┘
                                           │ job picked up
                                           ▼
                               ┌────────────────────────┐
                               │     BullMQ Worker      │
                               │  (separate process)    │
                               │                        │
                               │  1. Set status →       │
                               │     "processing"       │
                               │  2. Fetch PDF from     │
                               │     Cloudinary URL     │
                               │  3. Send to Gemini AI  │
                               │     with prompt        │
                               │  4. Parse JSON resp.   │
                               │  5. Save paper to DB   │
                               │  6. Set status →       │
                               │     "completed"/"failed"│
                               └────────────────────────┘
```

---

## 🔄 End-to-End Flow

### Step 1 — Teacher fills the form
The teacher visits `/create-assessment`, uploads a PDF/image of their study material, sets a title and due date, then configures question sections:

```
Section A: Multiple Choice Questions — 10 questions × 1 mark
Section B: Short Questions          — 5 questions  × 2 marks
Section C: Long Questions           — 2 questions  × 5 marks
```

### Step 2 — File upload to Cloudinary
Before submitting, the file is uploaded directly from the browser to Cloudinary using a `FormData` POST. The returned `secure_url` is stored in the form payload. PDFs use `resource_type: raw`; images use `resource_type: image`.

### Step 3 — Assignment created in MongoDB
The frontend POSTs to `/api/create-assessment`. The Express controller creates a MongoDB document with `status: "pending"` and immediately adds a job to the BullMQ queue with the new `assignmentId`.

### Step 4 — BullMQ Worker picks up the job
The worker runs as a **completely separate Node.js process**. It:
1. Sets the assignment status to `"processing"`
2. Fetches the PDF/image bytes from the Cloudinary URL
3. Converts the file to Base64
4. Sends it to **Google Gemini** (`gemini-3.5-flash`) alongside a dynamically built prompt

### Step 5 — AI Prompt Engineering
The prompt is constructed from the teacher's configuration:

```
Section A - Multiple Choice Questions: Generate exactly 10 questions, each carrying 1 mark.
Section B - Short Questions: Generate exactly 5 questions, each carrying 2 marks.

Rules:
- Each question must have difficulty: "easy", "medium", or "hard"
- Every question must have a clean answer
- Respond ONLY with valid JSON
```

Gemini receives the actual study material as an inline document (base64) + the prompt text, and returns a structured JSON paper.

### Step 6 — Paper saved to MongoDB
The worker parses Gemini's JSON response, cleans any markdown fences, and upserts the `generatedPaper` sections + `totalMarks` + `totalQuestions` back into MongoDB. Status is set to `"completed"` (or `"failed"` on parse error).

### Step 7 — Frontend polls for status
After submission, the teacher is redirected to `/output_paper/:id`. The Zustand store starts a `setInterval` polling every **3 seconds**, hitting `/api/get-assessment/:id`. Once `status === "completed"`, polling stops and the `QuestionPaper` component renders with sections and an answer key.

---

## 🗂️ Project Structure

```
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.ts           # Mongoose connection
│   │   │   ├── env.ts          # Typed env exports
│   │   │   └── redis.ts        # ioredis connection
│   │   ├── controllers/
│   │   │   └── assessment.ts   # CRUD handlers
│   │   ├── models/
│   │   │   └── assessment_models.ts  # Mongoose schema
│   │   ├── queues/
│   │   │   └── assignmentqueue.ts    # BullMQ queue definition
│   │   ├── routes/
│   │   │   └── assessment_routes.ts  # Express router
│   │   ├── test/
│   │   │   ├── ai-test.ts      # Gemini generation logic
│   │   │   └── types.ts        # TypeScript interfaces
│   │   ├── workers/
│   │   │   └── generate_worker.ts    # BullMQ worker process
│   │   └── server.ts           # Express app entrypoint
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── app/
│   │   ├── dashboard/          # Assignments listing page
│   │   ├── create-assessment/  # Form page
│   │   └── output_paper/[id]/  # Dynamic result page
│   ├── components/
│   │   ├── AssignmentForm.tsx  # Main form with dynamic sections
│   │   ├── QuestionPaper.tsx   # Rendered paper + answer key
│   │   ├── UploadBox.tsx       # Drag & drop file upload
│   │   ├── SideBar.tsx         # Desktop sidebar nav
│   │   ├── BottomNav.tsx       # Mobile bottom navigation
│   │   └── TopNavbar.tsx       # Top bar with back + user
│   ├── pages/
│   │   ├── AllAssignmentPage.tsx
│   │   ├── CreateAssignmentPage.tsx
│   │   └── OutputPage.tsx      # Status-aware output renderer
│   ├── store/
│   │   ├── useAssessmentStore.ts   # Zustand — all assessment state
│   │   └── useUIStore.ts           # Zustand — tabs, file state
│   └── utils/
│       ├── axios.ts            # Axios instance with base URL
│       ├── cloudinary.ts       # Direct browser → Cloudinary upload
│       └── types.ts            # Shared TypeScript types
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 15 (App Router), TypeScript, Tailwind CSS |
| **State Management** | Zustand |
| **Backend** | Node.js, Express 5, TypeScript |
| **Database** | MongoDB Atlas via Mongoose |
| **Queue** | BullMQ on Redis |
| **AI** | Google Gemini (`gemini-3.5-flash`) |
| **File Storage** | Cloudinary (PDFs as `raw`, images as `image`) |
| **Worker Transport** | ioredis |

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- A running Redis instance (local or cloud)
- MongoDB Atlas cluster
- Cloudinary account (free tier works)
- Google AI Studio API key (Gemini)

### 1. Clone the repo

```bash
git clone https://github.com/your-username/vedaai.git
cd vedaai
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:

```env
PORT=3001
MONGO_DB_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/vedaai
REDIS_PUBLIC_URL=redis://localhost:6379
GEMINI_API_KEY=your_google_gemini_api_key
```

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create a `.env.local` file in `/frontend`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

> **Note:** In Cloudinary, create an **unsigned upload preset** for the frontend to upload directly without a backend proxy.

### 4. Run the development environment

You need **three terminal windows**:

```bash
# Terminal 1 — API server
cd backend
npm run dev

# Terminal 2 — BullMQ worker (separate process!)
cd backend
npm run worker

# Terminal 3 — Next.js frontend
cd frontend
npm run dev
```

The app will be live at `http://localhost:3000`.

---

## 📋 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/check` | Health check |
| `POST` | `/api/create-assessment` | Create assignment + enqueue job |
| `GET` | `/api/get-assessments` | Fetch all assignments |
| `GET` | `/api/get-assessment/:id` | Fetch single assignment (used for polling) |
| `DELETE` | `/api/delete-assessment/:id` | Delete an assignment |

### POST `/api/create-assessment` — Request Body

```json
{
  "title": "Chapter 3 Quiz — Electricity",
  "dueDate": "2025-08-01",
  "uploadedFileUrl": "https://res.cloudinary.com/.../chapter3.pdf",
  "additionalInstructions": "Focus on circuit diagrams.",
  "questionTypes": [
    { "type": "Multiple Choice Questions", "numberOfQuestions": 10, "marks": 1 },
    { "type": "Short Questions", "numberOfQuestions": 5, "marks": 2 }
  ]
}
```

---

## 🗃️ MongoDB Schema

```
Assignment {
  title               String
  uploadedFileUrl     String
  dueDate             Date
  additionalInstructions  String
  status              "pending" | "processing" | "completed" | "failed"
  totalQuestions      Number
  totalMarks          Number
  questionTypes: [{
    type              String
    numberOfQuestions Number
    marks             Number
  }]
  generatedPaper: {
    sections: [{
      label           String      // "A", "B", "C"
      title           String      // "Short Answer Questions"
      instruction     String
      questions: [{
        text          String
        difficulty    "easy" | "medium" | "hard"
        marks         Number
        answer        String
      }]
    }]
  }
  createdAt           Date
  updatedAt           Date
}
```

---

## ⚙️ Worker Deep Dive

The worker (`generate_worker.ts`) is intentionally a **separate deployable process**. This design decision means:

- The Express API stays responsive — it never blocks on AI generation (which can take 20–40 seconds)
- Workers can be scaled horizontally by running multiple instances (`concurrency: 10` per worker)
- Failed jobs are retried automatically (3 attempts, exponential backoff)
- The worker also spins up a minimal Express health server on its own port for deployment platforms that require a health check endpoint

---

## 🔮 Roadmap

- [ ] Socket.io push instead of polling (server pushes when job completes)
- [ ] PDF export of generated question papers
- [ ] Authentication (teacher accounts, school management)
- [ ] Student submission + AI-assisted grading
- [ ] Multiple AI providers (OpenAI, Anthropic fallback)
- [ ] Question paper templates and themes

---

## 📄 License

MIT © VedaAI
