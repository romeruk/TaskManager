async function get(url) {
  const response = await fetch(url);
  const resData = await response.json();
  return resData;
}

async function post(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const resData = await response.json();
  return resData;
}


async function put(url, data) {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },

    body: JSON.stringify(data)
  });

  const resData = await response.json();
  return resData;
}

async function patch(url, data) {
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json'
    },

    body: JSON.stringify(data)
  });

  const resData = await response.json();
  return resData;
}

async function remove(url) {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    }
  });

  const resData = await response.json();
  return resData;
}

export { get, post, put, patch, remove }