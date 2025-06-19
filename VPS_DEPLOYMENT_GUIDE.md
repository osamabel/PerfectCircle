# VPS Production Deployment Guide

## 🚀 Pre-Deployment Checklist

### 1. **VPS Requirements**
- **Minimum**: 2GB RAM, 2 CPU cores, 20GB storage
- **Recommended**: 4GB RAM, 2+ CPU cores, 40GB+ storage
- **OS**: Ubuntu 20.04+ LTS or similar
- **Ports**: 80, 443, 22 (SSH) open

### 2. **Domain & DNS Setup**
- Point your domain to your VPS IP address
- Set up SSL certificate (Let's Encrypt recommended)
- Ensure email DNS records are configured (MX, SPF, DKIM)

## 📦 VPS Setup Steps

### Step 1: Initial Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install Certbot (for SSL certificates)
sudo apt install certbot -y

# Install UFW (firewall)
sudo apt install ufw -y
```

### Step 2: Deploy Application
```bash
# Clone repository
git clone <your-repo-url>
cd PerfectCircle

# Copy and configure environment
cp .env.production .env
nano .env  # Edit with your production values

# Generate secure passwords
openssl rand -base64 32  # For NEXTAUTH_SECRET
openssl rand -base64 16  # For POSTGRES_PASSWORD
```

### Step 3: Configure Environment Variables
Update `.env` with these **CRITICAL** changes:

```bash
# Generate strong password for database
POSTGRES_PASSWORD=$(openssl rand -base64 16)

# Generate NextAuth secret
NEXTAUTH_SECRET=$(openssl rand -base64 32)

# Set your actual domain
NEXTAUTH_URL=https://yourdomain.com

# Use your actual email credentials
SMTP_PASSWORD=your_actual_email_password
```

### Step 4: Start Production Services
```bash
# Build and start containers
docker-compose up --build -d

# Check if services are running
docker-compose ps

# View logs if needed
docker-compose logs -f
```

## 🔧 Nginx Configuration (Containerized)

The new setup includes Nginx as a Docker container! The configuration is automatically handled through:

- `nginx/nginx.conf` - Main HTTP configuration
- `nginx/ssl-nginx.conf` - HTTPS configuration (when SSL is enabled)

**Key Benefits:**
- ✅ No manual Nginx installation required
- ✅ Configuration is version-controlled
- ✅ Consistent across environments
- ✅ Easy SSL certificate management
- ✅ Built-in security headers and optimizations

## 🔒 SSL Certificate Setup

**New Automated SSL Setup:**
```bash
# Run the automated SSL setup script
./scripts/setup-ssl.sh perfectloop.tech info@perfectloop.tech

# Or manually with certbot
sudo certbot certonly --standalone -d perfectloop.tech -d www.perfectloop.tech
```

The script will automatically:
- ✅ Install SSL certificates
- ✅ Configure Nginx for HTTPS
- ✅ Set up auto-renewal
- ✅ Restart containers with SSL enabled

## 🛡️ Security Hardening

### 1. **Firewall Setup**
```bash
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
```

### 2. **Database Security**
```bash
# The database is only accessible from within Docker network
# No external access needed since it's containerized
```

### 3. **Environment Security**
```bash
# Secure .env file
chmod 600 .env
chown root:root .env
```

## 📊 Monitoring & Maintenance

### Health Checks
```bash
# Check application status
curl -f http://localhost:3000/api/test-email

# Check Docker containers
docker-compose ps

# Check logs
docker-compose logs app
docker-compose logs db
```

### Backup Strategy
```bash
# Database backup script
#!/bin/bash
docker exec perfectcircle-db pg_dump -U perfectcircle_user perfectcircle > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Updates
```bash
# Update application
git pull origin main
docker-compose up --build -d

# Update system
sudo apt update && sudo apt upgrade -y
```

## 🚨 Troubleshooting

### Common Issues:

1. **Port 3000 not accessible**
   - Check if containers are running: `docker-compose ps`
   - Check Nginx configuration: `sudo nginx -t`
   - Check firewall: `sudo ufw status`

2. **Database connection errors**
   - Check database health: `docker-compose logs db`
   - Verify environment variables in `.env`

3. **Email not working**
   - Test email API: `curl http://localhost:3000/api/test-email`
   - Check SMTP credentials in `.env`
   - Verify DNS records (MX, SPF, DKIM)

4. **SSL certificate issues**
   - Renew certificate: `sudo certbot renew`
   - Check certificate status: `sudo certbot certificates`

## 📈 Performance Optimization

### 1. **Docker Resource Limits**
Add to `docker-compose.yml`:
```yaml
services:
  app:
    deploy:
      resources:
        limits:
          memory: 1G
          cpus: '0.5'
  db:
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '0.25'
```

### 2. **Nginx Caching**
Add to Nginx config:
```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

## 🔄 CI/CD (Optional)

For automated deployments, consider setting up:
- GitHub Actions
- GitLab CI/CD
- Jenkins

## 📞 Support

- Monitor logs: `docker-compose logs -f`
- Database access: `docker exec -it perfectcircle-db psql -U perfectcircle_user -d perfectcircle`
- Application shell: `docker exec -it perfectcircle-app sh`

---

**Important**: Always test in a staging environment before deploying to production! 