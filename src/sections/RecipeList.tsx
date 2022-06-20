import React from 'react';
import { Flex, Heading, Image } from "@chakra-ui/react";

export const RecipeList = ({recipeData}) => {
	return (
		<Flex maxWidth="container.lg" gap={5} flexWrap="wrap" justifyContent="center">
			{recipeData.map((data) => {
				return (
					<Flex
						border="1px" borderColor="gray.200"
						borderRadius={6}
						flexDirection="column"
						height={250}
						key={data.id}
						padding={2}
						width={250}
					>	
						<Heading size="sm" textAlign="center">{data.title}</Heading>
						<Image
							src={data.image}
							alt={data.title}
							borderRadius={6}
						/>
					</Flex>
				)
			})}
		</Flex>
	)
}