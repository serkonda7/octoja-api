import type { Client } from '../../generated/client/types.gen'
import { getAuditLog } from '../../generated/sdk.gen'
import type { GetAuditLogData, GetAuditLogResponse } from '../../generated/types.gen'
import { ensureData } from '../../shared/errors'

export type AuditLogListQuery = GetAuditLogData['query']

/**
 * Audit log: paginated, filterable trail of actions recorded in Octoja.
 */
export function createAuditResource(client: Client) {
	return {
		/**
		 * List audit log entries, optionally filtered and paginated.
		 */
		async list(query?: AuditLogListQuery): Promise<GetAuditLogResponse> {
			return ensureData(await getAuditLog({ query, client }), 'octoja.audit.list')
		},
	}
}

export type AuditResource = ReturnType<typeof createAuditResource>
