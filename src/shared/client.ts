import { createClient } from '../generated/client/client.gen'
import type { Client, Config } from '../generated/client/types.gen'

export interface ClientInstanceOptions {
	/**
	 * Base URL of the Octoja instance, e.g. `https://acme.eu1.octoja.cloud`.
	 */
	baseUrl: string
	/**
	 * Access token, sent as `Authorization: Bearer <token>`. Optional so a
	 * client can be created first and authenticated later via `auth.login`
	 * or `setToken`.
	 */
	token?: string
	/**
	 * Custom fetch implementation. Defaults to `globalThis.fetch`.
	 */
	fetch?: typeof fetch
	/**
	 * Extra hey-api client config merged over the defaults.
	 */
	config?: Omit<Config, 'baseUrl' | 'auth' | 'fetch'>
}

/**
 * Per-instance access tokens. The Octoja spec declares no per-operation
 * security requirements, so hey-api's `auth` option would never be applied;
 * a request interceptor injects the bearer header instead.
 */
const tokens = new WeakMap<Client, string | undefined>()

/**
 * Create an isolated hey-api client instance.
 *
 * Unlike the generated `client` singleton, the returned instance is not
 * shared with other API areas, so `setConfig` calls elsewhere cannot leak a
 * token into its requests (or vice versa).
 */
export function createClientInstance(options: ClientInstanceOptions): Client {
	const { baseUrl, token, fetch, config } = options
	const client = createClient({
		...config,
		baseUrl,
		...(fetch !== undefined ? { fetch } : {}),
	})
	tokens.set(client, token)
	client.interceptors.request.use((request) => {
		const current = tokens.get(client)
		if (current && !request.headers.has('Authorization')) {
			request.headers.set('Authorization', `Bearer ${current}`)
		}
		return request
	})
	return client
}

/**
 * Update (or clear, with `undefined`) the access token of a client instance.
 */
export function setClientToken(client: Client, token: string | undefined): void {
	tokens.set(client, token)
}

/**
 * Read the access token currently used by a client instance.
 */
export function getClientToken(client: Client): string | undefined {
	return tokens.get(client)
}
