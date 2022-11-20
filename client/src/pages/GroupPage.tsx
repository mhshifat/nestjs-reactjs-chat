import { useContext, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import ConversationSidebar from "../components/conversations/ConversationSidebar";
import { AppDisopatch } from "../store";
import { addConversation, updateConversation } from "../store/conversationsSlice";
import { setType } from "../store/selectedSlice";
import { fetchGroupsThunk } from "../store/groupSlice";
import { addMessage, modifyMessage, removeMessage } from "../store/messagesSlice";
import { SocketContext } from "../utils/contexts/SocketContext";
import { Page } from "../utils/styles";
import { Conversation, Message, MessageEventPayload } from "../utils/types";

export default function GroupPage() {
	const dispatch = useDispatch<AppDisopatch>();
	const dispatchRef = useRef(dispatch);
  const socket = useContext(SocketContext);
	const socketRef = useRef(socket);

	useEffect(() => {
		dispatchRef.current?.(setType("group"));
		dispatchRef.current?.(fetchGroupsThunk()).catch(console.error);
	}, []);

  useEffect(() => {
    const connectListener = socketRef.current?.on("connected", () =>
			console.log("Connected")
		);
		const onMessageListener = socketRef.current?.on(
			"onGroupMessage",
			({ conversation, ...message }: MessageEventPayload) => {
				dispatchRef.current?.(
					updateConversation({ conversationId: conversation.id, message })
				);
				dispatchRef.current?.(
					addMessage({ conversationId: conversation.id, message })
				);
			}
		);
		const onConversationListener = socketRef.current?.on(
			"onConversation",
			(payload: Conversation) => {
				dispatchRef.current?.(
					addConversation(payload)
				);
			}
		);
		const onMessageDeleteListener = socketRef.current?.on(
			"onGroupMessageDelete",
			(payload: { message: Message, conversation: Conversation }) => {
				dispatchRef.current?.(
					removeMessage(payload)
				);
				dispatchRef.current?.(
					updateConversation({ conversationId: payload.conversation.id, message: payload.conversation.lastMessageSent! })
				);
			}
		);
		const onMessageUpdateListener = socketRef.current?.on(
			"onGroupMessageUpdate",
			(payload: { message: Message, conversation: Conversation }) => {
				dispatchRef.current?.(
					modifyMessage(payload.message)
				);
        if (payload.conversation.lastMessageSent?.id === payload.message.id) {
          dispatchRef.current?.(
            updateConversation({ conversationId: payload.conversation.id, message: payload.message })
          );
        }
			}
		);

		return () => {
			connectListener.off("connected");
			onMessageListener.off("onGroupMessage");
			onConversationListener.off("onConversation");
			onMessageDeleteListener.off("onGroupMessageDelete");
			onMessageUpdateListener.off("onGroupMessageUpdate");
		};
	}, []);

	return (
		<Page>
			<ConversationSidebar />
			<Outlet />
		</Page>
	);
}
