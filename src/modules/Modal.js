import React, { useState } from 'react'
import { 
  StyleSheet,
  Modal, 
  View, 
  TouchableOpacity, 
  Text, 
  FlatList,
  SafeAreaView
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

const styles = StyleSheet.create({
  modalScr: {
    borderRadius: 15,
    borderWidth: 5,
    alignSelf: 'center',
    marginTop: 150,
    width: 75 + '%',
    height: 50 + '%',
    backgroundColor: 'lightblue',
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
  scrView: {
    flex: 1,
    width: 275,
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
})

/* HistoryContext :: Array<Enum[-1,0,1]> */

const equals = x => y => x === y

const getNumWinMatches = history => history.filter(equals(1)).length
const getNumLoseMatches = history => history.filter(equals(-1)).length
const getWinRate = (history) => getNumWinMatches(history) / history.length
const getLoseRate = (history) => getNumLoseMatches(history) / history.length


const CustomModal = ({ isVisible, historyContext }) => {
  
  const [visibility, setVisibility] = useState(isVisible)
  const numWinMatches = getNumWinMatches(historyContext)
  const winRate = getWinRate(historyContext)
  const numCompWinMatchs = getNumLoseMatches(historyContext)
  const loseRate = getLoseRate(historyContext)

  const noti = [
    `Total: ${historyContext.length}`, 
    `Win: ${numWinMatches} (${winRate})`
    `Lose: ${numCompWinMatchs} (${loseRate})`
  ].join(' - ')

  return (
    <Modal
      transparent={true}
      visible={visibility}
      animated
    >
      <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
        <View style={styles.modalScr}>
          <View style={styles.headerModal}>

            <TouchableOpacity>
              <FontAwesome
                onPress={() => setVisibility(false)}
                name="close"
                size={38}
                color="black"
                style={{ position: "absolute", top: -26, right: -125 }} 
              />
            </TouchableOpacity>
            <Text style={styles.historyText}>
              History
            </Text>
            <Text style={styles.generalResult}>
              {noti}
            </Text>
          </View>

          <View style={styles.containerModal}>
            <View style={styles.scrView}>
              {/* <View style={styles.contentModal}> */}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default CustomModal