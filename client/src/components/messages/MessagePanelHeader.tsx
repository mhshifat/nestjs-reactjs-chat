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
  const chatType = useSelector(
		(state: RootState) => state.selectedState.type
	);
  const groups = useSelector(
		(state: RootState) => state.groupsState.groups
	);

  const conversationRecipient = useMemo(() => {
    return user?.id === conversation?.creator.id ? conversation?.recipient : conversation?.creator;
  }, [user, conversation])
  const groupName = useMemo(() => {
    return groups.find(group => group.id === +id!)?.title || "Group"
  }, [groups, id])
  return (
		<MessagePanelHeaderStyle>
      {chatType === "private" ? (
        <>
          {conversationRecipient?.firstName} {conversationRecipient?.lastName}
        </>
      ) : (
        <>
          {groupName}
        </>
      )}
    </MessagePanelHeaderStyle>
	);
}
