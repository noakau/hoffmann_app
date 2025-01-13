const API_URL = "http://localhost:3000";  



export const get_all_tasks = async () => {
    try {
        const response = await fetch(`${API_URL}/tasks/get_all`, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token'),
            }
        });
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }
        return data.data;
    } catch (error) {
        console.error("Error fetching all tasks:", error);
        return null;
    }
};

export const get_task_by_uuid = async (uuid) => {
    try {
        const response = await fetch(`${API_URL}/tasks/get/${uuid}`, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token'),
            }
        });
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }
        return data.data;
    } catch (error) {
        console.error(`Error fetching task with UUID ${uuid}:`, error);
        return null;
    }
};

export const add_task = async (task) => {
    try {
        const response = await fetch(`${API_URL}/tasks/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token'),
            },
            body: JSON.stringify(task),
        });
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }
        return data.data;
    } catch (error) {
        console.error("Error adding task:", error);
        return null;
    }
};

export const delete_task = async (id) => {
    try {
        const response = await fetch(`${API_URL}/tasks/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token'),
            },
            body: JSON.stringify({ id }),
        });
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }
        return data.data;
    } catch (error) {
        window.alert(`Error deleting task with ID ${id}:`, error);
        return null;
    }
};

export const edit_task = async (task) => {
    try {
        const response = await fetch(`${API_URL}/tasks/edit`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token'),
            },
            body: JSON.stringify(task),
        });
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }
        return data.data;
    } catch (error) {
        console.error("Error editing task:", error);
        return null;
    }
};
export const login = async (email, password) => {
    try {
        // Requête POST vers le backend pour la connexion
        const response = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        // Stocker le token dans le localStorage
        localStorage.setItem('token', data.token);

        return data.token;
    } catch (error) {
        console.error("Error logging in:", error);
        return {token: null, error: error};
    }
};
export const create_user = async (formData) => {
    try {
      const response = await fetch(`${API_URL}/users/admin/create-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + localStorage.getItem('token'),
        },
        body: JSON.stringify(formData),
      });
  
       // Vérifie si la réponse est OK avant d'essayer de la parser en JSON
    if (!response.ok) {
        const errorText = await response.text(); 
        throw new Error(`Erreur du serveur : ${errorText}`);
      }
  
      const data = await response.json();
  
      // Vérifie s'il y a une erreur dans les données retournées
      if (data.error) {
        throw new Error(data.error);
      }
  
      return data;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };


export function parseJwt (token) {
    // console.log(token)
    // console.log("test")
    var base64Url = token.split('.')[1];
    if (base64Url === undefined) {
        localStorage.removeItem('token');
        window.href.location = "/"
        return null
    }
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    jsonPayload = JSON.parse(jsonPayload);


    let currentTime = new Date();
    // console.log(jsonPayload)
    // console.log(jsonPayload.exp, currentTime.getTime()/1000)
    if (jsonPayload?.exp === null || jsonPayload?.exp == undefined || jsonPayload?.exp < (currentTime.getTime()/1000)) {
        localStorage.removeItem('token');
        window.href.location = "/"
        return null
    }
    return jsonPayload;
}


export function get_user_from_token() {
    let token = localStorage.getItem('token', null);
    if (token === null) {
        return null;
    } else {
        return parseJwt(token);
    }
}

export const get_all_users = async () => {
    try {
        const response = await fetch(`${API_URL}/users/`, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token'),
            }
        });
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }
        return data.data;
    } catch (error) {
        console.error("Error fetching all users:", error);
        return null;
    }
};