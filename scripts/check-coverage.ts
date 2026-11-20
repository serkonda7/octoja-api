import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Verify every generated SDK function is wrapped by at least one facade
 * resource (`src/{octoja,agent}/resources/**`). Exits non-zero when an
 * operation is missing, e.g. after `bun run generate` picked up new endpoints.
 */
const ROOT = join(import.meta.dir, '..')
const sdk = readFileSync(join(ROOT, 'src', 'generated', 'sdk.gen.ts'), 'utf8')
const all = [...sdk.matchAll(/^export const (\w+) = /gm)].map((m) => m[1])

/** SDK functions intentionally wrapped by more than one facade. */
const SHARED = new Set(['postAuthLogin', 'postAuthLogout', 'postAuthRefresh'])

const usage = new Map<string, string[]>()
for (const dir of ['octoja', 'agent']) {
	const base = join(ROOT, 'src', dir, 'resources')
	for (const file of readdirSync(base, { recursive: true }).map(String)) {
		if (!file.endsWith('.ts')) {
			continue
		}
		const src = readFileSync(join(base, file), 'utf8')
		for (const m of src.matchAll(/await (\w+)\(\s*\{/g)) {
			const list = usage.get(m[1]) ?? []
			list.push(`${dir}/${file}`)
			usage.set(m[1], list)
		}
	}
}

const missing = all.filter((fn) => !usage.has(fn))
const duplicated = [...usage].filter(([fn, files]) => !SHARED.has(fn) && new Set(files).size > 1)

console.log(`${all.length - missing.length}/${all.length} SDK functions wrapped`)
for (const fn of missing) {
	console.log(`  missing: ${fn}`)
}
for (const [fn, files] of duplicated) {
	console.log(`  duplicated: ${fn} (${[...new Set(files)].join(', ')})`)
}
if (missing.length > 0 || duplicated.length > 0) {
	process.exit(1)
}
