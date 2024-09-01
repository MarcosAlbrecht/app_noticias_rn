import {
  AspectRatio,
  Box,
  Center,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {ImageDTO} from '../../models/ImageDTO';
import {ItemNewDTO} from '../../models/ItemNewDTO';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {toggleFavorite} from '../../redux/newsSlice';
import {formatDateAndTime} from '../../utils/FormatDate';
import {parseImageDTO} from '../../utils/ParseImage';
import CardButtons from '../CardButton.tsx/CardButtons';

const BASE_IMAGES_IBGE = 'https://agenciadenoticias.ibge.gov.br';

interface NewsCardProps {
  newsItem: ItemNewDTO;
  detailCardOnPress: (newsItem: ItemNewDTO) => void;
}

export default function NewsCard({newsItem, detailCardOnPress}: NewsCardProps) {
  const dispatch = useAppDispatch();
  const {favoriteNews} = useAppSelector(state => state.news);
  const [imagens, setImagens] = useState<ImageDTO | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Função para remover as barras invertidas e converter a string JSON para o modelo ImageDTO

    const parsedImagens = parseImageDTO(newsItem.imagens);
    verifyIsFavorite();
    setImagens(parsedImagens);
  }, [newsItem.imagens]);

  const verifyIsFavorite = () => {
    setIsFavorite(favoriteNews.some(news => news.id === newsItem.id));
  };

  // Função que executa handleToggleFavorite e atualiza isFavorite
  const handleToggleFavorite = async () => {
    dispatch(toggleFavorite(newsItem));
    setIsFavorite(prevIsFavorite => !prevIsFavorite);
  };

  return (
    <Box alignItems="center" marginBottom={2} marginX={2}>
      <Box
        rounded="xl"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        paddingBottom={4}
        _dark={{
          borderColor: 'coolGray.600',
          backgroundColor: 'gray.700',
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: 'gray.50',
        }}>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1" fontSize={22}>
              {newsItem.titulo}
            </Heading>
            <Text
              fontSize="xs"
              _light={{
                color: 'violet.500',
              }}
              _dark={{
                color: 'violet.400',
              }}
              fontWeight="500"
              ml="-0.5"
              mt="-1">
              {newsItem.editorias}
            </Text>
          </Stack>
          <Text fontWeight="400">{newsItem.introducao}</Text>
          <Box>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image
                source={{
                  uri: `${BASE_IMAGES_IBGE}/${imagens?.image_fulltext}`,
                }}
                alt="image"
              />
            </AspectRatio>
            <Center
              bg="violet.500"
              _dark={{
                bg: 'violet.400',
              }}
              _text={{
                color: 'warmGray.50',
                fontWeight: '700',
                fontSize: 'xs',
              }}
              position="absolute"
              bottom="0"
              px="3"
              py="1.5">
              PHOTOS
            </Center>
          </Box>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text
                color="coolGray.600"
                _dark={{
                  color: 'warmGray.200',
                }}
                fontWeight="400">
                {formatDateAndTime(newsItem.data_publicacao)}
              </Text>
            </HStack>
          </HStack>
        </Stack>
        <VStack paddingX={4}>
          <CardButtons
            isFavorite={isFavorite}
            title={isFavorite ? 'Desfavoritar' : 'Favoritar'}
            detailOnPress={() => detailCardOnPress(newsItem)}
            favoriteOnPress={handleToggleFavorite}
          />
        </VStack>
      </Box>
    </Box>
  );
}
