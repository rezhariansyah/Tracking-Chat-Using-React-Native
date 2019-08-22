import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
} from 'react-native';
import firebase from 'firebase';
import * as GeoLocation from '@react-native-community/geolocation'
import firebaseSvc from '../configs/firebase';

export default class Register extends Component {
  constructor(props) {
    super(props);
    state = {
      email: '',
      fullname: '',
      password: '',
      region: {
        latitude: 0,
        longtitude: 0,
      },
    };
  }

  register = async () => {
    if (this.state.email.length < 4) {
      Alert.alert('Email Invalid');
    } else if (this.state.password.length < 6) {
      Alert.alert('please input password more than 6 characters');
    } else if (this.state.fullname.length < 3) {
      Alert.alert('please input password more than 3');
    } else {
      await GeoLocation.getCurrentPosition(
        position => {
          let region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0,
            longitudeDelta: 0,
          };
          this.setState({
            region: {...this.state.region, ...region},
          });
        },
        err => {
          console.warn(err);
        },
      );

      await firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(({user}) => {
          console.log(user);
          var userf = firebase.auth().currentUser;
          userf.updateProfile({
            displayName: this.state.fullname,
            photoURL: this.state.image,
          });
          firebase
            .database()
            .ref('user/' + user.uid)
            .set({
              name: this.state.fullname,
              image:
                'https://res.cloudinary.com/dbhwvh1mf/image/upload/v1566321024/img/blank-profile-picture-973460_960_720_wolhdp.png',
              id: user.uid,
              longitude: this.state.region.longitude,
              latitude: this.state.region.latitude,
            });
        })
        .catch(err => {
          console.log(err);
        });
      this.props.navigation.navigate('Login');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={require('../assets/images/gmail.png')}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={text => this.setState({email: text})}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={require('../assets/images/sex.png')}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Full Name"
            keyboardType="default"
            underlineColorAndroid="transparent"
            onChangeText={text => this.setState({fullname: text})}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={require('../assets/images/key.png')}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={text => this.setState({password: text})}
          />
        </View>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.registerButton]}
          onPress={this.register}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={() => this.onClickListener('restore_password')}>
          <Text>already have an account? </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={() => this.props.navigation.navigate('Login')}>
          <Text>Login</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  registerButton: {
    backgroundColor: '#F14336',
  },
  registerText: {
    color: 'white',
  },
});
