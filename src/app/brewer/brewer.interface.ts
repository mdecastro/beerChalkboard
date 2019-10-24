import { Subscription } from 'rxjs';

export interface BrewerInt {
    id?: string;
    name: string;
    city: string;
    logo: string
}

export interface FileUploadModel {
    data: File;
    state: string;
    inProgress: boolean;
    progress: number;
    canRetry: boolean;
    canCancel: boolean;
    sub?: Subscription;
}