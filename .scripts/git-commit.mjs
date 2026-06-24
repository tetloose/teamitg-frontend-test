import { confirm, input, select } from '@inquirer/prompts'
import { spawnSync } from 'node:child_process'

const TYPES = ['feat', 'fix', 'refactor', 'chore', 'docs', 'test', 'style', 'ci']
const SCOPES = ['ui', 'api', 'dx']

const type = await select({
  message: 'Type',
  choices: TYPES.map((t) => ({ value: t }))
})

const scopeChoice = await select({
  message: 'Scope',
  choices: [...SCOPES.map((s) => ({ value: s })), { value: 'custom', name: 'custom...' }]
})

const scope =
  scopeChoice === 'custom'
    ? await input({
        message: 'Custom scope',
        validate: (v) => v.trim().length > 0 || 'Required'
      })
    : scopeChoice

const description = await input({
  message: 'Commit message',
  validate: (v) => v.trim().length > 0 || 'Required'
})

const commitMessage = `${type}(${scope}): ${description.trim().toLowerCase()}`

console.log(`\n  → ${commitMessage}\n`)

const ok = await confirm({ message: 'Commit?' })

if (!ok) {
  console.log('Aborted.')
  process.exit(0)
}

spawnSync('git', ['add', '-A'], { stdio: 'inherit' })

const result = spawnSync('git', ['commit', '-m', commitMessage], { stdio: 'inherit' })

if (result.status !== 0) process.exit(result.status ?? 1)
