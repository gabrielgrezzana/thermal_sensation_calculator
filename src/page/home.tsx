import { Box, Text, Input, VStack, Button, Image } from '@chakra-ui/react';
import Page from '../components/page';
import { useEffect, useState } from 'react';

function Home() {
	const [temperatura, setTemperatura] = useState(0);
	const [velocidadeVento, setVelocidadeVento] = useState(0);
	const [resultado, setResultado] = useState<number | null>(null);
	const [image, setImage] = useState<string | null>(null);
	const [frase, setFrase] = useState<string | null>(null);

	const handleTemperaturaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		// Remove zeros à esquerda, mas mantém números decimais
		if (value === '' || value === '0') {
			setTemperatura(0);
		} else {
			setTemperatura(Number(value.replace(/^0+(?=\d)/, '')));
		}
	};

	const handleVentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (value === '' || value === '0') {
			setVelocidadeVento(0);
		} else {
			setVelocidadeVento(Number(value.replace(/^0+(?=\d)/, '')));
		}
	};

	const calcularSensacaoTermica = () => {
		// Verificar em qual faixa de temperatura estamos
		if (temperatura <= 10) {
			// Para temperaturas baixas (≤ 10°C): usar Wind Chill
			// Fórmula adaptada para Celsius
			const sensacaoTermica = 13.12 + 0.6215 * temperatura - 11.66 * Math.pow(velocidadeVento, 0.16);
			setResultado(sensacaoTermica);
		} else if (temperatura >= 27) {
			// Para temperaturas altas (≥ 27°C): usar aproximação de refrescamento
			// O vento causa sensação de resfriamento
			const fatorVento = Math.pow(velocidadeVento, 0.5) * 0.3; // Fator de resfriamento
			const sensacaoTermica = temperatura - fatorVento;
			setResultado(sensacaoTermica);
		} else {
			// Para temperaturas intermediárias (10°C - 27°C): fórmula suavizada
			// Vento causa leve refrescamento
			const fatorVento = Math.pow(velocidadeVento, 0.4) * 0.2;
			const sensacaoTermica = temperatura - fatorVento;
			setResultado(sensacaoTermica);
		}
	};

	useEffect(() => {
		if (resultado !== 0 && resultado !== null) {
			if (resultado > 10 && resultado < 30) {
				setImage(
					'https://www.shutterstock.com/image-photo/drinking-cocktails-beach-bar-porto-600nw-2326923443.jpg'
				);
				setFrase('Beba um drink');
			} else if (resultado > 30) {
				setImage(
					'https://classic.exame.com/wp-content/uploads/2021/08/incendio-na-Turquia-devido-a-onda-de-calor-1.jpg'
				);
				setFrase('Inferno na terra, lascou!!!');
			} else if (resultado < 0) {
				setImage(
					'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3_Mu7FtCB2X64Hbjz9qni59GqsajoVUBhZA&s'
				);
				setFrase('Não coloque nem o frio pra fora de casa tche!!');
			}
		}
	}, [resultado]);

	return (
		<Page>
			<Box p={6} maxW="400px" mx="auto">
				<VStack gap={4}>
					<Text fontSize="xl" fontWeight="bold">
						Air temperature
					</Text>
					<Input
						placeholder="Temperatura do ar (°C)"
						value={temperatura}
						onChange={handleTemperaturaChange}
					/>

					<Text fontSize="xl" fontWeight="bold">
						Wind speed
					</Text>
					<Input
						placeholder="Velocidade do vento (km/h)"
						value={velocidadeVento}
						onChange={handleVentoChange}
					/>

					<Button
						colorScheme="blue"
						onClick={calcularSensacaoTermica}
						disabled={!temperatura || !velocidadeVento}
					>
						Calcular
					</Button>

					{resultado !== null && (
						<Text fontSize="lg" color="blue.500">
							Sensação Térmica: {resultado.toFixed(2)}°C
						</Text>
					)}
				</VStack>
				{frase && (
					<Text fontSize={'1xl'} color={'red.500'} marginBottom={5}>
						{frase}
					</Text>
				)}
				<Box
					width={'100%'}
					height={'100%'}
					display={'flex'}
					alignItems={'center'}
					justifyContent={'center'}
					boxShadow="0 0 30px rgba(240, 239, 239, 0.72)"
					borderRadius={5}
				>
					{image && <Image borderRadius={5} src={image} alt="image" />}
				</Box>
			</Box>
		</Page>
	);
}

export default Home;
