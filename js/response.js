// Function to get contextual AI responses using a free API
export { generateAIResponse };

async function generateAIResponse(context) {
    try {
        // Using a free proxy to OpenAI's API (no API key required)
        // This is a community-maintained service, so availability may vary
        const response = await fetch('https://api.openai-proxy.org/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'Sei un assistente amichevole e disponibile. Rispondi in modo conciso e naturale, come in una chat tra amici. Usa un tono amichevole e informale. Rispondi sempre in italiano.'
                    },
                    {
                        role: 'user',
                        content: context
                    }
                ],
                max_tokens: 150,
                temperature: 0.7
            })
        });
        
        if (!response.ok) {
            throw new Error(`Errore nella richiesta API: ${response.status}`);
        }
        
        const data = await response.json();
        return { rndMsg: data.choices[0].message.content.trim() };
        
    } catch (error) {
        console.error('Errore nella generazione della risposta:', error);
        
        // Risposte di fallback in italiano
        const fallbackResponses = [
            "Interessante! Dimmi di più.",
            "Non sono sicuro di aver capito, puoi riformulare?",
            "Grazie del messaggio! C'è altro che vuoi sapere?",
            "Fammi pensare un attimo...",
            "Che bella domanda! Vediamo un po'...",
            "Sono qui per aiutarti! C'è qualcos'altro?",
            "Grazie per la pazienza, sto pensando alla risposta migliore.",
            "Mi piace come ragioni! C'è altro che ti interessa?",
            "Ottimo spunto di riflessione!"
        ];
        
        // Se il contesto è una domanda, aggiungi risposte più specifiche
        if (context.includes('?') || context.toLowerCase().includes('chi è') || 
            context.toLowerCase().includes('cosa') || context.toLowerCase().includes('come')) {
            fallbackResponses.push(
                "Mi dispiace, non ho abbastanza informazioni per rispondere ora.",
                "Potrei sbagliarmi, ma credo che...",
                "Non ho una risposta precisa, ma potrei aiutarti a trovare informazioni!"
            );
        }
        
        // Restituisci una risposta casuale
        return { 
            rndMsg: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)] 
        };
    }
}