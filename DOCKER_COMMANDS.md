# Docker Commands Reference

## 🚀 **New Containerized Setup**

Your application now includes:
- ✅ **App Container**: Next.js application 
- ✅ **Database Container**: PostgreSQL
- ✅ **Nginx Container**: Reverse proxy with SSL support
- ✅ **Automatic Configuration**: No manual server setup required

## 📋 **Common Commands**

### **Start/Stop Application**
```bash
# Start all services (production)
docker-compose up -d

# Start all services with build
docker-compose up --build -d

# Stop all services
docker-compose down

# Stop and remove volumes (⚠️ deletes database data)
docker-compose down -v
```

### **View Logs**
```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f app
docker-compose logs -f nginx
docker-compose logs -f db
```

### **Check Status**
```bash
# Check container status
docker-compose ps

# Check container health
docker-compose exec app health-check
docker-compose exec nginx nginx -t
```

### **Database Operations**
```bash
# Access PostgreSQL database
docker-compose exec db psql -U perfectcircle_user -d perfectcircle

# Backup database
docker-compose exec db pg_dump -U perfectcircle_user perfectcircle > backup.sql

# Restore database
docker-compose exec -T db psql -U perfectcircle_user -d perfectcircle < backup.sql
```

### **Application Access**
```bash
# Access application shell
docker-compose exec app sh

# Access nginx shell
docker-compose exec nginx sh

# Test email functionality
curl http://localhost/api/test-email
curl https://yourdomain.com/api/test-email
```

### **SSL Management**
```bash
# Setup SSL automatically
./scripts/setup-ssl.sh yourdomain.com your@email.com

# Manually renew certificates
certbot renew --deploy-hook "docker-compose restart nginx"

# Switch to SSL configuration
cp nginx/ssl-nginx.conf nginx/nginx.conf
docker-compose restart nginx
```

### **Updates and Maintenance**
```bash
# Pull latest images
docker-compose pull

# Rebuild and restart
docker-compose up --build -d

# Clean unused Docker resources
docker system prune -a

# Update application code
git pull origin main
docker-compose up --build -d
```

### **Troubleshooting**
```bash
# Check nginx configuration
docker-compose exec nginx nginx -t

# Restart specific service
docker-compose restart app
docker-compose restart nginx
docker-compose restart db

# View container resource usage
docker stats

# Inspect container details
docker-compose exec app env
docker-compose logs --tail 50 app
```

### **Development vs Production**
```bash
# Development (with hot reload)
docker-compose -f docker-compose.dev.yml up

# Production (optimized build)
docker-compose up -d
```

## 🌐 **Network Architecture**

```
Internet → Port 80/443 → Nginx Container → Port 3000 → App Container
                                                      ↓
                                               PostgreSQL Container
```

## 📊 **Health Checks**

The setup includes automatic health checks:
- **Nginx**: Configuration validation
- **Database**: PostgreSQL ready check
- **Application**: Built-in Next.js health

## 🔒 **Security Features**

- ✅ **Internal networking**: App not directly exposed
- ✅ **Security headers**: Configured in Nginx
- ✅ **Rate limiting**: Built into Nginx config
- ✅ **SSL/TLS**: Automated certificate management
- ✅ **Firewall ready**: Only ports 80/443 needed

## 🚀 **Deployment Benefits**

| Feature | Manual Setup | Containerized Setup |
|---------|-------------|-------------------|
| **Nginx Installation** | Manual | ✅ Automatic |
| **Configuration** | Manual files | ✅ Version controlled |
| **SSL Setup** | Manual commands | ✅ Automated script |
| **Updates** | Manual | ✅ `docker-compose pull` |
| **Consistency** | Environment dependent | ✅ Identical everywhere |
| **Backup** | Complex | ✅ Simple volume backup |

---

**Pro Tip**: All configuration is now in your repository, making deployments consistent and repeatable! 🎉 