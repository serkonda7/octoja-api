import type { Client } from '../../generated/client/types.gen'
import {
	getBranding,
	getBrandingCss,
	getBrandingCustomersById,
	getBrandingCustomersByIdIcon,
	getBrandingCustomersByIdLogo,
	getBrandingIcon,
	getBrandingLogo,
	getBrandingMascot,
	getBrandingQuickSupportLogo,
	postBrandingCustomersById,
} from '../../generated/sdk.gen'
import type {
	GetBrandingCssResponse,
	GetBrandingCustomersByIdIconResponse,
	GetBrandingCustomersByIdLogoResponse,
	GetBrandingCustomersByIdResponse,
	GetBrandingIconData,
	GetBrandingIconResponse,
	GetBrandingLogoData,
	GetBrandingLogoResponse,
	GetBrandingMascotResponse,
	GetBrandingQuickSupportLogoResponse,
	GetBrandingResponse,
	PostBrandingCustomersByIdData,
	PostBrandingCustomersByIdResponse,
} from '../../generated/types.gen'
import { ensureData } from '../../shared/errors'

export type BrandingIconQuery = GetBrandingIconData['query']
export type BrandingLogoQuery = GetBrandingLogoData['query']
export type UpdateCustomerBrandingBody = PostBrandingCustomersByIdData['body']

/**
 * Instance branding: CSS, logo/icon/mascot assets, quick-support logo and
 * per-customer branding overrides.
 */
export function createBrandingResource(client: Client) {
	return {
		/**
		 * Read the generated branding CSS.
		 */
		async css(): Promise<GetBrandingCssResponse> {
			return ensureData(await getBrandingCss({ client }), 'octoja.branding.css')
		},
		/**
		 * Read the instance branding metadata.
		 */
		async get(): Promise<GetBrandingResponse> {
			return ensureData(await getBranding({ client }), 'octoja.branding.get')
		},
		/**
		 * Read the branding icon, optionally for a specific `theme`.
		 */
		async icon(query?: BrandingIconQuery): Promise<GetBrandingIconResponse> {
			return ensureData(await getBrandingIcon({ query, client }), 'octoja.branding.icon')
		},
		/**
		 * Read the branding logo, optionally for a specific `theme`.
		 */
		async logo(query?: BrandingLogoQuery): Promise<GetBrandingLogoResponse> {
			return ensureData(await getBrandingLogo({ query, client }), 'octoja.branding.logo')
		},
		/**
		 * Read the branding mascot image.
		 */
		async mascot(): Promise<GetBrandingMascotResponse> {
			return ensureData(await getBrandingMascot({ client }), 'octoja.branding.mascot')
		},
		/**
		 * Read the quick-support logo.
		 */
		async quickSupportLogo(): Promise<GetBrandingQuickSupportLogoResponse> {
			return ensureData(
				await getBrandingQuickSupportLogo({ client }),
				'octoja.branding.quickSupportLogo',
			)
		},
		customers: {
			/**
			 * Read the branding overrides of the customer identified by `id`.
			 */
			async get(id: string): Promise<GetBrandingCustomersByIdResponse> {
				return ensureData(
					await getBrandingCustomersById({ path: { id }, client }),
					'octoja.branding.customers.get',
				)
			},
			/**
			 * Update the branding overrides of the customer identified by `id`.
			 */
			async update(
				id: string,
				body: UpdateCustomerBrandingBody,
			): Promise<PostBrandingCustomersByIdResponse> {
				return ensureData(
					await postBrandingCustomersById({ path: { id }, body, client }),
					'octoja.branding.customers.update',
				)
			},
			/**
			 * Read the icon of the customer identified by `id`.
			 */
			async icon(id: string): Promise<GetBrandingCustomersByIdIconResponse> {
				return ensureData(
					await getBrandingCustomersByIdIcon({ path: { id }, client }),
					'octoja.branding.customers.icon',
				)
			},
			/**
			 * Read the logo of the customer identified by `id`.
			 */
			async logo(id: string): Promise<GetBrandingCustomersByIdLogoResponse> {
				return ensureData(
					await getBrandingCustomersByIdLogo({ path: { id }, client }),
					'octoja.branding.customers.logo',
				)
			},
		},
	}
}

export type BrandingResource = ReturnType<typeof createBrandingResource>
