import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ConversationPage from "./pages/ConversationPage";
import ConversationChannelPage from "./pages/ConversationChannelPage";
import ConversationPanel from "./components/conversations/ConversationPanel";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import { AuthContext } from "./utils/contexts/AuthContext";
import { socket, SocketContext } from "./utils/contexts/SocketContext";
import { useState } from "react";
import { User } from "./utils/types";

window.console.error = (err) => {
	if (err.code === "ERR_CANCELED") return;
	console.error(err);
};

function App() {
	const [user, setUser] = useState<User | undefined>(undefined);

	return (
		<AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
			<SocketContext.Provider value={socket}>
				<BrowserRouter>
					<Routes>
						<Route path="/register" element={<RegisterPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route
							path="conversations"
							element={
								<AuthenticatedRoute>
									<ConversationPage />
								</AuthenticatedRoute>
							}
						>
							<Route index element={<ConversationPanel />} />
							<Route path=":id" element={<ConversationChannelPage />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</SocketContext.Provider>
		</AuthContext.Provider>
	);
}

export default App;
