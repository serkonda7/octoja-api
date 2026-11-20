import type { Client } from '../../../generated/client/types.gen'
import {
	deleteIntegrationsFreshservice,
	getIntegrationsFreshservice,
	getIntegrationsFreshserviceDeliveries,
	getIntegrationsFreshserviceDepartments,
	postIntegrationsFreshservice,
	postIntegrationsFreshserviceCheckConnection,
	postIntegrationsFreshserviceImportCustomers,
	postIntegrationsFreshserviceSyncDevices,
	putIntegrationsFreshserviceMatches,
	putIntegrationsFreshserviceSettings,
} from '../../../generated/sdk.gen'
import type {
	GetIntegrationsFreshserviceDeliveriesData,
	GetIntegrationsFreshserviceDeliveriesResponse,
	GetIntegrationsFreshserviceDepartmentsData,
	GetIntegrationsFreshserviceDepartmentsResponse,
	GetIntegrationsFreshserviceResponse,
	PostIntegrationsFreshserviceCheckConnectionData,
	PostIntegrationsFreshserviceCheckConnectionResponse,
	PostIntegrationsFreshserviceData,
	PostIntegrationsFreshserviceImportCustomersData,
	PostIntegrationsFreshserviceImportCustomersResponse,
	PutIntegrationsFreshserviceMatchesData,
	PutIntegrationsFreshserviceSettingsData,
} from '../../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../../shared/errors'

export type FreshserviceCheckConnectionBody =
	PostIntegrationsFreshserviceCheckConnectionData['body']
export type FreshserviceConnectBody = PostIntegrationsFreshserviceData['body']
export type FreshserviceDepartmentsQuery = GetIntegrationsFreshserviceDepartmentsData['query']
export type FreshserviceImportCustomersBody =
	PostIntegrationsFreshserviceImportCustomersData['body']
export type FreshserviceDeliveriesQuery = GetIntegrationsFreshserviceDeliveriesData['query']
export type FreshserviceUpdateMatchesBody = PutIntegrationsFreshserviceMatchesData['body']
export type FreshserviceUpdateSettingsBody = PutIntegrationsFreshserviceSettingsData['body']

/**
 * Freshservice integration: connection, settings, departments, customer import, device
 * sync and delivery history.
 */
export function createFreshserviceIntegrationResource(client: Client) {
	return {
		/**
		 * Check the Freshservice connection using the supplied credentials.
		 */
		async testConnection(
			body: FreshserviceCheckConnectionBody,
		): Promise<PostIntegrationsFreshserviceCheckConnectionResponse> {
			return ensureData(
				await postIntegrationsFreshserviceCheckConnection({ body, client }),
				'octoja.integrations.freshservice.testConnection',
			)
		},
		/**
		 * Connect the Freshservice integration with the supplied credentials.
		 */
		async connect(body: FreshserviceConnectBody): Promise<void> {
			ensureSuccess(
				await postIntegrationsFreshservice({ body, client }),
				'octoja.integrations.freshservice.connect',
			)
		},
		/**
		 * Remove the Freshservice integration.
		 */
		async remove(): Promise<void> {
			ensureSuccess(
				await deleteIntegrationsFreshservice({ client }),
				'octoja.integrations.freshservice.remove',
			)
		},
		/**
		 * Read the current Freshservice integration settings.
		 */
		async settings(): Promise<GetIntegrationsFreshserviceResponse> {
			return ensureData(
				await getIntegrationsFreshservice({ client }),
				'octoja.integrations.freshservice.settings',
			)
		},
		/**
		 * List Freshservice departments, optionally filtered by `search`.
		 */
		async departments(
			query?: FreshserviceDepartmentsQuery,
		): Promise<GetIntegrationsFreshserviceDepartmentsResponse> {
			return ensureData(
				await getIntegrationsFreshserviceDepartments({ query, client }),
				'octoja.integrations.freshservice.departments',
			)
		},
		/**
		 * Import customers from the connected Freshservice account.
		 */
		async importCustomers(
			body: FreshserviceImportCustomersBody,
		): Promise<PostIntegrationsFreshserviceImportCustomersResponse> {
			return ensureData(
				await postIntegrationsFreshserviceImportCustomers({ body, client }),
				'octoja.integrations.freshservice.importCustomers',
			)
		},
		/**
		 * List outbound delivery history for the Freshservice integration.
		 */
		async deliveries(
			query?: FreshserviceDeliveriesQuery,
		): Promise<GetIntegrationsFreshserviceDeliveriesResponse> {
			return ensureData(
				await getIntegrationsFreshserviceDeliveries({ query, client }),
				'octoja.integrations.freshservice.deliveries',
			)
		},
		/**
		 * Synchronize devices with Freshservice.
		 */
		async syncDevices(): Promise<void> {
			ensureSuccess(
				await postIntegrationsFreshserviceSyncDevices({ client }),
				'octoja.integrations.freshservice.syncDevices',
			)
		},
		/**
		 * Update the customer matches for the Freshservice integration.
		 */
		async updateMatches(body: FreshserviceUpdateMatchesBody): Promise<void> {
			ensureSuccess(
				await putIntegrationsFreshserviceMatches({ body, client }),
				'octoja.integrations.freshservice.updateMatches',
			)
		},
		/**
		 * Update the Freshservice integration settings.
		 */
		async updateSettings(body: FreshserviceUpdateSettingsBody): Promise<void> {
			ensureSuccess(
				await putIntegrationsFreshserviceSettings({ body, client }),
				'octoja.integrations.freshservice.updateSettings',
			)
		},
	}
}

export type FreshserviceIntegrationResource = ReturnType<
	typeof createFreshserviceIntegrationResource
>
