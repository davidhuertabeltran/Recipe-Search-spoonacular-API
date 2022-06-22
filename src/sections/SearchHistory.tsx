import React from 'react';
import { Flex, Box } from '@chakra-ui/react';

export const SearchHistory = ({lastSearches, searchFromHistory, open}) => {
	return (
		<Flex
			backgroundColor='#e2e8f0'
			borderRadius={6}
			cursor='pointer'
			display={open ? 'block' : 'none'}
			flexDirection='column'
			gap={1}
			maxWidth='container.lg'
			position='absolute'
			top={12}
			width='100%'
		>
			{Object.values(lastSearches).map((data: object, i: number) => {
				return (
					<Box
						borderRadius={6}
						key={i}
						onClick={() => searchFromHistory(Object.keys(data)[0])}
						paddingLeft={3}
						paddingRight={3}
						_hover={{ backgroundColor: '#0052bd', color: 'white' }}
					>
						{Object.keys(data)[0]}
					</Box>
				)
			})}
		</Flex>
	)
}
