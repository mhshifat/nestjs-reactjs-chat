import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { postloginUser } from "../../utils/api";
import {
	Button,
	InputContainer,
	InputField,
	InputLabel,
} from "../../utils/styles";
import { UserCredentialsParams } from "../../utils/types";
import styles from "./index.module.scss";

const DEMO_ACCOUNTS: Record<number, { email: string; password: string }> = {
	1: {
		email: "userone@gmail.com",
		password: "abc123",
	},
	2: {
		email: "usertwo@gmail.com",
		password: "abc123",
	},
	3: {
		email: "userthree@gmail.com",
		password: "abc123",
	},
	4: {
		email: "userfour@gmail.com",
		password: "abc123",
	},
	5: {
		email: "userfive@gmail.com",
		password: "abc123",
	},
};
export default function LoginForm() {
	const navigate = useNavigate();
	const { handleSubmit, register, reset } = useForm<UserCredentialsParams>();

	const handleTestUserSet = useCallback(
		async (docNum: number) => reset(DEMO_ACCOUNTS[docNum]),
		[reset]
	);
	const handleLogin = useCallback(
		async (formValues: UserCredentialsParams) => {
			try {
				await postloginUser(formValues);
				navigate("/conversations");
			} catch (err) {
				console.error(err);
			}
		},
		[navigate]
	);

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
			<div className={styles.footerText}>
				<span>Need some test account? </span>
				<Link to="#" onClick={() => handleTestUserSet(1)}>
					User One,
				</Link>
				&nbsp;
				<Link to="#" onClick={() => handleTestUserSet(2)}>
					User Two,
				</Link>
				&nbsp;
				<Link to="#" onClick={() => handleTestUserSet(3)}>
					User Three,
				</Link>
				&nbsp;
				<Link to="#" onClick={() => handleTestUserSet(4)}>
					User Four,
				</Link>
				&nbsp;
				<Link to="#" onClick={() => handleTestUserSet(5)}>
					User Five
				</Link>
			</div>
		</form>
	);
}
