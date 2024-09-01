import {Center, Icon, Text, VStack} from 'native-base';
import {MagnifyingGlass} from 'phosphor-react-native';
import React from 'react';

export default function EmptyData() {
  return (
    <VStack flex={1} justifyContent="center" alignItems="center" bg="gray.700">
      <Center>
        <Icon as={<MagnifyingGlass color="#fff" />} />
        <Text fontSize="lg" mt={4} color="white">
          Não possui favoritos
        </Text>
      </Center>
    </VStack>
  );
}
