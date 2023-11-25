import { createClient } from '@supabase/supabase-js';

const SERVER_URL_REST = process.env.NEXT_PUBLIC_SUPABASE_URL_REST;
const API_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""; // Lee la clave de API desde .env
const SERVER_URL_SUPABASE = process.env.NEXT_PUBLIC_SUPABASE_URL || "";

const SERVER_URL = '/api';

const supabase = createClient(SERVER_URL_SUPABASE, API_KEY);


const API_ROUTES = {
  users: `${SERVER_URL}/users`,
  materials: `${SERVER_URL}/materials`,
  materialByName: `${SERVER_URL}/materials/getMaterialByName`,
  inventory: `${SERVER_URL}/inventory`,
  usersSupabase: `${SERVER_URL_REST}/User`,
  rolesSupabase: `${SERVER_URL_REST}/Role`,
  materialsSupabase: `${SERVER_URL_REST}/Material`,
  inventoryMovementsSupabase: `${SERVER_URL_REST}/InventoryMovement`,
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const fetcherSupabase = async (url: any) => {
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
  } catch (error: any) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};


export { SERVER_URL, API_ROUTES, fetcher, fetcherSupabase, supabase}