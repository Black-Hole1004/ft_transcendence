FROM python:3.10

WORKDIR /app/backend

RUN pip install --upgrade pip

COPY requirements.txt .

RUN pip install  -r requirements.txt

COPY . .

COPY entry_point.sh .

RUN chmod +x entry_point.sh

EXPOSE 8000

CMD ["./entry_point.sh"]
