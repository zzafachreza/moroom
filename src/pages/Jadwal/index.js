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
  Alert,
} from 'react-native';
import { storeData, getData, urlAPI } from '../../utils/localStorage';
import axios from 'axios';
import { colors } from '../../utils/colors';
import { windowWidth, fonts } from '../../utils/fonts';
import { Icon } from 'react-native-elements';

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
    getDataBarang();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getDataBarang();
  }, []);

  const getDataBarang = () => {
    axios.post(urlAPI + '/jadwal.php', {
      kode: route.params.kode
    }).then(res => {
      console.log(res.data);
      setData(res.data);
    });
  };

  const renderItem = ({ item }) => (
    <>
      <View style={{ padding: 10, backgroundColor: colors.secondary, flexDirection: 'row' }}>
        <Text
          style={{
            flex: 1,
            fontSize: windowWidth / 30,
            color: colors.white,
            fontFamily: fonts.secondary[600],
          }}>
          {item.nama_lengkap}
        </Text>
        <Text
          style={{
            flex: 1,
            fontSize: windowWidth / 30,
            color: colors.white,
            fontFamily: fonts.secondary[600],
          }}>
          {item.tanggal}
        </Text>
        <Text
          style={{
            fontSize: windowWidth / 30,
            color: colors.white,
            fontFamily: fonts.secondary[600],
          }}>
          {item.nama_ruangan}
        </Text>

      </View>

      <View
        //   onPress={() => navigation.navigate('Pinjam', item)}
        style={{
          padding: 10,
          marginBottom: 10,
          backgroundColor: 'white',

          // height: 80,
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: windowWidth / 30,
              color: colors.black,
              fontFamily: fonts.secondary[400],
            }}>
            Tujuan Penggunaan
          </Text>
          <Text
            style={{
              fontSize: windowWidth / 30,
              color: colors.black,
              fontFamily: fonts.secondary[600],
            }}>
            {item.tujuan}
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: windowWidth / 30,
              color: colors.black,
              fontFamily: fonts.secondary[400],
            }}>
            Nama Dosen
          </Text>
          <Text
            style={{
              fontSize: windowWidth / 30,
              color: colors.black,
              fontFamily: fonts.secondary[600],
            }}>
            {item.dosen}
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: windowWidth / 30,
              color: colors.black,
              fontFamily: fonts.secondary[400],
            }}>
            Mata Kuliah
          </Text>
          <Text
            style={{
              fontSize: windowWidth / 30,
              color: colors.black,
              fontFamily: fonts.secondary[600],
            }}>
            {item.mata_kuliah}
          </Text>

        </View>
        <View
          style={{
            paddingHorizontal: 5,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Text
            style={{
              fontSize: windowWidth / 35,
              color: colors.black,
              fontFamily: fonts.secondary[600],
            }}>
            Jam Masuk
          </Text>
          <Text
            style={{
              fontSize: windowWidth / 30,
              color: colors.black,
              fontFamily: fonts.secondary[400],
            }}>
            {item.jam_masuk}
          </Text>


        </View>
        <View
          style={{
            // flex: 1,
            paddingHorizontal: 5,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Text
            style={{
              fontSize: windowWidth / 35,
              color: colors.black,
              fontFamily: fonts.secondary[600],
            }}>
            Jam Keluar
          </Text>
          <Text
            style={{
              fontSize: windowWidth / 30,
              color: colors.black,
              fontFamily: fonts.secondary[400],
            }}>
            {item.jam_keluar}
          </Text>


        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',

          }}>
          {item.kondisi == "OPEN" && <Icon type="ionicon" name="checkmark-circle" color={colors.success} />}
          {item.kondisi == "CLOSE" && <Icon type="ionicon" name="close-circle" color={colors.danger} />}
        </View>
      </View>
      {/* <TouchableOpacity
        onPress={() => {
          Alert.alert('EKPP', 'Anda yakin hapus jadwal  ?', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () =>
                axios
                  .post('https://zavalabs.com/ekpp/api/jadwal_delete.php', {
                    id: item.id,
                    qty: item.qty,
                    id_barang: item.id_barang,
                  })
                  .then(res => {
                    console.log(res);
                    getDataBarang();
                  }),
            },
          ]);
        }}
        style={{padding: 10, backgroundColor: '#CDCDCD', marginBottom: 10}}>
        <Text
          style={{
            fontSize: windowWidth / 30,
            textAlign: 'center',
            color: colors.black,
          }}>
          HAPUS JADWAL
        </Text>
      </TouchableOpacity> */}
    </>
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
