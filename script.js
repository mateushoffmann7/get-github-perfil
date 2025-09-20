//https://avatars.githubusercontent.com/u/184573664?v=4
//https://api.github.com/users/mateushoffmann7
const input = document.querySelector(".inputSearch");
const sayHello = document.querySelector(".textHello");
const profileImg = document.querySelector(".imgPerfil img");
const list = document.querySelector(".list");

const handleAddPerfil = async (e) => {
  let response = await fetch(`https://api.github.com/users/${input.value}`);
  let json = await response.json();
  if (json.login === undefined) {
    throw new Error("");
  }
  if (input.value !== "" && e.key === "Enter") {
    profileImg.setAttribute("src", json.avatar_url);
  }
};

document.documentElement.addEventListener("keyup", handleAddPerfil);
