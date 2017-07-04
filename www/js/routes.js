angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('tabsController.myProlife', {
    url: '/myprofile',
    views: {
      'tab1': {
        templateUrl: 'templates/myProlife.html',
        controller: 'myProlifeCtrl'
      }
    }
  })
	
      .state('tabsController.myRecord', {
    url: '/myrecord',
    views: {
      'tab1': {
        templateUrl: 'templates/myRecord.html',
        controller: 'myRecordCtrl'
      }
    }
  })	

  .state('tabsController.grantAccessList', {
    url: '/grantaccesslist',
    views: {
      'tab1': {
        templateUrl: 'templates/grantAccessList.html',
        controller: 'grantAccessListCtrl'
      }
    }
  })

  .state('tabsController.grantAccessTo', {
    url: '/grantaccess',
    views: {
      'tab1': {
        templateUrl: 'templates/grantAccessTo.html',
        controller: 'grantAccessToCtrl'
      }
    }
  })

  .state('tabsController.recordsViewingList', {
    url: '/recordsviewinglist',
    views: {
      'tab1': {
        templateUrl: 'templates/recordsViewingList.html',
        controller: 'recordsViewingListCtrl'
      }
    }
  })

  .state('tabsController.shareRecordsTo', {
    url: '/sharerecords',
    views: {
      'tab1': {
        templateUrl: 'templates/shareRecordsTo.html',
        controller: 'shareRecordsToCtrl'
      }
    }
  })

  .state('tabsController.peopleGrantedMeAccess', {
    url: '/peoplegrantmeaccess',
    views: {
      'tab2': {
        templateUrl: 'templates/peopleGrantedMeAccess.html',
        controller: 'peopleGrantedMeAccessCtrl'
      }
    }
  })

  .state('tabsController.granterProfile', {
    url: '/granterprofile',
    views: {
      'tab2': {
        templateUrl: 'templates/granterProfile.html',
        controller: 'granterProfileCtrl'
      }
    }
  })

  .state('tabsController.peopleShareMeRecords', {
    url: '/peoplesharemerecords',
    views: {
      'tab3': {
        templateUrl: 'templates/peopleShareMeRecords.html',
        controller: 'peopleShareMeRecordsCtrl'
      }
    }
  })

  .state('tabsController.sharedProfile', {
    url: '/sharedprofile',
    views: {
      'tab3': {
        templateUrl: 'templates/sharedProfile.html',
        controller: 'sharedProfileCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/medapp',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/loginpage',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/signuppage',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('tabsController.addRecord', {
    url: '/addrecord',
    views: {
      'tab1': {
        templateUrl: 'templates/addRecord.html',
        controller: 'addRecordCtrl'
      }
    }
  })

  .state('tabsController.addRecord2', {
    url: '/addrecordfor',
    views: {
      'tab2': {
        templateUrl: 'templates/addRecord2.html',
        controller: 'addRecord2Ctrl'
      }
    }
  })

  .state('tabsController.editRecord', {
    url: '/editrecord',
    views: {
      'tab1': {
        templateUrl: 'templates/editRecord.html',
        controller: 'editRecordCtrl'
      }
    }
  })

  .state('tabsController.editRecord2', {
    url: '/editrecordfor',
    views: {
      'tab2': {
        templateUrl: 'templates/editRecord2.html',
        controller: 'editRecord2Ctrl'
      }
    }
  })
	
  .state('tabsController.permissionType', {
    url: '/permissionType',
    views: {
      'tab1': {
        templateUrl: 'templates/permissionType.html',
        controller: 'permissionTypeCtrl'
      }
    }
  })

  .state('tabsController.signOut', {
    url: '/singout',
    views: {
      'tab4': {
        templateUrl: 'templates/signOut.html',
        controller: 'signOutCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/loginpage')


});