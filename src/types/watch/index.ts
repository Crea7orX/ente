import { ElectronFile } from 'types/upload';

export interface WatchMapping {
    collectionName: string;
    folderPath: string;
    files: {
        path: string;
        id: number;
    }[];
}

export interface EventQueueItem {
    type: 'upload' | 'trash';
    collectionName: string;
    paths?: string[];
    files?: ElectronFile[];
}
