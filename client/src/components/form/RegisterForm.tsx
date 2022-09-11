import { useCallback } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
	Button,
	InputContainer,
	InputField,
	InputLabel,
} from "../../utils/styles";
import styles from "./index.module.scss";

export default function RegisterForm() {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();
	console.log({ errors });

	const handleRegister = useCallback((formValues: any) => {
		console.log({ formValues });
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
					{...register("Password", {
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
