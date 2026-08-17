import OpenAI from 'openai';
export default async function handler(req,res){
 if(req.method!=='POST') return res.status(405).json({error:'POST vereist.'});
 if(!process.env.OPENAI_API_KEY) return res.status(503).json({error:'AI is niet geconfigureerd op deze Vercel-deployment. Voeg OPENAI_API_KEY toe en deploy opnieuw.'});
 const {vehicle,dtc,problem}=req.body||{};
 try{
  const c=new OpenAI({apiKey:process.env.OPENAI_API_KEY});
  const r=await c.responses.create({
   model:process.env.OPENAI_MODEL||'gpt-5.6',
   input:[
    {role:'system',content:'Je bent ADAS Expert voor een professionele autoruit/ADAS-monteur. Antwoord in helder Nederlands. Geef een korte, praktische beslisroute. Nooit meetwaarden, Bosch-targets, kalibratiemethoden of onderdelen verzinnen. Als voertuiggegevens ontbreken, zeg dat expliciet.'},
    {role:'user',content:`Voertuig: ${JSON.stringify(vehicle||{})}\nFoutcode: ${dtc||'geen'}\nKlacht: ${problem||'geen'}\nMaak maximaal 6 controles, van snel/waarschijnlijk naar uitgebreider. Per controle: wat controleren, waarom, en wat doen bij fout. Geef ook de eerstvolgende actie, wanneer klaar, en een veiligheidsnotitie.`}
   ],
   text:{format:{type:'json_schema',name:'adas_diagnosis',strict:true,schema:{type:'object',additionalProperties:false,properties:{kern:{type:'string'},stappen:{type:'array',items:{type:'object',additionalProperties:false,properties:{nummer:{type:'integer'},titel:{type:'string'},check:{type:'string'},waarom:{type:'string'},als_fout:{type:'string'}},required:['nummer','titel','check','waarom','als_fout']}},volgende_stap:{type:'string'},klaar:{type:'string'},veiligheid:{type:'string'}},required:['kern','stappen','volgende_stap','klaar','veiligheid']}}}
  });
  let parsed; try{parsed=JSON.parse(r.output_text||'{}')}catch{parsed={kern:r.output_text||'Geen analyse ontvangen.',stappen:[],volgende_stap:'',klaar:'',veiligheid:''}}
  return res.json({answer:parsed});
 }catch(e){return res.status(502).json({error:'AI-fout: '+e.message})}
}
