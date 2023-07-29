import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import LoadingButton from '../../../components/LoadingButton';
import AutoCompleteDropDown from '../../../components/AutoCompleteDropDown';
import {
  setAddEditProductCategoryAInputValues,
  setAddEditProductCategoryADataSet,
  setAddEditProductCategoryALoading,
} from '../../../store/actions/AddEditProductActions';
import { setUserAuthData } from '../../../store/actions/UserAuthDataActions';
import { categoryValidator } from '../../../helpers/categoryValidator';
import { useDropdownAlert } from '../../../context/AlertDropdownContextProvider';
import { gql, useMutation, useLazyQuery } from '@apollo/client';
import { useTranslation } from '../../../context/Localization';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AddCategoryModal from '../../../context/AddCategoryModal';
import AlertView from '../../../context/AlertView';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  button: {
    backgroundColor: 'green',
    borderRadius: 10,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 7,
    marginLeft: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

function ProductCategoryPopUp(props) {
  const { alertWithType } = useDropdownAlert();
  const { translation } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);
  const navigation = useNavigation();
  const [alertMessage , setAlertMessage] = useState("")
  const [alertVisible, setAlertVisible] = useState(false)
  // useEffect(() => {
  //   onSavePressed()
  // }, [props.addEditProductCategoryAInputValues]);

  const getACategoriesQuery = gql`
    query get_a_categories {
      get_a_categories {
        id
        name
      }
    }
  `;

  const [
    getACategories,
    {
      loading: getACategoriesQueryLoading,
      error: getACategoriesQueryError,
      data: getACategoriesQueryResult,
    },
  ] = useLazyQuery(getACategoriesQuery, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    console.log(props.userAuthData.category_a_id)
    // if (props.userAuthData.category_a_id === null || props.value === null) {
    //   setShowModal(true);
    // } else {
    //   setShowModal(false);
    // }

    if (getACategoriesQueryResult && getACategoriesQueryResult.get_a_categories) {
      const categoryADataset = getACategoriesQueryResult.get_a_categories.map((item) => ({
        id: item.id,
        title: item.name,
      }));
      props.setAddEditProductCategoryADataSet(categoryADataset);
    }
  }, [getACategoriesQueryResult]);

  useEffect(() => {
    getACategories();
  }, [categoryModal]);

  const updateCategoryAIdMutation = gql`
    mutation update_category_a_id($user_id: ID!, $category_a_id: ID!) {
      update_category_a_id(user_id: $user_id, category_a_id: $category_a_id) {
        success
        error
        result
      }
    }
  `;

  const [
    updateCategoryAId,
    {
      loading: updateCategoryAIdMutationLoading,
      error: updateCategoryAIdMutationError,
      data: updateCategoryAIdMutationResult,
    },
  ] = useMutation(updateCategoryAIdMutation);

  useEffect(() => {
    if (updateCategoryAIdMutationError) {
      updateCategoryAIdMutationError.graphQLErrors.forEach(({ message }) => {
        props.setAddEditProductCategoryALoading(false);
        alertMessage(message)
        alertVisible(true)
        // alertWithType('error', 'WarePort Error', message);
      });
    }
  }, [updateCategoryAIdMutationError]);

  useEffect(() => {
    if (
      updateCategoryAIdMutationResult &&
      updateCategoryAIdMutationResult.update_category_a_id
    ) {
      props.setUserAuthData({
        ...props.userAuthData,
        category_a_id: updateCategoryAIdMutationResult.update_category_a_id.result,
      });
    }
  }, [updateCategoryAIdMutationResult]);

  const handleCategoryModalClose = () => {
    getACategories();
    setCategoryModal(false);
  };

  const onSavePressed = async () => {
    const categoryAError = categoryValidator(props.addEditProductCategoryAInputValues.value);
    if (categoryAError) {
      props.setAddEditProductCategoryAInputValues({
        value: props.addEditProductCategoryAInputValues.value,
        error: categoryAError,
      });
      return;
    }
    try {
      await updateCategoryAId({
        variables: {
          user_id: props.userAuthData.id,
          category_a_id: props.addEditProductCategoryAInputValues.value,
        },
      });
    } catch (ex) {
      if (ex.networkError) {
        alertMessage('Check your Internet Connection')
        alertVisible(true)
        // alertWithType('error', 'WarePort Error', 'Check your Internet Connection' + ex.toString());
      }
    }
    await props.getACategories();
  };

  return (
    <View style={styles.mainContainer}>
      {categoryModal && (
        <AddCategoryModal ACat onClose={handleCategoryModalClose} />
      )}
      {alertVisible && <AlertView message={alertMessage} visible={setAlertVisible} ok={true}></AlertView>}
      <View style={styles.rowContainer}>
        <AutoCompleteDropDown
          notCloseOnBlur
          position="relative"
          placeholder={translation('Select Category A')}
          error={!!props.addEditProductCategoryAInputValues.error}
          onSelectItem={async (item) => {
            await props.setAddEditProductCategoryAInputValues({
              value: item ? item.id : '',
              error: '',
            });
            await props.setUserAuthData({
              ...props.userAuthData,
              category_a_id: item ? item.id : '',
            });
          }}
          dataSet={props.addEditProductCategoryADataSet}
        />
        <TouchableOpacity onPress={() => setCategoryModal(true)} style={styles.button}>
          <Icon name="add" size={30} color="white" />
        </TouchableOpacity>
      </View>
      {/* <LoadingButton
        onPress={onSavePressed}
        disabled={props.addEditProductCategoryALoading}
        loading={props.addEditProductCategoryALoading}
        style={styles.submitButton}
        mode="contained"
      >
        {translation('Save')}
      </LoadingButton>
      <Text style={styles.noteText}>
        {translation(
          'Please Look at all the categories and chose category relevant to the product you are adding.'
        )}
      </Text> */}
    </View>
  );
}

const mapStateToProps = (state) => ({
  ...state.AddEditProductReducer,
  ...state.UserAuthDataReducer,
});

export default connect(mapStateToProps, {
  setAddEditProductCategoryAInputValues,
  setAddEditProductCategoryADataSet,
  setAddEditProductCategoryALoading,
  setUserAuthData,
})(ProductCategoryPopUp);
