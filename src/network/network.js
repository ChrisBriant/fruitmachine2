import axios from 'axios';

const conn = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});


const getAccessToken = () => {
    const accessToken = localStorage.getItem('access_token');
    if(accessToken) {
       return decode(accessToken);
    } else {
        return null;
    }
}


const checkAuthed = () => {
    return new Promise((resolve,reject) => {
      const accessToken = localStorage.getItem('access_token');
      if(accessToken) {
        const decoded = decode(accessToken);
        const tokenExpiry = new Date(decoded.exp*1000);
        const now = new Date();
        if(now < tokenExpiry) {
              //Hasn't expired
              return resolve(true);
        } else {
              //Try refresh
              const refreshToken = localStorage.getItem('refresh_token');
              if(refreshToken)
              {
                  conn.post('/accounts/refresh/',{ refresh: refreshToken }).then((res) => {
                      localStorage.setItem('access_token',res.data.access);
                      return resolve(true);
                  }).catch((err) => {
                      return resolve(false);
                  });
              } else {
                  return resolve(false);
              }
        }
      } else {
          //Token doesn't exist
          return resolve(false);
      }
    });
}


const getCredit = async () => {
    let authed = await checkAuthed();
    console.log('authed data', authed);
    if(authed) {
        console.log('I AM FROM GET CREDIT AND I AM AUTHED', getAccessToken());
    } else {
        console.log('I AM FROM GET CREDIT AND I AM NOT AUTHED');
        return 0;
    }

}
  
export {checkAuthed, getCredit};