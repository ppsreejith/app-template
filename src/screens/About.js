import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image } from 'react-native';
import { getTheme } from 'react-native-material-kit';
import Interactable from 'react-native-interactable';

const theme = getTheme();

const uri = 'https://78.media.tumblr.com/839109db9a08ef9b0c0492c8533a84f4/tumblr_pbey601BM21v2useeo1_1280.jpg';

class About extends React.Component {
  render() {
    const name = this.props.test.get('selectedBid');
    return (
      <View style={styles.container}>
        <Text>About Page</Text>
        <Text>Name is { name.metermele.fare }</Text>
        <Interactable.View
          horizontalOnly
          snapPoints={[{ x: 0 }, { x: -200 }]}
          onSnap={this.onDrawerSnap}
        >
          <View style={theme.cardStyle}>
            <Image source={{ uri }} style={theme.cardImageStyle} />
            <Text style={theme.cardTitleStyle}>Welcome</Text>
            <Text style={theme.cardContentStyle}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Mauris sagittis pellentesque lacus eleifend lacinia...
            </Text>
            <Text style={theme.cardActionStyle}>My Action</Text>
          </View>
        </Interactable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default connect(({ test }) => ({ test }))(About);
