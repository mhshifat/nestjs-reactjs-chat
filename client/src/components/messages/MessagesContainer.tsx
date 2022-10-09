import { formatRelative } from "date-fns";
import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { RootState } from "../../store";
import { MessageMenuContext } from "../../utils/contexts/MessageMenuContext";
import {
	DeletedMessageStyle,
	MessageContextMenuStyle,
	MessageItemAvatarStyle,
	MessageItemContainerStyle,
	MessageItemContentStyle,
	MessageItemDetailsStyle,
	MessageItemHeaderNameStyle,
	MessageItemHeaderStyle,
	MessagesContainerStyle,
} from "../../utils/styles";
import { Message, User } from "../../utils/types";

const LazyMessageContextMenu = lazy(() => import("./MessageContextMenu"));
export default function MessagesContainer() {
	const { id } = useParams();
	const { user } = useAuth();
	const messages = useSelector(
		(state: RootState) => state.messagesState.messages.get(+id!) || []
	);
  const [contextMenuPoints, setContextMenuPoints] = useState({ x: 0, y: 0 });
  const [message, setMessage] = useState<Message | null>(null);

  const handleContextMenuClick = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>, message: Message) => {
    event.preventDefault();
    setContextMenuPoints({ x: event.pageX, y: event.pageY })
    setMessage(message);
  }, []);

  useEffect(() => {
    const handleClick = () => {
      setContextMenuPoints({ x: 0, y: 0 });
      setMessage(null);
    };
    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, [])

	const renderMessages = () => {
		return messages.map((message, mIdx, messagesArray) => {
			const prevMessage = messagesArray[mIdx + 1];
			if (mIdx === messagesArray.length - 1) {
				return (
					<RenderWholeMessage key={message.id} message={message} user={user!} handleContextMenuClick={handleContextMenuClick} />
				);
			} else if (prevMessage?.author.id === message.author.id) {
				return (
					<MessageItemContainerStyle key={message.id} padding="0 0 5px" onContextMenu={(e) => handleContextMenuClick(e, message)}>
						<MessageItemContentStyle padding="0 0 0 66px">
							{message.content || (
								<DeletedMessageStyle>message deleted</DeletedMessageStyle>
							)}
						</MessageItemContentStyle>
					</MessageItemContainerStyle>
				);
			} else {
				return (
					<RenderWholeMessage key={message.id} message={message} user={user!} handleContextMenuClick={handleContextMenuClick} />
				);
			}
		});
	};
	return (
    <MessageMenuContext.Provider value={{ message, setMessage }}>
      <MessagesContainerStyle>
        {renderMessages()}
        {!!contextMenuPoints.x && !!contextMenuPoints.y && (
          <Suspense fallback={null}>
            <LazyMessageContextMenu contextMenuPoints={contextMenuPoints} />
          </Suspense>
        )}
      </MessagesContainerStyle>
    </MessageMenuContext.Provider>
  );
}

function RenderWholeMessage({
	message,
	user,
  handleContextMenuClick
}: {
	message: Message;
	user: User;
  handleContextMenuClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, message: Message) => void
}) {
	const { id, content, author, createdAt } = message;
	return (
		<MessageItemContainerStyle key={id} padding="2px 0 0 0">
			<MessageItemAvatarStyle />
			<MessageItemDetailsStyle>
				<MessageItemHeaderStyle>
					<MessageItemHeaderNameStyle color={user?.id === author.id ? "#ccc" : "#6464f9"}>
						{`${author.firstName} ${author.lastName}`}
					</MessageItemHeaderNameStyle>
					<span className="time">
						{formatRelative(new Date(createdAt), new Date())}
					</span>
				</MessageItemHeaderStyle>
				<MessageItemContentStyle padding="5px 0 5px 0" onContextMenu={(e) => handleContextMenuClick(e, message)}>
					{content || (
						<DeletedMessageStyle>message deleted</DeletedMessageStyle>
					)}
				</MessageItemContentStyle>
			</MessageItemDetailsStyle>
		</MessageItemContainerStyle>
	);
}
