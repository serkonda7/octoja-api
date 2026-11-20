import type { Client } from '../../../generated/client/types.gen'
import { createAcronisIntegrationResource } from './acronis'
import { createAutotaskIntegrationResource } from './autotask'
import { createBitdefenderIntegrationResource } from './bitdefender'
import { createCodemetaIntegrationResource } from './codemeta'
import { createDocbeeIntegrationResource } from './docbee'
import { createFreshserviceIntegrationResource } from './freshservice'
import { createHalopsaIntegrationResource } from './halopsa'
import { createHuduIntegrationResource } from './hudu'
import { createInserveIntegrationResource } from './inserve'
import { createItglueIntegrationResource } from './itglue'
import { createJiraIntegrationResource } from './jira'
import { createLywandIntegrationResource } from './lywand'
import { createNovastorIntegrationResource } from './novastor'
import { createOdooIntegrationResource } from './odoo'
import { createSecurepointIntegrationResource } from './securepoint'
import { createServiceboardIntegrationResource } from './serviceboard'
import { createTanssIntegrationResource } from './tanss'
import { createTopdeskIntegrationResource } from './topdesk'
import { createUnifiIntegrationResource } from './unifi'
import { createWoasiIntegrationResource } from './woasi'
import { createZammadIntegrationResource } from './zammad'

/**
 * Third-party integrations (PSA, documentation, backup, security, network),
 * one sub-resource per vendor.
 */
export function createIntegrationsResource(client: Client) {
	return {
		acronis: createAcronisIntegrationResource(client),
		autotask: createAutotaskIntegrationResource(client),
		bitdefender: createBitdefenderIntegrationResource(client),
		codemeta: createCodemetaIntegrationResource(client),
		docbee: createDocbeeIntegrationResource(client),
		freshservice: createFreshserviceIntegrationResource(client),
		halopsa: createHalopsaIntegrationResource(client),
		hudu: createHuduIntegrationResource(client),
		inserve: createInserveIntegrationResource(client),
		itglue: createItglueIntegrationResource(client),
		jira: createJiraIntegrationResource(client),
		lywand: createLywandIntegrationResource(client),
		novastor: createNovastorIntegrationResource(client),
		odoo: createOdooIntegrationResource(client),
		securepoint: createSecurepointIntegrationResource(client),
		serviceboard: createServiceboardIntegrationResource(client),
		tanss: createTanssIntegrationResource(client),
		topdesk: createTopdeskIntegrationResource(client),
		unifi: createUnifiIntegrationResource(client),
		woasi: createWoasiIntegrationResource(client),
		zammad: createZammadIntegrationResource(client),
	}
}

export type IntegrationsResource = ReturnType<typeof createIntegrationsResource>
