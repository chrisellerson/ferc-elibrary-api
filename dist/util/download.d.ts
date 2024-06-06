import { DownloadFileParams } from '../types/DownloadFile';

export type FileInfo = {
    path: string;
    file: string;
    format: string;
};
export declare function downloadFile(params: DownloadFileParams, fileInfo?: Partial<FileInfo>): Promise<void>;
export declare function generatePDF(accessionNumber: string, fileInfo?: Partial<FileInfo>): Promise<void>;
