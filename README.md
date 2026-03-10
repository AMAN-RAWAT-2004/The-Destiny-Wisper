# Destiny Wisper (Fortune Guesser)

## Run backend

```bash
cd backend
npm install
npm run dev
```

Environment variables (create `backend/.env`):

- `MONGODB_URI`: your MongoDB connection string
- `PUBLIC_BASE_URL`: frontend URL (dev: `http://localhost:5173`)
- `PORT`: backend port (default `4000`)

## Run frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend environment variables (in `frontend/.env`):

- `VITE_API_BASE_URL=http://localhost:4000`

## Endpoints

- `POST /api/fortune` → generates fortune + QR code data URL
- `GET /api/fortune/:qrId` → loads a saved fortune
- `POST /api/compatibility` → playful compatibility score
- `GET /health` → health check

