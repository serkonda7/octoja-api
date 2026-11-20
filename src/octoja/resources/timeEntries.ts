import type { Client } from '../../generated/client/types.gen'
import {
	deleteTimeEntriesById,
	getTimeEntries,
	getTimeEntriesPendingNotes,
	postTimeEntries,
	postTimeEntriesByIdFinish,
	postTimeEntriesByIdHeartbeat,
	postTimeEntriesByIdStop,
	postTimeEntriesManual,
	postTimeEntriesManualBulk,
	putTimeEntriesByIdNote,
	putTimeEntriesByIdTicket,
} from '../../generated/sdk.gen'
import type {
	GetTimeEntriesData,
	GetTimeEntriesPendingNotesResponse,
	GetTimeEntriesResponse,
	PostTimeEntriesByIdFinishData,
	PostTimeEntriesData,
	PostTimeEntriesManualBulkData,
	PostTimeEntriesManualBulkResponse,
	PostTimeEntriesManualData,
	PostTimeEntriesManualResponse,
	PostTimeEntriesResponse,
	PutTimeEntriesByIdNoteData,
	PutTimeEntriesByIdTicketData,
} from '../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../shared/errors'

export type TimeEntriesListQuery = GetTimeEntriesData['query']
export type StartTimeEntryBody = PostTimeEntriesData['body']
export type FinishTimeEntryBody = PostTimeEntriesByIdFinishData['body']
export type UpdateTimeEntryNoteBody = PutTimeEntriesByIdNoteData['body']
export type UpdateTimeEntryTicketBody = PutTimeEntriesByIdTicketData['body']
export type CreateManualTimeEntryBody = PostTimeEntriesManualData['body']
export type BulkCreateManualTimeEntriesBody = PostTimeEntriesManualBulkData['body']

/**
 * Time entries: start/stop/finish tracking, notes, manual entries and pending
 * note lookups.
 */
export function createTimeEntriesResource(client: Client) {
	return {
		/**
		 * List time entries with optional filters and pagination.
		 */
		async list(query?: TimeEntriesListQuery): Promise<GetTimeEntriesResponse> {
			return ensureData(await getTimeEntries({ query, client }), 'octoja.timeEntries.list')
		},
		/**
		 * Start a new time entry.
		 */
		async create(body: StartTimeEntryBody): Promise<PostTimeEntriesResponse> {
			return ensureData(await postTimeEntries({ body, client }), 'octoja.timeEntries.create')
		},
		/**
		 * Delete the time entry identified by `id`.
		 */
		async remove(id: string): Promise<void> {
			ensureSuccess(
				await deleteTimeEntriesById({ path: { id }, client }),
				'octoja.timeEntries.remove',
			)
		},
		/**
		 * Finish the running time entry identified by `id`.
		 */
		async finish(id: string, body: FinishTimeEntryBody): Promise<void> {
			ensureSuccess(
				await postTimeEntriesByIdFinish({ path: { id }, body, client }),
				'octoja.timeEntries.finish',
			)
		},
		/**
		 * List time entries with notes that are still pending.
		 */
		async pendingNotes(): Promise<GetTimeEntriesPendingNotesResponse> {
			return ensureData(
				await getTimeEntriesPendingNotes({ client }),
				'octoja.timeEntries.pendingNotes',
			)
		},
		/**
		 * Send a heartbeat for the running time entry identified by `id`.
		 */
		async heartbeat(id: string): Promise<void> {
			ensureSuccess(
				await postTimeEntriesByIdHeartbeat({ path: { id }, client }),
				'octoja.timeEntries.heartbeat',
			)
		},
		/**
		 * Stop the running time entry identified by `id`.
		 */
		async stop(id: string): Promise<void> {
			ensureSuccess(
				await postTimeEntriesByIdStop({ path: { id }, client }),
				'octoja.timeEntries.stop',
			)
		},
		/**
		 * Update the note of the time entry identified by `id`.
		 */
		async updateNote(id: string, body: UpdateTimeEntryNoteBody): Promise<void> {
			ensureSuccess(
				await putTimeEntriesByIdNote({ path: { id }, body, client }),
				'octoja.timeEntries.updateNote',
			)
		},
		/**
		 * Update the ticket of the time entry identified by `id`.
		 */
		async updateTicket(id: string, body: UpdateTimeEntryTicketBody): Promise<void> {
			ensureSuccess(
				await putTimeEntriesByIdTicket({ path: { id }, body, client }),
				'octoja.timeEntries.updateTicket',
			)
		},
		manual: {
			/**
			 * Create a single manual time entry.
			 */
			async create(body: CreateManualTimeEntryBody): Promise<PostTimeEntriesManualResponse> {
				return ensureData(
					await postTimeEntriesManual({ body, client }),
					'octoja.timeEntries.manual.create',
				)
			},
			/**
			 * Create multiple manual time entries in bulk.
			 */
			async bulk(
				body: BulkCreateManualTimeEntriesBody,
			): Promise<PostTimeEntriesManualBulkResponse> {
				return ensureData(
					await postTimeEntriesManualBulk({ body, client }),
					'octoja.timeEntries.manual.bulk',
				)
			},
		},
	}
}

export type TimeEntriesResource = ReturnType<typeof createTimeEntriesResource>
