export enum AuthorRole {
  Recruiter = 1,
  Applicant = 2,
}

// Alineado con el backend (0,1,2)
export enum Visibility {
  Public = 1,
  ParticipantsOnly = 2,
  PrivateToRecipient = 3,
}

export interface MessageReplyDto {
  id: number;
  text: string;
  date: string;            // "dd/MM/yyyy HH:mm"
  authorRole: AuthorRole;
}

export interface MessageDto {
  id: number;
  date: string;            // "dd/MM/yyyy HH:mm"
  message: string;
  typeId: number;          // FK a catálogo (Info=1, etc.)
  typeName: string;
  authorRole: AuthorRole;
  visibility: Visibility;
  recipientUserId?: number | null;
  replies: MessageReplyDto[];
}

export interface PagedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
}

// Body requests
export interface CreateMessageRequest {
  text: string;
  typeId: number;
  visibility: Visibility;
  recipientUserId: number;
}

export interface CreateReplyRequest {
  text: string;
}
