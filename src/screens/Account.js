import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native';
import firebase from 'firebase';

class Account extends Component {
  state = {
    email: '',
    name: ''
  };

  componentWillUnmount = () => {
    this.componentDidMount.remove()
  }

  componentDidMount = async () => {
    await this.getData();
  };

  getData = async () => {
    await AsyncStorage.getItem('email', (error, result) => {
      this.setState({email: result});
    });

    await AsyncStorage.getItem('name', (error, result) => {
      this.setState({name: result});
    });

    await AsyncStorage.getItem('image', (error, result) => {
      this.setState({image: result});
    });
  };

  logout = async () => {
    const userToken = await AsyncStorage.getItem('uid');
    firebase
      .database()
      .ref('/user/' + userToken)
      .update({status: 'offline'});
    let keys = ['uid', 'name', 'image'];
    await AsyncStorage.multiRemove(keys, error => {
      this.props.navigation.navigate('Login');
    });
    this.setState({
      email : '',
      name : ''
    })
  };

  render() {
    return (
      <Fragment>
        <View style={styles.container}>
          <TouchableHighlight style={[styles.profileImgContainer]}>
            <Image source={require('../assets/images/man.png')} style={styles.profileImg} />
          </TouchableHighlight>
          <View style={styles.textUser}>
            <Text style={{color: 'white'}}>{this.state.name}</Text>
            <Text style={{color: 'white'}}>{this.state.email}</Text>
          </View>
        </View>
        <View style={styles.dataUser}>
          <TouchableHighlight
            style={[styles.buttonContainer, styles.multerButton]}
            onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.logoutText}>Change Image Profile</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.buttonContainer, styles.logoutButton]}
            onPress={this.logout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableHighlight>
        </View>
      </Fragment>
    );
  }
}

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#232423',
  },
  profileImg: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    overflow: 'hidden',
    borderWidth: 5,
    borderColor: 'white',
  },
  textUser: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  dataUser: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 200,
    borderRadius: 30,
  },
  logoutButton: {
    backgroundColor: '#F14336',
  },
  multerButton: {
    backgroundColor: '#232423',
  },
  logoutText: {
    color: 'white',
  },
});
