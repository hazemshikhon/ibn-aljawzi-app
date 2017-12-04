import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
  ImageBackground
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Rating } from 'react-native-elements';

import Header from '../components/Header';
import OneBookCard from '../components/OneBookCard';

export default class subCategory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
                booksOfSubCat: [
                        {cat_ID: 0, book_name: 'Book name', book_photo: require('../assets/images/temp_books/1.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                        {cat_ID: 1, book_name: 'Book name', book_photo: require('../assets/images/temp_books/2.jpeg'),  author_name: "Ahmed Hassan", author_ID: 1},
                        {cat_ID: 2, book_name: 'Book name', book_photo: require('../assets/images/temp_books/3.jpeg'),  author_name: "Ahmed Hassan", author_ID: 2},
                        {cat_ID: 3, book_name: 'Book name', book_photo: require('../assets/images/temp_books/4.jpeg'),  author_name: "Ahmed Hassan", author_ID: 3},
                    ],
        }
    }
_keyExtractor = (item, index) => item.cat_ID;
/*static navigationOptions = {
    header: <Header />
};*/

  render() {
    return (
        <View style={styles.container}>
            <FlatList
              style={{ flexDirection: 'column' }}
              numColumns={3}
              data = {this.state.booksOfSubCat}
              keyExtractor={this._keyExtractor}
              renderItem = {({ item }) => (
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                      <TouchableOpacity onPress={ () => {
                        this.props.navigation.navigate('Book', {})
                      }}>
                          <OneBookCard addButton={1} book_name={item.book_name} book_photo={item.book_photo} author_name={item.author_name} />
                      </TouchableOpacity>
                  </View>
              )} />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
