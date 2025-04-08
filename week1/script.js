function showAlert() {
    alert("안녕하세요 ! 저는 권나래 입니다 🌸");
  }
  
  function showName() {
    const input = document.getElementById("nameInput").value;
    const output = document.getElementById("outputText");
    if (input.trim() === "") {
      output.textContent = "이름을 입력해주세요 !";
    } else {
      output.textContent = `안녕하세요, ${input}님 !`;
    }
  }
  
  function changeBackground() {
    const pastelColors = [
      "#FFD1DC", // pink
      "#FFECB3", // light yellow
      "#C8E6C9", // light green
      "#B3E5FC", // light blue
      "#E1BEE7", // light purple
      "#FFF9C4"  // light lemon
    ];
    const randomColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];
    document.body.style.backgroundColor = randomColor;
  }
  