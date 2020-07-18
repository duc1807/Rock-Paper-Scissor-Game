import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, View, ScrollView, TouchableOpacity, Image, Modal, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';

import styles from './src/styles/common'
import colours from './src/styles/colors'
import ChoiceCard from './src/components/ChoiceCard'
import CustomModal from './src/modules/Modal'

//Pictures
const rock = 'https://www.jidedelano.com/rock-paper-scissor/image/rock-icon.png';
const paper = 'https://goodday451999.github.io/Rock-Paper-Scissors-Neo/images/paper.png';
const scissors = 'https://icon-library.com/images/rock-paper-scissors-icon/rock-paper-scissors-icon-5.jpg';

export default function App () {
  const onPress = userChoice => {
    const [result, compChoice] = getResult(userChoice);

    const newUserChoice = CHOICES.find(choice => choice.name === userChoice);
    const newCompChoice = CHOICES.find(choice => choice.name === compChoice);

    setNotice(result);
    setUserChoice(newUserChoice);
    setCompChoice(newCompChoice);
  }




  var [newHistory, setNewHistory] = useState([])

  var HISTORY;

  const [num, setNum] = useState(0)

  const EndGame = (userScr, compScr) => {
    //let latestResult = {user: userScr, comp : compScr}    
    var rate
    HISTORY = newHistory.reverse();
    HISTORY.push({ id: num, User: userScr, Comp: compScr })
    if (userScr > compScr) {
      rate = Math.floor((userWinMatchs * 100) / HISTORY.length)
      setWinRate(rate)
    }
    if (userScr < compScr) {
      rate = Math.floor((compWinMatchs * 100) / HISTORY.length)
      setLoseRate(rate)
    }
    setNewHistory(newHistory.reverse()); //[...historyScore,hi]

    setNum(num + 1)
  }

  const CHOICES = [
    {
      name: 'Rock',
      uri: 'https://www.jidedelano.com/rock-paper-scissor/image/rock-icon.png'
    },
    {
      name: 'Paper',
      uri: 'https://goodday451999.github.io/Rock-Paper-Scissors-Neo/images/paper.png'
    },
    {
      name: 'Scissors',
      uri: 'https://icon-library.com/images/rock-paper-scissors-icon/rock-paper-scissors-icon-5.jpg'
    }
  ];

  const [winRate, setWinRate] = useState(0)
  const [loseRate, setLoseRate] = useState(0)

  const [userWinMatchs, setUserWinMatchs] = useState(0)
  const [compWinMatchs, setCompWinMatchs] = useState(0)

  const [color, setColor] = React.useState('black')

  const [userChoice, setUserChoice] = useState({});
  const [userScore, setUserScore] = useState(0);

  const [compChoice, setCompChoice] = useState({});
  const [compScore, setCompScore] = useState(0);

  const [notice, setNotice] = useState("Choose somethings");
  const [modalState, setModalState] = useState(false)

  // const toolArr = [rock,scissors,paper];
  // const textArr = ['Rock', 'Scissors', 'Paper'];
  const newGame = () => {
    setCompScore(0)
    setUserScore(0)
  }

  const reset = () => {
    setCompScore(0)
    setUserScore(0)

    setUserWinMatchs(0)
    setCompWinMatchs(0)

    setUserChoice({})
    setCompChoice({})

    setNewHistory([])

    setNotice()
  }

  const Button = props => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.onPress(props.name)}>
        <Text style={styles.textButton}>{props.name}</Text>
      </TouchableOpacity>)
  }

  const getResult = (userChoice) => {
    const computerChoice = CHOICES[Math.floor(Math.random() * 3)].name;
    let res;

    if (userChoice == "Rock") {
      res = computerChoice == "Scissors" ? "Victory!" : "Defeated!";
    }
    if (userChoice === 'Paper') {
      res = computerChoice == 'Rock' ? 'Victory!' : 'Defeated!';
    }
    if (userChoice === 'Scissors') {
      res = computerChoice == 'Paper' ? 'Victory!' : 'Defeated!';
    }

    if (userChoice == computerChoice) {
      setColor('grey')
      res = 'Draw!';
    }

    if (res == 'Victory!' && userScore == 9) {
      Alert.alert("You win!")
      setUserWinMatchs(userWinMatchs + 1)
      EndGame(userScore + 1, compScore)
      newGame()
      res = "Choose somethings"
    }
    else if (res == 'Defeated!' && compScore == 9) {
      Alert.alert("You lose!")
      setCompWinMatchs(compWinMatchs + 1)
      EndGame(userScore, compScore + 1)
      newGame()
      res = "Choose somethings"
    }
    else {
      if (res == 'Victory!') {
        setColor('green')
        setUserScore(userScore + 1)
      }

      if (res == 'Defeated!') {
        setCompScore(compScore + 1)
        setColor('red')
      }
    }
    return [res, computerChoice];

  }


  return (
    <View style={styles.container}>

      <CustomModal />

      <View style={styles.header}>
        <Text style={[styles.noticeText, { color: color }]}>{notice}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.playerName}>
          <Text style={styles.textYou}>You</Text>
          <Text style={styles.textComp}>Computer</Text>
        </View>

        <View style={styles.image}>

          <ChoiceCard choicePosition="imageLeft" choice={userChoice}></ChoiceCard>
          <View style={styles.imageCenter}>
            <Text style={styles.score}>{userScore} : {compScore}</Text>
            <Text style={{ color: "brown", fontWeight: '800', fontSize: 22 }}>VS</Text>
          </View>
          <ChoiceCard choicePosition="imageRight" choice={compChoice}></ChoiceCard>

        </View>

        <View style={styles.chosenTool}>
          <Text style={styles.textUserTool}>{userChoice.name}</Text>
          <Text style={styles.textCompTool}>{compChoice.name}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        {CHOICES.map(choice => {
          return (<Button
            key={choice.name}
            name={choice.name}
            onPress={onPress}>
          </Button>)
        })}
      </View>

      <TouchableOpacity
        style={styles.resetButton}
        onPress={() => reset()}>
        <Text style={styles.textReset}>Reset</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setModalState(true)}
        style={{ position: "absolute", alignSelf: 'flex-end', bottom: 15, right: 15 }}>
        <FontAwesome name="history" size={34} color="black" />
      </TouchableOpacity>
    </View>
  );
}


