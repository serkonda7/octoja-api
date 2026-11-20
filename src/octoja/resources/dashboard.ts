import type { Client } from '../../generated/client/types.gen'
import {
	getDashboardTvView,
	getDashboardTvViewAlertSoundBySoundtype,
	postDashboardCustomers,
	postDashboardSearch,
} from '../../generated/sdk.gen'
import type {
	GetDashboardTvViewAlertSoundBySoundtypeResponse,
	GetDashboardTvViewData,
	GetDashboardTvViewResponse,
	PostDashboardCustomersData,
	PostDashboardCustomersResponse,
	PostDashboardSearchData,
	PostDashboardSearchResponse,
} from '../../generated/types.gen'
import { ensureData } from '../../shared/errors'

export type DashboardCustomersBody = PostDashboardCustomersData['body']
export type DashboardSearchBody = PostDashboardSearchData['body']
export type TvViewQuery = GetDashboardTvViewData['query']

/**
 * Dashboard: customer overviews, search results and TV view data.
 */
export function createDashboardResource(client: Client) {
	return {
		/**
		 * Build the customer dashboard for the given request.
		 */
		async customers(body: DashboardCustomersBody): Promise<PostDashboardCustomersResponse> {
			return ensureData(
				await postDashboardCustomers({ body, client }),
				'octoja.dashboard.customers',
			)
		},
		/**
		 * Run a dashboard search with the given criteria.
		 */
		async search(body: DashboardSearchBody): Promise<PostDashboardSearchResponse> {
			return ensureData(
				await postDashboardSearch({ body, client }),
				'octoja.dashboard.search',
			)
		},
		tvView: {
			/**
			 * Build the TV view, optionally filtered by the supplied criteria.
			 */
			async get(query?: TvViewQuery): Promise<GetDashboardTvViewResponse> {
				return ensureData(
					await getDashboardTvView({ query, client }),
					'octoja.dashboard.tvView.get',
				)
			},
			/**
			 * Serve the alert sound for the given `soundType`.
			 */
			async alertSound(
				soundType: string,
			): Promise<GetDashboardTvViewAlertSoundBySoundtypeResponse> {
				return ensureData(
					await getDashboardTvViewAlertSoundBySoundtype({ path: { soundType }, client }),
					'octoja.dashboard.tvView.alertSound',
				)
			},
		},
	}
}

export type DashboardResource = ReturnType<typeof createDashboardResource>
