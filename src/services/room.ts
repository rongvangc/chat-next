import { AxiosError } from "axios";
import axiosClient from "./config";

type CreateRoomResponse = GenericResponse<{
  status?: boolean;
  data?: CreateRoomType;
}>;

type GetRoomResponse = GenericResponse<{
  status?: boolean;
  data?: CreateRoomType;
}>;

export const getRooms = async (): Promise<GetRoomResponse> => {
  try {
    const { data } = await axiosClient.get<GetRoomResponse>("/room");

    return data;
  } catch (error) {
    const err = error as AxiosError;
    const data = err.response?.data as GetRoomResponse;
    return data || { error: "Error occurred" };
  }
};

export const createRoom = async (
  roomData: CreateRoomType
): Promise<CreateRoomResponse> => {
  try {
    const data = await axiosClient.post<CreateRoomType, CreateRoomResponse>(
      "/room",
      roomData
    );

    return data;
  } catch (error) {
    const err = error as AxiosError;
    const data = err.response?.data as CreateRoomResponse;
    return data || { error: "Error occurred" };
  }
};
