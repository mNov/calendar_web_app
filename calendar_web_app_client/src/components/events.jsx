import React from 'react';
import { gapi } from 'gapi-script';

function Event() {
    const handleClick = () => {
        console.log('handle click');

        
        const CLIENT_ID = '667626106627-tnnnou3of5mtnd9g1rb6t5kq0738c7v3.apps.googleusercontent.com';
        const API_KEY = 'AIzaSyBQGEL-86_sTlb85OjnNq7tb2XRPbrkGCI';
        const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
        const SCOPES = 'https://www.googleapis.com/auth/calendar';

        gapi.load('client:auth2', initClient);
            
        function initClient() {
            gapi.client.init({
                'apiKey':  API_KEY,
                'discoveryDocs': DISCOVERY_DOCS,
                'clientId': CLIENT_ID,
                'scope': SCOPES,
            }).then(function () {
                console.log('here');
                // // Listen for sign-in state changes.
                // gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
      
                // // Handle the initial sign-in state.
                // updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
                // authorizeButton.onclick = handleAuthClick;
                // signoutButton.onclick = handleSignoutClick;
              }, function(error) {
                console.log('error', error);
                // appendPre(JSON.stringify(error, null, 2));
              });
      
        }
    }

    return (<div><button type="button" className="btn btn-primary" onClick={handleClick}>Add Reminder</button></div>);
}

export default Event;