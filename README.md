# Exploding Kittens Online Client

A modern web client for playing Exploding Kittens online with friends. Built with Next.js, React, and a beautiful, responsive UI.

<p float="left">
<img width="200" alt="Screenshot 2025-07-07 at 11 09 24" src="https://github.com/user-attachments/assets/fe0709d5-dfb7-4249-96cf-5e6b58f26ef3" />
<img width="200" alt="Screenshot 2025-07-07 at 11 09 07" src="https://github.com/user-attachments/assets/8d5adfd8-286d-46f4-93e4-5c89307b97a2" />
<img width="200" alt="Screenshot 2025-07-07 at 11 08 18" src="https://github.com/user-attachments/assets/83a51b3f-a7d5-462c-936e-c390a0c9f3b9" />
<img width="200" alt="Screenshot 2025-07-07 at 11 08 26" src="https://github.com/user-attachments/assets/8edb01af-1048-4b73-bfe4-6ac605f280f6" />
<img width="200" alt="Screenshot 2025-07-07 at 11 10 26" src="https://github.com/user-attachments/assets/24290860-13fd-4702-8a57-1bdb31cc1b96" />
<img width="200" alt="Screenshot 2025-07-07 at 11 10 17" src="https://github.com/user-attachments/assets/1ef9f6d3-985b-44bd-a6df-5c40f00bdfa8" />
</p>

---
## Getting Started

This section provides an overview of how the game is structured and how its core components interact. It’s a good place to begin if you're new to the project or planning to contribute.

- [Recommended Tooling](#recommended-tooling)
- [Running Locally](#running-locally)
- [Development & Testing](#development)

---
## Recommended Tooling

The recommended way to deal with tooling and versions is to use [asdf](https://asdf-vm.com/#/). This will allow you to install and manage multiple versions of the same tool on your machine. 
Additionally, [direnv](https://direnv.net/) is also recommended to manage local environment variables using .env and .env.local files (See samples)

### Installation
First install `asdf` and `direnv`, then reload your profile for changes to take effect.
Either restart your terminal application or run `source ~/.*rc`.

* MacOS:
```shell
brew install asdf direnv
source ~/.zshrc

asdf plugin-add direnv
asdf direnv setup --shell bash --version latest

cut -d' ' -f1 .tool-versions|xargs -I{} asdf plugin add {}
asdf install
asdf direnv allow
```

* Linux:
```shell
asdf plugin-add direnv
asdf direnv setup --shell bash --version latest

cut -d' ' -f1 .tool-versions|xargs -i asdf plugin add  {}
asdf install
asdf direnv allow
```

---
## Running locally

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended)
- [pnpm](https://pnpm.io/) (v9+ recommended)

### Installation
First copy `.env.sample` to `.env`, and fill in the appropriate / missing values.

```
cp .env.local.example .env.local
```

To install all packages and dependencies, run the installation command:

```sh
pnpm install 
```

### Running in dev mode
Run this following command to start developing

```sh
pnpm dev
```

### Building Containers

#### Build it

```bash
docker build . \
	--build-arg GIT_PAT=${GIT_PAT} \
	-t kittens-client
```

#### Run it

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
<p align="center">Made with chaos and cuteness · © 2025 Exploding Kittens Online</p>
