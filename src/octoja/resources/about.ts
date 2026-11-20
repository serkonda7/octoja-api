import type { Client } from '../../generated/client/types.gen'
import { getAbout } from '../../generated/sdk.gen'
import type { GetAboutResponse } from '../../generated/types.gen'
import { ensureData } from '../../shared/errors'

/**
 * About: general information about the connected Octoja instance.
 */
export function createAboutResource(client: Client) {
	return {
		/**
		 * Read general information about the Octoja instance.
		 */
		async get(): Promise<GetAboutResponse> {
			return ensureData(await getAbout({ client }), 'octoja.about.get')
		},
	}
}

export type AboutResource = ReturnType<typeof createAboutResource>
