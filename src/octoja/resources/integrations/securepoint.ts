import type { Client } from '../../../generated/client/types.gen'
import {
	deleteIntegrationsSecurepoint,
	getIntegrationsSecurepoint,
	getIntegrationsSecurepointTenants,
	getIntegrationsSecurepointUtmSites,
	getIntegrationsSecurepointVerify,
	postIntegrationsSecurepoint,
	postIntegrationsSecurepointCheckConnection,
	postIntegrationsSecurepointSyncDevices,
	putIntegrationsSecurepointMatches,
	putIntegrationsSecurepointUtmSites,
} from '../../../generated/sdk.gen'
import type {
	GetIntegrationsSecurepointResponse,
	GetIntegrationsSecurepointTenantsResponse,
	GetIntegrationsSecurepointUtmSitesResponse,
	GetIntegrationsSecurepointVerifyResponse,
	PostIntegrationsSecurepointCheckConnectionData,
	PostIntegrationsSecurepointCheckConnectionResponse,
	PostIntegrationsSecurepointData,
	PutIntegrationsSecurepointMatchesData,
	PutIntegrationsSecurepointUtmSitesData,
} from '../../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../../shared/errors'

export type SecurepointCheckConnectionBody = PostIntegrationsSecurepointCheckConnectionData['body']
export type SecurepointConnectBody = PostIntegrationsSecurepointData['body']
export type SecurepointUpdateUtmSitesBody = PutIntegrationsSecurepointUtmSitesData['body']
export type SecurepointUpdateMatchesBody = PutIntegrationsSecurepointMatchesData['body']

/**
 * Securepoint integration: connection setup, tenant/UTM site lookups, device sync and customer
 * matching.
 */
export function createSecurepointIntegrationResource(client: Client) {
	return {
		/**
		 * Check the connection to Securepoint using the supplied credentials.
		 */
		async testConnection(
			body: SecurepointCheckConnectionBody,
		): Promise<PostIntegrationsSecurepointCheckConnectionResponse> {
			return ensureData(
				await postIntegrationsSecurepointCheckConnection({ body, client }),
				'octoja.integrations.securepoint.testConnection',
			)
		},
		/**
		 * Connect the Securepoint integration with the supplied credentials.
		 */
		async connect(body: SecurepointConnectBody): Promise<void> {
			ensureSuccess(
				await postIntegrationsSecurepoint({ body, client }),
				'octoja.integrations.securepoint.connect',
			)
		},
		/**
		 * Disconnect and remove the Securepoint integration.
		 */
		async remove(): Promise<void> {
			ensureSuccess(
				await deleteIntegrationsSecurepoint({ client }),
				'octoja.integrations.securepoint.remove',
			)
		},
		/**
		 * Read the current Securepoint integration settings.
		 */
		async settings(): Promise<GetIntegrationsSecurepointResponse> {
			return ensureData(
				await getIntegrationsSecurepoint({ client }),
				'octoja.integrations.securepoint.settings',
			)
		},
		/**
		 * List Securepoint tenants available for selection.
		 */
		async tenants(): Promise<GetIntegrationsSecurepointTenantsResponse> {
			return ensureData(
				await getIntegrationsSecurepointTenants({ client }),
				'octoja.integrations.securepoint.tenants',
			)
		},
		/**
		 * List Securepoint UTM sites available for selection.
		 */
		async utmSites(): Promise<GetIntegrationsSecurepointUtmSitesResponse> {
			return ensureData(
				await getIntegrationsSecurepointUtmSites({ client }),
				'octoja.integrations.securepoint.utmSites',
			)
		},
		/**
		 * Update the selected Securepoint UTM sites.
		 */
		async updateUtmSites(body: SecurepointUpdateUtmSitesBody): Promise<void> {
			ensureSuccess(
				await putIntegrationsSecurepointUtmSites({ body, client }),
				'octoja.integrations.securepoint.updateUtmSites',
			)
		},
		/**
		 * Synchronize devices from Securepoint.
		 */
		async sync(): Promise<void> {
			ensureSuccess(
				await postIntegrationsSecurepointSyncDevices({ client }),
				'octoja.integrations.securepoint.sync',
			)
		},
		/**
		 * Update the customer-to-tenant matches for Securepoint.
		 */
		async updateMatches(body: SecurepointUpdateMatchesBody): Promise<void> {
			ensureSuccess(
				await putIntegrationsSecurepointMatches({ body, client }),
				'octoja.integrations.securepoint.updateMatches',
			)
		},
		/**
		 * Verify the current Securepoint integration connection.
		 */
		async verify(): Promise<GetIntegrationsSecurepointVerifyResponse> {
			return ensureData(
				await getIntegrationsSecurepointVerify({ client }),
				'octoja.integrations.securepoint.verify',
			)
		},
	}
}

export type SecurepointIntegrationResource = ReturnType<typeof createSecurepointIntegrationResource>
