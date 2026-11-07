#!/usr/bin/env bash
set -euo pipefail

# Default values
SERVER_HOST=""
SSH_KEY_PATH=""
REMOTE_PATH=""
USERNAME=""
RESTART_NGINX=false
STAGING=false

STAGING_SSH_PROFILE="evolvegrappling"
STAGING_PATH="/var/www/html_staging"

RED='\033[31m'
GREEN='\033[32m'
YELLOW='\033[33m'
CYAN='\033[36m'
GRAY='\033[90m'
NC='\033[0m'

usage() {
	echo "Usage: $0 (-h <server_host> | -s) [-k <ssh_key>] [-p <remote_path>] [-u <username>] [-r]"
	echo ""
	echo "Options:"
	echo "  -h, --host       Server hostname, IP or SSH profile (required without -s)"
	echo "  -s, --staging    Deploy to staging (host: $STAGING_SSH_PROFILE, path: $STAGING_PATH)"
	echo "  -k, --key        SSH private key path (default: from SSH config)"
	echo "  -p, --path       Remote path (default: /var/www/html)"
	echo "  -u, --user       SSH username (default: root, with -s: from SSH config)"
	echo "  -r, --restart    Restart nginx after deployment"
	echo ""
	echo "Examples:"
	echo "  $0 --staging"
	echo "  $0 -h your-server.com"
	echo "  $0 -h your-server.com -r"
	echo "  $0 -h your-server.com -k ~/.ssh/mykey -u deploy"
	exit 1
}

# Parse arguments
while [[ $# -gt 0 ]]; do
	case "$1" in
		-h|--host)
			SERVER_HOST="$2"
			shift 2
			;;
		-k|--key)
			SSH_KEY_PATH="$2"
			shift 2
			;;
		-p|--path)
			REMOTE_PATH="$2"
			shift 2
			;;
		-u|--user)
			USERNAME="$2"
			shift 2
			;;
		-r|--restart)
			RESTART_NGINX=true
			shift
			;;
		-s|--staging)
			STAGING=true
			shift
			;;
		*)
			echo "Unknown option: $1"
			usage
			;;
	esac
done

if [[ "$STAGING" == true ]]; then
	: "${SERVER_HOST:=$STAGING_SSH_PROFILE}" "${REMOTE_PATH:=$STAGING_PATH}"
else
	: "${USERNAME:=root}"
fi
: "${REMOTE_PATH:=/var/www/html}"

if [[ -z "$SERVER_HOST" ]]; then
	echo -e "${RED}Error: Server host is required${NC}"
	usage
fi

SSH_TARGET="${USERNAME:+$USERNAME@}$SERVER_HOST"
SSH_OPTS=()
if [[ -n "$SSH_KEY_PATH" ]]; then
	SSH_OPTS=(-i "$SSH_KEY_PATH")
fi

echo -e "${CYAN}=== Starting Evolve Deployment ===${NC}"

# Step 1: Build
echo -e "${YELLOW}Step 1: Building the application...${NC}"

if [[ ! -f "package.json" ]]; then
	echo -e "${RED}✗ package.json not found. Make sure you're running this script from the project root.${NC}"
	exit 1
fi

echo "Running npm run build..."
npm run build || { echo -e "${RED}✗ Build failed${NC}"; exit 1; }

if [[ ! -d "build" ]]; then
	echo -e "${RED}✗ Build directory not found after build completion.${NC}"
	exit 1
fi

echo -e "${GREEN}✓ Build completed successfully${NC}"

# Step 2: Check SSH configuration
echo -e "${YELLOW}Step 2: Checking SSH configuration...${NC}"

if [[ -n "$SSH_KEY_PATH" && ! -f "$SSH_KEY_PATH" ]]; then
	echo -e "${RED}✗ SSH private key not found at $SSH_KEY_PATH${NC}"
	exit 1
fi

if ! command -v ssh &>/dev/null; then
	echo -e "${RED}✗ SSH command not found. Please install OpenSSH client.${NC}"
	exit 1
fi

echo -e "${GREEN}✓ SSH configuration verified${NC}"

# Step 3: Test SSH connection
echo -e "${YELLOW}Step 3: Testing SSH connection...${NC}"

if ! ssh "${SSH_OPTS[@]}" -o ConnectTimeout=10 -o BatchMode=yes "$SSH_TARGET" "echo 'Connection successful'" &>/dev/null; then
	echo -e "${RED}✗ SSH connection failed${NC}"
	exit 1
fi

echo -e "${GREEN}✓ SSH connection successful${NC}"

# Step 4: Upload files
echo -e "${YELLOW}Step 4: Uploading files to remote server...${NC}"

echo "Uploading files to $SSH_TARGET:$REMOTE_PATH..."

if command -v rsync &>/dev/null; then
	rsync -avz --delete --filter="P /redesign/" -e "ssh ${SSH_OPTS[*]}" "build/" "$SSH_TARGET:$REMOTE_PATH/" || {
		echo -e "${RED}✗ File upload failed${NC}"
		exit 1
	}
else
	echo "rsync not found, using scp..."
	scp "${SSH_OPTS[@]}" -r build/* "$SSH_TARGET:$REMOTE_PATH/" || {
		echo -e "${RED}✗ File upload failed${NC}"
		exit 1
	}
fi

echo -e "${GREEN}✓ Files uploaded successfully${NC}"

# Step 5: Restart Nginx if requested
if [[ "$RESTART_NGINX" == true ]]; then
	echo -e "${YELLOW}Step 5: Restarting Nginx...${NC}"
	if ssh "${SSH_OPTS[@]}" "$SSH_TARGET" "systemctl restart nginx" &>/dev/null; then
		echo -e "${GREEN}✓ Nginx restarted successfully${NC}"
	else
		echo -e "${YELLOW}⚠ Nginx restart may have failed, but deployment completed${NC}"
	fi
else
	echo -e "${GRAY}Step 5: Skipping Nginx restart (not requested)${NC}"
fi

echo -e "${CYAN}=== Deployment Completed Successfully ===${NC}"
