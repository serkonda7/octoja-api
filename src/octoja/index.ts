import type { Client } from '../generated/client/types.gen'
import {
	type CreateOctojaClientOptions,
	createOctojaClientInstance,
	getOctojaClientToken,
	setOctojaClientToken,
} from './client'
import { type AboutResource, createAboutResource } from './resources/about'
import {
	type AccessOverviewResource,
	createAccessOverviewResource,
} from './resources/accessOverview'
import { type AgentsResource, createAgentsResource } from './resources/agents'
import { type AlertsResource, createAlertsResource } from './resources/alerts'
import { type AssetLogsResource, createAssetLogsResource } from './resources/assetLogs'
import { type AssetsResource, createAssetsResource } from './resources/assets'
import { type AuditResource, createAuditResource } from './resources/audit'
import { type AuthResource, createAuthResource } from './resources/auth'
import { type AutomationsResource, createAutomationsResource } from './resources/automations'
import { type BrandingResource, createBrandingResource } from './resources/branding'
import {
	type CheckAssignmentsResource,
	createCheckAssignmentsResource,
} from './resources/checkAssignments'
import {
	type ConfigPackagesResource,
	createConfigPackagesResource,
} from './resources/configPackages'
import { type CustomChecksResource, createCustomChecksResource } from './resources/customChecks'
import { type CustomersResource, createCustomersResource } from './resources/customers'
import { type CustomFieldsResource, createCustomFieldsResource } from './resources/customFields'
import {
	type CustomPackagesResource,
	createCustomPackagesResource,
} from './resources/customPackages'
import { createDashboardResource, type DashboardResource } from './resources/dashboard'
import { createGroupsResource, type GroupsResource } from './resources/groups'
import {
	createInstanceSettingsResource,
	type InstanceSettingsResource,
} from './resources/instanceSettings'
import {
	createIntegrationsResource,
	type IntegrationsResource,
} from './resources/integrations/index'
import { createInventoryResource, type InventoryResource } from './resources/inventory'
import { createMcpClientsResource, type McpClientsResource } from './resources/mcpClients'
import {
	createMobileNotificationGroupsResource,
	type MobileNotificationGroupsResource,
} from './resources/mobileNotificationGroups'
import {
	createMonitoringChecksResource,
	type MonitoringChecksResource,
} from './resources/monitoringChecks'
import {
	createNetworkDiscoveryResource,
	type NetworkDiscoveryResource,
} from './resources/networkDiscovery'
import { createNotificationsResource, type NotificationsResource } from './resources/notifications'
import {
	createPatchManagementResource,
	type PatchManagementResource,
} from './resources/patchManagement'
import { createReportsResource, type ReportsResource } from './resources/reports'
import { createRulesResource, type RulesResource } from './resources/rules'
import { createSavedLayoutsResource, type SavedLayoutsResource } from './resources/savedLayouts'
import {
	createSoftwareDeploymentResource,
	type SoftwareDeploymentResource,
} from './resources/softwareDeployment'
import { createTagRulesResource, type TagRulesResource } from './resources/tagRules'
import { createTagsResource, type TagsResource } from './resources/tags'
import { createTeamsResource, type TeamsResource } from './resources/teams'
import { createTicketsResource, type TicketsResource } from './resources/tickets'
import { createTimeEntriesResource, type TimeEntriesResource } from './resources/timeEntries'
import { createUsersResource, type UsersResource } from './resources/users'
import { createWebhooksResource, type WebhooksResource } from './resources/webhooks'

export type { CreateOctojaClientOptions } from './client'
export { createOctojaClientInstance, getOctojaClientToken, setOctojaClientToken } from './client'

/**
 * Namespaced facade over the Octoja technician/API routes (everything except
 * the device-agent `/api/agents/...` routes, see `createAgentClient`).
 *
 * Obtain an instance via `createOctojaClient({ baseUrl, token? })`.
 *
 * All methods return the success body directly and throw an `OctojaApiError`
 * on non-2xx responses — no `{ data, error }` union handling required.
 *
 * ```ts
 * import { createOctojaClient } from 'octoja-api'
 *
 * const octoja = createOctojaClient({ baseUrl: 'https://acme.eu1.octoja.cloud' })
 * await octoja.auth.login({ mailAddress, password })
 *
 * const customers = await octoja.customers.list({ search: 'acme' })
 * ```
 */
