import 'react-native';
import React from 'react';
import Button from '../src/components/Button';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('button renders correctly', () => {
  expect(
    renderer.create(<Button title="Test button" onPress={() => {}} />),
  ).toMatchSnapshot();
});

test('button renders correctly with style attr', () => {
  expect(
    renderer.create(
      <Button title="Test button" onPress={() => {}} style={{marginTop: 16}} />,
    ),
  ).toMatchSnapshot();
});
