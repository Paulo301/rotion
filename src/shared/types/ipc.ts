export interface Document {
  id: string;
  title: string;
  content?: string;
}

/**
 * Request
 */

export type SaveDocumentRequest = Document; 

export interface FetchDocumentResquest {
  id: string;
}

export interface DeleteDocumentResquest {
  id: string;
}

/**
 * Response
 */

export interface FetchAllDocumentsResponse {
  data: Document[];
}

export interface FetchDocumentResponse {
  data: Document;
}

export interface CreateDocumentResponse {
  data: Document;
}