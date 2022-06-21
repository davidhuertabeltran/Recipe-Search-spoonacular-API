import React from 'react';
import { Flex, Box } from "@chakra-ui/react";

export const SearchHistory = ({lastSearches, searchFromHistory}) => {
	return (
		<Flex
			backgroundColor="#e2e8f0"
			borderRadius={6}
			cursor="pointer"
			flexDirection="column"
			gap={1}
			maxWidth="container.lg"
			position="absolute"
			top={12}
			width="100%"
		>
			{Object.values(lastSearches).map((data) => {
				return (
					<Box
						borderRadius={6}
						paddingLeft={3}
						paddingRight={3}
						_hover={{ backgroundColor: "#0052bd", color: "white" }}
						onClick={() => searchFromHistory(Object.keys(data)[0])}
					>
						{Object.keys(data)[0]}
					</Box>
				)
			})}
		</Flex>
	)
}
