import type { Client } from '../../generated/client/types.gen'
import {
	deleteAssetsByAssetidChecksByAssignmentid,
	deleteAssetsById,
	getAssets,
	getAssetsByAssetidChecks,
	getAssetsByAssetidChecksManifests,
	getAssetsByAssetidConfigPackages,
	getAssetsByAssetidLywandVulnerabilities,
	getAssetsByAssetidLywandVulnerabilitiesByVulnerabilityidResolutionPlan,
	getAssetsByAssetidWebConsoleBySessionkeyOpen,
	getAssetsById,
	getAssetsInventoryState,
	getAssetsQuickSupport,
	getAssetsSearch,
	patchAssetsByAssetidChecksByAssignmentid,
	postAssets,
	postAssetsBulkAddTags,
	postAssetsBulkAssignCustomer,
	postAssetsBulkDelete,
	postAssetsBulkMaintenance,
	postAssetsBulkSetCustomField,
	postAssetsByAssetidChecks,
	postAssetsByAssetidLywandVulnerabilitiesByVulnerabilityidIgnore,
	postAssetsByAssetidLywandVulnerabilitiesRescan,
	postAssetsByAssetidWebConsole,
	postAssetsById,
	postAssetsByIdMaintenance,
	postAssetsByIdSupportLogs,
	postAssetsInventory,
	postAssetsInventoryHistoryFilter,
	putAssetsById,
} from '../../generated/sdk.gen'
import type {
	GetAssetsByAssetidChecksManifestsResponse,
	GetAssetsByAssetidChecksResponse,
	GetAssetsByAssetidConfigPackagesResponse,
	GetAssetsByAssetidLywandVulnerabilitiesByVulnerabilityidResolutionPlanResponse,
	GetAssetsByAssetidLywandVulnerabilitiesResponse,
	GetAssetsByAssetidWebConsoleBySessionkeyOpenResponse,
	GetAssetsByIdResponse,
	GetAssetsData,
	GetAssetsInventoryStateResponse,
	GetAssetsQuickSupportResponse,
	GetAssetsResponse,
	GetAssetsSearchData,
	GetAssetsSearchResponse,
	PatchAssetsByAssetidChecksByAssignmentidData,
	PatchAssetsByAssetidChecksByAssignmentidResponse,
	PostAssetsBulkAddTagsData,
	PostAssetsBulkAddTagsResponse,
	PostAssetsBulkAssignCustomerData,
	PostAssetsBulkAssignCustomerResponse,
	PostAssetsBulkDeleteData,
	PostAssetsBulkDeleteResponse,
	PostAssetsBulkMaintenanceData,
	PostAssetsBulkMaintenanceResponse,
	PostAssetsBulkSetCustomFieldData,
	PostAssetsBulkSetCustomFieldResponse,
	PostAssetsByAssetidChecksData,
	PostAssetsByAssetidChecksResponse,
	PostAssetsByAssetidLywandVulnerabilitiesByVulnerabilityidIgnoreData,
	PostAssetsByAssetidWebConsoleData,
	PostAssetsByAssetidWebConsoleResponse,
	PostAssetsByIdData,
	PostAssetsByIdMaintenanceData,
	PostAssetsByIdMaintenanceResponse,
	PostAssetsByIdResponse,
	PostAssetsByIdSupportLogsData,
	PostAssetsByIdSupportLogsResponse,
	PostAssetsData,
	PostAssetsInventoryData,
	PostAssetsInventoryHistoryFilterData,
	PostAssetsInventoryHistoryFilterResponse,
	PostAssetsResponse,
	PutAssetsByIdData,
	PutAssetsByIdResponse,
} from '../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../shared/errors'

