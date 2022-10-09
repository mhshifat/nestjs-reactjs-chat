import { MessageContextMenuStyle } from './../../utils/styles';
import { MessageMenuContext } from './../../utils/contexts/MessageMenuContext';
import { useCallback, useContext, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { AppDisopatch } from '../../store';
import { deleteMessageThunk } from '../../store/messagesSlice';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../utils/contexts/AuthContext';

interface Props {
  contextMenuPoints: {
    x: number;
    y: number;
  }
}

export default function MessageContextMenu({ contextMenuPoints }: Props) {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const functionRefs = useRef({
    dispatch: useDispatch<AppDisopatch>()
  })
  const { message } = useContext(MessageMenuContext);
  
  const handleDeleteMessage = useCallback(() => {
    if (!message || !id) return;
    functionRefs.current.dispatch?.(deleteMessageThunk({ messageId: message.id, conversationId: +id }));
  }, [message, id]);
  return (
    <MessageContextMenuStyle top={contextMenuPoints.y} left={contextMenuPoints.x}>
      <ul>
        {user?.id === message?.author.id && <li onClick={handleDeleteMessage}>Delete</li>}
        <li>Edit</li>
      </ul>
    </MessageContextMenuStyle>
  )
}