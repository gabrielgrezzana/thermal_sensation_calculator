import { Box } from '@chakra-ui/react';
import Header from './header';

interface PageProps {
	children: React.ReactNode;
}

function Page({ children }: PageProps) {
	return (
		<Box width={'100vw'} minHeight={'100vh'} bg={'#242424'}>
			<Header />
			{children}
		</Box>
	);
}

export default Page;
