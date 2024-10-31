FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . .

COPY script.sh .

RUN chmod +x script.sh

EXPOSE 8000

CMD ["./script.sh"]