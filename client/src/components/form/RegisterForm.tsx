import { useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
	Button,
	InputContainer,
	InputField,
	InputLabel,
} from "../../utils/styles";
import styles from "./index.module.scss";
import { postRegisterUser } from "../../utils/api";
import { CreateUserParams } from "../../utils/types";

export default function RegisterForm() {
  const navigate = useNavigate();
	const { handleSubmit, register } = useForm<CreateUserParams>();
  const functionsRefs = useRef({ navigate });

	const handleRegister = useCallback(async (formValues: CreateUserParams) => {
		try {
			await postRegisterUser(formValues);
      functionsRefs.current?.navigate("/login");
		} catch (err) {
			console.error(err);
		}
	}, []);

	return (
		<form className={styles.form} onSubmit={handleSubmit(handleRegister)}>
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

			<section className={styles.nameFieldRow}>
				<InputContainer>
					<InputLabel htmlFor="firstName">First Name</InputLabel>
					<InputField
						type="text"
						id="firstName"
						{...register("firstName", {
							required: "First name is required!",
						})}
					/>
				</InputContainer>
				<InputContainer>
					<InputLabel htmlFor="lastName">Last Name</InputLabel>
					<InputField
						type="text"
						id="lastName"
						{...register("lastName", {
							required: "Last name is required!",
						})}
					/>
				</InputContainer>
			</section>

			<InputContainer>
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
				Create My Account
			</Button>

			<div className={styles.footerText}>
				<span>Already have an account? </span>
				<Link to="/login">Login</Link>
			</div>
		</form>
	);
}
