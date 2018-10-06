import firebase from 'firebase';

export class AuthProvider {
    signup(email: string, password: string) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }
}