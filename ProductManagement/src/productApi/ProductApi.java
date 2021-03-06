package productApi;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class ProductApi
 */
@WebServlet("/ProductApi")
public class ProductApi extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
	
	Product productObj = new Product();
	
    public ProductApi() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String output=productObj.insertProduct(request.getParameter("name"), 
				request.getParameter("price"), 
				request.getParameter("category"), 
				request.getParameter("stock"),
				request.getParameter("description"));
		
		response.getWriter().write(output);
	}

	/**
	 * @see HttpServlet#doPut(HttpServletRequest, HttpServletResponse)
	 */
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		Map paras = getParasMap(request); 
		 
		 String output = productObj.updateProduct(paras.get("hidItemIDSave").toString(),     
				 paras.get("name").toString(),     
				 paras.get("price").toString(),        
				 paras.get("category").toString(),
				 paras.get("stock").toString(),
				 paras.get("description").toString()); 
		 
		 response.getWriter().write(output);
	}

	/**
	 * @see HttpServlet#doDelete(HttpServletRequest, HttpServletResponse)
	 */
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		Map paras = getParasMap(request); 
		 
		 String output = productObj.deleteProduct(paras.get("productid").toString()); 
		 
		 response.getWriter().write(output);
	}
	
	// Convert request parameters to a Map 
			private static Map getParasMap(HttpServletRequest request) 
			{  
				Map<String, String> map = new HashMap<String, String>();  
				try  
				{   
					Scanner scanner = new Scanner(request.getInputStream(), "UTF-8");   
					String queryString = scanner.hasNext() ?          
							scanner.useDelimiter("\\A").next() : "";  
							scanner.close(); 
			 
			  String[] params = queryString.split("&");   
			  for (String param : params)   
			  { 

		 
			   String[] p = param.split("=");    
			   map.put(p[0], p[1]);   
			   }  
			  }  
				catch (Exception e)  
				{  
					System.out.println(e);
				}  
				
				System.out.println(map);
				return map; 
				
			}

}
