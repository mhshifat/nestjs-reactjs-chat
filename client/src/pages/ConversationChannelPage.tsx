import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import MessagesPanel from "../components/messages/MessagesPanel";
import { getConversationMessages } from "../utils/api";
import { SocketContext } from "../utils/contexts/SocketContext";
import { CoversationChannelPage } from "../utils/styles";
import { Message, MessageEventPayload } from "../utils/types";

export default function ConversationChannelPage() {
	const { id } = useParams();
	const socket = useContext(SocketContext);
	const socketRef = useRef(socket);
	const [messages, setMessages] = useState<Message[]>([]);

	useEffect(() => {
		if (!id) return;
		const controller = new AbortController();
		getConversationMessages(+id, controller)
			.then(({ data }) => setMessages(data))
			.catch(console.error);

		return () => controller.abort();
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
			<MessagesPanel messages={messages} />
		</CoversationChannelPage>
	);
}
