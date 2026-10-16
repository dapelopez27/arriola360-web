// ===== Arriola 360 · datos del sitio: lo único que se edita para agregar o cambiar propiedades =====
const WA = "50254134111";   // WhatsApp de Arriola 360, con código de país
const TC = 7.7;             // quetzales por dólar, solo para comparar precios en el buscador
const fotos = (dir, n, portada) => {           // portada primero, luego las demás en orden
  const all = Array.from({length:n}, (_,i) => `assets/${dir}/${String(i+1).padStart(2,"0")}.jpg`);
  return [all[portada-1], ...all.filter((_,i) => i !== portada-1)];
};
// cod: código (ARR-1xx); es también el enlace de la propiedad: propiedad.html?c=ARR-101
// op: "renta" o "venta" · tipo: Apartamento, Casa, Bodega, Local, Oficina, Terreno
// clave: 4 datos que se ven en la ficha · grupos: detalle por temas · mapa: null si aún no hay ubicación
const PROPS = [
  {cod:"ARR-101", op:"renta", tipo:"Bodega", titulo:"Nave industrial", cond:"Nueva", zona:null, lugar:"Ubicación al agendar tu visita",
   precio:9500, mon:"$", nota:"al mes, mantenimiento incluido",
   clave:[["1,463 m²","de construcción"],["800 m²","de bodega"],["9 m","de altura al hombro"],["23","parqueos"]],
   grupos:[
     ["Espacios",["800 m² de bodega","200 m² de mezzanine corrido, a 5 m de altura","1,000 m² de área techada","463 m² de área de maniobras","2,103 v² de terreno"]],
     ["Estructura",["9 m de altura al hombro y 11 m a la cumbrera","Ventanería de doble altura en aluminio anodizado","Puertas enrollables motorizadas"]],
     ["Servicios",["Pozo de agua propio: 600 pies, 85 galones por minuto","6 baños, 3 con ducha y pila","Garita de seguridad con baño y dormitorio","23 parqueos para vehículos y personal"]],
     ["Accesos",["Ubicación céntrica","Salida a varias rutas de entrada y salida de la ciudad"]],
     ["Condiciones",["Construcción nueva","Renta de $9,500 al mes","Mantenimiento incluido"]]],
   mapa:null,
   fotos:fotos("alquiler-bodega-industrial",23,3)},
  {cod:"ARR-102", op:"renta", tipo:"Apartamento", titulo:"Apartamento amueblado", zona:"Zona 10", lugar:"Edificio Moretti",
   precio:850, mon:"$", nota:"al mes, mantenimiento incluido",
   clave:[["72 m²","de construcción"],["1","habitación"],["1","baño completo"],["Amueblado","listo para vivir"]],
   grupos:[
     ["El apartamento",["Sala, comedor y cocina","Habitación amplia","Baño completo","Balcón con vista a la ciudad","Cortinas instaladas"]],
     ["Equipado con",["Refrigeradora y estufa","Extractor de olores","Torre de lavado y secado","Pila y calentador de agua"]],
     ["Amenidades",["Gimnasio","Piscina","Salón social y sala de reuniones","BBQ lounge","Área de juegos para niños","Parqueo de visitas"]],
     ["Ubicación y accesos",["10a avenida y 15 calle, zona 10","Cerca de centros comerciales","Restaurantes y farmacias a pocos minutos"]],
     ["Condiciones",["Renta de $850 al mes","Incluye cuota de mantenimiento","Precio fijo"]]],
   mapa:{lat:14.5937808, lng:-90.5083938, nombre:"Edificio Moretti, 10a avenida y 15 calle, zona 10"},
   fotos:fotos("alquiler-apartamento-zona10",18,4)},
  {cod:"ARR-103", op:"renta", tipo:"Apartamento", titulo:"Apartamento con balcón", zona:"Zona 10", lugar:"Edificio AVIA",
   precio:1100, mon:"$", nota:"al mes + IVA, mantenimiento incluido",
   clave:[["68 m²","de construcción"],["1","habitación"],["1","baño completo"],["1","parqueo + bodega"]],
   grupos:[
     ["El apartamento",["1 habitación","1 baño completo","Balcón amplio","Área de lavandería"]],
     ["Condiciones",["Renta de $1,100 al mes + IVA","Mantenimiento incluido","1 parqueo y bodega incluidos"]]],
   mapa:null, tiktok:"https://vt.tiktok.com/ZSgLJRPwo/",
   fotos:[]},
];
