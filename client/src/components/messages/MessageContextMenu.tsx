import { MessageContextMenuStyle } from './../../utils/styles';
import { MessageMenuContext } from './../../utils/contexts/MessageMenuContext';
import { Dispatch, SetStateAction, useCallback, useContext, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { AppDisopatch } from '../../store';
import { deleteMessageThunk } from '../../store/messagesSlice';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../utils/contexts/AuthContext';

interface Props {
  contextMenuPoints: {
    x: number;
    y: number;
  };
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

export default function MessageContextMenu({ contextMenuPoints, setIsEditing }: Props) {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { message, setEditMessage } = useContext(MessageMenuContext);
  const functionRefs = useRef({
    dispatch: useDispatch<AppDisopatch>(),
    setIsEditing,
    setEditMessage
  })
  
  const handleDeleteMessage = useCallback(() => {
    if (!message || !id) return;
    functionRefs.current.dispatch?.(deleteMessageThunk({ messageId: message.id, conversationId: +id }));
  }, [message, id]);
  const handleEditMessage = useCallback(() => {
    if (!message || !id) return;
    functionRefs.current?.setIsEditing(true);
    functionRefs.current?.setEditMessage(message);
  }, [message, id]);
  return (
    <MessageContextMenuStyle top={contextMenuPoints.y} left={contextMenuPoints.x}>
      <ul>
        {user?.id === message?.author.id && <li onClick={handleDeleteMessage}>Delete</li>}
        {user?.id === message?.author.id && <li onClick={handleEditMessage}>Edit</li>}
      </ul>
    </MessageContextMenuStyle>
  )
}