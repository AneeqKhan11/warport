import React from 'react';
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper';
import { theme } from '../core/theme';

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
    borderRadius:50
    
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,

  },
});

export default function LoadingButton({ mode, loading,disabled, style,textStyle, ...props }) {
  return (
    <PaperButton
      loading={loading}
      disabled={disabled}
      style={[
        styles.button,
        mode === 'outlined' && { backgroundColor: theme.colors.surface },
        style,
      ]}
     
      labelStyle={[styles.text,textStyle]}
      mode={mode}
      {...props}
    />
  )
}


