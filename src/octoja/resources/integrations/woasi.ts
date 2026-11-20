import type { Client } from '../../../generated/client/types.gen'
import {
	deleteIntegrationsWoasi,
	getIntegrationsWoasi,
	getIntegrationsWoasiDeliveries,
	getIntegrationsWoasiDeliveriesById,
	postIntegrationsWoasi,
	postIntegrationsWoasiDeliveriesByIdReplay,
	postIntegrationsWoasiTest,
	postIntegrationsWoasiUpdate,
} from '../../../generated/sdk.gen'
import type {
	GetIntegrationsWoasiDeliveriesByIdResponse,
	GetIntegrationsWoasiDeliveriesData,
	GetIntegrationsWoasiDeliveriesResponse,
	GetIntegrationsWoasiResponse,
	PostIntegrationsWoasiData,
	PostIntegrationsWoasiDeliveriesByIdReplayData,
	PostIntegrationsWoasiDeliveriesByIdReplayResponse,
	PostIntegrationsWoasiTestData,
	PostIntegrationsWoasiTestResponse,
	PostIntegrationsWoasiUpdateData,
	PostIntegrationsWoasiUpdateResponse,
} from '../../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../../shared/errors'

export type WoasiConnectBody = PostIntegrationsWoasiData['body']
export type WoasiDeliveriesQuery = GetIntegrationsWoasiDeliveriesData['query']
export type WoasiReplayDeliveryBody = PostIntegrationsWoasiDeliveriesByIdReplayData['body']
export type WoasiTestBody = PostIntegrationsWoasiTestData['body']
export type WoasiUpdateBody = PostIntegrationsWoasiUpdateData['body']

/**
 * WOASI integration: connection setup, settings, delivery history/replay and test messages.
 */
export function createWoasiIntegrationResource(client: Client) {
	return {
		/**
		 * Connect the WOASI integration with the supplied credentials.
		 */
		async connect(body: WoasiConnectBody): Promise<void> {
			ensureSuccess(
				await postIntegrationsWoasi({ body, client }),
				'octoja.integrations.woasi.connect',
			)
		},
		/**
		 * Disconnect and remove the WOASI integration.
		 */
		async remove(): Promise<void> {
			ensureSuccess(
				await deleteIntegrationsWoasi({ client }),
				'octoja.integrations.woasi.remove',
			)
		},
		/**
		 * Read the current WOASI integration settings.
		 */
		async settings(): Promise<GetIntegrationsWoasiResponse> {
			return ensureData(
				await getIntegrationsWoasi({ client }),
				'octoja.integrations.woasi.settings',
			)
		},
		/**
		 * Read a single WOASI delivery by `id`.
		 */
		async delivery(id: string): Promise<GetIntegrationsWoasiDeliveriesByIdResponse> {
			return ensureData(
				await getIntegrationsWoasiDeliveriesById({ path: { id }, client }),
				'octoja.integrations.woasi.delivery',
			)
		},
		/**
		 * List WOASI delivery history.
		 */
		async deliveries(
			query?: WoasiDeliveriesQuery,
		): Promise<GetIntegrationsWoasiDeliveriesResponse> {
			return ensureData(
				await getIntegrationsWoasiDeliveries({ query, client }),
				'octoja.integrations.woasi.deliveries',
			)
		},
		/**
		 * Replay the WOASI delivery identified by `id`.
		 */
		async replayDelivery(
			id: string,
			body: WoasiReplayDeliveryBody,
		): Promise<PostIntegrationsWoasiDeliveriesByIdReplayResponse> {
			return ensureData(
				await postIntegrationsWoasiDeliveriesByIdReplay({ path: { id }, body, client }),
				'octoja.integrations.woasi.replayDelivery',
			)
		},
		/**
		 * Send a test message through the WOASI integration.
		 */
		async test(body: WoasiTestBody): Promise<PostIntegrationsWoasiTestResponse> {
			return ensureData(
				await postIntegrationsWoasiTest({ body, client }),
				'octoja.integrations.woasi.test',
			)
		},
		/**
		 * Update the WOASI integration.
		 */
		async update(body: WoasiUpdateBody): Promise<PostIntegrationsWoasiUpdateResponse> {
			return ensureData(
				await postIntegrationsWoasiUpdate({ body, client }),
				'octoja.integrations.woasi.update',
			)
		},
	}
}

export type WoasiIntegrationResource = ReturnType<typeof createWoasiIntegrationResource>
