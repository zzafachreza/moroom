import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { colors } from '../../utils/colors';
import { useIsFocused } from '@react-navigation/native';
import { MyButton } from '../../components';
export default function Akses({ navigation, route }) {

  const [code, setCode] = useState(0);

  const isFocused = useIsFocused();
  const __getCode = () => {
    axios.post('https://moroom.zavalabs.com/v1/pintu?kode=R001').then(res => {
      console.log(res.data)
      setCode(res.data)
    })
  }


  const buka = () => {
    axios.post('https://moroom.zavalabs.com/v1/buka', {
      kode: 'R001'
    }).then(res => {
      console.log('buka', res.data)
      __getCode();
    })
  }

  const tutup = () => {
    axios.post('https://moroom.zavalabs.com/v1/tutup', {
      kode: 'R001'
    }).then(res => {

      console.log('kunci', res.data);
      __getCode();
    })
  }


  useEffect(() => {

    if (isFocused) {
      __getCode();
    }
  }, [isFocused])
  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.white,
      padding: 20,
      justifyContent: 'center'
    }}>
      {code == 1 && <MyButton onPress={buka} title="KUNCI PINTU" warna={colors.primary} Icons="lock-closed" />}
      {code == 0 && <MyButton onPress={tutup} title="BUKA PINTU" warna={colors.black} Icons="lock-open" />}
    </View>
  )
}

const styles = StyleSheet.create({})