import pool from "@/lib/db";

export async function POST(req) {
    var pass='';
  // Extract data from the request body
  const {  email, password } = await req.json(); // Since POST data is usually in the body
  
  if (!email || !password) {
    return new Response(
      JSON.stringify({ message: 'All fields are required'}),
      {
        status: 500,
      }
    );
  }
  // Insert data into the database
 
    const result = await pool.query(
      'SELECT * FROM user_data',[]
    );
    

    // Get the newly created user (optional)
     result.rows.forEach(async (detail) => {
        if (detail.email_id ==email ) {
            pass=detail.pass_word;
        }}) 
        if(pass==password){// Respond with success message
    return new Response(
        
      JSON.stringify({ message: 'Successfully logged in'}),
      {
        status: 201,
      }
    );
    } 
  else {
    // Handle any errors
    return new Response(
      JSON.stringify({ message: 'Incorrect email id or password' }),
      {
        status: 500,
      }
    );
  }
}
