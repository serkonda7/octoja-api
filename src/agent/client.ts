import type { Client } from '../generated/client/types.gen'
import {
	type ClientInstanceOptions,
	createClientInstance,
	getClientToken,
	setClientToken,
} from '../shared/client'

export type CreateAgentClientOptions = ClientInstanceOptions

/**
 * Create an isolated hey-api client pre-configured for the device-agent
 * endpoints.
 */
export function createAgentClientInstance(options: CreateAgentClientOptions): Client {
	return createClientInstance(options)
}

/**
 * Update the token of an agent client instance (e.g. after refresh).
 */
export function setAgentClientToken(client: Client, token: string | undefined): void {
	setClientToken(client, token)
}

/**
 * Read the token currently used by an agent client instance.
 */
export function getAgentClientToken(client: Client): string | undefined {
	return getClientToken(client)
}
