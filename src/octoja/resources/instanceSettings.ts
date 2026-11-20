import type { Client } from '../../generated/client/types.gen'
import {
	getInstanceReferralLink,
	getInstanceSettings,
	getIp,
	postInstanceSettings,
	postInstanceSettingsTechnicianNamePreview,
} from '../../generated/sdk.gen'
import type {
	GetInstanceReferralLinkResponse,
	GetInstanceSettingsResponse,
	GetIpResponse,
	PostInstanceSettingsData,
	PostInstanceSettingsResponse,
	PostInstanceSettingsTechnicianNamePreviewData,
	PostInstanceSettingsTechnicianNamePreviewResponse,
} from '../../generated/types.gen'
import { ensureData } from '../../shared/errors'

export type UpdateInstanceSettingsBody = PostInstanceSettingsData['body']
export type TechnicianNamePreviewBody = PostInstanceSettingsTechnicianNamePreviewData['body']

/**
 * Instance-wide information and settings, the outbound IP address, the
 * referral link and technician-name preview rendering.
 */
export function createInstanceSettingsResource(client: Client) {
	return {
		/**
		 * Read the instance settings.
		 */
		async get(): Promise<GetInstanceSettingsResponse> {
			return ensureData(await getInstanceSettings({ client }), 'octoja.instanceSettings.get')
		},
		/**
		 * Update the instance settings.
		 */
		async update(body: UpdateInstanceSettingsBody): Promise<PostInstanceSettingsResponse> {
			return ensureData(
				await postInstanceSettings({ body, client }),
				'octoja.instanceSettings.update',
			)
		},
		/**
		 * Read the outbound IP address of the instance.
		 */
		async ip(): Promise<GetIpResponse> {
			return ensureData(await getIp({ client }), 'octoja.instanceSettings.ip')
		},
		/**
		 * Read the instance's referral link.
		 */
		async referralLink(): Promise<GetInstanceReferralLinkResponse> {
			return ensureData(
				await getInstanceReferralLink({ client }),
				'octoja.instanceSettings.referralLink',
			)
		},
		/**
		 * Preview how a technician name will be rendered from the given input.
		 */
		async technicianNamePreview(
			body: TechnicianNamePreviewBody,
		): Promise<PostInstanceSettingsTechnicianNamePreviewResponse> {
			return ensureData(
				await postInstanceSettingsTechnicianNamePreview({ body, client }),
				'octoja.instanceSettings.technicianNamePreview',
			)
		},
	}
}

export type InstanceSettingsResource = ReturnType<typeof createInstanceSettingsResource>
