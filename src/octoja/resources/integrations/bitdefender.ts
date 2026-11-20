import type { Client } from '../../../generated/client/types.gen'
import {
	deleteIntegrationsBitdefender,
	getIntegrationsBitdefender,
	getIntegrationsBitdefenderCompanies,
	getIntegrationsBitdefenderVerify,
	postIntegrationsBitdefender,
	postIntegrationsBitdefenderCheckConnection,
	putIntegrationsBitdefenderMatches,
} from '../../../generated/sdk.gen'
import type {
	GetIntegrationsBitdefenderCompaniesResponse,
	GetIntegrationsBitdefenderResponse,
	GetIntegrationsBitdefenderVerifyResponse,
	PostIntegrationsBitdefenderCheckConnectionData,
	PostIntegrationsBitdefenderCheckConnectionResponse,
	PostIntegrationsBitdefenderData,
	PutIntegrationsBitdefenderMatchesData,
} from '../../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../../shared/errors'

export type BitdefenderCheckConnectionBody = PostIntegrationsBitdefenderCheckConnectionData['body']
export type BitdefenderConnectBody = PostIntegrationsBitdefenderData['body']
export type BitdefenderUpdateMatchesBody = PutIntegrationsBitdefenderMatchesData['body']

/**
 * Bitdefender integration: connection, settings, companies and customer matching.
 */
export function createBitdefenderIntegrationResource(client: Client) {
	return {
		/**
		 * Check the Bitdefender connection using the supplied credentials.
		 */
		async testConnection(
			body: BitdefenderCheckConnectionBody,
		): Promise<PostIntegrationsBitdefenderCheckConnectionResponse> {
			return ensureData(
				await postIntegrationsBitdefenderCheckConnection({ body, client }),
				'octoja.integrations.bitdefender.testConnection',
			)
		},
		/**
		 * Connect the Bitdefender integration with the supplied credentials.
		 */
		async connect(body: BitdefenderConnectBody): Promise<void> {
			ensureSuccess(
				await postIntegrationsBitdefender({ body, client }),
				'octoja.integrations.bitdefender.connect',
			)
		},
		/**
		 * Remove the Bitdefender integration.
		 */
		async remove(): Promise<void> {
			ensureSuccess(
				await deleteIntegrationsBitdefender({ client }),
				'octoja.integrations.bitdefender.remove',
			)
		},
		/**
		 * Read the current Bitdefender integration settings.
		 */
		async settings(): Promise<GetIntegrationsBitdefenderResponse> {
			return ensureData(
				await getIntegrationsBitdefender({ client }),
				'octoja.integrations.bitdefender.settings',
			)
		},
		/**
		 * List companies from the Bitdefender account.
		 */
		async companies(): Promise<GetIntegrationsBitdefenderCompaniesResponse> {
			return ensureData(
				await getIntegrationsBitdefenderCompanies({ client }),
				'octoja.integrations.bitdefender.companies',
			)
		},
		/**
		 * Update the customer matches for the Bitdefender integration.
		 */
		async updateMatches(body: BitdefenderUpdateMatchesBody): Promise<void> {
			ensureSuccess(
				await putIntegrationsBitdefenderMatches({ body, client }),
				'octoja.integrations.bitdefender.updateMatches',
			)
		},
		/**
		 * Verify the stored Bitdefender connection.
		 */
		async verify(): Promise<GetIntegrationsBitdefenderVerifyResponse> {
			return ensureData(
				await getIntegrationsBitdefenderVerify({ client }),
				'octoja.integrations.bitdefender.verify',
			)
		},
	}
}

export type BitdefenderIntegrationResource = ReturnType<typeof createBitdefenderIntegrationResource>
