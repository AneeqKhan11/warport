import SyncStorage from "sync-storage"

export const setLoginUserId = async (userId) => {
  await SyncStorage.set('USERID', userId);
}

export const setLoginUserName = async (userName) => {
  await SyncStorage.set('USERNAME', userName);
}
export const setInitialRoute = async (route) => {
  await SyncStorage.set('ROUTE', route);
}
export const setLoginNumber = async (number) => {
  await SyncStorage.set('NUMBER', number);
}

export const setFirstTime = async (state) => {
  await SyncStorage.set('FIRST', state);
}

export const setPassword = async (password) => {
  await SyncStorage.set('PASSWORD', password);
}
export const setAddressAuth = async (userAddress) => {
  await SyncStorage.set('USERADDRESS', userAddress);
}

export const setBallPosition = async (index,position) => {
  await SyncStorage.set('Position'+ index, position);
}

export const setInputName1 = async (name1) => {
  await SyncStorage.set('NAME1', name1);
}

export const setInputName2 = async (name2) => {
  await SyncStorage.set('NAME2', name2);
}

export const setValue1 = async (value) => {
  await SyncStorage.set('VAL', value);
}

export const getValue =  () => {
  try {
    const value = SyncStorage.get('VAL');
    if (value !== null) {
      return value;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export const getInitialRoute =  () => {
  try {
    const value = SyncStorage.get('ROUTE');
    if (value !== null) {
      return value;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export const getName1 =  () => {
  try {
    const value = SyncStorage.get('NAME1');
    if (value !== null) {
      return value;
    }
    return null;
  } catch (error) {
    return null;
  }
}
export const getName2 =  () => {
  try {
    const value = SyncStorage.get('NAME2');
    if (value !== null) {
      return value;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export const getPassword =  () => {
  try {
    const value = SyncStorage.get(PASSWORD);
    if (value !== null) {
      return value;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export const getFirstTime =  () => {
  try {
    const value = SyncStorage.get('FIRST');
    if (value !== null) {
      return value;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export const getAnumber =  () => {
  try {
    const value = SyncStorage.get('Anumber');
    if (value !== null) {
      return value;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export const getUserAddress =  () => {
  try {
    const value = SyncStorage.get('USERADDRESS');
    if (value !== null) {
      return value;
    }else{
      return ''
    }
    return null;
  } catch (error) {
    return null;
  }
}

export const getBallPosition =  (index) => {
  try {
    const value = SyncStorage.get('Position'+index);
    if (value !== null) {
      return value;
    }
    return null;
  } catch (error) {
    return null;
  }
}
export const getLoginUserId =  () => {
  try {
    const value = SyncStorage.get('USERID')
    if (value !== null) {
      return value;
    }
    return null;
  } catch (error) {
    return null;
  }
}
export const getLoginUserName =  () => {
  try {
    const value = SyncStorage.get('USERNAME');
    if (value !== null) {
      return value;
    }
    return null;
  } catch (error) {
    return null;
  }
}
export const getLoginNumber =  () => {
  try {
    const value = SyncStorage.get('NUMBER');
    if (value !== null) {
      return value;
    }
    return null;
  } catch (error) {
    return null;
  }
}
export const removeLoginUserId = async () => {
  await SyncStorage.remove('USERID');
}
export const isLoggedIn = () => {
  return getLoginUserId() ? true : false;
}
