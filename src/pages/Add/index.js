import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MyPicker, MyGap, MyInput, MyButton } from '../../components';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { colors } from '../../utils/colors';
import { fonts, windowHeight, windowWidth } from '../../utils/fonts';
import { Image } from 'react-native';
import { getData, urlAPI } from '../../utils/localStorage';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { Icon } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';
import { maskJs, maskCurrency } from 'mask-js';

export default function ({ navigation, route }) {

    const kode = route.params.barcode;
    const [data, setData] = useState([]);
    const [kirim, setKirim] = useState({
        kode: route.params.kode,
        fid_user: route.params.fid_user,
        tanggal: new Date(),
        jam_masuk: '',
        jam_keluar: '',
        tujuan: '',
        mata_kuliah: '',
        dosen: '',
    });

    const [loading, setLoading] = useState(false);
    const __sendServer = () => {
        setLoading(true);
        console.log(kirim)
        setTimeout(() => {
            axios.post(urlAPI + '/pakai.php', kirim).then(res => {
                console.log(res.data);
                setLoading(false);
                showMessage({
                    type: 'success',
                    message: 'Sent Successfully !'
                });
                navigation.replace('MainApp');
            })
        }, 800)
    }

    useEffect(() => {

    }, [])

    return (
        <SafeAreaView style={{
            flex: 1,
            padding: 10,
            justifyContent: 'center',
            backgroundColor: colors.white
        }}>


            <MyInput value={kirim.tujuan} onChangeText={x => {
                setKirim({
                    ...kirim,
                    tujuan: x
                })
            }} autoFocus label="Tujuan Penggunaan" placeholder="masukan tujuan penggunaan" iconname="create" />
            <MyGap jarak={10} />
            <MyInput value={kirim.mata_kuliah} onChangeText={x => {
                setKirim({
                    ...kirim,
                    mata_kuliah: x
                })
            }} label="Mata Kuliah" placeholder="masukan mata kuliah" iconname="create" />
            <MyGap jarak={10} />
            <MyInput value={kirim.dosen} onChangeText={x => {
                setKirim({
                    ...kirim,
                    dosen: x
                })
            }} label="Nama Dosen" placeholder="masukan nama dosen" iconname="create" />
            <MyGap jarak={10} />
            <View style={{
                flexDirection: 'row'
            }}>
                <View style={{
                    flex: 1,
                    paddingRight: 10,
                }}>
                    <MyInput placeholder="00:00" keyboardType='number-pad' maxLength={5} value={kirim.jam_masuk} onChangeText={x => {
                        setKirim({
                            ...kirim,
                            jam_masuk: maskJs('99:99', x)
                        })
                    }} label="Jam Masuk" iconname="time" />
                </View>
                <View style={{
                    flex: 1,
                    paddingLeft: 10,
                }}>
                    <MyInput placeholder="00:00" keyboardType='number-pad' maxLength={5} value={kirim.jam_keluar} onChangeText={x => {
                        setKirim({
                            ...kirim,
                            jam_keluar: maskJs('99:99', x)
                        })
                    }} label="Jam Keluar" iconname="time" />
                </View>

            </View>
            <MyGap jarak={10} />
            {!loading && <MyButton onPress={__sendServer} title="CHECK IN SEKARANG" Icons="cloud-upload-outline" warna={colors.primary} />}
            {loading && <ActivityIndicator color={colors.secondary} size="large" />}

        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})