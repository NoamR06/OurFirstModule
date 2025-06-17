const _ = require('lodash');

export class InMemoryStorage{
    constructor(){
        let data_saver = {};
    }

    create(collectionName, item){
        let newObject = item;
        const generated_uuid = crypto.randomUUID();
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
    where(collectionName, where){
        let collection = this.data_saver[collectionName];
        let data_to_return = [];
        collection.forEach(item => {
            if (_.isEqual(item, where)){
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

export class InMemorySharedStorage{
    constructor(){
        let data_saver = [];
    }

    create(item){
        let newObject = item;
        const generated_uuid = crypto.randomUUID();
        newObject._uid = generated_uuid;
        data_saver.push(newObject);
        return newObject;
    }
    find(collectionName, findFunc){
        let collection = this.data_saver;
        let data_to_return = [];
        collection.forEach(item => {
            if (findFunc(item)){
                data_to_return.push(item);
            }
        });
        return data_to_return;
    }
    where(collectionName, where){
        let collection = this.data_saver;
        let data_to_return = [];
        collection.forEach(item => {
            if (_.isEqual(item, where)){
                data_to_return.push(item);
            }
        });
        return data_to_return;
    }
    remove(collectionName, findFunc){
        let collection = this.data_saver;
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
        this.data_saver = data_to_save;
        return data_to_remove;
    }
}