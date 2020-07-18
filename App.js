import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, View, ScrollView, TouchableOpacity, Image, Modal, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons'; 
import { useScreens } from 'react-native-screens';

//Pictures
const rock     = 'https://www.jidedelano.com/rock-paper-scissor/image/rock-icon.png';
const paper    = 'https://goodday451999.github.io/Rock-Paper-Scissors-Neo/images/paper.png';
const scissors = 'https://icon-library.com/images/rock-paper-scissors-icon/rock-paper-scissors-icon-5.jpg';

export default function App() {
  const onPress = userChoice => {
    const [result, compChoice] = getResult(userChoice);

    const newUserChoice = CHOICES.find(choice => choice.name === userChoice);
    const newCompChoice = CHOICES.find(choice => choice.name === compChoice);

    setNotice(result);
    setUserChoice(newUserChoice);
    setCompChoice(newCompChoice);
  }

  const ChoiceCard = ({choicePosition: position, choice : {uri, name}}) => {
    return (
      <View style={styles[position]}>
        <Image source={{uri : uri}} style={styles.chosenImg}></Image>
      </View>
    )
  }

  const renderItem = ({item}) => (
    <View style={styles.historyItem}>
      <View style={styles.historyHeader}>
        <Text>You</Text>
        <Text>Comp</Text>
      </View>
      <View style={styles.historyScore}>
        <Text style={styles.userHistory}>{item.User}</Text>
        <Text style={styles.semicolon}>:</Text>
        <Text style={styles.compHistory}>{item.Comp}</Text>
      </View>
    </View>
  );

  var [newHistory, setNewHistory] = useState([])

  var HISTORY;

  const [num, setNum] = useState(0)

  const EndGame = (userScr, compScr) => {
    //let latestResult = {user: userScr, comp : compScr}    
    var rate
    HISTORY = newHistory.reverse();    
    HISTORY.push({id : num, User: userScr, Comp: compScr})
    if (userScr > compScr)
    {
      rate = Math.floor((userWinMatchs * 100) / HISTORY.length)
      setWinRate(rate)
    }
    if (userScr < compScr)
    {
      rate = Math.floor((compWinMatchs * 100) / HISTORY.length)
      setLoseRate(rate)
    }
    setNewHistory(newHistory.reverse()); //[...historyScore,hi]

    setNum(num + 1)
  }

  const CHOICES = [
    {
      name: 'Rock',
      uri:  'https://www.jidedelano.com/rock-paper-scissor/image/rock-icon.png'
    },
    {
      name: 'Paper',
      uri:  'https://goodday451999.github.io/Rock-Paper-Scissors-Neo/images/paper.png'
    },
    {
      name: 'Scissors',
      uri:  'https://icon-library.com/images/rock-paper-scissors-icon/rock-paper-scissors-icon-5.jpg'
    }
  ];

  const [winRate, setWinRate] = useState(0)
  const [loseRate, setLoseRate] = useState(0)

  const [userWinMatchs, setUserWinMatchs] = useState(0)
  const [compWinMatchs, setCompWinMatchs] = useState(0)

  const [color, setColor] = React.useState('black')

  const [userChoice, setUserChoice] = useState({});
  const [userScore, setUserScore]  = useState(0);

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

    if (userChoice == "Rock")
    {
      res = computerChoice == "Scissors" ? "Victory!" :  "Defeated!";
    }
    if (userChoice === 'Paper') {
      res = computerChoice == 'Rock' ? 'Victory!' : 'Defeated!';
    }
    if (userChoice === 'Scissors') {
      res = computerChoice == 'Paper' ? 'Victory!' : 'Defeated!';
    }
  
    if (userChoice == computerChoice)
    {
      setColor('grey')
      res = 'Draw!';
    } 

    if (res == 'Victory!' && userScore == 9) 
    {
      Alert.alert("You win!")
      setUserWinMatchs(userWinMatchs + 1)
      EndGame(userScore + 1, compScore)
      newGame()
      res ="Choose somethings"
    }
    else if (res == 'Defeated!' && compScore == 9) 
    { 
      Alert.alert("You lose!")
      setCompWinMatchs(compWinMatchs + 1)
      EndGame(userScore, compScore + 1)
      newGame()
      res ="Choose somethings"
    }
    else {
        if(res == 'Victory!') 
        {
          setColor('green')
          setUserScore(userScore + 1)
        }
        
        if(res == 'Defeated!') 
        {
          setCompScore(compScore + 1)
          setColor('red')
        }
    }
    return [res, computerChoice];
    
    }


  return (
    <View style={styles.container}>

      <Modal 
        transparent={true}
        visible={modalState}
        animated>
        <View style={{backgroundColor: '#000000aa', flex:1}}>
          <View style={styles.modalScr}>
            <View style={styles.headerModal}>

            <TouchableOpacity>
              <FontAwesome 
                onPress={() => setModalState(false)}
                name="close" 
                size={38} 
                color="black"
                style={{position:"absolute", top: -26, right: -125}} />
            </TouchableOpacity>
              <Text style={styles.historyText}>History</Text>
              <Text style={styles.generalResult}>Total: {newHistory.length} - Win: {userWinMatchs} ({winRate}) - Lose: {compWinMatchs} ({loseRate})</Text>
            </View>

            <View style={styles.containerModal}>
              <View style={styles.scrView}>
              {/* <View style={styles.contentModal}> */}

                <SafeAreaView style={styles.contentModal}>
                  <FlatList                    
                    data={newHistory}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}>                   
                  </FlatList>
                </SafeAreaView>

              </View>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <Text style={[styles.noticeText, {color: color} ]}>{notice}</Text>
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
            <Text style={{color: "brown", fontWeight: '800', fontSize: 22}}>VS</Text>
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
        style={{position: "absolute" ,alignSelf: 'flex-end', bottom: 15, right: 15}}>
        <FontAwesome name="history" size={34} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  //Modal Screen
  scrView: {
    flex: 1,
    width: 275,
  },
  modalScr: {
    borderRadius: 15,
    borderWidth: 5,
    alignSelf: 'center',
    marginTop: 150,
    width: 75 + '%',
    height: 50 + '%',
    backgroundColor:'lightblue',
  },
  headerModal: {
    flex: 0.3,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerModal: {
    flex: 0.7,
    backgroundColor: 'lightgreen',
    alignItems: 'center'
  },
  contentModal: {
    marginTop: 10,
    width: 100 + '%',
  },
  historyItem: {
    height: 70,
    width: 150,
    backgroundColor: 'red',
    marginVertical: 10,
    alignSelf: "center"
  },
  historyHeader: {
    flex: 0.35,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  historyScore: {
    flex: 0.65,
    backgroundColor: 'grey',
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center"
  },
  semicolon: {
    fontWeight: "900",
    fontSize: 20
  },
  userHistory: {
    fontSize: 25,
    marginHorizontal: 20,
    fontWeight: "700"
  },
  compHistory: {
    fontSize: 25,
    marginHorizontal: 20,
    fontWeight: "700"
  },
  historyText: {
    fontSize: 30,
    fontWeight: "700",
    color: 'brown'
  },


  ///////////////////////
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
    flexDirection: 'row',
  },
  button: {
    marginHorizontal: 8,
    marginTop: 40,
    width: 100,
    height: 100,
    backgroundColor: 'brown',
    borderRadius: 50,
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
    fontSize: 20,
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
    marginLeft: 40
  },
  textCompTool: {
    fontSize: 16,
    marginRight: 50
  },
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
  score: {
    marginBottom: 8,
    fontSize: 18,
    color: "#0f731c",
    fontWeight: '700',
    backgroundColor: 'white',
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderWidth: 2,
  },
  resetButton: {
    width: 110,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
    elevation: 5,
    bottom: 50,
    position: 'absolute'
  },
  textReset: {
    alignSelf: 'center'
  },
  noticeText: {
    paddingTop: 40,
    color: '#ff6905',
    fontSize: 28,
    fontWeight: '800'
  }

});
