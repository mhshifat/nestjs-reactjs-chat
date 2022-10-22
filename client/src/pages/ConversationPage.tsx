import { useContext, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import ConversationSidebar from "../components/conversations/ConversationSidebar";
import { AppDisopatch } from "../store";
import { addConversation, fetchConversationsThunk, updateConversation } from "../store/conversationsSlice";
import { addMessage, modifyMessage, removeMessage } from "../store/messagesSlice";
import { SocketContext } from "../utils/contexts/SocketContext";
import { Page } from "../utils/styles";
import { Conversation, Message, MessageEventPayload } from "../utils/types";

export default function ConversationPage() {
	const dispatch = useDispatch<AppDisopatch>();
	const dispatchRef = useRef(dispatch);
  const socket = useContext(SocketContext);
	const socketRef = useRef(socket);

	useEffect(() => {
		dispatchRef.current?.(fetchConversationsThunk()).catch(console.error);
	}, []);

  useEffect(() => {
    const connectListener = socketRef.current?.on("connected", () =>
			console.log("Connected")
		);
		const onMessageListener = socketRef.current?.on(
			"onMessage",
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
			"onMessageDelete",
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
			"onMessageUpdate",
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
			onMessageListener.off("onMessage");
			onConversationListener.off("onConversation");
			onMessageDeleteListener.off("onMessageDelete");
			onMessageUpdateListener.off("onMessageUpdate");
		};
	}, []);

	return (
		<Page>
			<ConversationSidebar />
			<Outlet />
		</Page>
	);
}
