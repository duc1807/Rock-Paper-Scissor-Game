import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  //Modal Screen


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

  textUserTool: {
    fontSize: 16,
    marginLeft: 40
  },
  textCompTool: {
    fontSize: 16,
    marginRight: 50
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
})

export default styles