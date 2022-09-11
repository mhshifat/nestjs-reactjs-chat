import LoginForm from "../components/form/LoginForm";
import { Page } from "../utils/styles";

export default function LoginPage() {
	return (
		<Page display="flex" justifyContent="center" alignItems="center">
			<LoginForm />
		</Page>
	);
}
