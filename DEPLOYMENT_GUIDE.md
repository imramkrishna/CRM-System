# Deployment Guide for HarmonySurgiTech

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Database Configuration](#database-configuration)
4. [Backend Deployment](#backend-deployment)
5. [Frontend Deployment](#frontend-deployment)
6. [Production Configuration](#production-configuration)
7. [Monitoring and Maintenance](#monitoring-and-maintenance)
8. [Troubleshooting](#troubleshooting)

## Prerequisites

### System Requirements
- **Node.js**: v18.0.0 or higher
- **npm**: v8.0.0 or higher
- **PostgreSQL**: v14.0 or higher
- **Git**: Latest version
- **SSL Certificate**: For production HTTPS

### Development Environment
```bash
# Verify Node.js version
node --version  # Should be v18+

# Verify npm version
npm --version   # Should be v8+

# Verify PostgreSQL
psql --version  # Should be v14+
```

### Production Environment
- **VPS/Cloud Server**: Minimum 2GB RAM, 2 CPU cores
- **Operating System**: Ubuntu 20.04 LTS or CentOS 8
- **Domain Name**: Configured with DNS
- **SSL Certificate**: Let's Encrypt or commercial certificate

## Environment Setup

### 1. Clone Repository
```bash
# Clone the repository
git clone https://github.com/your-org/HarmonySurgiTech.git
cd HarmonySurgiTech

# Create environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
```

### 2. Backend Environment Configuration
Create `/backend/.env`:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/harmony_surgitech"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-min-32-characters"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-min-32-characters"
JWT_EXPIRE_TIME="15m"
JWT_REFRESH_EXPIRE_TIME="7d"

# Server Configuration
PORT=5000
NODE_ENV="production"
CORS_ORIGIN="https://yourdomain.com"

# Email Configuration (Optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# File Upload Configuration
MAX_FILE_SIZE=5242880  # 5MB
UPLOAD_PATH="/var/uploads"

# Security Configuration
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW=900000    # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100
```

### 3. Frontend Environment Configuration
Create `/frontend/.env.local`:

```env
# API Configuration
NEXT_PUBLIC_API_URL="https://api.yourdomain.com"
NEXT_PUBLIC_APP_URL="https://yourdomain.com"

# Application Configuration
NEXT_PUBLIC_APP_NAME="HarmonySurgiTech"
NEXT_PUBLIC_APP_VERSION="1.0.0"

# Feature Flags
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
NEXT_PUBLIC_ENABLE_ANALYTICS=false

# Third-party Services
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=""
```

## Database Configuration

### 1. PostgreSQL Installation (Ubuntu)
```bash
# Update package index
sudo apt update

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database user
sudo -u postgres createuser --interactive
# Follow prompts to create user with appropriate permissions

# Create database
sudo -u postgres createdb harmony_surgitech
```

### 2. Database Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# Seed initial data (optional)
npx prisma db seed
```

### 3. Database Security
```sql
-- Connect to PostgreSQL as superuser
sudo -u postgres psql

-- Create application user
CREATE USER harmony_app WITH PASSWORD 'secure_password';

-- Grant necessary permissions
GRANT CONNECT ON DATABASE harmony_surgitech TO harmony_app;
GRANT USAGE ON SCHEMA public TO harmony_app;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO harmony_app;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO harmony_app;

-- Set default privileges for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO harmony_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO harmony_app;
```

## Backend Deployment

### 1. Install Dependencies
```bash
cd backend
npm ci --only=production
```

### 2. Build Application
```bash
# Compile TypeScript to JavaScript
npm run build

# Verify build output
ls -la dist/
```

### 3. Process Manager Setup (PM2)
```bash
# Install PM2 globally
npm install -g pm2

# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'harmony-backend',
    script: './dist/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    max_memory_restart: '1G',
    node_args: '--max_old_space_size=1024'
  }]
};
EOF

# Create logs directory
mkdir -p logs

# Start application with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 startup script
pm2 startup

# Verify application is running
pm2 status
```

### 4. Nginx Reverse Proxy
```bash
# Install Nginx
sudo apt install nginx

# Create site configuration
sudo tee /etc/nginx/sites-available/harmony-backend << EOF
server {
    listen 80;
    server_name api.yourdomain.com;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Rate limiting
    limit_req_zone \$binary_remote_addr zone=api:10m rate=10r/s;
    limit_req zone=api burst=20 nodelay;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Health check endpoint
    location /health {
        proxy_pass http://localhost:5000/health;
        access_log off;
    }
}
EOF

# Enable site
sudo ln -s /etc/nginx/sites-available/harmony-backend /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### 5. SSL Certificate (Let's Encrypt)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d api.yourdomain.com

# Verify auto-renewal
sudo certbot renew --dry-run

# Check certificate status
sudo certbot certificates
```

## Frontend Deployment

### 1. Build Application
```bash
cd frontend

# Install dependencies
npm ci

# Build for production
npm run build

# Verify build output
ls -la .next/
```

### 2. Static Export (Optional)
```bash
# For static hosting
npm run export

# Output will be in 'out' directory
ls -la out/
```

### 3. PM2 Deployment (SSR)
```bash
# Create PM2 configuration for Next.js
cat > ecosystem.frontend.config.js << EOF
module.exports = {
  apps: [{
    name: 'harmony-frontend',
    script: 'npm',
    args: 'start',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    max_memory_restart: '1G'
  }]
};
EOF

# Start frontend with PM2
pm2 start ecosystem.frontend.config.js

# Save configuration
pm2 save
```

### 4. Nginx Configuration for Frontend
```bash
# Create frontend site configuration
sudo tee /etc/nginx/sites-available/harmony-frontend << EOF
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    # Static assets caching
    location /_next/static/ {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Favicon and other static files
    location ~* \.(ico|css|js|gif|jpe?g|png|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=86400";
    }
}
EOF

# Enable site
sudo ln -s /etc/nginx/sites-available/harmony-frontend /etc/nginx/sites-enabled/

# Obtain SSL certificate for frontend
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Test and restart Nginx
sudo nginx -t
sudo systemctl restart nginx
```

## Production Configuration

### 1. Database Optimization
```sql
-- Connect to PostgreSQL
sudo -u postgres psql harmony_surgitech

-- Optimize database settings
ALTER SYSTEM SET shared_buffers = '256MB';
ALTER SYSTEM SET effective_cache_size = '1GB';
ALTER SYSTEM SET maintenance_work_mem = '64MB';
ALTER SYSTEM SET checkpoint_completion_target = 0.9;
ALTER SYSTEM SET wal_buffers = '16MB';
ALTER SYSTEM SET default_statistics_target = 100;

-- Reload configuration
SELECT pg_reload_conf();

-- Create indexes for performance
CREATE INDEX CONCURRENTLY idx_products_category ON products(category);
CREATE INDEX CONCURRENTLY idx_products_active ON products(is_active);
CREATE INDEX CONCURRENTLY idx_orders_status ON orders(status);
CREATE INDEX CONCURRENTLY idx_orders_distributor ON orders(distributor_id);

-- Analyze tables for query optimization
ANALYZE;
```

### 2. Security Hardening
```bash
# Configure firewall
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443

# Fail2ban for SSH protection
sudo apt install fail2ban

# Configure fail2ban
sudo tee /etc/fail2ban/jail.local << EOF
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3

[sshd]
enabled = true
port = ssh
logpath = /var/log/auth.log
maxretry = 3
EOF

sudo systemctl restart fail2ban

# Set up automatic security updates
sudo apt install unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
```

### 3. Backup Configuration
```bash
# Create backup script
sudo tee /usr/local/bin/harmony-backup.sh << 'EOF'
#!/bin/bash

# Configuration
DB_NAME="harmony_surgitech"
DB_USER="postgres"
BACKUP_DIR="/var/backups/harmony"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Database backup
pg_dump -U $DB_USER -h localhost $DB_NAME | gzip > $BACKUP_DIR/db_backup_$DATE.sql.gz

# Application files backup
tar -czf $BACKUP_DIR/app_backup_$DATE.tar.gz \
    /home/ubuntu/HarmonySurgiTech \
    --exclude=node_modules \
    --exclude=.git \
    --exclude=dist \
    --exclude=.next

# Clean old backups (keep 7 days)
find $BACKUP_DIR -name "*.gz" -type f -mtime +7 -delete

echo "Backup completed: $DATE"
EOF

# Make script executable
sudo chmod +x /usr/local/bin/harmony-backup.sh

# Add to crontab (daily at 2 AM)
echo "0 2 * * * /usr/local/bin/harmony-backup.sh" | sudo crontab -
```

### 4. Monitoring Setup
```bash
# Install monitoring tools
sudo apt install htop iotop nethogs

# Create monitoring script
sudo tee /usr/local/bin/harmony-monitor.sh << 'EOF'
#!/bin/bash

# Check PM2 processes
echo "=== PM2 Status ==="
pm2 status

# Check Nginx status
echo -e "\n=== Nginx Status ==="
sudo systemctl status nginx --no-pager

# Check PostgreSQL status
echo -e "\n=== PostgreSQL Status ==="
sudo systemctl status postgresql --no-pager

# Check disk usage
echo -e "\n=== Disk Usage ==="
df -h

# Check memory usage
echo -e "\n=== Memory Usage ==="
free -h

# Check application logs
echo -e "\n=== Recent Backend Logs ==="
pm2 logs harmony-backend --lines 10 --nostream

echo -e "\n=== Recent Frontend Logs ==="
pm2 logs harmony-frontend --lines 10 --nostream
EOF

sudo chmod +x /usr/local/bin/harmony-monitor.sh
```

## Monitoring and Maintenance

### 1. Log Management
```bash
# Configure log rotation
sudo tee /etc/logrotate.d/harmony << EOF
/home/ubuntu/HarmonySurgiTech/backend/logs/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 ubuntu ubuntu
    postrotate
        pm2 reload harmony-backend > /dev/null 2>&1 || true
    endscript
}

/home/ubuntu/HarmonySurgiTech/frontend/logs/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 ubuntu ubuntu
    postrotate
        pm2 reload harmony-frontend > /dev/null 2>&1 || true
    endscript
}
EOF

# Test log rotation
sudo logrotate -d /etc/logrotate.d/harmony
```

### 2. Health Checks
```bash
# Create health check script
sudo tee /usr/local/bin/harmony-health.sh << 'EOF'
#!/bin/bash

# Configuration
API_URL="https://api.yourdomain.com"
FRONTEND_URL="https://yourdomain.com"
EMAIL="admin@yourdomain.com"

# Function to send alert
send_alert() {
    local service=$1
    local message=$2
    echo "ALERT: $service - $message" | mail -s "HarmonySurgiTech Alert" $EMAIL
}

# Check API health
api_response=$(curl -s -o /dev/null -w "%{http_code}" $API_URL/health)
if [ "$api_response" != "200" ]; then
    send_alert "API" "Health check failed with status $api_response"
fi

# Check frontend
frontend_response=$(curl -s -o /dev/null -w "%{http_code}" $FRONTEND_URL)
if [ "$frontend_response" != "200" ]; then
    send_alert "Frontend" "Health check failed with status $frontend_response"
fi

# Check database connection
db_status=$(sudo -u postgres psql -c "SELECT 1;" harmony_surgitech 2>&1)
if [[ $db_status == *"ERROR"* ]]; then
    send_alert "Database" "Connection failed: $db_status"
fi

# Check PM2 processes
pm2_status=$(pm2 jlist | jq '.[].pm2_env.status' | grep -v "online" | wc -l)
if [ "$pm2_status" -gt 0 ]; then
    send_alert "PM2" "$pm2_status processes are not online"
fi
EOF

sudo chmod +x /usr/local/bin/harmony-health.sh

# Add to crontab (every 5 minutes)
echo "*/5 * * * * /usr/local/bin/harmony-health.sh" | crontab -
```

### 3. Performance Monitoring
```bash
# Install performance monitoring
sudo apt install sysstat

# Create performance report script
sudo tee /usr/local/bin/harmony-performance.sh << 'EOF'
#!/bin/bash

echo "=== System Performance Report ==="
echo "Generated: $(date)"
echo

echo "CPU Usage:"
top -bn1 | grep "Cpu(s)" | awk '{print $2}' | sed 's/%us,//'

echo -e "\nMemory Usage:"
free -h | grep Mem | awk '{print "Used: " $3 " / " $2 " (" $3/$2*100 "%)"}'

echo -e "\nDisk I/O:"
iostat -x 1 1 | tail -n +4

echo -e "\nNetwork Connections:"
netstat -tuln | grep -E ':(80|443|3000|5000|5432)' | wc -l

echo -e "\nTop Processes by CPU:"
ps aux --sort=-%cpu | head -6

echo -e "\nTop Processes by Memory:"
ps aux --sort=-%mem | head -6
EOF

sudo chmod +x /usr/local/bin/harmony-performance.sh
```

## Troubleshooting

### Common Issues and Solutions

#### 1. Application Won't Start
```bash
# Check PM2 logs
pm2 logs harmony-backend --lines 50
pm2 logs harmony-frontend --lines 50

# Check port availability
sudo netstat -tulpn | grep :5000
sudo netstat -tulpn | grep :3000

# Restart services
pm2 restart harmony-backend
pm2 restart harmony-frontend
```

#### 2. Database Connection Issues
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Test database connection
sudo -u postgres psql harmony_surgitech -c "SELECT 1;"

# Check database logs
sudo tail -f /var/log/postgresql/postgresql-*.log

# Restart PostgreSQL
sudo systemctl restart postgresql
```

#### 3. SSL Certificate Issues
```bash
# Check certificate status
sudo certbot certificates

# Renew certificates
sudo certbot renew

# Test SSL configuration
openssl s_client -connect yourdomain.com:443 -servername yourdomain.com
```

#### 4. High Memory Usage
```bash
# Check memory usage
free -h
ps aux --sort=-%mem | head -10

# Restart PM2 processes
pm2 reload all

# Clear system cache
sudo sync && echo 3 | sudo tee /proc/sys/vm/drop_caches
```

#### 5. Slow Performance
```bash
# Check database performance
sudo -u postgres psql harmony_surgitech
SELECT query, calls, total_time, mean_time 
FROM pg_stat_statements 
ORDER BY total_time DESC 
LIMIT 10;

# Check slow queries
tail -f /var/log/postgresql/postgresql-*.log | grep "slow query"

# Analyze and optimize
VACUUM ANALYZE;
REINDEX DATABASE harmony_surgitech;
```

### Emergency Recovery Procedures

#### Database Recovery
```bash
# Stop application
pm2 stop all

# Restore from backup
gunzip < /var/backups/harmony/db_backup_YYYYMMDD_HHMMSS.sql.gz | sudo -u postgres psql harmony_surgitech

# Restart application
pm2 start all
```

#### Application Recovery
```bash
# Restore application files
cd /home/ubuntu
tar -xzf /var/backups/harmony/app_backup_YYYYMMDD_HHMMSS.tar.gz

# Reinstall dependencies
cd HarmonySurgiTech/backend && npm ci
cd ../frontend && npm ci

# Rebuild applications
cd backend && npm run build
cd ../frontend && npm run build

# Restart services
pm2 restart all
```

### Maintenance Checklist

#### Daily
- [ ] Check application status (`pm2 status`)
- [ ] Review error logs
- [ ] Monitor disk space
- [ ] Verify backups completed

#### Weekly
- [ ] Update system packages (`sudo apt update && sudo apt upgrade`)
- [ ] Review performance metrics
- [ ] Check SSL certificate expiry
- [ ] Clean old log files

#### Monthly
- [ ] Database performance analysis
- [ ] Security audit
- [ ] Backup restoration test
- [ ] Review and update documentation
- [ ] Check for application updates

This deployment guide provides comprehensive instructions for deploying HarmonySurgiTech to production, including security, monitoring, and maintenance procedures.
