import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Switch,
  SafeAreaView,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { MyInput, MyGap, MyButton, MyPicker } from '../../components';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import LottieView from 'lottie-react-native';
import { urlAPI } from '../../utils/localStorage';
import { Icon } from 'react-native-elements';

export default function Register({ navigation }) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [open, setOpen] = useState(false);
  const [kota, setKota] = useState([]);
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const validate = text => {
    // console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      // console.log('Email is Not Correct');
      setData({ ...data, email: text });
      setValid(false);
      return false;
    } else {
      setData({ ...data, email: text });
      setValid(true);
      // console.log('Email is Correct');
    }
  };

  const [level, setlevel] = useState({
    1: true,
    2: false
  })

  const [data, setData] = useState({
    nama_lengkap: '',
    email: '',
    npm: '',
    prodi: 'PTIK A',
    jurusan: 'JTIK',
    alamat: '',
    telepon: '',
    password: '',
    angkatan: '2020'

  });

  const simpan = () => {
    if (
      data.nama_lengkap.length === 0 &&
      data.email.length === 0 &&
      data.password.length === 0 &&
      data.npm.length === 0 &&
      data.prodi.length === 0 &&
      data.telepon.length === 0
    ) {
      showMessage({
        message: 'Maaf Semua Field Harus Di isi !',
      });
    } else if (data.nama_lengkap.length === 0) {
      showMessage({
        message: 'Maaf Nama Lengkap masih kosong !',
      });
    } else if (data.npm.length === 0) {
      showMessage({
        message: 'Maaf NPM masih kosong !',
      });
    } else if (data.prodi.length === 0) {
      showMessage({
        message: 'Maaf Prodi masih kosong !',
      });
    } else if (data.jurusan.length === 0) {
      showMessage({
        message: 'Maaf Jurusan masih kosong !',
      });
    } else if (data.email.length === 0) {
      showMessage({
        message: 'Maaf email masih kosong !',
      });
    } else if (data.telepon.length === 0) {
      showMessage({
        message: 'Maaf Telepon masih kosong !',
      });
    } else if (data.password.length === 0) {
      showMessage({
        message: 'Maaf Password masih kosong !',
      });
    } else {
      setLoading(true);
      console.log(data);
      axios
        .post(urlAPI + '/register.php', data)
        .then(res => {
          console.warn(res.data);
          let err = res.data.split('#');

          console.log(err[0]);
          if (err[0] == 50) {
            setTimeout(() => {
              setLoading(false);
              showMessage({
                message: err[1],
                type: 'danger',
              });
            }, 1200);
          } else {
            setTimeout(() => {
              navigation.replace('Success', {
                messege: res.data,
              });
            }, 1200);
          }
        });
    }
  };

  useEffect(() => {

  }, [])




  return (
    <SafeAreaView

      style={{
        flex: 1,
        backgroundColor: colors.white
      }}>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>



        <MyInput
          label="Nama Lengkap"
          placeholder="Masukan nama lengkap"
          iconname="person-outline"
          value={data.nama_lengkap}
          onChangeText={x =>
            setData({
              ...data,
              nama_lengkap: x,
            })
          }
        />
        <MyGap jarak={10} />
        <MyInput
          label="Email"
          iconname="mail-outline"
          placeholder="Masukan email"
          value={data.email}
          onChangeText={x =>
            setData({
              ...data,
              email: x,
            })
          }
        />
        <MyGap jarak={10} />
        <MyInput
          label="NIM"
          iconname="card-outline"
          placeholder="Masukan nim"
          value={data.npm}
          onChangeText={x =>
            setData({
              ...data,
              npm: x,
            })
          }
        />


        <MyGap jarak={10} />
        <MyPicker label="Jurusan" data={[
          {
            label: 'JTIK',
            value: 'JTIK'
          }
        ]} iconname="school-outline" onValueChange={x =>
          setData({
            ...data,
            jurusan: x,
          })} />
        <MyGap jarak={10} />

        <MyPicker label="Prodi" data={[
          {
            label: 'PTIK A',
            value: 'PTIK A'
          },
          {
            label: 'PTIK B',
            value: 'PTIK B'
          },
          {
            label: 'PTIK C',
            value: 'PTIK C'
          },
          {
            label: 'PTIK D',
            value: 'PTIK D'
          },
          {
            label: 'PTIK E',
            value: 'PTIK E'
          },
          {
            label: 'PTIK F',
            value: 'PTIK F'
          },
          {
            label: 'PTIK G',
            value: 'PTIK G'
          },
          {
            label: 'TEKOM A',
            value: 'TEKOM A'
          },
          {
            label: 'TEKOM B',
            value: 'TEKOM B'
          },
          {
            label: 'TEKOM C',
            value: 'TEKOM C'
          },
          {
            label: 'TEKOM D',
            value: 'TEKOM D'
          },
          {
            label: 'TEKOM E',
            value: 'TEKOM E'
          },
          {
            label: 'TEKOM F',
            value: 'TEKOM F'
          },
          {
            label: 'TEKOM EMBEDED',
            value: 'TEKOM EMBEDED'
          }
        ]} iconname="bookmarks-outline" onValueChange={x =>
          setData({
            ...data,
            prodi: x,
          })} />
        <MyGap jarak={10} />
        <MyPicker label="Angkatan" data={[
          {
            label: '2019',
            value: '2019'
          },
          {
            label: '2020',
            value: '2020'
          }, {
            label: '2021',
            value: '2021'
          }
          , {
            label: '2022',
            value: '2022'
          }
        ]} iconname="calendar-outline" onValueChange={x =>
          setData({
            ...data,
            angkatan: x,
          })} />




        <MyGap jarak={10} />
        <MyInput
          label="Telepon / Whatsapp ( Contoh +62812345678 )"
          keyboardType="phone-pad"
          iconname="logo-whatsapp"
          placeholder="Masukan telepon"
          value={data.telepon}
          onChangeText={x =>
            setData({
              ...data,
              telepon: x,
            })
          }
        />


        <MyGap jarak={10} />
        <MyInput
          label="Password"
          placeholder="Masukan password"
          iconname="lock-closed-outline"
          secureTextEntry={show}
          value={data.password}
          onChangeText={value =>
            setData({
              ...data,
              password: value,
            })
          }
        />


        <MyGap jarak={20} />

        <MyButton
          warna={colors.primary}
          title="REGISTER"
          Icons="log-in"
          onPress={simpan}
        />

        <MyGap jarak={20} />
      </ScrollView>
      {loading && (
        <LottieView
          source={require('../../assets/animation.json')}
          autoPlay
          loop
          style={{
            flex: 1,
            backgroundColor: colors.primary,
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: 620 / 4,
    height: 160 / 4,
  },
});
