import {useNavigation} from '@react-navigation/native';
import {FlatList, Heading, HStack, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import EmptyData from '../components/EmtyData/EmptyData';
import {FavoriteNewsCard} from '../components/FavoritesNewsCard/FavoritesNewsCard';
import Loading from '../components/Loading/Loading';
import {ItemNewDTO} from '../models/ItemNewDTO';
import {useAppSelector} from '../redux/hooks';

export default function Favorites() {
  const navigation = useNavigation();

  const {favoriteNews} = useAppSelector(state => state.news);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [favoriteNews]);

  const handleDetailNews = async (item: ItemNewDTO) => {
    console.log('CLICOU NO VER TUDO: ', item);
    navigation.navigate('newsDetail', {
      url: item.link,
      title: 'Titulo',
    });
  };

  if (loading) {
    return <Loading />;
  }

  if (favoriteNews.length <= 0) {
    return <EmptyData />;
  } else {
    console.info('favoriteNews nao está vazio', favoriteNews.length);
  }

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full"
        mt={4}
        mb={4}
        pl={4}
        justifyContent="start"
        alignItems="center">
        <Heading color="gray.100">Favoritos</Heading>
      </HStack>
      <FlatList
        data={favoriteNews}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <FavoriteNewsCard
            newsItem={item}
            detailCardOnPress={handleDetailNews}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  );
}
