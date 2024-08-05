export interface IUser {
  createdAt?: string;
  name?: string;
  profilePicture?: string;
  email?: string;
  password?: string;
  role?: string;
  experience?: number;
  dob?: string;
  joiningDate?: string;
  phone?: string;
  address?: string;
  company?: string;
  companyAddress?: string;
  department?: string;
  id?: string;
  logo?: string;
  workspaceId?: string;
  isSubmitted?: boolean;
  deactive?: boolean;
}

export interface IWorkspace {
  logo?: string;
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  address?: string;
  id?: string;
  deactive?: boolean;
}
