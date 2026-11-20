import type { Client } from '../../generated/client/types.gen'
import {
	deleteCustomPackagesById,
	deleteCustomPackagesByIdVersionsByVersionid,
	deleteCustomPackagesByIdVersionsByVersionidCompanionFilesByFileid,
	getCustomPackages,
	getCustomPackagesById,
	getCustomPackagesByIdVersionsByVersionid,
	getCustomPackagesByIdVersionsByVersionidParameterSchema,
	getFeedsChocoPackageByPackageidByVersion,
	getFeedsChocoV2,
	patchCustomPackagesById,
	patchCustomPackagesByIdVersionsByVersionid,
	postCustomPackages,
	postCustomPackagesByIdVersions,
	postCustomPackagesByIdVersionsByVersionidArtifactsUploadComplete,
	postCustomPackagesByIdVersionsByVersionidArtifactsUploadInit,
	postCustomPackagesByIdVersionsByVersionidCompanionFilesByFileidUploadComplete,
	postCustomPackagesByIdVersionsByVersionidCompanionFilesUploadInit,
	postCustomPackagesByIdVersionsByVersionidPublish,
	postCustomPackagesByIdVersionsByVersionidTestDeploy,
} from '../../generated/sdk.gen'
import type {
	GetCustomPackagesByIdResponse,
	GetCustomPackagesByIdVersionsByVersionidParameterSchemaResponse,
	GetCustomPackagesByIdVersionsByVersionidResponse,
	GetCustomPackagesResponse,
	GetFeedsChocoPackageByPackageidByVersionResponse,
	GetFeedsChocoV2Response,
	PatchCustomPackagesByIdData,
	PatchCustomPackagesByIdVersionsByVersionidData,
	PostCustomPackagesByIdVersionsByVersionidArtifactsUploadCompleteData,
	PostCustomPackagesByIdVersionsByVersionidArtifactsUploadInitData,
	PostCustomPackagesByIdVersionsByVersionidArtifactsUploadInitResponse,
	PostCustomPackagesByIdVersionsByVersionidCompanionFilesByFileidUploadCompleteData,
	PostCustomPackagesByIdVersionsByVersionidCompanionFilesUploadInitData,
	PostCustomPackagesByIdVersionsByVersionidCompanionFilesUploadInitResponse,
	PostCustomPackagesByIdVersionsByVersionidPublishResponse,
	PostCustomPackagesByIdVersionsByVersionidTestDeployData,
	PostCustomPackagesByIdVersionsByVersionidTestDeployResponse,
	PostCustomPackagesByIdVersionsData,
	PostCustomPackagesByIdVersionsResponse,
	PostCustomPackagesData,
	PostCustomPackagesResponse,
} from '../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../shared/errors'

export type CreateCustomPackageBody = PostCustomPackagesData['body']
export type UpdateCustomPackageBody = PatchCustomPackagesByIdData['body']
export type CreateCustomPackageVersionBody = PostCustomPackagesByIdVersionsData['body']
export type UpdateCustomPackageVersionBody = PatchCustomPackagesByIdVersionsByVersionidData['body']
export type InitArtifactUploadBody =
	PostCustomPackagesByIdVersionsByVersionidArtifactsUploadInitData['body']
export type CompleteArtifactUploadBody =
	PostCustomPackagesByIdVersionsByVersionidArtifactsUploadCompleteData['body']
export type InitCompanionFileUploadBody =
	PostCustomPackagesByIdVersionsByVersionidCompanionFilesUploadInitData['body']
export type CompleteCompanionFileUploadBody =
	PostCustomPackagesByIdVersionsByVersionidCompanionFilesByFileidUploadCompleteData['body']
export type TestDeployCustomPackageBody =
	PostCustomPackagesByIdVersionsByVersionidTestDeployData['body']

/**
 * Custom packages: package and version CRUD, artifact and companion-file
 * uploads, publishing/test deployment and the Chocolatey feed.
 */
