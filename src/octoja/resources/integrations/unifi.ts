import type { Client } from '../../../generated/client/types.gen'
import {
	deleteAssetsByAssetidUnifiFirewallPoliciesByPolicyid,
	deleteAssetsByAssetidUnifiFirewallZonesByZoneid,
	deleteIntegrationsUnifi,
	deleteIntegrationsUnifiCustomersByCustomerid,
	getAssetsByAssetidUnifiClients,
	getAssetsByAssetidUnifiFirewall,
	getIntegrationsUnifi,
	getIntegrationsUnifiHosts,
	getIntegrationsUnifiVerify,
	postAssetsByAssetidUnifiFirewallPolicies,
	postAssetsByAssetidUnifiFirewallZones,
	postIntegrationsUnifi,
	postIntegrationsUnifiCheckConnection,
	postIntegrationsUnifiSyncDevices,
	putAssetsByAssetidUnifiFirewallPoliciesByPolicyid,
	putAssetsByAssetidUnifiFirewallPoliciesOrdering,
	putAssetsByAssetidUnifiFirewallZonesByZoneid,
	putIntegrationsUnifiMatches,
} from '../../../generated/sdk.gen'
import type {
	GetAssetsByAssetidUnifiClientsResponse,
	GetAssetsByAssetidUnifiFirewallResponse,
	GetIntegrationsUnifiHostsData,
	GetIntegrationsUnifiHostsResponse,
	GetIntegrationsUnifiResponse,
	GetIntegrationsUnifiVerifyResponse,
	PostAssetsByAssetidUnifiFirewallPoliciesData,
	PostAssetsByAssetidUnifiFirewallPoliciesResponse,
	PostAssetsByAssetidUnifiFirewallZonesData,
	PostIntegrationsUnifiCheckConnectionData,
	PostIntegrationsUnifiCheckConnectionResponse,
	PostIntegrationsUnifiData,
	PutAssetsByAssetidUnifiFirewallPoliciesByPolicyidData,
	PutAssetsByAssetidUnifiFirewallPoliciesByPolicyidResponse,
	PutAssetsByAssetidUnifiFirewallPoliciesOrderingData,
	PutIntegrationsUnifiMatchesData,
} from '../../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../../shared/errors'

export type UnifiCheckConnectionBody = PostIntegrationsUnifiCheckConnectionData['body']
export type UnifiConnectBody = PostIntegrationsUnifiData['body']
export type UnifiCreateFirewallPolicyBody = PostAssetsByAssetidUnifiFirewallPoliciesData['body']
export type UnifiUpdateFirewallPolicyBody =
	PutAssetsByAssetidUnifiFirewallPoliciesByPolicyidData['body']
export type UnifiReorderFirewallPoliciesBody =
	PutAssetsByAssetidUnifiFirewallPoliciesOrderingData['body']
export type UnifiUpsertFirewallZoneBody = PostAssetsByAssetidUnifiFirewallZonesData['body']
export type UnifiHostsQuery = GetIntegrationsUnifiHostsData['query']
export type UnifiUpdateMatchesBody = PutIntegrationsUnifiMatchesData['body']

/**
 * UniFi integration: connection setup, hosts, per-asset firewall policies/zones, device sync and
 * customer matching.
 */
