import axios from "axios";

/**
 * 할 일 체크 업데이트
 * @param {number} scheduleNo - 체크할 일정 번호
 * @param {number} projectNo - 프로젝트 번호
 * @param {number} signedUserNo - 로그인한 유저 번호
 * @param {function} updateMembers - 멤버 상태를 업데이트하는 함수
 */
export const handleCheck = async (
  scheduleNo,
  clickProjectNo,
  signedUserNo,
  updateMembers,
) => {
  try {
    const response = await axios.post(
      `/api/project/schedule/${scheduleNo}`,
      null,
      { params: { signedUserNo, scheduleNo } },
    );

    if (response.status === 200) {
      if (response.data.code === "NF") {
        console.log("권한 없음");
      } else {
        console.log("체크 업데이트 성공:", response.data);

        const projectResponse = await axios.get(
          `/api/project/${clickProjectNo}`,

          {
            params: { signedUserNo },
          },
        );

        if (projectResponse.status === 200) {
          const { memberList } = projectResponse.data.project;
          updateMembers(memberList); // 상태 업데이트 콜백 호출
        }
      }
    }
  } catch (error) {
    console.error("API 호출 오류:", error);
  }
};

/**
 * 멤버 데이터 새로고침
 * @param {number} projectNo - 프로젝트 번호
 * @param {number} signedUserNo - 로그인한 유저 번호
 * @param {function} updateMembers - 멤버 상태를 업데이트하는 함수
 */
export const refreshData = async (
  clickProjectNo,
  signedUserNo,
  updateMembers,
) => {
  try {
    const response = await axios.get(`/api/project/${clickProjectNo}`, {
      params: { signedUserNo },
    });

    if (response.status === 200) {
      const { memberList } = response.data.project;
      updateMembers(memberList || []);
    }
  } catch (error) {
    console.log(clickProjectNo, signedUserNo, updateMembers);

    console.error("데이터 갱신 오류:", error);
  }
};

/**
 * 할 일이 남아있는 잠긴 팀원 확인
 * @param {number} projectNo - 프로젝트 번호
 * @param {number} signedUserNo - 로그인한 유저 번호
 * @param {function} updateMembers - 멤버 상태를 업데이트하는 함수
 * @param {function} showMessageModal - 메시지 모달을 열기 위한 함수
 */
export const checkUnassignedTasks = async (
  clickProjectNo,
  signedUserNo,
  updateMembers,
  showMessageModal,
) => {
  try {
    const response = await axios.get(`/api/project/${clickProjectNo}`, {
      params: { signedUserNo },
    });

    console.log("API 응답 데이터:", response.data);

    if (response.status === 200) {
      const { memberList } = response.data.project;
      updateMembers(memberList || []);

      const unassignedMember = memberList.find(
        (member) =>
          member.lock === 1 &&
          Array.isArray(member.scheduleList) &&
          member.scheduleList.filter(
            (item) => item !== null && item !== undefined,
          ).length > 0,
      );

      if (unassignedMember) {
        showMessageModal(true); // 모달 표시
      }
    }
  } catch (error) {
    console.log("Unassigned 상태 확인 오류:", error);
  }
};

/**
 * 멤버 리스트를 주어진 크기로 나눕니다.
 * @param {Array} members - 나눌 멤버 배열
 * @param {number} chunkSize - 각 조각의 크기
 * @returns {Array} - 나눠진 멤버 배열 조각들의 배열
 *
 * @example
 * const members = [1, 2, 3, 4, 5];
 * const chunkSize = 2;
 * const result = chunkMembers(members, chunkSize);
 * // result: [[1, 2], [3, 4], [5, null]]
 *
 * @description
 * - 주어진 멤버 배열을 `chunkSize` 크기만큼의 배열로 나눕니다.
 * - `members.length`가 `chunkSize`로 나누어떨어지지 않을 경우,
 *   배열 끝에 `null` 값을 추가하여 나누어진 배열 크기를 동일하게 만듭니다.
 */
export const chunkMembers = (members, chunkSize) => {
  const result = [];
  while (members.length % chunkSize !== 0) {
    members.push(null); // 배열 크기를 chunkSize의 배수로 맞추기 위해 null 추가
  }
  for (let i = 0; i < members.length; i += chunkSize) {
    const chunk = members.slice(i, i + chunkSize);
    result.push(chunk); // chunkSize만큼의 조각 추가
  }
  return result;
};
