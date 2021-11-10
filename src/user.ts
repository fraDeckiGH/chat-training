import GUN from 'gun';
import 'gun/sea';
// import 'gun/axe';

import { writable } from 'svelte/store';


// Database
export const db = GUN();

// Gun User
export const user = db.user().recall({
    sessionStorage: true
});

// Current User's username
export const username = writable('');


user.get('alias').on(v => username.set(v))

// @ts-ignore
db.on('auth', async (event: any) => {
    const alias = /* await  */user.get('alias'); // username string
    // HACK <any>alias
    username.set(<any>alias);
    console.log(`signed in as`, alias);
});





