import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Linking,
} from 'react-native';
import { windowWidth, fonts } from '../../utils/fonts';
import { getData, storeData, urlAPI, urlAvatar } from '../../utils/localStorage';
import { colors } from '../../utils/colors';
import { MyButton, MyGap } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

export default function Account({ navigation, route }) {
  const [user, setUser] = useState({});
  const [com, setCom] = useState({});
  const isFocused = useIsFocused();
  const [wa, setWA] = useState('');



  useEffect(() => {
    if (isFocused) {
      getData('user').then(res => {
        setUser(res);
        console.error(res);
      });

    }
  }, [isFocused]);

  const btnKeluar = () => {
    storeData('user', null);

    navigation.replace('Login');
  };

  const kirimWa = x => {
    Linking.openURL(
      'https://api.whatsapp.com/send?phone=' +
      x +
      '&text=Halo%20NIAGA%20BUSANA',
    );
  };

  return (
    <SafeAreaView>
      <View style={{ padding: 10 }}>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Image source={{
            uri: urlAvatar + user.foto_user,
          }} style={{ width: 80, height: 80, borderRadius: 10, }} />
        </View>

        {/* data detail */}
        <View style={{ padding: 10 }}>


          <MyGap jarak={10} />
          <View>


            <View
              style={{
                marginVertical: 3,
                padding: 10,
                backgroundColor: colors.white,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  color: colors.black,
                }}>
                Nama Lengkap
              </Text>
              <Text
                style={{
                  fontFamily: fonts.secondary[400],
                  color: colors.primary,
                }}>
                {user.nama_lengkap}
              </Text>
            </View>


            <View
              style={{
                marginVertical: 3,
                padding: 10,
                backgroundColor: colors.white,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  color: colors.black,
                }}>
                NPM / NIM
              </Text>
              <Text
                style={{
                  fontFamily: fonts.secondary[400],
                  color: colors.primary,
                }}>
                {user.npm}
              </Text>
            </View>


            <View
              style={{
                marginVertical: 3,
                padding: 10,
                backgroundColor: colors.white,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  color: colors.black,
                }}>
                E-mail
              </Text>
              <Text
                style={{
                  fontFamily: fonts.secondary[400],
                  color: colors.primary,
                }}>
                {user.email}
              </Text>
            </View>
            <View
              style={{
                marginVertical: 3,
                padding: 10,
                backgroundColor: colors.white,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  color: colors.black,
                }}>
                Telepon / Whatsapp
              </Text>
              <Text
                style={{
                  fontFamily: fonts.secondary[400],
                  color: colors.primary,
                }}>
                {user.telepon}
              </Text>
            </View>

            <View
              style={{
                marginVertical: 3,
                padding: 10,
                backgroundColor: colors.white,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  color: colors.black,
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
                padding: 10,
                backgroundColor: colors.white,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  color: colors.black,
                }}>
                Jurusan
              </Text>
              <Text
                style={{
                  fontFamily: fonts.secondary[400],
                  color: colors.primary,
                }}>
                {user.jurusan}
              </Text>
            </View>


          </View>
        </View>

        {/* button */}
        <View style={{ padding: 10, flexDirection: 'row' }}>

          <View style={{
            flex: 1,
            paddingRight: 5,
          }}>
            <MyButton
              onPress={() => navigation.navigate('EditProfile', user)}
              title="Edit Profile"
              colorText={colors.white}
              iconColor={colors.white}
              warna={colors.secondary}
              Icons="create-outline"
            />
          </View>

          <View style={{
            flex: 1,
            paddingLeft: 5,
          }}>
            <MyButton
              onPress={btnKeluar}
              title="Keluar"
              colorText={colors.white}
              iconColor={colors.white}
              warna={colors.primary}
              Icons="log-out-outline"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
