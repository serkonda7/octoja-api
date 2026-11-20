import type { Client } from '../../../generated/client/types.gen'
import {
	deleteIntegrationsDocbee,
	getIntegrationsDocbee,
	getIntegrationsDocbeeCustomerLocations,
	getIntegrationsDocbeeCustomers,
	getIntegrationsDocbeeDeliveries,
	getIntegrationsDocbeeObjectCategories,
	getIntegrationsDocbeePriorities,
	getIntegrationsDocbeeTicketStatuses,
	postIntegrationsDocbee,
	postIntegrationsDocbeeCheckConnection,
	postIntegrationsDocbeeImportCustomers,
	putIntegrationsDocbeeMatches,
	putIntegrationsDocbeeSettings,
} from '../../../generated/sdk.gen'
import type {
	GetIntegrationsDocbeeCustomerLocationsData,
	GetIntegrationsDocbeeCustomerLocationsResponse,
	GetIntegrationsDocbeeCustomersResponse,
	GetIntegrationsDocbeeDeliveriesData,
	GetIntegrationsDocbeeDeliveriesResponse,
	GetIntegrationsDocbeeObjectCategoriesResponse,
	GetIntegrationsDocbeePrioritiesResponse,
	GetIntegrationsDocbeeResponse,
	GetIntegrationsDocbeeTicketStatusesResponse,
	PostIntegrationsDocbeeCheckConnectionData,
	PostIntegrationsDocbeeCheckConnectionResponse,
	PostIntegrationsDocbeeData,
	PostIntegrationsDocbeeImportCustomersData,
	PostIntegrationsDocbeeImportCustomersResponse,
	PutIntegrationsDocbeeMatchesData,
	PutIntegrationsDocbeeSettingsData,
} from '../../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../../shared/errors'

export type DocbeeCheckConnectionBody = PostIntegrationsDocbeeCheckConnectionData['body']
export type DocbeeConnectBody = PostIntegrationsDocbeeData['body']
export type DocbeeCustomerLocationsQuery = GetIntegrationsDocbeeCustomerLocationsData['query']
export type DocbeeImportCustomersBody = PostIntegrationsDocbeeImportCustomersData['body']
export type DocbeeDeliveriesQuery = GetIntegrationsDocbeeDeliveriesData['query']
export type DocbeeUpdateMatchesBody = PutIntegrationsDocbeeMatchesData['body']
export type DocbeeUpdateSettingsBody = PutIntegrationsDocbeeSettingsData['body']

/**
 * DocBee integration: connection, settings, reference data, customer import and delivery
 * history.
 */
export function createDocbeeIntegrationResource(client: Client) {
	return {
		/**
		 * Check the DocBee connection using the supplied credentials.
		 */
		async testConnection(
			body: DocbeeCheckConnectionBody,
		): Promise<PostIntegrationsDocbeeCheckConnectionResponse> {
			return ensureData(
				await postIntegrationsDocbeeCheckConnection({ body, client }),
				'octoja.integrations.docbee.testConnection',
			)
		},
		/**
		 * Connect the DocBee integration with the supplied credentials.
		 */
		async connect(body: DocbeeConnectBody): Promise<void> {
			ensureSuccess(
				await postIntegrationsDocbee({ body, client }),
				'octoja.integrations.docbee.connect',
			)
		},
		/**
		 * Remove the DocBee integration.
		 */
		async remove(): Promise<void> {
			ensureSuccess(
				await deleteIntegrationsDocbee({ client }),
				'octoja.integrations.docbee.remove',
			)
		},
		/**
		 * Read the current DocBee integration settings.
		 */
		async settings(): Promise<GetIntegrationsDocbeeResponse> {
			return ensureData(
				await getIntegrationsDocbee({ client }),
				'octoja.integrations.docbee.settings',
			)
		},
		/**
		 * List DocBee customer locations, optionally filtered by `customer`.
		 */
		async customerLocations(
			query?: DocbeeCustomerLocationsQuery,
		): Promise<GetIntegrationsDocbeeCustomerLocationsResponse> {
			return ensureData(
				await getIntegrationsDocbeeCustomerLocations({ query, client }),
				'octoja.integrations.docbee.customerLocations',
			)
		},
		/**
		 * List customers from the DocBee account.
		 */
		async customers(): Promise<GetIntegrationsDocbeeCustomersResponse> {
			return ensureData(
				await getIntegrationsDocbeeCustomers({ client }),
				'octoja.integrations.docbee.customers',
			)
		},
		/**
		 * List DocBee object categories.
		 */
		async objectCategories(): Promise<GetIntegrationsDocbeeObjectCategoriesResponse> {
			return ensureData(
				await getIntegrationsDocbeeObjectCategories({ client }),
				'octoja.integrations.docbee.objectCategories',
			)
		},
		/**
		 * List priority values from the DocBee account.
		 */
		async priorities(): Promise<GetIntegrationsDocbeePrioritiesResponse> {
			return ensureData(
				await getIntegrationsDocbeePriorities({ client }),
				'octoja.integrations.docbee.priorities',
			)
		},
		/**
		 * List ticket statuses from the DocBee account.
		 */
		async ticketStatuses(): Promise<GetIntegrationsDocbeeTicketStatusesResponse> {
			return ensureData(
				await getIntegrationsDocbeeTicketStatuses({ client }),
				'octoja.integrations.docbee.ticketStatuses',
			)
		},
		/**
		 * Import customers from the connected DocBee account.
		 */
		async importCustomers(
			body: DocbeeImportCustomersBody,
		): Promise<PostIntegrationsDocbeeImportCustomersResponse> {
			return ensureData(
				await postIntegrationsDocbeeImportCustomers({ body, client }),
				'octoja.integrations.docbee.importCustomers',
			)
		},
		/**
		 * List outbound delivery history for the DocBee integration.
		 */
		async deliveries(
			query?: DocbeeDeliveriesQuery,
		): Promise<GetIntegrationsDocbeeDeliveriesResponse> {
			return ensureData(
				await getIntegrationsDocbeeDeliveries({ query, client }),
				'octoja.integrations.docbee.deliveries',
			)
		},
		/**
		 * Update the customer matches for the DocBee integration.
		 */
		async updateMatches(body: DocbeeUpdateMatchesBody): Promise<void> {
			ensureSuccess(
				await putIntegrationsDocbeeMatches({ body, client }),
				'octoja.integrations.docbee.updateMatches',
			)
		},
		/**
		 * Update the DocBee integration settings.
		 */
		async updateSettings(body: DocbeeUpdateSettingsBody): Promise<void> {
			ensureSuccess(
				await putIntegrationsDocbeeSettings({ body, client }),
				'octoja.integrations.docbee.updateSettings',
			)
		},
	}
}

export type DocbeeIntegrationResource = ReturnType<typeof createDocbeeIntegrationResource>
