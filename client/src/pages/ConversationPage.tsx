import { Outlet } from "react-router-dom";
import ConversationSidebar from "../components/conversations/ConversationSidebar";
import { Page } from "../utils/styles";

export default function ConversationPage() {
	return (
		<Page>
			<ConversationSidebar conversations={[]} />
			<Outlet />
		</Page>
	);
}
