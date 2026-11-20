import type { Client } from '../../generated/client/types.gen'
import { postAuthLogin, postAuthLogout, postAuthRefresh } from '../../generated/sdk.gen'
import type { AccessTokenResponse } from '../../generated/types.gen'
import { getClientToken, setClientToken } from '../../shared/client'
import { ensureData, ensureSuccess } from '../../shared/errors'

/**
 * Agent credentials accepted by `POST /api/auth/login`: the `agentId` and
 * `secret` issued on enrollment.
 */
export interface AgentLoginBody {
	agentId: string
	secret: string
}

/**
 * Device-agent authentication: log in with the enrollment credentials and
 * refresh the token pair. Returned access tokens are stored on the client.
 */
export function createAgentAuthResource(client: Client) {
	const adopt = (tokens: AccessTokenResponse): AccessTokenResponse => {
		setClientToken(client, tokens.accessToken)
		return tokens
	}
	return {
		/**
		 * Log in with the agent's `agentId` + `secret`. Stores the returned
		 * access token on the client.
		 */
		async login(body: AgentLoginBody): Promise<AccessTokenResponse> {
			return adopt(ensureData(await postAuthLogin({ body, client }), 'agent.auth.login'))
		},
		/**
		 * Exchange a refresh token for a new token pair. Stores the returned
		 * access token on the client.
		 */
		async refresh(refreshToken: string): Promise<AccessTokenResponse> {
			return adopt(
				ensureData(
					await postAuthRefresh({ body: { refreshToken }, client }),
					'agent.auth.refresh',
				),
			)
		},
		/**
		 * Invalidate the current session and clear the token on the client.
		 */
		async logout(): Promise<void> {
			ensureSuccess(await postAuthLogout({ client }), 'agent.auth.logout')
			setClientToken(client, undefined)
		},
		/**
		 * The access token currently stored on this client, if any.
		 */
		get token(): string | undefined {
			return getClientToken(client)
		},
	}
}

export type AgentAuthResource = ReturnType<typeof createAgentAuthResource>
