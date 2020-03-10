import React, { useState } 					from 'react';
import { View, Text, Button, StyleSheet } 	from 'react-native';

const Browse = props => {

	const [returnedUser, 	setReturnedUser] 		= useState('');
	const [userList, 		setUserList]			= useState('');
	const [lastUser, 		setLastUser]			= useState('');

	const getAllUsers = () => {

		const usersList = [];

		if (lastUser === '') { 
			setLastUser(0)
		};

	    const apiCall = 'https://api.github.com/users?since='+lastUser;

	    fetch(apiCall, {
	      	method: 'GET',
	      	headers: {
		        Accept: 'application/vnd.github.v3+json'
		     }
	    })
	      .then(res => res.json())
	      .then(json =>{
	
			json.map(item => {
				usersList.push({
					id: item.id,
					userName: item.login,
					avatar: item.avatar_url,
					repoUrl: item.repos_url,
					repos: []
				})
	       	})
	       	props.returnUserList(usersList)
	       })
	      .catch(err => {
	        console.error(err);
	      });
	}

	return(
		<View style={styles.browseView}>
			<Button title='Browse Users' onPress={getAllUsers} style={styles.browse}/>
		</View>
	);
}

export default Browse;

const styles = StyleSheet.create({
	browseView:{
		paddingHorizontal: 30
	},
	browse:{
		borderWidth: 2,
		marginBottom: 10,
		paddingLeft: 10
	}

})