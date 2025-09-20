const input = document.querySelector(".inputSearch");
const sayHello = document.querySelector(".textHello");
const profileImg = document.querySelector(".imgPerfil img");
const list = document.querySelector(".list");

const handleAddPerfil = async (e) => {
  let response = await fetch(`https://api.github.com/users/${input.value}`);
  let json = await response.json();
  if (json.login === undefined) {
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
    }
  }
};

document.documentElement.addEventListener("keyup", handleAddPerfil);
