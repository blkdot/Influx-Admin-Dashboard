export async function getApiStatus(uri) {
  var startTime = (new Date()).getTime(), endTime = 0, res;

  await fetch(uri, { mode: 'no-cors', method: 'GET', headers: { 'Content-Type': 'application/json' } })
    .then(
      (response) => {
        res = response;
        console.log('res===', res);
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
}