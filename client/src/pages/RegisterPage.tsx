import RegisterForm from "../components/form/RegisterForm";
import { Page } from "../utils/styles";

export default function RegisterPage() {
	return (
		<Page display="flex" justifyContent="center" alignItems="center">
			<RegisterForm />
		</Page>
	);
}
