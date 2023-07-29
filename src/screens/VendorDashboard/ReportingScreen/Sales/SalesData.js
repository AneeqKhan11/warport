import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, BackHandler } from 'react-native';
import SalesTable from './SalesTable';
import Flag from 'react-native-flags';
import LogoDashboard from '../../../../components/LogoDashboard';
import ButtonWithBadge from '../../../../components/ButtonWithBadge';
import BackButtonWithTitleAndComponent from '../../../../components/BackButtonWithTitleAndComponent';
import { useNavigation } from '@react-navigation/native';

import { useDropdownAlert } from '../../../../context/AlertDropdownContextProvider';
import { useTranslation } from '../../../../context/Localization';

const styles = StyleSheet.create({

})

function SalesData(props) {
    const [data , setData] = useState([])
    const { alertWithType } = useDropdownAlert()
    const today = new Date().toLocaleDateString();
    const {translation} = useTranslation()
    // const createdAt = data[0].createdAt
    // const date = new Date(parseInt(createdAt)).toLocaleDateString();
    // console.log(date)

    BackHandler.addEventListener('hardwareBackPress',()=>{
        props.navigation.goBack()
        return true
    })
    return (
        <ScrollView>
            <BackButtonWithTitleAndComponent
        goBack={() => {
          props.navigation.goBack()
        }}
        // title="PO Life Cycle"
      >
            <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Flag
                  code={translation("PK")}
                  size={24}
                  style={styles.userFlag}
                />
                <LogoDashboard />
              </View>
              <ButtonWithBadge
                iconStyle={styles.chatBtnIcon}
                badgeValue={false}
                iconName={'comment-dots'}
                buttonStyle={styles.chatBtn}
              />
      </BackButtonWithTitleAndComponent>
        <SalesTable data={data} showSearch={true}/>
        </ScrollView>
    );
}

export default SalesData;