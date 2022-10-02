export async function getApiStatus(uri) {

  let api_type = getApiType(uri);
  
  if (api_type === "rest") {
    var startTime = (new Date()).getTime(), endTime = 0, res;
    await fetch(uri, { mode: 'no-cors' })
      .then(
        (response) => {
          res = response;
          endTime = (new Date()).getTime();
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
        }
      )
    if (endTime && res)
      return {
        type: 'rest',
        url: uri,
        status: endTime - startTime > 1000 ? 'slow response' : 'operational',
        responseTime: endTime - startTime
      }
    else
      return {
        type: 'rest',
        url: uri,
        status: 'down',
        responseTime: 0
      }
  } else if (api_type === "websocket") {
    var urls = localStorage.getItem('ws-api-urls')
    if (urls) {
      if (urls.indexOf(uri) === -1) {
        urls = JSON.parse(urls);
        console.log('urls', urls);
        urls.push(uri);
      } else {
        urls = JSON.parse(urls);
      }
    } else {
      urls = new Array(1).fill(uri);
    }
    localStorage.setItem('ws-api-urls', JSON.stringify(urls));

    let socket = new WebSocket(uri);

    var startTime, endTime = 0;

    socket.onopen = function(e) {
      console.log("[open] Connection established");
      startTime = (new Date()).getTime()
    };

    socket.onmessage = function(event) {
      console.log("[message] Data received from server");
      endTime = (new Date()).getTime()
      console.log('duration', endTime - startTime);
      localStorage.setItem(uri, JSON.stringify({
        'type': 'websocket',
        'url': uri,
        'status': endTime - startTime > 1000 ? 'slow response' : 'operational',
        'responseTime': endTime - startTime
      }))
    };

    socket.onclose = function(event) {
      if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
      } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        console.log('[close] Connection died');
        localStorage.setItem(uri, JSON.stringify({
          'type': 'websocket',
          'url': uri,
          'status': 'down',
          'responseTime': 0
        }))
      }
    };

    socket.onerror = function(error) {
      endTime = 0;
      console.log(`[error] ${error.message}`);
      localStorage.setItem(uri, JSON.stringify({
        'type': 'websocket',
        'url': uri,
        'status': 'down',
        'responseTime': 0
      }))
    };
  } 
}

export function getApiType(uri) {
  let protocol = uri.split("/")[0];
  if (protocol === "ws:" || protocol === "wss:")
    return "websocket";
  else if (protocol === "http:" || protocol === "https:")
    return "rest";
  else
    return null;
}