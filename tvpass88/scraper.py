import requests
import json
from datetime import datetime

# Descargar eventos
url = "https://streamtp4.com/eventos.json"
r = requests.get(url)
datos = r.json()

# Crear estructura final agrupada por fecha
fecha = datetime.now().strftime("%Y-%m-%d")
agrupado = {
    "fecha": fecha,
    "eventos": []
}

for evento in datos:
    agrupado["eventos"].append({
        "nombre": evento["title"],
        "hora": evento["time"],
        "enlaces": {
            "español": evento["link"]
        }
    })

# Guardar archivo
with open("eventos.json", "w", encoding="utf-8") as f:
    json.dump([agrupado], f, ensure_ascii=False, indent=2)
