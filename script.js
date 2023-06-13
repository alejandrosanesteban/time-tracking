let data; // Declara la variable data fuera de la función getData

const generateContentForEachContainer = () => {
  data.forEach((element, index) => {
    const container = document.getElementById(`container-${index}`);
    generateContent(element, container);
  });
};

const generateContent = (element, container) => {
  let contenido = "";
  contenido += `
    <div class="title">
      <p>${element.title}</p>
      <p class="dots">...</p>
    </div>
    <h2>${element.timeframes[currentTime].current}hrs</h2>
    <p>${getPeriodLabel(currentTime)} - ${element.timeframes[currentTime].previous}hrs</p>
  `;
  container.querySelector(".data").innerHTML = contenido;
};

const getData = async () => {
  try {
    const response = await fetch("data.json");
    data = await response.json(); // Asigna el valor a la variable data
    generateContentForEachContainer();
  
  } catch (error) {
    console.log(error);
  }
};

const getPeriodLabel = (currentTime) => {
  if (currentTime === "daily") {
    return "Yesterday";
  } else if (currentTime === "weekly") {
    return "Last Week";
  } else if (currentTime === "monthly") {
    return "Last Month";
  }
};


let currentTime = "daily"; // Valor predeterminado

const daily = document.getElementById("daily");
const weekly = document.getElementById("weekly");
const monthly = document.getElementById("monthly");
let period = document.querySelector(".period");

getData();

daily.addEventListener("click", () => {
  currentTime = "daily";
  generateContentForEachContainer();
});
weekly.addEventListener("click", () => {
  currentTime = "weekly";
  generateContentForEachContainer();
});
monthly.addEventListener("click", () => {
  currentTime = "monthly";
  generateContentForEachContainer();
});


generateContentForEachContainer();
