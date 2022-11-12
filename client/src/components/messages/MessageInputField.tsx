import { FormEvent } from "react";
import {
	MessageInputContainerStyle,
	MessageInputStyle,
} from "../../utils/styles";
import { BsEmojiSmile } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";

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
        <button>
          <AiOutlinePlusCircle />
        </button>
				<form onSubmit={sendMessage}>
					<MessageInputStyle
						spellCheck={false}
						value={message}
						onChange={({ target }) => setMessage(target.value)}
						onKeyDown={sendTypingStatus}
					/>
				</form>
        <button>
          <BsEmojiSmile />
        </button>
			</MessageInputContainerStyle>
		</>
	);
}
