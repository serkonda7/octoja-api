import type { Client } from '../../generated/client/types.gen'
import {
	getAgentsTickets,
	getAgentsTicketsById,
	getAgentsTicketsByIdAttachmentsByAttachmentidDownloadUrl,
	postAgentsTickets,
	postAgentsTicketsByIdAttachmentsByAttachmentidUploadComplete,
	postAgentsTicketsByIdAttachmentsUploadInit,
	postAgentsTicketsByIdComments,
} from '../../generated/sdk.gen'
import type {
	GetAgentsTicketsByIdAttachmentsByAttachmentidDownloadUrlResponse,
	GetAgentsTicketsByIdResponse,
	GetAgentsTicketsData,
	GetAgentsTicketsResponse,
	PostAgentsTicketsByIdAttachmentsUploadInitData,
	PostAgentsTicketsByIdAttachmentsUploadInitResponse,
	PostAgentsTicketsByIdCommentsData,
	PostAgentsTicketsByIdCommentsResponse,
	PostAgentsTicketsData,
	PostAgentsTicketsResponse,
} from '../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../shared/errors'

export type AgentTicketAttachmentInitBody = PostAgentsTicketsByIdAttachmentsUploadInitData['body']
export type AgentTicketCommentBody = PostAgentsTicketsByIdCommentsData['body']
export type AgentTicketCreateBody = PostAgentsTicketsData['body']
export type AgentTicketsListQuery = GetAgentsTicketsData['query']

/**
 * Ticket handling for the agent: listing, creating, commenting and attachments.
 */
export function createAgentTicketsResource(client: Client) {
	return {
		/**
		 * List the tickets visible to this agent, paged.
		 */
		async list(query?: AgentTicketsListQuery): Promise<GetAgentsTicketsResponse> {
			return ensureData(await getAgentsTickets({ query, client }), 'agent.tickets.list')
		},
		/**
		 * Read the ticket identified by `id`.
		 */
		async get(id: string): Promise<GetAgentsTicketsByIdResponse> {
			return ensureData(
				await getAgentsTicketsById({ path: { id }, client }),
				'agent.tickets.get',
			)
		},
		/**
		 * Create a new ticket on behalf of the agent.
		 */
		async create(body: AgentTicketCreateBody): Promise<PostAgentsTicketsResponse> {
			return ensureData(await postAgentsTickets({ body, client }), 'agent.tickets.create')
		},
		/**
		 * Add a comment to the ticket identified by `id`.
		 */
		async addComment(
			id: string,
			body: AgentTicketCommentBody,
		): Promise<PostAgentsTicketsByIdCommentsResponse> {
			return ensureData(
				await postAgentsTicketsByIdComments({ path: { id }, body, client }),
				'agent.tickets.addComment',
			)
		},
		attachments: {
			/**
			 * Initialize an attachment upload for the ticket identified by `id`.
			 */
			async uploadInit(
				id: string,
				body: AgentTicketAttachmentInitBody,
			): Promise<PostAgentsTicketsByIdAttachmentsUploadInitResponse> {
				return ensureData(
					await postAgentsTicketsByIdAttachmentsUploadInit({
						path: { id },
						body,
						client,
					}),
					'agent.tickets.attachments.uploadInit',
				)
			},
			/**
			 * Mark the upload of attachment `attachmentId` on ticket `id` as complete.
			 */
			async uploadComplete(id: string, attachmentId: string): Promise<void> {
				ensureSuccess(
					await postAgentsTicketsByIdAttachmentsByAttachmentidUploadComplete({
						path: { id, attachmentId },
						client,
					}),
					'agent.tickets.attachments.uploadComplete',
				)
			},
			/**
			 * Get a download URL for attachment `attachmentId` on ticket `id`.
			 */
			async downloadUrl(
				id: string,
				attachmentId: string,
			): Promise<GetAgentsTicketsByIdAttachmentsByAttachmentidDownloadUrlResponse> {
				return ensureData(
					await getAgentsTicketsByIdAttachmentsByAttachmentidDownloadUrl({
						path: { id, attachmentId },
						client,
					}),
					'agent.tickets.attachments.downloadUrl',
				)
			},
		},
	}
}

export type AgentTicketsResource = ReturnType<typeof createAgentTicketsResource>
