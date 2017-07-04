angular.module('app.controllers', [])
  
.controller('myProlifeCtrl', function($scope, $http, $state,$ionicHistory) {
	var token = localStorage.getItem("token");
	var link = 'http://223.17.247.79//includes/list_record.php';

	$http.post(link, {token}).then(function (response){
	$scope.names = response.data.records;
	});
	
	
	
	$scope.Edit =function(RID){
		
		localStorage.setItem("myProfileRID", RID);
	    $state.go('tabsController.myRecord');
	}
	
})

.controller('myRecordCtrl', function($scope, $http, $state) {
	var token = localStorage.getItem("token");
	var link = 'http://223.17.247.79//includes/list_single_record.php';
	var RID = localStorage.getItem("myProfileRID");
	var dellink = 'http://223.17.247.79//includes/delete_record.php';
	var viewerlink = 'http://223.17.247.79//includes/list_recordviewers.php';

	$http.post(link, {token, RID}).then(function (response){
	$scope.names = response.data.records;
	$ionicHistory.nextViewOptions({
						disableAnimate: true,
						disableBack: true
					});	
	});
	
	$http.post(viewerlink, {token, RID}).then(function (response2){
	$scope.viewers = response2.data.records2;
	$ionicHistory.nextViewOptions({
						disableAnimate: true,
						disableBack: true
					});	
	});
	
	$scope.Edit =function(RID){
	    $state.go('tabsController.editRecord');
	}
	$scope.Share =function(RID){
		var RID = localStorage.getItem("myProfileRID");
	    $state.go('tabsController.shareRecordsTo');
	}
	$scope.Delete =function(){
		var confirm = prompt("Please type 'delete' to confirm delete...");
		if (confirm == 	"delete") {
		$http.post(dellink, {token, RID}).then(function (response){
		});
		}
	    $state.go('tabsController.myProlife');
	}
})
   
.controller('grantAccessListCtrl', function($scope, $http,$state) {
	var token = localStorage.getItem("token");
	var link = 'http://223.17.247.79//includes/list_peopleIgranted.php';
	var revokelink = 'http://223.17.247.79//includes/revoke_test.php';

	$http.post(link, {token}).then(function (response){
	$scope.names = response.data.records;
	});
	
	$scope.revokedisable =function(status){
		if(status == "Expired"){
			return true;
		}else{
			return false;
		}
	};
	
	$scope.buttontext =function(status){
		if(status == "Expired"){
			return "Expired";
		}else{
			return "Revoke";
		}
	};	
	
	$scope.submit =function(accessid){
		$http.post(revokelink, {token,accessid}).then(function (){
		});
		$state.reload();
	}
})
   
.controller('grantAccessToCtrl', function($scope, $http,$state) {
	$scope.data = {};
	
	$scope.submit = function(){
	var link = 'http://223.17.247.79//includes/grant_access_test.php';
	var token = localStorage.getItem("token");
		$http.post(link, {email_receiver : $scope.data.email, expired_date : $scope.data.date, token}).then(function (res){
		$scope.response = res.data;
	//    $state.go('tabsController.grantAccessList');
		$scope.data = {};
	//    $state.go('tabsController.myProlife');			
		});
	};
})
   
.controller('recordsViewingListCtrl', function($scope, $http,$state) {
	var token = localStorage.getItem("token");
	var link = 'http://223.17.247.79//includes/list_RecordIShared.php';
	var revokelink = 'http://223.17.247.79//includes/revoke_share.php';

	$http.post(link, {token}).then(function (response){
	$scope.names = response.data.records;
	});
	
	$scope.revokedisable =function(status){
		if(status == "Expired"){
			return true;
		}else{
			return false;
		}
	};
	
	$scope.buttontext =function(status){
		if(status == "Expired"){
			return "Expired";
		}else{
			return "Revoke";
		}
	};		
	
	$scope.submit =function(pid){
		$http.post(revokelink, {token,pid}).then(function (){
		$state.reload();
		});
	}
})
   
.controller('shareRecordsToCtrl', function($scope, $http, $state,$ionicHistory) {
	var token = localStorage.getItem("token");
		//no back option
	/*
	var link = 'http://223.17.247.79//includes/list_record.php';
	$http.post(link, {token}).then(function (response){
	$scope.names = response.data.records;
	});	*/
/*
    $scope.checkAll = function()
    { 
		alert($scope.check);
    };
	*/
	
	$scope.data = {};
	$scope.submit = function(){
		$ionicHistory.nextViewOptions({
			disableBack: true
		});
		var link = 'http://223.17.247.79//includes/share_my_record_test.php';
		var token = localStorage.getItem("token");
		var RID = localStorage.getItem("myProfileRID");
		$http.post(link, {email_receiver : $scope.data.email, RID, token}).then(function (res){
		$scope.response = res.data;
		$scope.data = {};
		$state.go('tabsController.myProlife');			
		});
	};
})
   
