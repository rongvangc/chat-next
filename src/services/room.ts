import { AxiosError } from "axios";
import axiosClient from "./config";

type CreateRoomResponse = GenericResponse<{
  status?: boolean;
  data?: Room;
}>;

type GetRoomResponse = GenericResponse<{
  status?: boolean;
  data?: Room[];
}>;

type SaveMessageResponse = GenericResponse<{
  status?: boolean;
  data?: Message;
}>;

type GetRoomMessageResponse = GenericResponse<{
  status?: boolean;
  data?: MessageReceiver[];
}>;

export const getRooms = async (): Promise<GetRoomResponse> => {
  try {
    const data = await axiosClient.get<null, GetRoomResponse>("/room");

    return data;
  } catch (error) {
    const err = error as AxiosError;
    const data = err.response?.data as GetRoomResponse;
    return data || { error: "Error occurred" };
  }
};

export const getRoomById = async (id: string): Promise<GetRoomResponse> => {
  try {
    const data = await axiosClient.get<{ id: string }, GetRoomResponse>(
      `/room/${id}`
    );

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

export const getRoomMessage = async (
  id: string
): Promise<GetRoomMessageResponse> => {
  try {
    const data = await axiosClient.get<{ id: string }, GetRoomMessageResponse>(
      `/message/${id}`
    );

    return data;
  } catch (error) {
    const err = error as AxiosError;
    const data = err.response?.data as GetRoomMessageResponse;
    return data || { error: "Error occurred" };
  }
};

export const saveRoomMessage = async (
  messageData: Message
): Promise<SaveMessageResponse> => {
  try {
    const data = await axiosClient.post<Message, SaveMessageResponse>(
      `/message`,
      messageData
    );

    return data;
  } catch (error) {
    const err = error as AxiosError;
    const data = err.response?.data as SaveMessageResponse;
    return data || { error: "Error occurred" };
  }
};

export const readRoomMessage = async (
  readMessageData: ReadMessageData
): Promise<SaveMessageResponse> => {
  try {
    const data = await axiosClient.post<ReadMessageData, SaveMessageResponse>(
      `/message/read`,
      readMessageData
    );

    return data;
  } catch (error) {
    const err = error as AxiosError;
    const data = err.response?.data as SaveMessageResponse;
    return data || { error: "Error occurred" };
  }
};
