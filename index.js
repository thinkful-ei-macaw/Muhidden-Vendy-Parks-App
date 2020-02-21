
const apiKey = 'grYCjWJ9GHee0eKfpbNy6f7zhFZyWquog540sWHa'; 
const searchURL = `https://developer.nps.gov/api/v1/places?stateCode=${stateInitials}&limit=${maxResults}&start=1&q=park&api_key=${apiKey}`;

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

function getStateInfo(query, maxResults=10) {
  const params = {
    key: apiKey,
    q: query,
    part: 'snippet',
    maxResults
  };
  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString + '&api_key=' + apiKey;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => console.log(JSON.stringify(responseJson)))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}


function watchForm() {

  $('form').submit(event => {
    event.preventDefault();
    const stateInitials = $('#search-term').val();
    const maxResults = $('#js-max-results').val();
    console.log(stateInitials);
    console.log(maxResults);
    getStateInfo(stateInitials, maxResults);
    
  });
  //
}

$(watchForm);
  