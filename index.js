import { inspectReproducibleBuildManifestJson, verifyReproducibleBuildManifest } from './lib/reproducible-build-proof.mjs'

export const name = 'dsh-reproducible-build-proof'
export const inject = ['tools']
const renderJson = (_args, value) => [{ type: 'text', text: JSON.stringify(value, null, 2) }]
const define = value => ({ ...value, output: { schema: {}, render: renderJson } })

export function createDefinitions(_ctx = {}, config = {}) {
  const workspaceRoot = config.workspaceRoot || process.cwd()
  return [
    define({ name: 'dsh_reproducible_build_inspect', description: 'Inspect bounded hashes and counts from an explicit reproducible-build evidence manifest.', parameters: { type: 'object', required: ['manifestJson'], properties: { manifestJson: { type: 'string' } }, additionalProperties: false }, execute: async ({ manifestJson }) => inspectReproducibleBuildManifestJson(manifestJson) }),
    define({ name: 'dsh_reproducible_build_verify', description: 'Verify independent build receipts converge on byte-identical specified outputs and write a redacted content-addressed report.', parameters: { type: 'object', required: ['manifestPath', 'artifactDir'], properties: { manifestPath: { type: 'string' }, artifactDir: { type: 'string' } }, additionalProperties: false }, execute: async args => verifyReproducibleBuildManifest({ workspaceRoot, ...args }) })
  ]
}
export function apply(ctx, config = {}) { for (const definition of createDefinitions(ctx, config)) ctx.tools.register(definition) }
