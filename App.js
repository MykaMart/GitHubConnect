import React, { useState, useEffect }     from 'react';
import { StyleSheet, View, Image, Text }  from 'react-native';
import SearchBar                          from './views/SearchBar';
import Browse                             from './views/Browse';
import Users                              from './views/Users';
import Profile                            from './views/Profile';
import Repo                               from './views/Repo';

export default function App() {

  const [currentView,               setCurrentView]              = useState('');
  const [searchName,                setSearchName]               = useState('');
  const [returnedUserList,          setReturnedUserList]         = useState('');
  const [userProfile,               setUserProfile]              = useState('');
  const [returnedRepo,              setReturnedRepo]             = useState('');
  const [returnedRepoList,          setReturnedRepoList]         = useState('');
  const [returnedContribtors,       setReturnedContributors]     = useState('');
  const [returnedContributorsList,  setReturnedContributorsList] = useState('');


  useEffect(() => {
    setCurrentView('users');
  }, [])
    
  const returnUser = (returnedUser) => {
    setReturnedUserList([returnedUser])
    setCurrentView('users')
  }

  
  const returnUserList = (userList) => {
    setReturnedUserList(userList)
    setCurrentView('users')
  }

  const returnProfile = (user) => {
    setUserProfile(user)
    setCurrentView('profile')
  }

  const returnRepo = (returnedRepo) => {
    setReturnedRepo(returnedRepo)
    setCurrentView('repo')
  }

  const returnRepoList = (repoList) => {
    setReturnedRepoList(repoList)
    setCurrentView('profile')
  }

  const returnContributors = (returnedContributors) => {
    setReturnedContributorsList(returnedContributors)
    setCurrentView('repo')
  }


  return (
    <View>
      <View style={styles.logoView}>
          <Image style={styles.logo} resizeMode='center' source={require('./assets/splash.png')} />
      </View>
      <View>
        <SearchBar returnUser={returnUser}/>
      </View>
      <View >
        <Browse returnUserList={returnUserList}/>
      </View>
      <View style={styles.currentView}>
        { 
          currentView === 'users' && <Users userList={returnedUserList} setReturnedUserList={setReturnedUserList} returnProfile={returnProfile} />
        }
        {
          currentView === 'profile' && <Profile userProfile={userProfile} returnRepo={returnRepo} returnRepoList={returnRepoList} returnedRepoList={returnedRepoList}/>
        }
        {
          currentView === 'repo' && <Repo userProfile={userProfile} repo={returnedRepo} returnProfile={returnProfile} returnContributors={returnContributors} returnedContributorsList={returnedContributorsList}/>
        }
      </View>
  
    </View>
  );
}

const styles = StyleSheet.create({
    logoView: {
      height: '12%',
      alignItems: 'center' 
    },
    logo: {
      height: '100%',
      marginTop: '5%',
    },
    currentView: {
      alignItems: 'center' 
    },
})


