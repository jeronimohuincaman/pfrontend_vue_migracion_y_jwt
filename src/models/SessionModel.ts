export interface Session {
    token: string;
    createDate: Date;
    refreshDate: Date;
    expirationDate: Date;
}