// api/github.js
export default async function handler(req, res) {
  console.log("API route chamada com:", req.query);

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const { username } = req.query;

  if (!username) {
    console.log("Username não fornecido");
    return res.status(400).json({ error: "Username é obrigatório" });
  }

  try {
    console.log("Fazendo requisição para GitHub API...");
    console.log("Token existe?", !!process.env.GITHUB_TOKEN);

    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "GitHub-Profile-App",
      },
    });

    console.log("Status da resposta:", response.status);

    const data = await response.json();
    console.log("Dados recebidos:", data);

    if (response.ok) {
      res.status(200).json(data);
    } else {
      res.status(response.status).json(data);
    }
  } catch (error) {
    console.error("Erro na API:", error);
    res.status(500).json({
      error: "Erro interno do servidor",
      details: error.message,
    });
  }
}
