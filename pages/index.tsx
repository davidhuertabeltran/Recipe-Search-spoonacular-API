import React, { useEffect, useState, useRef } from 'react';
import { Container, Flex, Heading, Text, FormControl, Input, Button, useBoolean } from '@chakra-ui/react';
import {RecipeList} from '../src/sections/RecipeList';
import {SearchHistory} from '../src/sections/SearchHistory';

const Page = () => {
	const [open, setOpen] = useBoolean();

	const apiKey = '';
	const lastSearches = 'last_searches';

	const [recipeData, setRecipeData] = useState(null);
	const [ingredient, setIngredient] = useState('');
	const [items, setItems] = useState([]);
	const inputSearch = useRef(null);

	useEffect(() => {
		const savedRecipes = JSON.parse(localStorage.getItem(lastSearches)) || [];
		setItems(savedRecipes);
	}, [])

	useEffect(() => {
		localStorage.setItem(lastSearches, JSON.stringify(items))
	}, [items])
	
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
			saveSearch(data);
		})
		.catch(() => {
			console.log('An error ocurred')
		})
	}

	function saveSearch(searchResult) {
		if (items.length === 0) {
			let obj = {};
			obj[ingredient] = searchResult;
			return setItems([obj]);
		} 
		
		let recipes = [...items];

		let ingredients = Object.values(recipes).map(el => Object.keys(el)[0]);
		if (ingredients.includes(ingredient)) {
			const fromIndex = ingredients.indexOf(ingredient);
			const toIndex = 0;
			const element = recipes.splice(fromIndex, 1)[0];
			recipes.splice(toIndex, 0, element);
		} else {
			let obj = {};
			obj[ingredient] = searchResult;
			recipes.push(obj);
			if (recipes.length > 10) {
				recipes.pop();
			}
		}
		setItems(recipes);
	}

	function searchFromHistory(item) {
		setIngredient(item);
		inputSearch.current.value = item;
		getRecipesByIngredientFromSearchHistory(item);
	}

	function getRecipesByIngredientFromSearchHistory(wordFromHistory) {
		let recipe = items.find(el => Object.keys(el)[0] === wordFromHistory);
		if (recipe) {
			setRecipeData(Object.values(recipe)[0]);
		}
	}

	return (
	<Container maxWidth='container.xl' padding={0} onClick={open === true ? setOpen.off : null}>
		<Flex p={[10, 20]} flexDirection='column' alignItems='center' gap={5} justifyContent='center'>
			<Heading size='2xl' textAlign='center'>Search Recipes by Ingredients</Heading>
			<Text>Write down your favorite ingredient</Text>
			<FormControl maxWidth='container.lg'>
				<Flex alignItems='center' gap={5} direction={ {base: 'column', sm: 'row'}}>
					<Input
						ref={inputSearch}
						placeholder='search'
						variant='filled'
						type='text'
						onChange={setQuery}
						onClick={setOpen.toggle}
					/>
					{items && <SearchHistory lastSearches={items} searchFromHistory={searchFromHistory} open={open} />}
					<Button onClick={getRecipesByIngredient}>
						Search
					</Button>
					
				</Flex>
			</FormControl>
			{recipeData && <RecipeList recipeData={recipeData} ingredient={ingredient}/> }
		</Flex>
	</Container>
	)
}

export default Page;