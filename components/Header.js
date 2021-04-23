import React, { Component } from 'react';
import { Header, Icon } from 'react-native-elements';

export default class MyHeader extends Component {
    render() {
        return (
            <Header
                centerComponent={{ text: this.props.title, style: { color: '#ffffff', fontSize: 30, fontWeight: "bold", } }}
                backgroundColor="#eaf8fe"
            />

        )
    }
}
