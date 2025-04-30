function displayInput() {
  const input = document.getElementById("nameInput").value;
  alert("입력된 이름: " + input);
}

document.getElementById("colorButton").addEventListener("click", function () {
  const colors = [
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#00ffff",
    "#ff00ff",
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.backgroundColor = randomColor;
});
