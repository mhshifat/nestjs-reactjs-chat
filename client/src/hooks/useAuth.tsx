import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../utils/contexts/AuthContext";
import { getLoggedInUser } from "./../utils/api";

export default function useAuth() {
	const [loading, setLoading] = useState(true);
	const { user, updateAuthUser } = useContext(AuthContext);
	const updateAuthUserRef = useRef(updateAuthUser);

	useEffect(() => {
		const controller = new AbortController();

		getLoggedInUser(controller)
			.then(({ data }) => updateAuthUserRef?.current?.(data))
			.catch(console.error)
			.finally(() => setTimeout(() => setLoading(false), 1000));

		return () => controller.abort();
	}, []);

	return { user, loading };
}
