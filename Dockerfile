# Use an official Python runtime as the base image
FROM python:3.9

# Set the working directory in the container
RUN mkdir /app
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy the Django project code into the container
COPY . /app/

# Expose the port your Django application will run on
EXPOSE 8000

# Define the command to run your Django application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
