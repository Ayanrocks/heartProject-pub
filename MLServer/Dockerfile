FROM python:3.8
WORKDIR  /usr/src/app
COPY . .
RUN pip install pipenv
RUN pipenv lock --requirements > requirements.txt
RUN  pip install -r requirements.txt
EXPOSE 5001
CMD ["flask", "run", "-p", "5001",  "--host=0.0.0.0"]
