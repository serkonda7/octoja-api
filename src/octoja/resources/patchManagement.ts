import type { Client } from '../../generated/client/types.gen'
import {
	deletePatchManagementBlockedUpdatesById,
	deletePatchManagementGlobalApprovalsByUpdateid,
	deletePatchManagementStandingSafeguardOverridesByUpdateid,
	deletePatchPoliciesById,
	getAssetsByAssetidPatchPolicies,
	getAssetsByAssetidPatchStatus,
	getPatchCycles,
	getPatchCyclesById,
	getPatchCyclesByIdDevices,
	getPatchCyclesByIdResults,
	getPatchCyclesByIdResultsSummary,
	getPatchCyclesOverview,
	getPatchManagementBlockedUpdates,
	getPatchManagementGlobalApprovals,
	getPatchManagementStandingSafeguardOverrides,
	getPatchManagementUpdateCatalog,
	getPatchManagementUpdateCatalogByUpdateid,
	getPatchManagementUpdateCatalogByUpdateidDevices,
	getPatchPolicies,
	getPatchPoliciesById,
	getPatchPoliciesTemplates,
	postPatchCyclesAdHoc,
	postPatchCyclesAdHocCandidates,
	postPatchCyclesByIdApprovals,
	postPatchCyclesByIdCancel,
	postPatchCyclesByIdReconcile,
	postPatchCyclesByIdSafeguardOverride,
	postPatchCyclesByIdSafeguardOverrideRevoke,
	postPatchCyclesEmergency,
	postPatchManagementBlockedUpdates,
	postPatchManagementGlobalApprovals,
	postPatchPolicies,
	postPatchPoliciesById,
	putPatchManagementStandingSafeguardOverrides,
} from '../../generated/sdk.gen'
import type {
	GetAssetsByAssetidPatchPoliciesResponse,
	GetAssetsByAssetidPatchStatusResponse,
	GetPatchCyclesByIdDevicesResponse,
	GetPatchCyclesByIdResponse,
	GetPatchCyclesByIdResultsResponse,
	GetPatchCyclesByIdResultsSummaryResponse,
	GetPatchCyclesData,
	GetPatchCyclesOverviewResponse,
	GetPatchCyclesResponse,
	GetPatchManagementBlockedUpdatesResponse,
	GetPatchManagementGlobalApprovalsResponse,
	GetPatchManagementStandingSafeguardOverridesData,
	GetPatchManagementStandingSafeguardOverridesResponse,
	GetPatchManagementUpdateCatalogByUpdateidDevicesResponse,
	GetPatchManagementUpdateCatalogByUpdateidResponse,
	GetPatchManagementUpdateCatalogData,
	GetPatchManagementUpdateCatalogResponse,
	GetPatchPoliciesByIdResponse,
	GetPatchPoliciesData,
	GetPatchPoliciesResponse,
	GetPatchPoliciesTemplatesResponse,
	PostPatchCyclesAdHocCandidatesData,
	PostPatchCyclesAdHocCandidatesResponse,
	PostPatchCyclesAdHocData,
	PostPatchCyclesAdHocResponse,
	PostPatchCyclesByIdApprovalsData,
	PostPatchCyclesByIdApprovalsResponse,
	PostPatchCyclesByIdReconcileResponse,
	PostPatchCyclesByIdSafeguardOverrideData,
	PostPatchCyclesByIdSafeguardOverrideResponse,
	PostPatchCyclesByIdSafeguardOverrideRevokeData,
	PostPatchCyclesEmergencyData,
	PostPatchCyclesEmergencyResponse,
	PostPatchManagementBlockedUpdatesData,
	PostPatchManagementBlockedUpdatesResponse,
	PostPatchManagementGlobalApprovalsData,
	PostPatchManagementGlobalApprovalsResponse,
	PostPatchPoliciesByIdData,
	PostPatchPoliciesByIdResponse,
	PostPatchPoliciesData,
	PostPatchPoliciesResponse,
	PutPatchManagementStandingSafeguardOverridesData,
} from '../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../shared/errors'

