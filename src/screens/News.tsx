import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {FlatList, Heading, HStack, Spinner, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import Loading from '../components/Loading/Loading';
import NewsCard from '../components/NewsCard/NewsCard';
import {ItemNewDTO} from '../models/ItemNewDTO';
import {NewsDTO} from '../models/NewsDTO';
import {useAppDispatch} from '../redux/hooks';

const BASE_URL_IBGE = 'https://servicodados.ibge.gov.br';
const BASE_IMAGES_IBGE = 'https://agenciadenoticias.ibge.gov.br/';

export default function News() {
  const dispatch = useAppDispatch();
  const [news, setNews] = useState<NewsDTO>();
  const [loading, setLoading] = useState(true);
  const [qtd, setQtd] = useState(10);
  const [page, setPage] = useState(1);
  const navigation = useNavigation();
  const [loadingMore, setLoadingMore] = useState(false);
  const [isEndOfList, setIsEndOfList] = useState(false);

  useEffect(() => {
    fetchNews();
  }, [page]);

  async function fetchNews() {
    try {
      if (loadingMore || isEndOfList) return; // Evita chamadas se já estiver carregando ou se for o fim da lista

      setLoadingMore(true);

      const url = `${BASE_URL_IBGE}/api/v3/noticias/?qtd=${qtd}&page=${page}`;
      const {data} = await axios.get<NewsDTO>(url);

      // Verifica se a quantidade de itens retornados é menor que a quantidade solicitada
      if (data.totalPages < qtd) {
        setIsEndOfList(true); // Marca que chegou ao final da lista
      }

      // Atualiza o estado de 'news' mantendo os dados anteriores e adicionando os novos itens
      setNews(prevNews => {
        if (!prevNews) {
          return data; // Se não há dados anteriores, define o estado com o novo resultado
        }
        return {
          ...prevNews,
          items: [...prevNews.items, ...data.items], // Concatena os novos itens ao array existente
          page: data.page, // Atualiza a página atual
          count: data.count,
          totalPages: data.totalPages,
          nextPage: data.nextPage,
          previousPage: data.previousPage,
          showingFrom: data.showingFrom,
          showingTo: data.showingTo,
        };
      });
    } catch (error) {
      console.error('Erro ao carregar notícias', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  const handleDetailNews = async (item: ItemNewDTO) => {
    navigation.navigate('newsDetail', {
      url: item.link,
      title: 'Titulo',
    });
  };

  //carregar mais noticias ao chegar no final da lista
  const handleLoadMore = () => {
    if (!loadingMore && !isEndOfList) {
      setPage(prevPage => prevPage + 1);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack w="full" mt={4} pl={4} mb={4}>
        <Heading color="gray.100">Noticias</Heading>
      </HStack>
      <HStack w="full">
        <FlatList
          data={news?.items}
          keyExtractor={item => item.id.toString()} // Supondo que cada notícia tem um ID único
          renderItem={({item}) => (
            <NewsCard newsItem={item} detailCardOnPress={handleDetailNews} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 20}}
          onEndReached={handleLoadMore} // Chama handleLoadMore quando o usuário chegar ao final da lista
          onEndReachedThreshold={0.05} // Define o ponto de gatilho para o carregamento
          ListFooterComponent={
            loadingMore ? <Spinner paddingBottom={8} color="gray.100" /> : null
          } // Indicador de carregamento no final da lista
        />
      </HStack>
    </VStack>
  );
}
