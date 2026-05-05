# Project: Paul Notes on Hackathon
## Sr Dev-ish Conversation with Scrum Automation and Task Distribution

### Problem
Vibe coding is a trend for technical and non-technical users alike. However, vibe coders often overlook critical aspects like security, scalability, and business fit (e.g., budget sustainability). Additionally, traditional Scrum methodology makes ranking tasks and managing meetings a manual hassle.

### Solution
An application acting as both a Senior Developer and a Project Manager. It interrogates code decisions (why, how, edge cases) and automates project management. The AI schedules meetings and ranks features/tasks by priority: **New Feature -> Business Fit -> Scalability -> Security.**

### Features
- **Entry Points:** 
    - **Chat:** Talk with the AI about your project.
    - **GitHub Import:** Upload repo link or select from GitHub; app forks repo for agent context.
    - **IDE Extension:** One-click "check project" button directly from the IDE.
- **Senior Dev Chat:** AI asks pointed questions (e.g., "Did you implement CORS?", "How is state handled?").
- **Auto-Tasking:** Vulnerabilities or gaps found during conversation automatically become tasks.
- **Task Distribution:** Tasks assigned to the most fitting developer based on their profile.
- **Team Integration:** Invite other developers/users to the project.
- **Scrum Automation:** Automated meetings and AI-driven task ranking (Critical to Low).
- **User Profiles:** AI uses profiles as context for smart task distribution.
- **GitHub Integration:** GitHub OAuth, repo integration, and possible GitHub MCP.

### Tech Stack
- **Backend:** Django (Python-based for AI ecosystem).
- **Frontend:** Web-first (Universal accessibility). *Note: Ignoring PWA for now.*
- **Database:** PostgreSQL.
- **OAuth:** GitHub.
- **Email:** Twilio (SendGrid).
- **Infrastructure:** Vercel (Frontend), Render (Backend).
- **Agentic Framework:** Agno.
- **LLM:** Gemini AI API (Flash).

### Agent Architecture
1. **Senior Dev Agent:** Analyzes repo/codebase for gaps and architectural flaws.
2. **Project Manager (PM) Agent:** Evaluates business value, impact, and budget fit.
3. **Scrum Agent:** Converts insights into structured tasks and manages priority.

### Workflow
User uploads repo/links GitHub → App forks repo → Senior Dev Agent analyzes codebase → PM Agent checks business value → Scrum Agent generates and ranks tasks → Save to DB.