export type UpdateCatalogQuery = GetPatchManagementUpdateCatalogData['query']
export type PatchCyclesListQuery = GetPatchCyclesData['query']
export type CreateAdHocPatchCycleBody = PostPatchCyclesAdHocData['body']
export type CreateEmergencyPatchCycleBody = PostPatchCyclesEmergencyData['body']
export type AdHocPatchCandidatesBody = PostPatchCyclesAdHocCandidatesData['body']
export type UpdatePatchCycleApprovalsBody = PostPatchCyclesByIdApprovalsData['body']
export type ApproveUpdateGloballyBody = PostPatchManagementGlobalApprovalsData['body']
export type CreatePatchPolicyBody = PostPatchPoliciesData['body']
export type PatchPoliciesListQuery = GetPatchPoliciesData['query']
export type UpdatePatchPolicyBody = PostPatchPoliciesByIdData['body']
export type BlockUpdateBody = PostPatchManagementBlockedUpdatesData['body']
export type StandingSafeguardOverridesQuery =
	GetPatchManagementStandingSafeguardOverridesData['query']
export type SetStandingSafeguardOverrideBody =
	PutPatchManagementStandingSafeguardOverridesData['body']
export type OverridePatchCycleSafeguardsBody = PostPatchCyclesByIdSafeguardOverrideData['body']
export type RevokePatchCycleSafeguardsBody = PostPatchCyclesByIdSafeguardOverrideRevokeData['body']

/**
 * Patch management: update catalog, patch cycles, patch policies, global
 * approvals, blocked updates and safeguard overrides.
 */
