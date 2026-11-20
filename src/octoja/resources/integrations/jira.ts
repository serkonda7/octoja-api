import type { Client } from '../../../generated/client/types.gen'
import {
	deleteIntegrationsJira,
	getIntegrationsJira,
	getIntegrationsJiraAssetsObjectSchemas,
	getIntegrationsJiraAssetsObjectTypes,
	getIntegrationsJiraDeliveries,
	getIntegrationsJiraOrganizationCustomers,
	getIntegrationsJiraOrganizations,
	getIntegrationsJiraPriorities,
	getIntegrationsJiraRequestTypes,
	getIntegrationsJiraServiceDesks,
	getIntegrationsJiraStatuses,
	postIntegrationsJira,
	postIntegrationsJiraCheckConnection,
	postIntegrationsJiraImportCustomers,
	putIntegrationsJiraAssetsDeviceMappings,
	putIntegrationsJiraMatches,
	putIntegrationsJiraSettings,
} from '../../../generated/sdk.gen'
import type {
	GetIntegrationsJiraAssetsObjectSchemasResponse,
	GetIntegrationsJiraAssetsObjectTypesData,
	GetIntegrationsJiraAssetsObjectTypesResponse,
	GetIntegrationsJiraDeliveriesData,
	GetIntegrationsJiraDeliveriesResponse,
	GetIntegrationsJiraOrganizationCustomersData,
	GetIntegrationsJiraOrganizationCustomersResponse,
	GetIntegrationsJiraOrganizationsResponse,
	GetIntegrationsJiraPrioritiesResponse,
	GetIntegrationsJiraRequestTypesData,
	GetIntegrationsJiraRequestTypesResponse,
	GetIntegrationsJiraResponse,
	GetIntegrationsJiraServiceDesksResponse,
	GetIntegrationsJiraStatusesData,
	GetIntegrationsJiraStatusesResponse,
	PostIntegrationsJiraCheckConnectionData,
	PostIntegrationsJiraCheckConnectionResponse,
	PostIntegrationsJiraData,
	PostIntegrationsJiraImportCustomersData,
	PostIntegrationsJiraImportCustomersResponse,
	PutIntegrationsJiraAssetsDeviceMappingsData,
	PutIntegrationsJiraMatchesData,
	PutIntegrationsJiraSettingsData,
} from '../../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../../shared/errors'

export type JiraTestConnectionBody = PostIntegrationsJiraCheckConnectionData['body']
export type JiraConnectBody = PostIntegrationsJiraData['body']
export type JiraObjectTypesQuery = GetIntegrationsJiraAssetsObjectTypesData['query']
export type JiraOrganizationCustomersQuery = GetIntegrationsJiraOrganizationCustomersData['query']
export type JiraRequestTypesQuery = GetIntegrationsJiraRequestTypesData['query']
export type JiraStatusesQuery = GetIntegrationsJiraStatusesData['query']
export type JiraImportCustomersBody = PostIntegrationsJiraImportCustomersData['body']
export type JiraDeliveriesQuery = GetIntegrationsJiraDeliveriesData['query']
export type JiraUpdateDeviceMappingsBody = PutIntegrationsJiraAssetsDeviceMappingsData['body']
export type JiraUpdateMatchesBody = PutIntegrationsJiraMatchesData['body']
export type JiraUpdateSettingsBody = PutIntegrationsJiraSettingsData['body']

/**
 * Jira integration: connection, settings, customer import, delivery history, Assets mappings
 * and reference data lookups.
 */
