function sort_name()
{
 var table=$('#mytable');
 var tbody =$('#table1');

 tbody.find('tr').sort(function(a, b) 
 {
  if($('#name_order').val()=='asc') 
  {
   return $('td:first', a).text().localeCompare($('td:first', b).text());
  }
  else 
  {
   return $('td:first', b).text().localeCompare($('td:first', a).text());
  }
		
 }).appendTo(tbody);
	
 var sort_order=$('#name_order').val();
 if(sort_order=="asc")
 {
  document.getElementById("name_order").value="desc";
 }
 if(sort_order=="desc")
 {
  document.getElementById("name_order").value="asc";
 }
}

function sort_age() 
{
 var table=$('#mytable');
 var tbody =$('#table1');

 tbody.find('tr').sort(function(a, b) 
 {
  if($('#age_order').val()=='asc') 
  {
   return $('td:last', a).text().localeCompare($('td:last', b).text());
  }
  else 
  {
   return $('td:last', b).text().localeCompare($('td:last', a).text());
  }
		
 }).appendTo(tbody);
	
 var sort_order=$('#age_order').val();
 if(sort_order=="asc")
 {
  document.getElementById("age_order").value="desc";
 }
 if(sort_order=="desc")
 {
  document.getElementById("age_order").value="asc";
 }
}