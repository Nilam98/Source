
$(document).ready(function () {
  
  'use strict';

  ///////////////////////////////////////
  //  for modal code                  //
  ///////////////////////////////////////
  $('#myModal').on('shown.bs.modal', function () {
    $('#myInput').focus()
  })

  ///////////////////////////////////////
  //  Global variable                  //
  ///////////////////////////////////////
  var 
  	$formInformation = $('#form-information'),
  	$enterID = $('.ids'),
  	$enterFirstName = $('.firstname'),
  	$enterLastName = $('.lastname'),
  	$enterLPhone = $('.phone'),
  	$enterEmail = $('.email'),
  	$enterAddress = $('.address'),
  	$enterBirthday = $('.birthday'),
  	$enterGender = $('input[name="gender"]:checked');
  
  // Create a constructor
  function User(id, firstname, lastname, phone, email, birthday, address, gender, job) {
    this.id = id
    this.firstname = firstname
    this.lastname = lastname
    this.phone = phone
    this.email = email
    this.birthday = birthday
    this.address = address
    this.gender = gender
    this.job = job
  }

  // global variable
  var operation = "A"; //"A"=Adding; "E"=Editing 
  var selected_index = -1; //Index of the selected list item 
  var tableStore = localStorage.getItem("tableStore"); //Retrieve the stored data 
  tableStore = JSON.parse(tableStore); //Converts string to object
  if (tableStore == null){
    tableStore = [];
  }
  /**
   * @return {String} Representation of User in JSON Sringified
   */
  User.prototype.serialize = function() {
    return JSON.stringify(this)
  }

  /**
   * @return {String} Representation of User in DOM
   */
  User.prototype.renderToDOM = function() {
    return(
      "<tr>"
        + "	<td>" + this.id + "</td>"
        + "	<td>" + this.firstname + "</td>"
        + "	<td>" + this.lastname + "</td>"
        + "	<td>" + this.phone + "</td>"
        + "	<td>" + this.email + "</td>" 
        + "	<td>" + this.birthday + "</td>" 
        + "	<td>" + this.address + "</td>"
        + "	<td>" + this.gender + "</td>"
        + "<td><div class='btn btn-success btn-edit' data-id="+this.id+" data-target='#myModal' data-toggle='modal'>Edit</div><div class='btn btn-danger btn-delete' data-id="+this.id+">Delete</div></td>" 
      + "</tr>"
    )
  }

  function addUser(tableStore, user) {
    tableStore.push(user);
  }

  /**
   * @return {User} Representation of User
   */
  function readUserFromDOM() {
    var user = new User(
      $enterID.val(),
      $enterFirstName.val(),
      $enterLastName.val(),
      $enterLPhone.val(),
      $enterEmail.val(),
      $enterBirthday.val(),
      $enterAddress.val(),
      $('input[name="gender"]:checked').val(),
      "Undetermine"
    )
    return user
  }
  /**
   * 
   * @param {Array} tableStore To be updated with new User inforation
   * @param {Object} user User information to be saved
   */
  function editUser(tableStore, user) {
    tableStore[tableStore] = user
    operation = "A"
  }
  // delete user's information
  function deleteUserInfor() {
    tableStore.splice(selected_index, 1);
    localStorage.setItem("tableStore",
    JSON.stringify(tableStore));
    alert("store deleted.");
  }

  /**
   * renderDataUser() append data into html code
   */
  function renderDataUser() {
    for (var i in tableStore) {
      var table = JSON.parse(tableStore[i]);
      var userToRender = new User(
        table.id, 
        table.firstname,
        table.lastname,
        table.phone,
        table.email,
        table.address,
        table.birthday,
        table.gender
      )
      // append data into tbody
      $("#table-list tbody").append(userToRender.renderToDOM());
    }
  }

  // handle when click edit button
  $( "#table-list tbody" ).on( "click", ".btn-edit", function() {
    operation = "E";

    for (var i in tableStore) {
      var temp = JSON.parse(tableStore[i])
      if ($(this).attr("data-id") === temp.id) {
        $enterID.val(temp.id);
        $enterFirstName.val(temp.firstname);
        $enterLastName.val(temp.lastname);
        $enterLPhone.val(temp.phone);
        $enterEmail.val(temp.email);
        $enterAddress.val(temp.address);
        $enterBirthday.val(temp.birthday);
        $enterGender.val(temp.gender);
        $enterID.attr("readonly", "readonly");
        $enterFirstName.focus();
      }
    }

  });

  // handle when click delete button
  $( "#table-list tbody" ).on( "click", ".btn-delete", function() {
    selected_index = parseInt($(this).attr("data-id").replace("Delete", ""));
    $(this).parents('tr').remove()
    deleteUserInfor();
  });

  // handle submit action
  $(".form-information").on("click", ".btn-save-change", function () {
    if (operation == "A"){
      var newUser = readUserFromDOM();
      addUser(tableStore, newUser.serialize());
      localStorage.setItem("tableStore", JSON.stringify(tableStore));
    }
    else {
      var editingUser = readUserFromDOM();
      editUser(tableStore, editingUser.serialize());
      localStorage.setItem("tableStore", JSON.stringify(tableStore));
    }
  });

  renderDataUser()
})
