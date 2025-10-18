import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';


const DashboardCard = ({ item }) => {
    return(
        <View style={styles.containerCard}>
            <View style={styles.card}>
                <Text style={styles.titulo}>{item.titulo}</Text>
                <Text style ={styles.valor}>{item.valor}</Text>
            </View>
        </View>
    );
}

const { width } = Dimensions.get('window');
const CARD_CONTAINER_WIDTH = width / 2;

const styles = StyleSheet.create({
    containerCard: {
        width: CARD_CONTAINER_WIDTH,
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal:18,
        marginBottom:20,
    },
    card: {
        backgroundColor:'#262424ff',
        width:"100%",
        height:140,
        borderRadius:20,
        borderColor:'#424040ff',
        borderWidth:1,
        justifyContent:'center',
        padding:20,
        gap:5,
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
            },
              // Sombra para Android
            android: {
                elevation: 10,
            },
        }),
    },
    titulo: {
        color:'#7a7575ff',
    },
    valor: {
        color:'#fff',
        fontSize:20,
    },
});

export default DashboardCard;