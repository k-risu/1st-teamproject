import { useState } from "react";

const useProjectMembersLogic = (initialMembers = []) => {
  const [members, setMembers] = useState(initialMembers);
  const [openModalId, setOpenModalId] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [msgModal, setMsgModal] = useState(false);
  const [openTaskModalFor, setOpenTaskModalFor] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalMode, setModalMode] = useState(null);

  const openModal = (id, event) => {
    const { top, left, width } = event.target.getBoundingClientRect();
    setModalPosition({
      top: top + window.scrollY,
      left: left + width,
    });
    setOpenModalId(id);
  };

  const closeTaskModal = () => {
    setOpenTaskModalFor(null);
    setSelectedTask(null);
    setModalMode(null);
  };

  const openTaskModal = (memberNo) => {
    setOpenModalId(null);
    setOpenTaskModalFor(memberNo);
  };

  const msgCloseModal = () => setMsgModal(false);

  const openTaskModalForEdit = (taskData) => {
    setSelectedTask(taskData); // TaskDetails로부터 전달된 데이터 설정
    setModalMode("edit"); // AddTaskModal을 수정 모드로 설정
  };

  const handleTaskSubmit = (updatedTask) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) => ({
        ...member,
        scheduleList: member.scheduleList.map((task) =>
          task.scheduleNo === updatedTask.scheduleNo ? updatedTask : task,
        ),
      })),
    );
    closeTaskModal();
  };

  return {
    members,
    setMembers,
    openModal,
    closeTaskModal,
    openTaskModal,
    msgCloseModal,
    openTaskModalForEdit,
    handleTaskSubmit,
    openModalId,
    modalPosition,
    msgModal,
    openTaskModalFor,
    selectedTask,
    modalMode,
  };
};

export default useProjectMembersLogic;
