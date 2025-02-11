#! /bin/bash

systemctl is-active httpd.service

if[[$? -ne 0]]

then
  systemctl start httpd.service

else
  systemctl restart httpd.service

fi
