FROM python:3.10-slim

WORKDIR /app/backend

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

COPY entry_point.sh .

RUN chmod +x entry_point.sh

EXPOSE 8000

CMD ["./entry_point.sh"]