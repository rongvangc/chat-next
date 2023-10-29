type LoginType = {
  username: string;
  password: string;
};

type AccessToken = {
  id: string;
  access_token: string;
};

type RegisterType = {
  displayName: string;
  file: Blob | Uint8Array | ArrayBuffer;
} & LoginType;

type CreateRoomType = {
  name: string;
  users: User[];
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
  id?: string;
  username?: string;
  displayName?: string;
  photoURL?: string;
};

type Room = {
  name: string;
  users: User[];
  createdBy: string;
  admin: string;
  messages: Message[];
  createdAt: Date;
};

type Message = {
  content: string;
  sender: User;
  recipients: MessageRecipient[];
  createdAt: Date;
};

type MessageRecipient = {
  messageId: string;
  recipientId: string;
  isRead: boolean;
  createdAt: Date;
};
