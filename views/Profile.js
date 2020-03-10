import React, { useState, useEffect } 				from 'react';
import { View, Image, Text, FlatList, StyleSheet }	from 'react-native';
import { ListItem } 								from 'react-native-elements'

const Profile = props => {
	

	useEffect(() => {
		getRepos()
	}, [])

	const 	profile 		= props.userProfile;
	const 	reposList		= props.returnedRepoList
	let 	pushComplete	= false;

	const getRepos = () => {
		const apiCall = profile.repoUrl

	    fetch(apiCall, {
	      method: 'GET',
	      headers: {
	        Accept: 'application/vnd.github.v3+json'
	      }
	    })
	      .then(res => res.json())
	      .then(json =>{
	      	json.map(item => {
		        profile.repos.push({
		          id: item.id,
		          name: item.full_name,
		          language: item.language,
		          contributors: item.contributors_url
		        });
		    });
		    props.returnRepoList(profile.repos)
	      })
	      .catch(err => {
	        console.error(err);
	      });
	}

 	

	return (
		<View>
			<View style={styles.profileView}>
				<Image style={styles.profilePicture} source={{uri: profile.avatar}} />
				<Text style={styles.userName}>{profile.userName}</Text>
			</View>
			<View>
				<FlatList data={reposList} 
				      renderItem={({item}) => <ListItem key={item.id} title={item.name} subtitle={item.language} bottomDivider onPress={(e => props.returnRepo(item))} style={styles.listItem}/>} 
				      keyExtracator={item => item.id} style={styles.flatlist}/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	profileView: {
		flexDirection: 'row',
		marginTop: 10,
		justifyContent: 'space-around'
	},
	profilePicture: {
		height: 100,
		width: 100,
		marginHorizontal: 0,
	},
	userName: {
		height: 100,
		fontSize: 18,
		fontWeight: 'bold',
		paddingTop: '8%',
		marginLeft: '-20%'
	},
	flatlist: {
		width: 400,
		height: 300,
		marginTop: '5%'
	},
	listItem: {
		paddingHorizontal: '2%'
	}
})

export default Profile;