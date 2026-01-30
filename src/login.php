<?php
$con=mysqli_connect("localhost","root","","logindb") or die("Unable to connect");
?>
<html>
<head>
<title>SOLAR COMPANY SIGN UP FORM</title>
<link rel="stylesheet" type="text/css" href="login.css">
</head>
<body>
	<header>
		<div class="main">
			<div class="logo">
			<img src="solar12.jpg"></img>
			<div id="login-box">
  <div class="left">
    <h1>Login page</h1>
	<form name="input" method="post" action="page.php" >
	<input type="text" name="email" placeholder="Enter Email" />
    <input type="password" name="password" placeholder="Password" />
    
    <input type="submit" name="loginup_submit" value="Login " />
  </div>
  
  <div class="right">
    <span class="loginwith">Login in with<br />social network</span>
    
    <button class="social-login facebook">Log in with facebook</button>
    <button class="social-login twitter">Log in with Twitter</button>
    <button class="social-login google">Log in with Google+</button>
	<form>
  </div>
  <div class="or">OR</div>
</div>
	</header>
		<?php
		if(isset($_POST['login']))
		{
			$username=$_POST['username'];
			$password=$_POST['password'];
			$query="select * from customerinfotable WHERE username='$username' AND password='$password'";
			
			$query_run=mysqli_query($con,$query);
			if(mysqli_num_rows($query_run)>0)
			{
				//valid
				$_SESSION['username']= $username;
				header('location:login.php');
			}
			else{
				//invalid
				echo '<script type="text/javascript"></script>';

		
			}
		}
		?>
	 </div>
</body>
</html>
	
		
</body>
</html>