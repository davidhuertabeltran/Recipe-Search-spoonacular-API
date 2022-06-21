import React from 'react';
import { Flex, Heading, Image, Text } from '@chakra-ui/react';

export const RecipeList = ({recipeData, ingredient}) => {
	return (
		<Flex maxWidth='container.lg' gap={5} flexWrap='wrap' justifyContent='center'>
			{recipeData.map((data) => {
				return (
					<Flex
						border='1px' borderColor='gray.200'
						borderRadius={6}
						flexDirection='column'
						gap={2}
						height={280}
						key={data.id}
						justifyContent='space-between'
						paddingX={2}
						paddingY={4}
						width={250}
					>	
						<Flex flexDirection='column' height={230} justifyContent='space-between'>
							<Heading size='sm' textAlign='center'>{data.title}</Heading>
							<Image
								src={data.image}
								alt={data.title}
								borderRadius={6}
							/>
						</Flex>
						<Text textAlign='center'>Ingredient: {ingredient}</Text>
					</Flex>
				)
			})}
		</Flex>
	)
}
