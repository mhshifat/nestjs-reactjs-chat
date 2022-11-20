import styled, { css } from "styled-components";
import {
	InputContainerProps,
	MessageContextMenuProps,
	MessageItemContentProps,
	MessageItemHeaderNameProps,
	PageProps,
} from "./styleTypes";

const SIDEBAR_WIDTH = 350;

export const InputContainer = styled.div<InputContainerProps>`
	background-color: ${({ backgroundColor }) => backgroundColor || "#131313"};
	padding: 12px 16px;
	border-radius: 10px;
	width: 100%;
	box-sizing: border-box;

	${(props: any) => props.error && css``}
`;

export const InputLabel = styled.label`
	display: block;
	color: #8f8f8f;
	font-size: 14px;
	margin: 4px 0;
	cursor: pointer;
`;

export const InputField = styled.input`
	background-color: inherit;
	outline: none;
	border: none;
	color: #fff;
	font-family: "Inter";
	font-size: 18px;
	box-sizing: border-box;
	width: 100%;
	padding: 0;
	margin: 4px 0;
`;

export const Button = styled.button`
	width: 100%;
	background-color: #2b09ff;
	color: #fff;
	border: none;
	outline: none;
	cursor: pointer;
	font-family: "Inter";
	font-size: 16px;
	border-radius: 10px;
	padding: 25px 0;
	font-weight: 500;
	border: 2px solid #2b09ff;
	transition: background-color 250ms ease;
	transition: border 500ms ease;
	box-sizing: border-box;

	&:hover {
		background-color: #3415ff;
	}

	&:active {
		background-color: #3a1cff;
	}
`;

export const Page = styled.div<PageProps>`
	width: 100%;
	background-color: #1a1a1a;
	display: ${({ display }) => display};
	justify-content: ${({ justifyContent }) => justifyContent};
	align-items: ${({ alignItems }) => alignItems};
	height: 100%;
`;

export const CoversationsSidebarStyle = styled.aside`
	width: ${SIDEBAR_WIDTH}px;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background-color: #1a1a1a;
	border-right: 1px solid #5454543d;
	overflow-y: auto;
  display: flex;

	&::-webkit-scrollbar {
		width: 10px;
	}

	&::-webkit-scrollbar-thumb {
		width: 100%;
		background: #2d2d2d;
	}
`;

export const ConversationSidebarHeader = styled.header`
	background-color: #0f0f0f;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px;
	border-bottom: 1px solid #5454543d;
	width: 100%;
	box-sizing: border-box;
  
	& input {
    width: 100%;
    box-sizing: border-box;
    height: 35px;
    background: #151515;
    border: none;
    outline: none;
    border-radius: 5px;
    padding: 0 10px;
    color: #f2f5f7;
	}
`;

export const CoversationChannelPage = styled.div`
	height: 100%;
	margin-left: ${SIDEBAR_WIDTH}px;
`;

export const CoversationsSidebarContainer = styled.div`
`;

export const CoversationsSidebarItem = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
	border-bottom: 1px solid #5454543d;
	cursor: pointer;
	background: #0f0f0f;
  padding: 10px 20px;
`;

export const OverlayStyle = styled.div`
	width: 100%;
	height: 100%;
	background: #000000c4;
	position: fixed;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 99;
`;

export const ModalContainerStyle = styled.div`
	background-color: #121212;
	width: 650px;
	border-radius: 10px;
`;

export const ModalHeaderStyle = styled.header`
	width: 100%;
	padding: 10px 24px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 20px;
	box-sizing: border-box;

	& h2 {
		font-weight: 500;
		margin: 0;
	}
`;

export const ModalContentBodyStyle = styled.div`
	padding: 24px;
`;

export const TextField = styled.textarea`
	background-color: inherit;
	outline: none;
	border: none;
	color: #fff;
	font-family: "Inter";
	font-size: 18px;
	box-sizing: border-box;
	width: 100%;
	padding: 0;
	margin: 4px 0;
	resize: none;
	overflow-y: hidden;
`;

export const MessagesPanelStyle = styled.div`
	height: 100%;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	position: relative;
`;

export const MessagesPanelBodyStyle = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	padding: 30px 30px 0;
	box-sizing: border-box;
	padding-top: 65px;
`;

export const MessagesContainerStyle = styled.div`
	height: 100%;
	box-sizing: border-box;
	padding: 10px 0;
	display: flex;
	flex-direction: column-reverse;
	overflow-y: auto;

	&::-webkit-scrollbar {
		display: none;
	}
`;

