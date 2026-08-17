export default async function handler(req,res){
 const p=String(req.query.kenteken||'').replace(/[^A-Za-z0-9]/g,'').toUpperCase();
 if(!p)return res.status(400).json({error:'Kenteken ontbreekt.'});
 try{
  const r=await fetch(`https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=${encodeURIComponent(p)}`);
  const a=await r.json(); if(!a.length)return res.status(404).json({error:'Kenteken niet gevonden.'});
  const x=a[0];

  const kw=x.netto_maximumvermogen||x.maximum_vermogen||'';
  const power=kw ? `${kw} kW` : '';
  const first=x.datum_eerste_toelating||'';
  const year=first ? String(first).slice(0,4) : '';

  res.json({
   kenteken:x.kenteken||'',
   merk:x.merk||'',
   handelsbenaming:x.handelsbenaming||'',
   model:x.handelsbenaming||'',
   type:x.type||'',
   variant:x.variant||'',
   uitvoering:x.uitvoering||'',
   typeaanduiding:x.type||'',
   fabrikant_intern_model:'',
   voertuigsoort:x.voertuigsoort||'',
   datum_eerste_toelating:first,
   firstRegistration:first,
   bouwjaar:year,
   modeljaar:x.modeljaar||'',
   brandstof:x.brandstof_1||x.brandstof||'',
   aandrijving:x.aandrijving||x.soort_aandrijving||'',
   carrosserie:x.inrichting||x.carrosserie||'',
   massa_ledig_voertuig:x.massa_ledig_voertuig ? `${x.massa_ledig_voertuig} kg` : '',
   vervaldatum_apk:x.vervaldatum_apk||'',
   cilinderinhoud:x.cilinderinhoud ? `${x.cilinderinhoud} cc` : '',
   aantal_deuren:x.aantal_deuren||'',
   aantal_zitplaatsen:x.aantal_zitplaatsen||'',
   wielbasis:x.wielbasis ? `${x.wielbasis} mm` : '',
   lengte:x.lengte ? `${x.lengte} mm` : '',
   breedte:x.breedte ? `${x.breedte} mm` : '',
   hoogte:x.hoogte ? `${x.hoogte} mm` : '',
   vermogen:power,
   motorcode:x.motorcode||'',
   motor:x.motortype||'',
   source:'RDW Open Data'
  });
 }catch(e){res.status(502).json({error:'RDW-opvraag mislukt.'})}
}
