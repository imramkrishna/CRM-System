# Troubleshooting Guide for HarmonySurgiTech

## Table of Contents
1. [Quick Diagnostics](#quick-diagnostics)
2. [Application Issues](#application-issues)
3. [Database Issues](#database-issues)
4. [Authentication Problems](#authentication-problems)
5. [Performance Issues](#performance-issues)
6. [Deployment Issues](#deployment-issues)
7. [Development Environment](#development-environment)
8. [Common Error Messages](#common-error-messages)
9. [Emergency Procedures](#emergency-procedures)

## Quick Diagnostics

### System Health Check Script
```bash
#!/bin/bash
echo "=== HarmonySurgiTech System Health Check ==="
echo "Timestamp: $(date)"
echo

# Check services
echo "1. Service Status:"
echo "   Backend (PM2): $(pm2 list | grep harmony-backend | awk '{print $10}')"
echo "   Frontend (PM2): $(pm2 list | grep harmony-frontend | awk '{print $10}')"
echo "   PostgreSQL: $(systemctl is-active postgresql)"
echo "   Nginx: $(systemctl is-active nginx)"
echo

# Check ports
echo "2. Port Status:"
echo "   :3000 (Frontend): $(ss -tuln | grep :3000 | wc -l) connections"
echo "   :5000 (Backend): $(ss -tuln | grep :5000 | wc -l) connections"
echo "   :5432 (PostgreSQL): $(ss -tuln | grep :5432 | wc -l) connections"
echo

# Check resources
echo "3. Resource Usage:"
echo "   CPU: $(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | sed 's/%us,//')%"
echo "   Memory: $(free | grep Mem | awk '{printf "%.1f%%", $3/$2 * 100.0}')"
echo "   Disk: $(df -h / | awk 'NR==2{printf "%s", $5}')"
echo

# Check logs for errors
echo "4. Recent Errors:"
backend_errors=$(pm2 logs harmony-backend --lines 10 --nostream 2>/dev/null | grep -i error | wc -l)
frontend_errors=$(pm2 logs harmony-frontend --lines 10 --nostream 2>/dev/null | grep -i error | wc -l)
echo "   Backend errors (last 10 lines): $backend_errors"
echo "   Frontend errors (last 10 lines): $frontend_errors"
```

### Quick Fix Commands
```bash
# Restart all services
sudo systemctl restart nginx postgresql
pm2 restart all

# Clear cache and logs
pm2 flush
sudo systemctl reload nginx

# Check connectivity
curl -I http://localhost:3000  # Frontend
curl -I http://localhost:5000/health  # Backend API
```

## Application Issues

### Frontend Not Loading

#### Symptoms
- White screen or loading spinner
- 500 Internal Server Error
- Connection refused errors

#### Diagnosis Steps
```bash
# Check if Next.js is running
pm2 list | grep harmony-frontend

# Check frontend logs
pm2 logs harmony-frontend --lines 50

# Check if port 3000 is available
sudo netstat -tulpn | grep :3000

# Test direct connection
curl -v http://localhost:3000
```

#### Common Solutions
```bash
# Solution 1: Restart frontend
pm2 restart harmony-frontend

# Solution 2: Clear Next.js cache
cd frontend
rm -rf .next
npm run build
pm2 restart harmony-frontend

# Solution 3: Check environment variables
cat frontend/.env.local
# Ensure NEXT_PUBLIC_API_URL is correct

# Solution 4: Rebuild with verbose logging
cd frontend
npm run build -- --debug
```

### Backend API Not Responding

#### Symptoms
- API requests timeout
- 502 Bad Gateway errors
- Database connection errors

#### Diagnosis Steps
```bash
# Check backend process
pm2 logs harmony-backend --lines 50

# Test API health endpoint
curl -v http://localhost:5000/health

# Check database connection
cd backend
npx prisma db pull

# Check environment variables
cat backend/.env | grep -v PASSWORD
```

#### Common Solutions
```bash
# Solution 1: Restart backend
pm2 restart harmony-backend

# Solution 2: Check database connection
cd backend
npx prisma generate
npx prisma migrate deploy

# Solution 3: Clear Node.js cache
cd backend
rm -rf node_modules package-lock.json
npm install
npm run build
pm2 restart harmony-backend

# Solution 4: Check JWT secrets
# Ensure JWT_SECRET and JWT_REFRESH_SECRET are set in .env
```

### Build Failures

#### Frontend Build Issues
```bash
# Common TypeScript errors
cd frontend
npm run type-check

# Memory issues during build
export NODE_OPTIONS="--max_old_space_size=4096"
npm run build

# Dependency conflicts
rm -rf node_modules package-lock.json
npm install

# ESLint errors
npm run lint -- --fix
```

#### Backend Build Issues
```bash
# TypeScript compilation errors
cd backend
npx tsc --noEmit

# Prisma schema issues
npx prisma format
npx prisma validate
npx prisma generate

# Missing dependencies
npm audit fix
npm install
```

## Database Issues

### Connection Problems

#### Symptoms
- "ECONNREFUSED" errors
- "database does not exist" errors
- Authentication failures

#### Diagnosis Steps
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Test direct connection
sudo -u postgres psql harmony_surgitech

# Check connection string
cd backend
echo $DATABASE_URL

# Check database exists
sudo -u postgres psql -l | grep harmony
```

#### Solutions
```bash
# Start PostgreSQL
sudo systemctl start postgresql

# Create missing database
sudo -u postgres createdb harmony_surgitech

# Reset database permissions
sudo -u postgres psql << EOF
GRANT ALL PRIVILEGES ON DATABASE harmony_surgitech TO your_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_user;
EOF

# Test Prisma connection
cd backend
npx prisma db pull
```

### Migration Issues

#### Schema Drift
```bash
# Check migration status
cd backend
npx prisma migrate status

# Reset if needed (DEVELOPMENT ONLY)
npx prisma migrate reset

# Apply pending migrations
npx prisma migrate deploy
```

#### Data Loss Prevention
```bash
# Backup before migration
pg_dump -U postgres harmony_surgitech > backup_before_migration.sql

# Create manual migration
npx prisma migrate dev --create-only --name manual_fix

# Edit generated migration file before applying
npx prisma migrate deploy
```

### Performance Issues

#### Slow Queries
```sql
-- Enable query logging (postgresql.conf)
log_statement = 'all'
log_min_duration_statement = 1000

-- Find slow queries
SELECT query, calls, total_time, mean_time 
FROM pg_stat_statements 
ORDER BY total_time DESC 
LIMIT 10;

-- Analyze table statistics
ANALYZE;

-- Check index usage
SELECT schemaname, tablename, attname, n_distinct, correlation 
FROM pg_stats 
WHERE tablename = 'products';
```

#### Index Optimization
```sql
-- Create missing indexes
CREATE INDEX CONCURRENTLY idx_products_active_category 
ON products(is_active, category);

CREATE INDEX CONCURRENTLY idx_orders_distributor_status 
ON orders(distributor_id, status);

-- Monitor index usage
SELECT schemaname, tablename, indexname, idx_tup_read, idx_tup_fetch 
FROM pg_stat_user_indexes;
```

## Authentication Problems

### JWT Token Issues

#### Symptoms
- "Token expired" errors
- "Invalid token" errors
- Users logged out unexpectedly

#### Diagnosis
```bash
# Check JWT configuration
cd backend
grep JWT_ .env

# Test token generation
node -e "
const jwt = require('jsonwebtoken');
const token = jwt.sign({id: 1}, process.env.JWT_SECRET, {expiresIn: '15m'});
console.log('Token:', token);
try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log('Valid:', decoded);
} catch(e) {
  console.log('Error:', e.message);
}
"
```

#### Solutions
```bash
# Regenerate JWT secrets
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Update .env with new secrets
# JWT_SECRET=new_secret_here
# JWT_REFRESH_SECRET=new_refresh_secret_here

# Clear all existing tokens (users will need to re-login)
sudo -u postgres psql harmony_surgitech << EOF
UPDATE users SET refresh_token = NULL;
EOF

# Restart backend
pm2 restart harmony-backend
```

### Session Management

#### Persistent Login Issues
```javascript
// Debug token storage (browser console)
localStorage.getItem('accessToken');
localStorage.getItem('refreshToken');

// Clear all auth data
localStorage.clear();
sessionStorage.clear();

// Check cookie settings
document.cookie; // View all cookies
```

### Role-Based Access

#### Permission Errors
```sql
-- Check user roles
SELECT id, email, role FROM users WHERE email = 'user@example.com';

-- Update user role
UPDATE users SET role = 'admin' WHERE email = 'user@example.com';

-- Check distributor approval status
SELECT * FROM pending_distributors WHERE email = 'dist@example.com';
```

## Performance Issues

### Memory Leaks

#### Node.js Memory Issues
```bash
# Monitor memory usage
pm2 monit

# Check heap dump
node --inspect=0.0.0.0:9229 dist/index.js
# Use Chrome DevTools to connect

# Restart on memory limit
pm2 start ecosystem.config.js --max-memory-restart 1G
```

#### Database Memory
```sql
-- Check database memory usage
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Clear unused connections
SELECT pg_terminate_backend(pid) 
FROM pg_stat_activity 
WHERE state = 'idle' AND state_change < now() - interval '30 minutes';
```

### Slow API Responses

#### Frontend Performance
```javascript
// Check API response times (browser console)
performance.getEntriesByType('navigation')[0].loadEventEnd;

// Monitor network requests
// Open DevTools → Network tab
// Look for slow requests (red indicators)

// Check bundle size
npm run analyze // If configured
```

#### Backend Optimization
```bash
# Enable request logging
cd backend
# Add to index.ts:
# app.use(morgan('combined'));

# Check slow endpoints
pm2 logs harmony-backend | grep "slow\|timeout\|error"

# Profile specific routes
# Add timing middleware to measure response times
```

## Deployment Issues

### Environment Variables

#### Missing Configuration
```bash
# Check all required variables
cd backend && cat .env.example
cd frontend && cat .env.example

# Compare with actual
diff backend/.env.example backend/.env
diff frontend/.env.example frontend/.env.local
```

#### Environment-Specific Issues
```bash
# Development vs Production differences
echo $NODE_ENV

# Check CORS settings
curl -H "Origin: https://yourdomain.com" \
     -H "Access-Control-Request-Method: POST" \
     -X OPTIONS \
     http://localhost:5000/auth/login

# Verify API URLs
cd frontend
grep -r "localhost" src/ # Should not exist in production
```

### SSL/HTTPS Issues

#### Certificate Problems
```bash
# Check certificate status
sudo certbot certificates

# Test SSL handshake
openssl s_client -connect yourdomain.com:443 -servername yourdomain.com

# Renew certificates
sudo certbot renew --dry-run

# Check Nginx SSL configuration
sudo nginx -t
sudo nginx -T | grep ssl
```

### Load Balancer Issues

#### Nginx Configuration
```bash
# Test Nginx config
sudo nginx -t

# Check upstream health
curl -H "Host: yourdomain.com" http://localhost/health

# Monitor Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## Development Environment

### Node.js Version Issues

#### Version Conflicts
```bash
# Check Node.js version
node --version
npm --version

# Use Node Version Manager
nvm list
nvm use 18.17.0

# Clear npm cache
npm cache clean --force
```

#### Package Conflicts
```bash
# Check for duplicate packages
npm ls | grep -E "UNMET|peer"

# Fix peer dependencies
npm install --save-peer

# Update packages
npm audit fix
npm update
```

### IDE Integration

#### TypeScript Errors
```bash
# Restart TypeScript server
# VS Code: Ctrl+Shift+P → "TypeScript: Restart TS Server"

# Check TypeScript configuration
cd frontend && npx tsc --noEmit
cd backend && npx tsc --noEmit

# Update types
npm update @types/node @types/react
```

#### ESLint/Prettier Issues
```bash
# Fix linting errors
npm run lint -- --fix

# Format code
npm run format

# Check configuration
cat .eslintrc.json
cat .prettierrc
```

## Common Error Messages

### Frontend Errors

#### "Hydration failed"
```javascript
// Solution: Check for client/server rendering differences
// Add suppressHydrationWarning to problematic elements
<div suppressHydrationWarning={true}>
  {typeof window !== 'undefined' && clientOnlyContent}
</div>
```

#### "Module not found"
```bash
# Clear Next.js cache
rm -rf .next
npm run build

# Check import paths
# Use absolute imports with tsconfig.json paths
```

#### "Cannot read property of undefined"
```javascript
// Add proper null checks
const user = userData?.user;
const name = user?.name ?? 'Unknown';

// Use optional chaining
user?.orders?.map(order => ...)
```

### Backend Errors

#### "EADDRINUSE: Address already in use"
```bash
# Find process using port
sudo lsof -i :5000
sudo netstat -tulpn | grep :5000

# Kill process
sudo kill -9 <PID>

# Or use different port
export PORT=5001
```

#### "Prisma Client validation error"
```bash
# Regenerate Prisma client
npx prisma generate

# Check schema validity
npx prisma validate

# Reset if needed
npx prisma migrate reset
```

#### "Cannot connect to database"
```bash
# Check PostgreSQL service
sudo systemctl status postgresql

# Test connection
sudo -u postgres psql

# Check connection string
echo $DATABASE_URL
```

### Database Errors

#### "relation does not exist"
```sql
-- Check if table exists
\dt

-- Run migrations
npx prisma migrate deploy

-- Check schema
\d products
```

#### "duplicate key value violates unique constraint"
```sql
-- Find duplicate data
SELECT sku, COUNT(*) 
FROM products 
GROUP BY sku 
HAVING COUNT(*) > 1;

-- Remove duplicates before adding constraint
```

## Emergency Procedures

### Complete System Recovery

#### Service Restart Sequence
```bash
# 1. Stop all services
pm2 stop all
sudo systemctl stop nginx

# 2. Check for hanging processes
ps aux | grep node
ps aux | grep nginx

# 3. Restart database
sudo systemctl restart postgresql

# 4. Start application services
pm2 start all

# 5. Start web server
sudo systemctl start nginx

# 6. Verify everything is running
pm2 status
sudo systemctl status nginx postgresql
```

#### Database Recovery
```bash
# 1. Stop applications
pm2 stop all

# 2. Backup current state
pg_dump -U postgres harmony_surgitech > emergency_backup.sql

# 3. Restore from backup
sudo -u postgres dropdb harmony_surgitech
sudo -u postgres createdb harmony_surgitech
sudo -u postgres psql harmony_surgitech < latest_backup.sql

# 4. Run migrations
cd backend
npx prisma migrate deploy

# 5. Restart applications
pm2 start all
```

### Rollback Procedures

#### Application Rollback
```bash
# 1. Stop current version
pm2 stop all

# 2. Restore previous version
git checkout <previous-commit>

# 3. Rebuild applications
cd backend && npm run build
cd frontend && npm run build

# 4. Restart services
pm2 start all
```

#### Database Rollback
```bash
# 1. Restore database from backup
sudo -u postgres psql harmony_surgitech < backup_before_deployment.sql

# 2. Reset migration state
cd backend
npx prisma migrate resolve --rolled-back <migration-name>

# 3. Apply correct migrations
npx prisma migrate deploy
```

### Contact Information

For critical issues requiring immediate assistance:

- **System Administrator**: admin@yourdomain.com
- **Database Administrator**: dba@yourdomain.com
- **Emergency Hotline**: +1-XXX-XXX-XXXX

### Escalation Matrix

1. **Level 1** (Development): Try automated fixes and restart services
2. **Level 2** (System Admin): Database issues, server problems
3. **Level 3** (Emergency): Data loss, security breaches, complete system failure

Keep this troubleshooting guide handy and regularly update it based on new issues encountered in production.
