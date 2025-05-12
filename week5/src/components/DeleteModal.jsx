function DeleteModal({ onConfirm, onCancel }) {
    return (
      <div className="modal-container">
        <div className="modal-content">
          <p>삭제하시겠습니까 ?</p>
          <button onClick={onConfirm} style={{margin: "0px"}}>확인</button>
          <button onClick={onCancel}>취소</button>
        </div>
      </div>
    );
  }
  export default DeleteModal;