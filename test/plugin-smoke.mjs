import assert from 'node:assert/strict'
import { createDefinitions } from '../index.js'
import { fixture, json } from './helpers.mjs'
const definitions = createDefinitions({}, { workspaceRoot: process.cwd() }); assert.deepEqual(definitions.map(row => row.name), ['dsh_reproducible_build_inspect', 'dsh_reproducible_build_verify']); const result = await definitions[0].execute({ manifestJson: json(await fixture()) }); assert.equal(result.executesBuilds, false); process.stdout.write('plugin smoke passed: 2 tools\n')
