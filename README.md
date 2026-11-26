# diligent-tetragon

A Node.js project scaffolded with a clean structure, sensible defaults, and a thorough `.gitignore` so only source-controlled files ever reach the repository.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Clone the Repository](#clone-the-repository)
  - [Install Dependencies](#install-dependencies)
  - [Run in Development](#run-in-development)
  - [Build for Production](#build-for-production)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**diligent-tetragon** is a lightweight, well-organised Node.js starter that provides:

- A clean directory layout to keep source code, tests, and configuration files separated.
- A comprehensive `.gitignore` that excludes `node_modules/`, build artifacts, environment files, and OS/IDE noise so the repository stays lean.
- Conventional commit practices and clear contribution guidelines.

---

## Features

- Node.js / npm workspace-ready
- Pre-configured `.gitignore` covering `node_modules`, logs, build output, environment files, OS files, and editor metadata
- Ready for ESLint, Prettier, Jest (or Vitest), and TypeScript — add them as your project grows
- GitHub Actions-friendly structure

---

## Prerequisites

| Tool | Minimum Version | Notes |
|------|----------------|-------|
| [Node.js](https://nodejs.org/) | 18.x LTS | Use [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm) to manage versions |
| [npm](https://www.npmjs.com/) | 9.x | Bundled with Node.js |
| [Git](https://git-scm.com/) | 2.x | Required for version control |

---

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/girishlade111/diligent-tetragon.git
cd diligent-tetragon
```

### Install Dependencies

```bash
npm install
```

> `node_modules/` is excluded by `.gitignore` and must be installed locally on every machine that checks out the repository.

### Run in Development

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

---

## Project Structure

```
diligent-tetragon/
├── src/                  # Application source code
│   ├── index.js          # Entry point
│   └── ...
├── tests/                # Unit and integration tests
├── .gitignore            # Files and directories excluded from Git
├── .env.example          # Template for environment variables (safe to commit)
├── package.json          # Project manifest and scripts
└── README.md             # You are here
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in the values. **Never commit `.env`** — it is listed in `.gitignore`.

```bash
cp .env.example .env
```

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Port the server listens on (default: `3000`) |
| `NODE_ENV` | No | Runtime environment: `development`, `test`, or `production` |
| `DATABASE_URL` | Yes | Connection string for the database |
| `API_KEY` | Yes | Secret API key for the external service |

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Compile and bundle for production |
| `npm test` | Run the test suite |
| `npm run lint` | Lint source files with ESLint |
| `npm run format` | Format source files with Prettier |

---

## Contributing

Contributions, bug reports, and feature requests are welcome.

1. Fork this repository.
2. Create a feature branch: `git checkout -b feat/your-feature-name`
3. Commit your changes following [Conventional Commits](https://www.conventionalcommits.org/): `git commit -m "feat: add awesome feature"`
4. Push the branch: `git push origin feat/your-feature-name`
5. Open a Pull Request against `main`.

Please make sure all tests pass and the linter reports no errors before opening a PR.

---

## License

This project is licensed under the [MIT License](LICENSE).

> Built and maintained by [girishlade111](https://github.com/girishlade111).
