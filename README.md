# Frontend Architecture (Apple Fitness + Duolingo Style UI)

## 🖥️ Overview

This is the frontend plan for a **Fitness Microservices Application**, inspired by:

- 🎯 **Apple Fitness**: For modern visuals, smooth transitions, daily goals, health overview.
- 🧠 **Duolingo**: For "roadmap"-style level progression with animated steps, medals, and visual gamification.

The frontend is built using:

- **Next.js** — SSR/SSG-ready React framework
- **Tailwind CSS** — utility-first CSS framework
- **Framer Motion** — for smooth animations and transitions
- **next-auth** — for authentication integration

## 🌐 Pages and Routes

### Public Routes

- `/` — Landing page (for unauthenticated users only)
- `/auth` — Login screen using NextAuth
- `/signup` - Sign Up screen using NextAuth

### Protected Routes

Accessible only after authentication (JWT Bearer Token required):

- `/trainings` — Roadmap of fitness paths (Mass Gain, Weight Loss, Cardio, etc.)
- `/profile` — View/edit user profile (weight, height, goals, etc.)
- `/rewards` — View earned rewards and achievements

> !! Unauthenticated users trying to access protected routes will be redirected to `/`.

## 🧭 Training Journey UI ("Road" like Duolingo)

- Vertical scroll or grid of levels `1 ➡️ 2 ➡️ 3 ➡️ ...`
- Each level:

  - ⏱ Estimated time
  - 🏋️‍♂️ Exercise image or 3D model (rendered via Three.js)
  - 📃 Text description
  - 🎮 START / STOP button
  - ✅ Progress is tracked and stored

## 👤 User Profile

- Can view and update:

  - Weight, Height
  - Fitness Goal (Mass Gain, Weight Loss, Cardio, etc.)
  - Avatar or profile photo

- Rewards section:

  - 3D medals/trophies (e.g., `first.stl`) rendered with **Three.js**
  - List of earned rewards

## 🧩 Authentication

- **NextAuth.js** for authentication UI
- On success, a request is sent to the **Auth Service** (ASP.NET) to generate and return a **JWT Bearer Token**
- Token is stored on client (e.g., in cookies or localStorage)
- Token is included in all secure API requests

> 🔒 The Bearer Token is issued in the **Auth Service**, written in **C# ASP.NET**.

## 🧠 Design Notes

- Animations (Framer Motion): Level completion, new reward animations, smooth page transitions
- Color Palette: Clean whites, vibrant gradients (like Apple Fitness/Watch)
- Typography: Large readable titles, clear headers for exercises
- Icons: Use [Lucide](https://lucide.dev) or similar open-source pack

## 🐳 Microservice Communication

Frontend communicates with backend via RESTful API or optionally gRPC (if added later). Docker containers expose APIs, consumed via `/api` route in Next.js.

## 🔐 Auth Flow

1. User signs up via NextAuth
2. Frontend sends auth request to ASP.NET `auth-service`
3. On success, **auth-service** issues JWT (Bearer Token)
4. Token stored client-side and added to `Authorization: Bearer <token>` for secure API calls
5. Unauthorized access to protected pages (`/trainings`, `/rewards`, etc.) redirects to `/`

## 🧪 Future Features (Planned)

- Invite friends and track progress competitively
- Leaderboards with daily/weekly rewards
- Notification system for missed days or milestones
- Offline mode with synced progress

---

- `nginx-service` --> https://github.com/monokkai/Fitness-Site-Nginx-Service
- `auth-service` --> https://github.com/monokkai/Fitness-Site-Auth-Service
- `rewards-service` --> https://github.com/monokkai/Fitness-Site-Rewards-Service
- `frontend` --> https://github.com/monokkai/Fitness-Site-Front 📍 U're here

---

---

- `docker exec -it auth-db mysql -u root -phandfit_root` - run docker to see changes or databases in MySQL
- `docker exec auth-db mysql -uhandfit_user -phandfit_pass -e "USE handfit_db; SELECT UserId, Username, Email, CreatedAt, LastLoginAt, IsActive FROM Users;"` - check users in database

---
