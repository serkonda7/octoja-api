import type { Client } from '../../generated/client/types.gen'
import {
	deleteAgentsEnrollmentTokensById,
	getAgentsEnrollmentTokens,
	getAgentsInstallerInfo,
	getAgentsInstallerInfoDownload,
	getAgentsQuickSupportDownload,
	postAgentsEnrollmentTokens,
} from '../../generated/sdk.gen'
import type {
	GetAgentsEnrollmentTokensResponse,
	GetAgentsInstallerInfoDownloadData,
	GetAgentsInstallerInfoDownloadResponse,
	GetAgentsInstallerInfoResponse,
	GetAgentsQuickSupportDownloadData,
	GetAgentsQuickSupportDownloadResponse,
	PostAgentsEnrollmentTokensData,
	PostAgentsEnrollmentTokensResponse,
} from '../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../shared/errors'

export type CreateEnrollmentTokenBody = PostAgentsEnrollmentTokensData['body']
export type InstallerDownloadQuery = GetAgentsInstallerInfoDownloadData['query']
export type QuickSupportDownloadQuery = GetAgentsQuickSupportDownloadData['query']

/**
 * Agent enrollment tokens, installer information and Quick Support download.
 */
export function createAgentsResource(client: Client) {
	return {
		enrollmentTokens: {
			/**
			 * List all agent enrollment tokens.
			 */
			async list(): Promise<GetAgentsEnrollmentTokensResponse> {
				return ensureData(
					await getAgentsEnrollmentTokens({ client }),
					'octoja.agents.enrollmentTokens.list',
				)
			},
			/**
			 * Create a new agent enrollment token.
			 */
			async create(
				body: CreateEnrollmentTokenBody,
			): Promise<PostAgentsEnrollmentTokensResponse> {
				return ensureData(
					await postAgentsEnrollmentTokens({ body, client }),
					'octoja.agents.enrollmentTokens.create',
				)
			},
			/**
			 * Delete the enrollment token identified by `id`.
			 */
			async remove(id: string): Promise<void> {
				ensureSuccess(
					await deleteAgentsEnrollmentTokensById({ path: { id }, client }),
					'octoja.agents.enrollmentTokens.remove',
				)
			},
		},
		/**
		 * Read the available agent installer information.
		 */
		async installerInfo(): Promise<GetAgentsInstallerInfoResponse> {
			return ensureData(
				await getAgentsInstallerInfo({ client }),
				'octoja.agents.installerInfo',
			)
		},
		/**
		 * Download the agent installer.
		 */
		async installerDownload(
			query?: InstallerDownloadQuery,
		): Promise<GetAgentsInstallerInfoDownloadResponse> {
			return ensureData(
				await getAgentsInstallerInfoDownload({ query, client }),
				'octoja.agents.installerDownload',
			)
		},
		/**
		 * Download the Quick Support package.
		 */
		async quickSupportDownload(
			query?: QuickSupportDownloadQuery,
		): Promise<GetAgentsQuickSupportDownloadResponse> {
			return ensureData(
				await getAgentsQuickSupportDownload({ query, client }),
				'octoja.agents.quickSupportDownload',
			)
		},
	}
}

export type AgentsResource = ReturnType<typeof createAgentsResource>
