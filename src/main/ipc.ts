import { ipcMain } from "electron";
import { IPC } from "@shared/constants/ipc";
import { CreateDocumentResponse, DeleteDocumentResquest, Document, FetchAllDocumentsResponse, FetchDocumentResponse, FetchDocumentResquest, SaveDocumentRequest } from "@shared/types/ipc";
import { store } from "./store";
import { randomUUID } from "crypto";

ipcMain.handle(IPC.DOCUMENTS.FETCH_ALL, async (): Promise<FetchAllDocumentsResponse> => {
  return {
    data: Object.values(store.get('documents')),
  }
});

ipcMain.handle(IPC.DOCUMENTS.FETCH, 
  async (_, { id }: FetchDocumentResquest): Promise<FetchDocumentResponse> => {
    const document: Document = store.get(`documents.${id}`);

    return {
      data: document,
    }
});

ipcMain.handle(IPC.DOCUMENTS.CREATE, async (): Promise<CreateDocumentResponse> => {
  const id = randomUUID();

  const document: Document = {
    id,
    title: "Untitled",
  };

  store.set(`documents.${id}`, document);

  return {
    data: document,
  }
});

ipcMain.handle(IPC.DOCUMENTS.SAVE, 
  async (_, { id, title, content }: SaveDocumentRequest): Promise<void> => {
    store.set(`documents.${id}`, {
      id, 
      title, 
      content,
    });
});

ipcMain.handle(IPC.DOCUMENTS.DELETE, 
  async (_, { id }: DeleteDocumentResquest): Promise<void> => {
    // @ts-ignore
    store.delete(`documents.${id}`);
});