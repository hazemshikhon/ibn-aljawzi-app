import React from 'react';
import { TouchableOpacity, View, Text } from "react-native";

export default class Menu extends React.Component {
    static navigationOptions = {
        title: "About us"
    };

    render() {
        return (
            <View style={{  }}>
                <Text style={{ color: '#0E142A', backgroundColor: 'transparent', fontWeight: 'bold', fontSize: 18, margin: 12, marginTop: 20}}>About Ibn Al-Jawzi</Text>
                <Text style={{ color: '#737481', backgroundColor: '#fff', fontSize: 16, padding: 12, marginTop: 10}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.</Text>
            </View>
        );
    }
}