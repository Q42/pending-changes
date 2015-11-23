# q42:pending-changes
Let's your know when there are pending changes (inserts/updates and removes) on individual documents and collections as a whole. ie. when the change hasn't been confirmed by the server yet.

See this [demo](http://demo-pending-changes.meteor.com/), which has an artificially induced delay of 3 seconds.

## Install

`$ meteor add q42:pending-changes`

## Usage 

Say you have a collection of tasks:

```
Tasks = new Mongo.Collection('tasks');

```

The tasks are displayed as a list of tasks


```
<ul>
  {{#each tasks}}
    {{> task}}
  {{/each}}
</ul>

```

```
<template name="task">
  <li>
    {{text}}
    
    {{#if isSaving }}
        <span style="background-color: yellow; font-size: 80%;">saving...</span>
    {{/if}}
  </li>
</template>
```

Check if the task has pending changes:

```
  Template.task.helpers({
    isSaving: function() {
      return Tasks.hasPendingChanges(this._id);
    }
  });
```

## API

#### \<collection\>.hasPendingChanges(\<id>)
Check if the specified document has outstanding changes, ie updates that have not been confirmed by the server.

#### \<collection\>.hasPendingChanges()
If no id is passed, check if \<collection> as a whole has any outstanding changes, ie updates that have not been confirmed by the server.

## How it works
Internally, it keeps a `reactive-dict` to track each modified document by id. It does that by *increasing* a number when the insert/update/remove is initiated and it *decreases* that number again when the modification is confirmed (ie. when the callback returns). When the number of outstanding modifications reaches 0, you know that there are no pending changes anymore.

## _id required
This package uses the _id field to track indiviual documents. This means that to track inserts you'll need to pass an _id field when inserting. For example:

```
Tasks.insert({
  _id : Random.id(),
  text: text
});
```

## Version history

v0.0.4


- `get()` and `getTotal()` have been merged into 1 `get()` method. It reports the total # of changes when `undefined` or `null` is passed
- pending changes is only reported as a boolean instead of the # of pending changes
- add method to Mongo.Collection: `.hasPendingChanges()` This is the only api you'll need
- log warning if document is not trackable (no _id)
- move total # of pending changes per collection out of the dictionary and use a ReactiveVar instead

v0.0.3

First working public version
