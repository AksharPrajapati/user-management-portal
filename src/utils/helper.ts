import axios from "axios";
import { IUser, IWorkspace } from "./interface";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const AuthUser = async (userData: IUser) => {
  try {
    const users = await getUsers();
    const authUser = users.find((user: IUser) => user.email === userData.email);

    if (authUser?.deactive === true && authUser?.role === "employee") {
      throw new Error("Your account has been deactivated");
    }

    if (!authUser || authUser.password !== userData.password) {
      throw new Error("Please check your email or password");
    }
    return authUser;
  } catch (error: any) {
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/users`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
};

export const getUser = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw error;
  }
};

export const createUser = async (userData: IUser) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/users`, userData);
    return response.data;
  } catch (error) {
    console.error("Failed to create user:", error);
    throw error;
  }
};

export const updateUser = async (id: string, userData: IUser) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error("Failed to update user:", error);
    throw error;
  }
};

export const getWorkspaces = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/workspaces`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch workspaces:", error);
    throw error;
  }
};

export const getWorkspace = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/workspaces/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch workspace:", error);
    throw error;
  }
};

export const createWorkspace = async (workspaceData: IWorkspace) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/workspaces`,
      workspaceData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to create Workspace:", error);
    throw error;
  }
};

export const updatehWorkspace = async (id: string, values: IWorkspace) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/api/workspaces/${id}`,
      values
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update Workspace:", error);
    throw error;
  }
};