export function createUnifiIntegrationResource(client: Client) {
	return {
		/**
		 * Check the connection to UniFi using the supplied credentials.
		 */
		async testConnection(
			body: UnifiCheckConnectionBody,
		): Promise<PostIntegrationsUnifiCheckConnectionResponse> {
			return ensureData(
				await postIntegrationsUnifiCheckConnection({ body, client }),
				'octoja.integrations.unifi.testConnection',
			)
		},
		/**
		 * Connect the UniFi integration with the supplied credentials.
		 */
		async connect(body: UnifiConnectBody): Promise<void> {
			ensureSuccess(
				await postIntegrationsUnifi({ body, client }),
				'octoja.integrations.unifi.connect',
			)
		},
		/**
		 * Disconnect and remove the UniFi integration.
		 */
		async remove(): Promise<void> {
			ensureSuccess(
				await deleteIntegrationsUnifi({ client }),
				'octoja.integrations.unifi.remove',
			)
		},
		/**
		 * Read the current UniFi integration settings.
		 */
		async settings(): Promise<GetIntegrationsUnifiResponse> {
			return ensureData(
				await getIntegrationsUnifi({ client }),
				'octoja.integrations.unifi.settings',
			)
		},
		/**
		 * Remove the UniFi customer identified by `customerId`.
		 */
		async removeCustomer(customerId: string): Promise<void> {
			ensureSuccess(
				await deleteIntegrationsUnifiCustomersByCustomerid({
					path: { customerId },
					client,
				}),
				'octoja.integrations.unifi.removeCustomer',
			)
		},
		/**
		 * List UniFi clients for the asset identified by `assetId`.
		 */
		async clients(assetId: string): Promise<GetAssetsByAssetidUnifiClientsResponse> {
			return ensureData(
				await getAssetsByAssetidUnifiClients({ path: { assetId }, client }),
				'octoja.integrations.unifi.clients',
			)
		},
		/**
		 * List UniFi hosts, optionally filtered by `customerId`.
		 */
		async hosts(query?: UnifiHostsQuery): Promise<GetIntegrationsUnifiHostsResponse> {
			return ensureData(
				await getIntegrationsUnifiHosts({ query, client }),
				'octoja.integrations.unifi.hosts',
			)
		},
		/**
		 * Synchronize devices from UniFi.
		 */
		async sync(): Promise<void> {
			ensureSuccess(
				await postIntegrationsUnifiSyncDevices({ client }),
				'octoja.integrations.unifi.sync',
			)
		},
		/**
		 * Update the customer-to-host matches for UniFi.
		 */
		async updateMatches(body: UnifiUpdateMatchesBody): Promise<void> {
			ensureSuccess(
				await putIntegrationsUnifiMatches({ body, client }),
				'octoja.integrations.unifi.updateMatches',
			)
		},
		/**
		 * Verify the current UniFi integration connection.
		 */
		async verify(): Promise<GetIntegrationsUnifiVerifyResponse> {
			return ensureData(
				await getIntegrationsUnifiVerify({ client }),
				'octoja.integrations.unifi.verify',
			)
		},
		firewall: {
			/**
			 * Read the UniFi firewall overview for the asset identified by `assetId`.
			 */
			async get(assetId: string): Promise<GetAssetsByAssetidUnifiFirewallResponse> {
				return ensureData(
					await getAssetsByAssetidUnifiFirewall({ path: { assetId }, client }),
					'octoja.integrations.unifi.firewall.get',
				)
			},
			/**
			 * Create a UniFi firewall policy for the asset identified by `assetId`.
			 */
			async createPolicy(
				assetId: string,
				body: UnifiCreateFirewallPolicyBody,
			): Promise<PostAssetsByAssetidUnifiFirewallPoliciesResponse> {
				return ensureData(
					await postAssetsByAssetidUnifiFirewallPolicies({
						path: { assetId },
						body,
						client,
					}),
					'octoja.integrations.unifi.firewall.createPolicy',
				)
			},
			/**
			 * Update the UniFi firewall policy `policyId` on the asset `assetId`.
			 */
			async updatePolicy(
				assetId: string,
				policyId: string,
				body: UnifiUpdateFirewallPolicyBody,
			): Promise<PutAssetsByAssetidUnifiFirewallPoliciesByPolicyidResponse> {
				return ensureData(
					await putAssetsByAssetidUnifiFirewallPoliciesByPolicyid({
						path: { assetId, policyId },
						body,
						client,
					}),
					'octoja.integrations.unifi.firewall.updatePolicy',
				)
			},
			/**
			 * Delete the UniFi firewall policy `policyId` from the asset `assetId`.
			 */
			async removePolicy(assetId: string, policyId: string): Promise<void> {
				ensureSuccess(
					await deleteAssetsByAssetidUnifiFirewallPoliciesByPolicyid({
						path: { assetId, policyId },
						client,
					}),
					'octoja.integrations.unifi.firewall.removePolicy',
				)
			},
			/**
			 * Reorder the UniFi firewall policies for the asset identified by `assetId`.
			 */
			async reorderPolicies(
				assetId: string,
				body: UnifiReorderFirewallPoliciesBody,
			): Promise<void> {
				ensureSuccess(
					await putAssetsByAssetidUnifiFirewallPoliciesOrdering({
						path: { assetId },
						body,
						client,
					}),
					'octoja.integrations.unifi.firewall.reorderPolicies',
				)
			},
			/**
			 * Create a UniFi firewall zone for the asset identified by `assetId`.
			 */
			async createZone(assetId: string, body: UnifiUpsertFirewallZoneBody): Promise<void> {
				ensureSuccess(
					await postAssetsByAssetidUnifiFirewallZones({
						path: { assetId },
						body,
						client,
					}),
					'octoja.integrations.unifi.firewall.createZone',
				)
			},
			/**
			 * Update the UniFi firewall zone `zoneId` on the asset `assetId`.
			 */
			async updateZone(
				assetId: string,
				zoneId: string,
				body: UnifiUpsertFirewallZoneBody,
			): Promise<void> {
				ensureSuccess(
					await putAssetsByAssetidUnifiFirewallZonesByZoneid({
						path: { assetId, zoneId },
						body,
						client,
					}),
					'octoja.integrations.unifi.firewall.updateZone',
				)
			},
			/**
			 * Delete the UniFi firewall zone `zoneId` from the asset `assetId`.
			 */
			async removeZone(assetId: string, zoneId: string): Promise<void> {
				ensureSuccess(
					await deleteAssetsByAssetidUnifiFirewallZonesByZoneid({
						path: { assetId, zoneId },
						client,
					}),
					'octoja.integrations.unifi.firewall.removeZone',
				)
			},
		},
	}
}

export type UnifiIntegrationResource = ReturnType<typeof createUnifiIntegrationResource>
