import type { Client } from '../../generated/client/types.gen'
import { getAgentsCheckAssignments, postAgentsCheckResults } from '../../generated/sdk.gen'
import type {
	GetAgentsCheckAssignmentsResponse,
	PostAgentsCheckResultsData,
} from '../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../shared/errors'

export type AgentCheckResultBody = PostAgentsCheckResultsData['body']

/**
 * Check assignments for this agent and submission of check results.
 */
export function createAgentCheckAssignmentsResource(client: Client) {
	return {
		/**
		 * List the checks currently assigned to this agent.
		 */
		async list(): Promise<GetAgentsCheckAssignmentsResponse> {
			return ensureData(
				await getAgentsCheckAssignments({ client }),
				'agent.checkAssignments.list',
			)
		},
		/**
		 * Submit the result of an assigned check.
		 */
		async submitResult(body: AgentCheckResultBody): Promise<void> {
			ensureSuccess(
				await postAgentsCheckResults({ body, client }),
				'agent.checkAssignments.submitResult',
			)
		},
	}
}

export type AgentCheckAssignmentsResource = ReturnType<typeof createAgentCheckAssignmentsResource>
