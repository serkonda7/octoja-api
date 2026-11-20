import type { Client } from '../../generated/client/types.gen'
import {
	getAuthFeaturebaseToken,
	getAuthOidcByProviderAuthorize,
	getAuthOidcByProviderInviteAuthorize,
	getAuthOidcByProviderPasswordResetAuthorize,
	getAuthOidcCallback,
	getAuthOidcProviders,
	getAuthWebHandoffRedeem,
	postAuthLogin,
	postAuthLogout,
	postAuthOidcHandoff,
	postAuthOidcTotp,
	postAuthPasswordReset,
	postAuthRefresh,
	postAuthWebHandoff,
	postUsersByUseridOidcByProviderConnect,
	postUsersMeOidcByProviderConnect,
} from '../../generated/sdk.gen'
import type {
	AccessTokenResponse,
	GetAuthFeaturebaseTokenResponse,
	GetAuthOidcByProviderAuthorizeData,
	GetAuthOidcByProviderAuthorizeResponse,
	GetAuthOidcByProviderInviteAuthorizeData,
	GetAuthOidcByProviderInviteAuthorizeResponse,
	GetAuthOidcByProviderPasswordResetAuthorizeData,
	GetAuthOidcByProviderPasswordResetAuthorizeResponse,
	GetAuthOidcCallbackData,
	GetAuthOidcProvidersResponse,
	GetAuthWebHandoffRedeemData,
	PostAuthLoginData,
	PostAuthOidcHandoffData,
	PostAuthOidcTotpData,
	PostAuthPasswordResetData,
	PostAuthWebHandoffResponse,
	PostUsersByUseridOidcByProviderConnectData,
	PostUsersByUseridOidcByProviderConnectResponse,
	PostUsersMeOidcByProviderConnectData,
	PostUsersMeOidcByProviderConnectResponse,
} from '../../generated/types.gen'
import { getClientToken, setClientToken } from '../../shared/client'
import { ensureData, ensureSuccess } from '../../shared/errors'

export type LoginBody = PostAuthLoginData['body']
export type OidcAuthorizeQuery = GetAuthOidcByProviderAuthorizeData['query']
export type OidcInviteAuthorizeQuery = GetAuthOidcByProviderInviteAuthorizeData['query']
export type OidcPasswordResetAuthorizeQuery =
	GetAuthOidcByProviderPasswordResetAuthorizeData['query']
export type OidcCallbackQuery = GetAuthOidcCallbackData['query']
export type OidcHandoffBody = PostAuthOidcHandoffData['body']
export type OidcTotpBody = PostAuthOidcTotpData['body']
export type PasswordResetBody = PostAuthPasswordResetData['body']
export type WebHandoffRedeemQuery = GetAuthWebHandoffRedeemData['query']
export type OidcConnectBody = PostUsersMeOidcByProviderConnectData['body']
export type UserOidcConnectBody = PostUsersByUseridOidcByProviderConnectData['body']

/**
 * Authentication: password/TOTP login, token refresh, logout, OIDC flows and
 * web handoff codes.
 *
 * Methods returning an `AccessTokenResponse` (`login`, `refresh`,
 * `oidcHandoff`, `oidcTotp`, `oidcCallback`, `redeemWebHandoff`) store the new
 * `accessToken` on this client instance, so subsequent calls are
 * authenticated automatically. Keep `refreshToken` yourself for `refresh`.
 */
