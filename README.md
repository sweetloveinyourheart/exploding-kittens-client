# Exploding Kittens Online Client

A modern web client for playing Exploding Kittens online with friends. Built with Next.js, React, and a beautiful, responsive UI.

---
## Getting Started

This section provides an overview of how the game is structured and how its core components interact. It’s a good place to begin if you're new to the project or planning to contribute.

- [Recommended Tooling](#recommended-tooling)
- [Running Locally](#running-locally)

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

---
## Building Containers

### Build it

```bash
docker build . \
	--build-arg GIT_PAT=${GIT_PAT} \
	-t kittens-client
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
<p align="center">Made with chaos and cuteness · © 2025 Exploding Kittens Online</p>