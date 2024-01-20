const url = 'https://reqres.in/api/users';

export async function loadUsers() {
  try {
    const response = await fetch(url);
    const { data } = await response.json();

    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function addUser(userObj) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userObj),
    });

    return response.json();
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function removeUser(userId) {
  try {
    const response = await fetch(`${url}/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.ok;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function editUser(userObj) {
  try {
    const response = await fetch(`${url}/${userObj.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userObj),
    });
    const result = response.json();

    return result;
  } catch (err) {
    throw new Error(err.message);
  }
}