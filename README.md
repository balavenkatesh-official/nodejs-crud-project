# nodejs-crud-project

we can integrate with jenkins pipeline job 



The pipeline consists of three main stages:  # Source Code Moving, # Deploy

### Prepare Workspace
   1. list the source code

### Source Code Moving
   1. move source code to server using rsync

### Deploy
   1.  Run " pm2 start app.js --name crud-demo "
   2.  The backend is running on the "3000" port-no

### Use this vhost to see the site 
         
          <VirtualHost *:80>
          ServerName {{ipaddress}}
          DocumentRoot /var/www/html/
          <Directory /var/www/html>
               Options Indexes FollowSymLinks
               AllowOverride All
               Require all granted
          </Directory>

          # Proxy setup for API requests to backend
          ProxyPreserveHost On
          ProxyPass /users http://localhost:3000/users
          ProxyPassReverse /users http://localhost:3000/users

          ErrorLog /var/log/apache2/example.com-error.log
          CustomLog /var/log/apache2/example.com-access.log combined
         </VirtualHost>
