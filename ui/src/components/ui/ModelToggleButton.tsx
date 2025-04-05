// import Button from "./Button";
// import Modal from "./Modal";
// import { IoMdAdd } from "react-icons/io";

// import { IconType } from "react-icons";
// import React from "react";
// import useToggle from "../../hooks/useToggle";
// type ModelTypes = {
//   content: (toggleModal: () => void) => React.ReactNode;
//     title? : string ,
//     icon? : IconType ,
//     ModalTitle :string,
//     testId?: string;
// } 
// const ModelToggleButton = ({content , ModalTitle ,title , icon = IoMdAdd,testId} : ModelTypes) => {
//   const [isModalOpen, toggleModal] = useToggle(false);
//   return (
//     <div>
//         <Button testId={testId}  title={title} icon={icon} onClick={toggleModal}/>
//         <Modal ModalTitle={ModalTitle} isEditing={isModalOpen} setIsEditing={toggleModal}>
//          {content(toggleModal)}
//          </Modal>
//     </div>
   
//   )
// }

// export default ModelToggleButton