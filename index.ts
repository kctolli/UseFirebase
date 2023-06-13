/** 
 * Firebase Config
 * Web App's Firebase configuration
*/

import { FirebaseApp, initializeApp } from "firebase/app";
import { Database, Query, getDatabase, onValue, ref } from 'firebase/database';
import { useState, useEffect } from 'react';

type firebaseObj = {
    apiKey: string,
    authDomain: string,
    databaseURL: string,
    projectId: string,
    storageBucket: string,
    messagingSenderId: string,
    appId: string
};

export default class useFirebase {
    public app: FirebaseApp | undefined; 
    public db: Database; 
    public query: Query;

    // Config and Initialize Firebase
    public constructor (config: firebaseObj) {
        this.app = initializeApp(config);
        this.db = getDatabase(this.app);
        this.query = ref(this.db);
    } 

    // Firebase Query Functions
    public readonly ref = ref;
    public readonly onValue = onValue;
    public snapShotData (snapshot: any, data: string): Array<any> {
        return (snapshot.exists() ? snapshot.val()[data] : []) as Array<any>;
    }

    public useData = (prop: string): Array<any> => {
        const [data, setData] = useState<any[]>([]);
        useEffect(() => {
            this.onValue(this.query, 
                snapshot => setData(this.snapShotData(snapshot, prop))
            );
        }, [prop]);
        return [data];
    }
}
