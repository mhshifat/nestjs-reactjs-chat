import { FormEvent } from "react";
import {
	MessageInputContainerStyle,
	MessageInputStyle,
} from "../../utils/styles";

interface Props {
	message: string;
	setMessage: (message: string) => void;
	sendMessage: (e: FormEvent) => void;
	sendTypingStatus: () => void;
}

export default function MessageInputField({
	message,
	setMessage,
	sendMessage,
	sendTypingStatus,
}: Props) {
	return (
		<>
			<MessageInputContainerStyle>
				<form onSubmit={sendMessage}>
					<MessageInputStyle
						spellCheck={false}
						value={message}
						onChange={({ target }) => setMessage(target.value)}
						onKeyDown={sendTypingStatus}
					/>
				</form>
			</MessageInputContainerStyle>
		</>
	);
}
