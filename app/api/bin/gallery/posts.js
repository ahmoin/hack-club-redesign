import AirtablePlus from "airtable-plus";

const fetchPosts = async () => {
	try {
		const airtable = new AirtablePlus({
			apiKey: process.env.AIRTABLE_API_KEY,
			baseID: "appKjALSnOoA0EmPk",
			tableName: "Main",
		});

		const records = await airtable.read();

		const posts = records.map((record) => {
			return {
				ID: record.id,
				title: record.fields.Title,
				desc: record.fields["What will you be building?"],
				slack: record.fields["Slack Handle"],
				link: record.fields["Wokwi Share link"],
				status: record.fields.Status,
				hide: record.fields["Hide From Gallery"],
				created: record.fields["Created At"],
				parts: record.fields["Parts List"],
			};
		});

		return posts;
	} catch (error) {
		console.error("Error fetching posts:", error);
		throw error;
	}
};

export default async function handler(_req, res) {
	try {
		const data = await fetchPosts();
		res.status(200).json(data);
	} catch (_error) {
		res.status(500).json({ error: "Failed to fetch posts" });
	}
}
