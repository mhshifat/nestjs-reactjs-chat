import {
	ConversationSidebarHeader,
	CoversationsSidebarContainer,
	CoversationsSidebarItem,
	CoversationsSidebarStyle,
} from "../../utils/styles";
import { TbEdit } from "react-icons/tb";
import { Conversation } from "../../utils/types";
import styles from "./index.module.scss";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateConversationModal from "./../modals/CreateConversationModal";
import useAuth from "../../hooks/useAuth";
interface Props {
	conversations: Conversation[];
}

export default function ConversationSidebar({ conversations }: Props) {
	const { user } = useAuth();
	const navigate = useNavigate();
	const [showModal, setShowModal] = useState(false);

	const goToSpecifiqConversation = useCallback(
		(id: Conversation["id"]) => navigate(`/conversations/${id}`),
		[navigate]
	);
	const getDisplayedUser = useCallback(
		(conversation: Conversation) =>
			conversation.creator.id === user?.id
				? conversation.recipient
				: conversation.creator,
		[user?.id]
	);
	return (
		<>
			{showModal && <CreateConversationModal setShowModal={setShowModal} />}
			<CoversationsSidebarStyle>
				<ConversationSidebarHeader>
					<h1>Conversations</h1>
					<div onClick={() => setShowModal((value) => !value)}>
						<TbEdit size={24} cursor="pointer" />
					</div>
				</ConversationSidebarHeader>
				<CoversationsSidebarContainer>
					{conversations.map((conversation) => (
						<CoversationsSidebarItem
							key={conversation.id}
							onClick={() => goToSpecifiqConversation(conversation.id)}
						>
							<div className={styles.conversationAvatar}></div>
							<div>
								<span className={styles.conversationName}>
									{`${getDisplayedUser(conversation).firstName} ${
										getDisplayedUser(conversation).lastName
									}`}
								</span>
								<span className={styles.conversationLastMessage}>
									{"Simple Text"}
								</span>
							</div>
						</CoversationsSidebarItem>
					))}
				</CoversationsSidebarContainer>
			</CoversationsSidebarStyle>
		</>
	);
}
