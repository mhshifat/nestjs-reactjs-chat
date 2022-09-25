import { MessagesPanelBodyStyle, MessagesPanelStyle } from "../../utils/styles";
import { Message } from "../../utils/types";
import MessageInputField from "./MessageInputField";
import MessagesContainer from "./MessagesContainer";
import MessagePanelHeader from "./MessagePanelHeader";
import { FormEvent, useCallback, useState } from "react";
import { postNewMessage } from "../../utils/api";
import { useParams } from "react-router-dom";

interface Props {
	messages: Message[];
}

export default function MessagesPanel({ messages }: Props) {
	const { id } = useParams();
	const [message, setMessage] = useState("");

	const sendMessage = useCallback(
		async (e: FormEvent) => {
			e.preventDefault();
			if (!id || !message) return;
			try {
				await postNewMessage({
					content: message,
					conversationId: +id,
				});
				setMessage("");
			} catch (err) {
				console.error(err);
			}
		},
		[message, id]
	);
	return (
		<MessagesPanelStyle>
			<MessagePanelHeader />
			<MessagesPanelBodyStyle>
				<MessagesContainer messages={messages} />
				<MessageInputField
					message={message}
					setMessage={setMessage}
					sendMessage={sendMessage}
				/>
			</MessagesPanelBodyStyle>
		</MessagesPanelStyle>
	);
}
