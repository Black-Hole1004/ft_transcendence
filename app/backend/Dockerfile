FROM python:3.10

WORKDIR /app/backend
RUN apt-get update && apt-get install -y netcat-openbsd
RUN pip install --upgrade pip

COPY requirements.txt .

RUN pip install  -r requirements.txt

COPY . .

COPY entry_point.sh .

RUN chmod +x entry_point.sh

EXPOSE 8000

ENTRYPOINT ["bash", "./entry_point.sh"]
