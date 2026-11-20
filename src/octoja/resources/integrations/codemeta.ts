import type { Client } from '../../../generated/client/types.gen'
import {
	deleteIntegrationsCodemeta,
	getIntegrationsCodemeta,
	getIntegrationsCodemetaDeliveries,
	getIntegrationsCodemetaParties,
	getIntegrationsCodemetaPartiesByPartyidLocations,
	getIntegrationsCodemetaTicketTypes,
	postIntegrationsCodemeta,
	postIntegrationsCodemetaCheckConnection,
	postIntegrationsCodemetaImportCustomers,
	putIntegrationsCodemetaMatches,
	putIntegrationsCodemetaSettings,
} from '../../../generated/sdk.gen'
import type {
	GetIntegrationsCodemetaDeliveriesData,
	GetIntegrationsCodemetaDeliveriesResponse,
	GetIntegrationsCodemetaPartiesByPartyidLocationsResponse,
	GetIntegrationsCodemetaPartiesResponse,
	GetIntegrationsCodemetaResponse,
	GetIntegrationsCodemetaTicketTypesResponse,
	PostIntegrationsCodemetaCheckConnectionData,
	PostIntegrationsCodemetaCheckConnectionResponse,
	PostIntegrationsCodemetaData,
	PostIntegrationsCodemetaImportCustomersData,
	PostIntegrationsCodemetaImportCustomersResponse,
	PutIntegrationsCodemetaMatchesData,
	PutIntegrationsCodemetaSettingsData,
} from '../../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../../shared/errors'

export type CodemetaCheckConnectionBody = PostIntegrationsCodemetaCheckConnectionData['body']
export type CodemetaConnectBody = PostIntegrationsCodemetaData['body']
export type CodemetaImportCustomersBody = PostIntegrationsCodemetaImportCustomersData['body']
export type CodemetaDeliveriesQuery = GetIntegrationsCodemetaDeliveriesData['query']
export type CodemetaUpdateMatchesBody = PutIntegrationsCodemetaMatchesData['body']
export type CodemetaUpdateSettingsBody = PutIntegrationsCodemetaSettingsData['body']

/**
 * Codemeta integration: connection, settings, parties, ticket types, customer import and
 * delivery history.
 */
export function createCodemetaIntegrationResource(client: Client) {
	return {
		/**
		 * Check the Codemeta connection using the supplied credentials.
		 */
		async testConnection(
			body: CodemetaCheckConnectionBody,
		): Promise<PostIntegrationsCodemetaCheckConnectionResponse> {
			return ensureData(
				await postIntegrationsCodemetaCheckConnection({ body, client }),
				'octoja.integrations.codemeta.testConnection',
			)
		},
		/**
		 * Connect the Codemeta integration with the supplied credentials.
		 */
		async connect(body: CodemetaConnectBody): Promise<void> {
			ensureSuccess(
				await postIntegrationsCodemeta({ body, client }),
				'octoja.integrations.codemeta.connect',
			)
		},
		/**
		 * Remove the Codemeta integration.
		 */
		async remove(): Promise<void> {
			ensureSuccess(
				await deleteIntegrationsCodemeta({ client }),
				'octoja.integrations.codemeta.remove',
			)
		},
		/**
		 * Read the current Codemeta integration settings.
		 */
		async settings(): Promise<GetIntegrationsCodemetaResponse> {
			return ensureData(
				await getIntegrationsCodemeta({ client }),
				'octoja.integrations.codemeta.settings',
			)
		},
		/**
		 * List Codemeta parties.
		 */
		async parties(): Promise<GetIntegrationsCodemetaPartiesResponse> {
			return ensureData(
				await getIntegrationsCodemetaParties({ client }),
				'octoja.integrations.codemeta.parties',
			)
		},
		/**
		 * List locations for the Codemeta party `partyId`.
		 */
		async partyLocations(
			partyId: string,
		): Promise<GetIntegrationsCodemetaPartiesByPartyidLocationsResponse> {
			return ensureData(
				await getIntegrationsCodemetaPartiesByPartyidLocations({
					path: { partyId },
					client,
				}),
				'octoja.integrations.codemeta.partyLocations',
			)
		},
		/**
		 * List ticket types from the Codemeta account.
		 */
		async ticketTypes(): Promise<GetIntegrationsCodemetaTicketTypesResponse> {
			return ensureData(
				await getIntegrationsCodemetaTicketTypes({ client }),
				'octoja.integrations.codemeta.ticketTypes',
			)
		},
		/**
		 * Import customers from the connected Codemeta account.
		 */
		async importCustomers(
			body: CodemetaImportCustomersBody,
		): Promise<PostIntegrationsCodemetaImportCustomersResponse> {
			return ensureData(
				await postIntegrationsCodemetaImportCustomers({ body, client }),
				'octoja.integrations.codemeta.importCustomers',
			)
		},
		/**
		 * List outbound delivery history for the Codemeta integration.
		 */
		async deliveries(
			query?: CodemetaDeliveriesQuery,
		): Promise<GetIntegrationsCodemetaDeliveriesResponse> {
			return ensureData(
				await getIntegrationsCodemetaDeliveries({ query, client }),
				'octoja.integrations.codemeta.deliveries',
			)
		},
		/**
		 * Update the customer matches for the Codemeta integration.
		 */
		async updateMatches(body: CodemetaUpdateMatchesBody): Promise<void> {
			ensureSuccess(
				await putIntegrationsCodemetaMatches({ body, client }),
				'octoja.integrations.codemeta.updateMatches',
			)
		},
		/**
		 * Update the Codemeta integration settings.
		 */
		async updateSettings(body: CodemetaUpdateSettingsBody): Promise<void> {
			ensureSuccess(
				await putIntegrationsCodemetaSettings({ body, client }),
				'octoja.integrations.codemeta.updateSettings',
			)
		},
	}
}

export type CodemetaIntegrationResource = ReturnType<typeof createCodemetaIntegrationResource>
