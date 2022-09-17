import { PropsWithChildren } from "react";
import {
	ModalContainerStyle,
	ModalContentBodyStyle,
	ModalHeaderStyle,
} from "../../utils/styles";

export function ModalHeader({ children }: PropsWithChildren) {
	return <ModalHeaderStyle>{children}</ModalHeaderStyle>;
}

export function ModalContentBody({ children }: PropsWithChildren) {
	return <ModalContentBodyStyle>{children}</ModalContentBodyStyle>;
}

export function ModalContainer({ children }: PropsWithChildren) {
	return <ModalContainerStyle>{children}</ModalContainerStyle>;
}
