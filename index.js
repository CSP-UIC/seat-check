const rp = require('request-promise');
const tough = require('tough-cookie');

rp.defaults({ jar: true });
var cookiejar = rp.jar();

const getTerms = () => {
  const options = {
    uri:
      'https://banner.apps.uillinois.edu/StudentRegistrationSSB/ssb/classSearch/getTerms',
    qs: {
      mepCode: '2UIC',
      offset: 1,
      max: 30
    },
    json: true
  };

  rp(options).then(response => {
    console.log(response);
    return response;
  });
};

const getClasses = termID => {
  const options = {
    uri:
      'https://banner.apps.uillinois.edu/StudentRegistrationSSB/ssb/classSearch/get_subject',
    qs: {
      term: termID,
      offset: 1,
      max: 500,
      mepCode: '2UIC'
    },
    json: true
  };

  rp(options).then(response => {
    console.log(response);
  });
};

const getSesions = () => {
  rp.get(
    {
      uri:
        'https://banner.apps.uillinois.edu/StudentRegistrationSSB/ssb/registration',
      jar: cookiejar,
      qs: {
        mepCode: '2UIC'
      },
      headers: {
        connection: 'keep-alive'
      }
    },
    (error, response, body) => {
      rp({
        uri:
          'https://banner.apps.uillinois.edu/StudentRegistrationSSB/ssb/searchResults/searchResults',
        jar: cookiejar,
        resolveWithFullResponse: true,
        qs: {
          txt_term: 220191,
          pageOffset: 0,
          pageMaxSize: 10,
          mepCode: '2UIC',
          sortDirection: 'asc',
          sortColumn: 'subjectDescription',
          txt_subject: 'CS',
          txt_courseNumber: '141',
          startDatepicker: '',
          endDatepicker: ''
        },
        headers: response.headers
      }).then(res => {
        console.log(res);
      });
    }
  );
};

getTerms();
getClasses(220191);
getSesions();
