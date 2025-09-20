export default async function handler(req, res) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: "Username required" });
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      res.status(200).json(data);
    } else {
      res.status(response.status).json(data);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
}
