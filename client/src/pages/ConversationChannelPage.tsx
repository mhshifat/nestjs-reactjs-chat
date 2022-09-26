import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MessagesPanel from "../components/messages/MessagesPanel";
import { AppDisopatch, RootState } from "../store";
import { fetchMessagesThunk } from "../store/messagesSlice";
import { SocketContext } from "../utils/contexts/SocketContext";
import { CoversationChannelPage } from "../utils/styles";
import { Message, MessageEventPayload } from "../utils/types";

export default function ConversationChannelPage() {
	const { id } = useParams();
	const dispatch = useDispatch<AppDisopatch>();
	const dispatchRef = useRef(dispatch);
	const socket = useContext(SocketContext);
	const socketRef = useRef(socket);
	const [messages, setMessages] = useState<Message[]>([]);

	useEffect(() => {
		if (!id) return;
		dispatchRef.current?.(fetchMessagesThunk(+id));
	}, [id]);

	useEffect(() => {
		const connectListener = socketRef.current?.on("connected", () =>
			console.log("Connected")
		);
		const onMessageListener = socketRef.current?.on(
			"onMessage",
			({ conversation, ...message }: MessageEventPayload) =>
				setMessages((prevMsgs) => [message, ...prevMsgs])
		);

		return () => {
			connectListener.off("connected");
			onMessageListener.off("onMessage");
		};
	}, []);

	return (
		<CoversationChannelPage>
			<MessagesPanel />
		</CoversationChannelPage>
	);
}
