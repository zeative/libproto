import { defineConfig } from 'rolldown'
import json from '@rollup/plugin-json'
import { readFileSync } from 'fs'
import { builtinModules } from 'module'

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))
const dependencies = [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})]

const externalizeDeps = () => {
	return {
		name: 'externalize-deps',
		resolveId(id) {
			if (dependencies.some(dep => id === dep || id.startsWith(dep + '/'))) {
				return { id, external: true }
			}
			if (builtinModules.includes(id) || id.startsWith('node:')) {
				return { id, external: true }
			}
		}
	}
}

export default defineConfig([
	{
		input: 'src/index.ts',
		output: {
			file: 'lib/index.mjs',
			format: 'esm',
			sourcemap: true
		},
		platform: 'node',
		plugins: [externalizeDeps(), json()]
	},
	{
		input: 'src/index.ts',
		output: {
			file: 'lib/index.cjs',
			format: 'cjs',
			sourcemap: true
		},
		platform: 'node',
		plugins: [externalizeDeps(), json()]
	}
])
