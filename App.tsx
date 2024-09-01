/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {useColorScheme} from 'react-native';

import {NativeBaseProvider, theme} from 'native-base';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import {loadFavorites} from './src/redux/newsSlice';
import store from './src/redux/store';
import Routes from './src/routes/routes';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    store.dispatch(loadFavorites());
  }, []);

  return (
    <NativeBaseProvider theme={theme}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </NativeBaseProvider>
  );
}
export default App;
