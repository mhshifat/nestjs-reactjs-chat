import { MessagesPanelBodyStyle, MessagesPanelStyle } from "../../utils/styles";
import { Message } from "../../utils/types";
import MessageInputField from "./MessageInputField";
import MessagesContainer from "./MessagesContainer";
import MessagePanelHeader from "./MessagePanelHeader";

interface Props {
	messages: Message[];
}

export default function MessagesPanel({ messages }: Props) {
	return (
		<MessagesPanelStyle>
			<MessagePanelHeader />
			<MessagesPanelBodyStyle>
				<MessagesContainer messages={messages} />
				<MessageInputField />
			</MessagesPanelBodyStyle>
		</MessagesPanelStyle>
	);
}
