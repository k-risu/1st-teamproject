import { NicknameInput, CheckButton } from "./MyPageEdit.styled";

function NicknameValidation({
  nickname,
  isEditable,
  isNicknameChecked,
  handleCheckNickname,
  onNicknameChange, // onChange 핸들러 추가
}) {
  return (
    <div>
      <label htmlFor="nickname">닉네임</label>
      <NicknameInput
        id="nickname"
        type="text"
        value={nickname || ""}
        onChange={onNicknameChange} // onChange 추가
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
