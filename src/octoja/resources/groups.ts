import type { Client } from '../../generated/client/types.gen'
import {
	deleteGroupsById,
	getGroups,
	getGroupsById,
	postGroups,
	postGroupsById,
} from '../../generated/sdk.gen'
import type {
	GetGroupsByIdResponse,
	GetGroupsData,
	GetGroupsResponse,
	PostGroupsByIdData,
	PostGroupsByIdResponse,
	PostGroupsData,
	PostGroupsResponse,
} from '../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../shared/errors'

export type CreateGroupBody = PostGroupsData['body']
export type GroupsListQuery = GetGroupsData['query']
export type UpdateGroupBody = PostGroupsByIdData['body']

/**
 * Groups: CRUD for asset/user groups.
 */
export function createGroupsResource(client: Client) {
	return {
		/**
		 * Create a new group.
		 */
		async create(body: CreateGroupBody): Promise<PostGroupsResponse> {
			return ensureData(await postGroups({ body, client }), 'octoja.groups.create')
		},
		/**
		 * List groups, optionally filtered by a `search` term.
		 */
		async list(query?: GroupsListQuery): Promise<GetGroupsResponse> {
			return ensureData(await getGroups({ query, client }), 'octoja.groups.list')
		},
		/**
		 * Delete the group identified by `id`.
		 */
		async remove(id: string): Promise<void> {
			ensureSuccess(await deleteGroupsById({ path: { id }, client }), 'octoja.groups.remove')
		},
		/**
		 * Read the group identified by `id`.
		 */
		async get(id: string): Promise<GetGroupsByIdResponse> {
			return ensureData(await getGroupsById({ path: { id }, client }), 'octoja.groups.get')
		},
		/**
		 * Update the group identified by `id`.
		 */
		async update(id: string, body: UpdateGroupBody): Promise<PostGroupsByIdResponse> {
			return ensureData(
				await postGroupsById({ path: { id }, body, client }),
				'octoja.groups.update',
			)
		},
	}
}

export type GroupsResource = ReturnType<typeof createGroupsResource>
