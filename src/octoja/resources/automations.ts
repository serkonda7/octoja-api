import type { Client } from '../../generated/client/types.gen'
import {
	deleteAutomationsById,
	getAssetsByAssetidAutomationAssignments,
	getAutomations,
	getAutomationsById,
	getAutomationsByIdConfigPackages,
	getAutomationsByIdRuns,
	getAutomationsRunsByAssetByAssetid,
	getAutomationsRunsByRunid,
	getAutomationsTemplates,
	patchAssetsByAssetidAutomationAssignmentsByAutomationidDisabled,
	postAutomations,
	postAutomationsBulkRun,
	postAutomationsById,
	postAutomationsByIdRun,
	postAutomationsRunsByRunidCancel,
} from '../../generated/sdk.gen'
import type {
	GetAssetsByAssetidAutomationAssignmentsResponse,
	GetAutomationsByIdConfigPackagesResponse,
	GetAutomationsByIdResponse,
	GetAutomationsByIdRunsData,
	GetAutomationsByIdRunsResponse,
	GetAutomationsData,
	GetAutomationsResponse,
	GetAutomationsRunsByAssetByAssetidData,
	GetAutomationsRunsByAssetByAssetidResponse,
	GetAutomationsRunsByRunidResponse,
	GetAutomationsTemplatesResponse,
	PatchAssetsByAssetidAutomationAssignmentsByAutomationidDisabledData,
	PatchAssetsByAssetidAutomationAssignmentsByAutomationidDisabledResponse,
	PostAutomationsBulkRunData,
	PostAutomationsBulkRunResponse,
	PostAutomationsByIdData,
	PostAutomationsByIdResponse,
	PostAutomationsByIdRunData,
	PostAutomationsByIdRunResponse,
	PostAutomationsData,
	PostAutomationsResponse,
} from '../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../shared/errors'

export type BulkRunAutomationBody = PostAutomationsBulkRunData['body']
export type CreateAutomationBody = PostAutomationsData['body']
export type AutomationsListQuery = GetAutomationsData['query']
export type UpdateAutomationBody = PostAutomationsByIdData['body']
export type AutomationRunsByAssetQuery = GetAutomationsRunsByAssetByAssetidData['query']
export type AutomationRunsQuery = GetAutomationsByIdRunsData['query']
export type RunAutomationNowBody = PostAutomationsByIdRunData['body']
export type ToggleAutomationAssignmentDisabledBody =
	PatchAssetsByAssetidAutomationAssignmentsByAutomationidDisabledData['body']

/**
 * Automations: CRUD, templates, bulk/manual runs, run history and
 * per-asset automation assignments.
 */
export function createAutomationsResource(client: Client) {
	return {
		/**
		 * Run multiple automations in bulk.
		 */
		async bulkRun(body: BulkRunAutomationBody): Promise<PostAutomationsBulkRunResponse> {
			return ensureData(
				await postAutomationsBulkRun({ body, client }),
				'octoja.automations.bulkRun',
			)
		},
		/**
		 * Cancel the automation run identified by `runId`.
		 */
		async cancelRun(runId: string): Promise<void> {
			ensureSuccess(
				await postAutomationsRunsByRunidCancel({ path: { runId }, client }),
				'octoja.automations.cancelRun',
			)
		},
		/**
		 * Create a new automation.
		 */
		async create(body: CreateAutomationBody): Promise<PostAutomationsResponse> {
			return ensureData(await postAutomations({ body, client }), 'octoja.automations.create')
		},
		/**
		 * List automations, optionally filtered by a `search` term.
		 */
		async list(query?: AutomationsListQuery): Promise<GetAutomationsResponse> {
			return ensureData(await getAutomations({ query, client }), 'octoja.automations.list')
		},
		/**
		 * Delete the automation identified by `id`.
		 */
		async remove(id: string): Promise<void> {
			ensureSuccess(
				await deleteAutomationsById({ path: { id }, client }),
				'octoja.automations.remove',
			)
		},
		/**
		 * Read the automation identified by `id`.
		 */
		async get(id: string): Promise<GetAutomationsByIdResponse> {
			return ensureData(
				await getAutomationsById({ path: { id }, client }),
				'octoja.automations.get',
			)
		},
		/**
		 * Update the automation identified by `id`.
		 */
		async update(id: string, body: UpdateAutomationBody): Promise<PostAutomationsByIdResponse> {
			return ensureData(
				await postAutomationsById({ path: { id }, body, client }),
				'octoja.automations.update',
			)
		},
		/**
		 * Automation assignments of asset `assetId`.
		 */
		async assetAssignments(
			assetId: string,
		): Promise<GetAssetsByAssetidAutomationAssignmentsResponse> {
			return ensureData(
				await getAssetsByAssetidAutomationAssignments({ path: { assetId }, client }),
				'octoja.automations.assetAssignments',
			)
		},
		/**
		 * Paginated automation runs for asset `assetId`.
		 */
		async runsByAsset(
			assetId: string,
			query?: AutomationRunsByAssetQuery,
		): Promise<GetAutomationsRunsByAssetByAssetidResponse> {
			return ensureData(
				await getAutomationsRunsByAssetByAssetid({ path: { assetId }, query, client }),
				'octoja.automations.runsByAsset',
			)
		},
		/**
		 * Configuration packages referenced by automation `id`.
		 */
		async configPackages(id: string): Promise<GetAutomationsByIdConfigPackagesResponse> {
			return ensureData(
				await getAutomationsByIdConfigPackages({ path: { id }, client }),
				'octoja.automations.configPackages',
			)
		},
		/**
		 * Read a single automation run by `runId`.
		 */
		async getRun(runId: string): Promise<GetAutomationsRunsByRunidResponse> {
			return ensureData(
				await getAutomationsRunsByRunid({ path: { runId }, client }),
				'octoja.automations.getRun',
			)
		},
		/**
		 * Paginated run history of automation `id`.
		 */
		async runs(
			id: string,
			query?: AutomationRunsQuery,
		): Promise<GetAutomationsByIdRunsResponse> {
			return ensureData(
				await getAutomationsByIdRuns({ path: { id }, query, client }),
				'octoja.automations.runs',
			)
		},
		/**
		 * Available automation templates.
		 */
		async templates(): Promise<GetAutomationsTemplatesResponse> {
			return ensureData(
				await getAutomationsTemplates({ client }),
				'octoja.automations.templates',
			)
		},
		/**
		 * Run automation `id` immediately.
		 */
		async run(id: string, body: RunAutomationNowBody): Promise<PostAutomationsByIdRunResponse> {
			return ensureData(
				await postAutomationsByIdRun({ path: { id }, body, client }),
				'octoja.automations.run',
			)
		},
		/**
		 * Enable or disable an automation assignment on an asset.
		 */
		async setAssignmentDisabled(
			assetId: string,
			automationId: string,
			body: ToggleAutomationAssignmentDisabledBody,
		): Promise<PatchAssetsByAssetidAutomationAssignmentsByAutomationidDisabledResponse> {
			return ensureData(
				await patchAssetsByAssetidAutomationAssignmentsByAutomationidDisabled({
					path: { assetId, automationId },
					body,
					client,
				}),
				'octoja.automations.setAssignmentDisabled',
			)
		},
	}
}

export type AutomationsResource = ReturnType<typeof createAutomationsResource>
