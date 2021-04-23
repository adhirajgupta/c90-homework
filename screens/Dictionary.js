import React, { Component } from "react";
import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  Keyboard,
  ScrollView,
  Linking,
  ToastAndroid,
  Platform
} from "react-native";
import { Header, Icon, SearchBar, } from 'react-native-elements';

export default class Dictionary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      definitions: [],
      isLoading: false,
      word: '',
      lexigocial: '',
      search: '',
      example: '',
      pressed: false,
      definiton: '',
      synonym: '',
      sound: ''
    }
  }



    showToast = () => {
    if (Platform.OS === 'android') {
      ToastAndroid.show("Search bar cannot be empty", ToastAndroid.SHORT)      
    }
  }


  getData = () => {
    let input = this.state.search.toLowerCase().trim()
    let url = 'https://whitehat-dictionary.glitch.me/?word=' + input
    fetch(url)
      .then((response) => {
        const a = response.json()
          .then((data) => {
            const value = JSON.parse(data)
            const lex = value.results[0].lexicalEntries[0].lexicalCategory.text
            const word = value.word
            const example = value.results[0].lexicalEntries[0].entries[0].senses[0].examples[0].text
            //     console.log(value.results[0].lexicalEntries[0].entries[0].senses[0].synonyms[0].text)
            //    const synonym = value.results[0].lexicalEntries[0].entries[0].senses[0].synonyms[0].text
            const sound = value.results[0].lexicalEntries[0].entries[0].pronunciations[0].audioFile
            this.setState({
              definiton: definiton,
              isLoading: true,
              lexigocial: lex,
              word: word,
              example: example,
              sound: sound
            })
          }).catch(error => Alert.alert(error))
      })
  }

  render() {
    const { search } = this.state;
    const icon =
      <Icon
        name='search'
        onPress={() => {
          if (search.trim() !== '') {
            this.getData()
            this.setState({
              pressed: true
            })
          } else {
            this.showToast()
          }
          Keyboard.dismiss()
        }}
      />

    const { isLoading, pressed } = this.state
    return (
      <ScrollView showsVerticalScrollIndicator={true}>
        <View style={{ flex: 1 }}>
          <View style={{ justifyContent: 'space-between', marginTop: 50 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
              <Text style={{ fontSize: 30, fontFamily: 'sans-serif', fontWeight: '500', padding: 20, alignSelf: 'center' }}>
                SEARCH
          </Text>
            </View>
            <View style={{ justifyContent: 'space-evenly', marginTop: 30 }}>
              <SearchBar
                containerStyle={{ backgroundColor: 'white' }}
                inputStyle={{ backgroundColor: 'white', borderBottomColor: 'black' }}
                rightIconContainerStyle={{ backgroundColor: 'white' }}
                leftIconContainerStyle={{ backgroundColor: 'white' }}
                //labelStyle={{backgroundColor:'white'}}
                placeholder="Search..."
                onChangeText={(text) => {
                  this.setState({
                    search: text
                  })
                }}
                value={search}
                searchIcon={icon}
                onSubmitEditing={() => {
                  this.setState({
                    pressed: true
                  })
                  this.getData()
                }
                }
              />
            </View>
            <View style={{ flex: 1, padding: 24 }}>
              {isLoading === false && pressed === true ?
                <ActivityIndicator style={{ marginTop: 20 }} size={50} />
                : (
                  isLoading === true ? (
                    <View>
                      <Text style={{ fontSize: 30, fontWeight: 'bold', padding: 10, alignSelf: 'center' }}>
                        {this.state.word}
                      </Text>
                      <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 10 }}>Definition:
                <Text>{this.state.definiton}</Text>
                      </Text>
                      <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 10 }}>Sentence:
                  <Text>  {this.state.example}</Text>
                      </Text>
                      {/* <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 10 }}>Synonym:
                  <Text>  {this.state.synonym}</Text>
                    </Text> */}
                      <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 10 }}>lexicalCategory:
                <Text>{this.state.lexigocial}</Text>
                      </Text>
                      <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 10, }} onPress={() => {
                        Linking.openURL(this.state.sound)
                      }}>Sound:
                <Text>{this.state.sound}</Text>
                      </Text>
                    </View>
                  ) : null
                )}
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}