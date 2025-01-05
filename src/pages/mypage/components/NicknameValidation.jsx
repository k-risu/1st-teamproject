import {
  NicknameInput,
  CheckButton,
  NicknameContainer,
} from "../MyPageEdit.styled";

function NicknameValidation({
  nickname,
  isEditable,
  isNicknameChecked,
  handleCheckNickname,
  onNicknameChange,
}) {
  const handleNicknameChange = (e) => {
    const cleanNickname = e.target.value.replace(/#/g, ""); // `#` 자동 제거
    onNicknameChange({ target: { value: cleanNickname } });
  };

  return (
    <NicknameContainer>
      <NicknameInput
        id="nickname"
        type="text"
        value={nickname || ""}
        onChange={handleNicknameChange}
        disabled={!isEditable}
        placeholder="닉네임을 입력하세요 (특수문자 # 사용 불가)"
      />
      {/* {isEditable && (
        <CheckButton
          type="button"
          onClick={handleCheckNickname}
          isAvailable={isNicknameChecked}
        >
          {isNicknameChecked ? "사용 가능" : "중복 확인"}
        </CheckButton>
      )} */}
    </NicknameContainer>
  );
}

export default NicknameValidation;
