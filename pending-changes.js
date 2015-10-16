var __TOTAL_PENDING_CHANGES__ = '__TOTAL_PENDING_CHANGES__';

PendingChanges = class PendingChanges {
    constructor(collection) {
        if (! (collection instanceof Mongo.Collection) )
            throw new Error('collection must be a Mongo.Collection');

        this._collection = collection;
        this._pendingChanges = new ReactiveDict();

        this._collection.before.insert( this._beforeChange.bind(this) );
        this._collection.after .insert( this._afterChange .bind(this) );
        this._collection.before.update( this._beforeChange.bind(this) );
        this._collection.after .update( this._afterChange .bind(this) );
        this._collection.before.remove( this._beforeChange.bind(this) );
        this._collection.after .remove( this._afterChange .bind(this) );
    }

    _beforeChange(userId, doc) {
        if (!doc._id)
            doc._id = Random.id();

        //console.log('before write', doc._id);
        this._incPendingChanges(doc._id);
        this._incPendingChanges(__TOTAL_PENDING_CHANGES__);
    }

    _afterChange(userId, doc) {
        //console.log('after write', doc._id);
        this._decPendingChanges(doc._id);
        this._decPendingChanges(__TOTAL_PENDING_CHANGES__);
    }
    _incPendingChanges(id) {
        if (this._pendingChanges.get(id))
            this._pendingChanges.set(id, pendingChanges.get(id) + 1);

        this._pendingChanges.set(id, 1);
    }

    _decPendingChanges(id) {
        if (!this._pendingChanges.get(id))
            throw new Error('cannot decrease pending writes for id: ' + id);

        setTimeout(() =>
        this._pendingChanges.set(id, this._pendingChanges.get(id) - 1)
            , 1000);
    }

    get(id) {
        return this._pendingChanges.get(id);
    }

    getTotal() {
        return this._pendingChanges.get(__TOTAL_PENDING_CHANGES__);
    }
}

PendingChanges = PendingChanges;
