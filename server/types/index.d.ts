export type BackupAddData = {
    name: string;
    codes: string[];
}

export type CodeStatus = 'active' | 'used' | 'expired';