export class OctojaClient {
	readonly about: AboutResource
	readonly accessOverview: AccessOverviewResource
	readonly agents: AgentsResource
	readonly alerts: AlertsResource
	readonly assetLogs: AssetLogsResource
	readonly assets: AssetsResource
	readonly audit: AuditResource
	readonly auth: AuthResource
	readonly automations: AutomationsResource
	readonly branding: BrandingResource
	readonly checkAssignments: CheckAssignmentsResource
	readonly configPackages: ConfigPackagesResource
	readonly customChecks: CustomChecksResource
	readonly customFields: CustomFieldsResource
	readonly customPackages: CustomPackagesResource
	readonly customers: CustomersResource
	readonly dashboard: DashboardResource
	readonly groups: GroupsResource
	readonly instanceSettings: InstanceSettingsResource
	readonly integrations: IntegrationsResource
	readonly inventory: InventoryResource
	readonly mcpClients: McpClientsResource
	readonly mobileNotificationGroups: MobileNotificationGroupsResource
	readonly monitoringChecks: MonitoringChecksResource
	readonly networkDiscovery: NetworkDiscoveryResource
	readonly notifications: NotificationsResource
	readonly patchManagement: PatchManagementResource
	readonly reports: ReportsResource
	readonly rules: RulesResource
	readonly savedLayouts: SavedLayoutsResource
	readonly softwareDeployment: SoftwareDeploymentResource
	readonly tagRules: TagRulesResource
	readonly tags: TagsResource
	readonly teams: TeamsResource
	readonly tickets: TicketsResource
	readonly timeEntries: TimeEntriesResource
	readonly users: UsersResource
	readonly webhooks: WebhooksResource

	/**
	 * The underlying isolated hey-api client. Useful for interceptors or
	 * escaping to raw generated SDK functions via `{ client }`.
	 */
	readonly instance: Client

	constructor(client: Client) {
		this.instance = client
		this.about = createAboutResource(client)
		this.accessOverview = createAccessOverviewResource(client)
		this.agents = createAgentsResource(client)
		this.alerts = createAlertsResource(client)
		this.assetLogs = createAssetLogsResource(client)
		this.assets = createAssetsResource(client)
		this.audit = createAuditResource(client)
		this.auth = createAuthResource(client)
		this.automations = createAutomationsResource(client)
		this.branding = createBrandingResource(client)
		this.checkAssignments = createCheckAssignmentsResource(client)
		this.configPackages = createConfigPackagesResource(client)
		this.customChecks = createCustomChecksResource(client)
		this.customFields = createCustomFieldsResource(client)
		this.customPackages = createCustomPackagesResource(client)
		this.customers = createCustomersResource(client)
		this.dashboard = createDashboardResource(client)
		this.groups = createGroupsResource(client)
		this.instanceSettings = createInstanceSettingsResource(client)
		this.integrations = createIntegrationsResource(client)
		this.inventory = createInventoryResource(client)
		this.mcpClients = createMcpClientsResource(client)
		this.mobileNotificationGroups = createMobileNotificationGroupsResource(client)
		this.monitoringChecks = createMonitoringChecksResource(client)
		this.networkDiscovery = createNetworkDiscoveryResource(client)
		this.notifications = createNotificationsResource(client)
		this.patchManagement = createPatchManagementResource(client)
		this.reports = createReportsResource(client)
		this.rules = createRulesResource(client)
		this.savedLayouts = createSavedLayoutsResource(client)
		this.softwareDeployment = createSoftwareDeploymentResource(client)
		this.tagRules = createTagRulesResource(client)
		this.tags = createTagsResource(client)
		this.teams = createTeamsResource(client)
		this.tickets = createTicketsResource(client)
		this.timeEntries = createTimeEntriesResource(client)
		this.users = createUsersResource(client)
		this.webhooks = createWebhooksResource(client)
	}

	/**
	 * Replace (or clear, with `undefined`) the access token without rebuilding
	 * the client. `auth.login` / `auth.refresh` call this automatically.
	 */
	setToken(token: string | undefined): void {
		setOctojaClientToken(this.instance, token)
	}

	/**
	 * The access token currently sent with every request, if any.
	 */
	get token(): string | undefined {
		return getOctojaClientToken(this.instance)
	}
}

/**
 * Create an {@link OctojaClient} with its own isolated hey-api instance.
 */
export function createOctojaClient(options: CreateOctojaClientOptions): OctojaClient {
	return new OctojaClient(createOctojaClientInstance(options))
}
