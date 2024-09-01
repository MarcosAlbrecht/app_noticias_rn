import {Button, Icon, Stack} from 'native-base';
import {ArrowRight, Heart} from 'phosphor-react-native';
import React from 'react';

interface CardButtonsProps {
  favoriteOnPress: () => void;
  detailOnPress: () => void;
  title: 'Favoritar' | 'Desfavoritar';
  isFavorite: boolean;
}

export default function CardButtons({
  favoriteOnPress,
  detailOnPress,
  title,
  isFavorite = false,
}: CardButtonsProps) {
  return (
    <Stack
      marginX={0}
      justifyContent={'space-between'}
      direction={{
        base: 'row',
        md: 'row',
      }}
      space={8}>
      <Button
        onPress={favoriteOnPress}
        variant="unstyled"
        style={{
          borderWidth: 0.5,
          borderColor: 'gray.700',
          borderRadius: 8,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        leftIcon={
          <Icon
            as={
              isFavorite ? (
                <Heart weight="fill" color="red" />
              ) : (
                <Heart color="red" />
              )
            }
          />
        }>
        {title}
      </Button>
      <Button
        onPress={detailOnPress}
        variant="unstyled"
        style={{
          borderWidth: 0.5,
          borderColor: 'gray.700',
          borderRadius: 8,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        endIcon={<Icon as={ArrowRight} size="sm" />}>
        Ver mais
      </Button>
    </Stack>
  );
}
