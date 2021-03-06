import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Rating } from 'react-native-elements';

//import Header from '../components/Header';
import LoadingIndicator from '../components/LoadingIndicator';
import OneBookCard from '../components/OneBookCard';
import Server from '../constants/server';

// API: send this.props.navigation.state.params.main_cat_id to the server, get this.state.subCats and this.state.books of that main category

export default class Category extends React.Component {

    componentDidMount() {
        this.doTheFetching();
    }

    doTheFetching() {
        // Fetch all sub categories first
        fetch(Server.dest + '/api/sub_categories?parent_cat_id='+this.props.navigation.state.params.main_cat_id, {headers: {'Cache-Control': 'no-cache'}}).
            then((res) => res.json()).then((resJson) => {
                this.setState({subCats: resJson});
            })
            .then(() => {
              this.setState({doneFetches: (this.state.doneFetches+1)})
            })

        // Fetch all books
        fetch(Server.dest + '/api/books_of_cat?cat_id='+this.props.navigation.state.params.main_cat_id, {headers: {'Cache-Control': 'no-cache'}}).
            then((res) => res.json()).then((resJson) => {
                this.setState({books: resJson});
            })
            .then(() => {
              this.setState({doneFetches: (this.state.doneFetches+1)})
            })
    }

    constructor(props) {
        super(props);
        this.state = {
            doneFetches: 0,
            gridView:true,
            HorV:true,
            MYTEXT:'Show List',
            ICON:'ios-list',
            num:35,
            subCats: [
                /*{id: 0, name: 'Sub category 1'},
                {id: 1, name: 'Sub category 2'},
                {id: 2, name: 'Sub category 3'},
                {id: 3, name: 'Sub category 4'},
                {id: 4, name: 'Sub category 5'},*/
            ],
            books: [
                /*{id: 0, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                {id: 1, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                {id: 2, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                {id: 3, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},*/
            ],
        }
    }
_keyExtractor = (item, index) => item.id;
/*static navigationOptions = {
    header: <Header />
};*/

changeView = () =>
{
  this.setState({ gridView: !this.state.gridView }, () =>
  {
      if(this.state.gridView)
      {
        this.setState({ MYTEXT: 'Show List' });
        this.setState({ ICON: "ios-list" });
        this.setState({ num:35 });


      }
      else
      {
        this.setState({ MYTEXT: 'Show Grid' });
        this.setState({ ICON: "ios-grid" });
        this.setState({ num:30 });


      }
  });
}
  render() {
      if(this.state.doneFetches < 2)
          return (<LoadingIndicator size="large" color="#B6E3C6" />);

    return (
      <ScrollView style={styles.container}>
      <TouchableOpacity style={{backgroundColor:'#106234',borderRadius:100,width:40,height:35,marginLeft:"80%",marginTop:10 }}  onPress = { this.changeView }>
          <View style = {{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Ionicons name={this.state.ICON} size={this.state.num}  color='white' style={{flex:1,justifyContent:'center',alignItems:'center',textAlign:'center',marginTop:this.state.gridView ?  "-3%" :"5%"}}/>
          </View>
        </TouchableOpacity>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ maxHeight: 80, }}
        data = {this.state.subCats}
        keyExtractor={this._keyExtractor}
        renderItem = {({ item }) => (
            <TouchableOpacity onPress={ () => {
              this.props.navigation.navigate('subCategory', {sub_cat_id: item.id, sub_cat_name: item.name})
            }}>
                <Text style={{ color: 'white', backgroundColor: '#106234', paddingVertical: 10, paddingHorizontal: 40, margin: 20, borderRadius: 18, fontSize: 12, fontWeight: 'bold' }}>{item.name.toUpperCase()}</Text>
            </TouchableOpacity>
        )} />

      <Text style={{ marginHorizontal: 20, fontWeight: 'bold', color: '#555555', fontSize: 20, borderBottomWidth: 1, borderColor: 'grey', paddingBottom: 10 }}>
            {this.props.navigation.state.params.cat_name.toUpperCase()}
        </Text>

        <FlatList
          style={{ flex: 1, }}
          key = {( this.state.gridView ) ? 1 : 0 }
          numColumns = { this.state.gridView ? 2 : 1 }
          data = {this.state.books}
          keyExtractor={this._keyExtractor}
          renderItem = {({ item }) => (
              <View style={{  }}>
                  <TouchableOpacity onPress={ () => {
                    this.props.navigation.navigate('Book', {
                        book_ID: item.id,
                        book_photo: item.book_photo,
                        book_name: item.book_name,
                        author_name: item.author_name,
                        cat_name: this.props.navigation.state.params.cat_name.toUpperCase()
                    })
                  }}>
                      <OneBookCard navigation={this.props.navigation}   id={item.id} horizontal={this.state.gridView ? 0 : 2} addButton={1} book_name={item.book_name} book_photo={item.book_photo} author_name={item.author_name} />
                  </TouchableOpacity>
              </View>
          )} />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  Btn:
{
 padding: 15,
 backgroundColor: '#5cb85c'
},

btnText:
{
 color: 'white',
 textAlign: 'center',
 alignSelf: 'stretch'
}
});
