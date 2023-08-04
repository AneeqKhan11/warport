import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text, Divider, Colors } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'
import Ripple from 'react-native-material-ripple'
import ProfileAvatar from '../../components/ProfileAvatar'
import { theme } from '../../core/theme'
import { connect } from 'react-redux'
import { removeLoginUserId, setInitialRoute } from '../../auth/LocalStorage'
import { setVendorDrawerReset } from '../../store/actions/VendorDrawerActions'
import { useTranslation } from '../../context/Localization'
import LanguageButtonMenu from '../../components/LanguageButtonMenu'
import { useNavigation } from '@react-navigation/native'
import { saveData } from '../../auth/AsyncStorage'
import Entypo from 'react-native-vector-icons/Entypo'

const styles = StyleSheet.create({
  IconMain: {
    height: 30,
    width: 30,
    justifyContent: 'center',
  },

  container: {
    flexDirection: 'column',
    flex: 1,
    borderRightColor: '#FFF',
    backgroundColor: '#FFF',
    borderRightWidth: 1,
  },
  topContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
    backgroundColor: "#BBDEFB"
  },
  topContainerUserInfo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  usernameText: {
    textAlign: 'center',
    textTransform: 'capitalize',
    fontSize: 21,
    fontWeight: '700',
    color: 'black',
    flexWrap: 'wrap',
    width: 200
  },
  usernameNumber: {
    fontSize: 15,
    color: 'gray',
    marginTop: 5,
  },
  avatar: {
    marginLeft: 20,
    backgroundColor: 'blue'
  },
  midContainer: {
    flexGrow: 1,
    borderTopColor: '#c7c7c7',
    // borderTopWidth: 1,
  },
  menuBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 7,
    paddingRight:40
  },
  menuItemDivider: {
    backgroundColor: 'transparent',
  },
  menuBtnIcon: {
    marginLeft: 10,
    height: 30,
    width: 30,
  },
  menuBtnIconPrimaryColor: {
    paddingTop: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },

  menuBtnIconRed: {
    backgroundColor: theme.colors.error,
  },

  logoutBtn: {
    paddingVertical: 18,
    justifyContent: 'flex-start',
    alignContent: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    flex: 1
  },
  menuText: {
    marginTop: 5,
    fontSize: 15,
    color: 'black',
  },
  DrawerText: {
    width: 170
  },
  logoutContainer: {
    flexDirection: 'row',
  },
  languageBtn: {
    paddingHorizontal: 5,
    borderLeftColor: "#b3b0b0",
    borderLeftWidth: 1,
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center"
  },
  rfqText: {
    fontSize: 12,
    marginTop: 4,
    alignSelf: 'center'
  },
  contentStyle: {
    padding: 20,
    color: 'black'
  },
})

