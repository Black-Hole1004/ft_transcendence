#!/bin/bash

# Add debugging output
echo "Starting entry point script..."


# Run migrations and start the server
# echo "Running migrations..."
python manage.py makemigrations && python manage.py migrate

echo "Starting Django server..."
python manage.py runserver 0.0.0.0:8000