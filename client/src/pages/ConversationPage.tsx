import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import ConversationSidebar from "../components/conversations/ConversationSidebar";
import { getConversations } from "../utils/api";
import { Page } from "../utils/styles";
import { Conversation } from "../utils/types";

export default function ConversationPage() {
	const [conversations, setConversations] = useState<Conversation[]>([]);

	useEffect(() => {
		const controller = new AbortController();
		getConversations(controller)
			.then(({ data }) => setConversations(data))
			.catch((err) => console.error(err));

		return () => controller.abort();
	}, []);

	return (
		<Page>
			<ConversationSidebar conversations={conversations} />
			<Outlet />
		</Page>
	);
}
