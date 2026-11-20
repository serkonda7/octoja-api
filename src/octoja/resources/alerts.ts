import type { Client } from '../../generated/client/types.gen'
import {
	deleteAlertConfigsById,
	getActiveAlarms,
	getAlertChannelTargets,
	getAlertConfigs,
	getAlertConfigsActiveAlarmCounts,
	getAlertConfigsById,
	getAlertConfigsByIdUsage,
	postActiveAlarmsResolve,
	postAlertConfigs,
	postAlertConfigsById,
} from '../../generated/sdk.gen'
import type {
	GetActiveAlarmsResponse,
	GetAlertChannelTargetsResponse,
	GetAlertConfigsActiveAlarmCountsResponse,
	GetAlertConfigsByIdResponse,
	GetAlertConfigsByIdUsageData,
	GetAlertConfigsByIdUsageResponse,
	GetAlertConfigsResponse,
	PostActiveAlarmsResolveData,
	PostActiveAlarmsResolveResponse,
	PostAlertConfigsByIdData,
	PostAlertConfigsByIdResponse,
	PostAlertConfigsData,
	PostAlertConfigsResponse,
} from '../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../shared/errors'

export type CreateAlertConfigBody = PostAlertConfigsData['body']
export type UpdateAlertConfigBody = PostAlertConfigsByIdData['body']
export type AlertConfigUsageQuery = GetAlertConfigsByIdUsageData['query']
export type ResolveAlarmsBody = PostActiveAlarmsResolveData['body']

/**
 * Alert configuration CRUD, active alarms, channel targets and usage reporting.
 */
export function createAlertsResource(client: Client) {
	return {
		/**
		 * List all alert configurations.
		 */
		async list(): Promise<GetAlertConfigsResponse> {
			return ensureData(await getAlertConfigs({ client }), 'octoja.alerts.list')
		},
		/**
		 * Read the alert configuration identified by `id`.
		 */
		async get(id: string): Promise<GetAlertConfigsByIdResponse> {
			return ensureData(
				await getAlertConfigsById({ path: { id }, client }),
				'octoja.alerts.get',
			)
		},
		/**
		 * Create a new alert configuration.
		 */
		async create(body: CreateAlertConfigBody): Promise<PostAlertConfigsResponse> {
			return ensureData(await postAlertConfigs({ body, client }), 'octoja.alerts.create')
		},
		/**
		 * Update the alert configuration identified by `id`.
		 */
		async update(
			id: string,
			body: UpdateAlertConfigBody,
		): Promise<PostAlertConfigsByIdResponse> {
			return ensureData(
				await postAlertConfigsById({ path: { id }, body, client }),
				'octoja.alerts.update',
			)
		},
		/**
		 * Delete the alert configuration identified by `id`.
		 */
		async remove(id: string): Promise<void> {
			ensureSuccess(
				await deleteAlertConfigsById({ path: { id }, client }),
				'octoja.alerts.remove',
			)
		},
		/**
		 * List currently active alarms.
		 */
		async activeAlarms(): Promise<GetActiveAlarmsResponse> {
			return ensureData(await getActiveAlarms({ client }), 'octoja.alerts.activeAlarms')
		},
		/**
		 * List available alert channel targets.
		 */
		async channelTargets(): Promise<GetAlertChannelTargetsResponse> {
			return ensureData(
				await getAlertChannelTargets({ client }),
				'octoja.alerts.channelTargets',
			)
		},
		/**
		 * Active-alarm counts per alert configuration.
		 */
		async activeAlarmCounts(): Promise<GetAlertConfigsActiveAlarmCountsResponse> {
			return ensureData(
				await getAlertConfigsActiveAlarmCounts({ client }),
				'octoja.alerts.activeAlarmCounts',
			)
		},
		/**
		 * Paginated usage history of the alert configuration identified by `id`.
		 */
		async usage(
			id: string,
			query?: AlertConfigUsageQuery,
		): Promise<GetAlertConfigsByIdUsageResponse> {
			return ensureData(
				await getAlertConfigsByIdUsage({ path: { id }, query, client }),
				'octoja.alerts.usage',
			)
		},
		/**
		 * Manually resolve the alarms specified in the request.
		 */
		async resolve(body: ResolveAlarmsBody): Promise<PostActiveAlarmsResolveResponse> {
			return ensureData(
				await postActiveAlarmsResolve({ body, client }),
				'octoja.alerts.resolve',
			)
		},
	}
}

export type AlertsResource = ReturnType<typeof createAlertsResource>
