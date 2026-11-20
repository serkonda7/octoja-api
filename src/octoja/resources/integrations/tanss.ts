import type { Client } from '../../../generated/client/types.gen'
import {
	deleteIntegrationsTanss,
	getIntegrationsTanss,
	getIntegrationsTanssCompanies,
	getIntegrationsTanssDeliveries,
	getIntegrationsTanssDepartments,
	getIntegrationsTanssEmployees,
	getIntegrationsTanssTicketStates,
	getIntegrationsTanssTicketTypes,
	postIntegrationsTanss,
	postIntegrationsTanssCheckConnection,
	postIntegrationsTanssImportCustomers,
	postIntegrationsTanssSyncDevices,
	putIntegrationsTanssMatches,
	putIntegrationsTanssSettings,
} from '../../../generated/sdk.gen'
import type {
	GetIntegrationsTanssCompaniesData,
	GetIntegrationsTanssCompaniesResponse,
	GetIntegrationsTanssDeliveriesData,
	GetIntegrationsTanssDeliveriesResponse,
	GetIntegrationsTanssDepartmentsResponse,
	GetIntegrationsTanssEmployeesResponse,
	GetIntegrationsTanssResponse,
	GetIntegrationsTanssTicketStatesResponse,
	GetIntegrationsTanssTicketTypesResponse,
	PostIntegrationsTanssCheckConnectionData,
	PostIntegrationsTanssCheckConnectionResponse,
	PostIntegrationsTanssData,
	PostIntegrationsTanssImportCustomersData,
	PostIntegrationsTanssImportCustomersResponse,
	PutIntegrationsTanssMatchesData,
	PutIntegrationsTanssSettingsData,
} from '../../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../../shared/errors'

export type TanssCheckConnectionBody = PostIntegrationsTanssCheckConnectionData['body']
export type TanssConnectBody = PostIntegrationsTanssData['body']
export type TanssCompaniesQuery = GetIntegrationsTanssCompaniesData['query']
export type TanssImportCustomersBody = PostIntegrationsTanssImportCustomersData['body']
export type TanssDeliveriesQuery = GetIntegrationsTanssDeliveriesData['query']
export type TanssUpdateMatchesBody = PutIntegrationsTanssMatchesData['body']
export type TanssUpdateSettingsBody = PutIntegrationsTanssSettingsData['body']

/**
 * TANSS integration: connection setup, company/employee/ticket lookups, customer import, device
 * sync and settings.
 */
export function createTanssIntegrationResource(client: Client) {
	return {
		/**
		 * Check the connection to TANSS using the supplied credentials.
		 */
		async testConnection(
			body: TanssCheckConnectionBody,
		): Promise<PostIntegrationsTanssCheckConnectionResponse> {
			return ensureData(
				await postIntegrationsTanssCheckConnection({ body, client }),
				'octoja.integrations.tanss.testConnection',
			)
		},
		/**
		 * Connect the TANSS integration with the supplied credentials.
		 */
		async connect(body: TanssConnectBody): Promise<void> {
			ensureSuccess(
				await postIntegrationsTanss({ body, client }),
				'octoja.integrations.tanss.connect',
			)
		},
		/**
		 * Disconnect and remove the TANSS integration.
		 */
		async remove(): Promise<void> {
			ensureSuccess(
				await deleteIntegrationsTanss({ client }),
				'octoja.integrations.tanss.remove',
			)
		},
		/**
		 * Read the current TANSS integration settings.
		 */
		async settings(): Promise<GetIntegrationsTanssResponse> {
			return ensureData(
				await getIntegrationsTanss({ client }),
				'octoja.integrations.tanss.settings',
			)
		},
		/**
		 * List TANSS companies, optionally filtered by a `search` term.
		 */
		async companies(
			query?: TanssCompaniesQuery,
		): Promise<GetIntegrationsTanssCompaniesResponse> {
			return ensureData(
				await getIntegrationsTanssCompanies({ query, client }),
				'octoja.integrations.tanss.companies',
			)
		},
		/**
		 * List TANSS departments.
		 */
		async departments(): Promise<GetIntegrationsTanssDepartmentsResponse> {
			return ensureData(
				await getIntegrationsTanssDepartments({ client }),
				'octoja.integrations.tanss.departments',
			)
		},
		/**
		 * List TANSS employees.
		 */
		async employees(): Promise<GetIntegrationsTanssEmployeesResponse> {
			return ensureData(
				await getIntegrationsTanssEmployees({ client }),
				'octoja.integrations.tanss.employees',
			)
		},
		/**
		 * List TANSS ticket states.
		 */
		async ticketStates(): Promise<GetIntegrationsTanssTicketStatesResponse> {
			return ensureData(
				await getIntegrationsTanssTicketStates({ client }),
				'octoja.integrations.tanss.ticketStates',
			)
		},
		/**
		 * List TANSS ticket types.
		 */
		async ticketTypes(): Promise<GetIntegrationsTanssTicketTypesResponse> {
			return ensureData(
				await getIntegrationsTanssTicketTypes({ client }),
				'octoja.integrations.tanss.ticketTypes',
			)
		},
		/**
		 * Import customers from TANSS.
		 */
		async importCustomers(
			body: TanssImportCustomersBody,
		): Promise<PostIntegrationsTanssImportCustomersResponse> {
			return ensureData(
				await postIntegrationsTanssImportCustomers({ body, client }),
				'octoja.integrations.tanss.importCustomers',
			)
		},
		/**
		 * List TANSS outbound delivery history.
		 */
		async deliveries(
			query?: TanssDeliveriesQuery,
		): Promise<GetIntegrationsTanssDeliveriesResponse> {
			return ensureData(
				await getIntegrationsTanssDeliveries({ query, client }),
				'octoja.integrations.tanss.deliveries',
			)
		},
		/**
		 * Synchronize devices from TANSS.
		 */
		async sync(): Promise<void> {
			ensureSuccess(
				await postIntegrationsTanssSyncDevices({ client }),
				'octoja.integrations.tanss.sync',
			)
		},
		/**
		 * Update the customer matches for TANSS.
		 */
		async updateMatches(body: TanssUpdateMatchesBody): Promise<void> {
			ensureSuccess(
				await putIntegrationsTanssMatches({ body, client }),
				'octoja.integrations.tanss.updateMatches',
			)
		},
		/**
		 * Update the TANSS integration settings.
		 */
		async updateSettings(body: TanssUpdateSettingsBody): Promise<void> {
			ensureSuccess(
				await putIntegrationsTanssSettings({ body, client }),
				'octoja.integrations.tanss.updateSettings',
			)
		},
	}
}

export type TanssIntegrationResource = ReturnType<typeof createTanssIntegrationResource>
