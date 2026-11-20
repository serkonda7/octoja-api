import type { Client } from '../../generated/client/types.gen'
import {
	deleteUserInvitationsById,
	deleteUsersById,
	deleteUsersMePassword,
	getUserInvitations,
	getUserInvitationsByIdLink,
	getUserInvitationsByTokenByToken,
	getUsers,
	getUsersById,
	getUsersMe,
	postUserInvitations,
	postUserInvitationsAccept,
	postUserInvitationsByIdResend,
	postUserInvitationsFirstUserSetup,
	postUsers,
	postUsersById,
	postUsersMe,
	postUsersMeChangePassword,
	postUsersMePreferences,
} from '../../generated/sdk.gen'
import type {
	GetUserInvitationsByIdLinkResponse,
	GetUserInvitationsByTokenByTokenResponse,
	GetUserInvitationsResponse,
	GetUsersByIdResponse,
	GetUsersData,
	GetUsersMeResponse,
	GetUsersResponse,
	PostUserInvitationsAcceptData,
	PostUserInvitationsData,
	PostUserInvitationsFirstUserSetupData,
	PostUserInvitationsResponse,
	PostUsersByIdData,
	PostUsersByIdResponse,
	PostUsersData,
	PostUsersMeChangePasswordData,
	PostUsersMeData,
	PostUsersMePreferencesData,
	PostUsersMePreferencesResponse,
	PostUsersMeResponse,
	PostUsersResponse,
} from '../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../shared/errors'

export type UsersListQuery = GetUsersData['query']
export type CreateUserBody = PostUsersData['body']
export type UpdateUserBody = PostUsersByIdData['body']
export type ChangePasswordBody = PostUsersMeChangePasswordData['body']
export type UpdateMyProfileBody = PostUsersMeData['body']
export type UpdateUserPreferenceBody = PostUsersMePreferencesData['body']
export type AcceptUserInvitationBody = PostUserInvitationsAcceptData['body']
export type CreateUserInvitationBody = PostUserInvitationsData['body']
export type FirstUserSetupBody = PostUserInvitationsFirstUserSetupData['body']

/**
 * Users and user invitations: account management, the current user's profile
 * and preferences, passwords, and the invitation lifecycle.
 */
export function createUsersResource(client: Client) {
	return {
		/**
		 * List users, optionally filtered by a `search` term.
		 */
		async list(query?: UsersListQuery): Promise<GetUsersResponse> {
			return ensureData(await getUsers({ query, client }), 'octoja.users.list')
		},
		/**
		 * Read the user identified by `id`.
		 */
		async get(id: string): Promise<GetUsersByIdResponse> {
			return ensureData(await getUsersById({ path: { id }, client }), 'octoja.users.get')
		},
		/**
		 * Create a new user.
		 */
		async create(body: CreateUserBody): Promise<PostUsersResponse> {
			return ensureData(await postUsers({ body, client }), 'octoja.users.create')
		},
		/**
		 * Update the user identified by `id`.
		 */
		async update(id: string, body: UpdateUserBody): Promise<PostUsersByIdResponse> {
			return ensureData(
				await postUsersById({ path: { id }, body, client }),
				'octoja.users.update',
			)
		},
		/**
		 * Delete the user identified by `id`.
		 */
		async remove(id: string): Promise<void> {
			ensureSuccess(await deleteUsersById({ path: { id }, client }), 'octoja.users.remove')
		},
		/**
		 * Read the profile of the currently authenticated user.
		 */
		async me(): Promise<GetUsersMeResponse> {
			return ensureData(await getUsersMe({ client }), 'octoja.users.me')
		},
		/**
		 * Update the profile of the currently authenticated user.
		 */
		async updateMe(body: UpdateMyProfileBody): Promise<PostUsersMeResponse> {
			return ensureData(await postUsersMe({ body, client }), 'octoja.users.updateMe')
		},
		/**
		 * Change the password of the currently authenticated user.
		 */
		async changePassword(body: ChangePasswordBody): Promise<void> {
			ensureSuccess(
				await postUsersMeChangePassword({ body, client }),
				'octoja.users.changePassword',
			)
		},
		/**
		 * Remove the password of the currently authenticated user.
		 */
		async removePassword(): Promise<void> {
			ensureSuccess(await deleteUsersMePassword({ client }), 'octoja.users.removePassword')
		},
		/**
		 * Update the preferences of the currently authenticated user.
		 */
		async updatePreferences(
			body: UpdateUserPreferenceBody,
		): Promise<PostUsersMePreferencesResponse> {
			return ensureData(
				await postUsersMePreferences({ body, client }),
				'octoja.users.updatePreferences',
			)
		},
		invitations: {
			/**
			 * Accept a user invitation.
			 */
			async accept(body: AcceptUserInvitationBody): Promise<void> {
				ensureSuccess(
					await postUserInvitationsAccept({ body, client }),
					'octoja.users.invitations.accept',
				)
			},
			/**
			 * Create and send a new user invitation.
			 */
			async create(body: CreateUserInvitationBody): Promise<PostUserInvitationsResponse> {
				return ensureData(
					await postUserInvitations({ body, client }),
					'octoja.users.invitations.create',
				)
			},
			/**
			 * List all user invitations.
			 */
			async list(): Promise<GetUserInvitationsResponse> {
				return ensureData(
					await getUserInvitations({ client }),
					'octoja.users.invitations.list',
				)
			},
			/**
			 * Preview the invitation identified by its `token`.
			 */
			async previewByToken(token: string): Promise<GetUserInvitationsByTokenByTokenResponse> {
				return ensureData(
					await getUserInvitationsByTokenByToken({ path: { token }, client }),
					'octoja.users.invitations.previewByToken',
				)
			},
			/**
			 * Get the invitation link for the invitation identified by `id`.
			 */
			async link(id: string): Promise<GetUserInvitationsByIdLinkResponse> {
				return ensureData(
					await getUserInvitationsByIdLink({ path: { id }, client }),
					'octoja.users.invitations.link',
				)
			},
			/**
			 * Resend the invitation identified by `id`.
			 */
			async resend(id: string): Promise<void> {
				ensureSuccess(
					await postUserInvitationsByIdResend({ path: { id }, client }),
					'octoja.users.invitations.resend',
				)
			},
			/**
			 * Delete the invitation identified by `id`.
			 */
			async remove(id: string): Promise<void> {
				ensureSuccess(
					await deleteUserInvitationsById({ path: { id }, client }),
					'octoja.users.invitations.remove',
				)
			},
			/**
			 * Perform the first-user setup with the given details.
			 */
			async firstUserSetup(body: FirstUserSetupBody): Promise<void> {
				ensureSuccess(
					await postUserInvitationsFirstUserSetup({ body, client }),
					'octoja.users.invitations.firstUserSetup',
				)
			},
		},
	}
}

export type UsersResource = ReturnType<typeof createUsersResource>
