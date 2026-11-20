import type { Client } from '../../../generated/client/types.gen'
import {
	deleteIntegrationsServiceboard,
	getIntegrationsServiceboard,
	getIntegrationsServiceboardCategories,
	getIntegrationsServiceboardCustomers,
	getIntegrationsServiceboardDeliveries,
	getIntegrationsServiceboardEditorOptions,
	getIntegrationsServiceboardHelpdeskTypes,
	getIntegrationsServiceboardPriorities,
	postIntegrationsServiceboard,
	postIntegrationsServiceboardCheckConnection,
	postIntegrationsServiceboardImportCustomers,
	putIntegrationsServiceboardMatches,
	putIntegrationsServiceboardSettings,
} from '../../../generated/sdk.gen'
import type {
	GetIntegrationsServiceboardCategoriesResponse,
	GetIntegrationsServiceboardCustomersResponse,
	GetIntegrationsServiceboardDeliveriesData,
	GetIntegrationsServiceboardDeliveriesResponse,
	GetIntegrationsServiceboardEditorOptionsResponse,
	GetIntegrationsServiceboardHelpdeskTypesResponse,
	GetIntegrationsServiceboardPrioritiesResponse,
	GetIntegrationsServiceboardResponse,
	PostIntegrationsServiceboardCheckConnectionData,
	PostIntegrationsServiceboardCheckConnectionResponse,
	PostIntegrationsServiceboardData,
	PostIntegrationsServiceboardImportCustomersData,
	PostIntegrationsServiceboardImportCustomersResponse,
	PutIntegrationsServiceboardMatchesData,
	PutIntegrationsServiceboardSettingsData,
} from '../../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../../shared/errors'

export type ServiceboardCheckConnectionBody =
	PostIntegrationsServiceboardCheckConnectionData['body']
export type ServiceboardConnectBody = PostIntegrationsServiceboardData['body']
export type ServiceboardImportCustomersBody =
	PostIntegrationsServiceboardImportCustomersData['body']
export type ServiceboardDeliveriesQuery = GetIntegrationsServiceboardDeliveriesData['query']
export type ServiceboardUpdateMatchesBody = PutIntegrationsServiceboardMatchesData['body']
export type ServiceboardUpdateSettingsBody = PutIntegrationsServiceboardSettingsData['body']

/**
 * Service Board integration: connection setup, helpdesk lookups, customer import, delivery history
 * and settings.
 */
export function createServiceboardIntegrationResource(client: Client) {
	return {
		/**
		 * Check the connection to Service Board using the supplied credentials.
		 */
		async testConnection(
			body: ServiceboardCheckConnectionBody,
		): Promise<PostIntegrationsServiceboardCheckConnectionResponse> {
			return ensureData(
				await postIntegrationsServiceboardCheckConnection({ body, client }),
				'octoja.integrations.serviceboard.testConnection',
			)
		},
		/**
		 * Connect the Service Board integration with the supplied credentials.
		 */
		async connect(body: ServiceboardConnectBody): Promise<void> {
			ensureSuccess(
				await postIntegrationsServiceboard({ body, client }),
				'octoja.integrations.serviceboard.connect',
			)
		},
		/**
		 * Disconnect and remove the Service Board integration.
		 */
		async remove(): Promise<void> {
			ensureSuccess(
				await deleteIntegrationsServiceboard({ client }),
				'octoja.integrations.serviceboard.remove',
			)
		},
		/**
		 * Read the current Service Board integration settings.
		 */
		async settings(): Promise<GetIntegrationsServiceboardResponse> {
			return ensureData(
				await getIntegrationsServiceboard({ client }),
				'octoja.integrations.serviceboard.settings',
			)
		},
		/**
		 * List Service Board helpdesk categories.
		 */
		async categories(): Promise<GetIntegrationsServiceboardCategoriesResponse> {
			return ensureData(
				await getIntegrationsServiceboardCategories({ client }),
				'octoja.integrations.serviceboard.categories',
			)
		},
		/**
		 * List customers from Service Board.
		 */
		async customers(): Promise<GetIntegrationsServiceboardCustomersResponse> {
			return ensureData(
				await getIntegrationsServiceboardCustomers({ client }),
				'octoja.integrations.serviceboard.customers',
			)
		},
		/**
		 * Read Service Board editor options.
		 */
		async editorOptions(): Promise<GetIntegrationsServiceboardEditorOptionsResponse> {
			return ensureData(
				await getIntegrationsServiceboardEditorOptions({ client }),
				'octoja.integrations.serviceboard.editorOptions',
			)
		},
		/**
		 * List Service Board helpdesk types.
		 */
		async helpdeskTypes(): Promise<GetIntegrationsServiceboardHelpdeskTypesResponse> {
			return ensureData(
				await getIntegrationsServiceboardHelpdeskTypes({ client }),
				'octoja.integrations.serviceboard.helpdeskTypes',
			)
		},
		/**
		 * List Service Board helpdesk priorities.
		 */
		async priorities(): Promise<GetIntegrationsServiceboardPrioritiesResponse> {
			return ensureData(
				await getIntegrationsServiceboardPriorities({ client }),
				'octoja.integrations.serviceboard.priorities',
			)
		},
		/**
		 * Import customers from Service Board.
		 */
		async importCustomers(
			body: ServiceboardImportCustomersBody,
		): Promise<PostIntegrationsServiceboardImportCustomersResponse> {
			return ensureData(
				await postIntegrationsServiceboardImportCustomers({ body, client }),
				'octoja.integrations.serviceboard.importCustomers',
			)
		},
		/**
		 * List Service Board outbound delivery history.
		 */
		async deliveries(
			query?: ServiceboardDeliveriesQuery,
		): Promise<GetIntegrationsServiceboardDeliveriesResponse> {
			return ensureData(
				await getIntegrationsServiceboardDeliveries({ query, client }),
				'octoja.integrations.serviceboard.deliveries',
			)
		},
		/**
		 * Update the customer matches for Service Board.
		 */
		async updateMatches(body: ServiceboardUpdateMatchesBody): Promise<void> {
			ensureSuccess(
				await putIntegrationsServiceboardMatches({ body, client }),
				'octoja.integrations.serviceboard.updateMatches',
			)
		},
		/**
		 * Update the Service Board integration settings.
		 */
		async updateSettings(body: ServiceboardUpdateSettingsBody): Promise<void> {
			ensureSuccess(
				await putIntegrationsServiceboardSettings({ body, client }),
				'octoja.integrations.serviceboard.updateSettings',
			)
		},
	}
}

export type ServiceboardIntegrationResource = ReturnType<
	typeof createServiceboardIntegrationResource
>
