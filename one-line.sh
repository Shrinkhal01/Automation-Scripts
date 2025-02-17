#! /bin/bash

read -r "Enter a number: " num0

read -r "Enter another number to compare : " num1

if[[$num0 -gt $num1]]
then
    echo "The first number is greater than the second number."
else
    echo "The first number is less than the second number."
fi