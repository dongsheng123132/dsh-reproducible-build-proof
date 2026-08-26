# DSH Reproducible Build Proof

An offline, deterministic evidence layer for DeepSeek Harness supply chains. It checks whether two or more independently operated builders recorded the same source revision, recipe, build type, parameters, dependency set and relevant environment contract, then produced byte-identical specified artifacts.

It **does not execute** a build, install a package, authenticate provenance, issue a SLSA Verified Property, or claim protection against source, dependency or distribution threats. It verifies explicit hash-only receipts; use a provenance/signature verifier to establish receipt authenticity.

## Complementary boundary

- `dsh-release-proof` checks multiple download endpoints for HTTP status, length, version and SHA-256 agreement.
- `dsh-attestation-proof` verifies DSSE/in-toto signature, subject and signer-threshold policy.
- This plugin checks independent rebuild convergence: equivalent declared inputs, distinct allowed builders/operators/environments, and the exact specified output set.

This follows the narrow reproducible-build definition of bit-for-bit identical specified outputs and the SLSA distinction that verified reproducibility requires two or more independently operated build platforms. It does not conflate reproducibility with total supply-chain security.

## Install

```bash
dsh plugin add github:dongsheng123132/dsh-reproducible-build-proof#COMMIT
```

The bundle exposes `dsh_reproducible_build_inspect` and `dsh_reproducible_build_verify` from one headless core. The independent MCP stdio server exposes `reproducible_build_inspect` and `reproducible_build_verify`. The CLI accepts `inspect` or `verify` plus an explicit JSON path.

See [`examples/reproduced.json`](examples/reproduced.json). Reports contain only hashes, sizes, counts, booleans and verdicts. Secret-shaped material, raw logs and body/content fields are rejected. The DSH verify tool reads a workspace-relative non-symlink manifest, writes only to an explicit workspace-relative `artifactDir`, creates deterministic content-addressed output exclusively, and verifies it by read-back.

```bash
npm test
npm run check
npm run smoke:plugin
npm run smoke:mcp
python C:/Users/YOU/.codex/skills/.system/plugin-creator/scripts/validate_plugin.py .
```

Node.js 22 or newer is required. The verifier has no runtime dependency and makes no network request.
