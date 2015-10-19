$(document).ready(function(){

var store = false;
var count = 0;
var ids   = 0;
var deleteToggle = false;
var infoToggle   = false;

if (typeof(Storage) !== "undefined") {
    store = true;
    var amt = localStorage.length;
    var countTo = localStorage.getItem("count");
    if(amt == 1)
     localStorage.setItem("count",0)
	var itemToAdd = $("input[name=toDo]");

	for(var i=0;i<countTo;i++)
	{
	  if(localStorage.getItem(i) != null)
		{
		  var list = $("<li id=\"sort\"data=" + i+ "></li>").html(localStorage.getItem(i) + "<button id=\"deleteItem\">Done</button>");
		  $("#list").append(list);
		  itemToAdd.focus();
		}
	}	

} else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
}


$("#submit_toDo").click(function(e){
	e.preventDefault(); 
	var itemToAdd = $("input[name=toDo]");
	var list = $("<li id=\"sort\" data=" + count+ "></li>").html(itemToAdd.val() + "<button id=\"deleteItem\">Remove</button>");
 	if(store){
	 	localStorage.setItem(count.toString(),itemToAdd.val());
		console.log(localStorage.getItem(count.toString()));
		count++;
		localStorage.setItem("count",count);
	}
	$("#list").append(list);
	itemToAdd.val("").focus();
});


$("#list").on("click","li button",function(e){
	e.preventDefault();
    e.stopPropagation();
	$(this).parent().remove();
	if(deleteToggle)
	 localStorage.removeItem($(this).parent().attr("data"));
});

$(".info").on("click",function(){
	if(infoToggle)
		$(this).children().hide();
	else
		$(this).children().show();
	infoToggle = !infoToggle;
});

$("#delete").click(function(e){
	e.preventDefault();
	deleteToggle = !deleteToggle;
	if(deleteToggle)
		$(this).css({background: "red"});
	else
		$(this).css({background: "rgba(233,126,64,1)"});
});

$( "#list" ).sortable();
$( "#list" ).disableSelection();

$(".info").hover(function(){
	$(this).css({color:"white"});
	$(this).children().css({color:"black"});
	}, function(){
		$(this).css({color:"black"});
	} );

$("#reset").click(function(){
	var amt = localStorage.getItem("count");
	for(var i=0; i<amt;i++)
	{
	 localStorage.removeItem(i);
	}

});

});