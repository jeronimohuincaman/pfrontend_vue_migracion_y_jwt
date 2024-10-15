import type { Session } from "./SessionModel";

export interface SessionState {
    loading: boolean;
    data: Session | null;
}