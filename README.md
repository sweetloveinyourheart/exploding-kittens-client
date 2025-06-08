# Exploding Kittens Online Client

A modern web client for playing Exploding Kittens online with friends. Built with Next.js, React, and a beautiful, responsive UI.

## Features

- 🎮 Real-time multiplayer Exploding Kittens gameplay
- 🧑‍🤝‍🧑 Guest login and lobby creation/joining
- 💬 Animated banners and notifications for game actions
- 🃏 Interactive card deck, discard pile, and player hand UI
- 🌗 Light/dark theme support
- 🛡️ Authentication with NextAuth.js
- ⚡ Fast, type-safe gRPC communication with the backend
- 🧪 Jest-based unit testing

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, React 19)
- **Language:** TypeScript
- **UI:** React, Radix UI, Tailwind CSS, Framer Motion
- **State/Forms:** React Hook Form, Zod
- **Authentication:** NextAuth.js
- **gRPC/Web:** @connectrpc/connect, @connectrpc/connect-web
- **3D/Graphics:** three.js, @react-three/fiber, @react-three/drei
- **Utilities:** clsx, class-variance-authority, tailwind-merge, lucide-react, sonner
- **Testing:** Jest, ts-jest, @types/jest
- **Linting:** ESLint, eslint-config-next
- **Package Manager:** pnpm

---
## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended)
- [pnpm](https://pnpm.io/) (v9+ recommended)

### Installation
Set up your environment variables, and run the installation command:

```sh
export GIT_PAT="Personal_Access_Token_value"
pnpm install 
```

---
## Running locally

### Local development
Run this following command to start developing

```sh
pnpm dev
```

---
## To test the docker image to deploy...

### Build it

```bash
docker build . \
	-t kittens-client \ 
	--build-arg GIT_PAT=${GIT_PAT}
```

### Run it

```bash
docker run -d -p 3000:3000 \
	--name=kittens-client \
	--env NEXT_PUBLIC_CLIENTSERVER_TRANSPORT_URL=http://localhost:50051 \
	--env NEXTAUTH_URL=http://localhost:3000 \
	--env NEXTAUTH_SECRET=AoFo3iNIjEbycDa+f3L7U0A2bFu5nWh/khssqwWNF7U= \
	-t kittens-client
```

---
## Development

### Lint
To run linting check
```sh
pnpm lint
```

### Run Tests
To run all tests with jest
```sh
pnpm test
```

### Build
To build standalone application
```sh
pnpm build
```

---
Made with chaos and cuteness · © 2025 Exploding Kittens Online