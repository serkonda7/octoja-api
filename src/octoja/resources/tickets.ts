import type { Client } from '../../generated/client/types.gen'
import {
	deleteTicketsById,
	getTickets,
	getTicketsById,
	getTicketsByIdAttachmentsByAttachmentid,
	postTickets,
	postTicketsBulkClose,
	postTicketsById,
	postTicketsByIdComments,
} from '../../generated/sdk.gen'
import type {
	GetTicketsByIdAttachmentsByAttachmentidResponse,
	GetTicketsByIdResponse,
	GetTicketsData,
	GetTicketsResponse,
	PostTicketsBulkCloseData,
	PostTicketsBulkCloseResponse,
	PostTicketsByIdCommentsData,
	PostTicketsByIdCommentsResponse,
	PostTicketsByIdData,
	PostTicketsByIdResponse,
	PostTicketsData,
	PostTicketsResponse,
} from '../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../shared/errors'

export type TicketsListQuery = GetTicketsData['query']
export type CreateTicketBody = PostTicketsData['body']
export type UpdateTicketBody = PostTicketsByIdData['body']
export type AddTicketCommentBody = PostTicketsByIdCommentsData['body']
export type BulkCloseTicketsBody = PostTicketsBulkCloseData['body']

/**
 * Tickets: CRUD, comments, bulk close and attachment downloads.
 */
export function createTicketsResource(client: Client) {
	return {
		/**
		 * List tickets with optional filters and pagination.
		 */
		async list(query?: TicketsListQuery): Promise<GetTicketsResponse> {
			return ensureData(await getTickets({ query, client }), 'octoja.tickets.list')
		},
		/**
		 * Read the ticket identified by `id`.
		 */
		async get(id: string): Promise<GetTicketsByIdResponse> {
			return ensureData(await getTicketsById({ path: { id }, client }), 'octoja.tickets.get')
		},
		/**
		 * Create a new ticket.
		 */
		async create(body: CreateTicketBody): Promise<PostTicketsResponse> {
			return ensureData(await postTickets({ body, client }), 'octoja.tickets.create')
		},
		/**
		 * Update the ticket identified by `id`.
		 */
		async update(id: string, body: UpdateTicketBody): Promise<PostTicketsByIdResponse> {
			return ensureData(
				await postTicketsById({ path: { id }, body, client }),
				'octoja.tickets.update',
			)
		},
		/**
		 * Delete the ticket identified by `id`.
		 */
		async remove(id: string): Promise<void> {
			ensureSuccess(
				await deleteTicketsById({ path: { id }, client }),
				'octoja.tickets.remove',
			)
		},
		/**
		 * Add a comment to the ticket identified by `id`.
		 */
		async addComment(
			id: string,
			body: AddTicketCommentBody,
		): Promise<PostTicketsByIdCommentsResponse> {
			return ensureData(
				await postTicketsByIdComments({ path: { id }, body, client }),
				'octoja.tickets.addComment',
			)
		},
		/**
		 * Close multiple tickets in bulk.
		 */
		async bulkClose(body: BulkCloseTicketsBody): Promise<PostTicketsBulkCloseResponse> {
			return ensureData(
				await postTicketsBulkClose({ body, client }),
				'octoja.tickets.bulkClose',
			)
		},
		/**
		 * Download the attachment identified by `attachmentId` of the ticket `id`.
		 */
		async attachment(
			id: string,
			attachmentId: string,
		): Promise<GetTicketsByIdAttachmentsByAttachmentidResponse> {
			return ensureData(
				await getTicketsByIdAttachmentsByAttachmentid({
					path: { id, attachmentId },
					client,
				}),
				'octoja.tickets.attachment',
			)
		},
	}
}

export type TicketsResource = ReturnType<typeof createTicketsResource>
