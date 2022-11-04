import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ImageBackground,
  Image,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { fonts, windowHeight, windowWidth } from '../../utils/fonts';
import { colors } from '../../utils/colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { Icon } from 'react-native-elements';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { urlAPI, urlLaporan } from '../../utils/localStorage';
import { MyButton, MyGap } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import YoutubePlayer from "react-native-youtube-iframe";
export default function ListDetail({ navigation, route }) {
  const [item, setItem] = useState(route.params);
  navigation.setOptions({ title: 'Kegiatan Relawan' });
  const [data, setData] = useState({});
  const [buka, setBuka] = useState(false);
  const [dataDetail, setDataDetail] = useState([]);
  const isFocused = useIsFocused();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white
      }}>
      <ScrollView>

        <Image source={{
          uri: item.image
        }} style={{
          width: windowWidth,
          height: 250,
        }} />

        <View style={{
          padding: 10,
        }}>
          <Text style={{
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 22,
            color: colors.primary,
          }}>{item.nama_kegiatan}</Text>
          <Text style={{
            fontFamily: fonts.secondary[400],
            marginTop: 5,
            fontSize: windowWidth / 22,
            color: colors.border,
          }}>{item.tanggal} {item.jam.substring(0, 5)} WIB</Text>
          <Text style={{
            fontFamily: fonts.secondary[400],
            fontSize: windowWidth / 28,
            marginTop: 20,
            color: colors.black,
            textAlign: 'justify',
          }}>{item.keterangan}</Text>
        </View>

        <YoutubePlayer
          height={windowWidth}
          videoId={item.link}

        />

      </ScrollView>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: colors.primary,

    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    height: 80,
    margin: 5,
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.secondary[600],
    fontSize: 12,
    textAlign: 'center',
  },
  date: {
    fontFamily: fonts.secondary[400],
    fontSize: 12,
    textAlign: 'center',
  },
});
