# Coding Standards

## Version Control

Always use the interactive git scripts — never raw git commands:

- `npm run git:branch` — create a new branch before starting any work
- `npm run git:commit` — commit using the structured prompt (type, scope, message)
- `npm run git:pr` — push and open a pull request

Branch naming follows `{type}/{slug}` (e.g. `feat/button-variants`). Commit format follows `{type}({scope}): {description}` and is enforced by commitlint.

## Generating New Files

Always use the generator — never create files by hand:

```bash
npm run gen:component
```

Prompts for type first: `component`, `hook`, `context`, `util`, `page`. Then asks for location (atoms/molecules/components/layouts) and name where applicable. Do not skip or partially generate — every file in the set serves a purpose.

## Architecture

### `src/` — all application code

- `pages/` — pages that wire hooks to layouts. Each page calls its hook and passes props down. Functional tests live here.
- `atoms/` `molecules/` `components/` `layouts/` — pure UI, no hooks, developed in Storybook with mock data
- `hooks/` — data fetching and state, unit tested with mocks
- `context/` — shared state via `createContext` utility
- `crud/` — raw fetch utilities (`request.crud.ts`), no React
- `utils/` — pure functions, no React
- `routes/` — route definitions, always point to `app/` pages
- `styles/` — global SCSS, tokens, mixins

Layouts are dumb — they receive props and render. Pages own the data layer by calling hooks and passing results to layouts. Storybook tests layouts with mock props only — no hooks, no context wiring needed.

## Component Hierarchy

- **Atoms** — base HTML elements, single responsibility, fully typed variants
- **Molecules** — composed from atoms only, no raw HTML
- **Components** — composed from atoms and molecules only, no raw HTML
- **Layouts** — pure dumb components, receive props, composed from atoms/molecules/components only, no hooks, no raw HTML
- **Pages** (`pages/`) — call hooks, pass props to layouts, no JSX logic beyond wiring

After atoms, write no raw HTML. Compose existing pieces.

## File Structure

Each component has co-located files:

```
name/
├── name.component.tsx     # UI only, clsx for class composition
├── name.module.scss       # SCSS module, BEM naming
├── name.types.ts          # Props types
├── name.constants.ts      # Constants, option sets (as const arrays)
├── name.mock.ts           # Typed mock data for stories and tests
├── name.stories.tsx       # Storybook story, always uses mock data
└── name.test.tsx          # Vitest + React Testing Library
```

Pages in `pages/` are minimal — just two files:

```
pages/name/
├── name.page.tsx      # calls hook, passes props to layout
└── name.test.tsx      # functional tests against mocked API data
```

Each component also generates a co-located hook:

```
hooks/use-name/
├── use-name.hooks.ts      # Data fetching / state logic
├── use-name.types.ts      # Hook-specific types
└── use-name.test.ts       # Vitest, mocks useContent or fetch
```

Hooks, utils, and context follow the same co-location principle — types, constants, and tests alongside the implementation.

## Constants Pattern

Use `as const` arrays as the source of truth for option sets. Derive types from them — never duplicate manually:

```ts
export const TYPOGRAPHY_SIZES = ['sml', 'med', 'lrg', 'xlrg'] as const
export type TypographySize = (typeof TYPOGRAPHY_SIZES)[number]
```

## SCSS

- SCSS modules (`.module.scss`) — scoped per component, BEM naming
- Global tokens in `src/styles/settings/tokens.scss` — access via `tokens()` function
- `rem()` mixin for all size values — never raw `px` in components
- `deep-get($tokens, category, key)` for nested token values
- `@use '@styles/settings' as *` in every module that needs tokens or mixins
- `clsx` for conditional class composition in components
- No inline styles
- Stylelint enforces SCSS quality and property order

## Storybook

Every atom, molecule, component, and layout must have a story. Documentation is auto-generated via autodocs — never write MDX files. Stories must:

- One `Default` story per component — controls handle all variants, never create multiple named stories
- Set `args` at the meta level from the co-located `.mock.ts` file
- Use `@storybook/react-vite` for `Meta` and `StoryObj` types
- Use a `render` function when the component needs hooks or context
- Set `parameters.layout` to `'centered'` for atoms/molecules/components, `'fullscreen'` for layouts

## TypeScript

- Strict mode — no `any`
- Always use `import type` for type-only imports
- Derive types from constants where possible
- `GlobalClassNames = { classNames?: string[] }` spread pattern for className passthrough

## ESLint and Imports

Follow all ESLint rules. Import order is enforced by `simple-import-sort`:

1. Side-effect imports
2. React / react-dom
3. Third-party packages
4. Internal aliases (`@pages`, `@context`, `@hooks`, `@routes`, `@crud`, `@utils`, `@components`, `@atoms`, `@molecules`, `@layouts`, `@global`)
5. Relative imports (`../`, `./`)
6. Type imports (`.types`)
7. Assets (images, svg)
8. `clsx`
9. SCSS modules (`.module.scss`, `.scss`)

Always use path aliases (`@atoms/`, `@hooks/`, etc.) unless importing from within the same directory — then `./` is correct. Stories always use `./` relative imports for their co-located component.

## Testing

Every component, hook, util, and context must have a test. Test what the component does, not how it does it:

- Components: render output, conditional rendering, correct element count
- Hooks: return values via `renderHook`, mock `useContent` or fetch
- Context: initial state, state updates, throws when used outside provider
- Utils: input → output, edge cases

Never mock hooks in layout tests — layouts are pure and receive props directly. Mock hooks only in page tests (`pages/`) where the hook is wired in. Layout tests render with explicit mock props from the co-located `.mock.ts` file. Never test implementation details.
