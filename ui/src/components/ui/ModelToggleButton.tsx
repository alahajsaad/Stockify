// import Button from "./Button";
// import Modal from "./Modal";

// import React from "react";
// import useToggle from "../../hooks/useToggle";
// type ModelTypes = {
//   content: (toggleModal: () => void) => React.ReactNode;
   
//     ModalTitle :string,
   
// } 
// const ModelToggleButton = ({content , ModalTitle  } : ModelTypes) => {
//   const [isModalOpen, toggleModal] = useToggle(false);
//   return (
//     <div>
//         <Button variant="add"  onClick={toggleModal}/>
//         <Modal title={ModalTitle} isOpen={isModalOpen} setIsEditing={toggleModal}>
//          {content(toggleModal)}
//          </Modal>
//     </div>
   
//   )
// }

// export default ModelToggleButton