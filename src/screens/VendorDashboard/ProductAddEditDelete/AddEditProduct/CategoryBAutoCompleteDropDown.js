import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import _ from 'lodash'
import { connect } from 'react-redux'
import AutoCompleteDropDown from '../../../../components/AutoCompleteDropDown'
import {
  setAddEditProductCategoryB,
  setAddEditProductCategoryBDataSet,
} from '../../../../store/actions/AddEditProductActions'
import { useDropdownAlert } from '../../../../context/AlertDropdownContextProvider'
import { gql, useLazyQuery } from '@apollo/client'
import { useTranslation } from '../../../../context/Localization'
import { Button } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons';
import AddCategoryModal from '../../../../context/AddCategoryModal'

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'green',
    borderRadius: 10,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:17,
    marginLeft:10,
    marginRight:5,
  },
  rowcontainer:{
    flexDirection:'row',
    alignItems:'center'
  }
})

function CategoryBAutoCompleteDropDown(props) {
  const { alertWithType } = useDropdownAlert()
  const { translation } = useTranslation()
  const [categoryModal, setCategoryModal]= useState(false)

  const getBCategoriesQuery = gql`
    query get_b_categories($a_category_id: String!) {
      get_b_categories(a_category_id: $a_category_id) {
        id
        name
      }
    }
  `
  let [
    getBCategories,
    {
      loading: getBCategoriesQueryLoading,
      error: getBCategoriesQueryError,
      data: getBCategoriesQueryResult,
    },
  ] = useLazyQuery(getBCategoriesQuery, {
    fetchPolicy: 'network-only',
  })
  useEffect(() => {
    if (
      getBCategoriesQueryResult &&
      getBCategoriesQueryResult.get_b_categories
    ) {
      props.setAddEditProductCategoryBDataSet(
        _.map(getBCategoriesQueryResult.get_b_categories, (item) => {
          return { id: item.id, title: item.name }
        })
      )
    }
  }, [getBCategoriesQueryResult])
  useEffect(() => {
  
    if(props.userAuthData.category_a_id){

    getBCategories({
      variables: {
        a_category_id: props.userAuthData.category_a_id,
      },
    })
  }
  }, [props.userAuthData.category_a_id,categoryModal])


  const handleCategoryModalClose = () => {
    getBCategories({
      variables: {
        a_category_id: props.userAuthData.category_a_id,
      },
    })
    setCategoryModal(false)
  }

  
  return (
    <View>
     {categoryModal && <AddCategoryModal
        BCat={props.userAuthData.category_a_id}
        onClose={handleCategoryModalClose}
      />}
    <View style={styles.rowcontainer}> 
    <AutoCompleteDropDown
      loading={getBCategoriesQueryLoading}
      inputMainContainerStyles={{ marginTop: 20}}
      placeholder={translation('Select B Category')}
      error={!!props.addEditProductCategoryB.error}
      errorText={translation(props.addEditProductCategoryB.error)}
      initialValue={
        props.route && props.route.params && props.route.params.editItemData
          ? { id: props.addEditProductCategoryB.value.toString() }
          : undefined
      }
      onSelectItem={(item) => {
        props.setAddEditProductCategoryB({
          value: item ? item.id : '',
          error: '',
        })
      }}
      notCloseOnBlur
      dataSet={props.addEditProductCategoryBDataSet}
    />
    <TouchableOpacity onPress={()=>{
      setCategoryModal(true)
    }} style={styles.button}>
      <Icon name="add" size={30} color="white" />
    </TouchableOpacity>
    </View>
    </View>
    // <Autocomplete
    // disablePortal
    // id="combo-box-demo"
    // options={props.setAddEditProductCategoryBDataSet}
    // sx={{ width: 300 }}
    // renderInput={(params) => <TextField {...params} label="Movie" />}
  )
}
const mapStateToProps = (state) => {
  return { ...state.AddEditProductReducer, ...state.UserAuthDataReducer }
}
export default connect(mapStateToProps, {
  setAddEditProductCategoryB,
  setAddEditProductCategoryBDataSet,
})(CategoryBAutoCompleteDropDown)