export type AssetsListQuery = GetAssetsData['query']
export type AssetSearchQuery = GetAssetsSearchData['query']
export type AddAssetCheckBody = PostAssetsByAssetidChecksData['body']
export type BulkAddTagsBody = PostAssetsBulkAddTagsData['body']
export type BulkAssignCustomerBody = PostAssetsBulkAssignCustomerData['body']
export type BulkDeleteAssetsBody = PostAssetsBulkDeleteData['body']
export type BulkSetCustomFieldBody = PostAssetsBulkSetCustomFieldData['body']
export type BulkSetMaintenanceBody = PostAssetsBulkMaintenanceData['body']
export type CreateAssetBody = PostAssetsData['body']
export type UpdateAssetBody = PostAssetsByIdData['body']
export type UpdateAgentlessAssetBody = PutAssetsByIdData['body']
export type UpdateAssetCheckBody = PatchAssetsByAssetidChecksByAssignmentidData['body']
export type InventoryHistoryBody = PostAssetsInventoryHistoryFilterData['body']
export type SaveInventoryBody = PostAssetsInventoryData['body']
export type IgnoreVulnerabilityBody =
	PostAssetsByAssetidLywandVulnerabilitiesByVulnerabilityidIgnoreData['body']
export type UpdateMaintenanceBody = PostAssetsByIdMaintenanceData['body']
export type UploadSupportLogsBody = PostAssetsByIdSupportLogsData['body']
export type StartWebConsoleSessionBody = PostAssetsByAssetidWebConsoleData['body']

/**
 * Assets: CRUD, search, bulk operations and the per-asset check, vulnerability,
 * inventory and web-console sub-routes.
 */
