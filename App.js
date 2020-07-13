import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

//Pictures
const rock     = 'https://www.jidedelano.com/rock-paper-scissor/image/rock-icon.png';
const paper    = 'https://goodday451999.github.io/Rock-Paper-Scissors-Neo/images/paper.png';
const scissors = 'https://icon-library.com/images/rock-paper-scissors-icon/rock-paper-scissors-icon-5.jpg';

export default function App() {
  const [userTool,  setUserTool]   = useState();
  const [userText,  setUserText]   = useState('');
  const [userScore, setUserScore]  = useState(0);

  const [compTool,  setCompTool]   = useState(); 
  const [compText,  setCompText]   = useState('');
  const [compScore, setCompScore] = useState(0);

  const [notice, setNotice] = useState();

  const toolArr = [rock,scissors,paper];
  const textArr = ['Rock', 'Scissors', 'Paper'];

  const reset = () => {
    setCompScore(0)
    setUserScore(0)
    setUserTool()
    setUserText()
    
    setCompTool()
    setCompText()
    setNotice()
  }  

  var getCompChoice = () => {
    var randomNumber = Math.floor(Math.random() * 3);
    setCompText(textArr[randomNumber])
    setCompTool(toolArr[randomNumber])
    play()
  }

  const play = () => {
    if (userText == "Rock" && compText == "Rock" 
      || userText == "Paper" && compText == "Paper" 
      || userText == "Scissors" && compText == "Scissors")
    {
      setUserScore(userScore)
      setCompScore(compScore)
      setNotice("Draw")
    }
    else if (userText == "Rock" && compText == "Scissors" 
            || userText == "Paper" && compText == "Rock" 
            || userText == "Scissors" && compText == "Paper")
    {
      setUserScore(userScore + 1)
      setCompScore(compScore)
      setNotice("User Win")
    }

    else if (userText == "Rock" && compText == "Paper" 
            || userText == "Paper" && compText == "Scissors" 
            || userText == "Scissors" && compText == "Rock")
    {
    setUserScore(userScore)
    setCompScore(compScore + 1)
    setNotice("Computer Win")
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.noticeText}>{notice}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.playerName}>
            <Text style={styles.textYou}>You</Text>
            <Text style={styles.textComp}>Computer</Text>
        </View>

        <View style={styles.image}>
          <View style={styles.imageLeft}>
            <Image source={{uri : userTool}} style={styles.chosenImg}></Image>
          </View>

          <View style={styles.imageCenter}>
            <Text style={styles.score}>{userScore} : {compScore}</Text>
            <Text style={{color: "brown", fontWeight: '800', fontSize: 22}}>VS</Text>
          </View>

          <View style={styles.imageRight}>
            <Image source={{uri : compTool}} style={styles.chosenImg}></Image>
          </View>

        </View>

        <View style={styles.chosenTool}>
            <Text style={styles.textUserTool}>{userText}</Text>
            <Text style={styles.textCompTool}>{compText}</Text>
        </View>

      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {setUserTool(rock)
          setUserText("Rock")
          getCompChoice()}}>
          <Text style={styles.textButton}>Rock</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {setUserTool(paper)
          setUserText("Paper")
          getCompChoice()}}>
          <Text style={styles.textButton}>Paper</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {setUserTool(scissors)
          setUserText("Scissors")
          getCompChoice()}}>
          <Text style={styles.textButton}>Scissors</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
          style={styles.resetButton}
          onPress={() => reset()}>
          <Text style={styles.textReset}>Reset</Text>
        </TouchableOpacity>

    </View>
  );
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
