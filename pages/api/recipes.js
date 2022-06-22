export default async function handler(req, res) {
	const query = req.query;
	const { ingredient } = query;

	const data = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.API_KEY}&ingredients=${ingredient}`,  )
	.then(response => response.json());
	res.json(data);
}