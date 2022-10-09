import { useCallback, useContext, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import MessagesPanel from "../components/messages/MessagesPanel";
import { AppDisopatch } from "../store";
import { updateConversation } from "../store/conversationsSlice";
import { addMessage, fetchMessagesThunk } from "../store/messagesSlice";
import { SocketContext } from "../utils/contexts/SocketContext";
import { CoversationChannelPage } from "../utils/styles";
import { MessageEventPayload } from "../utils/types";

export default function ConversationChannelPage() {
	const { id } = useParams();
	const dispatch = useDispatch<AppDisopatch>();
	const dispatchRef = useRef(dispatch);
	const socket = useContext(SocketContext);
	const socketRef = useRef(socket);

	useEffect(() => {
		if (!id) return;
		dispatchRef.current?.(fetchMessagesThunk(+id));
	}, [id]);

	const sendTypingStatus = useCallback(() => {
		socketRef.current?.emit("onUserTyping", { conversationId: id });
	}, [id]);

	return (
		<CoversationChannelPage>
			<MessagesPanel sendTypingStatus={sendTypingStatus} />
		</CoversationChannelPage>
	);
}
