import type { Client } from '../../generated/client/types.gen'
import {
	getAgentsUiSettings,
	postAgentsAutomationStepResults,
	postAgentsEnroll,
	postAgentsEnrollmentTokensValidate,
	postAgentsLauncherManifest,
	postAgentsManifest,
	postAgentsQuickSupportRetire,
} from '../../generated/sdk.gen'
import type {
	GetAgentsUiSettingsResponse,
	PostAgentsAutomationStepResultsData,
	PostAgentsEnrollData,
	PostAgentsEnrollmentTokensValidateData,
	PostAgentsEnrollResponse,
	PostAgentsLauncherManifestData,
	PostAgentsLauncherManifestResponse,
	PostAgentsManifestData,
	PostAgentsManifestResponse,
} from '../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../shared/errors'

export type AgentEnrollBody = PostAgentsEnrollData['body']
export type AgentAutomationStepResultBody = PostAgentsAutomationStepResultsData['body']
export type AgentEnrollmentTokenValidateBody = PostAgentsEnrollmentTokensValidateData['body']
export type AgentLauncherManifestBody = PostAgentsLauncherManifestData['body']
export type AgentManifestBody = PostAgentsManifestData['body']

/**
 * Device enrollment and agent self-service: enroll, UI settings, launcher and
 * agent manifests, automation step results and quick-support retirement.
 */
export function createAgentAgentsResource(client: Client) {
	return {
		/**
		 * Enroll an agent and receive its credentials.
		 */
		async enroll(body: AgentEnrollBody): Promise<PostAgentsEnrollResponse> {
			return ensureData(await postAgentsEnroll({ body, client }), 'agent.agents.enroll')
		},
		/**
		 * Fetch the agent-facing UI settings.
		 */
		async uiSettings(): Promise<GetAgentsUiSettingsResponse> {
			return ensureData(await getAgentsUiSettings({ client }), 'agent.agents.uiSettings')
		},
		/**
		 * Report the result of an executed automation step.
		 */
		async reportAutomationStepResult(body: AgentAutomationStepResultBody): Promise<void> {
			ensureSuccess(
				await postAgentsAutomationStepResults({ body, client }),
				'agent.agents.reportAutomationStepResult',
			)
		},
		/**
		 * Retire the current quick-support session.
		 */
		async quickSupportRetire(): Promise<void> {
			ensureSuccess(
				await postAgentsQuickSupportRetire({ client }),
				'agent.agents.quickSupportRetire',
			)
		},
		/**
		 * Validate an enrollment token before enrolling.
		 */
		async validateEnrollmentToken(body: AgentEnrollmentTokenValidateBody): Promise<void> {
			ensureSuccess(
				await postAgentsEnrollmentTokensValidate({ body, client }),
				'agent.agents.validateEnrollmentToken',
			)
		},
		/**
		 * Fetch the launcher manifest for the requesting platform.
		 */
		async launcherManifest(
			body: AgentLauncherManifestBody,
		): Promise<PostAgentsLauncherManifestResponse> {
			return ensureData(
				await postAgentsLauncherManifest({ body, client }),
				'agent.agents.launcherManifest',
			)
		},
		/**
		 * Fetch the agent manifest for the requesting platform.
		 */
		async manifest(body: AgentManifestBody): Promise<PostAgentsManifestResponse> {
			return ensureData(await postAgentsManifest({ body, client }), 'agent.agents.manifest')
		},
	}
}

export type AgentAgentsResource = ReturnType<typeof createAgentAgentsResource>
