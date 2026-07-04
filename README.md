# MimicAI

MimicAI is an LLM-powered conversational web application that lets users chat with two educational personas inspired by the publicly available communication and teaching styles of Hitesh Choudhary and Piyush Garg.

The project focuses on persona consistency, context-aware conversations, clean persona switching, and a simple chat experience.

> Disclaimer: MimicAI is an educational persona-simulation project. It is not affiliated with, endorsed by, or operated by Hitesh Choudhary or Piyush Garg.

## Live Demo

https://mimic-ai-by-suman.vercel.app/

## Public Repository

https://github.com/SumanX08/MimicAi

## Features

- LLM-based chat interface
- Two selectable personas
- Persona-specific system prompts
- Separate conversation history for each persona
- Context-aware multi-turn conversations
- Typing indicator while waiting for a response
- Persona switching from the chat header
- Responsive chat interface
- Environment-based API configuration
- Frontend and backend separation

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Lucide React

### Backend
- Node.js
- Express
- OpenAI API
- CORS
- dotenv

## Architecture

```text
User
  |
  v
React Chat Interface
  |
  | persona id + history + current message
  v
Express API
  |
  v
Persona Prompt Selection
  |
  v
System Prompt + Conversation History + Current Message
  |
  v
LLM API
  |
  v
Assistant Response
  |
  v
React Chat Interface
```

The frontend sends a persona identifier, previous messages for that persona, and the current user message. The backend selects the matching system prompt, builds the message array, sends it to the LLM, and returns the generated reply.

## Persona Data Collection and Preparation

Persona design was based on publicly available material such as official websites, public YouTube content, talks, blogs, courses, and public social posts.

The goal was not to copy transcripts into the application. Instead, the research process focused on identifying reusable communication patterns:

- language and Hinglish balance
- typical response length
- teaching sequence
- use of practical examples
- technical depth
- humor and sarcasm
- beginner-friendly behavior
- career guidance style
- project-building advice
- recurring conversational transitions

These observations were converted into structured system-prompt instructions. See `docs/persona-data.md`.

## Prompt Engineering Strategy

Each persona has a separate backend prompt. The prompts define:

- public-facing role and expertise
- personality traits
- communication habits
- language style
- teaching approach
- humor rules
- technical-question behavior
- career-guidance behavior
- uncertainty handling
- context and consistency rules

The prompts are intentionally different. Hitesh's persona is designed around calm, beginner-friendly, practical mentorship and conversational Hinglish. Piyush's persona is designed around a builder-oriented, implementation-focused engineering style that often explains why a technology exists, how it works, and when its complexity is justified.

See `docs/prompt-strategy.md`.

## Context Management Approach

MimicAI uses conversation history rather than RAG or a vector database.

Each persona has an independent message array in the frontend. When a user sends a message:

1. The current persona is identified.
2. Previous messages for only that persona are converted to `{ role, content }` objects.
3. The frontend sends the persona id, history, and current message to the backend.
4. The backend selects the persona-specific system prompt.
5. The LLM receives the system prompt, previous conversation history, and current user message.
6. The generated assistant response is stored only in the active persona's chat.

This prevents Hitesh and Piyush conversations from being mixed when the user switches personas.

See `docs/context-management.md`.

## Sample Conversations

Representative test conversations are documented in `docs/sample-conversations.md`.

For the final submission, replace or supplement those examples with screenshots or copied outputs from the deployed application so the examples reflect the actual model behavior.

## Project Structure

```text
MimicAI/
├── Frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── Components/
│   │   ├── data/
│   │   └── Pages/
│   ├── .env.example
│   └── package.json
├── Backend/
│   ├── Prompts/
│   ├── Routes/
│   ├── Services/
│   ├── .env.example
│   ├── server.js
│   └── package.json
├── docs/
│   ├── persona-data.md
│   ├── prompt-strategy.md
│   ├── context-management.md
│   └── sample-conversations.md
├── .gitignore
└── README.md
```

Adjust the structure above if your actual folder names differ.

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/SumanX08/MimicAi.git
cd MimicAi
```

### 2. Backend setup

```bash
cd Backend
npm install
```

Create `Backend/.env`:

```env
PORT=5000
OPENAI_API_KEY=your_openai_api_key
```

Run the backend:

```bash
npm run dev
```

### 3. Frontend setup

Open another terminal:

```bash
cd Frontend
npm install
```

Create `Frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Run the frontend:

```bash
npm run dev
```

## API

### POST `/api/chat`

Example request:

```json
{
  "persona": "hitesh",
  "history": [
    {
      "role": "user",
      "content": "I want to learn backend development."
    },
    {
      "role": "assistant",
      "content": "Start with the basics of HTTP, Node.js, and APIs..."
    }
  ],
  "message": "What should I build first?"
}
```

Example response:

```json
{
  "success": true,
  "reply": "..."
}
```

## Deployment

The frontend and backend can be deployed independently.

Before deploying:

- set `VITE_API_URL` to the deployed backend API base URL
- set `OPENAI_API_KEY` only in the backend hosting environment
- never expose the API key in frontend code
- never commit `.env` files
- configure CORS for the deployed frontend origin
- verify both personas and persona switching on the deployed build

## Limitations

- Conversation history is currently stored in frontend state and is lost on refresh.
- Long conversations are sent as message history and are not yet summarized.
- The project does not use RAG or a vector database.
- Persona behavior depends on prompt quality and the selected LLM.
- The personas are simulations based on public communication patterns and should not be treated as the real individuals.

## Future Improvements

- streaming responses
- persistent chat history
- conversation summaries for long chats
- automated persona evaluation tests
- regenerate response
- Markdown and syntax highlighting
- rate limiting
- server-side logging and monitoring
- optional retrieval from curated public source material
