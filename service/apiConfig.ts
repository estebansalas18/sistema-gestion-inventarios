const SERVER_URL = process.env.NEXT_PUBLIC_SUPABASE_URL_REST;
const API_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Lee la clave de API desde .env
const API_ROUTES = {
  users: `${SERVER_URL}/User`,
  roles: `${SERVER_URL}/Role`,
  materials: `${SERVER_URL}/Material`,
  inventoryMovements: `${SERVER_URL}/InventoryMovement`,
};

const fetcher = (url: string) => {
    const headers = new Headers();
    const apiKey = API_KEY;  
    if (apiKey) {
      headers.append('apikey', apiKey);
    }
    return fetch(url, { headers }).then((res) => res.json());
};
export { SERVER_URL, API_ROUTES, fetcher };