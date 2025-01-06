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
 * 멤버 리스트를 주어진 크기로 나누고, lock이 1인 멤버는 scheduleList가 있을 때만 표시합니다.
 * lock이 1이고 scheduleList가 없는 멤버는 null로 처리합니다.
 * @param {Array} members - 나눌 멤버 배열
 * @param {number} chunkSize - 각 조각의 크기
 * @returns {Array} - 나눠진 멤버 배열 조각들의 배열
 *
 * @example
 * const members = [{lock: 0, scheduleList: []}, {lock: 0}, {lock: 1, scheduleList: []}, {lock: 1, scheduleList: [1]}];
 * const chunkSize = 4;
 * const result = chunkMembers(members, chunkSize);
 * // result: [[{lock: 0, scheduleList: []}, null, {lock: 1, scheduleList: [1]}]]
 */
export const chunkMembers = (members, chunkSize) => {
  const result = [];

  // lock이 1이고 scheduleList가 존재하는 멤버만 표시
  const processedMembers = members.filter((member) => {
    // lock이 1이고 scheduleList가 존재하는 경우에만 표시
    if (member.lock === 1) {
      return member.scheduleList && member.scheduleList.length > 0;
    }
    return true; // lock이 0인 멤버는 그대로 유지
  });

  // lock이 1이고 scheduleList가 없는 멤버들 처리 (null로 처리)
  const lockOneWithoutSchedule = members
    .filter(
      (member) =>
        member.lock === 1 &&
        (!member.scheduleList || member.scheduleList.length === 0),
    )
    .map(() => null); // 이 부분에서 null을 반환하도록 처리

  // lock이 1인 멤버들을 앞에 배치하고 lock이 0인 멤버들을 뒤에 배치
  const finalMembers = [...processedMembers, ...lockOneWithoutSchedule];

  // 배열 크기가 chunkSize의 배수가 되도록 null 추가
  while (finalMembers.length % chunkSize !== 0) {
    finalMembers.push(null);
  }

  // 배열을 chunkSize 크기로 나누기
  for (let i = 0; i < finalMembers.length; i += chunkSize) {
    const chunk = finalMembers.slice(i, i + chunkSize);
    result.push(chunk);
  }

  return result;
};
