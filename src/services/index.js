const scheme = 'https://';

const _100 = 'Unable to get client_id!'
const _101 = 'Unable to get current user!'
const _102 = 'Unable to get access token!'
const _103 = 'Unable to get timelines home!'
const _104 = 'Unable to get timelines public!'
const _105 = 'Unable to search accounts!'

export const MostodonService = {
    v1_apps (path) {
      return new Promise((resolve, reject) => {
        let url = scheme + global.instanceUri + path;
        console.log('v1_apps path:', url)
        fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            client_name: 'ping_me',
            redirect_uris: 'mastodon://com.ping_me',
            scopes: 'read write follow',
            website: 'http://com.ping_me'
          })
        })
        .then((response) => {
          return response.json()
        })
        .then((responseJson) => {
          console.log('Service v1_apps')
          resolve(responseJson)
        })
        .catch (error => reject(_100));
      });
    },
    v1_current_user (path) {
      return new Promise((resolve, reject) => {
        let url = scheme + global.instanceUri + path;
        let access_token = `Bearer ${global.access_token}`
        console.log('v1_current_user path:', url, access_token)
        fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': access_token,
          }
        })
        .then((response) => {
          console.log("Searching link headers:", response)
          return response.json()
        })
        .then((responseJson) => {
          resolve(responseJson)
        })
        .catch (error => {
          console.log('Error in verify user:', error)
          reject(_101)
        });
      });
    },
    v1_oauth_token (inputs) {
      return new Promise((resolve, reject) => {
        let url = scheme + global.instanceUri + inputs.path;
        console.log('v1_oauth_token:', url)
        let oauthBody = JSON.stringify({
          client_id: inputs.client_id,
          client_secret: inputs.client_secret,
          redirect_uri: inputs.redirect_uri,
          code: inputs.code,
          grant_type: 'authorization_code',
        })
        console.log('v1_oauth_token body:', oauthBody)
        fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: oauthBody
        })
        .then((response) => {
          return response.json()
        })
        .then((responseJson) => {
          console.log('Service v1_oauth_token', responseJson)
          resolve(responseJson)
        })
        .catch (error => {
          console.log('Error in v1_oauth_token:', error)
          reject(_102)
        });
      });
    },
    v1_timeline_home (path) {
      return new Promise((resolve, reject) => {
        let url = scheme + global.instanceUri + path;
        console.log('v1_timeline_home:', url)
        let access_token = `Bearer ${global.access_token}`
        fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': access_token,
          }
        })
        .then((response) => {
          return response.json()
        })
        .then((responseJson) => {
          resolve(responseJson)
        })
        .catch (error => {
          console.log('Error in timeline home:', error)
          reject(_103)
        });
      });
    },
    v1_timeline_public (path) {
      return new Promise((resolve, reject) => {
        let url = scheme + global.instanceUri + path;
        console.log('v1_timeline_public:', url)
        let access_token = `Bearer ${global.access_token}`
        fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': access_token,
          }
        })
        .then((response) => {
          return response.json()
        })
        .then((responseJson) => {
          resolve(responseJson)
        })
        .catch (error => {
          console.log('Error in timeline public:', error)
          reject(_104)
        });
      });
    },
    v1_accounts_search (payload) {
      return new Promise((resolve, reject) => {
        let url = scheme + global.instanceUri + payload.path + payload.name + '&limit=' + payload.limit;
        console.log('v1_accounts_search:', url)
        let access_token = `Bearer ${global.access_token}`
        fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': access_token,
          }
        })
        .then((response) => {
          return response.json()
        })
        .then((responseJson) => {
          resolve(responseJson)
        })
        .catch (error => {
          console.log('Error in accounts search:', error)
          reject(_105)
        });
      });
    }
}
