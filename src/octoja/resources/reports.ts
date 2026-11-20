import type { Client } from '../../generated/client/types.gen'
import {
	deleteReportsSchedulesById,
	deleteReportsTemplatesById,
	getReportsPrintBundleByFile,
	getReportsSchedules,
	getReportsSchedulesById,
	getReportsTemplates,
	getReportsTemplatesById,
	getReportsWidgetsAvailable,
	getReportsWidgetsCheckAssets,
	postReportsGenerate,
	postReportsPreviewDraft,
	postReportsSchedules,
	postReportsSchedulesById,
	postReportsSchedulesByIdRunNow,
	postReportsTemplates,
	postReportsTemplatesById,
} from '../../generated/sdk.gen'
import type {
	GetReportsPrintBundleByFileResponse,
	GetReportsSchedulesByIdResponse,
	GetReportsSchedulesResponse,
	GetReportsTemplatesByIdResponse,
	GetReportsTemplatesResponse,
	GetReportsWidgetsAvailableResponse,
	GetReportsWidgetsCheckAssetsData,
	GetReportsWidgetsCheckAssetsResponse,
	PostReportsGenerateData,
	PostReportsPreviewDraftData,
	PostReportsPreviewDraftResponse,
	PostReportsSchedulesByIdData,
	PostReportsSchedulesByIdResponse,
	PostReportsSchedulesData,
	PostReportsSchedulesResponse,
	PostReportsTemplatesByIdData,
	PostReportsTemplatesByIdResponse,
	PostReportsTemplatesData,
	PostReportsTemplatesResponse,
} from '../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../shared/errors'

export type CreateReportScheduleBody = PostReportsSchedulesData['body']
export type UpdateReportScheduleBody = PostReportsSchedulesByIdData['body']
export type CreateReportTemplateBody = PostReportsTemplatesData['body']
export type UpdateReportTemplateBody = PostReportsTemplatesByIdData['body']
export type GenerateReportBody = PostReportsGenerateData['body']
export type PreviewReportDraftBody = PostReportsPreviewDraftData['body']
export type CheckAssetsQuery = GetReportsWidgetsCheckAssetsData['query']

/**
 * Reports: generation and preview, schedules, templates, print bundles and
 * widget data.
 */
export function createReportsResource(client: Client) {
	return {
		schedules: {
			/**
			 * List all report schedules.
			 */
			async list(): Promise<GetReportsSchedulesResponse> {
				return ensureData(
					await getReportsSchedules({ client }),
					'octoja.reports.schedules.list',
				)
			},
			/**
			 * Read the report schedule identified by `id`.
			 */
			async get(id: string): Promise<GetReportsSchedulesByIdResponse> {
				return ensureData(
					await getReportsSchedulesById({ path: { id }, client }),
					'octoja.reports.schedules.get',
				)
			},
			/**
			 * Create a new report schedule.
			 */
			async create(body: CreateReportScheduleBody): Promise<PostReportsSchedulesResponse> {
				return ensureData(
					await postReportsSchedules({ body, client }),
					'octoja.reports.schedules.create',
				)
			},
			/**
			 * Update the report schedule identified by `id`.
			 */
			async update(
				id: string,
				body: UpdateReportScheduleBody,
			): Promise<PostReportsSchedulesByIdResponse> {
				return ensureData(
					await postReportsSchedulesById({ path: { id }, body, client }),
					'octoja.reports.schedules.update',
				)
			},
			/**
			 * Delete the report schedule identified by `id`.
			 */
			async remove(id: string): Promise<void> {
				ensureSuccess(
					await deleteReportsSchedulesById({ path: { id }, client }),
					'octoja.reports.schedules.remove',
				)
			},
			/**
			 * Run the report schedule identified by `id` immediately.
			 */
			async runNow(id: string): Promise<void> {
				ensureSuccess(
					await postReportsSchedulesByIdRunNow({ path: { id }, client }),
					'octoja.reports.schedules.runNow',
				)
			},
		},
		templates: {
			/**
			 * List all report templates.
			 */
			async list(): Promise<GetReportsTemplatesResponse> {
				return ensureData(
					await getReportsTemplates({ client }),
					'octoja.reports.templates.list',
				)
			},
			/**
			 * Read the report template identified by `id`.
			 */
			async get(id: string): Promise<GetReportsTemplatesByIdResponse> {
				return ensureData(
					await getReportsTemplatesById({ path: { id }, client }),
					'octoja.reports.templates.get',
				)
			},
			/**
			 * Create a new report template.
			 */
			async create(body: CreateReportTemplateBody): Promise<PostReportsTemplatesResponse> {
				return ensureData(
					await postReportsTemplates({ body, client }),
					'octoja.reports.templates.create',
				)
			},
			/**
			 * Update the report template identified by `id`.
			 */
			async update(
				id: string,
				body: UpdateReportTemplateBody,
			): Promise<PostReportsTemplatesByIdResponse> {
				return ensureData(
					await postReportsTemplatesById({ path: { id }, body, client }),
					'octoja.reports.templates.update',
				)
			},
			/**
			 * Delete the report template identified by `id`.
			 */
			async remove(id: string): Promise<void> {
				ensureSuccess(
					await deleteReportsTemplatesById({ path: { id }, client }),
					'octoja.reports.templates.remove',
				)
			},
		},
		widgets: {
			/**
			 * List asset options for the requested checks, customers or sites.
			 */
			async checkAssets(
				query?: CheckAssetsQuery,
			): Promise<GetReportsWidgetsCheckAssetsResponse> {
				return ensureData(
					await getReportsWidgetsCheckAssets({ query, client }),
					'octoja.reports.widgets.checkAssets',
				)
			},
			/**
			 * List the available report widgets.
			 */
			async available(): Promise<GetReportsWidgetsAvailableResponse> {
				return ensureData(
					await getReportsWidgetsAvailable({ client }),
					'octoja.reports.widgets.available',
				)
			},
		},
		/**
		 * Generate a report from the given request.
		 */
		async generate(body: GenerateReportBody): Promise<unknown> {
			return ensureData(
				await postReportsGenerate({ body, client }),
				'octoja.reports.generate',
			)
		},
		/**
		 * Download a generated print bundle by `file` name.
		 */
		async printBundle(file: string): Promise<GetReportsPrintBundleByFileResponse> {
			return ensureData(
				await getReportsPrintBundleByFile({ path: { file }, client }),
				'octoja.reports.printBundle',
			)
		},
		/**
		 * Preview a report draft from the given request.
		 */
		async previewDraft(body: PreviewReportDraftBody): Promise<PostReportsPreviewDraftResponse> {
			return ensureData(
				await postReportsPreviewDraft({ body, client }),
				'octoja.reports.previewDraft',
			)
		},
	}
}

export type ReportsResource = ReturnType<typeof createReportsResource>
