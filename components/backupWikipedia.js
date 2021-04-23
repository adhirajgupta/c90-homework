import React, { Component } from "react";
import { StatusBar } from "react-native";
import { View, Text, Alert, ActivityIndicator, Keyboard, FlatList, Linking, ScrollView,Platform,ToastAndroid } from "react-native";
import { Header, Icon, SearchBar, } from 'react-native-elements'
import { Scrollbars } from 'rc-scrollbars';
import {Sound} from 'expo-av'

export default class Wikipedia extends Component {
    constructor(props) {
        super(props)
        this.state = {
            definitions: [],
            isLoading: false,
            word: '',
            link: [],
            search: '',
            example: '',
            pressed: false,
            definiton: '',
            synonym: ''
        }
    }




        showToast = () => {
    if (Platform.OS === 'android') {
      ToastAndroid.show("Search bar cannot be empty", ToastAndroid.SHORT)      
    }
  }


    getData = () => {
        let url = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + this.state.search
        // console.log(url)
        fetch(url)
            .then(response => {
                response.json()
                    .then(data => {
                        // console.log(data)
                        let search = data[1][0]
                        let title = search.replace(/\s+/g, '_')
                        // console.log(title)
                        const value = data[3]
                        this.setState({
                            link: value,
                            word: title,
                            isLoading: true
                        })
                    })
            })
    }

    render() {
        const { search } = this.state;
        const icon =
            <Icon
                name='search'
                onPress={() => {
                    if(search.trim() !== ''){
                    this.getData()
                    this.setState({
                        pressed: true
                    })
                    Keyboard.dismiss()
                    } else {
                        this.showToast()
                    }
                }}
            />

        const { isLoading, pressed } = this.state
        return (
              <ScrollView showsVerticalScrollIndicator={true}> 
            {/* // <Scrollbars style={{width: 1530, height: 700}}> */}
            <View style={{ flex: 1 }}>
                <View style={{ justifyContent: 'space-between', marginTop: 50 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <Text style={{ fontSize: 30, fontFamily: 'sans-serif', fontWeight: '500', padding: 20, alignSelf: 'center' }}>
                            WIKIPEDIA CRAWLER
          </Text>
                    </View>
                    <View style={{ justifyContent: 'space-evenly', marginTop: 30 }}>
                        <SearchBar
                            containerStyle={{ backgroundColor: 'white' }}
                            inputStyle={{ backgroundColor: 'white', borderBottomColor: 'black' }}
                            rightIconContainerStyle={{ backgroundColor: 'white' }}
                            leftIconContainerStyle={{ backgroundColor: 'white' }}
                            //labelStyle={{backgroundColor:'white'}}
                            placeholder="Crawl..."
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
                                        <Text style={{ fontSize: 30, fontWeight: '900', padding: 10, alignSelf: 'center' }}>
                                            {this.state.word}
                                        </Text>
                                        {/* <ScrollView showsVerticalScrollIndicator={true}> */}
                                        <View>
                                            <Text style={{ fontSize: 20, fontWeight: '900', padding: 10, color: 'black' }} onPress={() => {
                                                Linking.openURL(this.state.link[0])
                                            }}>
                                                {this.state.link[0]}
                                            </Text>
                                            <Text style={{ fontSize: 20, fontWeight: '900', padding: 10, color: 'black' }} onPress={() => {
                                                Linking.openURL(this.state.link[1])
                                            }}>
                                                {this.state.link[1]}
                                            </Text>
                                            <Text style={{ fontSize: 20, fontWeight: '900', padding: 10, color: 'black' }} onPress={() => {
                                                Linking.openURL(this.state.link[2])
                                            }}>
                                                {this.state.link[2]}
                                            </Text>
                                            <Text style={{ fontSize: 20, fontWeight: '900', padding: 10, color: 'black' }} onPress={() => {
                                                Linking.openURL(this.state.link[3])
                                            }}>
                                                {this.state.link[3]}
                                            </Text>
                                            <Text style={{ fontSize: 20, fontWeight: '900', padding: 10, color: 'black' }} onPress={() => {
                                                Linking.openURL(this.state.link[4])
                                            }}>
                                                {this.state.link[4]}
                                            </Text>
                                            <Text style={{ fontSize: 20, fontWeight: '900', padding: 10, color: 'black' }} onPress={() => {
                                                Linking.openURL(this.state.link[5])
                                            }}>
                                                {this.state.link[5]}
                                            </Text>
                                            <Text style={{ fontSize: 20, fontWeight: '900', padding: 10, color: 'black' }} onPress={() => {
                                                Linking.openURL(this.state.link[6])
                                            }}>
                                                {this.state.link[6]}
                                            </Text>
                                            <Text style={{ fontSize: 20, fontWeight: '900', padding: 10, color: 'black' }} onPress={() => {
                                                Linking.openURL(this.state.link[7])
                                            }}>
                                                {this.state.link[7]}
                                            </Text>
                                            <Text style={{ fontSize: 20, fontWeight: '900', padding: 10, color: 'black' }} onPress={() => {
                                                Linking.openURL(this.state.link[8])
                                            }}>
                                                {this.state.link[8]}
                                            </Text>
                                            <Text style={{ fontSize: 20, fontWeight: '900', padding: 10, color: 'black' }} onPress={() => {
                                                Linking.openURL(this.state.link[9])
                                            }}>
                                                {this.state.link[9]}
                                            </Text>
                                        </View>
                                        {/* </ScrollView> */}
                                    </View>
                                ) : null
                            )}
                    </View>
                </View>
            </View>
            {/* // </Scrollbars> */}
            </ScrollView>
        )
    }
}