import type { Client } from '../../generated/client/types.gen'
import { getTags, getTagsRenamePreview, postTagsRename } from '../../generated/sdk.gen'
import type {
	GetTagsData,
	GetTagsRenamePreviewData,
	GetTagsRenamePreviewResponse,
	GetTagsResponse,
	PostTagsRenameData,
	PostTagsRenameResponse,
} from '../../generated/types.gen'
import { ensureData } from '../../shared/errors'

export type TagsRenamePreviewQuery = GetTagsRenamePreviewData['query']
export type TagsListQuery = GetTagsData['query']
export type RenameTagBody = PostTagsRenameData['body']

/**
 * Tags: listing tags by category and previewing/performing tag renames.
 */
export function createTagsResource(client: Client) {
	return {
		/**
		 * Preview the impact of renaming a tag.
		 */
		async renamePreview(query?: TagsRenamePreviewQuery): Promise<GetTagsRenamePreviewResponse> {
			return ensureData(
				await getTagsRenamePreview({ query, client }),
				'octoja.tags.renamePreview',
			)
		},
		/**
		 * List tags, optionally filtered by `category`.
		 */
		async list(query?: TagsListQuery): Promise<GetTagsResponse> {
			return ensureData(await getTags({ query, client }), 'octoja.tags.list')
		},
		/**
		 * Rename a tag.
		 */
		async rename(body: RenameTagBody): Promise<PostTagsRenameResponse> {
			return ensureData(await postTagsRename({ body, client }), 'octoja.tags.rename')
		},
	}
}

export type TagsResource = ReturnType<typeof createTagsResource>
