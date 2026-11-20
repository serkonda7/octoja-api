import type { Client } from '../../../generated/client/types.gen'
import {
	deleteIntegrationsHalopsa,
	getIntegrationsHalopsa,
	getIntegrationsHalopsaAssetTypes,
	getIntegrationsHalopsaClients,
	getIntegrationsHalopsaDeliveries,
	getIntegrationsHalopsaPriorities,
	getIntegrationsHalopsaSites,
	getIntegrationsHalopsaStatuses,
	getIntegrationsHalopsaTicketTypes,
	postIntegrationsHalopsa,
	postIntegrationsHalopsaCheckConnection,
	postIntegrationsHalopsaImportCustomers,
	putIntegrationsHalopsaMatches,
	putIntegrationsHalopsaSettings,
} from '../../../generated/sdk.gen'
import type {
	GetIntegrationsHalopsaAssetTypesResponse,
	GetIntegrationsHalopsaClientsResponse,
	GetIntegrationsHalopsaDeliveriesData,
	GetIntegrationsHalopsaDeliveriesResponse,
	GetIntegrationsHalopsaPrioritiesResponse,
	GetIntegrationsHalopsaResponse,
	GetIntegrationsHalopsaSitesData,
	GetIntegrationsHalopsaSitesResponse,
	GetIntegrationsHalopsaStatusesResponse,
	GetIntegrationsHalopsaTicketTypesResponse,
	PostIntegrationsHalopsaCheckConnectionData,
	PostIntegrationsHalopsaCheckConnectionResponse,
	PostIntegrationsHalopsaData,
	PostIntegrationsHalopsaImportCustomersData,
	PostIntegrationsHalopsaImportCustomersResponse,
	PutIntegrationsHalopsaMatchesData,
	PutIntegrationsHalopsaSettingsData,
} from '../../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../../shared/errors'

export type HalopsaCheckConnectionBody = PostIntegrationsHalopsaCheckConnectionData['body']
export type HalopsaConnectBody = PostIntegrationsHalopsaData['body']
export type HalopsaSitesQuery = GetIntegrationsHalopsaSitesData['query']
export type HalopsaImportCustomersBody = PostIntegrationsHalopsaImportCustomersData['body']
export type HalopsaDeliveriesQuery = GetIntegrationsHalopsaDeliveriesData['query']
export type HalopsaUpdateMatchesBody = PutIntegrationsHalopsaMatchesData['body']
export type HalopsaUpdateSettingsBody = PutIntegrationsHalopsaSettingsData['body']

/**
 * HaloPSA integration: connection, settings, reference data, customer import and delivery
 * history.
 */
export function createHalopsaIntegrationResource(client: Client) {
	return {
		/**
		 * Check the HaloPSA connection using the supplied credentials.
		 */
		async testConnection(
			body: HalopsaCheckConnectionBody,
		): Promise<PostIntegrationsHalopsaCheckConnectionResponse> {
			return ensureData(
				await postIntegrationsHalopsaCheckConnection({ body, client }),
				'octoja.integrations.halopsa.testConnection',
			)
		},
		/**
		 * Connect the HaloPSA integration with the supplied credentials.
		 */
		async connect(body: HalopsaConnectBody): Promise<void> {
			ensureSuccess(
				await postIntegrationsHalopsa({ body, client }),
				'octoja.integrations.halopsa.connect',
			)
		},
		/**
		 * Remove the HaloPSA integration.
		 */
		async remove(): Promise<void> {
			ensureSuccess(
				await deleteIntegrationsHalopsa({ client }),
				'octoja.integrations.halopsa.remove',
			)
		},
		/**
		 * Read the current HaloPSA integration settings.
		 */
		async settings(): Promise<GetIntegrationsHalopsaResponse> {
			return ensureData(
				await getIntegrationsHalopsa({ client }),
				'octoja.integrations.halopsa.settings',
			)
		},
		/**
		 * List HaloPSA asset types.
		 */
		async assetTypes(): Promise<GetIntegrationsHalopsaAssetTypesResponse> {
			return ensureData(
				await getIntegrationsHalopsaAssetTypes({ client }),
				'octoja.integrations.halopsa.assetTypes',
			)
		},
		/**
		 * List HaloPSA clients.
		 */
		async clients(): Promise<GetIntegrationsHalopsaClientsResponse> {
			return ensureData(
				await getIntegrationsHalopsaClients({ client }),
				'octoja.integrations.halopsa.clients',
			)
		},
		/**
		 * List priority values from the HaloPSA account.
		 */
		async priorities(): Promise<GetIntegrationsHalopsaPrioritiesResponse> {
			return ensureData(
				await getIntegrationsHalopsaPriorities({ client }),
				'octoja.integrations.halopsa.priorities',
			)
		},
		/**
		 * List HaloPSA sites, optionally filtered by `clientId`.
		 */
		async sites(query?: HalopsaSitesQuery): Promise<GetIntegrationsHalopsaSitesResponse> {
			return ensureData(
				await getIntegrationsHalopsaSites({ query, client }),
				'octoja.integrations.halopsa.sites',
			)
		},
		/**
		 * List HaloPSA ticket statuses.
		 */
		async statuses(): Promise<GetIntegrationsHalopsaStatusesResponse> {
			return ensureData(
				await getIntegrationsHalopsaStatuses({ client }),
				'octoja.integrations.halopsa.statuses',
			)
		},
		/**
		 * List ticket types from the HaloPSA account.
		 */
		async ticketTypes(): Promise<GetIntegrationsHalopsaTicketTypesResponse> {
			return ensureData(
				await getIntegrationsHalopsaTicketTypes({ client }),
				'octoja.integrations.halopsa.ticketTypes',
			)
		},
		/**
		 * Import customers from the connected HaloPSA account.
		 */
		async importCustomers(
			body: HalopsaImportCustomersBody,
		): Promise<PostIntegrationsHalopsaImportCustomersResponse> {
			return ensureData(
				await postIntegrationsHalopsaImportCustomers({ body, client }),
				'octoja.integrations.halopsa.importCustomers',
			)
		},
		/**
		 * List outbound delivery history for the HaloPSA integration.
		 */
		async deliveries(
			query?: HalopsaDeliveriesQuery,
		): Promise<GetIntegrationsHalopsaDeliveriesResponse> {
			return ensureData(
				await getIntegrationsHalopsaDeliveries({ query, client }),
				'octoja.integrations.halopsa.deliveries',
			)
		},
		/**
		 * Update the customer matches for the HaloPSA integration.
		 */
		async updateMatches(body: HalopsaUpdateMatchesBody): Promise<void> {
			ensureSuccess(
				await putIntegrationsHalopsaMatches({ body, client }),
				'octoja.integrations.halopsa.updateMatches',
			)
		},
		/**
		 * Update the HaloPSA integration settings.
		 */
		async updateSettings(body: HalopsaUpdateSettingsBody): Promise<void> {
			ensureSuccess(
				await putIntegrationsHalopsaSettings({ body, client }),
				'octoja.integrations.halopsa.updateSettings',
			)
		},
	}
}

export type HalopsaIntegrationResource = ReturnType<typeof createHalopsaIntegrationResource>
