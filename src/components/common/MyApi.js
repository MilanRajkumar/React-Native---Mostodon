const apis = {
  v1_oauth_token: '/oauth/token',
  v1_apps: '/api/v1/apps',
  v1_current_user: '/api/v1/accounts/verify_credentials',
  v1_timeline_home: '/api/v1/timelines/home',
  v1_timeline_public: '/api/v1/timelines/public',
  v1_accounts_search: '/api/v1/accounts/search?q=',

  oauth_keys: {
    client_id: 'client_id',
    client_secret: 'client_secret',
    redirect_uri: 'redirect_uri',
    instanceUri: 'instanceUri',
    code: 'code'
  }
}

export { apis };
