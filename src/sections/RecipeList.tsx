import React from 'react';
import { Flex, Heading, Image } from '@chakra-ui/react';

export const RecipeList = ({recipeData}) => {
	return (
		<Flex flexWrap='wrap' gap={5} justifyContent='center' maxWidth='container.lg'>
			{recipeData.map((data: { id: React.Key; title: string; image: string; }) => {
				return (
					<Flex
						backgroundColor='white'
						border='1px' borderColor='gray.200'
						borderRadius={6}
						flexDirection='column'
						gap={2}
						height={280}
						justifyContent='space-between'
						key={data.id}
						paddingX={2}
						paddingY={4}
						width={250}
					>	
						<Flex flexDirection='column' height={230} justifyContent='space-between'>
							<Heading size='sm' textAlign='center'>{data.title}</Heading>
							<Image
								alt={data.title}
								borderRadius={6}
								src={data.image}
							/>
						</Flex>
					</Flex>
				)
			})}
		</Flex>
	)
}