export function createPatchManagementResource(client: Client) {
	return {
		assets: {
			/**
			 * Patch status of the asset identified by `assetId`.
			 */
			async patchStatus(assetId: string): Promise<GetAssetsByAssetidPatchStatusResponse> {
				return ensureData(
					await getAssetsByAssetidPatchStatus({ path: { assetId }, client }),
					'octoja.patchManagement.assets.patchStatus',
				)
			},
			/**
			 * Patch policies applied to the asset identified by `assetId`.
			 */
			async patchPolicies(assetId: string): Promise<GetAssetsByAssetidPatchPoliciesResponse> {
				return ensureData(
					await getAssetsByAssetidPatchPolicies({ path: { assetId }, client }),
					'octoja.patchManagement.assets.patchPolicies',
				)
			},
		},
		catalog: {
			/**
			 * Search the update catalog.
			 */
			async list(
				query?: UpdateCatalogQuery,
			): Promise<GetPatchManagementUpdateCatalogResponse> {
				return ensureData(
					await getPatchManagementUpdateCatalog({ query, client }),
					'octoja.patchManagement.catalog.list',
				)
			},
			/**
			 * Read a single update-catalog entry by `updateId`.
			 */
			async get(
				updateId: string,
			): Promise<GetPatchManagementUpdateCatalogByUpdateidResponse> {
				return ensureData(
					await getPatchManagementUpdateCatalogByUpdateid({ path: { updateId }, client }),
					'octoja.patchManagement.catalog.get',
				)
			},
			/**
			 * Devices affected by the update identified by `updateId`.
			 */
			async devices(
				updateId: string,
			): Promise<GetPatchManagementUpdateCatalogByUpdateidDevicesResponse> {
				return ensureData(
					await getPatchManagementUpdateCatalogByUpdateidDevices({
						path: { updateId },
						client,
					}),
					'octoja.patchManagement.catalog.devices',
				)
			},
		},
		cycles: {
			/**
			 * List patch cycles.
			 */
			async list(query?: PatchCyclesListQuery): Promise<GetPatchCyclesResponse> {
				return ensureData(
					await getPatchCycles({ query, client }),
					'octoja.patchManagement.cycles.list',
				)
			},
			/**
			 * Read the patch cycle identified by `id`.
			 */
			async get(id: string): Promise<GetPatchCyclesByIdResponse> {
				return ensureData(
					await getPatchCyclesById({ path: { id }, client }),
					'octoja.patchManagement.cycles.get',
				)
			},
			/**
			 * Aggregated overview of patch cycles.
			 */
			async overview(): Promise<GetPatchCyclesOverviewResponse> {
				return ensureData(
					await getPatchCyclesOverview({ client }),
					'octoja.patchManagement.cycles.overview',
				)
			},
			/**
			 * Devices of the patch cycle identified by `id`.
			 */
			async devices(id: string): Promise<GetPatchCyclesByIdDevicesResponse> {
				return ensureData(
					await getPatchCyclesByIdDevices({ path: { id }, client }),
					'octoja.patchManagement.cycles.devices',
				)
			},
			/**
			 * Results of the patch cycle identified by `id`.
			 */
			async results(id: string): Promise<GetPatchCyclesByIdResultsResponse> {
				return ensureData(
					await getPatchCyclesByIdResults({ path: { id }, client }),
					'octoja.patchManagement.cycles.results',
				)
			},
			/**
			 * Summary of the results of the patch cycle identified by `id`.
			 */
			async resultsSummary(id: string): Promise<GetPatchCyclesByIdResultsSummaryResponse> {
				return ensureData(
					await getPatchCyclesByIdResultsSummary({ path: { id }, client }),
					'octoja.patchManagement.cycles.resultsSummary',
				)
			},
			/**
			 * Create an ad-hoc patch cycle.
			 */
			async adHoc(body: CreateAdHocPatchCycleBody): Promise<PostPatchCyclesAdHocResponse> {
				return ensureData(
					await postPatchCyclesAdHoc({ body, client }),
					'octoja.patchManagement.cycles.adHoc',
				)
			},
			/**
			 * Create emergency patch cycles.
			 */
			async emergency(
				body: CreateEmergencyPatchCycleBody,
			): Promise<PostPatchCyclesEmergencyResponse> {
				return ensureData(
					await postPatchCyclesEmergency({ body, client }),
					'octoja.patchManagement.cycles.emergency',
				)
			},
			/**
			 * Compute candidate updates for an ad-hoc patch cycle.
			 */
			async adHocCandidates(
				body: AdHocPatchCandidatesBody,
			): Promise<PostPatchCyclesAdHocCandidatesResponse> {
				return ensureData(
					await postPatchCyclesAdHocCandidates({ body, client }),
					'octoja.patchManagement.cycles.adHocCandidates',
				)
			},
			/**
			 * Cancel the patch cycle identified by `id`.
			 */
			async cancel(id: string): Promise<void> {
				ensureSuccess(
					await postPatchCyclesByIdCancel({ path: { id }, client }),
					'octoja.patchManagement.cycles.cancel',
				)
			},
			/**
			 * Reconcile the patch cycle identified by `id`.
			 */
			async reconcile(id: string): Promise<PostPatchCyclesByIdReconcileResponse> {
				return ensureData(
					await postPatchCyclesByIdReconcile({ path: { id }, client }),
					'octoja.patchManagement.cycles.reconcile',
				)
			},
			/**
			 * Update the approvals of the patch cycle identified by `id`.
			 */
			async updateApprovals(
				id: string,
				body: UpdatePatchCycleApprovalsBody,
			): Promise<PostPatchCyclesByIdApprovalsResponse> {
				return ensureData(
					await postPatchCyclesByIdApprovals({ path: { id }, body, client }),
					'octoja.patchManagement.cycles.updateApprovals',
				)
			},
			/**
			 * Override safeguards for the patch cycle identified by `id`.
			 */
			async safeguardOverride(
				id: string,
				body: OverridePatchCycleSafeguardsBody,
			): Promise<PostPatchCyclesByIdSafeguardOverrideResponse> {
				return ensureData(
					await postPatchCyclesByIdSafeguardOverride({ path: { id }, body, client }),
					'octoja.patchManagement.cycles.safeguardOverride',
				)
			},
			/**
			 * Revoke a safeguard override for the patch cycle identified by `id`.
			 */
			async revokeSafeguardOverride(
				id: string,
				body: RevokePatchCycleSafeguardsBody,
			): Promise<void> {
				ensureSuccess(
					await postPatchCyclesByIdSafeguardOverrideRevoke({
						path: { id },
						body,
						client,
					}),
					'octoja.patchManagement.cycles.revokeSafeguardOverride',
				)
			},
		},
		approvals: {
			/**
			 * Globally approve an update.
			 */
			async approve(
				body: ApproveUpdateGloballyBody,
			): Promise<PostPatchManagementGlobalApprovalsResponse> {
				return ensureData(
					await postPatchManagementGlobalApprovals({ body, client }),
					'octoja.patchManagement.approvals.approve',
				)
			},
			/**
			 * List global update approvals.
			 */
			async list(): Promise<GetPatchManagementGlobalApprovalsResponse> {
				return ensureData(
					await getPatchManagementGlobalApprovals({ client }),
					'octoja.patchManagement.approvals.list',
				)
			},
			/**
			 * Remove the global approval for the update identified by `updateId`.
			 */
			async remove(updateId: string): Promise<void> {
				ensureSuccess(
					await deletePatchManagementGlobalApprovalsByUpdateid({
						path: { updateId },
						client,
					}),
					'octoja.patchManagement.approvals.remove',
				)
			},
		},
		policies: {
			/**
			 * List patch policies.
			 */
			async list(query?: PatchPoliciesListQuery): Promise<GetPatchPoliciesResponse> {
				return ensureData(
					await getPatchPolicies({ query, client }),
					'octoja.patchManagement.policies.list',
				)
			},
			/**
			 * Read the patch policy identified by `id`.
			 */
			async get(id: string): Promise<GetPatchPoliciesByIdResponse> {
				return ensureData(
					await getPatchPoliciesById({ path: { id }, client }),
					'octoja.patchManagement.policies.get',
				)
			},
			/**
			 * Create a patch policy.
			 */
			async create(body: CreatePatchPolicyBody): Promise<PostPatchPoliciesResponse> {
				return ensureData(
					await postPatchPolicies({ body, client }),
					'octoja.patchManagement.policies.create',
				)
			},
			/**
			 * Update the patch policy identified by `id`.
			 */
			async update(
				id: string,
				body: UpdatePatchPolicyBody,
			): Promise<PostPatchPoliciesByIdResponse> {
				return ensureData(
					await postPatchPoliciesById({ path: { id }, body, client }),
					'octoja.patchManagement.policies.update',
				)
			},
			/**
			 * Delete the patch policy identified by `id`.
			 */
			async remove(id: string): Promise<void> {
				ensureSuccess(
					await deletePatchPoliciesById({ path: { id }, client }),
					'octoja.patchManagement.policies.remove',
				)
			},
			/**
			 * Available patch-policy templates.
			 */
			async templates(): Promise<GetPatchPoliciesTemplatesResponse> {
				return ensureData(
					await getPatchPoliciesTemplates({ client }),
					'octoja.patchManagement.policies.templates',
				)
			},
		},
		blockedUpdates: {
			/**
			 * List globally blocked updates.
			 */
			async list(): Promise<GetPatchManagementBlockedUpdatesResponse> {
				return ensureData(
					await getPatchManagementBlockedUpdates({ client }),
					'octoja.patchManagement.blockedUpdates.list',
				)
			},
			/**
			 * Block an update globally.
			 */
			async create(
				body: BlockUpdateBody,
			): Promise<PostPatchManagementBlockedUpdatesResponse> {
				return ensureData(
					await postPatchManagementBlockedUpdates({ body, client }),
					'octoja.patchManagement.blockedUpdates.create',
				)
			},
			/**
			 * Unblock the blocked update identified by `id`.
			 */
			async remove(id: string): Promise<void> {
				ensureSuccess(
					await deletePatchManagementBlockedUpdatesById({ path: { id }, client }),
					'octoja.patchManagement.blockedUpdates.remove',
				)
			},
		},
		safeguardOverrides: {
			/**
			 * List standing safeguard overrides.
			 */
			async list(
				query?: StandingSafeguardOverridesQuery,
			): Promise<GetPatchManagementStandingSafeguardOverridesResponse> {
				return ensureData(
					await getPatchManagementStandingSafeguardOverrides({ query, client }),
					'octoja.patchManagement.safeguardOverrides.list',
				)
			},
			/**
			 * Set a standing safeguard override.
			 */
			async set(body: SetStandingSafeguardOverrideBody): Promise<void> {
				ensureSuccess(
					await putPatchManagementStandingSafeguardOverrides({ body, client }),
					'octoja.patchManagement.safeguardOverrides.set',
				)
			},
			/**
			 * Remove the standing safeguard override for the update identified by `updateId`.
			 */
			async remove(updateId: string): Promise<void> {
				ensureSuccess(
					await deletePatchManagementStandingSafeguardOverridesByUpdateid({
						path: { updateId },
						client,
					}),
					'octoja.patchManagement.safeguardOverrides.remove',
				)
			},
		},
	}
}

export type PatchManagementResource = ReturnType<typeof createPatchManagementResource>
