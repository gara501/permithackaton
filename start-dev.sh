#!/bin/bash

concurrently \
  "cd backend && npm run dev" \
  "cd frontend && npm run dev"