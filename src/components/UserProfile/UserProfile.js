import React, { useEffect, useState } from 'react'
import "./UserProfile.css"
import { useParams } from 'react-router-dom'
import RepositoryList from '../RepositoryList/RepositoryList';

const UserProfile = () => {
  const {userName } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [showRepositories, setShowRepositories] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${userName}`);
        const data = await response.json();
        // console.log(data)
        setUser(data);
      }
      catch{
        setError('Failed to fetch user data');
        console.error(error)
      }
    }
    fetchUserData();
  }, [userName])

  const toggleRepositories = () => {
    setShowRepositories(!showRepositories)
  }

  if(error) {
    return <div>Error : {error} </div>
  }

  if(!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="user-profile">
      <img src={user.avatar_url} alt={`${user.name}'s avatar`} style={{width: 100, borderRadius: '50%'}}/>
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
      <p>Repositories : {user.public_repos}</p>
      <button onClick={toggleRepositories}>{showRepositories? 'Hide Repositories' : 'Show All Repositories'}</button>
      {showRepositories && <RepositoryList totalRepos={user.public_repos}/>}
    </div>
  )
}

export default UserProfile