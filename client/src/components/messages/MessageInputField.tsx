import {
	MessageInputContainerStyle,
	MessageInputStyle,
} from "../../utils/styles";

interface Props {}

export default function MessageInputField({}: Props) {
	return (
		<MessageInputContainerStyle>
			<MessageInputStyle />
		</MessageInputContainerStyle>
	);
}
