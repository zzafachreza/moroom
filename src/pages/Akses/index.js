import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getData, urlAPI } from '../../utils/localStorage';
import { MyButton, MyGap, MyInput } from '../../components';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { showMessage } from 'react-native-flash-message';
import axios from 'axios';
export default function Akses({ navigation, route }) {

  const [user, setUser] = useState({});
  const [kirim, setKirim] = useState({
    fid_user: user.id
  })
  useEffect(() => {
    getData('user').then(u => {
      setUser(u);
      setKirim({
        ...kirim,
        fid_user: u.id
      })
    });


  }, [])

  const [loading, setLoading] = useState(false);
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white,
      padding: 10,
    }}>
      <ScrollView>
        <MyInput onChangeText={x => setKirim({ ...kirim, keterangan: x })} placeholder="masukan perihal bantuan relawan" label="Perihal bantuan" iconname="create" multiline />
        <MyGap jarak={20} />
        {loading && <ActivityIndicator color={colors.primary} size="large" />}
        {!loading && <MyButton onPress={() => {
          console.log(kirim);
          setLoading(true);

          setTimeout(() => {
            axios.post(urlAPI + '/1add_bantuan.php', kirim).then(res => {
              setLoading(false);

              showMessage({
                type: 'success',
                color: colors.white,
                backgroundColor: colors.success,
                message: 'Selamat bantuan relawan berhasil dikirim'
              })
            }, 1000);
            navigation.goBack();
          })
        }} colorText={colors.primary} iconColor={colors.primary} Icons="cloud-upload-outline" title="Kirim" warna={colors.secondary} />}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})