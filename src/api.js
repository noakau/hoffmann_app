const API_URL = "http://localhost:3000";  



export const get_all_tasks = async () => {
    try {
        const response = await fetch(`${API_URL}/tasks/get_all`);
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
        const response = await fetch(`${API_URL}/tasks/get/${uuid}`);
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
            },
            body: JSON.stringify({ id }),
        });
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }
        return data.data;
    } catch (error) {
        console.error(`Error deleting task with ID ${id}:`, error);
        return null;
    }
};

export const edit_task = async (task) => {
    try {
        const response = await fetch(`${API_URL}/tasks/edit`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
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

        return data.user;
    } catch (error) {
        console.error("Error logging in:", error);
        return null;
    }
};
/*export const register = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/users/register`, {
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
  
      return data.user;
    } catch (error) {
      console.error("Erreur lors de la création du compte :", error);
      return null;
    }
  };*/