import { Box, Text } from '@chakra-ui/react';

function Header() {
	return (
		<Box width={'100%'} height={'100px'} display={'flex'} alignItems={'center'} justifyContent={'center'} >
			<Text fontWeight={'bold'} fontFamily={'monospace'} fontSize={'1rem'}>
				Thermal Sensation Calculator
			</Text>
		</Box>
	);
}

export default Header;
