import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDocs, getDoc, query, where, addDoc, orderBy, limit, } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7nPeJTJOyoINbnLj1uN3Uw2fLb0Q3k4Q",
  authDomain: "upmovil-784fe.firebaseapp.com",
  projectId: "upmovil-784fe",
  storageBucket: "upmovil-784fe.appspot.com",
  messagingSenderId: "647933542408",
  appId: "1:647933542408:web:70f0dda02518ffb4b251bd"
};

const app = initializeApp(firebaseConfig);

// 0. Inicializamos Firestore
const DB = getFirestore(app);

//1. Traer todos los documentos
export default async function getItems() {
    //1.1 Referenciamos nuestra colección
    const colectionProductsRef = collection(DB, "products");
    //1.2 Solicitamos todos los documentos de la colección
    const documentSnapshot = await getDocs(colectionProductsRef);
  
    const documentsData = documentSnapshot.docs.map((doc) => {
      /* let docDataWithId = doc.data();
      docDataWithId.id = doc.id; */
      // spread operator
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    // resolve
    return documentsData;
  }

//1. Traer todos los documentos
export async function getItemsOrdered() {
  const colectionProductsRef = collection(DB, "products");
  const q = query(colectionProductsRef, orderBy("index"), limit(10));

  const documentSnapshot = await getDocs(q);

  const documentsData = documentSnapshot.docs.map((doc) => {
    /* let docDataWithId = doc.data();
    docDataWithId.id = doc.id; */
    // spread operator
    return {
      ...doc.data(),
      id: doc.id,
    };
  });
  // resolve
  return documentsData;
}

//2. Traer un documento por ID
export async function getSingleItem(idParams) {
  const docRef = doc(DB, "products", idParams);

  const docSnapshot = await getDoc(docRef);

  const itemData = docSnapshot.data();
  itemData.id = docSnapshot.id;

  return itemData;
}

//3. Traer todos los  documentos según categoria
export async function getItemsByCategory(categoryParams) {
  const collectionRef = collection(DB, "products");

  const queryCat = query(collectionRef, where("category", "==",categoryParams ))

  const documentSnapshot = await getDocs(queryCat);

  const documentsData = documentSnapshot.docs.map((doc) => {
    /* let docDataWithId = doc.data();
    docDataWithId.id = doc.id; */
    // spread operator
    return {
      ...doc.data(),
      id: doc.id,
    };
  });
  // resolve
  return documentsData;
}

//4. Enviar la orden a Firebase
export async function createOrder(order) {
  const collectionRef = collection(DB, "orders");

  const docOrder = await addDoc(collectionRef, order);

  return docOrder.id;
}

async function exportArrayToFirestore() {
  const products = [
    {
      id: 1,
      title: "iPhone 11",
      brand: "Apple",
      category: "Apple",
      price: 228749,
      color: "Negro",
      camera: "12 Mpx/12 Mpx",
      frontalCamera: "12 Mpx",
      screen: "6.1 in",
      ram: "4 GB",
      internalMemory: "128 GB",
      operatingSystem: "iOS",
      processor: "Apple A13 Bionic",
      batery: "3110 mAh",
      stock: 15,
      discount: "20%",
      imgurl: "https://http2.mlstatic.com/D_NQ_NP_865864-MLA46114990464_052021-O.webp",
      description: "Graba videos 4K y captura retratos espectaculares y paisajes increíbles con el sistema de dos cámaras. Toma grandes fotos con poca luz gracias al modo Noche. Disfruta colores reales en las fotos, videos y juegos con la pantalla Liquid Retina de 6.1 pulgadas. Aprovecha un rendimiento sin precedentes en los juegos, la realidad aumentada y la fotografía con el chip A13 Bionic. Haz mucho más sin necesidad de volver a cargar el teléfono gracias a su batería de larga duración. Y no te preocupes si se moja, el iPhone 11 tiene una resistencia al agua de hasta 30 minutos a una profundidad máxima de 2 metros.",
    },
    {
        id: 2,
        title: "iPhone SE",
        brand: "Apple",
        category: "Apple",
        price: 203602,
        color: "Rojo",
        camera: "12 Mpx",
        frontalCamera: "7 Mpx",
        screen: "4.7 in",
        ram: "4 GB",
        internalMemory: "128 GB",
        operatingSystem: "iOS",
        processor: "Apple A15 Bionic",
        batery: "1821 mAh",
        stock: 20,
        discount: "10%",
        imgurl: "https://http2.mlstatic.com/D_NQ_NP_640700-MLA52132342408_102022-O.webp",
        description: "Chip A15 Bionic superrápido. Una increíble duración de batería y una cámara que es una superestrella. Y además, el vidrio más resistente en un smartphone y botón de inicio con la seguridad de Touch ID.",
      },
      {
        id: 3,
        title: "iPhone 12",
        brand: "Apple",
        category: "Apple",
        price: 260400,
        color: "Verde",
        camera: "12 Mpx/12 Mpx",
        frontalCamera: "12 Mpx",
        screen: "6.1 in",
        ram: "4 GB",
        internalMemory: "64 GB",
        operatingSystem: "iOS",
        processor: "Apple A14 Bionic",
        batery: "2815 mAh",
        stock: 22,
        discount: "10%",
        imgurl: "https://http2.mlstatic.com/D_NQ_NP_756651-MLA45729915914_042021-O.webp",
        description: "El iPhone 12 tiene una espectacular pantalla Super Retina XDR de 6.1 pulgadas. Un frente de Ceramic Shield, cuatro veces más resistente a las caídas. Modo Noche en todas las cámaras, para que puedas tomar fotos increíbles con poca luz. Grabación, edición y reproducción de video en Dolby Vision con calidad cinematográfica. Y el potente chip A14 Bionic. Además, es compatible con los nuevos accesorios MagSafe, que se acoplan fácilmente a tu iPhone y permiten una carga inalámbrica más rápida. Que comience la diversión.",
      },
      {
        id: 4,
        title: "iPhone 13 Pro Max",
        brand: "Apple",
        category: "Apple",
        price: 534643,
        color: "Grafito",
        camera: "12 Mpx/12 Mpx/12 Mpx",
        frontalCamera: "12 Mpx",
        screen: "6.7 in",
        ram: "6 GB",
        internalMemory: "256 GB",
        operatingSystem: "iOS",
        processor: "Apple A15 Bionic",
        batery: "3.227 mAh",
        stock: 10,
        discount: "15%",
        imgurl: "https://http2.mlstatic.com/D_NQ_NP_799027-MLA47776845273_102021-O.webp",
        description: "iPhone 13 Pro Max. El mayor avance en el sistema de cámaras Pro hasta ahora. Pantalla Super Retina XDR con ProMotion que brinda una respuesta más rápida y fluida. Chip A15 Bionic para un rendimiento fuera de serie. Diseño resistente y la mayor duración de batería jamás vista en un iPhone.",
      },
      {
        id: 5,
        title: "iPhone 13 mini",
        brand: "Apple",
        category: "Apple",
        price: 320999,
        color: "Azul",
        camera: "12 Mpx/12 Mpx",
        frontalCamera: "12 Mpx",
        screen: "5.4 in",
        ram: "4 GB",
        internalMemory: "128 GB",
        operatingSystem: "iOS",
        processor: "Apple A15 Bionic",
        batery: "2.438 mAh",
        stock: 8,
        discount: "25%",
        imgurl: "https://http2.mlstatic.com/D_NQ_NP_984249-MLA47782359300_102021-O.webp",
        description: "iPhone 13 mini. El sistema de dos cámaras más avanzado en un iPhone. El superrápido chip A15 Bionic. Un salto en duración de batería. Un diseño resistente. Y una pantalla Super Retina XDR más brillante.",
      },
      {
        id: 6,
        title: "iPhone 13",
        brand: "Apple",
        category: "Apple",
        price: 357799,
        color: "Blanco estelar",
        camera: "12 Mpx/12 Mpx",
        frontalCamera: "12 Mpx",
        screen: "6.1 in",
        ram: "4 GB",
        internalMemory: "256 GB",
        operatingSystem: "iOS",
        processor: "Apple A15 Bionic",
        batery: "3.227 mAh",
        stock: 12,
        discount: "10%",
        imgurl: "https://http2.mlstatic.com/D_NQ_NP_922588-MLA47781634791_102021-O.webp",
        description: "iPhone 13. El sistema de dos cámaras más avanzado en un iPhone. El superrápido chip A15 Bionic. Un gran salto en duración de batería. Un diseño resistente. Y una pantalla Super Retina XDR más brillante.",
      },
      {
        id: 7,
        title: "Galaxy S22+",
        brand: "Samsung",
        category: "Samsung",
        price: 312999,
        color: "Pink gold",
        camera: "50 Mpx/12 Mpx/10 Mpx",
        frontalCamera: "10 Mpx",
        screen: "6.6 in",
        ram: "8 GB",
        internalMemory: "256 GB",
        operatingSystem: "Android",
        processor: "Snapdragon 8 Gen 1",
        batery: "4500 mAh",
        stock: 18,
        imgurl: "https://http2.mlstatic.com/D_NQ_NP_611057-MLA52143111192_102022-O.webp",
        description: "Disfruta de un smartphone de pantalla espaciosa y equilibrada gracias a la fluidez de sus finos biseles hacia un marco pulido y simétrico. Observa, además, como la carcasa monocromática de la cámara rodea un sistema de cámara lineal para dar paso a una belleza sin igual.",
      },
      {
        id: 8,
        title: "Galaxy A32",
        brand: "Samsung",
        category: "Samsung",
        price: 75999,
        color: "Negro",
        camera: "64 Mpx/8 Mpx/5 Mpx/5 Mpx",
        frontalCamera: "20 Mpx",
        screen: "6.4 in",
        ram: "4 GB",
        internalMemory: "128 GB",
        operatingSystem: "Android",
        processor: "MediaTek Helio G80",
        batery: "5000 mAh",
        stock: 25,
        imgurl: "https://http2.mlstatic.com/D_NQ_NP_922219-MLA48428094384_122021-O.webp",
        description: "Actualizá el modelo de tu smartphone con el nuevo Samsung A32 y acelerá tu experiencia móvil. La velocidad del nuevo celular de Samsung de la Línea A va a cambiar completamente la forma de navegar y compartir contenidos. Vas a lograr desde un juego o streaming más fluido, hasta compartir y bajar contenidos de forma súper rápida.",
      },
      {
        id: 9,
        title: "Galaxy A23",
        brand: "Samsung",
        category: "Samsung",
        price: 81999,
        color: "Celeste",
        camera: "50 Mpx/5 Mpx/2 Mpx/2 Mpx",
        frontalCamera: "8 Mpx",
        screen: "6.6 in",
        ram: "4 GB",
        internalMemory: "128 GB",
        operatingSystem: "Android",
        processor: "Snapdragon 680",
        batery: "5000 mAh",
        stock: 30,
        imgurl: "https://http2.mlstatic.com/D_NQ_NP_910138-MLA50911770573_072022-O.webp",
        description: "Una pantalla increíble para el scroll más fluido. Ampliá tu perspectiva hasta 6,6'' con la pantalla Full HD+ de Samsung Galaxy A23 128GB. Vas a descubrir la mejor forma de disfrutar cada día de tu contenido: nítido, claro e impresionante. Además, preaparate para sacar las mejores fotos con su cámara principal de 50 mpx con flash led y así poder subir contenido de calidad a tus redes sociales.",
      },
      {
        id: 10,
        title: "Galaxy S20 FE",
        brand: "Samsung",
        category: "Samsung",
        price: 159999,
        color: "Azul marino",
        camera: "12 Mpx/12 Mpx/8 Mpx",
        frontalCamera: "32 Mpx",
        screen: "6.5 in",
        ram: "6 GB",
        internalMemory: "128 GB",
        operatingSystem: "Android",
        processor: "Snapdragon 865",
        batery: "4500 mAh",
        stock: 17,
        imgurl: "https://http2.mlstatic.com/D_NQ_NP_716191-MLA44281674442_122020-O.webp",
        description: "Fotografía profesional al alcance de tu mano con el nuevo Samsung Galaxy S20 Fan Edition 5G; con cámara de 12+12+8 Mp para explorar tu creatividad. Obtené los mejores resultados gracias a su procesador Octa-Core (2.8GHz,2.4GHz,1.8GHz), su memoria interna de 128 GB expandible a través de una MicroSd hasta 1TB. Disfrutá de jugar; ver series o trabajar en una pantalla de full vision de 6.5.",
      },
      {
        id: 11,
        title: "Galaxy S21 FE",
        brand: "Samsung",
        category: "Samsung",
        price: 194999,
        color: "Gris Oscuro",
        camera: "12 Mpx/12 Mpx/8 Mpx",
        frontalCamera: "32 Mpx",
        screen: "6.4 in",
        ram: "6 GB",
        internalMemory: "128 GB",
        operatingSystem: "Android",
        processor: "Exynos 2100",
        batery: "4500 mAh",
        stock: 12,
        imgurl: "https://http2.mlstatic.com/D_NQ_NP_730981-MLA48800008115_012022-O.webp",
        description: "Galaxy S21 FE Épico y de 6,4''. El Galaxy S21 Fan Edition 128GB tiene todo lo que te gusta en 6,4 pulgadas, un tamaño diseñado para conectarte con amigos, explorar nuevas pasiones, realizar una transmisión en vivo y disfrutar durante horas de tus programas favoritos.",
      },
      {
        id: 12,
        title: "Galaxy Z Flip3",
        brand: "Samsung",
        category: "Samsung",
        price: 212870,
        color: "Verde",
        camera: "12 Mpx/12 Mpx",
        frontalCamera: "10 Mpx",
        screen: "6.7 in",
        ram: "8 GB",
        internalMemory: "128 GB",
        operatingSystem: "Android",
        processor: "Snapdragon 888",
        batery: "3300 mAh",
        stock: 8,
        imgurl: "https://http2.mlstatic.com/D_NQ_NP_992319-MLA47887379614_102021-O.webp",
        description: "El Samsung Galaxy Z Flip3 llegó con un diseño enfocado en brindar la mejor experiencia de uso tanto plegado como desplegado. Su nuevo sistema de biseles minimizado garantiza 6,7'' de visualización vívida, brillante y fluida.",
      },
      {
        id: 13,
        title: "Redmi Note 11",
        brand: "Xiaomi",
        category: "Xiaomi",
        price: 79999,
        color: "Gris grafito",
        camera: "50 Mpx/8 Mpx/2 Mpx/2 Mpx",
        frontalCamera: "13 Mpx",
        screen: "6.43 in",
        ram: "4 GB",
        internalMemory: "128 GB",
        operatingSystem: "Android",
        processor: "Snapdragon 680",
        batery: "5000 mAh",
        stock: 30,
        imgurl: "https://http2.mlstatic.com/D_NQ_NP_970305-MLA52140435624_102022-O.webp",
        description: "El Xiaomi Redmi Note 11 te sorprenderá con su gran pantalla de 6.43 pulgadas, con una gran resolución de 2400 x 1080 píxeles, no podrías haber imaginado ver tan bien tus contenidos. Con su poderoso Procesador Octa-Core de 2.4 incrementará su velocidad en todas las operaciones, juegos, etc., no importa si estás utilizando multi tareas tu equipo responderá a la altura de tus necesidades. El Redmi Note 11 cuenta con 4 cámaras traseras, como principal de 50MP PDAF, 8MP ultra gran angular, 2MP en su cámara macro y una última de 2MP profundidad. Su cámara frontal de 13MP con una ultra resolución capaz de capturar pequeños detalles como puntas del pelo, pestañas y detalles faciales. Gracias a su batería de 5000 mAh te dará un gran rendimiento de hasta dos días de uso y con su cargador de 33W que te permitirá cargar el teléfono rápidamente.",
      },
      {
        id: 14,
        title: "Redmi Note 10",
        brand: "Xiaomi",
        category: "Xiaomi",
        price: 79999,
        color: "Azul nocturno",
        camera: "48 Mpx/2 Mpx/2 Mpx",
        frontalCamera: "8 Mpx",
        screen: "6.5 in",
        ram: "4 GB",
        internalMemory: "128 GB",
        operatingSystem: "Android",
        processor: "MediaTek MT6853 Dimensity 700",
        batery: "5000 mAh",
        stock: 28,
        imgurl: "https://http2.mlstatic.com/D_NQ_NP_627579-MLA48579055364_122021-O.webp",
        description: "El Xiaomi Redmi Note 10 5G es un celular de gama media con un precio accesible y con características de buen nivel como su conectividad 5G, la calidad de su pantalla y la potencia de su batería. Es un equipo que cumple y que por su valor entrega un desempeño más que suficiente.",
      },
      {
        id: 15,
        title: "Redmi Note 11 Pro",
        brand: "Xiaomi",
        category: "Xiaomi",
        price: 117999,
        color: "Blanco polar",
        camera: "108 Mpx/8 Mpx/2 Mpx",
        frontalCamera: "16 Mpx",
        screen: "6.67 in",
        ram: "6 GB",
        internalMemory: "128 GB",
        operatingSystem: "Android",
        processor: "Snapdragon 695",
        batery: "5000 mAh",
        stock: 20,
        imgurl: "https://http2.mlstatic.com/D_NQ_NP_970015-MLA52140435843_102022-O.webp",
        description: "El Xiaomi Redmi Note 11 Pro captura fotos de la mejor calidad con su cámara principal de 108MP, captura sorprendentes fotos con los lentes ultra gran angular y macro para brindarte tomas espectaculares en donde quiera que te encuentres. Captura selfies como nunca antes con la cámara frontal de 16MP para que tus selfies y videollamadas te muestren con una claridad y nitidez espectacular. Disfruta su pantalla de 6.67 pulgadas (1080x2400 FHD+) AMOLED DotDisplay con 120Hz de tasa de actualización con la que podrás visualizar de una forma cómoda y eficiente tus videos, series y películas preferidas, ofreciendo la mejor fluidez en la experiencia de uso. Su potente procesador en conjunto con su memoria RAM te permitirán trabajar con multitareas, videojuegos y tus aplicaciones preferidas de forma fluida y sin que tu equipo se ralentice fácilmente. Su memoria interna de 128GB es perfecta para llevar contigo toda tu información importante en el dispositivo y tenerla a la mano en todo momento. Con el Redmi Note 11 Pro 5G tendrás una batería de 5000 mAh, por lo que tendrás energía de sobra con una sola carga completa del equipo, además, con la carga rápida de 67W, obtienes carga de 0 a 50% en solo 15 minutos.",
      },
      {
        id: 16,
        title: "Pocophone Poco X4",
        brand: "Xiaomi",
        category: "Xiaomi",
        price: 126699,
        color: "Azul laser",
        camera: "108 Mpx/8 Mpx/2 Mpx",
        frontalCamera: "16 Mpx",
        screen: "6.67 in",
        ram: "8 GB",
        internalMemory: "256 GB",
        operatingSystem: "Android",
        processor: "Snapdragon 695",
        batery: "5000 mAh",
        stock: 16,
        imgurl: "https://http2.mlstatic.com/D_NQ_NP_788240-MLA52131921802_102022-O.webp",
        description: "Lo más destacado de este dispositivo lo encontramos en su potente chip Mediatek, diseñado para la gama media, pero que ya da buenos resultados: el Dimensity 8100. Aunque eso no es todo, ya que también incorpora una pantalla que, pese a su tecnología, ofrece grandes características como una tasa de refresco de 144 Hz.",
      },
      {
        id: 17,
        title: "Pocophone Poco F4 GT",
        brand: "Xiaomi",
        category: "Xiaomi",
        price: 269402,
        color: "Negro",
        camera: "64 Mpx/8 Mpx/2 Mpx",
        frontalCamera: "20 Mpx",
        screen: "6.67 in",
        ram: "12 GB",
        internalMemory: "256 GB",
        operatingSystem: "Android",
        processor: "Snapdragon 8 Gen 1",
        batery: "4700 mAh",
        stock: 14,
        imgurl: "https://http2.mlstatic.com/D_NQ_NP_854754-MLA50405101286_062022-O.webp",
        description: "Si te mueves en el mundo de los videojuegos y necesitas sustituir tu smartphone, el Xiaomi POCO F4 GT está diseñado para que no te abandone en tus largas partidas y de lo máximo de sí. Para ello, está compuesto por las mejores características como un excelente procesador, una potente batería y una pantalla que te hará adentrarte en el mundo de cada juego.",
      },
      {
        id: 18,
        title: "Edge 30",
        brand: "Motorola",
        category: "Motorola",
        price: 119999,
        color: "8 GB",
        camera: "50 Mpx/50 Mpx/2 Mpx",
        frontalCamera: "32 Mpx",
        screen: "6.5 in",
        ram: "8 GB",
        internalMemory: "128 GB",
        operatingSystem: "Android",
        processor: "Snapdragon 778G+ 5G",
        batery: "4020 mAh",
        stock: 28,
        imgurl: "https://http2.mlstatic.com/D_NQ_NP_988597-MLA50693346006_072022-O.webp",
        description: "Cargá menos peso y realizá más tareas. El motorola edge 30, el smartphone 5G más delgado, se diseñó con este objetivo en mente. Con tecnología de avanzada, está diseñado para que sea fácil de usar. La parte posterior está diseñada con material PMMA liviano y resistente con un acabado mate clásico. Tiene una apariencia con patrones sutiles que cambian cuando inclinás el teléfono de lado a lado.",
      },
      {
        id: 19,
        title: "G52",
        brand: "Motorola",
        category: "Motorola",
        price: 69999,
        color: "Gris carbón",
        camera: "50 Mpx/8 Mpx/2 Mpx",
        frontalCamera: "16 Mpx",
        screen: "",
        ram: "6 GB",
        internalMemory: "128 GB",
        operatingSystem: "Android",
        processor: "Snapdragon 680",
        batery: "5000 mAh",
        stock: 24,
        imgurl: "https://http2.mlstatic.com/D_NQ_NP_698891-MLA50817265580_072022-O.webp",
        description: "El Moto G52 se ajusta a tu ritmo de vida. Con el procesador Octa-Core Qualcomm® Snapdragon® 680 de 2.4 GHz y la memoria RAM de 6 GB, obtené un desempeño 25 % mejor que la versión anterior*. El resultado es más potencia para jugar, transmitir videos y usar las funciones avanzadas de cámara, además de un funcionamiento más eficiente que consume menos batería.",
      },
      {
        id: 20,
        title: "G82",
        brand: "Motorola",
        category: "Motorola",
        price: 89999,
        color: "Blanco",
        camera: "50 Mpx/8 Mpx/2 Mpx",
        frontalCamera: "16 Mpx",
        screen: "6.6 in",
        ram: "6 GB",
        internalMemory: "128 GB",
        operatingSystem: "Android",
        processor: "Snapdragon 695 5G",
        batery: "5000 mAh",
        stock: 30,
        imgurl: "https://http2.mlstatic.com/D_NQ_NP_869259-MLA51752031121_092022-O.webp",
        description: "Dale vida a tus películas y programas favoritos gracias a la pantalla pOLED FHD+ de 6.6 in. Experimentá el contraste infinito que ofrece tonos oscuros más profundos y más de mil millones de colores reales. Viví una experiencia visual fluida y sin interrupciones con la increíble velocidad de actualización de 120 Hz. Disfrutá esta pantalla ultra wide que prácticamente no presenta bordes.",
      },
      {
        id: 21,
        title: "G200",
        brand: "Motorola",
        category: "Motorola",
        price: 124999,
        color: "Azul glaciar",
        camera: "108 Mpx/13 Mpx/2 Mpx",
        frontalCamera: "16 Mpx",
        screen: "6.8 in",
        ram: "8 GB",
        internalMemory: "128 GB",
        operatingSystem: "Android",
        processor: "Snapdragon 888+ 5G",
        batery: "5000 mAh",
        stock: 18,
        imgurl: "https://http2.mlstatic.com/D_NQ_NP_861432-MLA52131254230_102022-O.webp",
        description: "Lleva tu telefono a la gran screen: Utiliza las aplicaciones, realiza videollamadas, juega y mucho más, todo en una pantalla de escritorio o televisión. Conecta el teléfono de forma inalámbrica a un dispositivo externo y observa todo su potencial. Potencia al máximo: Optimiza tus experiencias de entretenimiento, creatividad y conectividad con el procesador superpotente Qualcomm® Snapdragon™ 888+. Disfruta de videojuegos con inteligencia artificial y obtén una capacidad de respuesta de 20% más rápida. Toma fotos y videos 35% más rápido y captura más de mil millones de tonos de color. Aprovecha la red Wi-Fi móvil más veloz de la industria. Y siente un sonido claro gracias a la antena doble Bluetooth® y la tecnología Qualcomm® Snapdragon Sound™.",
      },
      {
        id: 22,
        title: "One Fusion",
        brand: "Motorola",
        category: "Motorola",
        price: 169899,
        color: "Azul océano",
        camera: "48 Mpx/8 Mpx/5 Mpx/2 Mpx",
        frontalCamera: "8 Mpx",
        screen: "6.5 in",
        ram: "4 GB",
        internalMemory: "128 GB",
        operatingSystem: "Android",
        processor: "Snapdragon 710",
        batery: "5000 mAh",
        stock: 21,
        imgurl: "https://http2.mlstatic.com/D_NQ_NP_939063-MLA43751372595_102020-O.webp",
        description: "El nuevo lanzamiento de Motorola es el Moto One Fusion y llegó al mercado con un único objetivo: destacarse. Este equipo presenta un diseño que reúne todas las características que un smartphone tiene que tener: promete una batería insuperable y, para todos los fanáticos de la fotografía, una cámara que captura recuerdos en alta resolución.        ",
      },
      {
        id: 23,
        title: "Cable Cargador Usb Lightning iPhone",
        brand: "Apple",
        category: "Accesorios",
        price: 7333,
        color: "Blanco",
        stock: 30,
        imgurl: "https://http2.mlstatic.com/D_NQ_NP_942098-MLA47876022378_102021-O.webp",
        description: "Compatible con todos los modelos iPhone a partir del iPhone 5. Tiene 1 metro de largo.",
      },
      {
        id: 24,
        title: "Cargador Turbo Power 15 Motorola Tipo C",
        brand: "Motorola",
        category: "Accesorios",
        price: 3200,
        color: "Negro",
        stock: 20,
        imgurl: "https://http2.mlstatic.com/D_NQ_NP_645659-MLA31536641645_072019-O.webp",
        description: "Compatible con G6 G7 G8 G9 G10 G20 G30 G60s. No incluye cable.",
      },
      {
        id: 25,
        title: "Power Bank 22.5w 10000mah",
        brand: "Mcdodo",
        category: "Accesorios",
        price: 9598,
        color: "Negro",
        stock: 15,
        imgurl: "https://http2.mlstatic.com/D_NQ_NP_985487-MLA50511790373_062022-O.webp",
        description: "Con display digital, con salidas 2USB A de carga rápida. De excelente terminación negro texturado. Apto para teléfonos Apple, Samsung, Huawei y Xiaomi.",
      },
      {
        id: 26,
        title: "Auriculares in-ear inalámbricos",
        brand: "Xiaomi",
        category: "Accesorios",
        price: 3830,
        color: "Negro",
        stock: 35,
        imgurl: "https://http2.mlstatic.com/D_NQ_NP_656991-MLA40756758814_022020-O.webp",
        description: "Con un diseño inspirado en la simplicidad, los Redmi AirDots tienen un estilo único. Cuentan con Bluetooth 5.0 que te permite conectarte a distancias largas y mantener una conexión sólida en todo momento. Su tecnología TWS (True Wireless Stereo) elimina los cables y te hace disfrutar plenamente de ritmos y melodías que fluyen libremente.",
      },
      {
        id: 27,
        title: "Soporte para auto universal",
        brand: "Skyway",
        category: "Accesorios",
        price: 2199,
        color: "Negro",
        stock: 50,
        imgurl: "https://http2.mlstatic.com/D_NQ_NP_834367-MLA50058701102_052022-O.webp",
        description: "Con este exclusivo soporte podes poner tu celular de una manera muy facil para usarlo sin problemas. Se engancha facilmente en el espejo retrovisor. El celular queda bien agarrado y se puede rotar para una mejor vision. La manera mas comoda de usar tu celular en el auto.",
      },
      {
        id: 28,
        title: "Tarjeta de memoria",
        brand: "SanDisk",
        category: "Accesorios",
        price: 11319,
        color: "Negro",
        stock: 30,
        imgurl: "https://http2.mlstatic.com/D_NQ_NP_675205-MLA40168752387_122019-O.webp",
        description: "Ahorrá tiempo gracias a su velocidad clase 30, que posibilita la transferencia de datos de forma rápida y efectiva.",
      },
  ];

  const collectionRef = collection(DB, "products");

  // for... of
  // products.map( (item) => {})
  for (let item of products) {
    item.index = item.id;
    delete item.id;
    let docOrder = await addDoc(collectionRef, item);
    console.log("Documento creado, id:", docOrder.id);
  }

}