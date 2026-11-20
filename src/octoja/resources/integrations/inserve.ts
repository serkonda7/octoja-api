import type { Client } from '../../../generated/client/types.gen'
import {
	deleteIntegrationsInserve,
	getIntegrationsInserve,
	getIntegrationsInserveCategories,
	getIntegrationsInserveCompanies,
	getIntegrationsInserveDeliveries,
	getIntegrationsInserveLocations,
	getIntegrationsInservePriorities,
	getIntegrationsInserveStatuses,
	postIntegrationsInserve,
	postIntegrationsInserveCheckConnection,
	postIntegrationsInserveImportCustomers,
	putIntegrationsInserveMatches,
	putIntegrationsInserveSettings,
} from '../../../generated/sdk.gen'
import type {
	GetIntegrationsInserveCategoriesResponse,
	GetIntegrationsInserveCompaniesResponse,
	GetIntegrationsInserveDeliveriesData,
	GetIntegrationsInserveDeliveriesResponse,
	GetIntegrationsInserveLocationsData,
	GetIntegrationsInserveLocationsResponse,
	GetIntegrationsInservePrioritiesResponse,
	GetIntegrationsInserveResponse,
	GetIntegrationsInserveStatusesResponse,
	PostIntegrationsInserveCheckConnectionData,
	PostIntegrationsInserveCheckConnectionResponse,
	PostIntegrationsInserveData,
	PostIntegrationsInserveImportCustomersData,
	PostIntegrationsInserveImportCustomersResponse,
	PutIntegrationsInserveMatchesData,
	PutIntegrationsInserveSettingsData,
} from '../../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../../shared/errors'

export type InserveTestConnectionBody = PostIntegrationsInserveCheckConnectionData['body']
export type InserveConnectBody = PostIntegrationsInserveData['body']
export type InserveLocationsQuery = GetIntegrationsInserveLocationsData['query']
export type InserveImportCustomersBody = PostIntegrationsInserveImportCustomersData['body']
export type InserveDeliveriesQuery = GetIntegrationsInserveDeliveriesData['query']
export type InserveUpdateMatchesBody = PutIntegrationsInserveMatchesData['body']
export type InserveUpdateSettingsBody = PutIntegrationsInserveSettingsData['body']

/**
 * Inserve integration: connection, settings, customer import, delivery history and reference
 * data lookups.
 */
export function createInserveIntegrationResource(client: Client) {
	return {
		/**
		 * Check the connection to the Inserve API with the supplied credentials.
		 */
		async testConnection(
			body: InserveTestConnectionBody,
		): Promise<PostIntegrationsInserveCheckConnectionResponse> {
			return ensureData(
				await postIntegrationsInserveCheckConnection({ body, client }),
				'octoja.integrations.inserve.testConnection',
			)
		},
		/**
		 * Create and enable the Inserve integration with the supplied credentials.
		 */
		async connect(body: InserveConnectBody): Promise<void> {
			ensureSuccess(
				await postIntegrationsInserve({ body, client }),
				'octoja.integrations.inserve.connect',
			)
		},
		/**
		 * Remove the Inserve integration.
		 */
		async remove(): Promise<void> {
			ensureSuccess(
				await deleteIntegrationsInserve({ client }),
				'octoja.integrations.inserve.remove',
			)
		},
		/**
		 * Get the current Inserve integration settings.
		 */
		async settings(): Promise<GetIntegrationsInserveResponse> {
			return ensureData(
				await getIntegrationsInserve({ client }),
				'octoja.integrations.inserve.settings',
			)
		},
		/**
		 * List Inserve categories.
		 */
		async categories(): Promise<GetIntegrationsInserveCategoriesResponse> {
			return ensureData(
				await getIntegrationsInserveCategories({ client }),
				'octoja.integrations.inserve.categories',
			)
		},
		/**
		 * List Inserve companies.
		 */
		async companies(): Promise<GetIntegrationsInserveCompaniesResponse> {
			return ensureData(
				await getIntegrationsInserveCompanies({ client }),
				'octoja.integrations.inserve.companies',
			)
		},
		/**
		 * List Inserve locations, optionally filtered.
		 */
		async locations(
			query?: InserveLocationsQuery,
		): Promise<GetIntegrationsInserveLocationsResponse> {
			return ensureData(
				await getIntegrationsInserveLocations({ query, client }),
				'octoja.integrations.inserve.locations',
			)
		},
		/**
		 * List Inserve priorities.
		 */
		async priorities(): Promise<GetIntegrationsInservePrioritiesResponse> {
			return ensureData(
				await getIntegrationsInservePriorities({ client }),
				'octoja.integrations.inserve.priorities',
			)
		},
		/**
		 * List Inserve statuses, optionally filtered.
		 */
		async statuses(): Promise<GetIntegrationsInserveStatusesResponse> {
			return ensureData(
				await getIntegrationsInserveStatuses({ client }),
				'octoja.integrations.inserve.statuses',
			)
		},
		/**
		 * Import customers from Inserve.
		 */
		async importCustomers(
			body: InserveImportCustomersBody,
		): Promise<PostIntegrationsInserveImportCustomersResponse> {
			return ensureData(
				await postIntegrationsInserveImportCustomers({ body, client }),
				'octoja.integrations.inserve.importCustomers',
			)
		},
		/**
		 * List Inserve outbound delivery history.
		 */
		async deliveries(
			query?: InserveDeliveriesQuery,
		): Promise<GetIntegrationsInserveDeliveriesResponse> {
			return ensureData(
				await getIntegrationsInserveDeliveries({ query, client }),
				'octoja.integrations.inserve.deliveries',
			)
		},
		/**
		 * Update the Inserve customer matches.
		 */
		async updateMatches(body: InserveUpdateMatchesBody): Promise<void> {
			ensureSuccess(
				await putIntegrationsInserveMatches({ body, client }),
				'octoja.integrations.inserve.updateMatches',
			)
		},
		/**
		 * Update the Inserve integration settings.
		 */
		async updateSettings(body: InserveUpdateSettingsBody): Promise<void> {
			ensureSuccess(
				await putIntegrationsInserveSettings({ body, client }),
				'octoja.integrations.inserve.updateSettings',
			)
		},
	}
}

export type InserveIntegrationResource = ReturnType<typeof createInserveIntegrationResource>
