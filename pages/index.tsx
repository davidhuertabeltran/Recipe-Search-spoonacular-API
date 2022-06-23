import React, { useEffect, useState, useRef } from 'react';
import { Container, Flex, Heading, Text, FormControl, Input, Button, useBoolean } from '@chakra-ui/react';
import {RecipeList} from '../src/sections/RecipeList';
import {SearchHistory} from '../src/sections/SearchHistory';
import { Header } from '../src/sections/Header';

const Page = () => {
	const [open, setOpen] = useBoolean();
	const lastSearches = 'last_searches';
	const [recipeData, setRecipeData] = useState<Array<Object>>(null);
	const [ingredient, setIngredient] = useState<string>('');
	const [items, setItems] = useState<Array<Object>>([]);
	const inputSearch = useRef<HTMLInputElement>(null);
	const [noData, setNoData] = useState<boolean>(false);

	useEffect(() => {
		const savedRecipes = JSON.parse(localStorage.getItem(lastSearches)) || [];
		setItems(savedRecipes);
	}, [])

	useEffect(() => {
		localStorage.setItem(lastSearches, JSON.stringify(items))
	}, [items])
	
	function setQuery(e: React.ChangeEvent<HTMLInputElement>) {
		setIngredient(e.target.value);
	}

	const getRecipesByIngredient = async () => {
		setNoData(false);
		fetch(`/api/recipes?ingredient=${ingredient}`, {
			headers: {
				Accept: "application/json",
			},
		})
		.then((response) => response.json())
		.then((data) => {
			setRecipeData(data);
			saveSearch(data);
			if(data.length === 0) {
				setNoData(true);
			}
		})
		.catch(() => {
			console.log('An error ocurred')
		})
	}

	function saveSearch(searchResult: Array<Object>) {
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
			recipes.splice(0, 0, obj)
			if (recipes.length > 10) {
				recipes.pop();
			}
		}
		setItems(recipes);
	}

	function searchFromHistory(item: string) {
		setNoData(false);
		setIngredient(item);
		inputSearch.current.value = item;
		getRecipesByIngredientFromSearchHistory(item);
	}

	function getRecipesByIngredientFromSearchHistory(ingredientFromHistory: string) {
		let recipe = items.find(el => Object.keys(el)[0] === ingredientFromHistory);
		if (recipe) {
			setRecipeData(Object.values(recipe)[0]);
		}
	}

	return (
	<Container maxWidth='container.xl' padding={0} onClick={open === true ? setOpen.off : null}>
		<Header />
		<Flex p={[10, 20]} flexDirection='column' alignItems='center' gap={5} justifyContent='center'>
			<Heading size='2xl' textAlign='center'>Search Recipes by Ingredients</Heading>
			<Text>Write down your favorite ingredient</Text>
			<FormControl maxWidth='container.lg'>
				<Flex alignItems='center' gap={5}>
					<Input
						ref={inputSearch}
						placeholder='search'
						variant='filled'
						type='text'
						onChange={setQuery}
						onClick={setOpen.toggle}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								setOpen.off();
								getRecipesByIngredient();
							}
						}}
					/>
					{items && <SearchHistory lastSearches={items} searchFromHistory={searchFromHistory} open={open} />}
					<Button onClick={getRecipesByIngredient}>
						Search
					</Button>
				</Flex>
			</FormControl>
			{recipeData && <RecipeList recipeData={recipeData} /> }
			{noData && <Text>No recipes for this ingredient</Text>}
		</Flex>
	</Container>
	)
}

export default Page;