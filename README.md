# ADAS Expert V33

Changes:
- Vehicle page now shows a comprehensive technical-data grid after a successful lookup.
- Fields include brand, model, type, variant, trim/execution, model year, first registration, type designation, fuel, drive, power, displacement, engine code, body, mass, doors, seats, dimensions and APK when the source provides them.
- Missing values are shown as unavailable rather than fabricated.
- RDW backend returns richer public vehicle data.
- VIN backend maps equivalent fields where vPIC provides them.
- AI configuration error now explains exactly how to configure OPENAI_API_KEY in Vercel.
- Professional red/yellow/black theme retained.

## V34 wiper database
- Added `api/wipers.js` with verified Bosch application entries and strict front/rear separation.
- The app automatically queries the local Bosch application database after vehicle identification.
- No product is fabricated when there is no verified match.
- Exact model-generation matches are labelled separately from model-level matches.


## V35 Definitief
- Uitgebreidere Bosch-applicatie-index opgebouwd uit openbare Bosch AutoParts Catalogue/Bosch application pages.
- Voor en achter strikt gescheiden.
- Geen AI-gokfitment.
- AI gebruikt Structured Outputs en wordt in duidelijke blokken/stappen weergegeven.
- Fotoanalyse gebruikt dezelfde gestructureerde weergave.
- OpenAI model default: gpt-5.6; override mogelijk met OPENAI_MODEL.
- Voor volledige actuele Bosch-dekking blijft de officiële Bosch voertuigzoeker de bron voor gevallen die niet in de ingebouwde index staan.
