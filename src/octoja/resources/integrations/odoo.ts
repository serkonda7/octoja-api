import type { Client } from '../../../generated/client/types.gen'
import {
	deleteIntegrationsOdoo,
	getIntegrationsOdoo,
	getIntegrationsOdooCustomerLocations,
	getIntegrationsOdooCustomers,
	getIntegrationsOdooDeliveries,
	getIntegrationsOdooStages,
	getIntegrationsOdooTeams,
	postIntegrationsOdoo,
	postIntegrationsOdooCheckConnection,
	postIntegrationsOdooImportCustomers,
	putIntegrationsOdooMatches,
	putIntegrationsOdooSettings,
} from '../../../generated/sdk.gen'
import type {
	GetIntegrationsOdooCustomerLocationsData,
	GetIntegrationsOdooCustomerLocationsResponse,
	GetIntegrationsOdooCustomersResponse,
	GetIntegrationsOdooDeliveriesData,
	GetIntegrationsOdooDeliveriesResponse,
	GetIntegrationsOdooResponse,
	GetIntegrationsOdooStagesResponse,
	GetIntegrationsOdooTeamsResponse,
	PostIntegrationsOdooCheckConnectionData,
	PostIntegrationsOdooCheckConnectionResponse,
	PostIntegrationsOdooData,
	PostIntegrationsOdooImportCustomersData,
	PostIntegrationsOdooImportCustomersResponse,
	PutIntegrationsOdooMatchesData,
	PutIntegrationsOdooSettingsData,
} from '../../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../../shared/errors'

export type OdooTestConnectionBody = PostIntegrationsOdooCheckConnectionData['body']
export type OdooConnectBody = PostIntegrationsOdooData['body']
export type OdooCustomerLocationsQuery = GetIntegrationsOdooCustomerLocationsData['query']
export type OdooImportCustomersBody = PostIntegrationsOdooImportCustomersData['body']
export type OdooDeliveriesQuery = GetIntegrationsOdooDeliveriesData['query']
export type OdooUpdateMatchesBody = PutIntegrationsOdooMatchesData['body']
export type OdooUpdateSettingsBody = PutIntegrationsOdooSettingsData['body']

/**
 * Odoo integration: connection, settings, customer import, delivery history and reference data
 * lookups.
 */
export function createOdooIntegrationResource(client: Client) {
	return {
		/**
		 * Check the connection to the Odoo API with the supplied credentials.
		 */
		async testConnection(
			body: OdooTestConnectionBody,
		): Promise<PostIntegrationsOdooCheckConnectionResponse> {
			return ensureData(
				await postIntegrationsOdooCheckConnection({ body, client }),
				'octoja.integrations.odoo.testConnection',
			)
		},
		/**
		 * Create and enable the Odoo integration with the supplied credentials.
		 */
		async connect(body: OdooConnectBody): Promise<void> {
			ensureSuccess(
				await postIntegrationsOdoo({ body, client }),
				'octoja.integrations.odoo.connect',
			)
		},
		/**
		 * Remove the Odoo integration.
		 */
		async remove(): Promise<void> {
			ensureSuccess(
				await deleteIntegrationsOdoo({ client }),
				'octoja.integrations.odoo.remove',
			)
		},
		/**
		 * Get the current Odoo integration settings.
		 */
		async settings(): Promise<GetIntegrationsOdooResponse> {
			return ensureData(
				await getIntegrationsOdoo({ client }),
				'octoja.integrations.odoo.settings',
			)
		},
		/**
		 * List Odoo customer locations, optionally filtered by partner.
		 */
		async customerLocations(
			query?: OdooCustomerLocationsQuery,
		): Promise<GetIntegrationsOdooCustomerLocationsResponse> {
			return ensureData(
				await getIntegrationsOdooCustomerLocations({ query, client }),
				'octoja.integrations.odoo.customerLocations',
			)
		},
		/**
		 * List Odoo customers.
		 */
		async customers(): Promise<GetIntegrationsOdooCustomersResponse> {
			return ensureData(
				await getIntegrationsOdooCustomers({ client }),
				'octoja.integrations.odoo.customers',
			)
		},
		/**
		 * List Odoo stages.
		 */
		async stages(): Promise<GetIntegrationsOdooStagesResponse> {
			return ensureData(
				await getIntegrationsOdooStages({ client }),
				'octoja.integrations.odoo.stages',
			)
		},
		/**
		 * List Odoo teams.
		 */
		async teams(): Promise<GetIntegrationsOdooTeamsResponse> {
			return ensureData(
				await getIntegrationsOdooTeams({ client }),
				'octoja.integrations.odoo.teams',
			)
		},
		/**
		 * Import customers from Odoo.
		 */
		async importCustomers(
			body: OdooImportCustomersBody,
		): Promise<PostIntegrationsOdooImportCustomersResponse> {
			return ensureData(
				await postIntegrationsOdooImportCustomers({ body, client }),
				'octoja.integrations.odoo.importCustomers',
			)
		},
		/**
		 * List Odoo outbound delivery history.
		 */
		async deliveries(
			query?: OdooDeliveriesQuery,
		): Promise<GetIntegrationsOdooDeliveriesResponse> {
			return ensureData(
				await getIntegrationsOdooDeliveries({ query, client }),
				'octoja.integrations.odoo.deliveries',
			)
		},
		/**
		 * Update the Odoo customer matches.
		 */
		async updateMatches(body: OdooUpdateMatchesBody): Promise<void> {
			ensureSuccess(
				await putIntegrationsOdooMatches({ body, client }),
				'octoja.integrations.odoo.updateMatches',
			)
		},
		/**
		 * Update the Odoo integration settings.
		 */
		async updateSettings(body: OdooUpdateSettingsBody): Promise<void> {
			ensureSuccess(
				await putIntegrationsOdooSettings({ body, client }),
				'octoja.integrations.odoo.updateSettings',
			)
		},
	}
}

export type OdooIntegrationResource = ReturnType<typeof createOdooIntegrationResource>
