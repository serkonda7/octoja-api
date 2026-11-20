import type { Client } from '../../generated/client/types.gen'
import {
	getAgentsBranding,
	getAgentsBrandingIcon,
	getAgentsBrandingLogo,
} from '../../generated/sdk.gen'
import type {
	GetAgentsBrandingIconData,
	GetAgentsBrandingIconResponse,
	GetAgentsBrandingLogoData,
	GetAgentsBrandingLogoResponse,
	GetAgentsBrandingResponse,
} from '../../generated/types.gen'
import { ensureData } from '../../shared/errors'

export type AgentBrandingIconQuery = GetAgentsBrandingIconData['query']
export type AgentBrandingLogoQuery = GetAgentsBrandingLogoData['query']

/**
 * White-label branding served to the agent: details, icon and logo.
 */
export function createAgentBrandingResource(client: Client) {
	return {
		/**
		 * Fetch the branding configuration.
		 */
		async get(): Promise<GetAgentsBrandingResponse> {
			return ensureData(await getAgentsBranding({ client }), 'agent.branding.get')
		},
		/**
		 * Fetch the branding icon for the requested theme.
		 */
		async icon(query?: AgentBrandingIconQuery): Promise<GetAgentsBrandingIconResponse> {
			return ensureData(await getAgentsBrandingIcon({ query, client }), 'agent.branding.icon')
		},
		/**
		 * Fetch the branding logo for the requested theme.
		 */
		async logo(query?: AgentBrandingLogoQuery): Promise<GetAgentsBrandingLogoResponse> {
			return ensureData(await getAgentsBrandingLogo({ query, client }), 'agent.branding.logo')
		},
	}
}

export type AgentBrandingResource = ReturnType<typeof createAgentBrandingResource>
