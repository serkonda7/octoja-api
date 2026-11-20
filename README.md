# octoja-api
[![CI][ci-badge]][ci-status]
[![npm version][npm-badge]][npm-link]
[![npm updated][npm-date-badge]][npm-link]

TypeScript client for the Octoja RMM API.


## ℹ️ Disclaimer
This project is an _unofficial_ API client for Octoja.

It is not affiliated with, endorsed by, or sponsored by Octoja or its owners.
Octoja and related trademarks remain the property of their respective owners.

Use of this package requires valid access to an Octoja instance and appropriate permissions.

The authors provide this client as-is and make no guarantees regarding correctness, availability,
compatibility, or future changes of the Octoja API.



## 📦 Installation
```sh
bun install octoja-api
```


## 🚀 Usage
The package ships three layers:

| Layer                 | Entry point                                           | Auth                               |
| --------------------- | ----------------------------------------------------- | ---------------------------------- |
| Technician/API facade | `createOctojaClient` → `OctojaClient`                 | user access token                  |
| Device-agent facade   | `createAgentClient` → `OctojaAgentClient`             | agent access token                 |
| Raw generated SDK     | `getCustomers`, `postAuthLogin`, ... (610+ functions) | `client` singleton or `{ client }` |

The facades return response bodies directly and throw an `OctojaApiError` on non-2xx responses.

### Authenticate
Octoja issues short-lived bearer tokens from `POST /api/auth/login`. The facades send them as
`Authorization: Bearer <token>`; `auth.login` / `auth.refresh` store the new access token on the
client automatically.

```ts
import { createOctojaClient } from 'octoja-api'

const octoja = createOctojaClient({ baseUrl: 'https://acme.eu1.octoja.cloud' })

const { refreshToken, expiresIn } = await octoja.auth.login({
  mailAddress: process.env.OCTOJA_USER!,
  password: process.env.OCTOJA_PASS!,
  // totp: '123456', // when 2FA is enabled
})

// later, before the access token expires:
await octoja.auth.refresh(refreshToken)
```

Already have a token? Pass it directly: `createOctojaClient({ baseUrl, token })`, and rotate it
with `octoja.setToken(nextToken)`.

### Make requests
```ts
import { createOctojaClient, OctojaApiError } from 'octoja-api'

const octoja = createOctojaClient({ baseUrl: 'https://acme.eu1.octoja.cloud', token })

try {
  // GET /api/customers?search=acme
  const customers = await octoja.customers.list({ search: 'acme' })

  // GET /api/customers/{id}/dashboard
  const dashboard = await octoja.customers.dashboard(customers[0].id)

  // Integrations are grouped per vendor
  const jira = await octoja.integrations.jira.settings()
} catch (error) {
  if (error instanceof OctojaApiError) {
    console.error(error.message, error.status, error.body)
  } else {
    throw error
  }
}
```

Full method reference (regenerated via `bun run docs`): [`docs/octoja-client.html`](./docs/octoja-client.html).


## 🤖 Device-agent client
`/api/agents/...` routes called by the installed Octoja agent (check results, inventory reports,
patch results, agent tickets, ...) are grouped in a separate client, so agent and technician
tokens never share an instance.

```ts
import { createAgentClient } from 'octoja-api'

const agent = createAgentClient({ baseUrl: 'https://acme.eu1.octoja.cloud' })
await agent.auth.login({ agentId, secret })

const assignments = await agent.checkAssignments.list()
```

Full method reference: [`docs/agent-client.html`](./docs/agent-client.html).


## 🧰 Raw SDK
Every operation is also exported as a generated function. Pass `{ client }` to use a facade's
isolated instance, or configure the shared singleton:

```ts
import { client, getCustomers } from 'octoja-api'

client.setConfig({
  baseUrl: 'https://acme.eu1.octoja.cloud',
  headers: { Authorization: `Bearer ${token}` },
})

const { data, error } = await getCustomers({ query: { search: 'acme' } })
```


## 🛠️ Development
```sh
bun install
bun run generate   # regenerate src/generated from openapi/*.json
bun run check      # typecheck
bun run coverage   # every SDK function is wrapped by a facade resource
bun run lint
bun run docs       # regenerate docs/*.html
bun run build
```


## 📜 License
The Octoja API and specification are proprietary to their respective owners.


[ci-badge]: https://github.com/serkonda7/octoja-api/actions/workflows/ci.yml/badge.svg
[ci-status]: https://github.com/serkonda7/octoja-api/actions/workflows/ci.yml
[npm-badge]: https://nodei.co/npm/octoja-api.png?style=shields&data=v&color=blue
[npm-date-badge]: https://nodei.co/npm/octoja-api.png?style=shields&data=u,d&color=blue
[npm-link]: https://www.npmjs.com/package/octoja-api
