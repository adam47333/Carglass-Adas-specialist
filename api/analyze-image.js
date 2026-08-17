import OpenAI from 'openai';
export default async function handler(req,res){
 if(req.method!=='POST') return res.status(405).json({error:'POST vereist.'});
 if(!process.env.OPENAI_API_KEY)return res.status(503).json({error:'AI is niet geconfigureerd.'});
 const {image,context}=req.body||{}; if(!image)return res.status(400).json({error:'Geen foto.'});
 try{
  const c=new OpenAI({apiKey:process.env.OPENAI_API_KEY});
  const r=await c.responses.create({model:process.env.OPENAI_MODEL||'gpt-5.6',input:[{role:'system',content:'Je bent ADAS Expert. Analyseer alleen wat daadwerkelijk zichtbaar is. Geen verzonnen foutcodes of meetwaarden. Geef een korte praktische controlevolgorde in Nederlands.'},{role:'user',content:[{type:'input_text',text:`Analyseer deze foto. Context: ${context||'geen'}`},{type:'input_image',image_url:image,detail:'high'}]}],text:{format:{type:'json_schema',name:'adas_photo_diagnosis',strict:true,schema:{type:'object',additionalProperties:false,properties:{kern:{type:'string'},zichtbaar:{type:'string'},stappen:{type:'array',items:{type:'object',additionalProperties:false,properties:{nummer:{type:'integer'},titel:{type:'string'},check:{type:'string'},als_fout:{type:'string'}},required:['nummer','titel','check','als_fout']}},volgende_stap:{type:'string'},veiligheid:{type:'string'}},required:['kern','zichtbaar','stappen','volgende_stap','veiligheid']}}}});
  let parsed; try{parsed=JSON.parse(r.output_text||'{}')}catch{parsed={kern:r.output_text||'',zichtbaar:'',stappen:[],volgende_stap:'',veiligheid:''}};
  return res.json({answer:parsed});
 }catch(e){return res.status(502).json({error:'Fotoanalyse mislukt: '+e.message})}
}
