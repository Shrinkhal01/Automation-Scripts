#! /bin/bash

read -p "Enter your age " age

if[$age -gt 18]
then
  echo "Eligible"
elif[$age -lt 18]
then 
  echo "Not eligible"
elif[$age = 18]
then
  echo "Right time to apply for the lisence"
else
  echo "Wrong Input!!"
fi