export function createCustomPackagesResource(client: Client) {
	return {
		/**
		 * List custom packages.
		 */
		async list(): Promise<GetCustomPackagesResponse> {
			return ensureData(await getCustomPackages({ client }), 'octoja.customPackages.list')
		},
		/**
		 * Read the custom package identified by `id`.
		 */
		async get(id: string): Promise<GetCustomPackagesByIdResponse> {
			return ensureData(
				await getCustomPackagesById({ path: { id }, client }),
				'octoja.customPackages.get',
			)
		},
		/**
		 * Create a custom package.
		 */
		async create(body: CreateCustomPackageBody): Promise<PostCustomPackagesResponse> {
			return ensureData(
				await postCustomPackages({ body, client }),
				'octoja.customPackages.create',
			)
		},
		/**
		 * Update the custom package identified by `id`.
		 */
		async update(id: string, body: UpdateCustomPackageBody): Promise<void> {
			ensureSuccess(
				await patchCustomPackagesById({ path: { id }, body, client }),
				'octoja.customPackages.update',
			)
		},
		/**
		 * Delete the custom package identified by `id`.
		 */
		async remove(id: string): Promise<void> {
			ensureSuccess(
				await deleteCustomPackagesById({ path: { id }, client }),
				'octoja.customPackages.remove',
			)
		},
		versions: {
			/**
			 * Create a new version of the custom package identified by `id`.
			 */
			async create(
				id: string,
				body: CreateCustomPackageVersionBody,
			): Promise<PostCustomPackagesByIdVersionsResponse> {
				return ensureData(
					await postCustomPackagesByIdVersions({ path: { id }, body, client }),
					'octoja.customPackages.versions.create',
				)
			},
			/**
			 * Read version `versionId` of the custom package identified by `id`.
			 */
			async get(
				id: string,
				versionId: string,
			): Promise<GetCustomPackagesByIdVersionsByVersionidResponse> {
				return ensureData(
					await getCustomPackagesByIdVersionsByVersionid({
						path: { id, versionId },
						client,
					}),
					'octoja.customPackages.versions.get',
				)
			},
			/**
			 * Update version `versionId` of the custom package identified by `id`.
			 */
			async update(
				id: string,
				versionId: string,
				body: UpdateCustomPackageVersionBody,
			): Promise<void> {
				ensureSuccess(
					await patchCustomPackagesByIdVersionsByVersionid({
						path: { id, versionId },
						body,
						client,
					}),
					'octoja.customPackages.versions.update',
				)
			},
			/**
			 * Delete version `versionId` of the custom package identified by `id`.
			 */
			async remove(id: string, versionId: string): Promise<void> {
				ensureSuccess(
					await deleteCustomPackagesByIdVersionsByVersionid({
						path: { id, versionId },
						client,
					}),
					'octoja.customPackages.versions.remove',
				)
			},
			/**
			 * Parameter schema of version `versionId` of the custom package `id`.
			 */
			async parameterSchema(
				id: string,
				versionId: string,
			): Promise<GetCustomPackagesByIdVersionsByVersionidParameterSchemaResponse> {
				return ensureData(
					await getCustomPackagesByIdVersionsByVersionidParameterSchema({
						path: { id, versionId },
						client,
					}),
					'octoja.customPackages.versions.parameterSchema',
				)
			},
			/**
			 * Publish version `versionId` of the custom package identified by `id`.
			 */
			async publish(
				id: string,
				versionId: string,
			): Promise<PostCustomPackagesByIdVersionsByVersionidPublishResponse> {
				return ensureData(
					await postCustomPackagesByIdVersionsByVersionidPublish({
						path: { id, versionId },
						client,
					}),
					'octoja.customPackages.versions.publish',
				)
			},
			/**
			 * Test-deploy version `versionId` of the custom package identified by `id`.
			 */
			async testDeploy(
				id: string,
				versionId: string,
				body: TestDeployCustomPackageBody,
			): Promise<PostCustomPackagesByIdVersionsByVersionidTestDeployResponse> {
				return ensureData(
					await postCustomPackagesByIdVersionsByVersionidTestDeploy({
						path: { id, versionId },
						body,
						client,
					}),
					'octoja.customPackages.versions.testDeploy',
				)
			},
		},
		artifacts: {
			/**
			 * Initialize an artifact upload for version `versionId` of package `id`.
			 */
			async uploadInit(
				id: string,
				versionId: string,
				body: InitArtifactUploadBody,
			): Promise<PostCustomPackagesByIdVersionsByVersionidArtifactsUploadInitResponse> {
				return ensureData(
					await postCustomPackagesByIdVersionsByVersionidArtifactsUploadInit({
						path: { id, versionId },
						body,
						client,
					}),
					'octoja.customPackages.artifacts.uploadInit',
				)
			},
			/**
			 * Complete an artifact upload for version `versionId` of package `id`.
			 */
			async uploadComplete(
				id: string,
				versionId: string,
				body: CompleteArtifactUploadBody,
			): Promise<void> {
				ensureSuccess(
					await postCustomPackagesByIdVersionsByVersionidArtifactsUploadComplete({
						path: { id, versionId },
						body,
						client,
					}),
					'octoja.customPackages.artifacts.uploadComplete',
				)
			},
		},
		companionFiles: {
			/**
			 * Initialize a companion-file upload for version `versionId` of package `id`.
			 */
			async uploadInit(
				id: string,
				versionId: string,
				body: InitCompanionFileUploadBody,
			): Promise<PostCustomPackagesByIdVersionsByVersionidCompanionFilesUploadInitResponse> {
				return ensureData(
					await postCustomPackagesByIdVersionsByVersionidCompanionFilesUploadInit({
						path: { id, versionId },
						body,
						client,
					}),
					'octoja.customPackages.companionFiles.uploadInit',
				)
			},
			/**
			 * Complete a companion-file upload for file `fileId` of version `versionId`.
			 */
			async uploadComplete(
				id: string,
				versionId: string,
				fileId: string,
				body: CompleteCompanionFileUploadBody,
			): Promise<void> {
				ensureSuccess(
					await postCustomPackagesByIdVersionsByVersionidCompanionFilesByFileidUploadComplete(
						{
							path: { id, versionId, fileId },
							body,
							client,
						},
					),
					'octoja.customPackages.companionFiles.uploadComplete',
				)
			},
			/**
			 * Delete companion file `fileId` of version `versionId` of package `id`.
			 */
			async remove(id: string, versionId: string, fileId: string): Promise<void> {
				ensureSuccess(
					await deleteCustomPackagesByIdVersionsByVersionidCompanionFilesByFileid({
						path: { id, versionId, fileId },
						client,
					}),
					'octoja.customPackages.companionFiles.remove',
				)
			},
		},
		choco: {
			/**
			 * Read a Chocolatey package by `packageId` and `version`.
			 */
			async getPackage(
				packageId: string,
				version: string,
			): Promise<GetFeedsChocoPackageByPackageidByVersionResponse> {
				return ensureData(
					await getFeedsChocoPackageByPackageidByVersion({
						path: { packageId, version },
						client,
					}),
					'octoja.customPackages.choco.getPackage',
				)
			},
			/**
			 * The Chocolatey v2 feed endpoint.
			 */
			async feed(): Promise<GetFeedsChocoV2Response> {
				return ensureData(
					await getFeedsChocoV2({ client }),
					'octoja.customPackages.choco.feed',
				)
			},
		},
	}
}

export type CustomPackagesResource = ReturnType<typeof createCustomPackagesResource>
