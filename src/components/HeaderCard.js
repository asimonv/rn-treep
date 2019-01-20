import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ReadMore from 'react-native-read-more-text';
import Colors from '../constants/Colors';
import CircularImage from './CircularImage';

export default function HeaderCard(props) {

  _renderTruncatedFooter = (handlePress) => {
   return (
     <Text style={{color: Colors.moreInfo}} onPress={handlePress}>
       more
     </Text>
   );
  }

  _renderRevealedFooter = (handlePress) => {
   return (
     <Text style={{color: Colors.moreInfo, marginTop: 5}} onPress={handlePress}>
       less
     </Text>
   );
  }

  const styles = StyleSheet.create({
    container: {
    },
    topContainer: {
      flexDirection: props.headerType == 'vertical' ? 'column' : 'row',
      alignItems: 'center',
    },
    title: {
      fontWeight: '600',
      fontSize: props.headerType == 'vertical' ? 17 : 15,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        {props.imageURL &&
          <CircularImage
            {...props}
          />
        }
        <Text style={styles.title}>{props.title}</Text>
      </View>
      {props.description &&
        <ReadMore
          numberOfLines={3}
          renderTruncatedFooter={this._renderTruncatedFooter}
          renderRevealedFooter={this._renderRevealedFooter}
        >
          <Text>{props.description}</Text>
        </ReadMore>
      }
    </View>
  );
}
