import 'react-native-url-polyfill/auto';

import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';


const projectUrl = process.env.SUPABASE_PROJECT_URL;
const projectKey = process.env.SUPABASE_PROJECT_KEY;

export const supabase = createClient(projectUrl, projectKey ,{
    db: {
        schema: 'public',
      },
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true
    },
});


export const getSesh = async () => {
    const { data, error } = await supabase.auth.getSession()
    //.then(console.log(data));
    //console.log(data);
    return data;
    //console.log(data.session.user.id)
}

export const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    //console.log(data);
    return data;
}