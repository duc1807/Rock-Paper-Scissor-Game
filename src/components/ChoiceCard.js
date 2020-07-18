import React from 'react'
import { StyleSheet, View, Image } from 'react-native'

const styles = StyleSheet.create({
  imageLeft: {
    flex: 0.4,
    alignItems: 'center'
  },
  imageRight: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageCenter: {
    flex: 0.2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 30
  },
  chosenImg: {
    width: 129,
    height: 129
  }
})

const ChoiceCard = ({ choicePosition: position, choice: { uri, name } }) => {
  return (
    <View style={styles[position]}>
      <Image source={{ uri: uri }} style={styles.chosenImg}></Image>
    </View>
  )
}

export default ChoiceCard