function DrawerContent(props) {
  const navigation = useNavigation()
  const { translation } = useTranslation()
  const handleCloseDrawer = async () => {
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
    await saveData("ROUTE", "Home");
    props.setVendorDrawerReset();
  };
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={{
          height: 40,
          marginTop:10,
          width: "100%",
          paddingRight: 10,
          alignItems: 'flex-end',
          justifyContent: 'center',
          backgroundColor: "#BBDEFB"
        }}>
          <TouchableOpacity
            onPress={handleCloseDrawer}
            style={{
              height: 30,
              width: 30,
              borderRadius: 100,
              backgroundColor: '#FFF',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 0.5,
              borderColor: '#A2A2A2',
              ...Platform.select({
                ios: {
                  shadowColor: 'black',
                  shadowOffset: { width: 0, height: 20 },
                  shadowOpacity: 0.2,
                  shadowRadius: 4,
                },
                android: {
                  elevation: 4,
                },
              }),
            }}>

            <Entypo name='cross' color={"black"} size={20} />
          </TouchableOpacity>
        </View>
        <ProfileAvatar
          style={styles.avatar}
          source={props.userAuthData.avatar}
        />
        <View style={styles.topContainerUserInfo}>
          <Text style={styles.usernameText}>
            {props.userAuthData.company_name}
          </Text>
          <Text style={styles.usernameNumber}>
            {props.userAuthData.contact_no}
          </Text>
        </View>
      </View>
      <View style={styles.midContainer}>
        <Ripple
          onPress={() => {
            props.navigation.navigate('UserProfileScreen')
          }}
          style={styles.menuBtn}
        >
          <View style={styles.IconMain}>
            <Icon
              name={'user'}
              size={20}
              color={'black'}
            />
          </View>
          <View style={styles.DrawerText}>
            <Text style={styles.menuText}> {translation('Profile')}</Text>
          </View>
        </Ripple>
        {/* <Divider style={styles.menuItemDivider} /> */}
        <Divider style={[{ borderTopColor: "#c3c3c3", borderTopWidth: 1 }, styles.menuItemDivider]} />
        <Ripple
          style={styles.menuBtn}
          onPress={() => {
            props.navigation.navigate('InfoForProductsForm')
          }}
        >
          <View style={styles.IconMain}>
            <Icon
              name={'info'}
              size={24}
              color={'black'}
            />
          </View>
          <View style={styles.DrawerText}><Text style={styles.menuText}> {translation('Logistics (Coming Soon)')}</Text></View>
        </Ripple>

        {/* <Ripple
          style={styles.menuBtn}
          onPress={() => {
            props.navigation.navigate('CustomerQueryForm')
          }}
        >
          <Icon
            style={[styles.menuBtnIcon, styles.menuBtnIconBlue]}
            name={'database'}
            size={24}
            color={'black'}
          />
          <Text style={styles.menuText}> {translation('Customers Entry')}</Text>
          <Text style={styles.rfqText}> {translation('(For RFQs)')}</Text>
        </Ripple> */}
        {/* <Tooltip
                isVisible={toolTipVisible}
                content={<Text style={{color:Colors.black}}>You can always see your Products Here</Text>}
                onClose={() => {
                  setToolTipVisible(false)
                }}
                contentStyle={styles.contentStyle}
                placement='bottom'
              > */}
        {/* <Ripple
          style={styles.menuBtn}
          onPress={() => {
            navigation.navigate('ProductsViewComponent', {
            })
          }}
        >
          <Icon
            style={[styles.menuBtnIcon, styles.menuBtnIconRed]}
            name={'product-hunt'}
            size={24}
            color={'black'}
          />
          <Text style={styles.menuText}> {translation('Products List')}</Text>
        </Ripple> */}
        {/* </Tooltip> */}
        <Divider style={[{ borderTopColor: "#c3c3c3", borderTopWidth: 1 }, styles.menuItemDivider]} />

        <Ripple
          style={styles.menuBtn}
          onPress={() => {
            props.navigation.navigate('ContactUsScreen')
          }}
        >
          <View style={styles.IconMain}>
            <Icon
              name={'phone'}
              size={24}
              color={'black'}
            />
          </View>
          <View style={styles.DrawerText}><Text style={styles.menuText}> {translation('Contact Us')}</Text></View>
        </Ripple>
        <Divider style={[{ borderTopColor: "#c3c3c3", borderTopWidth: 1 }, styles.menuItemDivider]} />
        <Ripple
          style={styles.menuBtn}
          onPress={async () => {
            // await removeLoginUserId()
            props.navigation.reset({
              index: 0,
              routes: [{ name: 'LoginScreen' }],
            })
            await saveData("ROUTE", "LoginScreen")
            // props.navigation.navigate("LoginScreen")
            props.setVendorDrawerReset()
          }}
        >
          <View style={styles.IconMain}>
            <Icon
              name={'sign-out'}
              size={24}
              color={'black'}
            />
          </View>
          <View style={styles.DrawerText}>
            <Text style={[styles.menuText, styles.menuLoginText]}>
              {translation('Logout')}
            </Text>
          </View>
        </Ripple>
        <Divider style={[{ borderTopColor: "#c3c3c3", borderTopWidth: 1 }, styles.menuItemDivider]} />
      </View>
    </View>
  )
}
const mapStateToProps = (state) => {
  return { ...state.VendorDrawerReducer, ...state.UserAuthDataReducer }
}
export default connect(mapStateToProps, { setVendorDrawerReset })(DrawerContent)
