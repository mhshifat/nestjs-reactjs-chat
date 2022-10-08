import { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDisopatch } from "../../store";
import { createConversationThunk } from "../../store/conversationsSlice";
import {
	Button,
	InputContainer,
	InputField,
	InputLabel,
	TextField,
} from "../../utils/styles";
import { CreateConversationParams } from "../../utils/types";
import styles from "./index.module.scss";

interface Props {
  closeModal: () => void;
}

export default function CreateConversationForm({ closeModal }: Props) {
  const navigate = useNavigate();
  const dispatchRef = useRef(useDispatch<AppDisopatch>());
  const { register, handleSubmit, reset } = useForm<CreateConversationParams>();
  const functionsRef = useRef({
    closeModal,
    navigate,
    reset,
  });

  const createConversation = useCallback((values: CreateConversationParams) => {
    dispatchRef.current?.(createConversationThunk(values)).unwrap().then(({ data }) => {
      functionsRef.current?.closeModal();
      functionsRef.current?.reset();
      functionsRef.current?.navigate(`/conversations/${data.id}`)
    }).catch(console.error);
  }, []);
	return (
		<form className={styles.createConversationForm} onSubmit={handleSubmit(createConversation)}>
			<section>
				<InputContainer backgroundColor="#161616">
					<InputLabel>Recipient</InputLabel>
					<InputField {...register("email", { required: "Email is required!" })} />
				</InputContainer>
			</section>
			<section className={styles.message}>
				<InputContainer backgroundColor="#161616">
					<InputLabel>Message</InputLabel>
					<TextField {...register("message", { required: "Message is required!" })} />
				</InputContainer>
			</section>
			<Button>Create Conversation</Button>
		</form>
	);
}
