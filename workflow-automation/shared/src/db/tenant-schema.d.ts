export declare const users: import("drizzle-orm/sqlite-core").SQLiteTableWithColumns<{
    name: "users";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "id";
            tableName: "users";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        hrworksPersonId: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "hrworks_person_id";
            tableName: "users";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        email: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "email";
            tableName: "users";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        firstName: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "first_name";
            tableName: "users";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        lastName: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "last_name";
            tableName: "users";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        role: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "role";
            tableName: "users";
            dataType: "string";
            columnType: "SQLiteText";
            data: "admin" | "editor" | "viewer";
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: ["admin", "editor", "viewer"];
            baseColumn: never;
        }, object>;
        isActive: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "is_active";
            tableName: "users";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
        lastLoginAt: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "last_login_at";
            tableName: "users";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
        createdAt: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "created_at";
            tableName: "users";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
        updatedAt: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "updated_at";
            tableName: "users";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
    };
    dialect: "sqlite";
}>;
export declare const syncedPersons: import("drizzle-orm/sqlite-core").SQLiteTableWithColumns<{
    name: "synced_persons";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "id";
            tableName: "synced_persons";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        hrworksPersonnelNumber: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "hrworks_personnel_number";
            tableName: "synced_persons";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        firstName: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "first_name";
            tableName: "synced_persons";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        lastName: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "last_name";
            tableName: "synced_persons";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        email: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "email";
            tableName: "synced_persons";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        organizationUnitId: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "organization_unit_id";
            tableName: "synced_persons";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        position: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "position";
            tableName: "synced_persons";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        status: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "status";
            tableName: "synced_persons";
            dataType: "string";
            columnType: "SQLiteText";
            data: "active" | "inactive" | "pending";
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: ["active", "inactive", "pending"];
            baseColumn: never;
        }, object>;
        rawData: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "raw_data";
            tableName: "synced_persons";
            dataType: "json";
            columnType: "SQLiteTextJson";
            data: Record<string, unknown>;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
        lastSyncedAt: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "last_synced_at";
            tableName: "synced_persons";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
        createdAt: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "created_at";
            tableName: "synced_persons";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
        updatedAt: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "updated_at";
            tableName: "synced_persons";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
    };
    dialect: "sqlite";
}>;
export declare const syncedOrganizationUnits: import("drizzle-orm/sqlite-core").SQLiteTableWithColumns<{
    name: "synced_organization_units";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "id";
            tableName: "synced_organization_units";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        hrworksOrgUnitId: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "hrworks_org_unit_id";
            tableName: "synced_organization_units";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        name: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "name";
            tableName: "synced_organization_units";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        parentId: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "parent_id";
            tableName: "synced_organization_units";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        costCenter: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "cost_center";
            tableName: "synced_organization_units";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        managerId: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "manager_id";
            tableName: "synced_organization_units";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        level: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "level";
            tableName: "synced_organization_units";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
        rawData: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "raw_data";
            tableName: "synced_organization_units";
            dataType: "json";
            columnType: "SQLiteTextJson";
            data: Record<string, unknown>;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
        lastSyncedAt: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "last_synced_at";
            tableName: "synced_organization_units";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
        createdAt: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "created_at";
            tableName: "synced_organization_units";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
        updatedAt: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "updated_at";
            tableName: "synced_organization_units";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
    };
    dialect: "sqlite";
}>;
export declare const workflows: import("drizzle-orm/sqlite-core").SQLiteTableWithColumns<{
    name: "workflows";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "id";
            tableName: "workflows";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        name: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "name";
            tableName: "workflows";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        description: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "description";
            tableName: "workflows";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        status: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "status";
            tableName: "workflows";
            dataType: "string";
            columnType: "SQLiteText";
            data: "active" | "inactive" | "draft" | "archived";
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: ["draft", "active", "inactive", "archived"];
            baseColumn: never;
        }, object>;
        definition: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "definition";
            tableName: "workflows";
            dataType: "json";
            columnType: "SQLiteTextJson";
            data: WorkflowDefinitionJson;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
        version: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "version";
            tableName: "workflows";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
        createdBy: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "created_by";
            tableName: "workflows";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        updatedBy: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "updated_by";
            tableName: "workflows";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        createdAt: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "created_at";
            tableName: "workflows";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
        updatedAt: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "updated_at";
            tableName: "workflows";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
    };
    dialect: "sqlite";
}>;
export declare const workflowExecutions: import("drizzle-orm/sqlite-core").SQLiteTableWithColumns<{
    name: "workflow_executions";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "id";
            tableName: "workflow_executions";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        workflowId: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "workflow_id";
            tableName: "workflow_executions";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        status: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "status";
            tableName: "workflow_executions";
            dataType: "string";
            columnType: "SQLiteText";
            data: "pending" | "running" | "completed" | "failed" | "cancelled";
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: ["pending", "running", "completed", "failed", "cancelled"];
            baseColumn: never;
        }, object>;
        triggeredBy: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "triggered_by";
            tableName: "workflow_executions";
            dataType: "string";
            columnType: "SQLiteText";
            data: "manual" | "scheduled" | "webhook";
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: ["manual", "scheduled", "webhook"];
            baseColumn: never;
        }, object>;
        triggeredByUserId: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "triggered_by_user_id";
            tableName: "workflow_executions";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        context: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "context";
            tableName: "workflow_executions";
            dataType: "json";
            columnType: "SQLiteTextJson";
            data: ExecutionContextJson;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
        error: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "error";
            tableName: "workflow_executions";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        startedAt: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "started_at";
            tableName: "workflow_executions";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
        completedAt: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "completed_at";
            tableName: "workflow_executions";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
        createdAt: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "created_at";
            tableName: "workflow_executions";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
        updatedAt: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "updated_at";
            tableName: "workflow_executions";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
    };
    dialect: "sqlite";
}>;
export interface WorkflowDefinitionJson {
    nodes: Array<{
        id: string;
        type: string;
        name: string;
        position: {
            x: number;
            y: number;
        };
        config: Record<string, unknown>;
    }>;
    edges: Array<{
        id: string;
        source: string;
        target: string;
        sourceHandle?: string;
        targetHandle?: string;
    }>;
    variables?: Record<string, unknown>;
}
export interface ExecutionContextJson {
    workflowId: string;
    executionId: string;
    variables: Record<string, unknown>;
    nodeResults: Record<string, NodeExecutionResultJson>;
    trigger?: {
        type: string;
        payload?: Record<string, unknown>;
    };
}
export interface NodeExecutionResultJson {
    nodeId: string;
    status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
    output?: unknown;
    error?: string;
    startedAt: string;
    completedAt?: string;
    duration?: number;
}
export type UserRecord = typeof users.$inferSelect;
export type NewUserRecord = typeof users.$inferInsert;
export type SyncedPersonRecord = typeof syncedPersons.$inferSelect;
export type NewSyncedPersonRecord = typeof syncedPersons.$inferInsert;
export type SyncedOrgUnitRecord = typeof syncedOrganizationUnits.$inferSelect;
export type NewSyncedOrgUnitRecord = typeof syncedOrganizationUnits.$inferInsert;
export type WorkflowRecord = typeof workflows.$inferSelect;
export type NewWorkflowRecord = typeof workflows.$inferInsert;
export type WorkflowExecutionRecord = typeof workflowExecutions.$inferSelect;
export type NewWorkflowExecutionRecord = typeof workflowExecutions.$inferInsert;
//# sourceMappingURL=tenant-schema.d.ts.map