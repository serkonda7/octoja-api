import type { Client } from '../../generated/client/types.gen'
import {
	getAgentsPatchUiPolicy,
	postAgentsPatchOperationResults,
	postAgentsPatchRestartOutcomes,
} from '../../generated/sdk.gen'
import type {
	GetAgentsPatchUiPolicyResponse,
	PostAgentsPatchOperationResultsData,
	PostAgentsPatchRestartOutcomesData,
} from '../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../shared/errors'

export type AgentPatchOperationBody = PostAgentsPatchOperationResultsData['body']
export type AgentPatchRestartOutcomesBody = PostAgentsPatchRestartOutcomesData['body']

/**
 * Patch management for the agent: operation/restart results and UI policy.
 */
export function createAgentPatchManagementResource(client: Client) {
	return {
		/**
		 * Report the outcome of a patch operation.
		 */
		async reportOperation(body: AgentPatchOperationBody): Promise<void> {
			ensureSuccess(
				await postAgentsPatchOperationResults({ body, client }),
				'agent.patchManagement.reportOperation',
			)
		},
		/**
		 * Report the outcomes of restarts after patch operations.
		 */
		async reportRestartOutcomes(body: AgentPatchRestartOutcomesBody): Promise<void> {
			ensureSuccess(
				await postAgentsPatchRestartOutcomes({ body, client }),
				'agent.patchManagement.reportRestartOutcomes',
			)
		},
		/**
		 * Fetch the patch-related UI policy for this agent.
		 */
		async uiPolicy(): Promise<GetAgentsPatchUiPolicyResponse> {
			return ensureData(
				await getAgentsPatchUiPolicy({ client }),
				'agent.patchManagement.uiPolicy',
			)
		},
	}
}

export type AgentPatchManagementResource = ReturnType<typeof createAgentPatchManagementResource>
