// import request from 'request';
import fetchJsonp from 'fetch-jsonp';

// マイキャラリストにGETしに行く
function getMyCharaList() {
  return new Promise(function(resolve, reject) {
    fetchJsonp('https://script.google.com/macros/s/AKfycbziCZHD0HAtRbrv2mHmyhUM1vIt52LV45EEWW4M8mV_lMSZSoo/exec', {
      jsonpCallback: 'callback'
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        resolve({ data: json });
      })
      .catch(function(error) {
        reject({ error });
      });
  });
}

export default { getMyCharaList };
