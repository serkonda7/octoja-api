import type { Client } from '../../generated/client/types.gen'
import {
	deleteWebhooksById,
	getWebhooks,
	getWebhooksById,
	getWebhooksByIdDeliveries,
	getWebhooksByIdDeliveryHistogram,
	getWebhooksSamplePayloads,
	postWebhooks,
	postWebhooksById,
	postWebhooksByIdRotateSecret,
	postWebhooksByIdTest,
	postWebhooksDeliveriesByIdReplay,
} from '../../generated/sdk.gen'
import type {
	GetWebhooksByIdDeliveriesData,
	GetWebhooksByIdDeliveriesResponse,
	GetWebhooksByIdDeliveryHistogramResponse,
	GetWebhooksByIdResponse,
	GetWebhooksResponse,
	GetWebhooksSamplePayloadsResponse,
	PostWebhooksByIdData,
	PostWebhooksByIdResponse,
	PostWebhooksByIdRotateSecretData,
	PostWebhooksByIdRotateSecretResponse,
	PostWebhooksByIdTestResponse,
	PostWebhooksData,
	PostWebhooksDeliveriesByIdReplayData,
	PostWebhooksDeliveriesByIdReplayResponse,
	PostWebhooksResponse,
} from '../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../shared/errors'

export type CreateWebhookBody = PostWebhooksData['body']
export type UpdateWebhookBody = PostWebhooksByIdData['body']
export type WebhookDeliveriesQuery = GetWebhooksByIdDeliveriesData['query']
export type ReplayWebhookDeliveryBody = PostWebhooksDeliveriesByIdReplayData['body']
export type RotateWebhookSecretBody = PostWebhooksByIdRotateSecretData['body']

/**
 * Webhook subscriptions: CRUD, delivery history/replay, histogram, sample
 * payloads, secret rotation and test deliveries.
 */
export function createWebhooksResource(client: Client) {
	return {
		/**
		 * List all webhook subscriptions.
		 */
		async list(): Promise<GetWebhooksResponse> {
			return ensureData(await getWebhooks({ client }), 'octoja.webhooks.list')
		},
		/**
		 * Read the webhook subscription identified by `id`.
		 */
		async get(id: string): Promise<GetWebhooksByIdResponse> {
			return ensureData(
				await getWebhooksById({ path: { id }, client }),
				'octoja.webhooks.get',
			)
		},
		/**
		 * Create a new webhook subscription.
		 */
		async create(body: CreateWebhookBody): Promise<PostWebhooksResponse> {
			return ensureData(await postWebhooks({ body, client }), 'octoja.webhooks.create')
		},
		/**
		 * Update the webhook subscription identified by `id`.
		 */
		async update(id: string, body: UpdateWebhookBody): Promise<PostWebhooksByIdResponse> {
			return ensureData(
				await postWebhooksById({ path: { id }, body, client }),
				'octoja.webhooks.update',
			)
		},
		/**
		 * Delete the webhook subscription identified by `id`.
		 */
		async remove(id: string): Promise<void> {
			ensureSuccess(
				await deleteWebhooksById({ path: { id }, client }),
				'octoja.webhooks.remove',
			)
		},
		/**
		 * Delivery histogram buckets for the webhook identified by `id`.
		 */
		async deliveryHistogram(id: string): Promise<GetWebhooksByIdDeliveryHistogramResponse> {
			return ensureData(
				await getWebhooksByIdDeliveryHistogram({ path: { id }, client }),
				'octoja.webhooks.deliveryHistogram',
			)
		},
		/**
		 * Sample payloads for the available webhook event types.
		 */
		async samplePayloads(): Promise<GetWebhooksSamplePayloadsResponse> {
			return ensureData(
				await getWebhooksSamplePayloads({ client }),
				'octoja.webhooks.samplePayloads',
			)
		},
		/**
		 * List the delivery history of the webhook identified by `id`.
		 */
		async deliveries(
			id: string,
			query?: WebhookDeliveriesQuery,
		): Promise<GetWebhooksByIdDeliveriesResponse> {
			return ensureData(
				await getWebhooksByIdDeliveries({ path: { id }, query, client }),
				'octoja.webhooks.deliveries',
			)
		},
		/**
		 * Replay the delivery identified by `id`.
		 */
		async replayDelivery(
			id: string,
			body: ReplayWebhookDeliveryBody,
		): Promise<PostWebhooksDeliveriesByIdReplayResponse> {
			return ensureData(
				await postWebhooksDeliveriesByIdReplay({ path: { id }, body, client }),
				'octoja.webhooks.replayDelivery',
			)
		},
		/**
		 * Rotate the signing secret of the webhook identified by `id`.
		 */
		async rotateSecret(
			id: string,
			body: RotateWebhookSecretBody,
		): Promise<PostWebhooksByIdRotateSecretResponse> {
			return ensureData(
				await postWebhooksByIdRotateSecret({ path: { id }, body, client }),
				'octoja.webhooks.rotateSecret',
			)
		},
		/**
		 * Send a test delivery to the webhook identified by `id`.
		 */
		async test(id: string): Promise<PostWebhooksByIdTestResponse> {
			return ensureData(
				await postWebhooksByIdTest({ path: { id }, client }),
				'octoja.webhooks.test',
			)
		},
	}
}

export type WebhooksResource = ReturnType<typeof createWebhooksResource>
