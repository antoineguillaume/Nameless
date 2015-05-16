<?php 

	function error_message($error, $input)
	{
	  if(count($_POST)>0)
	  {
	    if(!empty($error[$input]))
	    {
	      return '<p class="errors-lign">' . $error[$input] . '</p>';
	    }
	  }
	}

 ?>