
const apiKey = 'grYCjWJ9GHee0eKfpbNy6f7zhFZyWquog540sWHa'; 
const searchURL = 'https://developer.nps.gov/api/v1/places';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

function getStateInfo(stateCode, maxResults=10) {
  const params = {
    api_key: apiKey,
    q: 'park',
    stateCode: stateCode,
    limit: maxResults
  };
  const queryString = formatQueryParams(params);
  console.log(queryString);
  const url = searchURL + '?' + queryString;


  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => {
      for(let i = 0; i < responseJson.data.length; i++){
        $('#results-list').append(`<li><h3>${responseJson.data[i].title}</h3>
              <p>${responseJson.data[i].listingdescription}</p>
              <a href="${responseJson.data[i].url}">Link to Park</a>
              </li>`);
      }

    })
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}



function watchForm() {

  $('form').submit(event => {
    event.preventDefault();
    const stateCode = $('#search-term').val();
    const maxResults = $('#js-max-results').val();
    $('#search-term').val('');
    $('#js-max-results').val('');
    getStateInfo(stateCode, maxResults);
    $('#results-list').html('');
  });
 
}

$(watchForm);
  