import type { Client } from '../../generated/client/types.gen'
import {
	postSoftwareDeploymentPackagesSearch,
	postSoftwareDeploymentPackagesVersions,
} from '../../generated/sdk.gen'
import type {
	PostSoftwareDeploymentPackagesSearchData,
	PostSoftwareDeploymentPackagesSearchResponse,
	PostSoftwareDeploymentPackagesVersionsData,
	PostSoftwareDeploymentPackagesVersionsResponse,
} from '../../generated/types.gen'
import { ensureData } from '../../shared/errors'

export type GetPackageVersionsBody = PostSoftwareDeploymentPackagesVersionsData['body']
export type SearchPackageCatalogBody = PostSoftwareDeploymentPackagesSearchData['body']

/**
 * Software deployment: search the package catalog and look up package versions.
 */
export function createSoftwareDeploymentResource(client: Client) {
	return {
		packages: {
			/**
			 * Get the versions available for the requested packages.
			 */
			async versions(
				body: GetPackageVersionsBody,
			): Promise<PostSoftwareDeploymentPackagesVersionsResponse> {
				return ensureData(
					await postSoftwareDeploymentPackagesVersions({ body, client }),
					'octoja.softwareDeployment.packages.versions',
				)
			},
			/**
			 * Search the software package catalog.
			 */
			async search(
				body: SearchPackageCatalogBody,
			): Promise<PostSoftwareDeploymentPackagesSearchResponse> {
				return ensureData(
					await postSoftwareDeploymentPackagesSearch({ body, client }),
					'octoja.softwareDeployment.packages.search',
				)
			},
		},
	}
}

export type SoftwareDeploymentResource = ReturnType<typeof createSoftwareDeploymentResource>
