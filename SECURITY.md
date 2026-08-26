# Security

Report vulnerabilities privately through GitHub Security Advisories. Never attach real credentials, raw build logs, authorization headers, cookies, private keys, source archives or artifact bodies.

The verifier is offline and non-executing. It rejects traversal, symlink inputs, oversized manifests, duplicate identifiers, malformed hashes, secret-shaped material and raw/log/body/content fields. Artifact writes stay inside an explicit workspace-relative directory and are verified by read-back. Hash agreement is not provenance authentication; pair this verifier with trusted signed provenance when authenticity matters.
