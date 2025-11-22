# Troubleshooting "Failed to fetch" Error

## Common Causes:

1. **Backend server is not running**
   - Make sure the backend server is started
   - Run: `cd backend && npm run dev` or `npm start`
   - Check if server is running on `http://localhost:5000`

2. **CORS Issues**
   - Backend CORS is configured for common frontend ports
   - If using a different port, update `backend/src/index.js` CORS configuration

3. **Database Connection**
   - Make sure database is running and connected
   - Check `DATABASE_URL` in `.env` file

4. **Missing Dependencies**
   - Run `npm install` in the backend directory
   - Make sure `@google/generative-ai` is installed

## Quick Fix Steps:

1. **Start Backend Server:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Check Backend Health:**
   - Open browser: `http://localhost:5000`
   - Should see: "Seedrowz backend running"

3. **Check Frontend Console:**
   - Open browser DevTools (F12)
   - Check Console tab for detailed error messages
   - Check Network tab to see if request is being sent

4. **Verify API Endpoint:**
   - The endpoint should be: `POST http://localhost:5000/api/evaluate-idea`
   - Check Network tab in DevTools to see the actual request URL

5. **Check Environment Variables:**
   - Make sure `GEMINI_API_KEY` is set (or using default)
   - Make sure `DATABASE_URL` is set in `backend/.env`

## Testing the API:

You can test the API directly using curl:
```bash
curl -X POST http://localhost:5000/api/evaluate-idea \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Startup",
    "pitch": "Test pitch",
    "problem": "Test problem",
    "solution": "Test solution",
    "targetAudience": "Test audience",
    "businessModel": "B2B"
  }'
```


