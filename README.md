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
