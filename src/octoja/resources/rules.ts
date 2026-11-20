import type { Client } from '../../generated/client/types.gen'
import { postRulesPreviewClauseMatches, postRulesPreviewDevices } from '../../generated/sdk.gen'
import type {
	PostRulesPreviewClauseMatchesData,
	PostRulesPreviewClauseMatchesResponse,
	PostRulesPreviewDevicesData,
	PostRulesPreviewDevicesResponse,
} from '../../generated/types.gen'
import { ensureData } from '../../shared/errors'

export type PreviewClauseMatchesBody = PostRulesPreviewClauseMatchesData['body']
export type PreviewMatchingDevicesBody = PostRulesPreviewDevicesData['body']

/**
 * Rules: previews for clause matches and matching devices.
 */
export function createRulesResource(client: Client) {
	return {
		/**
		 * Preview which assets match a rule's clauses.
		 */
		async previewClauseMatches(
			body: PreviewClauseMatchesBody,
		): Promise<PostRulesPreviewClauseMatchesResponse> {
			return ensureData(
				await postRulesPreviewClauseMatches({ body, client }),
				'octoja.rules.previewClauseMatches',
			)
		},
		/**
		 * Preview devices matching the given criteria.
		 */
		async previewDevices(
			body: PreviewMatchingDevicesBody,
		): Promise<PostRulesPreviewDevicesResponse> {
			return ensureData(
				await postRulesPreviewDevices({ body, client }),
				'octoja.rules.previewDevices',
			)
		},
	}
}

export type RulesResource = ReturnType<typeof createRulesResource>
