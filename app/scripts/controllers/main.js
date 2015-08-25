'use strict';

/**
 * @ngdoc function
 * @name ngZenefitsNotesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngZenefitsNotesApp
 */
angular.module('ngZenefitsNotesApp')
.controller('MainCtrl', function($scope) {
    $scope.notes = [];

    var Note = function(text, date) {
        this.editMode = false;
        this.text = text || "";
        this._text = text || ""; // Temporary text field for edits
        this.deleteMode = false; // Used for deleting
        this.date = date || moment().format('MMMM Do YYYY, h:mm:ss a');
        
        return {
            text: this.text,
            date: this.date,
            _text: this._text,
            editMode: this.editMode
        }
    };
    
    $scope.saveToLocalStorage = function() {
        localStorage.setItem('ng-zenefits-notes', JSON.stringify($scope.notes));
    };
    
    $scope.onSaveButtonClick = function() {
        var text = $('#newNote').val();
        var newNote = new Note(text);
        $scope.notes.push(newNote);    
        $scope.saveToLocalStorage();  // save to localstorage
        $('#newNote').val("");  // reset input
    };
    
    $scope.onEditButtonClick = function(note, text) {
        if (note.editMode) {
            note.text = text;
            note._text = text;
            note.date = moment().format('MMMM Do YYYY, h:mm:ss a');
        }
        
        note.editMode = !note.editMode;
        $scope.saveToLocalStorage();   
    }
    
    $scope.onCancelEditButton = function(note) {
        note.editMode = !note.editMode;
    }
    
    $scope.onDeleteButtonClicked = function(note) {
        note.deleteMode = !note.deleteMode;
    }
    
    $scope.onConfirmDeleteButtonClicked = function(note) {
        _.remove($scope.notes, function(n) {
            return n === note;
        });
        note.deleteMode = !note.deleteMode;
        $scope.saveToLocalStorage();   
    }
    
    var savedNotes = JSON.parse(localStorage.getItem('ng-zenefits-notes'));
    if (savedNotes && savedNotes.length > 0) {
        
        // Rehydrate notes
        for (var i = 0; i < savedNotes.length; i++) {
            var text = savedNotes[i].text;
            var date = savedNotes[i].date;
            var newNote = new Note(text, date);   
            $scope.notes.push(newNote);
            $scope.saveToLocalStorage(); 
        }
    }
});