export function createAssetsResource(client: Client) {
	return {
		/**
		 * List assets, optionally filtered and paginated.
		 */
		async list(query?: AssetsListQuery): Promise<GetAssetsResponse> {
			return ensureData(await getAssets({ query, client }), 'octoja.assets.list')
		},
		/**
		 * Read the asset identified by `id`.
		 */
		async get(id: string): Promise<GetAssetsByIdResponse> {
			return ensureData(await getAssetsById({ path: { id }, client }), 'octoja.assets.get')
		},
		/**
		 * Create a new agentless asset.
		 */
		async create(body: CreateAssetBody): Promise<PostAssetsResponse> {
			return ensureData(await postAssets({ body, client }), 'octoja.assets.create')
		},
		/**
		 * Update the asset identified by `id`.
		 */
		async update(id: string, body: UpdateAssetBody): Promise<PostAssetsByIdResponse> {
			return ensureData(
				await postAssetsById({ path: { id }, body, client }),
				'octoja.assets.update',
			)
		},
		/**
		 * Replace the agentless asset identified by `id`.
		 */
		async updateAgentless(
			id: string,
			body: UpdateAgentlessAssetBody,
		): Promise<PutAssetsByIdResponse> {
			return ensureData(
				await putAssetsById({ path: { id }, body, client }),
				'octoja.assets.updateAgentless',
			)
		},
		/**
		 * Delete the asset identified by `id`.
		 */
		async remove(id: string): Promise<void> {
			ensureSuccess(await deleteAssetsById({ path: { id }, client }), 'octoja.assets.remove')
		},
		/**
		 * Search assets with the given criteria.
		 */
		async search(query?: AssetSearchQuery): Promise<GetAssetsSearchResponse> {
			return ensureData(await getAssetsSearch({ query, client }), 'octoja.assets.search')
		},
		/**
		 * List assets that are available for quick support.
		 */
		async quickSupport(): Promise<GetAssetsQuickSupportResponse> {
			return ensureData(await getAssetsQuickSupport({ client }), 'octoja.assets.quickSupport')
		},
		/**
		 * List the config packages assigned to the asset identified by `assetId`.
		 */
		async configPackages(assetId: string): Promise<GetAssetsByAssetidConfigPackagesResponse> {
			return ensureData(
				await getAssetsByAssetidConfigPackages({ path: { assetId }, client }),
				'octoja.assets.configPackages',
			)
		},
		/**
		 * Add tags to multiple assets.
		 */
		async bulkAddTags(body: BulkAddTagsBody): Promise<PostAssetsBulkAddTagsResponse> {
			return ensureData(
				await postAssetsBulkAddTags({ body, client }),
				'octoja.assets.bulkAddTags',
			)
		},
		/**
		 * Assign a customer to multiple assets.
		 */
		async bulkAssignCustomer(
			body: BulkAssignCustomerBody,
		): Promise<PostAssetsBulkAssignCustomerResponse> {
			return ensureData(
				await postAssetsBulkAssignCustomer({ body, client }),
				'octoja.assets.bulkAssignCustomer',
			)
		},
		/**
		 * Delete multiple assets.
		 */
		async bulkRemove(body: BulkDeleteAssetsBody): Promise<PostAssetsBulkDeleteResponse> {
			return ensureData(
				await postAssetsBulkDelete({ body, client }),
				'octoja.assets.bulkRemove',
			)
		},
		/**
		 * Set a custom field on multiple assets.
		 */
		async bulkSetCustomField(
			body: BulkSetCustomFieldBody,
		): Promise<PostAssetsBulkSetCustomFieldResponse> {
			return ensureData(
				await postAssetsBulkSetCustomField({ body, client }),
				'octoja.assets.bulkSetCustomField',
			)
		},
		/**
		 * Set maintenance mode on multiple assets.
		 */
		async bulkMaintenance(
			body: BulkSetMaintenanceBody,
		): Promise<PostAssetsBulkMaintenanceResponse> {
			return ensureData(
				await postAssetsBulkMaintenance({ body, client }),
				'octoja.assets.bulkMaintenance',
			)
		},
		/**
		 * Update maintenance mode for the asset identified by `id`.
		 */
		async setMaintenance(
			id: string,
			body: UpdateMaintenanceBody,
		): Promise<PostAssetsByIdMaintenanceResponse> {
			return ensureData(
				await postAssetsByIdMaintenance({ path: { id }, body, client }),
				'octoja.assets.setMaintenance',
			)
		},
		/**
		 * Upload support logs for the asset identified by `id`.
		 */
		async uploadSupportLogs(
			id: string,
			body: UploadSupportLogsBody,
		): Promise<PostAssetsByIdSupportLogsResponse> {
			return ensureData(
				await postAssetsByIdSupportLogs({ path: { id }, body, client }),
				'octoja.assets.uploadSupportLogs',
			)
		},
		checks: {
			/**
			 * Assign a check to the asset identified by `assetId`.
			 */
			async add(
				assetId: string,
				body: AddAssetCheckBody,
			): Promise<PostAssetsByAssetidChecksResponse> {
				return ensureData(
					await postAssetsByAssetidChecks({ path: { assetId }, body, client }),
					'octoja.assets.checks.add',
				)
			},
			/**
			 * List the checks assigned to the asset identified by `assetId`.
			 */
			async list(assetId: string): Promise<GetAssetsByAssetidChecksResponse> {
				return ensureData(
					await getAssetsByAssetidChecks({ path: { assetId }, client }),
					'octoja.assets.checks.list',
				)
			},
			/**
			 * List the check manifests available for the asset identified by `assetId`.
			 */
			async manifests(assetId: string): Promise<GetAssetsByAssetidChecksManifestsResponse> {
				return ensureData(
					await getAssetsByAssetidChecksManifests({ path: { assetId }, client }),
					'octoja.assets.checks.manifests',
				)
			},
			/**
			 * Update the assigned check identified by `assignmentId` on asset `assetId`.
			 */
			async update(
				assetId: string,
				assignmentId: string,
				body: UpdateAssetCheckBody,
			): Promise<PatchAssetsByAssetidChecksByAssignmentidResponse> {
				return ensureData(
					await patchAssetsByAssetidChecksByAssignmentid({
						path: { assetId, assignmentId },
						body,
						client,
					}),
					'octoja.assets.checks.update',
				)
			},
			/**
			 * Remove the assigned check identified by `assignmentId` from asset `assetId`.
			 */
			async remove(assetId: string, assignmentId: string): Promise<void> {
				ensureSuccess(
					await deleteAssetsByAssetidChecksByAssignmentid({
						path: { assetId, assignmentId },
						client,
					}),
					'octoja.assets.checks.remove',
				)
			},
		},
		lywand: {
			/**
			 * List the Lywand vulnerabilities of the asset identified by `assetId`.
			 */
			async list(assetId: string): Promise<GetAssetsByAssetidLywandVulnerabilitiesResponse> {
				return ensureData(
					await getAssetsByAssetidLywandVulnerabilities({ path: { assetId }, client }),
					'octoja.assets.lywand.list',
				)
			},
			/**
			 * Read the resolution plan for a vulnerability of asset `assetId`.
			 */
			async resolutionPlan(
				assetId: string,
				vulnerabilityId: string,
			): Promise<GetAssetsByAssetidLywandVulnerabilitiesByVulnerabilityidResolutionPlanResponse> {
				return ensureData(
					await getAssetsByAssetidLywandVulnerabilitiesByVulnerabilityidResolutionPlan({
						path: { assetId, vulnerabilityId },
						client,
					}),
					'octoja.assets.lywand.resolutionPlan',
				)
			},
			/**
			 * Rescan the Lywand vulnerabilities of the asset identified by `assetId`.
			 */
			async rescan(assetId: string): Promise<void> {
				ensureSuccess(
					await postAssetsByAssetidLywandVulnerabilitiesRescan({
						path: { assetId },
						client,
					}),
					'octoja.assets.lywand.rescan',
				)
			},
			/**
			 * Set the ignore state of a vulnerability of asset `assetId`.
			 */
			async ignore(
				assetId: string,
				vulnerabilityId: string,
				body: IgnoreVulnerabilityBody,
			): Promise<void> {
				ensureSuccess(
					await postAssetsByAssetidLywandVulnerabilitiesByVulnerabilityidIgnore({
						path: { assetId, vulnerabilityId },
						body,
						client,
					}),
					'octoja.assets.lywand.ignore',
				)
			},
		},
		inventory: {
			/**
			 * Filter the inventory history of assets.
			 */
			async history(
				body: InventoryHistoryBody,
			): Promise<PostAssetsInventoryHistoryFilterResponse> {
				return ensureData(
					await postAssetsInventoryHistoryFilter({ body, client }),
					'octoja.assets.inventory.history',
				)
			},
			/**
			 * Read the current inventory state.
			 */
			async state(): Promise<GetAssetsInventoryStateResponse> {
				return ensureData(
					await getAssetsInventoryState({ client }),
					'octoja.assets.inventory.state',
				)
			},
			/**
			 * Save the inventory of an asset.
			 */
			async save(body: SaveInventoryBody): Promise<void> {
				ensureSuccess(
					await postAssetsInventory({ body, client }),
					'octoja.assets.inventory.save',
				)
			},
		},
		webConsole: {
			/**
			 * Start a web console session for the asset identified by `assetId`.
			 */
			async start(
				assetId: string,
				body: StartWebConsoleSessionBody,
			): Promise<PostAssetsByAssetidWebConsoleResponse> {
				return ensureData(
					await postAssetsByAssetidWebConsole({ path: { assetId }, body, client }),
					'octoja.assets.webConsole.start',
				)
			},
			/**
			 * Open the web console session identified by `sessionKey` on asset `assetId`.
			 */
			async open(
				assetId: string,
				sessionKey: string,
			): Promise<GetAssetsByAssetidWebConsoleBySessionkeyOpenResponse> {
				return ensureData(
					await getAssetsByAssetidWebConsoleBySessionkeyOpen({
						path: { assetId, sessionKey },
						client,
					}),
					'octoja.assets.webConsole.open',
				)
			},
		},
	}
}

export type AssetsResource = ReturnType<typeof createAssetsResource>
