export const getData = (url) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json;charset=UTF-8',
      Authorization: 'Basic er883jdzbdwee'
    }
  });
};

export const putData = (url, body) => {
  console.log('body', body);
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json;charset=UTF-8',
      Authorization: 'Basic er883jdzbdwee'
    },
    body: JSON.stringify(body)
  });
};

export const deleteData = (url) => {
  console.log(url);
  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json;charset=UTF-8',
      Authorization: 'Basic er883jdzbdwee'
    }
  });
};

export const postData = (url, body) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json;charset=UTF-8',
      Authorization: 'Basic er883jdzbdwee'
    },
    body: JSON.stringify(body)
  });
};
