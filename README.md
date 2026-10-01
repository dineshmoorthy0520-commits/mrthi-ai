# MRthi AI

Your AI guide, in your language. A voice-first assistant that explains the Tamil Nadu **NEEDS** scheme
in Tamil, Hindi, Telugu, Kannada, Malayalam, Bengali and English.

## Run it

1. Install Node.js 18.18 or newer.
2. In this folder:
   ```
   npm install
   cp .env.example .env      # on Windows: copy .env.example .env
   ```
3. Open `.env` and paste your key after `GEMINI_API_KEY=` (get one at https://aistudio.google.com/apikey).
4. `npm run dev`, then open http://localhost:3000 in **Chrome** (voice works best there).

The key is only read on the server (`lib/gemini.ts`). `.env` is in `.gitignore`. Never commit it.

## Hero picture

Export the illustration from Figma (node 1:47) and save it as `public/images/mrthi-hero.png`.
Until then a simple placeholder is shown.

## How it works

```
Mic button -> browser speech recognition -> text -+
Text box ---------------------------------------- +-> useChat.sendMessage()
                                                      -> POST /api/chat (app/api/chat/route.ts)
                                                      -> Gemini (lib/gemini.ts + lib/systemPrompt.ts)
                                                      -> reply shown + read aloud (speech synthesis)
```

| File | What it does |
| --- | --- |
| `lib/languages.ts` | The 7 languages, speech locales and the small UI texts for each |
| `data/schemes/needs.ts` | Verified NEEDS facts (edit here, nowhere else) |
| `lib/systemPrompt.ts` | MRthi's personality and rules for Gemini |
| `lib/gemini.ts` | Calls Gemini with `@google/genai` (server only). Model: `gemini-flash-latest`, change with `GEMINI_MODEL` in `.env` |
| `app/api/chat/route.ts` | Validates the request and returns `{ reply, language }` |
| `hooks/useChat.ts` | All chat state: language, messages, status, errors |
| `hooks/useSpeechRecognition.ts`, `hooks/useSpeechSynthesis.ts` | Voice in and voice out |
| `components/*` | The Figma sections |

`POST /api/chat` also accepts an optional `history` list (the last few messages) so MRthi can ask one
question at a time and remember the answers.

## Test checklist

- Type one message in each of the 7 languages. The reply must be in the same language.
- Voice (Chrome): choose a language, tap the mic, speak. Check Listening, Thinking, Speaking, then the reply text.
- Deny the microphone permission: a friendly message appears and typing still works.
- Empty message, press Send: friendly message, no request sent.
- Turn off Wi-Fi and send: friendly network message.
- Put a wrong key in `.env`: friendly "something went wrong" message, details only in the terminal.
- Open on a phone (same Wi-Fi: `http://<your-computer-ip>:3000`; microphone needs https or localhost, so for
  phone voice testing deploy to Vercel or use a tunnel).
- Safari/iPhone and Firefox: voice input may be missing. The typing fallback must still work.

## Known limits

- Speech recognition and voices depend on the browser and the device's installed voices.
- Only the NEEDS scheme is supported. Required documents are not verified yet; fill them in `needs.ts`
  once confirmed on the official application form.
