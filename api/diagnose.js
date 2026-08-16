import OpenAI from 'openai';
export default async function handler(req,res){
 if(!process.env.OPENAI_API_KEY)return res.status(503).json({error:'AI is nog niet geconfigureerd.'});
 const {vehicle,dtc,problem}=req.body||{};
 try{
  const c=new OpenAI({apiKey:process.env.OPENAI_API_KEY});
  const r=await c.responses.create({model:process.env.OPENAI_MODEL||'gpt-5.6',input:`Je bent ADAS Expert voor een professionele monteur. Maak een SNELLE, PRAKTISCHE diagnose. Geef uitsluitend geldig JSON zonder markdown:
{"kern":"1 korte zin met de meest waarschijnlijke richting","stappen":[{"titel":"Controleer voeding","check":"Wat moet de monteur exact controleren, kort en concreet.","waarom":"Waarom deze controle relevant is.","als_fout":"Wat daarna doen."}],"volgende_stap":"De eerstvolgende actie als de stappen goed zijn.","klaar":"Wanneer is de storing opgelost en wat daarna controleren.","veiligheid":"Korte waarschuwing als fabrikantprocedure/kalibratie nodig is."}
Maximaal 6 stappen. Zet snelste/waarschijnlijkste controles bovenaan. Maak een beslisroute: GOED -> volgende stap; FOUT -> herstel dit. Geen verzonnen meetwaarden; exacte waarden via fabrikantprocedure.
Voertuig: ${JSON.stringify(vehicle||{})}
Foutcode: ${dtc||'geen'}
Klacht: ${problem||'geen'}`});
  res.json({answer:r.output_text||'{}'});
 }catch(e){res.status(502).json({error:'AI-fout: '+e.message})}
}