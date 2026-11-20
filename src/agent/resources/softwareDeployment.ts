import type { Client } from '../../generated/client/types.gen'
import {
	getAgentsSoftwareDeploymentAssignments,
	getAgentsSoftwareKiosk,
	postAgentsPackageAvailability,
} from '../../generated/sdk.gen'
import type {
	GetAgentsSoftwareDeploymentAssignmentsResponse,
	GetAgentsSoftwareKioskResponse,
	PostAgentsPackageAvailabilityData,
	PostAgentsPackageAvailabilityResponse,
} from '../../generated/types.gen'
import { ensureData } from '../../shared/errors'

export type AgentPackageAvailabilityBody = PostAgentsPackageAvailabilityData['body']

/**
 * Software deployment for the agent: assignments, package availability and
 * the software kiosk.
 */
export function createAgentSoftwareDeploymentResource(client: Client) {
	return {
		/**
		 * List the software deployment assignments for this agent.
		 */
		async assignments(): Promise<GetAgentsSoftwareDeploymentAssignmentsResponse> {
			return ensureData(
				await getAgentsSoftwareDeploymentAssignments({ client }),
				'agent.softwareDeployment.assignments',
			)
		},
		/**
		 * Check the availability of the requested packages.
		 */
		async packageAvailability(
			body: AgentPackageAvailabilityBody,
		): Promise<PostAgentsPackageAvailabilityResponse> {
			return ensureData(
				await postAgentsPackageAvailability({ body, client }),
				'agent.softwareDeployment.packageAvailability',
			)
		},
		/**
		 * List the entries available in the software kiosk.
		 */
		async kiosk(): Promise<GetAgentsSoftwareKioskResponse> {
			return ensureData(
				await getAgentsSoftwareKiosk({ client }),
				'agent.softwareDeployment.kiosk',
			)
		},
	}
}

export type AgentSoftwareDeploymentResource = ReturnType<
	typeof createAgentSoftwareDeploymentResource
>
