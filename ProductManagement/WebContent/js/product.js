$(document).ready(function()
{ 
	if ($("#alertSuccess").text().trim() == "") 
 	{ 
 		$("#alertSuccess").hide(); 
 	} 
 	$("#alertError").hide(); 
}); 

// SAVE ============================================
$(document).on("click", "#btnSave", function(event)
{ 
	// Clear alerts---------------------
 	$("#alertSuccess").text(""); 
 	$("#alertSuccess").hide(); 
 	$("#alertError").text(""); 
 	$("#alertError").hide(); 
 	
	// Form validation-------------------
	var status = validateItemForm(); 
	if (status != true) 
 	{ 
 		$("#alertError").text(status); 
 		$("#alertError").show(); 
 		
 		return; 
 	} 
 	
	// If valid------------------------
	var type = ($("#hidItemIDSave").val() == "") ? "POST" : "PUT"; 
 	$.ajax( 
 	{ 
 		url : "ProductApi", 
 		type : type, 
 		data : $("#formItem").serialize(), 
 		dataType : "text", 
 		complete : function(response, status) 
 		{ 
 			onItemSaveComplete(response.responseText, status); 
 		} 
 	}); 
});

function onItemSaveComplete(response, status)
{ 
	if (status == "success") 
 	{ 
 		var resultSet = JSON.parse(response);
 		console.log(resultSet);
 		if (resultSet.status.trim() == "success") 
 		{ 
 			$("#alertSuccess").text("Successfully saved."); 
 			$("#alertSuccess").show(); 
 			$("#divItemsGrid").html(resultSet.data); 
 		} 
 		else if (resultSet.status.trim() == "error") 
 		{ 
 			$("#alertError").text(resultSet.data); 
 			$("#alertError").show(); 
 		} 
 	} 
 	else if (status == "error") 
 	{ 
 		$("#alertError").text("Error while saving."); 
 		$("#alertError").show(); 
 	} 
 	else
 	{ 
 		$("#alertError").text("Unknown error while saving.."); 
 		$("#alertError").show(); 
 	} 
 	
 	$("#hidItemIDSave").val(""); 
 	$("#formItem")[0].reset();
}

// UPDATE========================================== 
$(document).on("click", ".btnUpdate", function(event) 
{    
	$("#hidItemIDSave").val($(this).data("productid"));     
	$("#productID").val($(this).closest("tr").find('td:eq(1)').text());     
	$("#name").val($(this).closest("tr").find('td:eq(2)').text());     
	$("#price").val($(this).closest("tr").find('td:eq(3)').text());
	$("#category").val($(this).closest("tr").find('td:eq(4)').text());
	$("#stock").val($(this).closest("tr").find('td:eq(5)').text()); 
	$("#description").val($(this).closest("tr").find('td:eq(6)').text());
	 
}); 

// DELETE =============================================================
$(document).on("click", ".btnRemove", function(event)
{ 
	console.log($(this).data("productid"));
 	$.ajax( 
 	{ 
 		url : "ProductApi", 
 		type : "DELETE", 
 		data : "productid=" + $(this).data("productid"),
 		dataType : "text", 
 		complete : function(response, status) 
 		{ 
 			onItemDeleteComplete(response.responseText, status); 
 		} 
 	}); 
});

function onItemDeleteComplete(response, status)
{ 
	console.log(JSON.parse(response));
	if (status == "success") 
 	{ 
 		var resultSet = JSON.parse(response); 
 		
 		if (resultSet.status.trim() == "success") 
 		{ 
 			$("#alertSuccess").text("Successfully deleted."); 
 			$("#alertSuccess").show(); 
 			$("#divItemsGrid").html(resultSet.data); 
 		} 
 		else if (resultSet.status.trim() == "error") 
 		{ 
 			$("#alertError").text(resultSet.data); 
 			$("#alertError").show(); 
 		} 
 	} 
 	else if (status == "error") 
 	{ 
 		$("#alertError").text("Error while deleting."); 
 		$("#alertError").show(); 
 	} 
 	else
 	{ 
 		$("#alertError").text("Unknown error while deleting.."); 
 		$("#alertError").show(); 
 	} 
}

// CLIENT-MODEL========================================================================= 
function validateItemForm() 
{  
	// product name  
	if ($("#name").val().trim() == "")  
	{   
		return "Insert Product Name";  
	} 
 
	// product price  
	if ($("#price").val().trim() == "")  
	{   
		return "Insert Product Price.";  
	} 
	// category  
	if ($("#category").val().trim() == "")  
	{   
		return "Insert Product Category.";  
	}   
	
	// stock  
	if ($("#stock").val().trim() == "")  
	{   
		return "Insert Product Stock.";  
	}
	 
	// description
	if ($("#description").val().trim() == "")  
	{   
		return "Insert Product Description.";  
	}

	return true; 
}