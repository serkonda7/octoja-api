import type { Client } from '../../generated/client/types.gen'
import {
	deleteEmailRecipientsById,
	deleteMobilePushTokensByInstallationid,
	getEmailRecipients,
	getEmailRecipientsById,
	getEmailRecipientsByIdDeliveries,
	getMobilePushTokens,
	postEmailRecipients,
	postEmailRecipientsById,
	postEmailRecipientsByIdTest,
	postEmailRecipientsDeliveriesByIdReplay,
	postEmailSenderSettingsTest,
	postMobilePushTokens,
} from '../../generated/sdk.gen'
import type {
	GetEmailRecipientsByIdDeliveriesData,
	GetEmailRecipientsByIdDeliveriesResponse,
	GetEmailRecipientsByIdResponse,
	GetEmailRecipientsResponse,
	GetMobilePushTokensResponse,
	PostEmailRecipientsByIdData,
	PostEmailRecipientsByIdResponse,
	PostEmailRecipientsByIdTestResponse,
	PostEmailRecipientsData,
	PostEmailRecipientsDeliveriesByIdReplayData,
	PostEmailRecipientsDeliveriesByIdReplayResponse,
	PostEmailRecipientsResponse,
	PostEmailSenderSettingsTestData,
	PostEmailSenderSettingsTestResponse,
	PostMobilePushTokensData,
} from '../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../shared/errors'

export type CreateEmailRecipientBody = PostEmailRecipientsData['body']
export type UpdateEmailRecipientBody = PostEmailRecipientsByIdData['body']
export type EmailDeliveriesQuery = GetEmailRecipientsByIdDeliveriesData['query']
export type ReplayEmailDeliveryBody = PostEmailRecipientsDeliveriesByIdReplayData['body']
export type TestEmailSenderBody = PostEmailSenderSettingsTestData['body']
export type RegisterPushTokenBody = PostMobilePushTokensData['body']

/**
 * Email recipients (CRUD, delivery history/replay, test mail), sender settings
 * test and mobile push-token registration.
 */
export function createNotificationsResource(client: Client) {
	return {
		emailRecipients: {
			/**
			 * List all email recipients.
			 */
			async list(): Promise<GetEmailRecipientsResponse> {
				return ensureData(
					await getEmailRecipients({ client }),
					'octoja.notifications.emailRecipients.list',
				)
			},
			/**
			 * Read the email recipient identified by `id`.
			 */
			async get(id: string): Promise<GetEmailRecipientsByIdResponse> {
				return ensureData(
					await getEmailRecipientsById({ path: { id }, client }),
					'octoja.notifications.emailRecipients.get',
				)
			},
			/**
			 * Create a new email recipient.
			 */
			async create(body: CreateEmailRecipientBody): Promise<PostEmailRecipientsResponse> {
				return ensureData(
					await postEmailRecipients({ body, client }),
					'octoja.notifications.emailRecipients.create',
				)
			},
			/**
			 * Update the email recipient identified by `id`.
			 */
			async update(
				id: string,
				body: UpdateEmailRecipientBody,
			): Promise<PostEmailRecipientsByIdResponse> {
				return ensureData(
					await postEmailRecipientsById({ path: { id }, body, client }),
					'octoja.notifications.emailRecipients.update',
				)
			},
			/**
			 * Delete the email recipient identified by `id`.
			 */
			async remove(id: string): Promise<void> {
				ensureSuccess(
					await deleteEmailRecipientsById({ path: { id }, client }),
					'octoja.notifications.emailRecipients.remove',
				)
			},
			/**
			 * List the delivery history of the recipient identified by `id`.
			 */
			async deliveries(
				id: string,
				query?: EmailDeliveriesQuery,
			): Promise<GetEmailRecipientsByIdDeliveriesResponse> {
				return ensureData(
					await getEmailRecipientsByIdDeliveries({ path: { id }, query, client }),
					'octoja.notifications.emailRecipients.deliveries',
				)
			},
			/**
			 * Replay the delivery identified by `id`.
			 */
			async replayDelivery(
				id: string,
				body: ReplayEmailDeliveryBody,
			): Promise<PostEmailRecipientsDeliveriesByIdReplayResponse> {
				return ensureData(
					await postEmailRecipientsDeliveriesByIdReplay({ path: { id }, body, client }),
					'octoja.notifications.emailRecipients.replayDelivery',
				)
			},
			/**
			 * Send a test email to the recipient identified by `id`.
			 */
			async test(id: string): Promise<PostEmailRecipientsByIdTestResponse> {
				return ensureData(
					await postEmailRecipientsByIdTest({ path: { id }, client }),
					'octoja.notifications.emailRecipients.test',
				)
			},
		},
		sender: {
			/**
			 * Send a test mail using the email sender settings.
			 */
			async test(body: TestEmailSenderBody): Promise<PostEmailSenderSettingsTestResponse> {
				return ensureData(
					await postEmailSenderSettingsTest({ body, client }),
					'octoja.notifications.sender.test',
				)
			},
		},
		pushTokens: {
			/**
			 * List registered mobile push tokens.
			 */
			async list(): Promise<GetMobilePushTokensResponse> {
				return ensureData(
					await getMobilePushTokens({ client }),
					'octoja.notifications.pushTokens.list',
				)
			},
			/**
			 * Register a mobile push token.
			 */
			async register(body: RegisterPushTokenBody): Promise<void> {
				ensureSuccess(
					await postMobilePushTokens({ body, client }),
					'octoja.notifications.pushTokens.register',
				)
			},
			/**
			 * Remove the push token for the given installation.
			 */
			async remove(installationId: string): Promise<void> {
				ensureSuccess(
					await deleteMobilePushTokensByInstallationid({
						path: { installationId },
						client,
					}),
					'octoja.notifications.pushTokens.remove',
				)
			},
		},
	}
}

export type NotificationsResource = ReturnType<typeof createNotificationsResource>
