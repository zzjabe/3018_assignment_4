export interface AuthorizationOptions {
    hasRole: Array<"admin" | "manager" | "officer" | "user">;
    allowSameUser?: boolean;
}