import {
	ConversationSidebarHeader,
	ConversationSidebarHolderStyle,
	CoversationsSidebarContainer,
	CoversationsSidebarItem,
	CoversationsSidebarStyle,
  CoversationsSidePanelStyle,
  CoversationsSidePanelUserImageStyle,
} from "../../utils/styles";
import { HiUserGroup } from "react-icons/hi";
import { RiMessageLine } from "react-icons/ri";
import { GiPowerButton } from "react-icons/gi";
import { Conversation, Group } from "../../utils/types";
import styles from "./index.module.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CreateConversationModal from "./../modals/CreateConversationModal";
import useAuth from "../../hooks/useAuth";
import { AppDisopatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import ConversationSelector from "./ConversationSelector";
import { setType } from "../../store/selectedSlice";

export default function ConversationSidebar() {
	const { user } = useAuth();
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch<AppDisopatch>();
	const conversations = useSelector(
		(state: RootState) => state.conversationsState.conversations
	);
	const groups = useSelector(
		(state: RootState) => state.groupsState.groups
	);
	const chatType = useSelector(
		(state: RootState) => state.selectedState.type
	);

	const goToSpecifiqConversation = useCallback(
		(id: Conversation["id"]) => navigate(`/conversations/${id}`),
		[navigate]
	);
	const goToSpecifiqGroup = useCallback(
		(id: Group["id"]) => navigate(`/groups/${id}`),
		[navigate]
	);
	const getDisplayedUser = useCallback(
		(conversation: Conversation) =>
			conversation.creator.id === user?.id
				? conversation.recipient
				: conversation.creator,
		[user?.id]
	);
  const funtionRefs = useRef({
    dispatch,
  })

  useEffect(() => {
    if (chatType === "private" && !pathname.includes("conversation")) {
      funtionRefs.current.dispatch(setType("group"))
    }
  }, [pathname, chatType]);

	return (
		<>
			{showModal && <CreateConversationModal setShowModal={setShowModal} />}
			<CoversationsSidebarStyle>
        <CoversationsSidePanelStyle>
          <CoversationsSidePanelUserImageStyle src="https://picsum.photos/200" alt="User Logo" />

          <ul>
            <li>
              <RiMessageLine />
            </li>
            <li>
              <HiUserGroup />
            </li>
          </ul>
          <ul>
            <li>
              <GiPowerButton />
            </li>
          </ul>
        </CoversationsSidePanelStyle>
				<ConversationSidebarHolderStyle>
          <ConversationSidebarHeader>
            <input type="text" placeholder="Search for Conversations..." />
          </ConversationSidebarHeader>
          <CoversationsSidebarContainer>
            <section>
              <ConversationSelector />
              {chatType === "private" ? (
                <>
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
                          {conversation?.lastMessageSent?.content}
                        </span>
                      </div>
                    </CoversationsSidebarItem>
                  ))}
                </>
              ) : chatType === "group" ? (
                <>
                  {groups.map((group) => (
                    <CoversationsSidebarItem
                      key={group.id}
                      onClick={() => goToSpecifiqGroup(group.id)}
                    >
                      <div className={styles.conversationAvatar}></div>
                      <div>
                        <span className={styles.conversationName}>
                          {group.title || "Group"}
                        </span>
                        <span className={styles.conversationLastMessage}>
                          {group?.lastMessageSent?.content}
                        </span>
                      </div>
                    </CoversationsSidebarItem>
                  ))}
                </>
              ) : null}
            </section>
          </CoversationsSidebarContainer>
        </ConversationSidebarHolderStyle>
			</CoversationsSidebarStyle>
		</>
	);
}
