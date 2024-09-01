import {useNavigation, useRoute} from '@react-navigation/native';
import {Heading, Icon, IconButton, VStack} from 'native-base';
import {ArrowLeft} from 'phosphor-react-native';
import React from 'react';
import WebView from 'react-native-webview';
import Loading from '../components/Loading/Loading';

interface RouteParams {
  url: string;
  title: string;
}

export default function NewsDetail() {
  const navigation = useNavigation();
  const route = useRoute();
  const {url, title} = route.params as RouteParams;

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <VStack flex={1}>
      <VStack
        bg="gray.700"
        px={4}
        py={3}
        alignItems="center"
        justifyContent="start"
        flexDirection="row">
        <IconButton
          icon={<Icon as={<ArrowLeft color="#FFF" size={26} />} />}
          onPress={handleGoBack}
        />
        <Heading color="gray.700" fontSize="lg">
          {/* {title} */}
        </Heading>
      </VStack>

      <WebView
        source={{uri: url}}
        style={{flex: 1}}
        onLoad={() => <Loading />}
      />
    </VStack>
  );
}
