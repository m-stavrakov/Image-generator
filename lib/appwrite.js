import 'react-native-url-polyfill/auto'
import { Client, Account, ID, Avatars, Databases } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.mts.aora',
    projectId: '6749db62002022f55d34',
    databaseId: '674de6150005ab490bab',
    userCollectionId: '674de6a3001e9fb15303',
    videoCollectionId: '674de6bf00242a358bc7',
    storageId: '674de8b7002fead14d5e'
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
    // Register User
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );

        if(!newAccount) throw Error('User not created');

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);
        
        // create the new user in the database
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )
        
        return newUser;

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export async function signIn(email, password) {
    try {
        // establish new user session
        // createEmailSession is a method from appwrite
        const session = await account.createEmailPasswordSession(email, password);

        return session;

    } catch (error) {
        throw new Error(error);
    }
}