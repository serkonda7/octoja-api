import type { Client } from '../../generated/client/types.gen'
import {
	deleteTagRulesById,
	getTagRules,
	getTagRulesById,
	postTagRules,
	postTagRulesById,
} from '../../generated/sdk.gen'
import type {
	GetTagRulesByIdResponse,
	GetTagRulesData,
	GetTagRulesResponse,
	PostTagRulesByIdData,
	PostTagRulesByIdResponse,
	PostTagRulesData,
	PostTagRulesResponse,
} from '../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../shared/errors'

export type CreateTagRuleBody = PostTagRulesData['body']
export type TagRulesListQuery = GetTagRulesData['query']
export type UpdateTagRuleBody = PostTagRulesByIdData['body']

/**
 * Tag rules: CRUD for rules that assign tags automatically.
 */
export function createTagRulesResource(client: Client) {
	return {
		/**
		 * Create a new tag rule.
		 */
		async create(body: CreateTagRuleBody): Promise<PostTagRulesResponse> {
			return ensureData(await postTagRules({ body, client }), 'octoja.tagRules.create')
		},
		/**
		 * List tag rules, optionally filtered by a `search` term.
		 */
		async list(query?: TagRulesListQuery): Promise<GetTagRulesResponse> {
			return ensureData(await getTagRules({ query, client }), 'octoja.tagRules.list')
		},
		/**
		 * Delete the tag rule identified by `id`.
		 */
		async remove(id: string): Promise<void> {
			ensureSuccess(
				await deleteTagRulesById({ path: { id }, client }),
				'octoja.tagRules.remove',
			)
		},
		/**
		 * Read the tag rule identified by `id`.
		 */
		async get(id: string): Promise<GetTagRulesByIdResponse> {
			return ensureData(
				await getTagRulesById({ path: { id }, client }),
				'octoja.tagRules.get',
			)
		},
		/**
		 * Update the tag rule identified by `id`.
		 */
		async update(id: string, body: UpdateTagRuleBody): Promise<PostTagRulesByIdResponse> {
			return ensureData(
				await postTagRulesById({ path: { id }, body, client }),
				'octoja.tagRules.update',
			)
		},
	}
}

export type TagRulesResource = ReturnType<typeof createTagRulesResource>
