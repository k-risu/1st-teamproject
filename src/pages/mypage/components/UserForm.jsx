import {
  EditForm,
  InputWrapper,
  Label,
  InputField,
  SubmitButton,
} from "../MyPageEdit.styled";
import NicknameValidation from "./NicknameValidation";

function UserForm({
  email,
  userId,
  nickname,
  onNicknameChange,
  isNicknameChecked,
  handleCheckNickname,
  statusMessage,
  onStatusMessageChange,
  isEditable,
  handleSubmit,
}) {
  return (
    <EditForm onSubmit={handleSubmit}>
      <InputWrapper>
        <Label>아이디</Label>
        <InputField type="text" value={userId} readOnly />
      </InputWrapper>
      <InputWrapper>
        <Label>이메일</Label>
        <InputField type="text" value={email} readOnly />
      </InputWrapper>
      <InputWrapper>
        <Label>닉네임</Label>
        <NicknameValidation
          nickname={nickname}
          isEditable={isEditable}
          isNicknameChecked={isNicknameChecked}
          handleCheckNickname={handleCheckNickname}
          onNicknameChange={onNicknameChange}
        />
      </InputWrapper>
      <InputWrapper>
        <Label>상태 메시지</Label>
        <InputField
          value={statusMessage}
          onChange={onStatusMessageChange}
          disabled={!isEditable}
        />
      </InputWrapper>
      {isEditable && (
        <SubmitButton
          type="submit"
          disabled={!isEditable}
          title={!isEditable ? "수정할 수 없습니다." : ""}
        >
          정보변경 하기
        </SubmitButton>
      )}
    </EditForm>
  );
}

export default UserForm;
