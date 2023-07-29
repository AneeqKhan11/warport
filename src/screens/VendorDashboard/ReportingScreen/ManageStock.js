import React, { useContext, useEffect } from 'react';
import { View, TouchableOpacity, Text, ScrollView, BackHandler, ActivityIndicator } from 'react-native';
import SliderComponent from '../../../components/SliderComponent';
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native';
import { getLoginUserId } from '../../../auth/LocalStorage';
import { ProductsRefreshContext } from '../../../context/ProductsRefreshContextProvider';

function ManageStock(props) {
    const navigation = useNavigation()
    let user_id = getLoginUserId()
    const { productsData, requestProductsRefresh, productsDataLoading } =
        useContext(ProductsRefreshContext)

    BackHandler.addEventListener("hardwareBackPress", () => {
        navigation.goBack()
        return true
    })

    useEffect(() => {
        requestProductsRefresh(user_id)
    }, [])

    const updateStock = () => {
        requestProductsRefresh(user_id)
    }

    if (productsDataLoading) {
        // Display a loading indicator while productsData is being fetched
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="blue" />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, padding: -10 }}>
            <ScrollView >
                <View style={{ flexDirection: 'row', margin: 15, alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack()
                        }}
                    >
                        <Icon
                            name="arrow-left"
                            size={24}
                            color="gray"
                        />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 24, color: 'gray', marginLeft: "25%", borderRadius: 5 }}>Add Stock</Text>
                </View>
                {productsData && productsData.length > 0 ? (
                    productsData.map((data, index) => (
                        <SliderComponent
                            key={index}
                            productId={data?.id}
                            productName={data?.title}
                            color={data?.product_color}
                            stock={data?.stock}
                            userId={user_id}
                            updateStock={updateStock}
                        />
                    ))
                ) : (
                    <View style={{
                        height: 600,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: "center"
                    }}>
                        <Text style={{ fontSize: 21, color: 'gray', fontWeight: '600' }}>Please add Product First</Text>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('AddEditProduct', {
                                    addInCustomerQueryFormProductDetailsAdded: true,
                                });
                            }}
                            style={{ display: "flex", justifyContent: 'center', alignItems: 'center', width: "100%", margin: 10 }}
                        >
                            <Text style={{ backgroundColor: "grey", fontSize: 20, color: "#FFF", padding: 10, borderRadius: 5 }}>Add Products First</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

export default ManageStock;