.controller('peopleGrantedMeAccessCtrl', function($scope, $http,$ionicPopup, $state) {
	var token = localStorage.getItem("token");
	var link = 'http://223.17.247.79//includes/listofpeoplegrantme.php';
	
	$http.post(link, {token}).then(function (response){
	$scope.peoplegrantedme = response.data.records;
	});
	
	$scope.access =function(UID_granter, AID){
		localStorage.setItem("granter_id", UID_granter);
		localStorage.setItem("AID", AID);
		var historylink = 'http://223.17.247.79//includes/accesshistory_test.php';
	    $http.post(historylink, {token, UID_granter, AID}).then(function (res){	
			$scope.response = res.data.result;
			if($scope.response.success=="1"){

				$scope.title="Accessing with ID: " + AID;
				$scope.template="Notification has been sent to the profile user...";
				
				//no back option

//				$state.go('tabsController.myProlife', {}, {location: "replace", reload: true});
				$state.go('tabsController.granterProfile', {}, {reload: true});
				

			}else if($scope.response.wrong=="1"){
				$scope.title="Wrong AID";
				$scope.template="Cannot access this profile";

			}else{
				$scope.title="Expired";
				$scope.template="You can no longer access this profile";
			}

			var alertPopup = $ionicPopup.alert({
					title: $scope.title,
					template: $scope.template
			});
//		$state.go('tabsController.granterProfile');
		});	
	}
	
})
   
.controller('granterProfileCtrl', function($scope, $http, $state) {
	var token = localStorage.getItem("token");
	var link = 'http://223.17.247.79//includes/granter_list_record.php';
	var granter_id = localStorage.getItem("granter_id");
	
	$http.post(link, {token, granter_id}).then(function (response){
	$scope.granterprofile = response.data.records;
	});

	$scope.Edit =function(RID){
		localStorage.setItem("GrantedRID", RID);
//		alert(RID);
	    $state.go('tabsController.editRecord2');
	}
})
   
.controller('peopleShareMeRecordsCtrl', function($scope, $http, $state) {
	var token = localStorage.getItem("token");
	var link = 'http://223.17.247.79//includes/viewableusers.php';
	
	$http.post(link, {token}).then(function (response){
	$scope.peoplegrantedme = response.data.records;
	});
	
	$scope.access =function(UID_granter){
		localStorage.setItem("granter_id", UID_granter);
		var historylink = 'http://223.17.247.79//includes/viewhistory_test.php';
		alert("Notification has been sent for viewing activity..");
	    $http.post(historylink, {token, UID_granter}).then(function (res){	
			$scope.response = res.data.result;
			$state.go('tabsController.sharedProfile');
		});	
	}
	
})
   
.controller('sharedProfileCtrl', function($scope, $http, $state) {
	var token = localStorage.getItem("token");
	var UID_granter = localStorage.getItem("granter_id");
	var link = 'http://223.17.247.79//includes/viewableusersRecords.php';
	
	$http.post(link, {token,UID_granter}).then(function (response){
	$scope.peoplegrantedme = response.data.records;
	});
	
})
      
.controller('loginCtrl', function($scope,$http,$ionicPopup,$state,$ionicHistory) {
		$scope.data = {};
		$scope.login=function(data){

		//	alert('html button test');

		var link = 'http://223.17.247.79//includes/process_login_test.php';
		$http.post(link, {email : $scope.data.email, ps : $scope.data.password}).then(function (res){	
			$scope.response = res.data.result;
			
			//testing response from php
/*			$scope.title = $scope.response.myEmail;
			$scope.template = $scope.response.myPassword;
			
			var alertPopup = $ionicPopup.alert({
					title: $scope.title,
					template: $scope.template
			}); */

			if($scope.response.success=="1"){
				
				$scope.token = $scope.response.sessionID;
				
				$scope.title="Logged In";
				$scope.template="Welcome Back.";
				localStorage.setItem("token", $scope.token);
//				var localtoken = localStorage.getItem("token");
//				$scope.template=localtoken;
				
				//no back option
				$ionicHistory.nextViewOptions({
					disableAnimate: true,
					disableBack: true
				});
				$state.go('tabsController.myProlife', {}, {location: "replace", reload: true});

			}else if($scope.response.invitednew=="1"){
				$scope.title="Welcome Guest";
				$scope.template="Please create an account with this Email";
			
			}else if($scope.response.empty=="1"){
				$scope.title="No Value...";
				$scope.template="Please enter Email and Password";
			}else if($scope.response.new=="1"){
				$scope.title="Welcome Guest";
				$scope.template="Please create an account";
			}else if($scope.response.wrong=="1"){
				$scope.title="Wrong Password";
				$scope.template="Please check your Password";
			}
			
			var alertPopup = $ionicPopup.alert({
					title: $scope.title,
					template: $scope.template
			});
		});
	}
})
   
