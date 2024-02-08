import AsyncStorage from '@react-native-async-storage/async-storage';

function getConsts() {
  return AsyncStorage.getItem('custom_server').then((server) => {
    if (server) {
      server = JSON.parse(server);
    }

    let API = 'https://papillion.api.astroman.dev';

    if (server && server.url) {
      API = server.url;
    }

    return {
      API,
    };
  });
}

export default getConsts;
