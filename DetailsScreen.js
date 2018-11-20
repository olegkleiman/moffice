import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

class DetailsScreen extends React.Component {

  static navigationOptions = ({ navigation, navigationOptions }) => {

    const { params } = navigation.state;

    return {
      title: params ? params.otherParam : 'A Nested Details Screen',
    };

  };

  render() {

    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');

    return (
      <View style={styles.container}>
        <Text>Details Screen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.navigate('Details',{
              itemId: Math.floor(Math.random() * 100),
            })}
        />
        <Button
          title="Return to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'red',
    },
});

export default DetailsScreen;
