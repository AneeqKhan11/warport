import React, { useEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity} from 'react-native'
import _ from 'lodash'
import { connect } from 'react-redux'
import AutoCompleteDropDown from '../../../../components/AutoCompleteDropDown'
import {
  setAddEditProductCategoryC,
  setAddEditProductCategoryCDataSet,
} from '../../../../store/actions/AddEditProductActions'
import { useDropdownAlert } from '../../../../context/AlertDropdownContextProvider'
import { gql, useLazyQuery } from '@apollo/client'
import { useTranslation } from '../../../../context/Localization'
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
    marginTop:7,
    marginLeft:10,
    marginRight:5
  },
  rowcontainer:{
    flexDirection:'row',
    alignItems:'center'
  }
})

function CategoryCAutoCompleteDropDown(props) {
  const { alertWithType } = useDropdownAlert()
  const { translation } = useTranslation()
  const [categoryModal, setCategoryModal]= useState(false)

  const getCCategoriesQuery = gql`
    query get_c_categories($b_category_id: String!) {
      get_c_categories(b_category_id: $b_category_id) {
        id
        name
      }
    }
  `
  let [
    getCCategories,
    {
      loading: getCCategoriesQueryLoading,
      error: getCCategoriesQueryError,
      data: getCCategoriesQueryResult,
    },
  ] = useLazyQuery(getCCategoriesQuery, {
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    if (
      getCCategoriesQueryResult &&
      getCCategoriesQueryResult.get_c_categories
    ) {
      props.setAddEditProductCategoryCDataSet(
        _.map(getCCategoriesQueryResult.get_c_categories, (item) => {
          return { id: item.id, title: item.name }
        })
      )
    }
  }, [getCCategoriesQueryResult])

  useEffect(() => {
    if (props.addEditProductCategoryB.value) {
      props.setAddEditProductCategoryCDataSet([])
      getCCategories({
        variables: {
          b_category_id: props.addEditProductCategoryB.value,
        },
      })
    }
  }, [props.addEditProductCategoryB.value,categoryModal])

  const handleCategoryModalClose = () => {
    getCCategories({
      variables: {
        b_category_id: props.addEditProductCategoryB.value,
      },
    })
    setCategoryModal(false)
  }

  return (
    <View style={props.style}>
     {categoryModal && <AddCategoryModal
        CCat={props.addEditProductCategoryB.value}
        onClose={handleCategoryModalClose}
      />}
    <View style={styles.rowcontainer}> 
    <AutoCompleteDropDown
      inputMainContainerStyles={{ marginTop: 9}}
      placeholder={translation('Select C Category')}
      loading={getCCategoriesQueryLoading}
      error={!!props.addEditProductCategoryC.error}
      errorText={translation(props.addEditProductCategoryC.error)}
      initialValue={
        props.route && props.route.params && props.route.params.editItemData
          ? { id: props.addEditProductCategoryC.value.toString() }
          : undefined
      }
      onSelectItem={(item) => {
        if (item != null) {
          props.setAddEditProductCategoryC({
            value: item ? item.id : '',
            error: '',
          })
        }
      }}
      notCloseOnBlur
      dataSet={props.addEditProductCategoryCDataSet}
    />
    <TouchableOpacity onPress={()=>{
      setCategoryModal(true)
    }} style={styles.button}>
      <Icon name="add" size={30} color="white" />
    </TouchableOpacity>
    </View>
    </View>
  )
}
const mapStateToProps = (state) => {
  return { ...state.AddEditProductReducer, ...state.UserAuthDataReducer }
}
export default connect(mapStateToProps, {
  setAddEditProductCategoryC,
  setAddEditProductCategoryCDataSet,
})(CategoryCAutoCompleteDropDown)