export function createAuthResource(client: Client) {
	const adopt = (tokens: AccessTokenResponse): AccessTokenResponse => {
		setClientToken(client, tokens.accessToken)
		return tokens
	}
	return {
		/**
		 * Log in with mail address + password (and `totp` when 2FA is enabled).
		 * Stores the returned access token on the client.
		 */
		async login(body: LoginBody): Promise<AccessTokenResponse> {
			return adopt(ensureData(await postAuthLogin({ body, client }), 'octoja.auth.login'))
		},
		/**
		 * Exchange a refresh token for a new token pair. Stores the returned
		 * access token on the client.
		 */
		async refresh(refreshToken: string): Promise<AccessTokenResponse> {
			return adopt(
				ensureData(
					await postAuthRefresh({ body: { refreshToken }, client }),
					'octoja.auth.refresh',
				),
			)
		},
		/**
		 * Invalidate the current session and clear the token on the client.
		 */
		async logout(): Promise<void> {
			ensureSuccess(await postAuthLogout({ client }), 'octoja.auth.logout')
			setClientToken(client, undefined)
		},
		/**
		 * The access token currently stored on this client, if any.
		 */
		get token(): string | undefined {
			return getClientToken(client)
		},
		/**
		 * Request a password-reset mail.
		 */
		async requestPasswordReset(body: PasswordResetBody): Promise<void> {
			ensureSuccess(
				await postAuthPasswordReset({ body, client }),
				'octoja.auth.requestPasswordReset',
			)
		},
		/**
		 * Create a one-time code to hand the current session over to the web UI.
		 */
		async createWebHandoff(): Promise<PostAuthWebHandoffResponse> {
			return ensureData(await postAuthWebHandoff({ client }), 'octoja.auth.createWebHandoff')
		},
		/**
		 * Redeem a web handoff code for a token pair. Stores the returned access
		 * token on the client.
		 */
		async redeemWebHandoff(query?: WebHandoffRedeemQuery): Promise<AccessTokenResponse> {
			return adopt(
				ensureData(
					await getAuthWebHandoffRedeem({ query, client }),
					'octoja.auth.redeemWebHandoff',
				),
			)
		},
		/**
		 * Token for the Featurebase feedback widget.
		 */
		async featurebaseToken(): Promise<GetAuthFeaturebaseTokenResponse> {
			return ensureData(
				await getAuthFeaturebaseToken({ client }),
				'octoja.auth.featurebaseToken',
			)
		},
		oidc: {
			/**
			 * List the configured OIDC identity providers.
			 */
			async providers(): Promise<GetAuthOidcProvidersResponse> {
				return ensureData(
					await getAuthOidcProviders({ client }),
					'octoja.auth.oidc.providers',
				)
			},
			/**
			 * Build the authorize URL to start an OIDC login with `provider`.
			 */
			async authorize(
				provider: string,
				query?: OidcAuthorizeQuery,
			): Promise<GetAuthOidcByProviderAuthorizeResponse> {
				return ensureData(
					await getAuthOidcByProviderAuthorize({ path: { provider }, query, client }),
					'octoja.auth.oidc.authorize',
				)
			},
			/**
			 * Build the authorize URL to accept a user invitation via `provider`.
			 */
			async inviteAuthorize(
				provider: string,
				query?: OidcInviteAuthorizeQuery,
			): Promise<GetAuthOidcByProviderInviteAuthorizeResponse> {
				return ensureData(
					await getAuthOidcByProviderInviteAuthorize({
						path: { provider },
						query,
						client,
					}),
					'octoja.auth.oidc.inviteAuthorize',
				)
			},
			/**
			 * Build the authorize URL to reset a password via `provider`.
			 */
			async passwordResetAuthorize(
				provider: string,
				query?: OidcPasswordResetAuthorizeQuery,
			): Promise<GetAuthOidcByProviderPasswordResetAuthorizeResponse> {
				return ensureData(
					await getAuthOidcByProviderPasswordResetAuthorize({
						path: { provider },
						query,
						client,
					}),
					'octoja.auth.oidc.passwordResetAuthorize',
				)
			},
			/**
			 * Complete the OIDC redirect (`code` + `state`). Stores the returned
			 * access token on the client.
			 */
			async callback(query?: OidcCallbackQuery): Promise<AccessTokenResponse> {
				return adopt(
					ensureData(
						await getAuthOidcCallback({ query, client }),
						'octoja.auth.oidc.callback',
					),
				)
			},
			/**
			 * Exchange an OIDC handoff code for a token pair. Stores the returned
			 * access token on the client.
			 */
			async handoff(body: OidcHandoffBody): Promise<AccessTokenResponse> {
				return adopt(
					ensureData(
						await postAuthOidcHandoff({ body, client }),
						'octoja.auth.oidc.handoff',
					),
				)
			},
			/**
			 * Complete an OIDC login that requires a TOTP second factor. Stores the
			 * returned access token on the client.
			 */
			async totp(body: OidcTotpBody): Promise<AccessTokenResponse> {
				return adopt(
					ensureData(await postAuthOidcTotp({ body, client }), 'octoja.auth.oidc.totp'),
				)
			},
			/**
			 * Link the current user to an identity at `provider`.
			 */
			async connectMe(
				provider: string,
				body: OidcConnectBody,
			): Promise<PostUsersMeOidcByProviderConnectResponse> {
				return ensureData(
					await postUsersMeOidcByProviderConnect({ path: { provider }, body, client }),
					'octoja.auth.oidc.connectMe',
				)
			},
			/**
			 * Link the user `userId` to an identity at `provider` (admin).
			 */
			async connectUser(
				userId: string,
				provider: string,
				body: UserOidcConnectBody,
			): Promise<PostUsersByUseridOidcByProviderConnectResponse> {
				return ensureData(
					await postUsersByUseridOidcByProviderConnect({
						path: { userId, provider },
						body,
						client,
					}),
					'octoja.auth.oidc.connectUser',
				)
			},
		},
	}
}

export type AuthResource = ReturnType<typeof createAuthResource>
