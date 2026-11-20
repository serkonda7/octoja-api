import type { Client } from '../../../generated/client/types.gen'
import {
	deleteIntegrationsHudu,
	getIntegrationsHudu,
	getIntegrationsHuduAssetLayouts,
	getIntegrationsHuduCompanies,
	getIntegrationsHuduDeliveries,
	postIntegrationsHudu,
	postIntegrationsHuduAssetLayouts,
	postIntegrationsHuduCheckConnection,
	postIntegrationsHuduImportCustomers,
	putIntegrationsHuduMatches,
	putIntegrationsHuduSettings,
} from '../../../generated/sdk.gen'
import type {
	GetIntegrationsHuduAssetLayoutsResponse,
	GetIntegrationsHuduCompaniesResponse,
	GetIntegrationsHuduDeliveriesData,
	GetIntegrationsHuduDeliveriesResponse,
	GetIntegrationsHuduResponse,
	PostIntegrationsHuduAssetLayoutsData,
	PostIntegrationsHuduAssetLayoutsResponse,
	PostIntegrationsHuduCheckConnectionData,
	PostIntegrationsHuduCheckConnectionResponse,
	PostIntegrationsHuduData,
	PostIntegrationsHuduImportCustomersData,
	PostIntegrationsHuduImportCustomersResponse,
	PutIntegrationsHuduMatchesData,
	PutIntegrationsHuduSettingsData,
} from '../../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../../shared/errors'

export type HuduCheckConnectionBody = PostIntegrationsHuduCheckConnectionData['body']
export type HuduConnectBody = PostIntegrationsHuduData['body']
export type HuduCreateAssetLayoutBody = PostIntegrationsHuduAssetLayoutsData['body']
export type HuduImportCustomersBody = PostIntegrationsHuduImportCustomersData['body']
export type HuduDeliveriesQuery = GetIntegrationsHuduDeliveriesData['query']
export type HuduUpdateMatchesBody = PutIntegrationsHuduMatchesData['body']
export type HuduUpdateSettingsBody = PutIntegrationsHuduSettingsData['body']

/**
 * Hudu integration: connection, settings, asset layouts, companies, customer import and
 * delivery history.
 */
export function createHuduIntegrationResource(client: Client) {
	return {
		/**
		 * Check the Hudu connection using the supplied credentials.
		 */
		async testConnection(
			body: HuduCheckConnectionBody,
		): Promise<PostIntegrationsHuduCheckConnectionResponse> {
			return ensureData(
				await postIntegrationsHuduCheckConnection({ body, client }),
				'octoja.integrations.hudu.testConnection',
			)
		},
		/**
		 * Connect the Hudu integration with the supplied credentials.
		 */
		async connect(body: HuduConnectBody): Promise<void> {
			ensureSuccess(
				await postIntegrationsHudu({ body, client }),
				'octoja.integrations.hudu.connect',
			)
		},
		/**
		 * Remove the Hudu integration.
		 */
		async remove(): Promise<void> {
			ensureSuccess(
				await deleteIntegrationsHudu({ client }),
				'octoja.integrations.hudu.remove',
			)
		},
		/**
		 * Read the current Hudu integration settings.
		 */
		async settings(): Promise<GetIntegrationsHuduResponse> {
			return ensureData(
				await getIntegrationsHudu({ client }),
				'octoja.integrations.hudu.settings',
			)
		},
		/**
		 * Create a Hudu asset layout.
		 */
		async createAssetLayout(
			body: HuduCreateAssetLayoutBody,
		): Promise<PostIntegrationsHuduAssetLayoutsResponse> {
			return ensureData(
				await postIntegrationsHuduAssetLayouts({ body, client }),
				'octoja.integrations.hudu.createAssetLayout',
			)
		},
		/**
		 * List Hudu asset layouts.
		 */
		async assetLayouts(): Promise<GetIntegrationsHuduAssetLayoutsResponse> {
			return ensureData(
				await getIntegrationsHuduAssetLayouts({ client }),
				'octoja.integrations.hudu.assetLayouts',
			)
		},
		/**
		 * List companies from the Hudu account.
		 */
		async companies(): Promise<GetIntegrationsHuduCompaniesResponse> {
			return ensureData(
				await getIntegrationsHuduCompanies({ client }),
				'octoja.integrations.hudu.companies',
			)
		},
		/**
		 * Import customers from the connected Hudu account.
		 */
		async importCustomers(
			body: HuduImportCustomersBody,
		): Promise<PostIntegrationsHuduImportCustomersResponse> {
			return ensureData(
				await postIntegrationsHuduImportCustomers({ body, client }),
				'octoja.integrations.hudu.importCustomers',
			)
		},
		/**
		 * List outbound delivery history for the Hudu integration.
		 */
		async deliveries(
			query?: HuduDeliveriesQuery,
		): Promise<GetIntegrationsHuduDeliveriesResponse> {
			return ensureData(
				await getIntegrationsHuduDeliveries({ query, client }),
				'octoja.integrations.hudu.deliveries',
			)
		},
		/**
		 * Update the customer matches for the Hudu integration.
		 */
		async updateMatches(body: HuduUpdateMatchesBody): Promise<void> {
			ensureSuccess(
				await putIntegrationsHuduMatches({ body, client }),
				'octoja.integrations.hudu.updateMatches',
			)
		},
		/**
		 * Update the Hudu integration settings.
		 */
		async updateSettings(body: HuduUpdateSettingsBody): Promise<void> {
			ensureSuccess(
				await putIntegrationsHuduSettings({ body, client }),
				'octoja.integrations.hudu.updateSettings',
			)
		},
	}
}

export type HuduIntegrationResource = ReturnType<typeof createHuduIntegrationResource>
