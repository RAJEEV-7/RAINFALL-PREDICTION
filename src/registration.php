<?php
$con=mysqli_connect("localhost","root","","logindb") or die("Unable to connect");
?>
<html>
<head>
<title>Sign up</title>
<link rel="stylesheet" type="text/css" href="registration.css">
</head>
<body>

	<header>
		<div class="main">
			<div class="logo">
				<img src="solar12.jpg"></img>
			<ul> 
				<li class="active"><a href="#">HOME</a></li>
				<li><a href="#">SERVICES</a></li>
				<li><a href="#">ABOUT</a></li>
				<li><a href="#">CONTACT</a></li>
				</ul> 
			</div>
			
			<div id="login-box">
  <div class="left">
    <h1>Sign up</h1>
	<form name="input" method="post" action="login.php" >
    <input type="text" name="username" placeholder="Username" required />
    <input type="text" name="email" placeholder="E-mail" required/>
	<input name="mobilenumber" type="text" class="inputvalues" placeholder="Enter your mobile number" required/>
    <input type="password" name="password" placeholder="Password" />
    <input type="password" name="password2" placeholder="Retype password" />
    
    <input type="submit" name="submit" id="submit" value="Sign me up" />
  </div>
  
  <div class="right">
    <span class="loginwith">Sign in with<br />social network</span>
    
    <button class="social-signin facebook">Log in with facebook</button>
    <button class="social-signin twitter">Log in with Twitter</button>
    <button class="social-signin google">Log in with Google+</button>
  </div>
  <div class="or">OR</div>
</div>
</form>
	</header>
		
`		<?php
			if(isset($_POST['submit']))
			{
				echo '<script type="text/javascript"> alert("Sign Up button clicked") </script>';
					$username=$_POST['username'];
					$email=$_POST['email'];
					$mobilenumber=$_POST['mobilenumber'];
					$password=$_POST['password'];
					$confirm_password=$_POST['password2'];
					
					if($password==$confirm_password)
					{
						$query="select * from register WHERE username='$username'";
						$query_run=mysqli_query($con,$query);
						
						if(mysqli_num_rows($query_run)>0)
						{
							echo '<script type="text/javascript"> alert("User already exists..try another username") </script>';
						}
						else
						{
							$query="insert into register values('$username','$email','$mobilenumber','$password','$confirm_password')";
							$query_run=mysqli_query($con,$query);
							
							if($query_run)
							{
								echo '<script type="text/javascript"> alert("User Registered..Go to login page to login") </script>';
							}
							else
							{
								echo '<script type="text/javascript"> alert("Error!") </script>';	
							}
							
						}
					}
					else{
						echo '<script type="text/javascript"> alert("Password and confirm password does not match") </script>';
					}
			}
			?>
			</body>
</html>
