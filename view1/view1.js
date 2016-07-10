'use strict';

angular.module('myApp.view1', ['ngRoute', 'firebase'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'view1/view1.html',
        controller: 'View1Ctrl'
    });
}])

.controller('View1Ctrl', ['$scope', '$firebaseArray', function ($scope, $firebaseArray) {
    //console.log('in');        
    var databaseRef = new Firebase('https://contactsa.firebaseio.com/');
    $scope.contacts = $firebaseArray(databaseRef);
    $scope.editFormDisplay = false;
    $scope.addFormDisplay = true;
    $scope.addContacts = function () {
        console.log('in');

        $scope.contacts.$add({
            name: $scope.name,
            email: $scope.email,
            phone: $scope.phone


        }).then(function () {
            $scope.name = '';
            $scope.email = '';
            $scope.phone = '';
        });

    }

    $scope.removeContact = function (contact) {

        $scope.contacts.$remove(contact);

    }

    $scope.editContact = function() {
        var id = $scope.id;

        var document = $scope.contacts.$getRecord(id);

        document.name = $scope.name;
        document.email = $scope.email;
        document.phone = $scope.phone;

        $scope.contacts.$save(document);
        $scope.name = '';
        $scope.email = '';
        $scope.phone = '';

    }

    $scope.displayEditContact = function (contact) {

        $scope.addFormDisplay = false;
        $scope.editFormDisplay = true;

        $scope.id = contact.$id;
        $scope.name = contact.name;
        $scope.email = contact.email;
        $scope.phone = contact.phone;
    }



            }]);