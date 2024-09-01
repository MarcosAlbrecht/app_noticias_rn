import {Center, Spinner, VStack} from 'native-base';
import React from 'react';

export default function Loading() {
  return (
    <Center flex={1} bg="gray.700">
      <VStack space={4} justifyContent="center" alignItems="center">
        <Spinner size="lg" color="green.500" />
      </VStack>
    </Center>
  );
}
