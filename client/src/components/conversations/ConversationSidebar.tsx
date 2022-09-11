import {
	ConversationSidebarHeader,
	CoversationsSidebarContainer,
	CoversationsSidebarItem,
	CoversationsSidebarStyle,
} from "../../utils/styles";
import { TbEdit } from "react-icons/tb";
import { ConversationType } from "../../utils/types";
import styles from "./index.module.scss";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
interface Props {
	conversations: ConversationType[];
}

export default function ConversationSidebar({ conversations }: Props) {
	const navigate = useNavigate();
	const goToSpecifiqConversation = useCallback(
		(id: ConversationType["id"]) => navigate(`/conversations/${id}`),
		[navigate]
	);

	return (
		<CoversationsSidebarStyle>
			<ConversationSidebarHeader>
				<h1>Conversations</h1>
				<TbEdit size={40} />
			</ConversationSidebarHeader>
			<CoversationsSidebarContainer>
				{conversations.map(({ id, name, lastMessage }) => (
					<CoversationsSidebarItem
						key={id}
						onClick={() => goToSpecifiqConversation(id)}
					>
						<div className={styles.conversationAvatar}></div>
						<div>
							<span className={styles.conversationName}>{name}</span>
							<span className={styles.conversationLastMessage}>
								{lastMessage}
							</span>
						</div>
					</CoversationsSidebarItem>
				))}
			</CoversationsSidebarContainer>
		</CoversationsSidebarStyle>
	);
}
