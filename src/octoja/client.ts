import type { Client } from '../generated/client/types.gen'
import {
	type ClientInstanceOptions,
	createClientInstance,
	getClientToken,
	setClientToken,
} from '../shared/client'

export type CreateOctojaClientOptions = ClientInstanceOptions

/**
 * Create an isolated hey-api client pre-configured for technician/API-user
 * endpoints.
 */
export function createOctojaClientInstance(options: CreateOctojaClientOptions): Client {
	return createClientInstance(options)
}

/**
 * Update the token of an Octoja client instance (e.g. after refresh).
 */
export function setOctojaClientToken(client: Client, token: string | undefined): void {
	setClientToken(client, token)
}

/**
 * Read the token currently used by an Octoja client instance.
 */
export function getOctojaClientToken(client: Client): string | undefined {
	return getClientToken(client)
}
