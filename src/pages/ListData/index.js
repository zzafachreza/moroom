import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
  RefreshControl,
  Image,
  TouchableOpacity,
} from 'react-native';
import { storeData, getData, urlAPI } from '../../utils/localStorage';
import axios from 'axios';
import { colors } from '../../utils/colors';
import { windowWidth, fonts } from '../../utils/fonts';

import 'intl';
import 'intl/locale-data/jsonp/en';
const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};
export default function ({ navigation, route }) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = useState([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    _getTransaction();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {




    _getTransaction();

  }, []);

  const _getTransaction = () => {
    axios
      .post(urlAPI + '/1data_kegiatan.php')
      .then(x => {
        console.log(x.data);
        setData(x.data);
      });

  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ListDetail', item)}
      style={{
        padding: 5,
        margin: 5,
        backgroundColor: 'white',
        borderRadius: 10,
        flexDirection: 'row'
      }}>
      <View>
        <Image source={{
          uri: item.image
        }} style={{
          width: 70,
          borderRadius: 10,
          height: 70,
        }} />
      </View>
      <View style={{
        flex: 1,
        paddingHorizontal: 5,
      }}>
        <Text style={{
          fontFamily: fonts.secondary[600],
          fontSize: windowWidth / 25,
          color: colors.primary,
        }}>{item.nama_kegiatan}</Text>
        <Text style={{
          fontFamily: fonts.secondary[400],
          marginTop: 5,
          fontSize: windowWidth / 25,
          color: colors.border,
        }}>{item.tanggal} {item.jam.substring(0, 5)} WIB</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[colors.primary]}
        />
      }
      style={{
        padding: 10,
      }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
