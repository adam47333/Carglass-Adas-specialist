ADAS Expert V21
- Kentekenveld staat nu bovenaan de voertuigidentificatie.
- VIN is nu een echte lookup-route: /api/vin.
- VIN heeft voorrang op kenteken zodra een geldig 17-teken VIN is ingevuld.
- VIN-decoding gebruikt NHTSA vPIC en toont make/model/modeljaar/body/fuel/engine/deuren waar de database dit rapporteert.
- Nederlandse kentekens blijven via RDW lopen.
- Buitenlandse kentekens zonder officiële registerkoppeling vragen nu om VIN in plaats van een schijnresultaat.
- Bosch ADAS kalibratiepaneel staat na voertuigidentificatie.

V23: datum eerste toelating/registratie duidelijk zichtbaar gemaakt, extra voertuigvelden toegevoegd en mobiele layout aangepast zodat inhoud niet achter de vaste navigatie verdwijnt.

V24: wiper database rebuilt from Bosch official AutoParts catalogue records only. Front/rear are separated. Unverified guessed vehicle matches removed. Model-level matches are shown as model-level; exact variant is not invented.

V25: RDW core vehicle data block added. Shows first admission date (bouwjaar), power, engine displacement, fuel, mass, body, doors, seats, vehicle type and first NL registration. Missing data stays 'Niet bekend'.

V26: motorcode added to visible vehicle core data. Common RDW/API/VIN field names are accepted; missing motorcodes remain 'Niet bekend'.

V27: redesigned workflow: start with only plate/VIN screen; vehicle information, calibration, wipers and help appear after successful lookup. Added focused workshop navigation, help photo/code/voice entry, and a subtle cracked-windscreen visual.

V28: fixed duplicate/chaotic UI. The old application is wrapped into a hidden legacy shell and is shown only after a successful vehicle lookup. Before lookup only the clean VIN/license-plate screen is visible. Compact workshop navigation remains after lookup.
