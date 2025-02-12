# Automation-Scripts

 - In an automation script the first line always begins with "#!".
 - This duo of symbols is known as __shebang__.
 - It signals to the operating system that this file is executable.
 - Immediately following the shebang is the path.
 - This is the path of the interpretor to be used for running the script.
<br>

---

__How to run a bash script?__


  *sudo chmod u+x script_name.sh*<br>
  *./script_name.sh*

---

Following are the files that I have uploaded on this repository:
<br><br>
__1. user_password_policy.sh__

 - This shell script is used to change the password policy of a user.
 - m represents the min password length
 - M is max password length
 - I is the Inactive days after password expiry
 - W is the warning days before the password expires
---
__2. internet-connection-checker.sh__

 - This shell script is used to check the system's connection to internet.
 - If the system is successfully connected to the internet it pings the google.com.
 - This is a simple script so just pings the google.com
---
__3. service-checker.sh__
 - This shell script is used to check for a service status.
 - If the service is not active is starts the service.
 - If the service is active it restarts the service.
---
__4. if-then-else.sh__
 - This shell script implements the basic if then else condition
---
__5.lisence-elig.sh__
 - This script is uses the if elif condition statement
 - It basically tells wether the input age of the user is for driving lisence or not.
 - Also handles the wrong input,i.e.,if the input is not a number.
---
__6.user_add.sh__
 - This script is used to add users to the system.
 - This script asks for the number of users that need to be added.
 - Then it takes that number and asks for the name of each user.
 - Then it adds the user to the system.
---
