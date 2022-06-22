import { AppProps } from 'next/app';
import { ChakraProvider, extendTheme  } from '@chakra-ui/react';

const mainColor = '#bee3f8';

const theme = extendTheme({
	styles: {
		global: () => ({
		body: {
			bg: mainColor
		}
		})
	}
});

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	)
};

export default App;