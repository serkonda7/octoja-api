import type { Client } from '../generated/client/types.gen'
import {
	type CreateAgentClientOptions,
	createAgentClientInstance,
	getAgentClientToken,
	setAgentClientToken,
} from './client'
import { type AgentAgentsResource, createAgentAgentsResource } from './resources/agents'
import { type AgentAssetsResource, createAgentAssetsResource } from './resources/assets'
import { type AgentAuthResource, createAgentAuthResource } from './resources/auth'
import { type AgentBrandingResource, createAgentBrandingResource } from './resources/branding'
import {
	type AgentCheckAssignmentsResource,
	createAgentCheckAssignmentsResource,
} from './resources/checkAssignments'
import {
	type AgentCustomPackagesResource,
	createAgentCustomPackagesResource,
} from './resources/customPackages'
import {
	type AgentNetworkDiscoveryResource,
	createAgentNetworkDiscoveryResource,
} from './resources/networkDiscovery'
import {
	type AgentPatchManagementResource,
	createAgentPatchManagementResource,
} from './resources/patchManagement'
import {
	type AgentSoftwareDeploymentResource,
	createAgentSoftwareDeploymentResource,
} from './resources/softwareDeployment'
import { type AgentTicketsResource, createAgentTicketsResource } from './resources/tickets'

export type { CreateAgentClientOptions } from './client'
export { createAgentClientInstance, getAgentClientToken, setAgentClientToken } from './client'

/**
 * Namespaced facade over the device-agent routes (`/api/agents/...`) that the
 * installed Octoja agent calls with its own access token.
 *
 * Obtain an instance via `createAgentClient({ baseUrl, token? })`.
 *
 * All methods return the success body directly and throw an `OctojaApiError`
 * on non-2xx responses.
 *
 * ```ts
 * import { createAgentClient } from 'octoja-api'
 *
 * const agent = createAgentClient({ baseUrl: 'https://acme.eu1.octoja.cloud' })
 * await agent.auth.login({ agentId, secret })
 * ```
 */
export class OctojaAgentClient {
	readonly agents: AgentAgentsResource
	readonly assets: AgentAssetsResource
	readonly auth: AgentAuthResource
	readonly branding: AgentBrandingResource
	readonly checkAssignments: AgentCheckAssignmentsResource
	readonly customPackages: AgentCustomPackagesResource
	readonly networkDiscovery: AgentNetworkDiscoveryResource
	readonly patchManagement: AgentPatchManagementResource
	readonly softwareDeployment: AgentSoftwareDeploymentResource
	readonly tickets: AgentTicketsResource

	/**
	 * The underlying isolated hey-api client. Useful for interceptors or
	 * escaping to raw generated SDK functions via `{ client }`.
	 */
	readonly instance: Client

	constructor(client: Client) {
		this.instance = client
		this.agents = createAgentAgentsResource(client)
		this.assets = createAgentAssetsResource(client)
		this.auth = createAgentAuthResource(client)
		this.branding = createAgentBrandingResource(client)
		this.checkAssignments = createAgentCheckAssignmentsResource(client)
		this.customPackages = createAgentCustomPackagesResource(client)
		this.networkDiscovery = createAgentNetworkDiscoveryResource(client)
		this.patchManagement = createAgentPatchManagementResource(client)
		this.softwareDeployment = createAgentSoftwareDeploymentResource(client)
		this.tickets = createAgentTicketsResource(client)
	}

	/**
	 * Replace (or clear, with `undefined`) the access token without rebuilding
	 * the client. `auth.login` / `auth.refresh` call this automatically.
	 */
	setToken(token: string | undefined): void {
		setAgentClientToken(this.instance, token)
	}

	/**
	 * The access token currently sent with every request, if any.
	 */
	get token(): string | undefined {
		return getAgentClientToken(this.instance)
	}
}

/**
 * Create an {@link OctojaAgentClient} with its own isolated hey-api instance.
 */
export function createAgentClient(options: CreateAgentClientOptions): OctojaAgentClient {
	return new OctojaAgentClient(createAgentClientInstance(options))
}
