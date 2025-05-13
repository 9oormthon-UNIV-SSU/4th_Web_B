function InputForm({ inputValue, setInputValue, addItem, isLoading }) {
  return (
    <div className="input-section">
      <input
        type="text"
        placeholder="할 일을 입력하세요"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={addItem} disabled={isLoading}>
        추가
      </button>
    </div>
  );
}
export default InputForm;
