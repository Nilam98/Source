$(document).ready(function(){
  
  
    $("#addSkill").click(function(){
      
      var skillArray=[];
       var value=$("#skill").val();
        //alert(value);
     
        $("#skill").after('<div id="myDiv"><span name="skill" class="myText">'+value+',</span><a  class="btn btn-danger" id="remove"><span class="glyphicon glyphicon-trash"></a><a  class="btn btn-info" id="edit"><span class="glyphicon glyphicon-pencil"></a></div>');
        $("body").on("click", "#remove", function () {
          $(this).closest("div").remove();
          $("#myDiv").append(value)
         
      });
      skillArray.push(value);
      console.log(skillArray);
      
    //   $("body").on("click", "#edit", function () {
    //     $(this).closest("div").remove();
    // });
      //   $(this).val();
      // skillArray.push(value);
      
    });
    $('#datepicker').datepicker({
      format: 'dd-mm-yyyy',
      changeMonth:true,
      changeYear:true
    });
  
    $("#submit").click(function(){
      if(myValidation("#MyForm")){
        
      }
      var myData=JSON.parse(localStorage.getItem('empdata'));
     
      var $first_name=$("#fname").val();
      var $last_name=$("#lname").val();
      skillArray=$(".myText").text();
      var $Role=$("#role").val();
      var $dob=$("#datepicker").val();
      var $gender=$("input[name=gender]:checked").val()
      
    //  var skill=new Array();
    //  $("#myDiv span.text()").each(function(){
    //    skill.push(this.value);
    //  })
  
    $('myText').each(function(){
      skillArray.push($(this).val()); 
      $('span #myText').text(skill);
     });
      //Select multiple value
      var selected = new Array();
   
        $("#Hobbies input[type=checkbox]:checked").each(function () {
            selected.push(this.value);
       });
       var empid=0;
     if(localStorage.getItem('empdata')==null){
       empid=1;
     }else{
       var lastElement=myData[myData.length-1].Id;
       empid=(lastElement)+1;
       alert(empid);
     }
   
        var employee={'Id':empid,'firstname':$first_name,'lastname':$last_name,'Gender':$gender,'Hobbies':selected,'SkillIn':skillArray,'Designation':$Role,'DateOfBirth': $dob}; 
  
        if(localStorage.getItem('empdata')==null){
          localStorage.setItem('empdata','[]');
        }
        // if(employee.firstname!==""&&employee.lastname!==""&&employee.Gender!==""&&employee.Hobbies!==""&&employee.SkillIn!==""&&employee.Designation!==""&&employee.DateOfBirth!==""){
             
        // }
        var data=JSON.parse(localStorage.getItem('empdata'));
        
        data.push(employee);
        localStorage.setItem('empdata',JSON.stringify(data));
  
        
         var data=JSON.parse(localStorage.getItem('empdata'));
    //showData(data);
    
    });
    var mydata=JSON.parse(localStorage.getItem('empdata'));
    showData(mydata);
  //searching
    $("#search").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#tableData tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
    //sorting:
    $('th').click(function(){
      var table = $(this).parents('table').eq(0)
      var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
      this.asc = !this.asc
      if (!this.asc){rows = rows.reverse()}
      for (var i = 0; i < rows.length; i++){table.append(rows[i])}
  })
  function comparer(index) {
      return function(a, b) {
          var valA = getCellValue(a, index), valB = getCellValue(b, index)
          return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
      }
  }
  function getCellValue(row, index)
  {
     return $(row).children('td').eq(index).text()
   }
  });
  
  
  
  function showData(data){
          var d=tableData.rows.length;
          while(--d){
            tableData.deleteRow(d);
          }
          for(var i=0;i<data.length;i++)
          {
            var row=tableData.insertRow(1);
            row.insertCell(0).innerHTML="<button >+</button>"
            row.insertCell(1).innerHTML="<td>"+data[i].firstname+" </td>";
            row.insertCell(2).innerHTML="<td>"+data[i].lastname+" </td>";
            
            row.insertCell(3).innerHTML="<td>"+"<span class='table-edit'><button type='button' id='r_"+data[i].Id+"' data-toggle='modal' data-target='#empModal' class='btn btn-success btn-rounded btn-sm my-0 waves-effect waves-light'>Edit</button></span><span class='table-remove'><button type='button' id='r_"+data[i].Id+"' class='btn btn-danger btn-rounded btn-sm my-0 waves-effect waves-light'>Remove</button></span>"+"</td>";
          //alert(data[i].Id);
           
           
          }
         
         }
  
         var rowDelete;
         var myData=[];
         if(myData=JSON.parse(localStorage.getItem('empdata'))){
           $("#tableData").on('click', '.table-remove', function () {
             alert("Hello Delete");
             // var dataDelete=mydata.key(Id);
             // localStorage.removeItem(dataDelete);
             //$("#tableData").table('refresh');
              rowDelete=$(this).attr('id').split("_").pop();
              //localStorage.removeItem(rowDelete);
             // alert(rowDelete);
   console.log(rowDelete);
   
             $(this).parents('tr').detach();
           });
   
           $("#tableData").on('click', '.table-edit', function () {
             alert("Hello Edit")
             //$(this).parents('tr')
             var empFname=data[i].firstname;
             console.log(data[i].firstname);
             alert(empFname);
             var empLname=data[i].lastname;
             var empGender=data[i].Gender;
             var empSkill=data[i].SkillIn;
             //alert(empFname);
             $("#fname").val(empFname);
             $("#lname").val(empLname);
             $("input[name=gender]:checked").val(empGender)
             $("#skill").val(empSkill);
           });
   
  
         }
         
        
      //   $(function () {
         
      //     $("body").on("click", ".remove", function () {
      //         $(this).closest("div").remove();
      //     });
      // });
      // function GetDynamicTextBox(value) {
      //     return '<input name = "Dynamictext" type="text" value = "' + value + '" />&nbsp;' +
      //             '<input type="button" value="Remove" class="remove" />'
      // }