import type { APIError, ErrorEntry, User } from "altogic";

export interface LoginFormData {
  email: string;
  password: string;
  responseMessage?: string;
}

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  responseMessage?: string;
}

export interface CreateTopicData {
  title: string;
  content: string;
}

export interface UpdateProfileData {
  name?: string;
}

export interface ITopic {
  _id: string;
  title: string;
  slug: string;
  content: string;
  author?: User;
  createdAt: Date;
  updatedAt: Date;
  viewCount: number;
  entryCount: number;
}

export interface IEntry {
  _id: string;
  content: string;
  author: User;
  topic: ITopic;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser extends User {
  username: string;
}

interface Item extends ErrorEntry {
  details?: {
    field?: string;
  }
} 

export interface ResponseError extends APIError {
  items: Item[];
}