import { AxiosError } from "axios";
import axiosClient from "./config";

type CreateUserResponse = GenericResponse<{ status?: boolean }>;
type SignInResponse = GenericResponse<AccessToken>;
type GetUserResponse = GenericResponse<User>;
type GetUsersResponse = GenericResponse<User[]>;

export const createUser = async (
  userData: RegisterType
): Promise<CreateUserResponse> => {
  try {
    const data = await axiosClient.post<RegisterType, CreateUserResponse>(
      "/auth/create",
      userData
    );

    return data;
  } catch (error) {
    const err = error as AxiosError;
    const data = err.response?.data as CreateUserResponse;
    return data || { error: "Error occurred" };
  }
};

export const signIn = async (userData: LoginType): Promise<SignInResponse> => {
  try {
    const data = await axiosClient.post<LoginType, SignInResponse>(
      "/auth/signin",
      userData
    );

    return data;
  } catch (error) {
    const err = error as AxiosError;
    const data = err.response?.data as SignInResponse;
    return data || { error: "Error occurred" };
  }
};

export const getUser = async (): Promise<GetUserResponse> => {
  try {
    const data = await axiosClient.get<null, GetUserResponse>("/user");

    return data;
  } catch (error) {
    const err = error as AxiosError;
    const data = err.response?.data as GetUserResponse;
    return data || { error: "Error occurred" };
  }
};

export const getAllUsers = async (): Promise<GetUsersResponse> => {
  try {
    const data = await axiosClient.get<null, GetUsersResponse>("/user/all");

    return data;
  } catch (error) {
    const err = error as AxiosError;
    const data = err.response?.data as GetUsersResponse;
    return data || { error: "Error occurred" };
  }
};
