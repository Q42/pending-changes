
PendingChanges = class PendingChanges {
    constructor(collection) {
        if (! (collection instanceof Mongo.Collection) )
            throw new Error('collection must be a Mongo.Collection');

        this._collection = collection;
        this._pendingChanges = new ReactiveDict();
        this._totalPendingChanges = new ReactiveVar(0);

        this._collection.before.insert( this._beforeChange.bind(this) );
        this._collection.after .insert( this._afterChange .bind(this) );
        this._collection.before.update( this._beforeChange.bind(this) );
        this._collection.after .update( this._afterChange .bind(this) );
        this._collection.before.remove( this._beforeChange.bind(this) );
        this._collection.after .remove( this._afterChange .bind(this) );
    }

    _beforeChange(userId, doc) {
        if (!_.has(doc, '_id')) {
            console.warn("To track changes an _id field is required");
        }

        //console.log('before write', doc._id);

        this._incPendingChanges(doc._id);
        this._totalPendingChanges.set(this._totalPendingChanges.get() + 1);
    }

    _afterChange(userId, doc) {
        //console.log('after write', doc._id);

        this._decPendingChanges(doc._id);
        this._totalPendingChanges.set(this._totalPendingChanges.get() - 1);
    }

    _incPendingChanges(id) {
        if (this._pendingChanges.get(id))
            this._pendingChanges.set(id, this._pendingChanges.get(id) + 1);

        this._pendingChanges.set(id, 1);
    }

    _decPendingChanges(id) {
        if (this._pendingChanges.get(id))
            this._pendingChanges.set(id, this._pendingChanges.get(id) - 1)
    }

    get(documentId) {
        if ( documentId === undefined || documentId === null )
            return this._totalPendingChanges.get();

        return this._pendingChanges.get( documentId );
    }
};

var monitors = PendingChanges._monitors = {};

Mongo.Collection.prototype.hasPendingChanges = function(documentId) {
    var m = monitors[this._name] ?  monitors[this._name] : monitors[this._name] = new PendingChanges(this);

    return m.get(documentId);
};
