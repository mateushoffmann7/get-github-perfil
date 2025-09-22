const input = document.querySelector(".inputSearch");
const sayHello = document.querySelector(".textHello");
const profileImg = document.querySelector(".imgPerfil img");
const list = document.querySelector(".list");

const handleAddPerfil = async (e) => {
  try {
    let response = await fetch(`https://api.github.com/users/${input.value}`);
    let json = await response.json();
    if (!response) {
      throw new Error("");
    }
    if (input.value !== "" && e.key === "Enter") {
      sayHello.innerHTML = !json.name
        ? "Usuário não encontrado..."
        : `Olá, me chamo ${json.name}!`;
      profileImg.setAttribute(
        "src",
        !json.avatar_url
          ? "./assets/Eric Bellinger's 5 Tips On Making It Big As A Songwriter.jpg"
          : json.avatar_url
      );
      input.classList.remove("error");
      const newBio = document.createElement("li");
      newBio.classList.add("newLi");
      newBio.innerHTML = !json.bio ? "---" : `Bio: ${json.bio}`;
      const newLocation = document.createElement("li");
      newLocation.classList.add("newLi");
      newLocation.innerHTML = !json.location
        ? "---"
        : `Localização: ${json.location}`;
      list.append(newBio);
      list.append(newLocation);
      input.value = "";
    }
  } catch (error) {
    input.classList.add("error");
  }
};

document.documentElement.addEventListener("keyup", handleAddPerfil);
