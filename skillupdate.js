$(document).ready(function(){
    var id;
    var getIndexSkill
    var skillArray = [];
    var i=0;
      var j=0;
    $("#addSkill").click(function(){
      
      // alert(skillArray);
     id=$("#hiddenSkill").val();
  if(id==""){
    j++;
    i++;
    //var skillArray=[];
     var value=$("#skill").val();
      //alert(value);
   var html='';
  //  html+="<div  class='skillClass'>"
   html+="<div id='myDiv' class='divskill'>"
   html+="<span class='myText' id='text_"+i+"'>"+value+"</span>"
  //  html+="</div>"
   html+="<a class='btn btn-danger deleteskill' id='remove'><span class='glyphicon glyphicon-trash'></a>"
   html+="<a class='btn btn-info editSkill' id='edit_"+j+"'><span class='glyphicon glyphicon-pencil'></a>"
   html+="</div>"
  //  $("#skill").after(html);
  $("#skillDiv").append(html);
   $("#skillDiv").sortable();
  skillArray.push(value);
  
  
    $("body").on("click", "#remove", function () {
      // $(this).closest("div").remove();
      $(this).parent("#skillDiv").find(".divskill").remove();
      // $(this).parents(".myText").remove();
      // alert("delete..")
    });
      
      //console.log(skillArray);
   $("body").on("click", ".editSkill", function () {
        // alert(skillArray);
      var editId=$(this).attr("id");//.split("_").pop
      alert(editId);
    //   var oldData=$("#"+editId+"").text();
    // alert(oldData);
    
        var editText=$(this).parent().find(".myText").text();
      $("#skill").val(editText);
    
       getIndexSkill=$(this).parent(".divskill").find(".myText").attr('id');
      alert(getIndexSkill);
      
    });
  }
}); 
  
    $('#datepicker').datepicker({
      format: 'dd-mm-yyyy',
      changeMonth:true,
      changeYear:true
    });
  
    // $('#tableData').DataTable({
    //   limit: 5,
    //   rowDisplayStyle:'block', 
    //   activePage: 1,
    //   rows: []
    //   });
   
  
    $("#submit").click(function(){
      if(myValidation("#MyForm")){
        
      }
      var id=$("#hidden").val();
      var myData=JSON.parse(localStorage.getItem('empdata'));
     
      var first_name=$("#fname").val();
      var last_name=$("#lname").val();
      // skillArray=$(".myText").text();
      var Role=$("#role").val();
      var dob=$("#datepicker").val();
      var gender=$("input[name=gender]:checked").val()
      
      //Skill and Hobbies array
    //   var skillArray = new Array();
    //   $(".myText").each(function () {
    //    skillArray.push($(this).text());
    //   //  alert(skillArray);
    //  });  
  
        var selected = new Array();
   
        $("#Hobbies input[type=checkbox]:checked").each(function () {
            selected.push(this.value);
       });
  
       var skillArray = new Array();
       $(".myText").each(function () {
        skillArray.push($(this).text());
      });
  
  
       var empid=0;
       if(localStorage.getItem('empdata')==null){
         empid=1;
        }else{
       var getElement=myData[myData.length-1].Id;
       empid=(getElement)+1;
       //alert(empid);
     }
  
     if(id==""){
      var employee={'Id':empid,'firstname':first_name,'lastname':last_name,'Gender':gender,'Hobbies':selected,'SkillIn':skillArray,'Designation':Role,'DateOfBirth': dob}; 
  
      if(localStorage.getItem('empdata')==null || localStorage.getItem('empdata')==undefined|| localStorage.getItem('empdata')==""){
        localStorage.setItem('empdata','[]');
      }
      
      var data=JSON.parse(localStorage.getItem('empdata'));
      
      data.push(employee);
      localStorage.setItem('empdata',JSON.stringify(data));
  
      
       var data=JSON.parse(localStorage.getItem('empdata'));
     }else{
      myData=JSON.parse(localStorage.getItem('empdata'))
      var data=myData.find(temp=> temp.Id==rowEdit);
  
      data.firstname=first_name;
      data.lastname=last_name;
      data.DateOfBirth=dob;
      data.Gender=gender;
      data.SkillIn=skillArray;
      data.Designation=Role;
      data.Gender=gender;
      data.Hobbies=selected;
      
      var getIndex=myData.indexOf(data);
       console.log(getIndex);
       myData[getIndex]=data;
       localStorage.setItem('empdata',JSON.stringify(myData));
      //settingData(data)
      myData=JSON.parse(localStorage.getItem('empdata'));
     }
   
    showData(data);
    // var mydata=JSON.parse(localStorage.getItem('empdata'));
    // showData(mydata);
    //settingData(data);
    location.reload();
   
  });

    var mydata=JSON.parse(localStorage.getItem('empdata'));
    showData(mydata);
    
  //searching
    $("#search").on("keyup", function() {
      var value = $(this).val().toUpperCase();
      $(".Main").filter(function() {
        $(this).toggle($(this).text().toUpperCase().indexOf(value) >-1)
      });
    //   
    });
  
      //sorting:
    $('.thfirstname').click(function(){
      // $('#demo').on('shown.bs.collapse', function () {
      //       $('[data-toggle=collapse]').prop('disabled',true);
      //   });
      var table = $(this).parents('#tableData').eq(0)
      var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
      // alert(rows);
      this.asc = !this.asc
      if (!this.asc)
      {
        rows = rows.reverse()
      }
      for (var i = 0; i < rows.length; i++)
      {
        table.append(rows[i])
  
      }
  })
  function comparer(index) {
      return function(a, b) {
          var valueA = getCellValue(a, index), valueB = getCellValue(b, index)
          return $.isNumeric(valueA) && $.isNumeric(valueB) ? valueA - valueB : valueA.toString().localeCompare(valueB)
      }
  }
  function getCellValue(row, index)
  {
     return $(row).children('tr').eq(index).text()
   }
  
   function showData(data){
    
    var d=tableData.rows.length;
    while(--d){
      tableData.deleteRow(d);
    }
    for(var i=0;i<data.length;i++)
    {
      
      var html = `
                  <tr class="Main">
                  <td colspan="2"><button data-toggle="collapse" data-target='#demo_`+data[i].Id+`'>+</button></td>
                  <td colspan="2">${data[i].firstname}</td>
                  <td colspan="2">${data[i].lastname}</td>
                  <td colspan="2">${data[i].Designation}</td>
                  <td><button id='r1_`+data[i].Id+`' data-toggle='modal' data-target='#empModal' class='table-edit btn btn-success btn-rounded btn-sm my-0 waves-effect waves-light'>Edit</button><button id='r2_`+data[i].Id+`' class='table-remove btn btn-danger btn-rounded btn-sm my-0 waves-effect waves-light'>Remove</button> </td>
                  </tr>
  
                  <tr id='demo_`+data[i].Id+`' class="collapse">
                  
                  <td>Gender<td>
                  <td>${data[i].Gender}</td>
                  <td>DOB</td>
                  <td>${data[i].DateOfBirth}</td>
                  <td>Hobbies</td>
                  <td>${data[i].Hobbies}</td>
                  <td>Skills</td>
                  <td>${data[i].SkillIn}</td>
                
                  </tr>
                 
      `
      $("#dataBody").append(html);
      //console.log(html);
    
    }
   
   }
  
   var myData=[];
   myData=JSON.parse(localStorage.getItem('empdata'))
  //  if(myData=JSON.parse(localStorage.getItem('empdata'))){
     $("#tableData").on('click', '.table-remove', function () {
      rowEdit=$(this).attr('id').split("_").pop();
      //  alert(rowEdit);
       myData=JSON.parse(localStorage.getItem('empdata'))
       var data=myData.find(temp => temp.Id==rowEdit);
       
     $("#hidden").val(rowEdit)
       var getIndex=myData.indexOf(data);
       console.log(getIndex);
     
    //    var confirmMessage=confirm("Are you sure You want to DElete?");
      
  
       myData.splice(getIndex,1);
       $(this).parents('tr').remove();
       localStorage.setItem('empdata',JSON.stringify(myData));
      //  if(confirmMessage){
        //alert("Hello Delete");
        //rowDelete= parseInt($(this).attr("id").pop());
       
       //  var dataDelete=localStorage.key(rowDelete);
       //  localStorage.removeItem(dataDelete);
        
       
     
      //  }
  
       //$(this).parents('tr').detach();
     });
  
    
  
     $("#tableData").on('click','.table-edit', function () {
      $(".divskill").remove();
      //  alert("Hello Edit")
       
       //$(this).parents('tr')
       rowEdit=$(this).attr('id').split("_").pop();
      //  alert(rowEdit);
       myData=JSON.parse(localStorage.getItem('empdata'))
       var data=myData.find(temp => temp.Id==rowEdit);
       
     $("#hidden").val(rowEdit)
       var getIndex=myData.indexOf(data);
       console.log(getIndex);
       myData[getIndex]=data;
       localStorage.setItem('empdata',JSON.stringify(myData));
      settingData(data);
      // table.reload();
      
     });
    //  location.reload();
  //  }
   function settingData(value){
     
    $("#fname").val(value.firstname);
    $("#lname").val(value.lastname);
    $("#datepicker").val(value.DateOfBirth);
  //  $("#skill").val(value.SkillIn);
    $("#role").val(value.Designation);
    $("#gender").val(value.Gender);
    $("#Hobbies").val(value.Hobbies);
    //$("input[name=gender]:checked").val(value.Gender);
    // $("#skill").val(value.SkillIn)
  
  $(value.SkillIn).each(function(i,item){
    // $("#skill").val(value.SkillIn)
     j++;
    var html='';
    //  html+="<div  class='skillClass'>"
     html+="<div id='myDiv' class='divskill'>"
     html+="<span id='span_"+j+"' class='myText'>"+item+"</span>"
    //  html+="</div>"
     html+="<a class='btn btn-danger deleteSkill' id='remove'><span class='glyphicon glyphicon-trash'></a>"
     html+="<a class='btn btn-info editSkill' id='edit_"+j+"'><span class='glyphicon glyphicon-pencil'></a>"
     html+="</div>"
  //   $("#skill").after(html);
  // $(".skilClass").sortable();
  $("#skillDiv").append(html);
  $("#skillDiv").sortable();
    });
   
  }
  $("body").on("click", "#remove", function () {
    $(this).closest("div").remove();
  // alert("helloo");
  //   $(this).parent("#skillDiv").find(".skillClass").remove();
    //     alert(deleteText);
  });
//   $("body").on("click", ".editSkill", function () {
//     // alert(skillAr);
//     var editId=$(this).parents('.skillClass').find(".myText").attr("id");//.split("_").pop();
//     // alert(skillArray);
//     //  alert(editId);
//     // var spanId=$(this).siblings(".myText");
//     // console.log(spanId);
//     //.find(".myText").attr("id");
//     //alert(spanId);
//     $("#hiddenSkill").val(editId)
//       var oldData=$("#"+editId+"").text();
//       // alert(oldData);
//       var editText=$(this).parent().find(".myText").text();
//       // alert(editText);
//       // $(this).attr('.myText').replace(editText,oldData)
//     $("#skill").val(editText);
  
//   });
  
  
  
  $('table.paginated').each(function() {
    var currentPage = 0;
    var numPerPage = 10;
    var $table = $(this);
    $table.bind('repaginate', function() {
        $table.find('.Main').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
    });
    $table.trigger('repaginate');
    var numRows = $table.find('.Main').length;
    var numPages = Math.ceil(numRows / numPerPage);
    var $pager = $('<div class="pager"></div>');
    for (var page = 0; page < numPages; page++) {
        $('<span class="page-number"></span>').text(page + 1).bind('click', {
            newPage: page
        }, function(event) {
            currentPage = event.data['newPage'];
            $table.trigger('repaginate');
  
            $(this).addClass('active').siblings().removeClass('active');
        }).appendTo($pager).addClass('clickable');
    }
    $pager.insertAfter($table).find('span.page-number:first').addClass('active');
  });
  
  function sweetalert(){
    
  }
  
  });
  
  