import { contextBridge, ipcRenderer } from 'electron'
import { IPC } from '@shared/constants/ipc'
import { CreateDocumentResponse, DeleteDocumentResquest, FetchAllDocumentsResponse, FetchDocumentResponse, FetchDocumentResquest, SaveDocumentRequest } from '@shared/types/ipc'

declare global {
  interface Window {
    api: typeof api
  }
}

// Custom APIs for renderer
const api = {
  fetchDocuments(): Promise<FetchAllDocumentsResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.FETCH_ALL);
  },

  fetchDocument(req: FetchDocumentResquest): Promise<FetchDocumentResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.FETCH, req);
  },

  createDocument(): Promise<CreateDocumentResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.CREATE);
  },

  saveDocument(req: SaveDocumentRequest): Promise<void> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.SAVE, req);
  },

  deleteDocument(req: DeleteDocumentResquest): Promise<void> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.DELETE, req);
  },

  onNewDocumentRequest(callback: () => void) {
    ipcRenderer.on('new-document', callback);

    return () => {
      ipcRenderer.off('new-document', callback);
    };
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.api = api
}
