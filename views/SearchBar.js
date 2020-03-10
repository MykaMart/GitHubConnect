import React, { useState } 						from 'react';
import {View, TextInput, Button, StyleSheet} 	from 'react-native';

const SearchBar = props  => {

	const [searchName, setSearchName] = useState('');

	const searchHandler = searchInput => {

		setSearchName(searchInput);
	}

	const searchUsers = () => {

	    const apiCall = 'https://api.github.com/users/' + searchName;

	    fetch(apiCall, {
	      method: 'GET',
	      headers: {
	        Accept: 'application/vnd.github.v3+json'
	      }
	    })
	      .then(res => res.json())
	      .then(json =>{
	        props.returnUser({
	          userName: json.login,
	          id: json.id,
	          avatar: json.avatar_url,
	          repoUrl: json.repos_url,
	          repos: []
	        });
	      })
	      .catch(err => {
	        console.error(err);
	      });
	}


	return (
		<View style={styles.searchInput}>
			<TextInput placeholder="Search for user" style={styles.searchbar} onChangeText={searchHandler} value={searchName} />
			<Button title="SEARCH" onPress= {searchUsers} />
		</View>
	);
}

const styles = StyleSheet.create ({
	searchInput: {
		paddingHorizontal: 30,
		paddingBottom: 10
	},
	searchbar: {
		borderColor: '#000000',
		borderWidth: 2,
		marginTop: 20,
		marginBottom: 10,
		paddingLeft: 10,
		fontStyle: 'italic' 
	}
})
export default SearchBar;