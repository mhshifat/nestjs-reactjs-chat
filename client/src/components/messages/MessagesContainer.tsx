import { formatRelative } from "date-fns";
import useAuth from "../../hooks/useAuth";
import {
	DeletedMessageStyle,
	MessageItemAvatarStyle,
	MessageItemContainerStyle,
	MessageItemContentStyle,
	MessageItemDetailsStyle,
	MessageItemHeaderStyle,
	MessagesContainerStyle,
} from "../../utils/styles";
import { Message, User } from "../../utils/types";

interface Props {
	messages: Message[];
}

export default function MessagesContainer({ messages }: Props) {
	const { user } = useAuth();

	const renderMessages = () => {
		return messages.map((message, mIdx, messagesArray) => {
			const prevMessage = messagesArray[mIdx + 1];
			if (mIdx === messagesArray.length - 1) {
				return (
					<RenderWholeMessage key={message.id} message={message} user={user!} />
				);
			} else if (prevMessage?.author.id === message.author.id) {
				return (
					<MessageItemContainerStyle key={message.id} padding="0 0 10px">
						<MessageItemContentStyle padding="0 0 0 65px">
							{message.content || (
								<DeletedMessageStyle>message deleted</DeletedMessageStyle>
							)}
						</MessageItemContentStyle>
					</MessageItemContainerStyle>
				);
			} else {
				return (
					<RenderWholeMessage key={message.id} message={message} user={user!} />
				);
			}
		});
	};
	return <MessagesContainerStyle>{renderMessages()}</MessagesContainerStyle>;
}

function RenderWholeMessage({
	message,
	user,
}: {
	message: Message;
	user: User;
}) {
	const { id, content, author, createdAt } = message;
	return (
		<MessageItemContainerStyle key={id} padding="10px 0 0 0">
			<MessageItemAvatarStyle />
			<MessageItemDetailsStyle>
				<MessageItemHeaderStyle>
					<span className="name">
						{user?.id === author.id
							? "You"
							: `${author.firstName} ${author.lastName}`}
					</span>
					<span className="time">
						{formatRelative(new Date(createdAt), new Date())}
					</span>
				</MessageItemHeaderStyle>
				<MessageItemContentStyle padding="5px 0 10px 0">
					{content || (
						<DeletedMessageStyle>message deleted</DeletedMessageStyle>
					)}
				</MessageItemContentStyle>
			</MessageItemDetailsStyle>
		</MessageItemContainerStyle>
	);
}
