# Messan Marcus / Greetely - Frontend

An employee recognition, rewards, and engagement platform built with modern web technologies. This application provides a seamless experience for users and administrators to manage recognitions, rewards redemption, user profiles, and pricing plans.

---

## 🚀 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Turbopack)
- **UI Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) & RTK Query
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), shadcn/ui
- **Animations:** [Framer Motion](https://www.framer.com/motion/), [Lottie React](https://github.com/gamertart/lottie-react), React Fast Marquee
- **Form Handling & Validation:** [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)
- **Icons:** [Lucide React](https://lucide.dev/), React Icons
- **Notifications:** [Sonner](https://sonner.emilkowal.si/)
- **Code Quality & Git Hooks:** ESLint, Husky, Lint-staged

---

## ✨ Features

- **🔐 Authentication & Authorization:**
  - Login & Registration flows
  - OTP Verification & Password Recovery
  - Role-based Route Protection via Next.js Middleware

- **🏆 Recognition & Rewards System:**
  - Recognize peers and team members
  - Points redemption catalog
  - Testimonials & Resources section
  - Flexible Pricing plans

- **📊 Dashboard Management:**
  - Dedicated layouts for User and Admin workflows
  - Profile & Account Settings management

---

## 📁 Project Structure

```text
messanmarcus-frontend-main/
├── src/
│   ├── app/                    # Next.js App Router pages & layouts
│   │   ├── (auth)/             # Authentication routes (login, register, otp, reset)
│   │   ├── (dashboardLayout)/  # User & Admin dashboard pages
│   │   └── (defaultLayout)/    # Public pages (home, pricing, recognition, redeem)
│   ├── components/             # Reusable UI components & layouts
│   ├── constants/              # Global constants & navigation links
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Library configurations (e.g. utils, shadcn helper)
│   ├── redux/                  # Redux store, baseApi, and slices
│   ├── schema/                 # Zod validation schemas
│   ├── types/                  # TypeScript interface definitions
│   └── utils/                  # Utility helper functions
├── public/                     # Static assets (images, icons)
├── .env                        # Environment variables configuration
├── next.config.ts              # Next.js configuration
├── package.json                # Project dependencies & scripts
└── tsconfig.json               # TypeScript configuration
```

---

## 🛠️ Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** (v18.x or higher recommended)
- **npm**, **yarn**, or **pnpm**

### 1. Environment Setup

Create a `.env` file in the root directory (or update the existing one) with the following environment variables:

```env
NODE_ENV=development
NEXT_PUBLIC_BASE_URL="https://api.greetely.com/api/v1"
NEXTAUTH_URL="https://dashboard.greetely.com"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

Start the development server with Turbopack (runs on port `3041` by default):

```bash
npm run dev
```

Open [http://localhost:3041](http://localhost:3041) in your browser to view the application.

---

## 📜 Available Scripts

In the project directory, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server with Turbopack on port `3041`. |
| `npm run build` | Builds the application for production deployment. |
| `npm run start` | Starts the production server on port `3041`. |
| `npm run lint` | Runs ESLint to check for code formatting and syntax issues. |
| `npm run lint:fix` | Automatically fixes auto-fixable ESLint errors. |

---

## 🤝 Contributing & Guidelines

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

---

## 📄 License

Private & Confidential - Messan Marcus / Greetely. All rights reserved.
