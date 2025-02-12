#! /bin/bash

read -p "Enter the voter's age" vage

if[[$age -lt 18]] then
  echo "Ineligible"
elif[[$age -gt 18]] then
  echo "Eligible"
elif[[$age -et 18]] then 
  echo "Right time to start voting"
fi