export const MessageInputContainerStyle = styled.div`
	box-sizing: border-box;
	background: #101010;
	border-radius: 10px;
	padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 10px;

  & > form {
    flex: 1;
  }

  & > button {
    border: none;
    outline: none;
    background: transparent;
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;

    & > svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const MessageInputStyle = styled.input`
	background: inherit;
	outline: none;
	border: none;
	color: #454545;
	font-family: "Inter";
	font-size: 16px;
	width: 100%;
	box-sizing: border-box;
	margin: 4px 0;
	resize: none;
`;

export const MessageItemContainerStyle = styled.div<MessageItemContentProps>`
	display: flex;
	gap: 20px;
	align-items: flex-start;
	padding: ${({ padding }) => padding || "10px 0"};
`;

export const MessageItemAvatarStyle = styled.div`
	width: 46px;
	height: 46px;
	background: #0c91df;
	border-radius: 50%;
	flex-shrink: 0;
`;

export const MessageItemDetailsStyle = styled.div`
  flex: 1;
`;

export const MessageItemHeaderStyle = styled.div`
	display: flex;
	align-items: flex-end;
	gap: 12px;

	& .time {
		color: #6d6d6d;
		font-size: 12px;
		font-weight: 400;
		font-style: italic;
	}
`;

export const MessageItemHeaderNameStyle = styled.span<MessageItemHeaderNameProps>`
  font-weight: 600;
  font-size: 16px;
  margin-top: 5px;
  color: ${({ color }) => color || "#ccc"};
`;

export const MessageItemContentStyle = styled.div<MessageItemContentProps>`
	padding: ${({ padding }) => padding};
	font-size: 14px;
	line-height: 22px;
	font-weight: 400;
  word-break: break-all;
  width: 100%;
`;

export const MessagePanelHeaderStyle = styled.header`
	background: #0f0f0f;
	border-bottom: 1px solid #5454543d;
	border-left: 1px solid #5454543d;
	height: 65px;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 32px;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;

  & > div {
    display: flex;
    align-items: center;
    gap: 10px;

    & > img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }

    & > button {
      border: none;
      outline: none;
      background: transparent;
      color: #fff;
      cursor: pointer;

      & > svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

export const DeletedMessageStyle = styled.span`
	color: #6d6d6d;
	font-style: italic;
`;

export const MessageContextMenuStyle = styled.div<MessageContextMenuProps>`
	position: fixed;
  width: 200px;
  box-sizing: border-box;
  border-radius: 4px;
  background: #252525;

  ${({ top, left }) => css`
    top: ${top}px;
    left: ${left}px;
  `}

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;

    li {
      padding: 10px 15px;
      font-size: 14px;

      &:hover {
        cursor: pointer;
        background: #1f1f1f;
      }
    }
  }
`;

export const MessageTypingStatusStyle = styled.div`
	width: 100%;
  font-size: 12px;
  font-style: italic;
  color: #a2a2a2;
  box-sizing: border-box;
  height: 30px;
  display: flex;
  align-items: center;
`;

export const EditMessageInputStyle = styled.input`
	outline: none;
	border: none;
  color: #bababa;
  font-family: "Inter";
  box-sizing: border-box;
  font-size: 15px;
  padding: 18px 22px;
  border-radius: 5px;
  margin: 4px 0;
  width: 100%;
  background: #222222;
`;

export const EditMessageActionInfoStyle = styled.div`
  color: #ccc;
  font-size: 12px;
  font-style: italic;

	& > span {
    color: #0066ff;
    font-weight: bold;
    font-style: normal;
  }
`;

export const ConversationSelectorStyle = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  padding: 20px;
  background: #0f0f0f;
  border-bottom: 1px solid #4343435f;
  box-sizing: border-box;

  & .item {
    padding: 8px 24px;
    border-radius: 5px;
    font-size: 12px;
    cursor: pointer;
    font-weight: 500;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #151515;
    font-weight: 500;
    opacity: .5;
  }
  
  & .item.selected {
    opacity: 1;
  }
  `;

export const CoversationsSidePanelStyle = styled.div`
  width: 60px;
  background: #0f0f0f;
  padding: 20px 10px 5px 10px;
  display: flex;
  flex-direction: column;

  & > ul {
    list-style: none;
    padding: 0;

    &:last-child {
      margin-top: auto;
      margin-bottom: 0;
    }

    & > li {
      width: 100%;
      padding: 15px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      
      & > svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

export const CoversationsSidePanelUserImageStyle = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const ConversationSidebarHolderStyle = styled.div`
  flex: 1;
  border-left: 1px solid #5454543d;
  background: #0f0f0f;
`;