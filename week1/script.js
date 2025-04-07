function showAlert() {
    alert('버튼을 클릭했어요!');
}

function showName() {
    const input = document.getElementById('nameInput').value;
    const result = document.getElementById('nameResult');
    result.textContent = `안녕하세요, ${input}님!`;
}

function changeBackground() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}
