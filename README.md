# Tutoring Website Deployment Guide

This guide provides step-by-step instructions to deploy this React + Express tutoring application to an **Amazon Linux** EC2 instance.

---

## 1. Install Node.js and NPM

First, update your server and install Node.js. You can install it using the NodeSource repository for system-wide access:

```bash
sudo yum update -y

# Setup Node.js v20 repository
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -

# Install Node.js and npm
sudo yum install -y nodejs
```

*(Alternative: If you prefer using NVM to manage Node versions)*:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
. ~/.bashrc
source ~/.bashrc
nvm install --lts
node -v
npm -v
```

---

## 2. Install Dependencies & Build the App

Clone your code to the server, then install the required packages and build the React frontend.

```bash
# 1. Install Backend Dependencies
npm install

# 2. Install Frontend Dependencies and Build the React App
cd frontend
npm install
npm run build
cd ..
```

---

## 3. Run the Backend with PM2

To ensure the Node.js server stays alive in the background and restarts automatically if the server crashes, use PM2.

```bash
# Install PM2 globally
sudo npm install -g pm2

# Start your server
pm2 start server.js --name "tutoring-app"

# Ensure PM2 restarts your app if the server reboots
pm2 startup
# Note: Run the command that PM2 outputs at the bottom of the screen!

# Save the PM2 process list
pm2 save
```

---

## 4. Install and Configure Nginx

Nginx will act as a reverse proxy, taking traffic on port `80` (HTTP) and forwarding it to your Node app on port `3000`.

```bash
# Install Nginx
sudo yum install -y nginx

# Create a configuration file for your website
sudo nano /etc/nginx/conf.d/tutoring-website.conf
```

Paste the following configuration into the file:
```nginx
server {
    listen 80;
    server_name YOUR_EC2_IP; # Replace with your Domain Name later!

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Save the file and start Nginx:
```bash
# Test the configuration for syntax errors
sudo nginx -t

# Enable Nginx to start on boot
sudo systemctl enable nginx

# Start the Nginx service
sudo systemctl start nginx
```

---

## 5. Get a Domain Name and Link it

To secure your site with HTTPS, you must attach a domain name.
1. Purchase a domain name from a registrar (e.g., Amazon Route53, GoDaddy, Namecheap).
2. Go to your registrar's DNS settings.
3. Create an **A-Record**:
   - **Name:** `@` (or leave blank)
   - **Value:** Your EC2 Instance's Public IPv4 address.
4. *(Optional)* Create a second **A-Record** or **CNAME** for `www` pointing to the same IP.

*Note: Once your domain is linked, update the `server_name` in your Nginx configuration (`/etc/nginx/conf.d/tutoring-website.conf`) to match your domain name, then run `sudo systemctl restart nginx`.*

---

## 6. Secure with HTTPS (Certbot)

Use Let's Encrypt to generate a free SSL certificate.

```bash
# Install the EPEL repository (required for certbot on Amazon Linux)
sudo yum install -y augeas-libs
sudo python3 -m venv /opt/certbot/
sudo /opt/certbot/bin/pip install --upgrade pip

# Install Certbot and the Nginx plugin
sudo /opt/certbot/bin/pip install certbot certbot-nginx

# Create a symlink so you can run certbot easily
sudo ln -s /opt/certbot/bin/certbot /usr/bin/certbot

# Run Certbot to generate the SSL certificate
sudo certbot --nginx
```

Follow the prompts. Certbot will automatically update your Nginx configuration to support HTTPS (port `443`) and redirect HTTP traffic securely.
