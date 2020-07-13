import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

//Pictures
const rock = 'https://www.jidedelano.com/rock-paper-scissor/image/rock-icon.png';
const scissors = 'https://icon-library.com/images/rock-paper-scissors-icon/rock-paper-scissors-icon-5.jpg';
const paper = 'https://goodday451999.github.io/Rock-Paper-Scissors-Neo/images/paper.png';

export default function App() {
  const [userTool, setUserTool] = useState(rock);
  const [compTool, setCompTool] = useState(rock);

  const [userText, setUserText] = useState('Rock');
  const [compText, setCompText] = useState('Rock');

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>

      <View style={styles.content}>
        <View style={styles.playerName}>
            <Text style={styles.textYou}>You</Text>
            <Text style={styles.textComp}>Computer</Text>
        </View>

        <View style={styles.image}>
            <Image source={{uri : userTool}} style={styles.chosenImg}></Image>
            <Text style={{color: "brown", fontWeight: '800', fontSize: 22}}>VS</Text>
            <Image source={{uri : userTool}} style={styles.chosenImg}></Image>
        </View>

        <View style={styles.chosenTool}>
            <Text style={styles.textUserTool}>{userText}</Text>
            <Text style={styles.textCompTool}>{compText}</Text>
        </View>

      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.button}>
          <Text style={styles.textButton}>Rock</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button}>
          <Text style={styles.textButton}>Paper</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}>
          <Text style={styles.textButton}>Scissors</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Line = () => {
  return (
    <View style={styles.line}></View>
  )
}

const styles = StyleSheet.create({
  line: {
    width: 100 + '%',
    height: 1,
    backgroundColor: 'grey'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ebebeb'
  },
  header: {
    flex: 0.15,
    backgroundColor:'red',
  },
  content: {
    backgroundColor: 'white',
    flex: 0.45,
    width: 95 + '%',
    borderWidth: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
    flexDirection: 'column'
  },
  footer: {
    flex: 0.4,

  },
  button: {
    marginTop: 20,
    width: 200,
    height: 55,
    backgroundColor: 'brown',
    borderRadius: 15,
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: 'black',
    shadowColor: "#000",
shadowOffset: {
	width: 2,
	height: 4,
},
shadowOpacity: 0.55,
shadowRadius: 3.84,

elevation: 5,
  },
  textButton: {
    color: 'white',
    fontSize: 25,
    alignSelf: 'center',
  },
  contentLeft: {
    flex: 1,
  },
  contentRight: {
    flex: 1,

  },
  playerName: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textYou: {
    fontSize: 25,
    color: 'purple',
    fontWeight: '600',
    marginLeft: 50
  },
  textComp: {
    fontSize: 25,
    color: 'red',
    fontWeight: '600',
    marginRight: 20
  },
  image: {
    paddingVertical: 14,
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: '#d9d9d9',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    backgroundColor: '#dea9a9'
  },
  chosenTool: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  chosenImg: {
    width: 129,
    height: 129
  },
  textUserTool: {
    fontSize: 16,
    marginLeft: 50
  },
  textCompTool: {
    fontSize: 16,
    marginRight: 50
  },
});
