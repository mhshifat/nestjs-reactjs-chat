import CreateConversationForm from "../form/CreateConversationForm";
import { OverlayStyle } from "./../../utils/styles";
import { MdClose } from "react-icons/md";
import { ModalContainer, ModalContentBody, ModalHeader } from ".";
import { createRef, MouseEvent, useCallback, useEffect, useRef } from "react";

type Props = {
	setShowModal: (shouldShow: boolean) => void;
};

export default function CreateConversationModal({ setShowModal }: Props) {
	const ref = createRef<HTMLDivElement>();
	const handleOverlayRef = useRef({
		setShowModal,
		ref,
	});

	useEffect(() => {
		const handlekeyDown = (e: globalThis.KeyboardEvent) => {
			e.key === "Escape" && handleOverlayRef.current.setShowModal(false);
		};

		window.addEventListener("keydown", handlekeyDown);
		return () => window.removeEventListener("keydown", handlekeyDown);
	}, []);

	const handleOverlayClick = useCallback(
		(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
			const { current } = handleOverlayRef.current.ref;
			if (current === e.target) {
				handleOverlayRef.current.setShowModal(false);
			}
		},
		[]
	);
	return (
		<OverlayStyle ref={ref} onClick={handleOverlayClick}>
			<ModalContainer>
				<ModalHeader>
					<h2>Create a Conversation</h2>
					<MdClose
						size={32}
						cursor="pointer"
						onClick={() => setShowModal(false)}
					/>
				</ModalHeader>
				<ModalContentBody>
					<CreateConversationForm />
				</ModalContentBody>
			</ModalContainer>
		</OverlayStyle>
	);
}
