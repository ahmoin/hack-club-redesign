export async function getGames() {
	try {
		const games = await fetch("https://sprig.hackclub.com/api/gallery?new").then(
			(res) => res.json(),
		);

		return games;
	} catch (e) {
		console.error(e);
		return [];
	}
}

export default async function Games(_req, res) {
	const games = await getGames();
	res.json(games);
}
