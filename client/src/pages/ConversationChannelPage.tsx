import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MessagesPanel from "../components/messages/MessagesPanel";
import { getConversationMessages } from "../utils/api";
import { CoversationChannelPage } from "../utils/styles";
import { Message } from "../utils/types";

export default function ConversationChannelPage() {
	const { id } = useParams();
	const [messages, setMessages] = useState<Message[]>([]);

	useEffect(() => {
		if (!id) return;
		const controller = new AbortController();
		getConversationMessages(+id, controller)
			.then(({ data }) => setMessages(data))
			.catch(console.error);

		return () => controller.abort();
	}, [id]);

	return (
		<CoversationChannelPage>
			<MessagesPanel messages={messages} />
		</CoversationChannelPage>
	);
}
