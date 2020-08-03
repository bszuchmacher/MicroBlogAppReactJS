import React from 'react';

const AppContext = React.createContext({
    userName: 'Michael Jackson',
    tweets: [],
    currentUserName: (newName) => { },
    handleOnTweetSubmit: (value) => { }
})

export default AppContext