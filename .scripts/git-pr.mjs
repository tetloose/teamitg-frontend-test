import { checkbox, confirm, input, select } from '@inquirer/prompts'
import { execSync, spawnSync } from 'node:child_process'

const currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim()

const remoteBranches = execSync('git branch -r --format="%(refname:short)"')
  .toString()
  .split('\n')
  .map((b) => b.trim().replace('origin/', ''))
  .filter((b) => b && b !== 'HEAD' && b !== currentBranch)
  .sort()

const baseBranch = await select({
  message: 'Base branch (PR target)',
  choices: ['main', ...remoteBranches.filter((b) => b !== 'main')].map((b) => ({ value: b })),
})

const lastCommit = execSync('git log -1 --pretty=%s').toString().trim()

const title = await input({
  message: 'PR title',
  default: lastCommit,
  validate: (v) => v.trim().length > 0 || 'Required',
})

const description = await input({
  message: 'Description (what does this PR do and why?)',
  validate: (v) => v.trim().length > 0 || 'Required',
})

const authorChecks = await checkbox({
  message: 'Author checklist — tick what applies',
  choices: [
    { value: 'reviewed', name: 'I have reviewed my own code before requesting review', checked: true },
    { value: 'linting', name: 'Linting passes with no errors', checked: true },
    { value: 'storybook', name: 'A Storybook story has been added if this is a new component' },
    { value: 'test', name: 'A test has been added if this PR contains new logic' },
  ],
})

const checked = (label, value, checks) =>
  `- [${checks.includes(value) ? 'x' : ' '}] ${label}`

const body = `## Description

${description.trim()}

## Author Checklist

${checked('I have reviewed my own code before requesting review', 'reviewed', authorChecks)}
${checked('Linting passes with no errors', 'linting', authorChecks)}
${checked('A Storybook story has been added if this is a new component', 'storybook', authorChecks)}
${checked('A test has been added if this PR contains new logic', 'test', authorChecks)}

## Reviewer Checklist

- [ ] Code is clear and understandable
- [ ] Logic and edge cases have been considered
- [ ] No obvious performance or security concerns
`

console.log('\n─────────────────────────────────────')
console.log(`  Branch : ${currentBranch} → ${baseBranch}`)
console.log(`  Title  : ${title}`)
console.log('─────────────────────────────────────\n')
console.log(body)

const ok = await confirm({ message: 'Create PR?' })

if (!ok) {
  console.log('Aborted.')
  process.exit(0)
}

const result = spawnSync(
  'gh',
  ['pr', 'create', '--base', baseBranch, '--title', title, '--body', body],
  { stdio: 'inherit' },
)

if (result.status !== 0) process.exit(result.status ?? 1)
