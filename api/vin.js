export default async function handler(req,res){
  const vin=String(req.query.vin||'').replace(/\s/g,'').toUpperCase();
  if(!/^[A-HJ-NPR-Z0-9]{17}$/.test(vin)){
    return res.status(400).json({error:'VIN moet exact 17 geldige tekens bevatten.'});
  }
  try{
    const url=`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended/${encodeURIComponent(vin)}?format=json`;
    const r=await fetch(url,{headers:{'Accept':'application/json'}});
    if(!r.ok) return res.status(502).json({error:'VIN-database is tijdelijk niet bereikbaar.'});
    const j=await r.json();
    const x=(j.Results||[])[0]||{};
    const bad=[x.ErrorCode,x.ErrorText].filter(Boolean).join(' ');
    const merk=x.Make||x.Manufacturer||'';
    const model=x.Model||'';
    if(!merk && !model) return res.status(404).json({error:'VIN is niet herkend door de VIN-database. Controleer de 17 tekens.'});
    return res.json({
      vin,
      kenteken:'',
      merk,
      handelsbenaming:model,
      model,
      type:x.Trim||x.Series||x.VehicleType||'',
      variant:x.Trim||x.Series||'',
      uitvoering:'',
      typeaanduiding:x.Trim||'',
      fabrikant_intern_model:'',
      modeljaar:x.ModelYear||'',
      bouwjaar:x.ModelYear||'',
      datum_eerste_toelating:'',
      firstRegistration:'',
      voertuigsoort:x.VehicleType||'',
      carrosserie:x.BodyClass||'',
      brandstof:x.FuelTypePrimary||'',
      aandrijving:x.DriveType||x.Drive||'',
      motor:x.EngineModel||x.EngineConfiguration||'',
      motorcode:x.EngineCode||x.EngineType||'',
      cilinderinhoud:x.DisplacementCC ? `${x.DisplacementCC} cc` : '',
      vermogen:x.EngineKW ? `${x.EngineKW} kW` : '',
      massa_ledig_voertuig:'',
      vervaldatum_apk:'',
      aantal_deuren:x.Doors||'',
      aantal_zitplaatsen:'',
      wielbasis:'',
      lengte:'',
      breedte:'',
      hoogte:'',
      source:'NHTSA vPIC',
      vinWarning:bad
    });
  }catch(e){
    return res.status(502).json({error:'VIN-opvraag mislukt. Probeer opnieuw.'});
  }
}
