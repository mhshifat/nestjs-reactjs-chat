import { formatRelative } from "date-fns";
import { KeyboardEvent, lazy, Suspense, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { AppDisopatch, RootState } from "../../store";
import { updateMessageThunk } from "../../store/messagesSlice";
import { MessageMenuContext } from "../../utils/contexts/MessageMenuContext";
import {
	DeletedMessageStyle,
	EditMessageActionInfoStyle,
	EditMessageInputStyle,
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
  const [isEditing, setIsEditing] = useState(false);
  const [editMessage, setEditMessage] = useState<Message | null>(null);

  const handleContextMenuClick = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>, message: Message) => {
    event.preventDefault();
    setContextMenuPoints({ x: event.pageX, y: event.pageY })
    setMessage(message);
  }, []);
  const resetEditMessageState = useCallback(() => {
    setContextMenuPoints({ x: 0, y: 0 });
    setMessage(null);
    setEditMessage(null);
    setIsEditing(false);
  }, []);
  const funtionsRef = useRef({
    resetEditMessageState,
    dispatch: useDispatch<AppDisopatch>(),
  });

  useEffect(() => {
    const handleClick = () => {
      setContextMenuPoints({ x: 0, y: 0 });
      setMessage(null);
    };
    const handleEscapeClick = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        funtionsRef.current?.resetEditMessageState();
      }
    };
    window.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleEscapeClick);

    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleEscapeClick);
    };
  }, [])

  useEffect(() => {
    const resetEditMessageState = funtionsRef.current?.resetEditMessageState;
    return () => {
      resetEditMessageState?.();
    }
  }, [id])
  
  const handleEditMessage = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    e.persist();
    if (e.key === "Enter") {
      const value = (e.target as HTMLInputElement).value;
      
      if (editMessage?.id) {
        funtionsRef.current?.dispatch(
          updateMessageThunk({
            messageId: editMessage.id,
            payload: {
              key: "content",
              value: value
            }
          })
        ).unwrap().then(() => {
          funtionsRef.current?.resetEditMessageState();
        })
      }
    }
  }, [editMessage?.id]);

	const renderMessages = () => {
		return messages.map((msg, mIdx, messagesArray) => {
			const prevMessage = messagesArray[mIdx + 1];
			if (mIdx === messagesArray.length - 1) {
				return (
					<RenderWholeMessage key={msg.id} message={msg} user={user!} handleContextMenuClick={handleContextMenuClick} isEditing={isEditing} />
				);
			} else if (prevMessage?.author.id === msg.author.id) {
				return (
					<MessageItemContainerStyle key={msg.id} padding="0 0 5px" onContextMenu={(e) => msg.id !== editMessage?.id && handleContextMenuClick(e, msg)}>
						<MessageItemContentStyle padding="0 0 0 66px">
              {isEditing && msg.id === editMessage?.id ? (
                <div style={{ width: "100%" }}>
                  <EditMessageInputStyle defaultValue={editMessage?.content} onKeyDown={handleEditMessage} />
                  <EditMessageActionInfoStyle>
                    escape to <span>cancel</span> - enter to <span>save</span>
                  </EditMessageActionInfoStyle>
                </div>
              ) : (
                <>
                  {msg.content || (
                    <DeletedMessageStyle>message deleted</DeletedMessageStyle>
                  )}
                </>
              )}
						</MessageItemContentStyle>
					</MessageItemContainerStyle>
				);
			} else {
				return (
					<RenderWholeMessage key={msg.id} message={msg} user={user!} handleContextMenuClick={handleContextMenuClick} isEditing={isEditing} />
				);
			}
		});
	};
	return (
    <MessageMenuContext.Provider value={{ message, setMessage, editMessage, setEditMessage }}>
      <MessagesContainerStyle>
        {renderMessages()}
        {!!contextMenuPoints.x && !!contextMenuPoints.y && (
          <Suspense fallback={null}>
            <LazyMessageContextMenu contextMenuPoints={contextMenuPoints} setIsEditing={setIsEditing} />
          </Suspense>
        )}
      </MessagesContainerStyle>
    </MessageMenuContext.Provider>
  );
}

function RenderWholeMessage({
	message,
	user,
  handleContextMenuClick,
  isEditing,
}: {
	message: Message;
	user: User;
  handleContextMenuClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, message: Message) => void,
  isEditing: boolean,
}) {
	const { id, content, author, createdAt } = message;
  const { editMessage } = useContext(MessageMenuContext);

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
				<MessageItemContentStyle padding="5px 0 5px 0" onContextMenu={(e) => id !== editMessage?.id && handleContextMenuClick(e, message)}>
          {isEditing && id === editMessage?.id ? (
            <div style={{ width: "100%" }}>
              <EditMessageInputStyle defaultValue={editMessage?.content} />
              <EditMessageActionInfoStyle>
                escape to <span>cancel</span> - enter to <span>save</span>
              </EditMessageActionInfoStyle>
            </div>
          ) : (
            <>
              {content || (
                <DeletedMessageStyle>message deleted</DeletedMessageStyle>
              )}
            </>
          )}
				</MessageItemContentStyle>
			</MessageItemDetailsStyle>
		</MessageItemContainerStyle>
	);
}
