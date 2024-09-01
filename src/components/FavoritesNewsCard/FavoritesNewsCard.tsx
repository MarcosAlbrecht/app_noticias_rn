import {Box, HStack, Image, Text, VStack} from 'native-base';
import {useEffect, useState} from 'react';
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

export function FavoriteNewsCard({newsItem, detailCardOnPress}: NewsCardProps) {
  const dispatch = useAppDispatch();
  const {favoriteNews} = useAppSelector(state => state.news);
  const [imagens, setImagens] = useState<ImageDTO | null>(null);
  useEffect(() => {
    // Função para remover as barras invertidas e converter a string JSON para o modelo ImageDTO

    const parsedImagens = parseImageDTO(newsItem.imagens);
    setImagens(parsedImagens);
  }, [newsItem.imagens]);

  //funçao para salvar o item no estado e localmente
  const handleToggleFavorite = async () => {
    dispatch(toggleFavorite(newsItem));
  };

  return (
    <Box bg="white" p={4} mb={4} borderRadius="md" shadow={2}>
      <VStack>
        <HStack alignItems="start" space={4}>
          <Image
            source={{uri: `${BASE_IMAGES_IBGE}/${imagens?.image_fulltext}`}}
            alt={`${BASE_IMAGES_IBGE}/${imagens?.image_fulltext}`}
            size="lg"
            borderRadius="lg"
          />
          <VStack flex={1}>
            <Text bold fontSize="md">
              {newsItem.titulo}
            </Text>
          </VStack>
        </HStack>
        <HStack pt={4}>
          <Text color="gray.500" fontSize="xs" mb={2}>
            {formatDateAndTime(newsItem.data_publicacao)}
          </Text>
        </HStack>
        <VStack pt={2}>
          <CardButtons
            isFavorite={true}
            title="Desfavoritar"
            detailOnPress={() => detailCardOnPress(newsItem)}
            favoriteOnPress={handleToggleFavorite}
          />
        </VStack>
      </VStack>
    </Box>
  );
}
