import { NicknameInput, CheckButton } from "../MyPageEdit.styled";

function NicknameValidation({
  nickname,
  isEditable,
  isNicknameChecked,
  handleCheckNickname,
  onNicknameChange,
}) {
  return (
    <div>
      <label htmlFor="nickname"></label>
      <NicknameInput
        id="nickname"
        type="text"
        value={nickname || ""}
        onChange={onNicknameChange}
        disabled={!isEditable}
      />
      {isEditable && (
        <CheckButton
          type="button"
          onClick={handleCheckNickname}
          isAvailable={isNicknameChecked}
        >
          {isNicknameChecked ? "사용 가능" : "중복 확인"}
        </CheckButton>
      )}
    </div>
  );
}

export default NicknameValidation;
