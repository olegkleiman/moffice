// @flow
import React from 'react';
import { Platform, Animated, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { Container,
        Header,
        Content,
        Card,
        CardItem,
        Body,
        Button,
        Text,
        Fab,
        Icon }
from 'native-base';
import moment from 'moment';

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 120;// Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class HomeScreen extends React.Component {

  state = {
    count: 0,
    scrollY: new Animated.Value(0),
    fadeAnim: new Animated.Value(0),
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Home',
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerRight: (
          <Button
            onPress={navigation.getParam('increaseCount')}
            title="Info"
            color="#fff"
          />
      ),
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    };
  };

  constructor(props) {
    super(props);

    this.mockData = [
      { id:1,
        name: 'Um',
        image: require('./assets/images/urban.png')
      },
      { id:2,
        name: 'Dois!',
        image: require('./assets/images/urban.png')
      },
      { id:3,
        name:'Três',
        image: require('./assets/images/urban.png')
      },
      { id:4,
        name:'Quatro',
        image: require('./assets/images/urban.png')
      },
      { id:5,
        name: 'Cinco',
        image: require('./assets/images/urban.png')
      },
      { id:6,
        name: 'Seis',
        image: require('./assets/images/urban.png')
      },
      { id:7,
        name: 'Sete',
        image: require('./assets/images/urban.png')
      },
      { id:8,
        name: 'Oito',
        image: require('./assets/images/urban.png')
      },
      { id:9,
        name: 'Nove',
        image: require('./assets/images/urban.png')
      },
      { id:10,
        name: 'Dez',
        image: require('./assets/images/urban.png')
      }];
  }

  componentDidMount() {
    this.props.navigation.setParams({ increaseCount: this._increaseCount });
  }

  _increaseCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  _handleCardPressed = (_item) => {
    this.props.navigation.navigate('Coterie', {item: _item})
  }

  _onPress() {
      // this.props.navigation.dispatch(StackActions.reset({
      //   index: 0,
      //   actions: [
      //     NavigationActions.navigate({ routeName: 'Details' })
      //   ],
      // }));
      this.props.navigation.navigate('Details', {
        itemId: 86,
        otherParam: 'anything you want here'
      });
  }

  render() {

    const headerHeight = this.state.scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp',
      });

    const headerTranslate = this.state.scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, -HEADER_SCROLL_DISTANCE],
        extrapolate: 'clamp',
      });

    const titleScale = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0.8],
      extrapolate: 'clamp',
    });

    const titleTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, -8],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.base}>

        <View style={styles.appBar}>
          <Text style={styles.navigationLeft}></Text>
          <Text style={styles.navigationTitle}>Welcome</Text>
          <Text>{this.state.count}</Text>
        </View>

        <Animated.View style={[styles.bar,
                               { height: headerHeight }]}>
            <Text style={styles.title}>תוכן העמוד</Text>
        </Animated.View>

        <Animated.ScrollView style={[styles._scrollViewContent]}
                             scrollEventThrottle={16}
                             onScroll={Animated.event(
                               [
                                 {
                                   nativeEvent: {
                                                   contentOffset:
                                                     {
                                                       y: this.state.scrollY
                                                     }
                                                 }
                                 }
                               ],
                               //{ useNativeDriver: true },
                             )}>
           <Content>
          {
              this.mockData.map( (item, index) => {

                  return <Card key={index}>
                     <TouchableOpacity style = {styles.row}
                          onPress={() => this._handleCardPressed(item)}>
                        <Image source={item.image}
                              style={{height: 48, width: 48}}/>

                        <Text style={{fontFamily: 'HelveticaNeue-Thin'}}>Card {item.id}</Text>
                     </TouchableOpacity>
                 </Card>
              })
          }
           </Content>
        </Animated.ScrollView>

      </View>
    );
  }

};

const styles = StyleSheet.create({
    base: {
      flex:1,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    appBar: {
      flexDirection: 'row',
      marginTop: '8%',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: 'blue',
      height: 40,
      marginTop: Platform.OS === 'ios' ? 26 : 0,
    },
    navigationLeft: {
      flex: 1
    },
    navigationTitle: {
      flex: 8,
      fontSize: 20,
      fontFamily: 'HelveticaNeue-Thin',
      textAlign: 'center',
      color: 'white'
    },
    row: {
      flexDirection: 'row',
      height: 40,
      margin: 16,
      //backgroundColor: '#D3D3D3',
      // alignItems: 'center',
      justifyContent: 'space-between',
    },
    bar: {
     //backgroundColor: '#03A9F4',
     backgroundColor: '#2c8ef4',
     marginTop: 0,
     alignItems: 'center',
     justifyContent: 'center',
     top: 0,
     left: 0,
     right: 0,
    },
});

export default HomeScreen;
