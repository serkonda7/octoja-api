import type { Client } from '../../generated/client/types.gen'
import {
	deleteConfigPackagesById,
	getConfigPackages,
	getConfigPackagesById,
	getConfigPackagesByIdActiveAlarmCounts,
	getConfigPackagesByIdAutomationOptions,
	getConfigPackagesByIdAutomations,
	getConfigPackagesByIdCheckOverrides,
	getConfigPackagesTemplates,
	postConfigPackages,
	postConfigPackagesById,
	postConfigPackagesByIdChecksByCheckconfigidRevertOverrides,
	postConfigPackagesPreviewAssignmentSummary,
} from '../../generated/sdk.gen'
import type {
	GetConfigPackagesByIdActiveAlarmCountsResponse,
	GetConfigPackagesByIdAutomationOptionsResponse,
	GetConfigPackagesByIdAutomationsResponse,
	GetConfigPackagesByIdCheckOverridesResponse,
	GetConfigPackagesByIdResponse,
	GetConfigPackagesData,
	GetConfigPackagesResponse,
	GetConfigPackagesTemplatesResponse,
	PostConfigPackagesByIdChecksByCheckconfigidRevertOverridesResponse,
	PostConfigPackagesByIdData,
	PostConfigPackagesByIdResponse,
	PostConfigPackagesData,
	PostConfigPackagesPreviewAssignmentSummaryData,
	PostConfigPackagesPreviewAssignmentSummaryResponse,
	PostConfigPackagesResponse,
} from '../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../shared/errors'

export type ConfigPackagesListQuery = GetConfigPackagesData['query']
export type CreateConfigPackageBody = PostConfigPackagesData['body']
export type UpdateConfigPackageBody = PostConfigPackagesByIdData['body']
export type PreviewAssignmentSummaryBody = PostConfigPackagesPreviewAssignmentSummaryData['body']

/**
 * Configuration packages: CRUD, templates, automation/check lookups and
 * assignment previews.
 */
export function createConfigPackagesResource(client: Client) {
	return {
		/**
		 * Create a new configuration package.
		 */
		async create(body: CreateConfigPackageBody): Promise<PostConfigPackagesResponse> {
			return ensureData(
				await postConfigPackages({ body, client }),
				'octoja.configPackages.create',
			)
		},
		/**
		 * List configuration packages, optionally filtered by type and search term.
		 */
		async list(query?: ConfigPackagesListQuery): Promise<GetConfigPackagesResponse> {
			return ensureData(
				await getConfigPackages({ query, client }),
				'octoja.configPackages.list',
			)
		},
		/**
		 * Delete the configuration package identified by `id`.
		 */
		async remove(id: string): Promise<void> {
			ensureSuccess(
				await deleteConfigPackagesById({ path: { id }, client }),
				'octoja.configPackages.remove',
			)
		},
		/**
		 * Read the configuration package identified by `id`.
		 */
		async get(id: string): Promise<GetConfigPackagesByIdResponse> {
			return ensureData(
				await getConfigPackagesById({ path: { id }, client }),
				'octoja.configPackages.get',
			)
		},
		/**
		 * Update the configuration package identified by `id`.
		 */
		async update(
			id: string,
			body: UpdateConfigPackageBody,
		): Promise<PostConfigPackagesByIdResponse> {
			return ensureData(
				await postConfigPackagesById({ path: { id }, body, client }),
				'octoja.configPackages.update',
			)
		},
		/**
		 * Active alarm counts per check for configuration package `id`.
		 */
		async activeAlarmCounts(
			id: string,
		): Promise<GetConfigPackagesByIdActiveAlarmCountsResponse> {
			return ensureData(
				await getConfigPackagesByIdActiveAlarmCounts({ path: { id }, client }),
				'octoja.configPackages.activeAlarmCounts',
			)
		},
		/**
		 * Automation options available to configuration package `id`.
		 */
		async automationOptions(
			id: string,
		): Promise<GetConfigPackagesByIdAutomationOptionsResponse> {
			return ensureData(
				await getConfigPackagesByIdAutomationOptions({ path: { id }, client }),
				'octoja.configPackages.automationOptions',
			)
		},
		/**
		 * Automations attached to configuration package `id`.
		 */
		async automations(id: string): Promise<GetConfigPackagesByIdAutomationsResponse> {
			return ensureData(
				await getConfigPackagesByIdAutomations({ path: { id }, client }),
				'octoja.configPackages.automations',
			)
		},
		/**
		 * Check overrides configured for configuration package `id`.
		 */
		async checkOverrides(id: string): Promise<GetConfigPackagesByIdCheckOverridesResponse> {
			return ensureData(
				await getConfigPackagesByIdCheckOverrides({ path: { id }, client }),
				'octoja.configPackages.checkOverrides',
			)
		},
		/**
		 * Available configuration package templates.
		 */
		async templates(): Promise<GetConfigPackagesTemplatesResponse> {
			return ensureData(
				await getConfigPackagesTemplates({ client }),
				'octoja.configPackages.templates',
			)
		},
		/**
		 * Preview the assignment summary for a set of devices.
		 */
		async previewAssignmentSummary(
			body: PreviewAssignmentSummaryBody,
		): Promise<PostConfigPackagesPreviewAssignmentSummaryResponse> {
			return ensureData(
				await postConfigPackagesPreviewAssignmentSummary({ body, client }),
				'octoja.configPackages.previewAssignmentSummary',
			)
		},
		/**
		 * Revert check overrides for check `checkConfigId` in package `id`.
		 */
		async revertOverrides(
			id: string,
			checkConfigId: string,
		): Promise<PostConfigPackagesByIdChecksByCheckconfigidRevertOverridesResponse> {
			return ensureData(
				await postConfigPackagesByIdChecksByCheckconfigidRevertOverrides({
					path: { id, checkConfigId },
					client,
				}),
				'octoja.configPackages.revertOverrides',
			)
		},
	}
}

export type ConfigPackagesResource = ReturnType<typeof createConfigPackagesResource>
