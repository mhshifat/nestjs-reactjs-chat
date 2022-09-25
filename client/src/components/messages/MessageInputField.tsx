import { FormEvent } from "react";
import {
	MessageInputContainerStyle,
	MessageInputStyle,
} from "../../utils/styles";

interface Props {
	message: string;
	setMessage: (message: string) => void;
	sendMessage: (e: FormEvent) => void;
}

export default function MessageInputField({
	message,
	setMessage,
	sendMessage,
}: Props) {
	return (
		<MessageInputContainerStyle>
			<form onSubmit={sendMessage}>
				<MessageInputStyle
					spellCheck={false}
					value={message}
					onChange={({ target }) => setMessage(target.value)}
				/>
			</form>
		</MessageInputContainerStyle>
	);
}
