import type { Client } from '../../generated/client/types.gen'
import {
	getAccessOverviewAssetsByAssetid,
	getAccessOverviewCustomersByCustomerid,
	getAccessOverviewUsersByUserid,
	getAccessOverviewUsersByUseridDevices,
} from '../../generated/sdk.gen'
import type {
	GetAccessOverviewAssetsByAssetidResponse,
	GetAccessOverviewCustomersByCustomeridResponse,
	GetAccessOverviewUsersByUseridDevicesData,
	GetAccessOverviewUsersByUseridDevicesResponse,
	GetAccessOverviewUsersByUseridResponse,
} from '../../generated/types.gen'
import { ensureData } from '../../shared/errors'

export type UserDevicesQuery = GetAccessOverviewUsersByUseridDevicesData['query']

/**
 * Access overview: aggregated access information for assets, customers and users.
 */
export function createAccessOverviewResource(client: Client) {
	return {
		/**
		 * Access overview for the asset identified by `assetId`.
		 */
		async asset(assetId: string): Promise<GetAccessOverviewAssetsByAssetidResponse> {
			return ensureData(
				await getAccessOverviewAssetsByAssetid({ path: { assetId }, client }),
				'octoja.accessOverview.asset',
			)
		},
		/**
		 * Access overview for the customer identified by `customerId`.
		 */
		async customer(
			customerId: string,
		): Promise<GetAccessOverviewCustomersByCustomeridResponse> {
			return ensureData(
				await getAccessOverviewCustomersByCustomerid({ path: { customerId }, client }),
				'octoja.accessOverview.customer',
			)
		},
		/**
		 * Access overview for the user identified by `userId`.
		 */
		async user(userId: string): Promise<GetAccessOverviewUsersByUseridResponse> {
			return ensureData(
				await getAccessOverviewUsersByUserid({ path: { userId }, client }),
				'octoja.accessOverview.user',
			)
		},
		/**
		 * Devices the user identified by `userId` has access to.
		 */
		async userDevices(
			userId: string,
			query?: UserDevicesQuery,
		): Promise<GetAccessOverviewUsersByUseridDevicesResponse> {
			return ensureData(
				await getAccessOverviewUsersByUseridDevices({ path: { userId }, query, client }),
				'octoja.accessOverview.userDevices',
			)
		},
	}
}

export type AccessOverviewResource = ReturnType<typeof createAccessOverviewResource>
