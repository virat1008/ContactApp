import { StyleSheet } from "react-native"
const AddCntactStyle= StyleSheet.create({
    container:{
        marginLeft:100,
        marginTop:100
      },
      textInput:{
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        width: '80%',
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
        borderRadius: 5,
        marginBottom: 20,
      },
      text:{
        fontSize:20
      },
      buttonContainer: {
        flexDirection: 'row',
      },
      image: {
        width: 200,
        height: 200,
        marginTop: 20,
        marginBottom:20
      },
});
export default AddCntactStyle;
