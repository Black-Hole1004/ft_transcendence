#!/bin/bash

# Build the frontend
npm run build

#start the server 
npm run preview -- --host --port --port 5173
