import type { Client } from '../../generated/client/types.gen'
import {
	deleteCustomFieldsById,
	getCustomFields,
	postCustomFields,
	postCustomFieldsById,
} from '../../generated/sdk.gen'
import type {
	GetCustomFieldsData,
	GetCustomFieldsResponse,
	PostCustomFieldsByIdData,
	PostCustomFieldsByIdResponse,
	PostCustomFieldsData,
	PostCustomFieldsResponse,
} from '../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../shared/errors'

export type CreateCustomFieldBody = PostCustomFieldsData['body']
export type CustomFieldsListQuery = GetCustomFieldsData['query']
export type UpdateCustomFieldBody = PostCustomFieldsByIdData['body']

/**
 * Custom fields: CRUD for custom field definitions on entities.
 */
export function createCustomFieldsResource(client: Client) {
	return {
		/**
		 * Create a new custom field definition.
		 */
		async create(body: CreateCustomFieldBody): Promise<PostCustomFieldsResponse> {
			return ensureData(
				await postCustomFields({ body, client }),
				'octoja.customFields.create',
			)
		},
		/**
		 * List custom field definitions, optionally filtered by `entityType`.
		 */
		async list(query?: CustomFieldsListQuery): Promise<GetCustomFieldsResponse> {
			return ensureData(await getCustomFields({ query, client }), 'octoja.customFields.list')
		},
		/**
		 * Delete the custom field definition identified by `id`.
		 */
		async remove(id: string): Promise<void> {
			ensureSuccess(
				await deleteCustomFieldsById({ path: { id }, client }),
				'octoja.customFields.remove',
			)
		},
		/**
		 * Update the custom field definition identified by `id`.
		 */
		async update(
			id: string,
			body: UpdateCustomFieldBody,
		): Promise<PostCustomFieldsByIdResponse> {
			return ensureData(
				await postCustomFieldsById({ path: { id }, body, client }),
				'octoja.customFields.update',
			)
		},
	}
}

export type CustomFieldsResource = ReturnType<typeof createCustomFieldsResource>
