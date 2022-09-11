import { Outlet } from "react-router-dom";
import ConversationSidebar from "../components/conversations/ConversationSidebar";
import { Page } from "../utils/styles";
import mockConversations from "../__mocks__/conversations";

export default function ConversationPage() {
	return (
		<Page>
			<ConversationSidebar conversations={mockConversations} />
			<Outlet />
		</Page>
	);
}
