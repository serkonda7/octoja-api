import type { Client } from '../../generated/client/types.gen'
import { postAssetLogs, postAssetLogsFilter } from '../../generated/sdk.gen'
import type {
	PostAssetLogsData,
	PostAssetLogsFilterData,
	PostAssetLogsFilterResponse,
} from '../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../shared/errors'

export type AssetLogsFilterBody = PostAssetLogsFilterData['body']
export type SaveAssetLogBody = PostAssetLogsData['body']

/**
 * Asset logs: filtered lookup and ingestion of log entries for assets.
 */
export function createAssetLogsResource(client: Client) {
	return {
		/**
		 * Filter asset logs with the given criteria.
		 */
		async filter(body: AssetLogsFilterBody): Promise<PostAssetLogsFilterResponse> {
			return ensureData(
				await postAssetLogsFilter({ body, client }),
				'octoja.assetLogs.filter',
			)
		},
		/**
		 * Store a new log entry for an asset.
		 */
		async create(body: SaveAssetLogBody): Promise<void> {
			ensureSuccess(await postAssetLogs({ body, client }), 'octoja.assetLogs.create')
		},
	}
}

export type AssetLogsResource = ReturnType<typeof createAssetLogsResource>
