import { createContext, Dispatch, SetStateAction } from "react";
import { Message } from "../types";

type MessageMenuContextType = {
	message: Message | null;
	setMessage: Dispatch<SetStateAction<Message | null>>;
	editMessage: Message | null;
	setEditMessage: Dispatch<SetStateAction<Message | null>>;
};

export const MessageMenuContext = createContext<MessageMenuContextType>({
  message: null,
  setMessage: () => {},
  editMessage: null,
  setEditMessage: () => {}
});
