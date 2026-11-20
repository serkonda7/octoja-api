import type { Client } from '../../../generated/client/types.gen'
import {
	deleteIntegrationsAcronis,
	getIntegrationsAcronis,
	getIntegrationsAcronisTenants,
	getIntegrationsAcronisVerify,
	postIntegrationsAcronis,
	postIntegrationsAcronisCheckConnection,
	putIntegrationsAcronisMatches,
} from '../../../generated/sdk.gen'
import type {
	GetIntegrationsAcronisResponse,
	GetIntegrationsAcronisTenantsResponse,
	GetIntegrationsAcronisVerifyResponse,
	PostIntegrationsAcronisCheckConnectionData,
	PostIntegrationsAcronisCheckConnectionResponse,
	PostIntegrationsAcronisData,
	PutIntegrationsAcronisMatchesData,
} from '../../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../../shared/errors'

export type AcronisCheckConnectionBody = PostIntegrationsAcronisCheckConnectionData['body']
export type AcronisConnectBody = PostIntegrationsAcronisData['body']
export type AcronisUpdateMatchesBody = PutIntegrationsAcronisMatchesData['body']

/**
 * Acronis integration: connection, settings, tenants and customer matching.
 */
export function createAcronisIntegrationResource(client: Client) {
	return {
		/**
		 * Check the Acronis connection using the supplied credentials.
		 */
		async testConnection(
			body: AcronisCheckConnectionBody,
		): Promise<PostIntegrationsAcronisCheckConnectionResponse> {
			return ensureData(
				await postIntegrationsAcronisCheckConnection({ body, client }),
				'octoja.integrations.acronis.testConnection',
			)
		},
		/**
		 * Connect the Acronis integration with the supplied credentials.
		 */
		async connect(body: AcronisConnectBody): Promise<void> {
			ensureSuccess(
				await postIntegrationsAcronis({ body, client }),
				'octoja.integrations.acronis.connect',
			)
		},
		/**
		 * Remove the Acronis integration.
		 */
		async remove(): Promise<void> {
			ensureSuccess(
				await deleteIntegrationsAcronis({ client }),
				'octoja.integrations.acronis.remove',
			)
		},
		/**
		 * Read the current Acronis integration settings.
		 */
		async settings(): Promise<GetIntegrationsAcronisResponse> {
			return ensureData(
				await getIntegrationsAcronis({ client }),
				'octoja.integrations.acronis.settings',
			)
		},
		/**
		 * List Acronis tenants available for matching.
		 */
		async tenants(): Promise<GetIntegrationsAcronisTenantsResponse> {
			return ensureData(
				await getIntegrationsAcronisTenants({ client }),
				'octoja.integrations.acronis.tenants',
			)
		},
		/**
		 * Update the customer matches for the Acronis integration.
		 */
		async updateMatches(body: AcronisUpdateMatchesBody): Promise<void> {
			ensureSuccess(
				await putIntegrationsAcronisMatches({ body, client }),
				'octoja.integrations.acronis.updateMatches',
			)
		},
		/**
		 * Verify the stored Acronis connection.
		 */
		async verify(): Promise<GetIntegrationsAcronisVerifyResponse> {
			return ensureData(
				await getIntegrationsAcronisVerify({ client }),
				'octoja.integrations.acronis.verify',
			)
		},
	}
}

export type AcronisIntegrationResource = ReturnType<typeof createAcronisIntegrationResource>
