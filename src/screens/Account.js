import React, {Component, Fragment} from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';

class Account extends Component {
  render() {
    return (
      <Fragment>
        <View style={styles.container}>
          <TouchableHighlight style={[styles.profileImgContainer]}>
            <Image
              source={require('../assets/images/man.png')}
              style={styles.profileImg}
            />
          </TouchableHighlight>
          <View style={styles.textUser}>
            <Text style={{color: 'white'}}>Full Name</Text>
            <Text style={{color: 'white'}}>Email</Text>
          </View>
        </View>
        <View style={styles.dataUser}>
          <TouchableHighlight
            style={[styles.buttonContainer, styles.logoutButton]}
            onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.logoutText}>Change Image Profile</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.buttonContainer, styles.logoutButton]}
            onPress={() => this.props.navigation.navigate('Login')}>
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
  logoutText: {
    color: 'white',
  },
});
