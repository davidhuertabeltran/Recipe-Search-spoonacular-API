import React, { useState } from "react";
import { Container, Flex, Heading, Text, FormControl, Input, Button, useColorMode } from "@chakra-ui/react";
import {RecipeList} from "../src/sections/RecipeList";

const Page = () => {
	const {colorMode, toggleColorMode} = useColorMode();

	const apiKey = "";

	const [recipeData, setRecipeData] = useState(null);
	const [ingredient, setIngredient] = useState('');
	
	function setQuery(e) {
		setIngredient(e.target.value);
	}

	function getRecipesByIngredient() {
		fetch(
			`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredient}`
		)
		.then((response) => response.json())
		.then((data) => {
			setRecipeData(data);
		})
		.catch(() => {
			console.log("An error ocurred")
		})
	}

	return (
	<Container maxWidth="container.xl" padding={0}>
		<Button
			onClick={toggleColorMode}
			float="right"
			position="absolute"
			right={10} top={10}
			transitionDuration="200ms"
		>
			{colorMode === 'light' ? 'Dark' : 'Light'} Mode
		</Button>
		<Flex p={[10, 20]} flexDirection="column" alignItems="center" gap={5} justifyContent="center">
			<Heading size="2xl" textAlign="center">Search Recipes by Ingredients</Heading>
			<Text>Write down your favorite ingredient</Text>
			<FormControl maxWidth="container.lg">
				<Flex alignItems="center" gap={5} direction={ {base: 'column', sm: 'row'}}>
					<Input placeholder="search" variant="filled" type="text" onChange={setQuery}/>
					<Button onClick={getRecipesByIngredient}>
						Search
					</Button>
				</Flex>
			</FormControl>
			{recipeData && <RecipeList recipeData={recipeData} /> }
		</Flex>
	</Container>
	)
}

export default Page;