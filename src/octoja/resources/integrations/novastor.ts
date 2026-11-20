import type { Client } from '../../../generated/client/types.gen'
import {
	deleteIntegrationsNovastor,
	getIntegrationsNovastor,
	getIntegrationsNovastorOrganizations,
	getIntegrationsNovastorVerify,
	postIntegrationsNovastor,
	postIntegrationsNovastorCheckConnection,
	putIntegrationsNovastorMatches,
} from '../../../generated/sdk.gen'
import type {
	GetIntegrationsNovastorOrganizationsResponse,
	GetIntegrationsNovastorResponse,
	GetIntegrationsNovastorVerifyResponse,
	PostIntegrationsNovastorCheckConnectionData,
	PostIntegrationsNovastorCheckConnectionResponse,
	PostIntegrationsNovastorData,
	PutIntegrationsNovastorMatchesData,
} from '../../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../../shared/errors'

export type NovastorTestConnectionBody = PostIntegrationsNovastorCheckConnectionData['body']
export type NovastorConnectBody = PostIntegrationsNovastorData['body']
export type NovastorUpdateMatchesBody = PutIntegrationsNovastorMatchesData['body']

/**
 * NovaStor integration: connection, settings, organization lookup, customer matching and
 * connection verification.
 */
export function createNovastorIntegrationResource(client: Client) {
	return {
		/**
		 * Check the connection to the NovaStor API with the supplied credentials.
		 */
		async testConnection(
			body: NovastorTestConnectionBody,
		): Promise<PostIntegrationsNovastorCheckConnectionResponse> {
			return ensureData(
				await postIntegrationsNovastorCheckConnection({ body, client }),
				'octoja.integrations.novastor.testConnection',
			)
		},
		/**
		 * Create and enable the NovaStor integration with the supplied credentials.
		 */
		async connect(body: NovastorConnectBody): Promise<void> {
			ensureSuccess(
				await postIntegrationsNovastor({ body, client }),
				'octoja.integrations.novastor.connect',
			)
		},
		/**
		 * Remove the NovaStor integration.
		 */
		async remove(): Promise<void> {
			ensureSuccess(
				await deleteIntegrationsNovastor({ client }),
				'octoja.integrations.novastor.remove',
			)
		},
		/**
		 * Get the current NovaStor integration settings.
		 */
		async settings(): Promise<GetIntegrationsNovastorResponse> {
			return ensureData(
				await getIntegrationsNovastor({ client }),
				'octoja.integrations.novastor.settings',
			)
		},
		/**
		 * List NovaStor organizations.
		 */
		async organizations(): Promise<GetIntegrationsNovastorOrganizationsResponse> {
			return ensureData(
				await getIntegrationsNovastorOrganizations({ client }),
				'octoja.integrations.novastor.organizations',
			)
		},
		/**
		 * Verify the NovaStor connection.
		 */
		async verify(): Promise<GetIntegrationsNovastorVerifyResponse> {
			return ensureData(
				await getIntegrationsNovastorVerify({ client }),
				'octoja.integrations.novastor.verify',
			)
		},
		/**
		 * Update the NovaStor customer matches.
		 */
		async updateMatches(body: NovastorUpdateMatchesBody): Promise<void> {
			ensureSuccess(
				await putIntegrationsNovastorMatches({ body, client }),
				'octoja.integrations.novastor.updateMatches',
			)
		},
	}
}

export type NovastorIntegrationResource = ReturnType<typeof createNovastorIntegrationResource>
