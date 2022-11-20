import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import MessagesPanel from "../components/messages/MessagesPanel";
import { AppDisopatch } from "../store";
import { fetchMessagesThunk } from "../store/messagesSlice";
import { SocketContext } from "../utils/contexts/SocketContext";
import { CoversationChannelPage } from "../utils/styles";

export default function GroupChannelPage() {
	const { id } = useParams();
	const dispatch = useDispatch<AppDisopatch>();
	const dispatchRef = useRef(dispatch);
	const socket = useContext(SocketContext);
	const socketRef = useRef(socket);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();
  const [typing, setTyping] = useState(false);
  const [recipientTyping, setRecipientTyping] = useState(false);

	useEffect(() => {
		if (!id) return;
    const socket = socketRef.current;
		dispatchRef.current?.(fetchMessagesThunk(+id));
    socket?.emit("onConversationJoin", { conversationId: id });
    const userJoin = socket?.on("userJoin", () => {
      console.log("userJoin");
    });
    const userLeave = socket?.on("userLeave", () => {
      console.log("userLeave");
    });
    const onUserTyping = socket?.on("onUserTyping", () => {
      setRecipientTyping(true);
    });
    const onUserStopedTyping = socket?.on("onUserStopedTyping", () => {
      setRecipientTyping(false);
    });
    
    return () => {
      socket.emit("onConversationLeave", { conversationId: id });
      userJoin.off("userJoin");
      userLeave.off("userLeave");
      onUserTyping.off("onUserTyping");
      onUserStopedTyping.off("onUserStopedTyping");
      setRecipientTyping(false);
    }
	}, [id]);

	const sendTypingStatus = useCallback(() => {
    if (typing) {
      clearTimeout(timer);
      setTimer(setTimeout(() => {
        setTyping(false);
        socketRef.current?.emit("onUserStopedTyping", { conversationId: id });
      }, 2000));
    } else {
      setTyping(true);
      socketRef.current?.emit("onUserTyping", { conversationId: id });
    }
	}, [id, timer, typing]);

	return (
		<CoversationChannelPage>
			<MessagesPanel recipientTyping={recipientTyping} sendTypingStatus={sendTypingStatus} />
		</CoversationChannelPage>
	);
}
