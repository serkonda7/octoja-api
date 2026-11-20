import type { Client } from '../../generated/client/types.gen'
import {
	getAgentsInventoryTargets,
	getAgentsProbeTargets,
	postAgentsInventoryTargetsReport,
	postAgentsProbeTargetsReport,
} from '../../generated/sdk.gen'
import type {
	GetAgentsInventoryTargetsResponse,
	GetAgentsProbeTargetsResponse,
	PostAgentsInventoryTargetsReportData,
	PostAgentsProbeTargetsReportData,
} from '../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../shared/errors'

export type AgentInventoryReportBody = PostAgentsInventoryTargetsReportData['body']
export type AgentProbeReportBody = PostAgentsProbeTargetsReportData['body']

/**
 * Agentless asset discovery: inventory/probe targets and reporting their results.
 */
export function createAgentAssetsResource(client: Client) {
	return {
		/**
		 * List the agentless inventory targets configured for this agent.
		 */
		async inventoryTargets(): Promise<GetAgentsInventoryTargetsResponse> {
			return ensureData(
				await getAgentsInventoryTargets({ client }),
				'agent.assets.inventoryTargets',
			)
		},
		/**
		 * List the asset probe targets configured for this agent.
		 */
		async probeTargets(): Promise<GetAgentsProbeTargetsResponse> {
			return ensureData(await getAgentsProbeTargets({ client }), 'agent.assets.probeTargets')
		},
		/**
		 * Submit the results of an agentless inventory scan.
		 */
		async reportInventory(body: AgentInventoryReportBody): Promise<void> {
			ensureSuccess(
				await postAgentsInventoryTargetsReport({ body, client }),
				'agent.assets.reportInventory',
			)
		},
		/**
		 * Submit the results of an asset probe run.
		 */
		async reportProbe(body: AgentProbeReportBody): Promise<void> {
			ensureSuccess(
				await postAgentsProbeTargetsReport({ body, client }),
				'agent.assets.reportProbe',
			)
		},
	}
}

export type AgentAssetsResource = ReturnType<typeof createAgentAssetsResource>
