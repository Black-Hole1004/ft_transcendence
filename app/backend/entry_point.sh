#!/bin/bash

# Add debugging output
echo "Starting entry point script..."

# Allow some time for the database to start
echo "Sleeping for 20 seconds..."
sleep 20

# Run migrations and start the server
# echo "Running migrations..."
python manage.py makemigrations && python manage.py migrate

echo "Starting Django server..."
python manage.py runserver 0.0.0.0:8000