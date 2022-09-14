import { useEffect, useState } from "react";
import { User } from "../utils/types";
import { getLoggedInUser } from "./../utils/api";

export default function useAuth() {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const controller = new AbortController();

		getLoggedInUser(controller)
			.then(({ data }) => setUser(data))
			.catch(console.error)
			.finally(() => setTimeout(() => setLoading(false), 1000));

		return () => controller.abort();
	}, []);

	return { user, loading };
}
