import type { Client } from '../../../generated/client/types.gen'
import {
	deleteIntegrationsZammad,
	getIntegrationsZammad,
	getIntegrationsZammadDeliveries,
	getIntegrationsZammadGroups,
	getIntegrationsZammadOrganizations,
	getIntegrationsZammadPriorities,
	getIntegrationsZammadStates,
	postIntegrationsZammad,
	postIntegrationsZammadCheckConnection,
	postIntegrationsZammadImportCustomers,
	putIntegrationsZammadMatches,
	putIntegrationsZammadSettings,
} from '../../../generated/sdk.gen'
import type {
	GetIntegrationsZammadDeliveriesData,
	GetIntegrationsZammadDeliveriesResponse,
	GetIntegrationsZammadGroupsResponse,
	GetIntegrationsZammadOrganizationsResponse,
	GetIntegrationsZammadPrioritiesResponse,
	GetIntegrationsZammadResponse,
	GetIntegrationsZammadStatesResponse,
	PostIntegrationsZammadCheckConnectionData,
	PostIntegrationsZammadCheckConnectionResponse,
	PostIntegrationsZammadData,
	PostIntegrationsZammadImportCustomersData,
	PostIntegrationsZammadImportCustomersResponse,
	PutIntegrationsZammadMatchesData,
	PutIntegrationsZammadSettingsData,
} from '../../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../../shared/errors'

export type ZammadCheckConnectionBody = PostIntegrationsZammadCheckConnectionData['body']
export type ZammadConnectBody = PostIntegrationsZammadData['body']
export type ZammadImportCustomersBody = PostIntegrationsZammadImportCustomersData['body']
export type ZammadDeliveriesQuery = GetIntegrationsZammadDeliveriesData['query']
export type ZammadUpdateMatchesBody = PutIntegrationsZammadMatchesData['body']
export type ZammadUpdateSettingsBody = PutIntegrationsZammadSettingsData['body']

/**
 * Zammad integration: connection setup, group/organization/ticket lookups, customer import,
 * delivery history and settings.
 */
export function createZammadIntegrationResource(client: Client) {
	return {
		/**
		 * Check the connection to Zammad using the supplied credentials.
		 */
		async testConnection(
			body: ZammadCheckConnectionBody,
		): Promise<PostIntegrationsZammadCheckConnectionResponse> {
			return ensureData(
				await postIntegrationsZammadCheckConnection({ body, client }),
				'octoja.integrations.zammad.testConnection',
			)
		},
		/**
		 * Connect the Zammad integration with the supplied credentials.
		 */
		async connect(body: ZammadConnectBody): Promise<void> {
			ensureSuccess(
				await postIntegrationsZammad({ body, client }),
				'octoja.integrations.zammad.connect',
			)
		},
		/**
		 * Disconnect and remove the Zammad integration.
		 */
		async remove(): Promise<void> {
			ensureSuccess(
				await deleteIntegrationsZammad({ client }),
				'octoja.integrations.zammad.remove',
			)
		},
		/**
		 * Read the current Zammad integration settings.
		 */
		async settings(): Promise<GetIntegrationsZammadResponse> {
			return ensureData(
				await getIntegrationsZammad({ client }),
				'octoja.integrations.zammad.settings',
			)
		},
		/**
		 * List Zammad groups.
		 */
		async groups(): Promise<GetIntegrationsZammadGroupsResponse> {
			return ensureData(
				await getIntegrationsZammadGroups({ client }),
				'octoja.integrations.zammad.groups',
			)
		},
		/**
		 * List Zammad organizations.
		 */
		async organizations(): Promise<GetIntegrationsZammadOrganizationsResponse> {
			return ensureData(
				await getIntegrationsZammadOrganizations({ client }),
				'octoja.integrations.zammad.organizations',
			)
		},
		/**
		 * List Zammad ticket priorities.
		 */
		async priorities(): Promise<GetIntegrationsZammadPrioritiesResponse> {
			return ensureData(
				await getIntegrationsZammadPriorities({ client }),
				'octoja.integrations.zammad.priorities',
			)
		},
		/**
		 * List Zammad ticket states.
		 */
		async states(): Promise<GetIntegrationsZammadStatesResponse> {
			return ensureData(
				await getIntegrationsZammadStates({ client }),
				'octoja.integrations.zammad.states',
			)
		},
		/**
		 * Import customers from Zammad.
		 */
		async importCustomers(
			body: ZammadImportCustomersBody,
		): Promise<PostIntegrationsZammadImportCustomersResponse> {
			return ensureData(
				await postIntegrationsZammadImportCustomers({ body, client }),
				'octoja.integrations.zammad.importCustomers',
			)
		},
		/**
		 * List Zammad outbound delivery history.
		 */
		async deliveries(
			query?: ZammadDeliveriesQuery,
		): Promise<GetIntegrationsZammadDeliveriesResponse> {
			return ensureData(
				await getIntegrationsZammadDeliveries({ query, client }),
				'octoja.integrations.zammad.deliveries',
			)
		},
		/**
		 * Update the customer matches for Zammad.
		 */
		async updateMatches(body: ZammadUpdateMatchesBody): Promise<void> {
			ensureSuccess(
				await putIntegrationsZammadMatches({ body, client }),
				'octoja.integrations.zammad.updateMatches',
			)
		},
		/**
		 * Update the Zammad integration settings.
		 */
		async updateSettings(body: ZammadUpdateSettingsBody): Promise<void> {
			ensureSuccess(
				await putIntegrationsZammadSettings({ body, client }),
				'octoja.integrations.zammad.updateSettings',
			)
		},
	}
}

export type ZammadIntegrationResource = ReturnType<typeof createZammadIntegrationResource>
