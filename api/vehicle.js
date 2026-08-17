export default async function handler(req,res){
 const p=String(req.query.kenteken||'').replace(/[^A-Za-z0-9]/g,'').toUpperCase();
 if(!p)return res.status(400).json({error:'Kenteken ontbreekt.'});
 try{
  const r=await fetch(`https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=${encodeURIComponent(p)}`);
  const a=await r.json(); if(!a.length)return res.status(404).json({error:'Kenteken niet gevonden.'});
  const x=a[0];
  res.json({
   kenteken:x.kenteken||'',merk:x.merk||'',handelsbenaming:x.handelsbenaming||'',
   voertuigsoort:x.voertuigsoort||'',datum_eerste_toelating:x.datum_eerste_toelating||'',
   brandstof:x.brandstof_1||x.brandstof||'',carrosserie:x.inrichting||x.carrosserie||'',
   massa_ledig_voertuig:x.massa_ledig_voertuig||'',vervaldatum_apk:x.vervaldatum_apk||'',
   cilinderinhoud:x.cilinderinhoud||'',aantal_deuren:x.aantal_deuren||'',
   vermogen:x.vermogen||x.netto_maximumvermogen||''
  })
 }catch(e){res.status(502).json({error:'RDW-opvraag mislukt.'})}
}