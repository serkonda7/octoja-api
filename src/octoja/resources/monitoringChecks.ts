import type { Client } from '../../generated/client/types.gen'
import {
	deleteMonitoringCheckRepositoriesById,
	getMonitoringCheckRepositories,
	getMonitoringCheckRepositoriesByIdChecksByCheckid,
	postMonitoringCheckRepositories,
	postMonitoringCheckRepositoriesById,
	postMonitoringCheckRepositoriesByIdSync,
	postMonitoringCheckRepositoriesCheckConnection,
} from '../../generated/sdk.gen'
import type {
	GetMonitoringCheckRepositoriesByIdChecksByCheckidResponse,
	GetMonitoringCheckRepositoriesResponse,
	PostMonitoringCheckRepositoriesByIdData,
	PostMonitoringCheckRepositoriesByIdResponse,
	PostMonitoringCheckRepositoriesCheckConnectionData,
	PostMonitoringCheckRepositoriesCheckConnectionResponse,
	PostMonitoringCheckRepositoriesData,
	PostMonitoringCheckRepositoriesResponse,
} from '../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../shared/errors'

export type CheckRepositoryConnectionBody =
	PostMonitoringCheckRepositoriesCheckConnectionData['body']
export type CreateMonitoringCheckRepositoryBody = PostMonitoringCheckRepositoriesData['body']
export type UpdateMonitoringCheckRepositoryBody = PostMonitoringCheckRepositoriesByIdData['body']

/**
 * Monitoring checks: repositories, connection checks, single-check lookup
 * and repository synchronization.
 */
export function createMonitoringChecksResource(client: Client) {
	return {
		/**
		 * Test the connection settings of a monitoring check repository.
		 */
		async checkConnection(
			body: CheckRepositoryConnectionBody,
		): Promise<PostMonitoringCheckRepositoriesCheckConnectionResponse> {
			return ensureData(
				await postMonitoringCheckRepositoriesCheckConnection({ body, client }),
				'octoja.monitoringChecks.checkConnection',
			)
		},
		/**
		 * Create a new monitoring check repository.
		 */
		async create(
			body: CreateMonitoringCheckRepositoryBody,
		): Promise<PostMonitoringCheckRepositoriesResponse> {
			return ensureData(
				await postMonitoringCheckRepositories({ body, client }),
				'octoja.monitoringChecks.create',
			)
		},
		/**
		 * List monitoring check repositories.
		 */
		async list(): Promise<GetMonitoringCheckRepositoriesResponse> {
			return ensureData(
				await getMonitoringCheckRepositories({ client }),
				'octoja.monitoringChecks.list',
			)
		},
		/**
		 * Delete the monitoring check repository identified by `id`.
		 */
		async remove(id: string): Promise<void> {
			ensureSuccess(
				await deleteMonitoringCheckRepositoriesById({ path: { id }, client }),
				'octoja.monitoringChecks.remove',
			)
		},
		/**
		 * Update the monitoring check repository identified by `id`.
		 */
		async update(
			id: string,
			body: UpdateMonitoringCheckRepositoryBody,
		): Promise<PostMonitoringCheckRepositoriesByIdResponse> {
			return ensureData(
				await postMonitoringCheckRepositoriesById({ path: { id }, body, client }),
				'octoja.monitoringChecks.update',
			)
		},
		/**
		 * Read check `checkId` from repository `id`.
		 */
		async check(
			id: string,
			checkId: string,
		): Promise<GetMonitoringCheckRepositoriesByIdChecksByCheckidResponse> {
			return ensureData(
				await getMonitoringCheckRepositoriesByIdChecksByCheckid({
					path: { id, checkId },
					client,
				}),
				'octoja.monitoringChecks.check',
			)
		},
		/**
		 * Synchronize the checks of repository `id`.
		 */
		async syncNow(id: string): Promise<void> {
			ensureSuccess(
				await postMonitoringCheckRepositoriesByIdSync({ path: { id }, client }),
				'octoja.monitoringChecks.syncNow',
			)
		},
	}
}

export type MonitoringChecksResource = ReturnType<typeof createMonitoringChecksResource>
