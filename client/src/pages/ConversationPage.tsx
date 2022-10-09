import { useContext, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import ConversationSidebar from "../components/conversations/ConversationSidebar";
import { AppDisopatch } from "../store";
import { fetchConversationsThunk, updateConversation } from "../store/conversationsSlice";
import { addMessage } from "../store/messagesSlice";
import { SocketContext } from "../utils/contexts/SocketContext";
import { Page } from "../utils/styles";
import { MessageEventPayload } from "../utils/types";

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

		return () => {
			connectListener.off("connected");
			onMessageListener.off("onMessage");
		};
	}, []);

	return (
		<Page>
			<ConversationSidebar />
			<Outlet />
		</Page>
	);
}
