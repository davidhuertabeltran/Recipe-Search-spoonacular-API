import React from 'react';
import { Flex, Text, Link } from '@chakra-ui/react';

export const Header = () => {
	return (
		<Flex
			gap={2}
			justifyContent='center'
			paddingY={4}
			width='100%'>
			<Text>Made with ❤️ by</Text>
			<Link href='https://github.com/davidhuertabeltran' isExternal>David Huerta</Link>
		</Flex>
	)
}
