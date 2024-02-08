import * as React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  StatusBar,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useTheme, Text, Switch } from 'react-native-paper';

import { useState, useEffect } from 'react';

import { setAppIcon, getAppIcon } from 'expo-dynamic-app-icon';
import ListItem from '../../components/ListItem';

import GetUIColors from '../../utils/GetUIColors';

function IconItem({ icon, applyIcon, current }) {
  const [isLoaded, setIsLoaded] = useState(false);

  let subt = 'par l\'équipe Papillon';
  if (icon.author) {
    subt = `Concours 2023 - par ${icon.author}`;
  }

  return (
    <ListItem
      title={icon.coverName ? icon.coverName : icon.name}
      subtitle={subt}
      color="#A84700"
      style={[styles.iconElem, current ? styles.iconElemCurrent : {}]}
      left={
        <>
          {!isLoaded && (
            <ActivityIndicator
              size="small"
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
              }}
            />
          )}

          <Image
            source={icon.icon}
            style={[styles.icon, { opacity: isLoaded ? 1 : 0 }]}
            onLoad={() => setIsLoaded(true)}
          />
        </>
      }
      onPress={() => applyIcon(icon.name)}
    />
  );
}

function AppearanceScreen({ navigation }) {
  const theme = useTheme();
  const UIColors = GetUIColors();

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  // 3d, beta, black, chip, cutted, gold, gradient, metal, neon, pride, purple, rays-purple, rays, retro, sparkles
  const papillonIcons = [
    {
      coverName: 'Par défaut',
      name: 'classic',
      icon: require('../../assets/customicons/classic.png'),
    },
    {
      coverName: 'Papillon en relief',
      name: 'relief',
      icon: require('../../assets/customicons/relief.png'),
    },
    {
      coverName: 'Version bêta',
      name: 'beta',
      icon: require('../../assets/customicons/beta.png'),
    },
    {
      coverName: 'Icône sombre',
      name: 'black',
      icon: require('../../assets/customicons/black.png'),
    },
    {
      coverName: 'Processeur',
      name: 'chip',
      icon: require('../../assets/customicons/chip.png'),
    },
    {
      coverName: 'Icône brodée',
      name: 'cutted',
      icon: require('../../assets/customicons/cutted.png'),
    },
    {
      coverName: 'Icône en or',
      name: 'gold',
      icon: require('../../assets/customicons/gold.png'),
    },
    {
      coverName: 'Icône dégradée',
      name: 'gradient',
      icon: require('../../assets/customicons/gradient.png'),
    },
    {
      coverName: 'Icône en métal',
      name: 'metal',
      icon: require('../../assets/customicons/metal.png'),
    },
    {
      coverName: 'Icône néon',
      name: 'neon',
      icon: require('../../assets/customicons/neon.png'),
    },
    {
      coverName: 'Pride 2023',
      name: 'pride',
      icon: require('../../assets/customicons/pride.png'),
    },
    {
      coverName: 'Icône violette',
      name: 'purple',
      icon: require('../../assets/customicons/purple.png'),
    },
    {
      coverName: 'Icône violette (rayons)',
      name: 'rayspurple',
      icon: require('../../assets/customicons/rayspurple.png'),
    },
    {
      coverName: 'Icône verte (rayons)',
      name: 'rays',
      icon: require('../../assets/customicons/rays.png'),
    },
    {
      coverName: 'Icône rétro',
      name: 'retro',
      icon: require('../../assets/customicons/retro.png'),
    },
    {
      coverName: 'Icône brillante',
      name: 'sparkles',
      icon: require('../../assets/customicons/sparkles.png'),
    },
       {
      coverName: 'Icône brillante',
      name: 'sparkles',
      icon: require('../../assets/icon.png'),
    },
  ];

  // backtoschool, barbie, betterneon, macos, oldios, verscinq
  const communityIcons = [
    {
      coverName: 'Back to School 2023',
      author: 'Alokation',
      name: 'backtoschool',
      icon: require('../../assets/customicons/backtoschool.png'),
    },
    {
      coverName: 'Barbie Edition',
      author: 'Tryon',
      name: 'barbie',
      icon: require('../../assets/customicons/barbie.png'),
    },
    {
      coverName: 'Better Neon',
      author: 'Astrow',
      name: 'betterneon',
      icon: require('../../assets/customicons/betterneon.png'),
    },
    {
      coverName: 'Style macOS',
      author: 'Ahhj',
      name: 'macos',
      icon: require('../../assets/customicons/macos.png'),
    },
    {
      coverName: 'Style iOS 6',
      author: 'Alokation',
      name: 'oldios',
      icon: require('../../assets/customicons/oldios.png'),
    },
    {
      coverName: 'Style v5',
      author: 'Alokation',
      name: 'verscinq',
      icon: require('../../assets/customicons/verscinq.png'),
    },
  ];

  const [currentIcon, setCurrentIcon] = useState(null);

  useEffect(() => {
    setCurrentIcon(getAppIcon() || 'classic');

    // if getappicon is not null
    if (getAppIcon() !== 'DEFAULT') {
      setIsSwitchOn(true);
    }
  }, []);

  function applyIcon(name) {
    const icon = setAppIcon(name);

    if (icon === name) {
      setCurrentIcon(name);
    }
  }

  // add switch in header
  React.useLayoutEffect(() => {
    if (Platform.OS === 'android') {
      navigation.setOptions({
        headerRight: () => (
          <Switch
            value={isSwitchOn}
            onValueChange={() => {
              setIsSwitchOn(!isSwitchOn);
            }}
          />
        ),
      });
    }
  }, [navigation, isSwitchOn]);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={[styles.container, { backgroundColor: UIColors.modalBackground }]}
    >
      {Platform.OS === 'ios' ? (
        <StatusBar animated barStyle="light-content" />
      ) : (
        <StatusBar
          animated
          barStyle={theme.dark ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
        />
      )}

      {Platform.OS === 'android' ? (
        <ListItem
          title="Icône de l'application"
          subtitle="Cette fonctionnalité est instable sous Android et elle peut provoquer des comportements innatendus dans votre lanceur d'applications."
          color="#A84700"
          style={{ marginTop: 14 }}
        />
      ) : null}

      <View
        style={[
          { gap: 9, paddingVertical: 24 },
          Platform.OS === 'android' && !isSwitchOn
            ? { opacity: 0.5 }
            : undefined,
        ]}
        pointerEvents={
          Platform.OS === 'android' && !isSwitchOn ? 'none' : 'auto'
        }
      >
        <Text style={styles.ListTitle}>Icônes Papillon</Text>

        {papillonIcons.map((icon, index) => (
          <IconItem
            icon={icon}
            key={index}
            current={currentIcon === icon.name}
            applyIcon={(ico) => applyIcon(ico)}
          />
        ))}

        <Text style={[styles.ListTitle, { marginTop: 24 }]}>
          Icônes de la communauté
        </Text>

        {communityIcons.map((icon, index) => (
          <IconItem
            icon={icon}
            key={index}
            current={currentIcon === icon.name}
            applyIcon={(ico) => applyIcon(ico)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ListTitle: {
    paddingLeft: 29,
    fontSize: 15,
    fontFamily: 'Papillon-Medium',
    opacity: 0.5,
  },
  icon: {
    width: 38,
    height: 38,
    borderRadius: 9,
  },

  iconElem: {
    borderColor: '#00000000',
    borderWidth: 2,
  },
  iconElemCurrent: {
    borderColor: '#29947A',
    borderWidth: 2,
  },
});

export default AppearanceScreen;
