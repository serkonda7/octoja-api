import type { Client } from '../../generated/client/types.gen'
import { getAgentsDiscoveryConfig, postAgentsDiscoveryReport } from '../../generated/sdk.gen'
import type {
	GetAgentsDiscoveryConfigResponse,
	PostAgentsDiscoveryReportData,
} from '../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../shared/errors'

export type AgentDiscoveryReportBody = PostAgentsDiscoveryReportData['body']

/**
 * Network discovery configuration and reporting of discovered devices.
 */
export function createAgentNetworkDiscoveryResource(client: Client) {
	return {
		/**
		 * Fetch the network discovery configuration for this agent.
		 */
		async config(): Promise<GetAgentsDiscoveryConfigResponse> {
			return ensureData(
				await getAgentsDiscoveryConfig({ client }),
				'agent.networkDiscovery.config',
			)
		},
		/**
		 * Submit the results of a network discovery scan.
		 */
		async report(body: AgentDiscoveryReportBody): Promise<void> {
			ensureSuccess(
				await postAgentsDiscoveryReport({ body, client }),
				'agent.networkDiscovery.report',
			)
		},
	}
}

export type AgentNetworkDiscoveryResource = ReturnType<typeof createAgentNetworkDiscoveryResource>
