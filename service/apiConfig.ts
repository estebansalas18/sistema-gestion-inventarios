import { createClient } from '@supabase/supabase-js';

const SERVER_URL_REST = process.env.NEXT_PUBLIC_SUPABASE_URL_REST;
const API_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Lee la clave de API desde .env
const SERVER_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

const supabase = createClient(SERVER_URL, API_KEY);

const API_ROUTES = {
  users: `${SERVER_URL_REST}/User`,
  users2: `${SERVER_URL_REST}/User`,
  roles: `${SERVER_URL_REST}/Role`,
  materials: `${SERVER_URL_REST}/Material`,
  inventoryMovements: `${SERVER_URL_REST}/InventoryMovement`,
};

const fetcher = async (url) => {
  const headers = new Headers();
  const apiKey = API_KEY;
  if (apiKey) {
    headers.append('apikey', apiKey);
  }

  try {
    // Construir la URL correctamente
    const apiUrl = url.startsWith('http') ? url : `${SERVER_URL_REST}${url}`;

    const response = await fetch(apiUrl, { headers });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};

export { supabase, SERVER_URL_REST, API_ROUTES, fetcher };
