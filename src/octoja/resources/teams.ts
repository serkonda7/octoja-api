import type { Client } from '../../generated/client/types.gen'
import {
	deleteTeamsChannelsById,
	getTeamsChannels,
	getTeamsChannelsById,
	getTeamsChannelsByIdDeliveries,
	postTeamsChannels,
	postTeamsChannelsById,
	postTeamsChannelsByIdTest,
	postTeamsChannelsDeliveriesByIdReplay,
} from '../../generated/sdk.gen'
import type {
	GetTeamsChannelsByIdDeliveriesData,
	GetTeamsChannelsByIdDeliveriesResponse,
	GetTeamsChannelsByIdResponse,
	GetTeamsChannelsResponse,
	PostTeamsChannelsByIdData,
	PostTeamsChannelsByIdResponse,
	PostTeamsChannelsByIdTestResponse,
	PostTeamsChannelsData,
	PostTeamsChannelsDeliveriesByIdReplayData,
	PostTeamsChannelsDeliveriesByIdReplayResponse,
	PostTeamsChannelsResponse,
} from '../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../shared/errors'

export type CreateTeamsChannelBody = PostTeamsChannelsData['body']
export type UpdateTeamsChannelBody = PostTeamsChannelsByIdData['body']
export type TeamsDeliveriesQuery = GetTeamsChannelsByIdDeliveriesData['query']
export type ReplayTeamsDeliveryBody = PostTeamsChannelsDeliveriesByIdReplayData['body']

/**
 * Microsoft Teams channels: CRUD, delivery history/replay and test messages.
 */
export function createTeamsResource(client: Client) {
	return {
		/**
		 * List all Teams channels.
		 */
		async list(): Promise<GetTeamsChannelsResponse> {
			return ensureData(await getTeamsChannels({ client }), 'octoja.teams.list')
		},
		/**
		 * Read the Teams channel identified by `id`.
		 */
		async get(id: string): Promise<GetTeamsChannelsByIdResponse> {
			return ensureData(
				await getTeamsChannelsById({ path: { id }, client }),
				'octoja.teams.get',
			)
		},
		/**
		 * Create a new Teams channel.
		 */
		async create(body: CreateTeamsChannelBody): Promise<PostTeamsChannelsResponse> {
			return ensureData(await postTeamsChannels({ body, client }), 'octoja.teams.create')
		},
		/**
		 * Update the Teams channel identified by `id`.
		 */
		async update(
			id: string,
			body: UpdateTeamsChannelBody,
		): Promise<PostTeamsChannelsByIdResponse> {
			return ensureData(
				await postTeamsChannelsById({ path: { id }, body, client }),
				'octoja.teams.update',
			)
		},
		/**
		 * Delete the Teams channel identified by `id`.
		 */
		async remove(id: string): Promise<void> {
			ensureSuccess(
				await deleteTeamsChannelsById({ path: { id }, client }),
				'octoja.teams.remove',
			)
		},
		/**
		 * List the delivery history of the channel identified by `id`.
		 */
		async deliveries(
			id: string,
			query?: TeamsDeliveriesQuery,
		): Promise<GetTeamsChannelsByIdDeliveriesResponse> {
			return ensureData(
				await getTeamsChannelsByIdDeliveries({ path: { id }, query, client }),
				'octoja.teams.deliveries',
			)
		},
		/**
		 * Replay the delivery identified by `id`.
		 */
		async replayDelivery(
			id: string,
			body: ReplayTeamsDeliveryBody,
		): Promise<PostTeamsChannelsDeliveriesByIdReplayResponse> {
			return ensureData(
				await postTeamsChannelsDeliveriesByIdReplay({ path: { id }, body, client }),
				'octoja.teams.replayDelivery',
			)
		},
		/**
		 * Send a test message to the channel identified by `id`.
		 */
		async test(id: string): Promise<PostTeamsChannelsByIdTestResponse> {
			return ensureData(
				await postTeamsChannelsByIdTest({ path: { id }, client }),
				'octoja.teams.test',
			)
		},
	}
}

export type TeamsResource = ReturnType<typeof createTeamsResource>