.controller('signupCtrl', function($scope,$http,$ionicPopup,$state,$ionicHistory) {
			$scope.data = {};
			$scope.signup=function(data){
			var link = "http://223.17.247.79//includes/registration_test.php";
			$http.post(link, {un: data.name, email : data.email, ps : data.password}).then(function (res){	
				$scope.response = res.data.result;
				
				if($scope.response.created=="1"){
					$scope.title="Account Created!";
					$scope.template="Your account has been successfully created!";
					
					//no back option
					$ionicHistory.nextViewOptions({
						disableAnimate: true,
						disableBack: true
					});
					$state.go('login', {}, {location: "replace", reload: true});
				
				}else if($scope.response.exists=="1"){
					$scope.title="Email Already exists";
					$scope.template="Please re-enter your Email";
				
				}else if($scope.response.nexists=="1"){
					$scope.title="Username Already exists";
					$scope.template="Please pick another username";
				
				}else if($scope.response.fieldnull=="1"){
					$scope.title="Field Empty";
					$scope.template="Please fill in all fields";
				
				}else{
					$scope.title="Failed";
					$scope.template="Contact Our Technical Team";
				}
				var alertPopup = $ionicPopup.alert({
						title: $scope.title,
						template: $scope.template
				});
			});
	}
})
   
.controller('addRecordCtrl', function($scope, $http,$state ) {
	$scope.data = {};
	$scope.submit = function(){
		var link = 'http://223.17.247.79//includes/add_record_ionic.php';
		var token = localStorage.getItem("token");
		$http.post(link, {Title : $scope.data.title, Descriptions : $scope.data.description, token}).then(function (res){
		$scope.response = res.data;
		$scope.data = {};
		//$scope.$apply();
		//$state.reload()
	    $state.go('tabsController.myProlife');
		});
	};
})
   
.controller('addRecord2Ctrl', function($scope, $http,$state ) {
	$scope.data = {};
	$scope.submit = function(){
		var link = 'http://223.17.247.79//includes/add_record_for_granter_ionic.php';
		var token = localStorage.getItem("token");
		var granter_id = localStorage.getItem("granter_id");
		var AID = localStorage.getItem("AID");
		$http.post(link, {Title : $scope.data.title, Descriptions : $scope.data.description, token, granter_id, AID}).then(function (res){
		$scope.response = res.data;
		$scope.data = {};
		//$scope.$apply();
		//$state.reload()
	    $state.go('tabsController.granterProfile');
		});
	};
})
   
.controller('editRecordCtrl', function($scope, $http,$state,$ionicHistory ) {
	$scope.data = {};

	//this will make myRecord page cannoot back ...
	var listlink = 'http://223.17.247.79//includes/list_single_record.php';
	var token = localStorage.getItem("token");
	var RID = localStorage.getItem("myProfileRID");
	$http.post(listlink, {token, RID}).then(function (response2){
	$scope.viewers = response2.data.records2;
	});

	
	$scope.submit = function(){
		var link = 'http://223.17.247.79//includes/edit_record_test.php';
		var token = localStorage.getItem("token");
		var RID = localStorage.getItem("myProfileRID");
		//no back option
		$ionicHistory.nextViewOptions({
			disableBack: true
		});
	//	alert("myProfileRID");
	//	alert(RID);
		$http.post(link, {Title : $scope.data.title, Descriptions : $scope.data.description, token, RID}).then(function (res){
		$scope.response = res.data;
		//$scope.$apply();
		//$state.reload()
		//state.go is necessary to prevent editing the same recrod after it is edited...
		$scope.data = {};
	    $state.go('tabsController.myProlife');
		});
	};
})
   
.controller('editRecord2Ctrl', function($scope, $http,$state ) {
	$scope.data = {};
	$scope.submit = function(){
		var link = 'http://223.17.247.79//includes/edit_granter_record_test.php';
		var token = localStorage.getItem("token");
		var RID = localStorage.getItem("GrantedRID");
//		alert("GrantedRID");
//		alert(RID);
		var granter_id = localStorage.getItem("granter_id");
		$http.post(link, {Title : $scope.data.title, Descriptions : $scope.data.description, token, granter_id, RID}).then(function (res){
		$scope.response = res.data;
		//$scope.$apply();
		//$state.reload()
		
			
		//state.go is necessary to prevent editing the same recrod after it is edited...
		$scope.data = {};
	    $state.go('tabsController.granterProfile');
		});
	};
})
   
.controller('permissionTypeCtrl', function($scope, $http,$state ) {
})

.controller('signOutCtrl', function($scope, $http,$state) {
	var link = 'http://223.17.247.79//includes/logout.php';
	
//	alert("test");
	$scope.submit =function(accessid){
		$http.post(link).then(function (){
		});
	    $state.go('login');
	}
})