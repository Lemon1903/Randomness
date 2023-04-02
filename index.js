const memeGeneratorBtn = document.querySelector("#generate-meme");
const jokeGeneratorBtn = document.querySelector("#generate-joke");
const quoteGeneratorBtn = document.querySelector("#generate-quote");
const riddleGeneratorBtn = document.querySelector("#generate-riddle");

const main = document.getElementById("main");
const category = document.querySelector("#category");

const apis = {
  memeApi: "https://programming-memes-images.p.rapidapi.com/v1/memes",
  jokeApi: "https://v2.jokeapi.dev/joke/Any",
  quoteApi: "https://api.quotable.io/random",
  riddleApi: "https://riddles-api.vercel.app/random/",
};

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "dc6b1859b2msh22dddb7f809f198p1e82d1jsn215d942faa35",
    "X-RapidAPI-Host": "programming-memes-images.p.rapidapi.com",
  },
};

const contentBtn = document.createElement("button");
contentBtn.className = "content-button";

const toTitleCase = (word) => word[0].toUpperCase() + word.substring(1);
const reveal = (newHtml) => {
  contentBtn.remove();
  main.innerHTML += newHtml;
};

memeGeneratorBtn.onclick = async () => {
  fetch(apis.memeApi, options)
    .then((response) => response.json())
    .then((data) => {
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomMeme = data[randomIndex];

      main.innerHTML = `
        <h2 class="big-spacing small-font">THE MEME GENERATED</h2>
        <a href=${randomMeme.image} target="_blank">
          <img src="${randomMeme.image}"/>
        </a>
      `;
      category.textContent = "Programming";
    });
};

jokeGeneratorBtn.onclick = async () => {
  fetch(apis.jokeApi)
    .then((response) => response.json())
    .then((data) => {
      main.innerHTML = `
        <h2 class="big-spacing small-font">JOKE #${data.id}</h2>
      `;

      const content1 = document.createElement("p");
      content1.className = "medium-font";

      if (data.type === "single") {
        content1.textContent = data.joke;
        main.appendChild(content1);
      } else {
        const content2 = `<p class="medium-font">${data.delivery}</p>`;
        content1.textContent = data.setup;
        contentBtn.textContent = "Continue?";
        contentBtn.onclick = () => reveal(content2);
        main.append(content1, contentBtn);
      }

      category.textContent = data.category;
    });
};

quoteGeneratorBtn.onclick = async () => {
  fetch(apis.quoteApi)
    .then((response) => response.json())
    .then((data) => {
      main.innerHTML = `
        <h2 class="big-spacing small-font">A RANDOM QUOTE</h2>
        <p class="medium-font">"${data.content}"</p>
        <p class="big-spacing small-font">-- ${data.author} --</p>
      `;
      category.textContent = data.tags.map((tag) => toTitleCase(tag)).join(", ");
    });
};

riddleGeneratorBtn.onclick = async () => {
  fetch(apis.riddleApi)
    .then((response) => response.json())
    .then((data) => {
      const content2 = `
        <p class="big-spacing small-font">
          ANSWER: <span class="medium-font">${data.answer.toUpperCase()}</span>
        </p>
      `;
      contentBtn.textContent = "Reveal Answer?";
      contentBtn.onclick = () => reveal(content2);
      main.innerHTML = `
        <h2 class="big-spacing small-font">THE RIDDLE</h2>
        <p class="medium-font">"${data.riddle}"</p>
      `;
      main.appendChild(contentBtn);
      category.textContent = "Unknown";
    });
};
