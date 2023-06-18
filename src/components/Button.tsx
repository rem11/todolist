import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {commonStyles} from '../const/styles';
import {useTheme} from '@react-navigation/native';

export type Props = {
  style?: StyleProp<ViewStyle> | undefined;
  onPress: () => void;
  title: string;
};

function Button({style, onPress, title}: Props): JSX.Element {
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: colors.primary,
        },
        style,
      ]}
      onPress={onPress}>
      <Text style={[commonStyles.text, styles.text]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 12,
  },
  text: {
    color: '#fff',
  },
});

export default Button;
