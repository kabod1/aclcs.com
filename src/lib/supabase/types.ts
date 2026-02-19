export type UserRole = "admin" | "client";
export type UserStatus = "active" | "pending" | "suspended";
export type CaseType = "cyprus" | "europe" | "outside-europe";
export type CaseStatus =
  | "enquiry"
  | "documents_required"
  | "under_review"
  | "submitted"
  | "approved"
  | "completed";
export type DocumentCategory = "required" | "submitted" | "issued";
export type NotificationType = "info" | "success" | "warning" | "action";

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  nationality: string | null;
  role: UserRole;
  status: UserStatus;
  created_at: string;
  updated_at: string;
}

export interface Case {
  id: string;
  client_id: string;
  reference_number: string;
  title: string;
  type: CaseType;
  status: CaseStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
  // joined
  client?: Profile;
}

export interface CaseUpdate {
  id: string;
  case_id: string;
  author_id: string;
  content: string;
  is_internal: boolean;
  created_at: string;
  // joined
  author?: Profile;
}

export interface Document {
  id: string;
  case_id: string;
  name: string;
  file_path: string;
  uploaded_by: string;
  category: DocumentCategory;
  size: number;
  mime_type: string;
  created_at: string;
  // joined
  case?: Case;
  uploader?: Profile;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  link: string | null;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, "created_at" | "updated_at">;
        Update: Partial<Omit<Profile, "id" | "created_at" | "updated_at">>;
      };
      cases: {
        Row: Case;
        Insert: Omit<Case, "id" | "reference_number" | "created_at" | "updated_at" | "client">;
        Update: Partial<Omit<Case, "id" | "reference_number" | "created_at" | "updated_at" | "client">>;
      };
      case_updates: {
        Row: CaseUpdate;
        Insert: Omit<CaseUpdate, "id" | "created_at" | "author">;
        Update: Partial<Omit<CaseUpdate, "id" | "created_at" | "author">>;
      };
      documents: {
        Row: Document;
        Insert: Omit<Document, "id" | "created_at" | "case" | "uploader">;
        Update: Partial<Omit<Document, "id" | "created_at" | "case" | "uploader">>;
      };
      notifications: {
        Row: Notification;
        Insert: Omit<Notification, "id" | "created_at">;
        Update: Partial<Omit<Notification, "id" | "created_at" | "user_id">>;
      };
    };
  };
}
