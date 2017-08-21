import apiService from '../api/api.service.js'
import timelineFetcherService from '../timeline_fetcher/timeline_fetcher.service.js'

const backendInteractorService = (credentials) => {
  const fetchStatus = ({id}) => {
    return apiService.fetchStatus({id, credentials})
  }

  const fetchConversation = ({id}) => {
    return apiService.fetchConversation({id, credentials})
  }

  const fetchFriends = ({id}) => {
    return apiService.fetchFriends({id, credentials})
  }

  const fetchFollowers = ({id}) => {
    return apiService.fetchFollowers({id, credentials})
  }

  const fetchAllFollowing = ({username}) => {
    return apiService.fetchAllFollowing({username, credentials})
  }

  const followUser = (id) => {
    return apiService.followUser({credentials, id})
  }

  const unfollowUser = (id) => {
    return apiService.unfollowUser({credentials, id})
  }

  const startFetching = ({timeline, store, userId = false}) => {
    return timelineFetcherService.startFetching({timeline, store, credentials, userId})
  }

  const setUserMute = ({id, muted = true}) => {
    return apiService.setUserMute({id, muted, credentials})
  }

  const fetchMutes = () => apiService.fetchMutes({credentials})

  const register = (params) => apiService.register(params)
  const updateAvatar = ({params}) => apiService.updateAvatar({credentials, params})
  const externalProfile = (profileUrl) => apiService.externalProfile(profileUrl)

  const backendInteractorServiceInstance = {
    fetchStatus,
    fetchConversation,
    fetchFriends,
    fetchFollowers,
    followUser,
    unfollowUser,
    fetchAllFollowing,
    verifyCredentials: apiService.verifyCredentials,
    startFetching,
    setUserMute,
    fetchMutes,
    register,
    updateAvatar,
    externalProfile
  }

  return backendInteractorServiceInstance
}

export default backendInteractorService
