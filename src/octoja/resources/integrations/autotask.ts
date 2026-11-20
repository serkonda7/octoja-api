import type { Client } from '../../../generated/client/types.gen'
import {
	deleteIntegrationsAutotask,
	getIntegrationsAutotask,
	getIntegrationsAutotaskCompanies,
	getIntegrationsAutotaskCompanyLocations,
	getIntegrationsAutotaskDeliveries,
	getIntegrationsAutotaskPriorities,
	getIntegrationsAutotaskProducts,
	getIntegrationsAutotaskQueues,
	getIntegrationsAutotaskTicketStatuses,
	postIntegrationsAutotask,
	postIntegrationsAutotaskCheckConnection,
	postIntegrationsAutotaskImportCustomers,
	putIntegrationsAutotaskMatches,
	putIntegrationsAutotaskSettings,
} from '../../../generated/sdk.gen'
import type {
	GetIntegrationsAutotaskCompaniesResponse,
	GetIntegrationsAutotaskCompanyLocationsData,
	GetIntegrationsAutotaskCompanyLocationsResponse,
	GetIntegrationsAutotaskDeliveriesData,
	GetIntegrationsAutotaskDeliveriesResponse,
	GetIntegrationsAutotaskPrioritiesResponse,
	GetIntegrationsAutotaskProductsResponse,
	GetIntegrationsAutotaskQueuesResponse,
	GetIntegrationsAutotaskResponse,
	GetIntegrationsAutotaskTicketStatusesResponse,
	PostIntegrationsAutotaskCheckConnectionData,
	PostIntegrationsAutotaskCheckConnectionResponse,
	PostIntegrationsAutotaskData,
	PostIntegrationsAutotaskImportCustomersData,
	PostIntegrationsAutotaskImportCustomersResponse,
	PutIntegrationsAutotaskMatchesData,
	PutIntegrationsAutotaskSettingsData,
} from '../../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../../shared/errors'

export type AutotaskCheckConnectionBody = PostIntegrationsAutotaskCheckConnectionData['body']
export type AutotaskConnectBody = PostIntegrationsAutotaskData['body']
export type AutotaskCompanyLocationsQuery = GetIntegrationsAutotaskCompanyLocationsData['query']
export type AutotaskImportCustomersBody = PostIntegrationsAutotaskImportCustomersData['body']
export type AutotaskDeliveriesQuery = GetIntegrationsAutotaskDeliveriesData['query']
export type AutotaskUpdateMatchesBody = PutIntegrationsAutotaskMatchesData['body']
export type AutotaskUpdateSettingsBody = PutIntegrationsAutotaskSettingsData['body']

/**
 * Autotask integration: connection, settings, reference data, customer import and delivery
 * history.
 */
export function createAutotaskIntegrationResource(client: Client) {
	return {
		/**
		 * Check the Autotask connection using the supplied credentials.
		 */
		async testConnection(
			body: AutotaskCheckConnectionBody,
		): Promise<PostIntegrationsAutotaskCheckConnectionResponse> {
			return ensureData(
				await postIntegrationsAutotaskCheckConnection({ body, client }),
				'octoja.integrations.autotask.testConnection',
			)
		},
		/**
		 * Connect the Autotask integration with the supplied credentials.
		 */
		async connect(body: AutotaskConnectBody): Promise<void> {
			ensureSuccess(
				await postIntegrationsAutotask({ body, client }),
				'octoja.integrations.autotask.connect',
			)
		},
		/**
		 * Remove the Autotask integration.
		 */
		async remove(): Promise<void> {
			ensureSuccess(
				await deleteIntegrationsAutotask({ client }),
				'octoja.integrations.autotask.remove',
			)
		},
		/**
		 * Read the current Autotask integration settings.
		 */
		async settings(): Promise<GetIntegrationsAutotaskResponse> {
			return ensureData(
				await getIntegrationsAutotask({ client }),
				'octoja.integrations.autotask.settings',
			)
		},
		/**
		 * List companies from the Autotask account.
		 */
		async companies(): Promise<GetIntegrationsAutotaskCompaniesResponse> {
			return ensureData(
				await getIntegrationsAutotaskCompanies({ client }),
				'octoja.integrations.autotask.companies',
			)
		},
		/**
		 * List Autotask company locations, optionally filtered by `company`.
		 */
		async companyLocations(
			query?: AutotaskCompanyLocationsQuery,
		): Promise<GetIntegrationsAutotaskCompanyLocationsResponse> {
			return ensureData(
				await getIntegrationsAutotaskCompanyLocations({ query, client }),
				'octoja.integrations.autotask.companyLocations',
			)
		},
		/**
		 * List priority values from the Autotask account.
		 */
		async priorities(): Promise<GetIntegrationsAutotaskPrioritiesResponse> {
			return ensureData(
				await getIntegrationsAutotaskPriorities({ client }),
				'octoja.integrations.autotask.priorities',
			)
		},
		/**
		 * List Autotask products.
		 */
		async products(): Promise<GetIntegrationsAutotaskProductsResponse> {
			return ensureData(
				await getIntegrationsAutotaskProducts({ client }),
				'octoja.integrations.autotask.products',
			)
		},
		/**
		 * List Autotask queues.
		 */
		async queues(): Promise<GetIntegrationsAutotaskQueuesResponse> {
			return ensureData(
				await getIntegrationsAutotaskQueues({ client }),
				'octoja.integrations.autotask.queues',
			)
		},
		/**
		 * List ticket statuses from the Autotask account.
		 */
		async ticketStatuses(): Promise<GetIntegrationsAutotaskTicketStatusesResponse> {
			return ensureData(
				await getIntegrationsAutotaskTicketStatuses({ client }),
				'octoja.integrations.autotask.ticketStatuses',
			)
		},
		/**
		 * Import customers from the connected Autotask account.
		 */
		async importCustomers(
			body: AutotaskImportCustomersBody,
		): Promise<PostIntegrationsAutotaskImportCustomersResponse> {
			return ensureData(
				await postIntegrationsAutotaskImportCustomers({ body, client }),
				'octoja.integrations.autotask.importCustomers',
			)
		},
		/**
		 * List outbound delivery history for the Autotask integration.
		 */
		async deliveries(
			query?: AutotaskDeliveriesQuery,
		): Promise<GetIntegrationsAutotaskDeliveriesResponse> {
			return ensureData(
				await getIntegrationsAutotaskDeliveries({ query, client }),
				'octoja.integrations.autotask.deliveries',
			)
		},
		/**
		 * Update the customer matches for the Autotask integration.
		 */
		async updateMatches(body: AutotaskUpdateMatchesBody): Promise<void> {
			ensureSuccess(
				await putIntegrationsAutotaskMatches({ body, client }),
				'octoja.integrations.autotask.updateMatches',
			)
		},
		/**
		 * Update the Autotask integration settings.
		 */
		async updateSettings(body: AutotaskUpdateSettingsBody): Promise<void> {
			ensureSuccess(
				await putIntegrationsAutotaskSettings({ body, client }),
				'octoja.integrations.autotask.updateSettings',
			)
		},
	}
}

export type AutotaskIntegrationResource = ReturnType<typeof createAutotaskIntegrationResource>
