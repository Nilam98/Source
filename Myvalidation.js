
function myValidation(myform){
    // debugger
    var validdata=true;
    var myElements = $(myform).find(".Nat-required");
    $(myElements).each(function(){
        var mycontrol=$(this);
        var type=$(mycontrol)[0].type;
        var fname=$(mycontrol).val();
        alert(type);
        var regEmail= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        
        if($(mycontrol).next().hasClass("message-container")){
            $(mycontrol).next().remove();
        } 
        if(type=="text"){
            if($(mycontrol).val().trim()===""){
                var message=$(mycontrol).attr("error-message");
                var valueMessage= getMessage(message);
                
                $(mycontrol).after(valueMessage); 
                validdata=false; 
            } 
            $(this).keypress(function(){
                $(mycontrol).next().remove();
            })
            $(this).click(function(){
                $(mycontrol).next().remove();
            })
        }

        if(type=="email"){
            
            if($(mycontrol).val().trim()===""){
               
                var message=$(mycontrol).attr("error-message");
                var valueMessage= getMessage(message);
               
                $(mycontrol).after(valueMessage); 
                validdata=false; 
                
            }
            
           
             else if(!regEmail.test(mycontrol.val())){
                var message=$(mycontrol).attr("email-error");
                var valueMessage= getMessage(message);
                       
                $(mycontrol).after(valueMessage); 
                validdata=false;
             }

           
            $(this).keypress(function(){
                $(mycontrol).next().remove();
            }) 
           
        }
       

        if(type=="select-one"){
            if($(mycontrol).val().trim()==="Choose"){
                var message=$(mycontrol).attr("error-message");
                var valueMessage= getMessage(message);
                
                $(mycontrol).after(valueMessage); 
                validdata=false;  
               
            } 
            $(this).mouseup(function(){
                $(mycontrol).next().remove();
            })
        }
       
    })
  return validdata;
}
function getMessage(message){

    var mycontainer='<div class="message-container"><span class="error">'+message+'</span></div>'
       return mycontainer; 
}
// var data=[];
// if(data=JSON.parse(localStorage.getItem('empdata'))){
//   var empFname=data[i].firstname;
//   $("#fname").val(empFname);
//   var empLname=data[i].lastname;
//   $("#lname").val(empLname);
// } 
//alert(empData)