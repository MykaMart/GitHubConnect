import React, { useState, useEffect, Component } 	from 'react';
import { View, Image, Text, FlatList, StyleSheet } 	from 'react-native';
import { ListItem } 								from 'react-native-elements'

const Repo = props => {
	

	useEffect(() => {
		getContributors()
	}, [])

	const   contributorsList 	= props.returnedContributorsList;
	const   profile 			= props.userProfile;
	const   repo            	= props.repo;
	const   contributorList		= []

	const getContributors= () => {

		const apiCall = repo.contributors

	    fetch(apiCall, {
	      method: 'GET',
	      headers: {
	        Accept: 'application/vnd.github.v3+json'
	      }
	    })
	      .then(res => res.json())
	      .then(json =>{
	      	json.map(item => {
		        contributorList.push({
					id: item.id,
					userName: item.login,
					avatar: item.avatar_url,
					repoUrl: item.repos_url,
					repos: []
				})
		    });
		    props.returnContributors(contributorList)
	      })
	      .catch(err => {
	        console.error(err);
	      });
	}

 	

	return (
		<View>
			<View style={styles.profileView}>
				<Image style={styles.profilePicture} source={{uri: profile.avatar}} />
				<Text style={styles.repoName}>{repo.name}</Text>
			</View>
			<View>
				<FlatList data={contributorsList} 
   					renderItem={({item}) => <ListItem key={item.id} data={item} topDivider leftAvatar={{source: {uri: item.avatar}}} title={item.userName} subtitle={'User ID: ' + item.id.toString()} bottomDivider onPress={(e => props.returnProfile(item))}/>} 
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
	repoName: {
		height: 100,
		fontSize: 14,
		fontWeight: 'bold',
		paddingTop: '8%',
		marginLeft: '-20%'
	},
	flatlist: {
		width: 365,
		height: 100,
		marginTop: '5%'
	}
})

export default Repo;