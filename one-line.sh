#! /bin/bash

read -p "Enter a number: " num0

read -p "Enter another number to compare: " num1

if [[ $num0 -gt $num1 ]]
then
    echo "The first number $num0 is greater than the second number $num1."
else
    echo "The first number $num0 is less than or equal to the second number $num1."
fi