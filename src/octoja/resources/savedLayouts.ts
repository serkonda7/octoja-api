import type { Client } from '../../generated/client/types.gen'
import {
	deleteUsersMeTableLayoutsById,
	getUsersMeTableLayouts,
	postUsersMeTableLayouts,
	postUsersMeTableLayoutsById,
} from '../../generated/sdk.gen'
import type {
	GetUsersMeTableLayoutsData,
	GetUsersMeTableLayoutsResponse,
	PostUsersMeTableLayoutsByIdData,
	PostUsersMeTableLayoutsByIdResponse,
	PostUsersMeTableLayoutsData,
	PostUsersMeTableLayoutsResponse,
} from '../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../shared/errors'

export type SavedLayoutsListQuery = GetUsersMeTableLayoutsData['query']
export type CreateSavedLayoutBody = PostUsersMeTableLayoutsData['body']
export type UpdateSavedLayoutBody = PostUsersMeTableLayoutsByIdData['body']

/**
 * Saved table layouts of the current user: list, create, update and delete.
 */
export function createSavedLayoutsResource(client: Client) {
	return {
		/**
		 * List the current user's saved table layouts, optionally filtered by `tableKey`.
		 */
		async list(query?: SavedLayoutsListQuery): Promise<GetUsersMeTableLayoutsResponse> {
			return ensureData(
				await getUsersMeTableLayouts({ query, client }),
				'octoja.savedLayouts.list',
			)
		},
		/**
		 * Save a new table layout for the current user.
		 */
		async create(body: CreateSavedLayoutBody): Promise<PostUsersMeTableLayoutsResponse> {
			return ensureData(
				await postUsersMeTableLayouts({ body, client }),
				'octoja.savedLayouts.create',
			)
		},
		/**
		 * Update the saved table layout identified by `id`.
		 */
		async update(
			id: string,
			body: UpdateSavedLayoutBody,
		): Promise<PostUsersMeTableLayoutsByIdResponse> {
			return ensureData(
				await postUsersMeTableLayoutsById({ path: { id }, body, client }),
				'octoja.savedLayouts.update',
			)
		},
		/**
		 * Delete the saved table layout identified by `id`.
		 */
		async remove(id: string): Promise<void> {
			ensureSuccess(
				await deleteUsersMeTableLayoutsById({ path: { id }, client }),
				'octoja.savedLayouts.remove',
			)
		},
	}
}

export type SavedLayoutsResource = ReturnType<typeof createSavedLayoutsResource>
