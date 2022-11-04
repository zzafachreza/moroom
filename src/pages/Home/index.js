import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { storeData, getData, urlAPI } from '../../utils/localStorage';
import { Icon } from 'react-native-elements';
import MyCarouser from '../../components/MyCarouser';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import 'intl';
import 'intl/locale-data/jsonp/en';
import LottieView from 'lottie-react-native';
import { useIsFocused } from '@react-navigation/native';
import { MyButton, MyGap } from '../../components';

export default function Home({ navigation }) {
  const [user, setUser] = useState({});
  const [ruangan, setRuangan] = useState([]);
  const [token, setToken] = useState('');

  const isFocused = useIsFocused();

  useEffect(() => {

    // const unsubscribe = messaging().onMessage(async remoteMessage => {

    //   const json = JSON.stringify(remoteMessage);
    //   const obj = JSON.parse(json);

    //   // console.log(obj);

    //   // alert(obj.notification.title)



    //   PushNotification.localNotification({
    //     /* Android Only Properties */
    //     channelId: 'ekonseling', // (required) channelId, if the channel doesn't exist, notification will not trigger.
    //     title: obj.notification.title, // (optional)
    //     message: obj.notification.body, // (required)
    //   });
    // });



    if (isFocused) {
      __getDataRuangan();
      __getDataUserInfo();

    }
    // return unsubscribe;
  }, [isFocused]);


  const __getDataRuangan = () => {
    axios.post(urlAPI + '/1data_ruangan.php').then(res => {
      setRuangan(res.data)
    })
  }



  const __getDataUserInfo = () => {
    getData('user').then(users => {
      setUser(users);
      getData('token').then(res => {
        setToken(res.token);
        axios
          .post(urlAPI + '/update_token.php', {
            id: users.id,
            token: res.token,
          })
          .then(res => {
            // console.error('update token', res.data);
          });
      });
    });
  }


  const __renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={{
        padding: 15,
        margin: 5,
        flex: 1,

      }}>
        <View style={{
          backgroundColor: colors.secondary,
          borderRadius: 10,
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Image source={require('../../assets/room.png')} />
        </View>

        <Text style={{
          marginVertical: 10,
          fontFamily: fonts.secondary[400],
          fontSize: windowWidth / 30,
          textAlign: 'center'
        }}>{item.nama_ruangan}</Text>
      </TouchableOpacity>
    )
  }

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const ratio = 192 / 108;




  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      {/* header */}
      <View
        style={{
          padding: 10,
          backgroundColor: colors.primary,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}>


        <View style={{
          flexDirection: 'row'
        }}>
          <View style={{
            flex: 1,
            padding: 10,
          }}>
            <Text style={{
              color: colors.white,
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 30,
            }}>Hai <Text style={{
              color: colors.white,
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 30,
            }}>{user.nama_lengkap}</Text></Text>
            <Text style={{
              color: colors.white,
              fontFamily: fonts.secondary[800],
              fontSize: windowWidth / 25,
            }}>MoRoom</Text>
          </View>


          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 20,
          }}>
            <Image source={require('../../assets/logo.png')} style={{
              width: 50, height: 100
            }} />
          </View>

        </View>

        {/* in out */}

        <View style={{
          flexDirection: 'row',
          margin: 10,
          backgroundColor: colors.white,
          alignItems: 'center',
          borderRadius: 10,
        }}>
          <TouchableOpacity style={{
            justifyContent: 'center',
            flexDirection: 'row',
            flex: 1,
          }}>
            <Icon type='ionicon' name='settings' color={colors.primary} />
            <Text style={{
              left: 10,
              color: colors.secondary,
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 30,
            }}>Pengaturan Check-In</Text>
          </TouchableOpacity>
          <View style={{
            borderLeftWidth: 2,
            height: 70,
            borderLeftColor: colors.secondary,
          }}><Text>&nbsp;</Text></View>
          <TouchableOpacity style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingHorizontal: 10,
            flex: 0.5,

          }}>
            <Icon type='ionicon' name='qr-code' color={colors.primary} />
            <Text style={{
              left: 10,
              color: colors.secondary,
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 30,
            }}>Check-In</Text>
          </TouchableOpacity>
        </View>


      </View>

      <ScrollView>

        <FlatList data={ruangan} renderItem={__renderItem} numColumns={3} />
      </ScrollView>

    </SafeAreaView>
  );
}
