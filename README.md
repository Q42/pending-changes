# pending-changes
Keep track of pending changes on collections

This package uses `matb33:collection-hooks` to keep track of outstanding inserts/updates and removes. Internally, it keeps a `reactive-dict` to track each modified document by id. It does that by *increasing* a number when the insert/update/remove is initiated and it *decreases* that number again when the modification is confirmed (ie. when the callback returns). When the number of outstanding modifications reaches 0, you know that there are no pending changes anymore.

### Create the monitor 
```
var test = new Mongo.Collection('test'); 
var pendingChanges = new PendingChanges(test);

```

### Read out the current status reactively
```
Template.myTemplate.helpers({
	hasPendingChanges function(documentId) {
		return pendingChanges.get(documentId) > 0;
	}
})
```

### API
#### new PendingChanges()

Create a new monitor object to keep track of changes on **\<collection\>**

`var changes = new PendingChanges(<collection>);`

#### PendingChanges.get(<documentId>)
Read out the current # of pending changes for **\<document>**:

`changes.get(<documentId>)` *reactive source*

#### PendingChanges.getTotal()
Read out the current # of pending changes for all documents in the collection:

`changes.getTotal()` *reactive source*

