import type { Client } from '../../../generated/client/types.gen'
import {
	deleteIntegrationsItglue,
	getIntegrationsItglue,
	getIntegrationsItglueConfigurationStatuses,
	getIntegrationsItglueConfigurationTypes,
	getIntegrationsItglueDeliveries,
	getIntegrationsItglueLocations,
	getIntegrationsItglueOrganizations,
	postIntegrationsItglue,
	postIntegrationsItglueCheckConnection,
	postIntegrationsItglueImportCustomers,
	putIntegrationsItglueMatches,
	putIntegrationsItglueSettings,
} from '../../../generated/sdk.gen'
import type {
	GetIntegrationsItglueConfigurationStatusesResponse,
	GetIntegrationsItglueConfigurationTypesResponse,
	GetIntegrationsItglueDeliveriesData,
	GetIntegrationsItglueDeliveriesResponse,
	GetIntegrationsItglueLocationsData,
	GetIntegrationsItglueLocationsResponse,
	GetIntegrationsItglueOrganizationsResponse,
	GetIntegrationsItglueResponse,
	PostIntegrationsItglueCheckConnectionData,
	PostIntegrationsItglueCheckConnectionResponse,
	PostIntegrationsItglueData,
	PostIntegrationsItglueImportCustomersData,
	PostIntegrationsItglueImportCustomersResponse,
	PutIntegrationsItglueMatchesData,
	PutIntegrationsItglueSettingsData,
} from '../../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../../shared/errors'

export type ItglueTestConnectionBody = PostIntegrationsItglueCheckConnectionData['body']
export type ItglueConnectBody = PostIntegrationsItglueData['body']
export type ItglueLocationsQuery = GetIntegrationsItglueLocationsData['query']
export type ItglueImportCustomersBody = PostIntegrationsItglueImportCustomersData['body']
export type ItglueDeliveriesQuery = GetIntegrationsItglueDeliveriesData['query']
export type ItglueUpdateMatchesBody = PutIntegrationsItglueMatchesData['body']
export type ItglueUpdateSettingsBody = PutIntegrationsItglueSettingsData['body']

/**
 * IT Glue integration: connection, settings, customer import, delivery history and reference
 * data lookups.
 */
export function createItglueIntegrationResource(client: Client) {
	return {
		/**
		 * Check the connection to the IT Glue API with the supplied credentials.
		 */
		async testConnection(
			body: ItglueTestConnectionBody,
		): Promise<PostIntegrationsItglueCheckConnectionResponse> {
			return ensureData(
				await postIntegrationsItglueCheckConnection({ body, client }),
				'octoja.integrations.itglue.testConnection',
			)
		},
		/**
		 * Create and enable the IT Glue integration with the supplied credentials.
		 */
		async connect(body: ItglueConnectBody): Promise<void> {
			ensureSuccess(
				await postIntegrationsItglue({ body, client }),
				'octoja.integrations.itglue.connect',
			)
		},
		/**
		 * Remove the IT Glue integration.
		 */
		async remove(): Promise<void> {
			ensureSuccess(
				await deleteIntegrationsItglue({ client }),
				'octoja.integrations.itglue.remove',
			)
		},
		/**
		 * Get the current IT Glue integration settings.
		 */
		async settings(): Promise<GetIntegrationsItglueResponse> {
			return ensureData(
				await getIntegrationsItglue({ client }),
				'octoja.integrations.itglue.settings',
			)
		},
		/**
		 * List IT Glue configuration statuses.
		 */
		async configurationStatuses(): Promise<GetIntegrationsItglueConfigurationStatusesResponse> {
			return ensureData(
				await getIntegrationsItglueConfigurationStatuses({ client }),
				'octoja.integrations.itglue.configurationStatuses',
			)
		},
		/**
		 * List IT Glue configuration types.
		 */
		async configurationTypes(): Promise<GetIntegrationsItglueConfigurationTypesResponse> {
			return ensureData(
				await getIntegrationsItglueConfigurationTypes({ client }),
				'octoja.integrations.itglue.configurationTypes',
			)
		},
		/**
		 * List IT Glue locations, optionally filtered.
		 */
		async locations(
			query?: ItglueLocationsQuery,
		): Promise<GetIntegrationsItglueLocationsResponse> {
			return ensureData(
				await getIntegrationsItglueLocations({ query, client }),
				'octoja.integrations.itglue.locations',
			)
		},
		/**
		 * List IT Glue organizations.
		 */
		async organizations(): Promise<GetIntegrationsItglueOrganizationsResponse> {
			return ensureData(
				await getIntegrationsItglueOrganizations({ client }),
				'octoja.integrations.itglue.organizations',
			)
		},
		/**
		 * Import customers from IT Glue.
		 */
		async importCustomers(
			body: ItglueImportCustomersBody,
		): Promise<PostIntegrationsItglueImportCustomersResponse> {
			return ensureData(
				await postIntegrationsItglueImportCustomers({ body, client }),
				'octoja.integrations.itglue.importCustomers',
			)
		},
		/**
		 * List IT Glue outbound delivery history.
		 */
		async deliveries(
			query?: ItglueDeliveriesQuery,
		): Promise<GetIntegrationsItglueDeliveriesResponse> {
			return ensureData(
				await getIntegrationsItglueDeliveries({ query, client }),
				'octoja.integrations.itglue.deliveries',
			)
		},
		/**
		 * Update the IT Glue customer matches.
		 */
		async updateMatches(body: ItglueUpdateMatchesBody): Promise<void> {
			ensureSuccess(
				await putIntegrationsItglueMatches({ body, client }),
				'octoja.integrations.itglue.updateMatches',
			)
		},
		/**
		 * Update the IT Glue integration settings.
		 */
		async updateSettings(body: ItglueUpdateSettingsBody): Promise<void> {
			ensureSuccess(
				await putIntegrationsItglueSettings({ body, client }),
				'octoja.integrations.itglue.updateSettings',
			)
		},
	}
}

export type ItglueIntegrationResource = ReturnType<typeof createItglueIntegrationResource>
