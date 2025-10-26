export interface AuthorizationOptions {
    hasRole: Array<"Adomin" | "manager" | "officer" | "user">;
    allowSameUser?: boolean;
}