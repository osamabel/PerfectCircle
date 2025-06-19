#!/bin/bash

# SSL Setup Script for PerfectCircle
# This script helps set up Let's Encrypt SSL certificates for the containerized application

set -e

DOMAIN="perfectloop.tech"
EMAIL="info@perfectloop.tech"
COMPOSE_FILE="docker-compose.yml"
NGINX_CONF_DIR="./nginx"

echo "🔒 SSL Setup for PerfectCircle"
echo "================================"

# Check if domain is provided
if [ ! -z "$1" ]; then
    DOMAIN="$1"
fi

if [ ! -z "$2" ]; then
    EMAIL="$2"
fi

echo "Domain: $DOMAIN"
echo "Email: $EMAIL"

# Step 1: Install certbot if not already installed
if ! command -v certbot &> /dev/null; then
    echo "📦 Installing certbot..."
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        if command -v apt &> /dev/null; then
            apt update && apt install -y certbot
        elif command -v yum &> /dev/null; then
            yum install -y certbot
        else
            echo "❌ Please install certbot manually"
            exit 1
        fi
    else
        echo "❌ Please install certbot manually for your OS"
        exit 1
    fi
fi

# Step 2: Stop nginx container if running
echo "🛑 Stopping nginx container..."
docker-compose stop nginx || true

# Step 3: Get SSL certificate
echo "🔑 Obtaining SSL certificate for $DOMAIN..."
certbot certonly --standalone \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    -d $DOMAIN \
    -d www.$DOMAIN

# Step 4: Copy certificates to nginx directory
echo "📋 Copying certificates..."
mkdir -p $NGINX_CONF_DIR/ssl
cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem $NGINX_CONF_DIR/ssl/
cp /etc/letsencrypt/live/$DOMAIN/privkey.pem $NGINX_CONF_DIR/ssl/

# Step 5: Set proper permissions
chmod 644 $NGINX_CONF_DIR/ssl/fullchain.pem
chmod 600 $NGINX_CONF_DIR/ssl/privkey.pem

# Step 6: Switch to SSL nginx configuration
echo "🔧 Switching to SSL configuration..."
if [ -f "$NGINX_CONF_DIR/ssl-nginx.conf" ]; then
    cp $NGINX_CONF_DIR/ssl-nginx.conf $NGINX_CONF_DIR/nginx.conf
    echo "✅ SSL configuration activated"
else
    echo "⚠️  SSL configuration file not found. Using default configuration."
fi

# Step 7: Restart containers
echo "🚀 Restarting containers..."
docker-compose up -d

# Step 8: Setup auto-renewal
echo "⏰ Setting up auto-renewal..."
(crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet --deploy-hook 'cd $(pwd) && ./scripts/setup-ssl.sh $DOMAIN $EMAIL'") | crontab -

echo ""
echo "🎉 SSL setup complete!"
echo "Your application is now available at:"
echo "   https://$DOMAIN"
echo "   https://www.$DOMAIN"
echo ""
echo "Certificate auto-renewal is set up to run daily at noon."
echo "Certificates will automatically renew when they're close to expiry." 