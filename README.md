# Knowledge Base

A curated collection of workflows, standards, and best practices used across our projects. Published as a static documentation site.

## Installation

```bash
npm install
```

## Local Development

```bash
npm run start
```

Starts a local development server at <http://localhost:3000/knowledge-base/> with live reload.

## Build

```bash
npm run build
```

Generates the static site into the `build/` directory, ready to serve from any static host.

## Deployment

The site is published to GitHub Pages on the `gh-pages` branch.

Using SSH:

```bash
USE_SSH=true npm run deploy
```

Without SSH:

```bash
GIT_USER=<your-github-username> npm run deploy
```

## Adding Content

Drop new pages into `docs/` as `.md` or `.mdx` files. Folders become sidebar categories — see `docs/open-spec/_category_.json` for an example category config.
