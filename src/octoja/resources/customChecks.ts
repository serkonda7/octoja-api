import type { Client } from '../../generated/client/types.gen'
import {
	deleteCustomCheckRepositoryCredentialsById,
	deleteCustomChecksById,
	getCustomCheckRepositoryCredentials,
	getCustomChecks,
	getCustomChecksById,
	getCustomChecksByIdScriptByPlatform,
	postCustomCheckRepositoryCredentials,
	postCustomChecks,
	postCustomChecksLayoutPreview,
	postCustomChecksSnmpConvertToScript,
	postCustomChecksSnmpPreviewSchema,
	postCustomChecksTextPreview,
	putCustomCheckRepositoryCredentialsById,
	putCustomChecksById,
} from '../../generated/sdk.gen'
import type {
	GetCustomCheckRepositoryCredentialsResponse,
	GetCustomChecksByIdResponse,
	GetCustomChecksByIdScriptByPlatformResponse,
	GetCustomChecksData,
	GetCustomChecksResponse,
	PostCustomCheckRepositoryCredentialsData,
	PostCustomChecksData,
	PostCustomChecksLayoutPreviewData,
	PostCustomChecksLayoutPreviewResponse,
	PostCustomChecksResponse,
	PostCustomChecksSnmpConvertToScriptData,
	PostCustomChecksSnmpConvertToScriptResponse,
	PostCustomChecksSnmpPreviewSchemaData,
	PostCustomChecksSnmpPreviewSchemaResponse,
	PostCustomChecksTextPreviewData,
	PostCustomChecksTextPreviewResponse,
	PutCustomCheckRepositoryCredentialsByIdData,
	PutCustomChecksByIdData,
} from '../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../shared/errors'

export type ConvertSnmpToScriptBody = PostCustomChecksSnmpConvertToScriptData['body']
export type CreateCustomCheckBody = PostCustomChecksData['body']
export type CustomChecksListQuery = GetCustomChecksData['query']
export type CreateCustomCheckCredentialBody = PostCustomCheckRepositoryCredentialsData['body']
export type UpdateCustomCheckBody = PutCustomChecksByIdData['body']
export type UpdateCustomCheckCredentialBody = PutCustomCheckRepositoryCredentialsByIdData['body']
export type PreviewCustomCheckLayoutBody = PostCustomChecksLayoutPreviewData['body']
export type PreviewCustomCheckTextBody = PostCustomChecksTextPreviewData['body']
export type PreviewSnmpSchemaBody = PostCustomChecksSnmpPreviewSchemaData['body']

/**
 * Custom checks: check definitions, repository credentials, script retrieval
 * and layout/text/SNMP previews.
 */
export function createCustomChecksResource(client: Client) {
	return {
		/**
		 * Convert an SNMP check definition to a script.
		 */
		async snmpConvertToScript(
			body: ConvertSnmpToScriptBody,
		): Promise<PostCustomChecksSnmpConvertToScriptResponse> {
			return ensureData(
				await postCustomChecksSnmpConvertToScript({ body, client }),
				'octoja.customChecks.snmpConvertToScript',
			)
		},
		/**
		 * Create a new custom check.
		 */
		async create(body: CreateCustomCheckBody): Promise<PostCustomChecksResponse> {
			return ensureData(
				await postCustomChecks({ body, client }),
				'octoja.customChecks.create',
			)
		},
		/**
		 * List custom checks, optionally filtered by `checkId`.
		 */
		async list(query?: CustomChecksListQuery): Promise<GetCustomChecksResponse> {
			return ensureData(await getCustomChecks({ query, client }), 'octoja.customChecks.list')
		},
		/**
		 * Store credentials for a custom check repository.
		 */
		async createCredential(body: CreateCustomCheckCredentialBody): Promise<void> {
			ensureSuccess(
				await postCustomCheckRepositoryCredentials({ body, client }),
				'octoja.customChecks.createCredential',
			)
		},
		/**
		 * List configured custom check repository credentials.
		 */
		async credentials(): Promise<GetCustomCheckRepositoryCredentialsResponse> {
			return ensureData(
				await getCustomCheckRepositoryCredentials({ client }),
				'octoja.customChecks.credentials',
			)
		},
		/**
		 * Delete the custom check identified by `id`.
		 */
		async remove(id: string): Promise<void> {
			ensureSuccess(
				await deleteCustomChecksById({ path: { id }, client }),
				'octoja.customChecks.remove',
			)
		},
		/**
		 * Read the custom check identified by `id`.
		 */
		async get(id: string): Promise<GetCustomChecksByIdResponse> {
			return ensureData(
				await getCustomChecksById({ path: { id }, client }),
				'octoja.customChecks.get',
			)
		},
		/**
		 * Replace the custom check identified by `id`.
		 */
		async update(id: string, body: UpdateCustomCheckBody): Promise<void> {
			ensureSuccess(
				await putCustomChecksById({ path: { id }, body, client }),
				'octoja.customChecks.update',
			)
		},
		/**
		 * Delete repository credential `id`.
		 */
		async removeCredential(id: string): Promise<void> {
			ensureSuccess(
				await deleteCustomCheckRepositoryCredentialsById({ path: { id }, client }),
				'octoja.customChecks.removeCredential',
			)
		},
		/**
		 * Replace repository credential `id`.
		 */
		async updateCredential(id: string, body: UpdateCustomCheckCredentialBody): Promise<void> {
			ensureSuccess(
				await putCustomCheckRepositoryCredentialsById({ path: { id }, body, client }),
				'octoja.customChecks.updateCredential',
			)
		},
		/**
		 * Render the script of check `id` for the given `platform`.
		 */
		async script(
			id: string,
			platform: string,
		): Promise<GetCustomChecksByIdScriptByPlatformResponse> {
			return ensureData(
				await getCustomChecksByIdScriptByPlatform({ path: { id, platform }, client }),
				'octoja.customChecks.script',
			)
		},
		/**
		 * Preview the layout rendering of a custom check.
		 */
		async layoutPreview(
			body: PreviewCustomCheckLayoutBody,
		): Promise<PostCustomChecksLayoutPreviewResponse> {
			return ensureData(
				await postCustomChecksLayoutPreview({ body, client }),
				'octoja.customChecks.layoutPreview',
			)
		},
		/**
		 * Preview the result text rendering of a custom check.
		 */
		async textPreview(
			body: PreviewCustomCheckTextBody,
		): Promise<PostCustomChecksTextPreviewResponse> {
			return ensureData(
				await postCustomChecksTextPreview({ body, client }),
				'octoja.customChecks.textPreview',
			)
		},
		/**
		 * Preview the SNMP schema of a custom check.
		 */
		async snmpPreviewSchema(
			body: PreviewSnmpSchemaBody,
		): Promise<PostCustomChecksSnmpPreviewSchemaResponse> {
			return ensureData(
				await postCustomChecksSnmpPreviewSchema({ body, client }),
				'octoja.customChecks.snmpPreviewSchema',
			)
		},
	}
}

export type CustomChecksResource = ReturnType<typeof createCustomChecksResource>
