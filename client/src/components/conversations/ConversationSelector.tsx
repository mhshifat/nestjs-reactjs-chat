import { useDispatch, useSelector } from "react-redux";
import { ConversationSelectorStyle } from "../../utils/styles";
import { RootState, AppDisopatch } from "../../store";
import { setType } from "../../store/selectedSlice";
import { useNavigate } from "react-router-dom";

export default function ConversationSelector() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDisopatch>();
  const { type } = useSelector((state: RootState) => state.selectedState)

  return (
    <ConversationSelectorStyle>
      <div className={`item ${type === "private" ? "selected" : ""}`} onClick={() => {dispatch(setType("private")); navigate("/conversations")}}>Private</div>
      <div className={`item ${type === "group" ? "selected" : ""}`} onClick={() => {dispatch(setType("group")); navigate("/groups");}}>Group</div>
    </ConversationSelectorStyle>
  )
}