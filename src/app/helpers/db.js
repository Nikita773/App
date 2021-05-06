import { firebaseConfig } from '../configs/firebaseConfig';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import { EventEmitter } from './event-emmiter';
require('../components/notification/notification');

class DataBase extends EventEmitter {
    constructor() {
        super();
        this.init();
    }

    init() {
        this.firebase = firebase.initializeApp(firebaseConfig);
        this.db = firebase.firestore();
    }

    setData(name_db, name_doc, value) {
        this.db.collection(name_db).doc(name_doc).set(value)
            .then(function() {
                $().notification({ type: 'success', text: 'Your task was successfully saved!', showTime: 5000 });
            })
            .catch(function(error) {
                $().notification({ type: 'error', text: 'Unable to save your task. Try again later!', showTime: 5000 });
            });

        this.db.collection(name_db).onSnapshot((querySnapshot) => {
            this.emit('Data changed');
        });
    }

    updateData(name_db, name_doc, value, type) {
        this.db.collection(name_db).doc(name_doc).update(value)
            .then(function() {
                if (type === 'settings') {
                    $().notification({ type: 'success', text: 'Settings was successfully saved!', showTime: 5000 });
                } else if (type === 'toDaily') {
                    $().notification({ type: 'info', text: 'You task was moved to the daily task lists!', showTime: 5000 });
                } else {
                    $().notification({ type: 'success', text: 'Your task was successfully saved!', showTime: 5000 });
                }
            })
            .catch(function(error) {
                if (type === 'settings') {
                    $().notification({ type: 'error', text: 'Unable to save settings. Try again later!', showTime: 5000 });
                } else if (type === 'toDaily') {
                    $().notification({ type: 'error', text: 'Unable to move to the daily task list. Try again later!', showTime: 5000 });
                } else {
                    $().notification({ type: 'error', text: 'Unable to save your task. Try again later!', showTime: 5000 });
                }
            });
        this.db.collection(name_db).onSnapshot((querySnapshot) => {
            this.emit('Data changed');
        });
    }

    completeTaskUpdateData(name_db, name_doc, value, type) {
        this.db.collection(name_db).doc(name_doc).update(value)
            .then(function() {
                if (type === 'Long break warning') {
                    $().notification({ type: 'warning', text: 'Long break started, please have a rest!', showTime: 5000 });
                } else {
                    $().notification({ type: 'success', text: 'You finished pomodoro!', showTime: 5000 });
                }
            })
            .catch(function(error) {
                $().notification({ type: 'error', text: 'Unable to mark pomodoro/task as completed. Try again later!', showTime: 5000 });
            });
    }

    deleteData(name_db, name_doc) {
        if (typeof name_doc !== 'string') {
            name_doc.forEach((item) => {
                this.db.collection(name_db).doc(item).delete()
                    .catch(function(error) {
                        $().notification({ type: 'error', text: 'Unable to remove task. Try again later!', showTime: 5000 });
                    });
            });
            $().notification({ type: 'success', text: 'Your tasks was successfully removed!', showTime: 5000 });

            this.emit('Data changed');
        } else {
            this.db.collection(name_db).doc(name_doc).delete()
                .then(function() {
                    $().notification({ type: 'success', text: 'Your task was successfully removed!', showTime: 5000 });
                })
                .catch(function(error) {
                    $().notification({ type: 'error', text: 'Unable to remove task. Try again later!', showTime: 5000 });
                });
            this.emit('Data changed');
        }
    }

    async getData(name_db, name_doc) {
        if (name_doc) {
            const cityRef = this.db.collection(name_db).doc(name_doc);
            const doc = await cityRef.get();
            return doc.data();
        } else {
            const cityRef = this.db.collection(name_db);
            const docs = await cityRef.get();
            const result = [];
            docs.forEach(doc => {
                result.push(doc.data());
            });
            return result;
        }
    }
}

export default new DataBase();