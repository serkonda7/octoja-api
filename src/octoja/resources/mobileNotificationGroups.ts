import type { Client } from '../../generated/client/types.gen'
import {
	deleteMobileNotificationGroupsById,
	getMobileNotificationGroups,
	getMobileNotificationGroupsByIdDeliveries,
	postMobileNotificationGroups,
	postMobileNotificationGroupsById,
} from '../../generated/sdk.gen'
import type {
	GetMobileNotificationGroupsByIdDeliveriesData,
	GetMobileNotificationGroupsByIdDeliveriesResponse,
	GetMobileNotificationGroupsResponse,
	PostMobileNotificationGroupsByIdData,
	PostMobileNotificationGroupsByIdResponse,
	PostMobileNotificationGroupsData,
	PostMobileNotificationGroupsResponse,
} from '../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../shared/errors'

export type CreateMobileNotificationGroupBody = PostMobileNotificationGroupsData['body']
export type UpdateMobileNotificationGroupBody = PostMobileNotificationGroupsByIdData['body']
export type MobileGroupDeliveriesQuery = GetMobileNotificationGroupsByIdDeliveriesData['query']

/**
 * Mobile notification groups: CRUD and delivery history.
 */
export function createMobileNotificationGroupsResource(client: Client) {
	return {
		/**
		 * List all mobile notification groups.
		 */
		async list(): Promise<GetMobileNotificationGroupsResponse> {
			return ensureData(
				await getMobileNotificationGroups({ client }),
				'octoja.mobileNotificationGroups.list',
			)
		},
		/**
		 * Create a new mobile notification group.
		 */
		async create(
			body: CreateMobileNotificationGroupBody,
		): Promise<PostMobileNotificationGroupsResponse> {
			return ensureData(
				await postMobileNotificationGroups({ body, client }),
				'octoja.mobileNotificationGroups.create',
			)
		},
		/**
		 * Delete the mobile notification group identified by `id`.
		 */
		async remove(id: string): Promise<void> {
			ensureSuccess(
				await deleteMobileNotificationGroupsById({ path: { id }, client }),
				'octoja.mobileNotificationGroups.remove',
			)
		},
		/**
		 * Update the mobile notification group identified by `id`.
		 */
		async update(
			id: string,
			body: UpdateMobileNotificationGroupBody,
		): Promise<PostMobileNotificationGroupsByIdResponse> {
			return ensureData(
				await postMobileNotificationGroupsById({ path: { id }, body, client }),
				'octoja.mobileNotificationGroups.update',
			)
		},
		/**
		 * List the delivery history of the group identified by `id`.
		 */
		async deliveries(
			id: string,
			query?: MobileGroupDeliveriesQuery,
		): Promise<GetMobileNotificationGroupsByIdDeliveriesResponse> {
			return ensureData(
				await getMobileNotificationGroupsByIdDeliveries({ path: { id }, query, client }),
				'octoja.mobileNotificationGroups.deliveries',
			)
		},
	}
}

export type MobileNotificationGroupsResource = ReturnType<
	typeof createMobileNotificationGroupsResource
>
