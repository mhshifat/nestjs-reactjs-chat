import { MessagesPanelBodyStyle, MessagesPanelStyle, MessageTypingStatusStyle } from "../../utils/styles";
import MessageInputField from "./MessageInputField";
import MessagesContainer from "./MessagesContainer";
import MessagePanelHeader from "./MessagePanelHeader";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { postNewMessage } from "../../utils/api";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store"
import useAuth from "../../hooks/useAuth";

interface Props {
	recipientTyping: boolean;
	sendTypingStatus: () => void;
}

export default function MessagesPanel({ sendTypingStatus, recipientTyping }: Props) {
	const { id } = useParams();
	const [message, setMessage] = useState("");
  const conversation = useSelector((state: RootState) => state.conversationsState.conversations.find(con => +con.id === +id!));
  const { user } = useAuth();

  useEffect(() => {
    setMessage("");
  }, [id])

	const recipient = useMemo(
		() => {
			return user?.id === conversation?.creator.id ? conversation?.recipient : conversation?.creator;
		},
		[conversation?.creator, conversation?.recipient, user?.id]
	);
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
        <MessageTypingStatusStyle>{recipientTyping ? `${recipient?.firstName + " " + recipient?.lastName} is typing...` : ""}</MessageTypingStatusStyle>
			</MessagesPanelBodyStyle>
		</MessagesPanelStyle>
	);
}
