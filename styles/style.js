import { StyleSheet } from "react-native";

const Exstyles = StyleSheet.create({
    // container: {
    //   flex: 1,
    //   backgroundColor: '#fff',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    // },
    title:{
        fontSize:25,
        textAlign:'center',
        marginTop:10
    },
    topcontainer:{
        flex:1
    },
    heading:{
        marginTop:20,
        textAlign:'center',
        fontSize:30,
        fontStyle:'normal',
        
       },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingTop: 20,
      },
      listContainer: {
        paddingBottom: 20,
      },
      contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
      },
      contactPhoto: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
      },
      contactName: {
        fontSize: 25,
        color: '#333333',
        fontStyle:'italic',
        fontWeight:''
      },
      buttonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
      },
      rowBack: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    backRightBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 75,
        height: '100%',
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
    backTextWhite: {
        color: '#FFF',
    },
  });

  export default Exstyles;