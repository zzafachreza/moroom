import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts, windowHeight, windowWidth } from '../../utils/fonts';
import { MyButton, MyGap } from '../../components';
import 'intl';
import 'intl/locale-data/jsonp/en';
// import {  } from 'react-native-elements/dist/icons/Icon';
import { Modalize } from 'react-native-modalize';
import { showMessage } from 'react-native-flash-message';
import { getData, storeData, urlAPI } from '../../utils/localStorage';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import { ListItem, Icon } from 'react-native-elements'

export default function Pinjam({ navigation, route }) {
  const item = route.params;
  console.log('data pendapmping', item)
  navigation.setOptions({
    headerShown: false,
  });




  const isFocused = useIsFocused();

  const [jumlah, setJumlah] = useState(1);

  const [cart, setCart] = useState(0);
  const [user, setUser] = useState({});
  useEffect(() => {
    if (isFocused) {
      getData('user').then(res => {
        console.log('data user', res);
        setUser(res);
      });
    }
  }, [isFocused]);

  const modalizeRef = useRef();

  const onOpen = () => {
    const kirim = {
      fid_user: user.id,
      fid_relawan: item.id_relawan,

    };
    console.log('kirim tok server', kirim);

    axios
      .post(urlAPI + '/1add_relawan.php', kirim)
      .then(res => {
        console.log('respon', res.data);
        storeData('user', res.data)

        showMessage({
          type: 'success',
          message: 'Berhasil dijadikan pendamping',
        });
        navigation.replace('MainApp');

      });
  };


  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <View
        style={{
          height: 50,
          // padding: 10,
          paddingRight: 10,
          backgroundColor: colors.primary,

          flexDirection: 'row',
        }}>
        <View style={{ justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon type="ionicon" name="arrow-back" color={colors.white} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 30,
              color: colors.white,
            }}>
            {item.nama_lengkap}
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
        }}>
        <Image

          style={{
            height: windowHeight / 2.5,
            width: windowWidth
          }}
          source={{
            uri: item.image,
          }}
        />

        <View
          style={{
            backgroundColor: colors.white,
            flex: 1,
          }}>
          <View
            style={{
              padding: 10,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 20,
                color: colors.primary,
              }}>
              {item.nama_lengkap}
            </Text>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
                fontSize: windowWidth / 25,
                color: colors.black,
              }}>
              {item.telepon}
            </Text>

            {/* list */}

            <View
              style={{
                marginVertical: 3,
                backgroundColor: colors.white,
                borderRadius: 10,
                borderBottomWidth: 1,
                borderBottomColor: colors.zavalabs,
                flexDirection: 'row'
              }}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  color: colors.black,
                  flex: 1,
                }}>
                E-mail
              </Text>
              <Text
                style={{
                  fontFamily: fonts.secondary[400],
                  color: colors.primary,
                }}>
                {item.email}
              </Text>
            </View>

            <View
              style={{
                marginVertical: 3,
                backgroundColor: colors.white,
                borderRadius: 10,
                borderBottomWidth: 1,
                borderBottomColor: colors.zavalabs,
                flexDirection: 'row'
              }}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  color: colors.black,
                  flex: 1,
                }}>
                NPM
              </Text>
              <Text
                style={{
                  fontFamily: fonts.secondary[400],
                  color: colors.primary,
                }}>
                {item.npm}
              </Text>
            </View>


            <View
              style={{
                marginVertical: 3,
                backgroundColor: colors.white,
                borderRadius: 10,
                borderBottomWidth: 1,
                borderBottomColor: colors.zavalabs,
                flexDirection: 'row'
              }}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  color: colors.black,
                  flex: 1,
                }}>
                Prodi
              </Text>
              <Text
                style={{
                  fontFamily: fonts.secondary[400],
                  color: colors.primary,
                }}>
                {user.prodi}
              </Text>
            </View>

            <View
              style={{
                marginVertical: 3,
                backgroundColor: colors.white,
                borderRadius: 10,
                borderBottomWidth: 1,
                borderBottomColor: colors.zavalabs,
                flexDirection: 'row'
              }}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  color: colors.black,
                  flex: 1,
                }}>
                Semester
              </Text>
              <Text
                style={{
                  fontFamily: fonts.secondary[400],
                  color: colors.primary,
                }}>
                {user.semester}
              </Text>
            </View>
            <View
              style={{
                marginVertical: 3,
                backgroundColor: colors.white,
                borderRadius: 10,
                borderBottomWidth: 1,
                borderBottomColor: colors.zavalabs,
                flexDirection: 'row'
              }}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  color: colors.black,
                  flex: 1,
                }}>
                Jenis Kelamin
              </Text>
              <Text
                style={{
                  fontFamily: fonts.secondary[400],
                  color: colors.primary,
                }}>
                {user.jenis_kelamin}
              </Text>
            </View>

            <View
              style={{
                marginVertical: 3,
                backgroundColor: colors.white,
                borderRadius: 10,
                borderBottomWidth: 1,
                borderBottomColor: colors.zavalabs,
                flexDirection: 'row'
              }}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  color: colors.black,
                  flex: 1,
                }}>
                Alamat
              </Text>
              <Text
                style={{
                  fontFamily: fonts.secondary[400],
                  color: colors.primary,
                }}>
                {user.alamat}
              </Text>
            </View>
            <View
              style={{
                marginVertical: 3,
                backgroundColor: colors.white,
                borderRadius: 10,
                borderBottomWidth: 1,
                borderBottomColor: colors.zavalabs,
                flexDirection: 'row'
              }}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  color: colors.black,
                  flex: 1,
                }}>
                Kemampuan Bahasa Inggris
              </Text>
              <Text
                style={{
                  flex: 1,
                  textAlign: 'right',
                  fontFamily: fonts.secondary[400],
                  color: colors.primary,
                }}>
                {item.bahasa_inggris}
              </Text>
            </View>
            <View
              style={{
                marginVertical: 3,
                backgroundColor: colors.white,
                borderRadius: 10,
                borderBottomWidth: 1,
                borderBottomColor: colors.zavalabs,
                flexDirection: 'row'
              }}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  color: colors.black,
                  flex: 1,
                }}>
                Kemampuan Bahasa Arab
              </Text>
              <Text
                style={{
                  flex: 1,
                  textAlign: 'right',
                  fontFamily: fonts.secondary[400],
                  color: colors.primary,
                }}>
                {item.bahasa_arab}
              </Text>
            </View>
            <View
              style={{
                marginVertical: 3,
                backgroundColor: colors.white,
                borderRadius: 10,
                borderBottomWidth: 1,
                borderBottomColor: colors.zavalabs,
                flexDirection: 'row'
              }}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  color: colors.black,
                  flex: 1,
                }}>
                Motivasi
              </Text>
              <Text
                style={{
                  flex: 1,
                  textAlign: 'right',
                  fontFamily: fonts.secondary[400],
                  color: colors.primary,
                }}>
                {item.motivasi}
              </Text>
            </View>








          </View>
        </View>
      </View>



      {item.status == 1 && <MyButton
        Icons="logo-whatsapp"
        fontWeight="bold"
        radius={0}
        title="Hubungi Pendamping"
        warna={colors.secondary}
        colorText={colors.primary}
        iconColor={colors.primary}
        onPress={() => Linking.openURL('https://wa.me/' + item.telepon)}
      />}

      {/* {item.status == 0 && <MyButton
        Icons="person-add-outline"
        fontWeight="bold"
        radius={0}
        title="Pilih sebagai pendamping"
        warna={colors.primary}
        onPress={onOpen}
      />} */}




    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
