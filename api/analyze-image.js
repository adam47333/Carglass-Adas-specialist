import OpenAI from 'openai';
export default async function handler(req,res){
 if(!process.env.OPENAI_API_KEY)return res.status(503).json({error:'AI is nog niet geconfigureerd.'});
 const {image,context}=req.body||{}; if(!image)return res.status(400).json({error:'Geen foto.'});
 try{
  const c=new OpenAI({apiKey:process.env.OPENAI_API_KEY});
  const r=await c.responses.create({model:process.env.OPENAI_MODEL||'gpt-5.6',input:[{role:'user',content:[
   {type:'input_text',text:`Je bent ADAS Expert. Analyseer deze foto. Geef uitsluitend geldig JSON zonder markdown:
{"kern":"wat zie je in 1 zin","stappen":[{"titel":"Controle 1","check":"exact wat de monteur moet controleren","als_fout":"wat daarna doen"}],"volgende_stap":"wat nu doen","klaar":"wat bevestigt dat het opgelost is"}
Maximaal 5 stappen. Kort en praktisch. Geen verzonnen meetwaarden. Context: ${context||'geen'}`},
   {type:'input_image',image_url:image,detail:'high'}]}]});
  res.json({answer:r.output_text||'{}'});
 }catch(e){res.status(502).json({error:'Fotoanalyse mislukt: '+e.message})}
}