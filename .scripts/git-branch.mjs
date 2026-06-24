import { confirm, input, select } from '@inquirer/prompts'
import { spawnSync } from 'node:child_process'

const TYPES = ['feat', 'fix', 'refactor', 'chore', 'docs', 'test', 'style', 'ci']

const type = await select({
  message: 'Type',
  choices: TYPES.map((t) => ({ value: t }))
})

const description = await input({
  message: 'Short description (kebab-case)',
  validate: (v) => v.trim().length > 0 || 'Required'
})

const slug = description
  .trim()
  .toLowerCase()
  .replaceAll(/[^a-z0-9\s-]/g, '')
  .replaceAll(/\s+/g, '-')
  .replaceAll(/-+/g, '-')

const branchName = `${type}/${slug}`

console.log(`\n  → ${branchName}\n`)

const ok = await confirm({ message: 'Create branch?' })

if (!ok) {
  console.log('Aborted.')
  process.exit(0)
}

const result = spawnSync('git', ['checkout', '-b', branchName], { stdio: 'inherit' })

if (result.status !== 0) process.exit(result.status ?? 1)
