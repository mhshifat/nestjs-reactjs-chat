import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ConversationPage from "./pages/ConversationPage";
import ConversationChannelPage from "./pages/ConversationChannelPage";
import ConversationPanel from "./components/conversations/ConversationPanel";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="conversations" element={<ConversationPage />}>
					<Route index element={<ConversationPanel />} />
					<Route path=":id" element={<ConversationChannelPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
