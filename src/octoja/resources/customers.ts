import type { Client } from '../../generated/client/types.gen'
import {
	deleteCustomersById,
	getCustomers,
	getCustomersById,
	getCustomersByIdDashboard,
	getCustomersOptions,
	getCustomersOverview,
	postCustomers,
	postCustomersById,
	postCustomersImport,
} from '../../generated/sdk.gen'
import type {
	GetCustomersByIdDashboardResponse,
	GetCustomersByIdResponse,
	GetCustomersData,
	GetCustomersOptionsResponse,
	GetCustomersOverviewResponse,
	GetCustomersResponse,
	PostCustomersByIdData,
	PostCustomersByIdResponse,
	PostCustomersData,
	PostCustomersImportData,
	PostCustomersImportResponse,
	PostCustomersResponse,
} from '../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../shared/errors'

export type CustomersListQuery = GetCustomersData['query']
export type CreateCustomerBody = PostCustomersData['body']
export type UpdateCustomerBody = PostCustomersByIdData['body']
export type ImportCustomersBody = PostCustomersImportData['body']

/**
 * Customers (tenants managed by the MSP): CRUD, overview/options lookups,
 * per-customer dashboard and bulk import.
 */
export function createCustomersResource(client: Client) {
	return {
		/**
		 * List customers, optionally filtered by a `search` term.
		 */
		async list(query?: CustomersListQuery): Promise<GetCustomersResponse> {
			return ensureData(await getCustomers({ query, client }), 'octoja.customers.list')
		},
		/**
		 * Read the customer identified by `id`.
		 */
		async get(id: string): Promise<GetCustomersByIdResponse> {
			return ensureData(
				await getCustomersById({ path: { id }, client }),
				'octoja.customers.get',
			)
		},
		/**
		 * Create a new customer.
		 */
		async create(body: CreateCustomerBody): Promise<PostCustomersResponse> {
			return ensureData(await postCustomers({ body, client }), 'octoja.customers.create')
		},
		/**
		 * Update the customer identified by `id`.
		 */
		async update(id: string, body: UpdateCustomerBody): Promise<PostCustomersByIdResponse> {
			return ensureData(
				await postCustomersById({ path: { id }, body, client }),
				'octoja.customers.update',
			)
		},
		/**
		 * Delete the customer identified by `id`.
		 */
		async remove(id: string): Promise<void> {
			ensureSuccess(
				await deleteCustomersById({ path: { id }, client }),
				'octoja.customers.remove',
			)
		},
		/**
		 * Dashboard figures (assets, alerts, patch state, ...) for one customer.
		 */
		async dashboard(id: string): Promise<GetCustomersByIdDashboardResponse> {
			return ensureData(
				await getCustomersByIdDashboard({ path: { id }, client }),
				'octoja.customers.dashboard',
			)
		},
		/**
		 * Lightweight id/name list of all customers, e.g. for select boxes.
		 */
		async options(): Promise<GetCustomersOptionsResponse> {
			return ensureData(await getCustomersOptions({ client }), 'octoja.customers.options')
		},
		/**
		 * Aggregated overview of all customers.
		 */
		async overview(): Promise<GetCustomersOverviewResponse> {
			return ensureData(await getCustomersOverview({ client }), 'octoja.customers.overview')
		},
		/**
		 * Bulk-import customers.
		 */
		async import(body: ImportCustomersBody): Promise<PostCustomersImportResponse> {
			return ensureData(
				await postCustomersImport({ body, client }),
				'octoja.customers.import',
			)
		},
	}
}

export type CustomersResource = ReturnType<typeof createCustomersResource>
