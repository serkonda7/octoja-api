# Changelog
## 0.1.0
_unreleased_

- Initial release, generated from Octoja API 1.1.1013
- `createOctojaClient` / `OctojaClient`: technician facade over all non-agent routes,
  incl. `integrations.<vendor>` for 22 PSA/backup/security integrations
- `createAgentClient` / `OctojaAgentClient`: device-agent facade for `/api/agents/...`
- `auth.login` / `auth.refresh` store the access token on the client instance
- `OctojaApiError` thrown on non-2xx responses
