import type { Client } from '../../generated/client/types.gen'
import { getAssetsByAssetidChecksByAssignmentidHistory } from '../../generated/sdk.gen'
import type {
	GetAssetsByAssetidChecksByAssignmentidHistoryData,
	GetAssetsByAssetidChecksByAssignmentidHistoryResponse,
} from '../../generated/types.gen'
import { ensureData } from '../../shared/errors'

export type CheckAssignmentHistoryQuery = GetAssetsByAssetidChecksByAssignmentidHistoryData['query']

/**
 * Check assignments: result history of a check assigned to an asset.
 */
export function createCheckAssignmentsResource(client: Client) {
	return {
		/**
		 * History of check assignment `assignmentId` on asset `assetId`.
		 */
		async history(
			assetId: string,
			assignmentId: string,
			query?: CheckAssignmentHistoryQuery,
		): Promise<GetAssetsByAssetidChecksByAssignmentidHistoryResponse> {
			return ensureData(
				await getAssetsByAssetidChecksByAssignmentidHistory({
					path: { assetId, assignmentId },
					query,
					client,
				}),
				'octoja.checkAssignments.history',
			)
		},
	}
}

export type CheckAssignmentsResource = ReturnType<typeof createCheckAssignmentsResource>
