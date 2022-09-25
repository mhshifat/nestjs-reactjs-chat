import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import ConversationSidebar from "../components/conversations/ConversationSidebar";
import { AppDisopatch } from "../store";
import { fetchConversationsThunk } from "../store/conversationsSlice";
import { Page } from "../utils/styles";

export default function ConversationPage() {
	const dispatch = useDispatch<AppDisopatch>();
	const dispatchRef = useRef(dispatch);

	useEffect(() => {
		dispatchRef.current?.(fetchConversationsThunk()).catch(console.error);
	}, []);

	return (
		<Page>
			<ConversationSidebar />
			<Outlet />
		</Page>
	);
}
