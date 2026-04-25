Install Node

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

. ~/.bashrc
source ~/.bashrc
nvm install --lts
node -v
npm -v



# 1. Install Backend Dependencies
npm install

# 2. Install Frontend Dependencies and Build the React App
cd frontend
npm install
npm run build
cd ..



# Install PM2 globally
sudo npm install -g pm2

# Start your server
pm2 start server.js --name "tutoring-app"

# Ensure PM2 restarts your app if the server reboots
pm2 startup
# (Run the command that PM2 spits out at the bottom of the screen)

pm2 save




sudo yum update -y

# Setup Node.js v20 repository
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -

# Install Node.js and npm
sudo yum install -y nodejs



sudo yum install -y nginx

sudo nano /etc/nginx/conf.d/tutoring-website.conf


server {
    listen 80;
    server_name YOUR_EC2_IP; # Replace with your EC2 Public IPv4 or domain

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}




# Test the configuration for syntax errors
sudo nginx -t

# Enable Nginx to start on boot
sudo systemctl enable nginx

# Start the Nginx service
sudo systemctl start nginx
