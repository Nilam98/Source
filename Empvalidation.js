$(function(){
	
	  $("#openModel").click(function(){
		$("#empModal").modal({backdrop: "static"});
	  });
	

	var $employeeform=$("#MyForm");
	if($employeeform.length){
		$employeeform.validate({
			rules:{
				fname:{
					required:true
				},
				lname:{
					required:true
				},
				gender:{
					required:true
				},
				skill:{
					required:true
				},
				designation:{
					required:true
				},
				Hobbies:{
					required:true
				}

			},
			message:{
				fname:{
					required:"First name is Required!"
				},
				lname:{
					required:"Last name is Required!"
				},
				gender:{
					required:"please select gender!"
				},
				skill:{
					required:"please enter Skill!"
				},
				designation:{
					required:"please select designation!"
				},
				Hobbies:{
					required:"please select Hobbies!"
				}
			},
			errorPlacement:function(error,element){
				if(element.is(":radio")){
					error.appendTo(element.parents(".gender"));
				} 
				else if(element.is(":checkbox")){
					error.appendTo(element.parents(".Hobbies"));
				}else{
					error.insertAfter(element);
				}
			}
		})
	}
})

// $(document).ready(function() {

// 	$('#MyForm').submit(function(e) {
// 	  e.preventDefault();
// 	  var first_name = $('#fname').val();
// 	  var last_name = $('#lname').val();
	
  
// 	  $(".error-container").remove();
  
// 	  if (first_name.length < 2) {
// 		$('#fname').after('<span class="error">This field is required</span>');
// 	  }
// 	  if (last_name.length < 2) {
// 		$('#lname').after('<span class="error">This field is required</span>');
// 	  }
	  

// 	});
  
//   });