/* This component displays a list of items */
import React from 'react';
import {
  View, StyleSheet, Dimensions, TouchableOpacity, Image, FlatList,
} from 'react-native';
import {
  Text, Card, CardItem, Body,
} from 'native-base';
import { API } from '../constants/rest-gateway';
import { noItemImage } from '../constants/static-base64-images';

const numColumns = 2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  item: {
    flex: 1,
    margin: 1,
    width: Dimensions.get('window').width / numColumns - 10, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
  imageStyle: {
    height: Dimensions.get('window').width / numColumns - 7,
    width: Dimensions.get('window').width / numColumns - 7,
  }
});

class CardItemListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem(item) {
    let imageUri = API.getImageOfItem(item);
    // eslint-disable-next-line eqeqeq
    if (item.image == 0) imageUri = noItemImage;
    return (
      <View style={styles.item}>
        <Card>
          <TouchableOpacity
            onPress={() => this.props.pressCardAction(item)}
          >
            <CardItem cardBody>
              <Image source={{ uri: imageUri }} style={styles.imageStyle} />
            </CardItem>

            <CardItem>
              <Body>
                <Text>{`฿ ${item.price}`}</Text>
                <Text note>
                  {`${item.name}`}
                </Text>
              </Body>
            </CardItem>
          </TouchableOpacity>
        </Card>
      </View>
    );
  }

  render() {
    return (
      <FlatList
        style={styles.container}
        data={this.props.items}
        renderItem={({ item }) => this.renderItem(item)}
        numColumns={numColumns}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}

export default CardItemListComponent;
