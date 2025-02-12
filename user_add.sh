#! /bin/bash

read -p "Enter the number of users that you have decided to add to the system" num
for i in ${seq 1 "$num"}; do
  read "Enter the usrname for user number $i: " uname
  useradd "$uname"
  if[[ $? -eq 0 ]]; then
    echo "User added successfully"
  else
    echo "User not added"
  fi
done
