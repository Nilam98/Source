let arr=[]


// we are making an todo list function

document.getElementById("add").onclick=(e)=>{


  let item=document.getElementById("text").value


  

  arr.push(item)

  localStorage.setItem("task",JSON.stringify(arr))

  

// 

// console.log(getitem)

  e.preventDefault()

}