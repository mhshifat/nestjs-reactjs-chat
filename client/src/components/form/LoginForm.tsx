import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
	Button,
	InputContainer,
	InputField,
	InputLabel,
} from "../../utils/styles";
import styles from "./index.module.scss";

export default function LoginForm() {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();
	console.log({ errors });
	const handleLogin = useCallback((formValues: any) => {
		console.log({ formValues });
	}, []);

	return (
		<form className={styles.form} onSubmit={handleSubmit(handleLogin)}>
			<InputContainer>
				<InputLabel htmlFor="email">Email</InputLabel>
				<InputField
					type="email"
					id="email"
					{...register("email", {
						required: "Email is required!",
					})}
				/>
			</InputContainer>

			<InputContainer className={styles.loginFormPassword}>
				<InputLabel htmlFor="password">Password</InputLabel>
				<InputField
					type="password"
					id="password"
					{...register("password", {
						required: "Password is required!",
					})}
				/>
			</InputContainer>

			<Button type="submit" className={styles.button}>
				Login
			</Button>

			<div className={styles.footerText}>
				<span>Don't have an account? </span>
				<Link to="/register">Register</Link>
			</div>
		</form>
	);
}
