import { AxiosError } from "axios";
import axiosClient from "./config";

type CreateRoomResponse = GenericResponse<{ status?: boolean }>;

export const createRoom = async (
  roomData: CreateRoomType
): Promise<CreateRoomResponse> => {
  try {
    const data = await axiosClient.post<CreateRoomType, CreateRoomResponse>(
      "/room",
      roomData
    );

    console.log("dataaaaaa", data);

    return data;
  } catch (error) {
    const err = error as AxiosError;
    const data = err.response?.data as CreateRoomResponse;
    return data || { error: "Error occurred" };
  }
};
