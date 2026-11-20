import type { Client } from '../../generated/client/types.gen'
import {
	getInventoryDevices,
	getInventoryServerFeatures,
	getInventoryServices,
	getInventoryServicesInstallations,
	getInventorySoftware,
	getInventorySoftwareInstallations,
	getInventoryTags,
	getInventoryTagsDevices,
} from '../../generated/sdk.gen'
import type {
	GetInventoryDevicesData,
	GetInventoryDevicesResponse,
	GetInventoryServerFeaturesData,
	GetInventoryServerFeaturesResponse,
	GetInventoryServicesData,
	GetInventoryServicesInstallationsData,
	GetInventoryServicesInstallationsResponse,
	GetInventoryServicesResponse,
	GetInventorySoftwareData,
	GetInventorySoftwareInstallationsData,
	GetInventorySoftwareInstallationsResponse,
	GetInventorySoftwareResponse,
	GetInventoryTagsData,
	GetInventoryTagsDevicesData,
	GetInventoryTagsDevicesResponse,
	GetInventoryTagsResponse,
} from '../../generated/types.gen'
import { ensureData } from '../../shared/errors'

export type InventoryDevicesQuery = GetInventoryDevicesData['query']
export type ServerFeaturesQuery = GetInventoryServerFeaturesData['query']
export type InventoryServicesQuery = GetInventoryServicesData['query']
export type ServiceInstallationsQuery = GetInventoryServicesInstallationsData['query']
export type InventorySoftwareQuery = GetInventorySoftwareData['query']
export type SoftwareInstallationsQuery = GetInventorySoftwareInstallationsData['query']
export type TagDevicesQuery = GetInventoryTagsDevicesData['query']
export type InventoryTagsQuery = GetInventoryTagsData['query']

/**
 * Inventory: aggregated device, service, software, feature and tag inventories.
 */
export function createInventoryResource(client: Client) {
	return {
		/**
		 * List inventoried devices, optionally filtered by customer and device kind.
		 */
		async devices(query?: InventoryDevicesQuery): Promise<GetInventoryDevicesResponse> {
			return ensureData(
				await getInventoryDevices({ query, client }),
				'octoja.inventory.devices',
			)
		},
		/**
		 * List the server features found in the inventory.
		 */
		async serverFeatures(
			query?: ServerFeaturesQuery,
		): Promise<GetInventoryServerFeaturesResponse> {
			return ensureData(
				await getInventoryServerFeatures({ query, client }),
				'octoja.inventory.serverFeatures',
			)
		},
		/**
		 * List the services found in the inventory.
		 */
		async services(query?: InventoryServicesQuery): Promise<GetInventoryServicesResponse> {
			return ensureData(
				await getInventoryServices({ query, client }),
				'octoja.inventory.services',
			)
		},
		/**
		 * List service installations across inventoried devices.
		 */
		async serviceInstallations(
			query?: ServiceInstallationsQuery,
		): Promise<GetInventoryServicesInstallationsResponse> {
			return ensureData(
				await getInventoryServicesInstallations({ query, client }),
				'octoja.inventory.serviceInstallations',
			)
		},
		/**
		 * List the software found in the inventory.
		 */
		async software(query?: InventorySoftwareQuery): Promise<GetInventorySoftwareResponse> {
			return ensureData(
				await getInventorySoftware({ query, client }),
				'octoja.inventory.software',
			)
		},
		/**
		 * List software installations across inventoried devices.
		 */
		async softwareInstallations(
			query?: SoftwareInstallationsQuery,
		): Promise<GetInventorySoftwareInstallationsResponse> {
			return ensureData(
				await getInventorySoftwareInstallations({ query, client }),
				'octoja.inventory.softwareInstallations',
			)
		},
		/**
		 * List devices carrying a given tag in the inventory.
		 */
		async tagDevices(query?: TagDevicesQuery): Promise<GetInventoryTagsDevicesResponse> {
			return ensureData(
				await getInventoryTagsDevices({ query, client }),
				'octoja.inventory.tagDevices',
			)
		},
		/**
		 * List the tags found in the inventory.
		 */
		async tags(query?: InventoryTagsQuery): Promise<GetInventoryTagsResponse> {
			return ensureData(await getInventoryTags({ query, client }), 'octoja.inventory.tags')
		},
	}
}

export type InventoryResource = ReturnType<typeof createInventoryResource>
