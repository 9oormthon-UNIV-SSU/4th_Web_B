const nameBtn = document.querySelector("#nameBtn");

nameBtn.addEventListener("click", function() {
    const name = document.querySelector("#nameInput").value;
    const p = document.createElement("p");
    p.textContent = `안녕하세요, ${name}님!`; 
    document.querySelector("#nameOutput").appendChild(p);
})

const colorBtn = document.querySelector("#colorBtn");

colorBtn.addEventListener("click", function() {
    document.body.style.backgroundColor = randomRGB();
})

function randomRGB() {
    const rColor = Math.floor(Math.random() * 256);
    const gColor = Math.floor(Math.random() * 256);
    const bColor = Math.floor(Math.random() * 256);
    return `rgb(${rColor},${gColor},${bColor})`;
}