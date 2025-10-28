# Docker Deployment Guide for EduManagePro

This guide explains how to containerize and deploy the EduManagePro web application using Docker, and how to run it on a domain.

## Prerequisites

- Docker and Docker Compose installed on your system
- Git (for cloning repository)
- A domain name (optional, for production deployment)

## Quick Start Locally

1. **Clone the repository and navigate to the project:**
   ```bash
   git clone <your-repo-url>
   cd web-school
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your database URL and other configurations
   ```

3. **Build and run with Docker Compose:**
   ```bash
   docker-compose up --build
   ```

4. **Access the application:**
   - Open your browser and go to `http://localhost:3000`
   - The application will be running in production mode

5. **Stop the application:**
   ```bash
   docker-compose down
   ```

## Docker Commands

### Build the Docker image:
```bash
docker build -t edumanagepro .
```

### Run the container:
```bash
docker run -p 3000:3000 --env-file .env edumanagepro
```

### Using Docker Compose (recommended):
```bash
# Development with auto-reload
docker-compose up

# Production build
docker-compose up --build

# Run in background
docker-compose up -d

# Stop and remove containers
docker-compose down

# View logs
docker-compose logs -f webapp
```

## Environment Configuration

Copy `.env.example` to `.env` and configure:

- **DATABASE_URL**: Your PostgreSQL database connection string
- **PORT**: The port the application will run on (default: 3000)
- **NODE_ENV**: Set to `production` for production builds

## Domain Deployment Options

### Option 1: Deploy to a VPS/Cloud Server (Recommended)

1. **Choose a hosting provider:**
   - DigitalOcean, Linode, AWS EC2, Google Cloud Compute Engine
   - VPS with at least 1GB RAM, 1 CPU core recommended

2. **Server setup:**
   ```bash
   # Update system packages
   sudo apt update && sudo apt upgrade

   # Install Docker and Docker Compose
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo apt install docker-compose-plugin

   # Add user to docker group (optional)
   sudo usermod -aG docker $USER
   ```

3. **Deploy your application:**
   ```bash
   # Clone your repository
   git clone <your-repo-url>
   cd web-school

   # Configure environment
   cp .env.example .env
   # Edit .env with your production settings

   # Start the application
   docker-compose up -d --build
   ```

4. **Configure domain:**
   ```bash
   # Install Nginx as reverse proxy
   sudo apt install nginx

   # Create Nginx configuration
   sudo nano /etc/nginx/sites-available/edumanagepro
   ```

   **Nginx configuration (/etc/nginx/sites-available/edumanagepro):**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   ```bash
   # Enable the site
   sudo ln -s /etc/nginx/sites-available/edumanagepro /etc/nginx/sites-enabled/

   # Test configuration
   sudo nginx -t

   # Restart Nginx
   sudo systemctl restart nginx
   ```

5. **SSL Setup with Let's Encrypt:**
   ```bash
   # Install Certbot
   sudo apt install snapd
   sudo snap install core; sudo snap refresh core
   sudo snap install --classic certbot

   # Get SSL certificate
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

   # Certificates will auto-renew
   ```

### Option 2: Cloud Container Services

#### Render.com (Free tier available):
1. Connect your GitHub repository to Render
2. Use Docker runtime
3. Set environment variables in Render dashboard
4. Deploy automatically on git push

#### Railway.app:
1. Connect Git repository
2. Railway auto-detects Docker
3. Configure environment variables
4. Automatic deployments

#### Fly.io:
```bash
# Install flyctl
curl -L https://fly.io/install.sh | sh

# Login and initialize
fly auth login
fly launch

# Set secrets
fly secrets set DATABASE_URL="your-database-url"

# Deploy
fly deploy
```

### Option 3: Traditional PaaS

#### Heroku:
```bash
# Install Heroku CLI
npm install -g heroku

# Login and create app
heroku login
heroku create your-app-name

# Set environment variables
heroku config:set DATABASE_URL="your-database-url"
heroku config:set NODE_ENV="production"

# Deploy
git push heroku main
```

## Database Setup

Your application uses PostgreSQL. For production:

1. **Managed PostgreSQL services:**
   - Neon.tech (already configured)
   - Supabase
   - PlanetScale
   - AWS RDS
   - Google Cloud SQL

2. **Self-hosted PostgreSQL:**
   - Add PostgreSQL to docker-compose.yml
   - Use persistent volumes for data

## Production Considerations

### Security:
- Keep Docker images updated
- Use environment variables for secrets
- Configure firewall rules
- Use HTTPS in production

### Performance:
- Configure Nginx caching
- Use CDN for static assets
- Monitor resource usage
- Scale horizontally if needed

### Monitoring:
```bash
# Check container health
docker-compose ps

# View resource usage
docker stats

# Check logs
docker-compose logs webapp
```

### Backup Strategy:
- Database backups (if using managed service, check their backup policies)
- Application data backups
- Regular image backups

## Troubleshooting

### Common Issues:

1. **Port already in use:**
   ```bash
   # Find process using port 3000
   sudo lsof -i :3000
   # Kill the process or change port in docker-compose.yml
   ```

2. **Database connection issues:**
   - Check DATABASE_URL in .env
   - Ensure database server is accessible
   - Check firewall rules

3. **Build failures:**
   ```bash
   # Clear Docker cache
   docker system prune -a
   # Rebuild
   docker-compose build --no-cache
   ```

4. **Out of memory:**
   - Increase server RAM
   - Optimize Docker resource limits
   - Monitor container memory usage

## Support

For issues related to the application:
- Check the main README for application-specific documentation
- Review server logs: `docker-compose logs webapp`
- Ensure all environment variables are set correctly

## Updating Your Application

```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose up --build -d
