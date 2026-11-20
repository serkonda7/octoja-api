import type { Client } from '../../../generated/client/types.gen'
import {
	deleteIntegrationsLywand,
	getIntegrationsLywand,
	getIntegrationsLywandPartners,
	getIntegrationsLywandVerify,
	postIntegrationsLywand,
	postIntegrationsLywandCheckConnection,
	putIntegrationsLywandMatches,
} from '../../../generated/sdk.gen'
import type {
	GetIntegrationsLywandPartnersResponse,
	GetIntegrationsLywandResponse,
	GetIntegrationsLywandVerifyResponse,
	PostIntegrationsLywandCheckConnectionData,
	PostIntegrationsLywandCheckConnectionResponse,
	PostIntegrationsLywandData,
	PutIntegrationsLywandMatchesData,
} from '../../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../../shared/errors'

export type LywandTestConnectionBody = PostIntegrationsLywandCheckConnectionData['body']
export type LywandConnectBody = PostIntegrationsLywandData['body']
export type LywandUpdateMatchesBody = PutIntegrationsLywandMatchesData['body']

/**
 * Lywand integration: connection, settings, partner lookup, customer matching and connection
 * verification.
 */
export function createLywandIntegrationResource(client: Client) {
	return {
		/**
		 * Check the connection to the Lywand API with the supplied credentials.
		 */
		async testConnection(
			body: LywandTestConnectionBody,
		): Promise<PostIntegrationsLywandCheckConnectionResponse> {
			return ensureData(
				await postIntegrationsLywandCheckConnection({ body, client }),
				'octoja.integrations.lywand.testConnection',
			)
		},
		/**
		 * Create and enable the Lywand integration with the supplied credentials.
		 */
		async connect(body: LywandConnectBody): Promise<void> {
			ensureSuccess(
				await postIntegrationsLywand({ body, client }),
				'octoja.integrations.lywand.connect',
			)
		},
		/**
		 * Remove the Lywand integration.
		 */
		async remove(): Promise<void> {
			ensureSuccess(
				await deleteIntegrationsLywand({ client }),
				'octoja.integrations.lywand.remove',
			)
		},
		/**
		 * Get the current Lywand integration settings.
		 */
		async settings(): Promise<GetIntegrationsLywandResponse> {
			return ensureData(
				await getIntegrationsLywand({ client }),
				'octoja.integrations.lywand.settings',
			)
		},
		/**
		 * List Lywand partners.
		 */
		async partners(): Promise<GetIntegrationsLywandPartnersResponse> {
			return ensureData(
				await getIntegrationsLywandPartners({ client }),
				'octoja.integrations.lywand.partners',
			)
		},
		/**
		 * Update the Lywand customer matches.
		 */
		async updateMatches(body: LywandUpdateMatchesBody): Promise<void> {
			ensureSuccess(
				await putIntegrationsLywandMatches({ body, client }),
				'octoja.integrations.lywand.updateMatches',
			)
		},
		/**
		 * Verify the Lywand connection.
		 */
		async verify(): Promise<GetIntegrationsLywandVerifyResponse> {
			return ensureData(
				await getIntegrationsLywandVerify({ client }),
				'octoja.integrations.lywand.verify',
			)
		},
	}
}

export type LywandIntegrationResource = ReturnType<typeof createLywandIntegrationResource>
