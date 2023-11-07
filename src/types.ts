type LoginType = {
  username: string;
  password: string;
};

type AccessToken = {
  _id: string;
  access_token: string;
};

type RegisterType = {
  displayName: string;
  photoURL: string;
} & LoginType;

type CreateRoomType = {
  name: string;
  userIds: string[];
  createdBy: string;
  admin: string;
};

type GenericResponse<T> = {
  error: boolean;
  message: string;
  statusCode: number;
  data?: T;
};

type User = {
  _id?: string;
  username?: string;
  displayName?: string;
  photoURL?: string;
};

type Room = {
  _id: string;
  name: string;
  userIds: string[];
  createdBy: string;
  admin: string;
  createdAt?: Date;
};

type Message = {
  roomId: string;
  content: string;
  senderId: string;
  recipientIds: string[];
  createdAt?: Date;
};

type MessageRecipient = {
  messageId: string;
  recipientId: string;
  isRead: boolean;
  createdAt?: Date;
};
