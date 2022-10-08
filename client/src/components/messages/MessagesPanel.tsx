import { MessagesPanelBodyStyle, MessagesPanelStyle } from "../../utils/styles";
import { Message } from "../../utils/types";
import MessageInputField from "./MessageInputField";
import MessagesContainer from "./MessagesContainer";
import MessagePanelHeader from "./MessagePanelHeader";
import { FormEvent, useCallback, useState } from "react";
import { postNewMessage } from "../../utils/api";
import { useParams } from "react-router-dom";

interface Props {
	sendTypingStatus: () => void;
}

export default function MessagesPanel({ sendTypingStatus }: Props) {
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
				<MessagesContainer />
				<MessageInputField
					message={message}
					setMessage={setMessage}
					sendMessage={sendMessage}
					sendTypingStatus={sendTypingStatus}
				/>
			</MessagesPanelBodyStyle>
		</MessagesPanelStyle>
	);
}
