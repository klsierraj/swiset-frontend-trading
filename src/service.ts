export async function login(
    username: string,
    password: string
  ): Promise<any> {
    const url = 'https://api.swiset.com/api/authenticate';
  

    const body = {
      username,
      password,
    };
    const headers = {
       'Content-Type': 'application/json',
       'Accept': 'application/json'
    }
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Login failed! status: ${response.status}, message: ${errorText}`);
    }
  
    return response.json();
  }
  