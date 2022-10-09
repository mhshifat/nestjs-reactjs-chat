import { useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import { AuthContext } from "../../utils/contexts/AuthContext";
import { MessagePanelHeaderStyle } from "../../utils/styles";

export default function MessagePanelHeader() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const conversation = useSelector((state: RootState) => state.conversationsState.conversations.find(con => con.id === +id!));

  const conversationRecipient = useMemo(() => {
    return user?.id === conversation?.creator.id ? conversation?.recipient : conversation?.creator;
  }, [user, conversation])
  return (
		<MessagePanelHeaderStyle>{conversationRecipient?.firstName} {conversationRecipient?.lastName}</MessagePanelHeaderStyle>
	);
}
