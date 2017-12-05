import React from 'react';
import {
    TouchableOpacity,
    Platform,
    Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class MenuBackButton extends React.Component {
  render() {
    return (
        <TouchableOpacity
            onPress={ () => this.props.navigation.goBack() }
            style={{ paddingTop: 10, paddingLeft:5, flexDirection: 'row', alignItems: 'center' }}>

            <Ionicons
              name={ (Platform.OS == 'ios') ? ("ios-arrow-back"):("md-arrow-back") }
              size={28}
              color='#106234'
              style={{ backgroundColor: 'transparent', marginRight: 7}}/>

            <Text style={{ backgroundColor:'transparent', color: '#106234', fontWeight: 'bold', fontSize: 16 }}>Back to menu</Text>
        </TouchableOpacity>
    );
  }
}