export function createJiraIntegrationResource(client: Client) {
	return {
		/**
		 * Check the connection to the Jira API with the supplied credentials.
		 */
		async testConnection(
			body: JiraTestConnectionBody,
		): Promise<PostIntegrationsJiraCheckConnectionResponse> {
			return ensureData(
				await postIntegrationsJiraCheckConnection({ body, client }),
				'octoja.integrations.jira.testConnection',
			)
		},
		/**
		 * Create and enable the Jira integration with the supplied credentials.
		 */
		async connect(body: JiraConnectBody): Promise<void> {
			ensureSuccess(
				await postIntegrationsJira({ body, client }),
				'octoja.integrations.jira.connect',
			)
		},
		/**
		 * Remove the Jira integration.
		 */
		async remove(): Promise<void> {
			ensureSuccess(
				await deleteIntegrationsJira({ client }),
				'octoja.integrations.jira.remove',
			)
		},
		/**
		 * Get the current Jira integration settings.
		 */
		async settings(): Promise<GetIntegrationsJiraResponse> {
			return ensureData(
				await getIntegrationsJira({ client }),
				'octoja.integrations.jira.settings',
			)
		},
		/**
		 * List Jira organization customers, optionally filtered by organization.
		 */
		async organizationCustomers(
			query?: JiraOrganizationCustomersQuery,
		): Promise<GetIntegrationsJiraOrganizationCustomersResponse> {
			return ensureData(
				await getIntegrationsJiraOrganizationCustomers({ query, client }),
				'octoja.integrations.jira.organizationCustomers',
			)
		},
		/**
		 * List Jira organizations.
		 */
		async organizations(): Promise<GetIntegrationsJiraOrganizationsResponse> {
			return ensureData(
				await getIntegrationsJiraOrganizations({ client }),
				'octoja.integrations.jira.organizations',
			)
		},
		/**
		 * List Jira priorities.
		 */
		async priorities(): Promise<GetIntegrationsJiraPrioritiesResponse> {
			return ensureData(
				await getIntegrationsJiraPriorities({ client }),
				'octoja.integrations.jira.priorities',
			)
		},
		/**
		 * List Jira request types, optionally filtered by service desk.
		 */
		async requestTypes(
			query?: JiraRequestTypesQuery,
		): Promise<GetIntegrationsJiraRequestTypesResponse> {
			return ensureData(
				await getIntegrationsJiraRequestTypes({ query, client }),
				'octoja.integrations.jira.requestTypes',
			)
		},
		/**
		 * List Jira service desks.
		 */
		async serviceDesks(): Promise<GetIntegrationsJiraServiceDesksResponse> {
			return ensureData(
				await getIntegrationsJiraServiceDesks({ client }),
				'octoja.integrations.jira.serviceDesks',
			)
		},
		/**
		 * List Jira statuses, optionally filtered.
		 */
		async statuses(query?: JiraStatusesQuery): Promise<GetIntegrationsJiraStatusesResponse> {
			return ensureData(
				await getIntegrationsJiraStatuses({ query, client }),
				'octoja.integrations.jira.statuses',
			)
		},
		/**
		 * Import customers from Jira.
		 */
		async importCustomers(
			body: JiraImportCustomersBody,
		): Promise<PostIntegrationsJiraImportCustomersResponse> {
			return ensureData(
				await postIntegrationsJiraImportCustomers({ body, client }),
				'octoja.integrations.jira.importCustomers',
			)
		},
		/**
		 * List Jira outbound delivery history.
		 */
		async deliveries(
			query?: JiraDeliveriesQuery,
		): Promise<GetIntegrationsJiraDeliveriesResponse> {
			return ensureData(
				await getIntegrationsJiraDeliveries({ query, client }),
				'octoja.integrations.jira.deliveries',
			)
		},
		/**
		 * Update the Jira customer matches.
		 */
		async updateMatches(body: JiraUpdateMatchesBody): Promise<void> {
			ensureSuccess(
				await putIntegrationsJiraMatches({ body, client }),
				'octoja.integrations.jira.updateMatches',
			)
		},
		/**
		 * Update the Jira integration settings.
		 */
		async updateSettings(body: JiraUpdateSettingsBody): Promise<void> {
			ensureSuccess(
				await putIntegrationsJiraSettings({ body, client }),
				'octoja.integrations.jira.updateSettings',
			)
		},
		assets: {
			/**
			 * List Jira Assets object schemas.
			 */
			async objectSchemas(): Promise<GetIntegrationsJiraAssetsObjectSchemasResponse> {
				return ensureData(
					await getIntegrationsJiraAssetsObjectSchemas({ client }),
					'octoja.integrations.jira.assets.objectSchemas',
				)
			},
			/**
			 * List Jira Assets object types, optionally filtered by schema.
			 */
			async objectTypes(
				query?: JiraObjectTypesQuery,
			): Promise<GetIntegrationsJiraAssetsObjectTypesResponse> {
				return ensureData(
					await getIntegrationsJiraAssetsObjectTypes({ query, client }),
					'octoja.integrations.jira.assets.objectTypes',
				)
			},
			/**
			 * Update the Jira Assets device mappings.
			 */
			async updateDeviceMappings(body: JiraUpdateDeviceMappingsBody): Promise<void> {
				ensureSuccess(
					await putIntegrationsJiraAssetsDeviceMappings({ body, client }),
					'octoja.integrations.jira.assets.updateDeviceMappings',
				)
			},
		},
	}
}

export type JiraIntegrationResource = ReturnType<typeof createJiraIntegrationResource>
