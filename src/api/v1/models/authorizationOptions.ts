export interface AuthorizationOptions {
    hasRole: Array<"manager" | "officer" | "user">;
    allowSameUser?: boolean;
}