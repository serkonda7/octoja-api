import type { Client } from '../../generated/client/types.gen'
import {
	getAgentsMeCustomPackagesByPackageidByVersionCompanionFilesByFileidDownloadUrl,
	getAgentsMeCustomPackagesByPackageidByVersionDownloadUrl,
	getAgentsMeSoftwareDeploymentsByAssignmentidResolved,
} from '../../generated/sdk.gen'
import type {
	GetAgentsMeCustomPackagesByPackageidByVersionCompanionFilesByFileidDownloadUrlResponse,
	GetAgentsMeCustomPackagesByPackageidByVersionDownloadUrlResponse,
	GetAgentsMeSoftwareDeploymentsByAssignmentidResolvedResponse,
} from '../../generated/types.gen'
import { ensureData } from '../../shared/errors'

/**
 * Download URLs for custom packages and their companion files, plus resolved
 * software deployments for this agent.
 */
export function createAgentCustomPackagesResource(client: Client) {
	return {
		/**
		 * Get a download URL for a companion file of a custom package version.
		 */
		async companionFileDownloadUrl(
			packageId: string,
			version: string,
			fileId: string,
		): Promise<GetAgentsMeCustomPackagesByPackageidByVersionCompanionFilesByFileidDownloadUrlResponse> {
			return ensureData(
				await getAgentsMeCustomPackagesByPackageidByVersionCompanionFilesByFileidDownloadUrl(
					{
						path: { packageId, version, fileId },
						client,
					},
				),
				'agent.customPackages.companionFileDownloadUrl',
			)
		},
		/**
		 * Get a download URL for a custom package version.
		 */
		async downloadUrl(
			packageId: string,
			version: string,
		): Promise<GetAgentsMeCustomPackagesByPackageidByVersionDownloadUrlResponse> {
			return ensureData(
				await getAgentsMeCustomPackagesByPackageidByVersionDownloadUrl({
					path: { packageId, version },
					client,
				}),
				'agent.customPackages.downloadUrl',
			)
		},
		/**
		 * Get the resolved deployment for assignment `assignmentId`.
		 */
		async resolvedDeployment(
			assignmentId: string,
		): Promise<GetAgentsMeSoftwareDeploymentsByAssignmentidResolvedResponse> {
			return ensureData(
				await getAgentsMeSoftwareDeploymentsByAssignmentidResolved({
					path: { assignmentId },
					client,
				}),
				'agent.customPackages.resolvedDeployment',
			)
		},
	}
}

export type AgentCustomPackagesResource = ReturnType<typeof createAgentCustomPackagesResource>
