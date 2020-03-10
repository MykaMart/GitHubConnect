import React, { useState, useEffect } 				from 'react';
import { View, FlatList, Item, Text, StyleSheet } 	from 'react-native';
import { ListItem }									from 'react-native-elements'

const Users = props => {

 	const userList = props.userList;
 	
 	
 	const scrollHandler = (e) => {
 		if(e.nativeEvent.contentOffset.y >= 1350){
 			console.log('event handled');
 		}
 	}
 		
	return (
		<View>
			<FlatList data={userList} 
				      renderItem={({item}) => <ListItem key={item.id} data={item} topDivider leftAvatar={{source: {uri: item.avatar}}} title={item.userName} subtitle={'User ID: ' + item.id.toString()} bottomDivider onPress={(e => props.returnProfile(item))}/>} 
				      keyExtracator={item => item.id} style={styles.flatlist}/>
		</View>
	)
}

export default Users;

const styles = StyleSheet.create({
	flatlist: {
		width: 365,
		height: 100,
		marginTop: '5%'
	}
})