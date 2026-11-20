import type { Client } from '../../../generated/client/types.gen'
import {
	deleteIntegrationsTopdesk,
	getIntegrationsTopdesk,
	getIntegrationsTopdeskAssetTemplates,
	getIntegrationsTopdeskBranches,
	getIntegrationsTopdeskDeliveries,
	getIntegrationsTopdeskImpacts,
	getIntegrationsTopdeskIncidentCategories,
	getIntegrationsTopdeskPriorities,
	getIntegrationsTopdeskTicketStatuses,
	getIntegrationsTopdeskUrgencies,
	postIntegrationsTopdesk,
	postIntegrationsTopdeskCheckConnection,
	postIntegrationsTopdeskImportCustomers,
	putIntegrationsTopdeskMatches,
	putIntegrationsTopdeskSettings,
} from '../../../generated/sdk.gen'
import type {
	GetIntegrationsTopdeskAssetTemplatesResponse,
	GetIntegrationsTopdeskBranchesResponse,
	GetIntegrationsTopdeskDeliveriesData,
	GetIntegrationsTopdeskDeliveriesResponse,
	GetIntegrationsTopdeskImpactsResponse,
	GetIntegrationsTopdeskIncidentCategoriesResponse,
	GetIntegrationsTopdeskPrioritiesResponse,
	GetIntegrationsTopdeskResponse,
	GetIntegrationsTopdeskTicketStatusesResponse,
	GetIntegrationsTopdeskUrgenciesResponse,
	PostIntegrationsTopdeskCheckConnectionData,
	PostIntegrationsTopdeskCheckConnectionResponse,
	PostIntegrationsTopdeskData,
	PostIntegrationsTopdeskImportCustomersData,
	PostIntegrationsTopdeskImportCustomersResponse,
	PutIntegrationsTopdeskMatchesData,
	PutIntegrationsTopdeskSettingsData,
} from '../../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../../shared/errors'

export type TopdeskCheckConnectionBody = PostIntegrationsTopdeskCheckConnectionData['body']
export type TopdeskConnectBody = PostIntegrationsTopdeskData['body']
export type TopdeskImportCustomersBody = PostIntegrationsTopdeskImportCustomersData['body']
export type TopdeskDeliveriesQuery = GetIntegrationsTopdeskDeliveriesData['query']
export type TopdeskUpdateMatchesBody = PutIntegrationsTopdeskMatchesData['body']
export type TopdeskUpdateSettingsBody = PutIntegrationsTopdeskSettingsData['body']

/**
 * TOPdesk integration: connection setup, asset/ticket lookups, customer import, delivery history
 * and settings.
 */
export function createTopdeskIntegrationResource(client: Client) {
	return {
		/**
		 * Check the connection to TOPdesk using the supplied credentials.
		 */
		async testConnection(
			body: TopdeskCheckConnectionBody,
		): Promise<PostIntegrationsTopdeskCheckConnectionResponse> {
			return ensureData(
				await postIntegrationsTopdeskCheckConnection({ body, client }),
				'octoja.integrations.topdesk.testConnection',
			)
		},
		/**
		 * Connect the TOPdesk integration with the supplied credentials.
		 */
		async connect(body: TopdeskConnectBody): Promise<void> {
			ensureSuccess(
				await postIntegrationsTopdesk({ body, client }),
				'octoja.integrations.topdesk.connect',
			)
		},
		/**
		 * Disconnect and remove the TOPdesk integration.
		 */
		async remove(): Promise<void> {
			ensureSuccess(
				await deleteIntegrationsTopdesk({ client }),
				'octoja.integrations.topdesk.remove',
			)
		},
		/**
		 * Read the current TOPdesk integration settings.
		 */
		async settings(): Promise<GetIntegrationsTopdeskResponse> {
			return ensureData(
				await getIntegrationsTopdesk({ client }),
				'octoja.integrations.topdesk.settings',
			)
		},
		/**
		 * List TOPdesk asset templates.
		 */
		async assetTemplates(): Promise<GetIntegrationsTopdeskAssetTemplatesResponse> {
			return ensureData(
				await getIntegrationsTopdeskAssetTemplates({ client }),
				'octoja.integrations.topdesk.assetTemplates',
			)
		},
		/**
		 * List TOPdesk branches.
		 */
		async branches(): Promise<GetIntegrationsTopdeskBranchesResponse> {
			return ensureData(
				await getIntegrationsTopdeskBranches({ client }),
				'octoja.integrations.topdesk.branches',
			)
		},
		/**
		 * List TOPdesk incident categories.
		 */
		async incidentCategories(): Promise<GetIntegrationsTopdeskIncidentCategoriesResponse> {
			return ensureData(
				await getIntegrationsTopdeskIncidentCategories({ client }),
				'octoja.integrations.topdesk.incidentCategories',
			)
		},
		/**
		 * List TOPdesk incident impacts.
		 */
		async impacts(): Promise<GetIntegrationsTopdeskImpactsResponse> {
			return ensureData(
				await getIntegrationsTopdeskImpacts({ client }),
				'octoja.integrations.topdesk.impacts',
			)
		},
		/**
		 * List TOPdesk incident priorities.
		 */
		async priorities(): Promise<GetIntegrationsTopdeskPrioritiesResponse> {
			return ensureData(
				await getIntegrationsTopdeskPriorities({ client }),
				'octoja.integrations.topdesk.priorities',
			)
		},
		/**
		 * List TOPdesk ticket processing statuses.
		 */
		async ticketStatuses(): Promise<GetIntegrationsTopdeskTicketStatusesResponse> {
			return ensureData(
				await getIntegrationsTopdeskTicketStatuses({ client }),
				'octoja.integrations.topdesk.ticketStatuses',
			)
		},
		/**
		 * List TOPdesk incident urgencies.
		 */
		async urgencies(): Promise<GetIntegrationsTopdeskUrgenciesResponse> {
			return ensureData(
				await getIntegrationsTopdeskUrgencies({ client }),
				'octoja.integrations.topdesk.urgencies',
			)
		},
		/**
		 * Import customers from TOPdesk.
		 */
		async importCustomers(
			body: TopdeskImportCustomersBody,
		): Promise<PostIntegrationsTopdeskImportCustomersResponse> {
			return ensureData(
				await postIntegrationsTopdeskImportCustomers({ body, client }),
				'octoja.integrations.topdesk.importCustomers',
			)
		},
		/**
		 * List TOPdesk outbound delivery history.
		 */
		async deliveries(
			query?: TopdeskDeliveriesQuery,
		): Promise<GetIntegrationsTopdeskDeliveriesResponse> {
			return ensureData(
				await getIntegrationsTopdeskDeliveries({ query, client }),
				'octoja.integrations.topdesk.deliveries',
			)
		},
		/**
		 * Update the customer matches for TOPdesk.
		 */
		async updateMatches(body: TopdeskUpdateMatchesBody): Promise<void> {
			ensureSuccess(
				await putIntegrationsTopdeskMatches({ body, client }),
				'octoja.integrations.topdesk.updateMatches',
			)
		},
		/**
		 * Update the TOPdesk integration settings.
		 */
		async updateSettings(body: TopdeskUpdateSettingsBody): Promise<void> {
			ensureSuccess(
				await putIntegrationsTopdeskSettings({ body, client }),
				'octoja.integrations.topdesk.updateSettings',
			)
		},
	}
}

export type TopdeskIntegrationResource = ReturnType<typeof createTopdeskIntegrationResource>
