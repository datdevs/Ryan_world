/* eslint-disable no-undef */
export function integrateFacebookSDK(d, s, id) {
  let js, fjs = d.getElementsByTagName(s)[0]
  if (d.getElementById(id)) return
  js = d.createElement(s); js.id = id
  js.src = 'https://connect.facebook.net/vi_VN/sdk.js'
  fjs.parentNode.insertBefore(js, fjs)
}

export function initFacebookSDK(app_id) {
  window.fbAsyncInit = function() {
    FB.init({
      appId            : app_id,
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v11.0'
    })
  }
}
