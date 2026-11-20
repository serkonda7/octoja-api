import type { Client } from '../../generated/client/types.gen'
import { deleteSettingsMcpClientsById, getSettingsMcpClients } from '../../generated/sdk.gen'
import type { GetSettingsMcpClientsResponse } from '../../generated/types.gen'
import { ensureData, ensureSuccess } from '../../shared/errors'

/**
 * Connected MCP clients: list active connections and disconnect one by id.
 */
export function createMcpClientsResource(client: Client) {
	return {
		/**
		 * List the currently connected MCP clients.
		 */
		async list(): Promise<GetSettingsMcpClientsResponse> {
			return ensureData(await getSettingsMcpClients({ client }), 'octoja.mcpClients.list')
		},
		/**
		 * Disconnect the MCP client identified by `id`.
		 */
		async remove(id: string): Promise<void> {
			ensureSuccess(
				await deleteSettingsMcpClientsById({ path: { id }, client }),
				'octoja.mcpClients.remove',
			)
		},
	}
}

export type McpClientsResource = ReturnType<typeof createMcpClientsResource>
