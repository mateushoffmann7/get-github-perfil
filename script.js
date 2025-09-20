import { GITHUB_TOKEN } from "./config.js";
const input = document.querySelector(".inputSearch");
const sayHello = document.querySelector(".textHello");
const profileImg = document.querySelector(".imgPerfil img");
const list = document.querySelector(".list");

const handleAddPerfil = async (e) => {
  let response = await fetch(`https://api.github.com/users/${input.value}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
  });
  let json = await response.json();
  if (response.ok && json.login) {
    if (input.value !== "" && e.key === "Enter") {
      list.innerHTML = "";
      sayHello.innerHTML =
        json.name === null ? "---" : `Olá, me chamo ${json.name}!`;
      profileImg.setAttribute("src", json.avatar_url);
      const newBio = document.createElement("li");
      newBio.classList.add("newLi");
      newBio.innerHTML = json.bio === null ? "---" : `Bio: ${json.bio}`;
      const newLocation = document.createElement("li");
      newLocation.classList.add("newLi");
      newLocation.innerHTML =
        json.location === null ? "---" : `Localização: ${json.location}`;
      list.append(newBio);
      list.append(newLocation);
      input.value = "";
    } else {
      list.innerHTML = "";
      profileImg.setAttribute(
        "src",
        "./assets/Eric Bellinger's 5 Tips On Making It Big As A Songwriter.jpg"
      );
    }
  }
};

document.documentElement.addEventListener("keyup", handleAddPerfil);
