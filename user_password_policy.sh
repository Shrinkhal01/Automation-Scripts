#! /bin/bash

file=/root/user.txt

for usr in $(cat $file);
  do
    chage -m 5 -M 90 -W 10 -I 5 $user;
  done
