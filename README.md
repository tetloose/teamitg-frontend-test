# TeamITG - Frontend Test

- [Repo](https://github.com/tetloose/teamitg-frontend-test)

A React 19 application built with Vite, TypeScript, and Storybook. The app fetches and renders content from an API, with a component architecture following atoms → molecules → components → layouts. All UI is developed in isolation via Storybook with mock data, tested with Vitest and React Testing Library, and styled with SCSS modules using a token-based design system.

## Why a Custom Boilerplate

The provided test boilerplate was reviewed but set aside after running into a setup issue on first install. Rather than debug an unfamiliar scaffold under time pressure, I opted to use my own boilerplate - one I maintain and know inside out.

The other reason is TypeScript. The test repo ships with vanilla JavaScript, but I find TypeScript genuinely faster to work in. Autocomplete, type inference, and compile-time errors catch mistakes before they hit the browser, which means less time debugging and more time building. It also makes the codebase self-documenting - prop shapes, return types, and API contracts are explicit rather than implied. For a technical test where clarity and quality are being assessed, TypeScript felt like the right call.

## Stack

- React 19 + TypeScript
- Vite 6
- Vitest + React Testing Library
- Storybook 10
- SCSS Modules + design tokens
- React Router
- React Hot Toast
- ESLint (flat config) + Stylelint + Prettier
- Husky + commitlint + lint-staged

## Setup

### Clone with ssh

- `git clone git@github.com:tetloose/teamitg-frontend-test.git`

### Clone with HTTPS

- `git clone https://github.com/tetloose/teamitg-frontend-test.git`

### Windows / Linux

- in VSCode / Cursor -> `ctrl shift p` → type `recommended` → install recommended VSCode plugins

### Mac

- in VSCode / Cursor -> `cmd shift p` → type `recommended` → install recommended VSCode plugins

### Terminal

1. `nvm use`
2. `npm run setup`

## Commands

### Development

| Command | Description |
|---|---|
| `npm run setup` | Install packages, initialise Husky, and start the dev server |
| `npm run dev` | Start the app in development mode at `http://localhost:3000` |
| `npm run build` | Type-check and build for production to `build/` |
| `npm run preview` | Preview the production build locally |

### Testing

| Command | Description |
|---|---|
| `npm run test` | Run Vitest in interactive watch mode |
| `npm run test:coverage` | Run tests with coverage report |

### Linting

| Command | Description |
|---|---|
| `npm run lint` | Lint TypeScript and SCSS |
| `npm run lint:fix` | Lint and auto-fix TypeScript and SCSS |

### Watch

| Command | Description |
|---|---|
| `npm run watch` | Run TypeScript, ESLint and Stylelint watchers concurrently |
| `npm run watch:typescript` | TypeScript watch only |
| `npm run watch:eslint` | ESLint watch only |
| `npm run watch:styles` | Stylelint watch only |

### Storybook

| Command | Description |
|---|---|
| `npm run storybook` | Start Storybook at `http://localhost:6006` |
| `npm run build-storybook` | Build Storybook for production |

### Git

| Command | Description |
|---|---|
| `npm run git:branch` | Create a new branch interactively |
| `npm run git:commit` | Commit with structured prompt (type, scope, message) |
| `npm run git:pr` | Push branch and open a pull request |

### Code Generation

| Command | Description |
|---|---|
| `npm run gen:component` | Generate a component, hook, context, or util |

## Linting

The project enforces quality at every layer:

- **ESLint** - flat config with strict rules: no `any`, consistent type imports, import sort order, accessibility (jsx-a11y), complexity limits (SonarJS), unused imports, and React-specific rules. All rules are set to `error` - no warnings.
- **Stylelint** - enforces SCSS property order, BEM naming conventions, and disallows unknown functions.
- **Prettier** - formatting is enforced via the ESLint Prettier plugin, not run separately.
- **commitlint** - commit messages must follow Conventional Commits (`feat`, `fix`, `chore`, etc.). Enforced via a Husky `commit-msg` hook on every commit.
- **lint-staged** - runs ESLint and Stylelint only on staged files before each commit via the `pre-commit` hook.
- **TypeScript** - `tsc --noEmit` runs on `pre-push` to catch type errors before code reaches the remote.

## Code Generation (Plop.js)

Rather than creating files by hand, all new code is scaffolded using Plop.js:

```bash
npm run gen:component
```

The generator prompts for a type (`component`, `hook`, `context`, `util`), a location (`atoms`, `molecules`, `components`, `layouts`), and a name. It then generates the full file set in one step - component, SCSS module, types, constants, mock, story, test, and co-located hook files - all pre-wired and following project conventions. This eliminates boilerplate, enforces consistency, and means every new piece of code starts in a valid, lintable state.

## Git Scripts

Three interactive scripts handle the git workflow to keep branch names and commit messages consistent:

| Script | Description |
|---|---|
| `npm run git:branch` | Prompts for a branch type and name, creates and checks out the branch |
| `npm run git:commit` | Prompts for type, scope, and description - formats and commits automatically |
| `npm run git:pr` | Pushes the current branch and opens a pull request |

These sit on top of the Husky hooks and commitlint config to ensure nothing non-conforming can be committed or pushed.

## AI Workflow

I use Claude as a coding agent, but with guardrails. The approach is: I define the standards, the agent follows them.

Before any AI-assisted work begins, the project coding standards are written into a `.claude/CLAUDE.md` file at the root of the project. This document covers architecture, file structure, naming conventions, component hierarchy, SCSS patterns, import order, testing approach, and Storybook rules. It acts as a persistent instruction set that the agent reads at the start of every session.

The workflow in practice:

- I write the foundational pieces by hand - architecture decisions, base utilities, the first implementation of a pattern
- Once a pattern is established and documented in `CLAUDE.md`, the agent is trained on it and can reproduce it accurately at scale
- The agent handles all the repetitive work: generating component sets, writing tests, wiring up stories, applying consistent patterns across the codebase
- I focus on the features - the logic, the decisions, the things that require judgement

The `CLAUDE.md` document is what prevents hallucinations and deviations. Without it, AI agents tend to invent their own patterns or drift from the project's conventions. With it, every generated file looks like it was written by the same developer. The document is treated as a living standard - updated whenever a new pattern is established.

## VSCode / Cursor

`cmd shift p` / `ctrl shift p` → type `recommended` to install the workspace-recommended extensions.

[React Developer Tools](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) - install in Chrome for component inspection.

### Managing File Visibility with Workspaces

The [Workspaces](https://marketplace.visualstudio.com/items?itemName=Fooxly.workspace) extension lets you show and hide files and folders in the Explorer panel without deleting them or adding them to `.gitignore`. Useful for keeping config-heavy projects clean by surfacing only the files relevant to your current task.

Install it via the recommended extensions prompt above, then configure visibility rules in `.vscode/settings.json` under the `workspaces` key.
