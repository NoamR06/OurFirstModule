const _ = require('lodash');
import { v4 as uuidv4 } from 'uuid';


export class InMemoryStorage{
    constructor(){
        let data_saver = {};
    }

    create(collectionName, item){
        let newObject = item;
        const generated_uuid = uuidv4();
        newObject._uid = generated_uuid;
        if (!(data_saver[typeof(item)][collectionName] === Array()))
            data_saver[typeof(item)][collectionName] = [];
        data_saver[typeof(item)][collectionName].push(newObject);
        return newObject;
    }
    find(collectionName, findFunc){
        const values = Object.values(this.data_saver);
        let data_to_return = [];
        for (let value in values){
            if (value[collectionName] === Array()){
                collection.forEach(item => {
                    if (findFunc(item))
                        data_to_return.push(item);
        });
            }}
        return data_to_return;
    }
    #isEqual(obj1, obj2){
        if (obj1 === obj2)
            return true;

        if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null)
            return false;

        const obj1_keys = Object.keys(obj1);
        const obj2_keys2 = Object.keys(obj2);

        if (keys1.length !== keys2.length)
            return false

        for (let key of keys1) {
            if (!obj2.hasOwnProperty(key) || !isEqual(obj1[key], obj2[key]))
                return false;
        }

         return true;
    }
    where(collectionName, where){
        let collection = this.data_saver[typeof(where)][collectionName];
        let data_to_return = [];
        collection.forEach(item => {
            if (this.#isEqual(item, where)){
                data_to_return.push(item);
            }
        });
        return data_to_return;
    }
    remove(collectionName, findFunc){
        const values = Object.values(this.data_saver);
        let data_to_remove = [];
        for (let value in values){
            let data_to_save = [];
            if (value[collectionName] === Array()){
                collection.forEach(item => {
                    if (findFunc(item)){
                        data_to_remove.push(item);
                    }
                    else{
                        data_to_save.push(item)
                    }
                });
                value[collectionName] = data_to_save;
            }}
        return data_to_remove;
    }
}


export class InMemorySharedStorage{
    constructor(){
        let data_saver = {};
    }

    create(collectionName, item){
        let newObject = item;
        const generated_uuid = uuidv4();
        newObject._uid = generated_uuid;
        data_saver[collectionName].push(newObject);
        return newObject;
    }
    find(collectionName, findFunc){
        let collection = this.data_saver[collectionName];
        let data_to_return = [];
        collection.forEach(item => {
            if (findFunc(item)){
                data_to_return.push(item);
            }
        });
        return data_to_return;
    }
    #isEqual(obj1, obj2){
        if (obj1 === obj2)
            return true;

        if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null)
            return false;

        const obj1_keys = Object.keys(obj1);
        const obj2_keys2 = Object.keys(obj2);

        if (keys1.length !== keys2.length)
            return false

        for (let key of keys1) {
            if (!obj2.hasOwnProperty(key) || !isEqual(obj1[key], obj2[key]))
                return false;
        }

         return true;
    }
    where(collectionName, where){
        let collection = this.data_saver[collectionName];
        let data_to_return = [];
        collection.forEach(item => {
            if (this.#isEqual(item, where)){
                data_to_return.push(item);
            }
        });
        return data_to_return;
    }
    remove(collectionName, findFunc){
        let collection = this.data_saver[collectionName];
        let data_to_remove = [];
        let data_to_save = [];
        collection.forEach(item => {
            if (findFunc(item)){
                data_to_remove.push(item);
            }
            else{
                data_to_save.push(item)
            }
        });
        this.data_saver[collectionName] = data_to_save;
        return data_to_remove;
    }
}