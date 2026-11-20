import type { Client } from '../../generated/client/types.gen'
import {
	deleteCustomersByCustomeridDiscoveredDevices,
	deleteCustomersByCustomeridDiscoveredDevicesByDeviceid,
	getCustomersByCustomeridDiscoveredDevices,
	getCustomersByCustomeridDiscoveredDevicesScanners,
	getCustomersByCustomeridDiscoveredDevicesScanStatus,
	postCustomersByCustomeridDiscoveredDevicesByDeviceidRestore,
	postCustomersByCustomeridDiscoveredDevicesDismiss,
	postCustomersByCustomeridDiscoveredDevicesMonitor,
	postCustomersByCustomeridDiscoveredDevicesScan,
} from '../../generated/sdk.gen'
import type {
	DeleteCustomersByCustomeridDiscoveredDevicesData,
	GetCustomersByCustomeridDiscoveredDevicesData,
	GetCustomersByCustomeridDiscoveredDevicesResponse,
	GetCustomersByCustomeridDiscoveredDevicesScannersData,
	GetCustomersByCustomeridDiscoveredDevicesScannersResponse,
	GetCustomersByCustomeridDiscoveredDevicesScanStatusResponse,
	PostCustomersByCustomeridDiscoveredDevicesDismissData,
	PostCustomersByCustomeridDiscoveredDevicesMonitorData,
	PostCustomersByCustomeridDiscoveredDevicesScanData,
} from '../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../shared/errors'

export type ListDiscoveredDevicesQuery = GetCustomersByCustomeridDiscoveredDevicesData['query']
export type ClearDiscoveredDevicesQuery = DeleteCustomersByCustomeridDiscoveredDevicesData['query']
export type DismissDiscoveredDevicesBody =
	PostCustomersByCustomeridDiscoveredDevicesDismissData['body']
export type ScannersQuery = GetCustomersByCustomeridDiscoveredDevicesScannersData['query']
export type MonitorDiscoveredDevicesBody =
	PostCustomersByCustomeridDiscoveredDevicesMonitorData['body']
export type ScanDiscoveredDevicesQuery = PostCustomersByCustomeridDiscoveredDevicesScanData['query']

/**
 * Network discovery: list, scan, monitor, dismiss and restore discovered devices
 * for a customer, plus scanner and scan-status lookups.
 */
export function createNetworkDiscoveryResource(client: Client) {
	return {
		/**
		 * List the devices discovered for a customer.
		 */
		async list(
			customerId: string,
			query?: ListDiscoveredDevicesQuery,
		): Promise<GetCustomersByCustomeridDiscoveredDevicesResponse> {
			return ensureData(
				await getCustomersByCustomeridDiscoveredDevices({
					path: { customerId },
					query,
					client,
				}),
				'octoja.networkDiscovery.list',
			)
		},
		/**
		 * Delete all discovered devices for a customer.
		 */
		async removeAll(customerId: string, query?: ClearDiscoveredDevicesQuery): Promise<void> {
			ensureSuccess(
				await deleteCustomersByCustomeridDiscoveredDevices({
					path: { customerId },
					query,
					client,
				}),
				'octoja.networkDiscovery.removeAll',
			)
		},
		/**
		 * Delete the discovered device identified by `deviceId` for a customer.
		 */
		async remove(customerId: string, deviceId: string): Promise<void> {
			ensureSuccess(
				await deleteCustomersByCustomeridDiscoveredDevicesByDeviceid({
					path: { customerId, deviceId },
					client,
				}),
				'octoja.networkDiscovery.remove',
			)
		},
		/**
		 * Dismiss the discovered devices specified in the request.
		 */
		async dismiss(customerId: string, body: DismissDiscoveredDevicesBody): Promise<void> {
			ensureSuccess(
				await postCustomersByCustomeridDiscoveredDevicesDismiss({
					path: { customerId },
					body,
					client,
				}),
				'octoja.networkDiscovery.dismiss',
			)
		},
		/**
		 * Scan-status of the discovery scanners for a customer.
		 */
		async scanStatus(
			customerId: string,
		): Promise<GetCustomersByCustomeridDiscoveredDevicesScanStatusResponse> {
			return ensureData(
				await getCustomersByCustomeridDiscoveredDevicesScanStatus({
					path: { customerId },
					client,
				}),
				'octoja.networkDiscovery.scanStatus',
			)
		},
		/**
		 * List the configured discovery scanners for a customer.
		 */
		async scanners(
			customerId: string,
			query?: ScannersQuery,
		): Promise<GetCustomersByCustomeridDiscoveredDevicesScannersResponse> {
			return ensureData(
				await getCustomersByCustomeridDiscoveredDevicesScanners({
					path: { customerId },
					query,
					client,
				}),
				'octoja.networkDiscovery.scanners',
			)
		},
		/**
		 * Start monitoring the discovered devices specified in the request.
		 */
		async monitor(customerId: string, body: MonitorDiscoveredDevicesBody): Promise<void> {
			ensureSuccess(
				await postCustomersByCustomeridDiscoveredDevicesMonitor({
					path: { customerId },
					body,
					client,
				}),
				'octoja.networkDiscovery.monitor',
			)
		},
		/**
		 * Restore a previously dismissed discovered device.
		 */
		async restore(customerId: string, deviceId: string): Promise<void> {
			ensureSuccess(
				await postCustomersByCustomeridDiscoveredDevicesByDeviceidRestore({
					path: { customerId, deviceId },
					client,
				}),
				'octoja.networkDiscovery.restore',
			)
		},
		/**
		 * Trigger a network discovery scan for a customer.
		 */
		async scan(customerId: string, query?: ScanDiscoveredDevicesQuery): Promise<void> {
			ensureSuccess(
				await postCustomersByCustomeridDiscoveredDevicesScan({
					path: { customerId },
					query,
					client,
				}),
				'octoja.networkDiscovery.scan',
			)
		},
	}
}

export type NetworkDiscoveryResource = ReturnType<typeof createNetworkDiscoveryResource>
