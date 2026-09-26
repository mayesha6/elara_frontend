# Elara Frontend

An employee recognition, rewards, and engagement web application for **Elara**. Built with modern React 19, Next.js 15 (App Router), Redux Toolkit, and Tailwind CSS.

---

## 📋 Table of Contents

- [Features & Overview](#-features--overview)
- [Tech Stack](#-tech-stack)
- [Required Environment Variables](#-required-environment-variables)
- [Local Setup & Development](#-local-setup--development)
- [Automated Testing & Quality Checks](#-automated-testing--quality-checks)
- [Build & Production Run](#-build--production-run)
- [Deployment Steps](#-deployment-steps)
- [Rollback Process](#-rollback-process)
- [Security & Best Practices](#-security--best-practices)

---

## 🏆 Features & Overview

- **🔐 Authentication & Account Management:**
  - Secure Login, Registration (Individual & Organization), OTP Verification.
  - Real API integration for Password Reset (`/create-password` and `/forget-password`).
  - Open Redirect protection via Whitelisted path sanitization.
  - Role-based Route Protection via Next.js Middleware.

- **🎖️ Recognition & Rewards Catalog:**
  - Employee recognition feeds, peer kudos, and recognition rewards.
  - Dynamic Pricing Plans for Individuals & Organizations with Stripe Checkout integration.
  - Responsive design with WebP/AVIF asset support and micro-animations.

---

## 🚀 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Turbopack)
- **Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) & RTK Query
- **Styling & UI:** Tailwind CSS v4, Radix UI, Lucide Icons, Framer Motion, Sonner Toasts
- **Form Handling:** React Hook Form + Zod Validation

---

## 🔑 Required Environment Variables

Create a `.env` file in the project root by copying `.env.example`:

```bash
cp .env.example .env
```

| Variable Name | Description | Example / Default Value |
| :--- | :--- | :--- |
| `NODE_ENV` | Application execution environment (`development`, `production`, `test`) | `development` |
| `NEXT_PUBLIC_BASE_URL` | Backend REST API base URL | `https://api.elara.com/api/v1` |
| `NEXTAUTH_URL` | Dashboard base URL for role-based redirects | `https://dashboard.elara.com` |
| `NEXT_PUBLIC_SITE_URL` | Main Elara public website URL | `https://elara.com` |

> ⚠️ **Security Note:** Never commit actual `.env` files with secret keys to version control. `.env.local` and `.env.production.local` are ignored in `.gitignore`.

---

## 🛠️ Local Setup & Development

### 1. Prerequisites
- **Node.js:** v18.x or higher
- **npm:** v9.x or higher

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3041](http://localhost:3041) in your browser.

---

## 🧪 Automated Testing & Quality Checks

### Run Automated Tests
```bash
npm test
```
Runs the automated test suite for security validation, open redirect guards, and customer journey logic.

### Run Code Linting & Formatting
```bash
npm run lint        # Check for lint errors
npm run lint:fix    # Automatically fix auto-fixable lint errors
```

> 🛡️ Note: Lint checks are automatically executed during production builds (`ignoreDuringBuilds: false` in `next.config.ts`).

---

## 🏗️ Build & Production Run

### 1. Build for Production
```bash
npm run build
```

### 2. Start Production Server
```bash
npm run start
```
Starts the Next.js production server on port `3041`.

---

## 🚀 Deployment Steps

### Option A: Deploying on Vercel / Cloud Platforms
1. Connect the Git repository to Vercel/Cloud platform.
2. Set Environment Variables in Project Settings (`NEXT_PUBLIC_BASE_URL`, `NEXTAUTH_URL`).
3. Set Build Command: `npm run build`
4. Set Output Directory: Next.js default (`.next`)
5. Click **Deploy**.

### Option B: Deploying on a Node.js / PM2 Server
1. Clone the repository on the server:
   ```bash
   git clone <repository-url>
   cd elara-frontend-main
   ```
2. Install production dependencies:
   ```bash
   npm ci
   ```
3. Build the application:
   ```bash
   npm run build
   ```
4. Start with PM2:
   ```bash
   pm2 start npm --name "elara-frontend" -- run start
   pm2 save
   ```

---

## 🔄 Rollback Process

In case an issue is identified in a new production release, follow this simple rollback process:

### Instant Rollback (Vercel / Managed Platform)
1. Go to your Vercel Dashboard -> **Deployments**.
2. Find the previous stable build deployment.
3. Click the **...** menu next to the deployment and select **Promote to Production**.
4. The site will revert instantly without rebuilding.

### Manual Server Rollback (PM2 / Standalone Server)
1. Check git commit history to locate the last stable release tag/commit hash:
   ```bash
   git log --oneline -n 5
   ```
2. Checkout the previous stable commit tag:
   ```bash
   git checkout <last-stable-commit-hash-or-tag>
   ```
3. Reinstall dependencies & rebuild:
   ```bash
   npm ci
   npm run build
   ```
4. Restart PM2 process:
   ```bash
   pm2 restart elara-frontend
   ```

---

## 🛡️ Security & Best Practices

- **HttpOnly Cookie Tokens:** Access & Refresh tokens are managed securely and kept safe from script injection.
- **Open Redirect Guard:** All query-string redirect parameters are sanitized using `getSafeRedirectUrl()`.
- **Zero Sensitive Console Logging:** No passwords, OTPs, or token payload logs are output to browser console.
- **Validated Authentication:** Password reset and login processes interact directly with backend API endpoints with validation schemas.

---

## 📄 License

Private & Confidential - Elara. All rights reserved.
