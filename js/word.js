const words_with_hints = {
// brand
"apple": "brand",
"samsung": "brand",
"nike": "brand",
"adidas": "brand",
"puma": "brand",
"gucci": "brand",
"zara": "brand",
"sony": "brand",
"microsoft": "brand",
"coca-cola": "brand",
"pepsi": "brand",
"hp": "brand",
"dell": "brand",
"lenovo": "brand",
"lg": "brand",

// vehicle
"train": "vehicle",
"car": "vehicle",
"bike": "vehicle",
"plane": "vehicle",
"truck": "vehicle",
"ambulance": "vehicle",
"bus": "vehicle",
"cycle": "vehicle",
"skateboard": "vehicle",
"metro": "vehicle",
"helicopter": "vehicle",
"ship": "vehicle",
"boat": "vehicle",
"scooter": "vehicle",
"submarine": "vehicle",


  // food
  "pizza": "food",
  "burger": "food",
  "rice": "food",
  "noodles": "food",
  "apple": "food",
  "banana": "food",
  "bread": "food",
  "salad": "food",
  "chicken": "food",
  "fish": "food",

  // tools
  "hammer": "tool", 
  "screwdriver": "tool",
  "wrench": "tool",
  "drill": "tool",
  "pliers": "tool",
  "saw": "tool",
  "chisel": "tool",
  "tape measure": "tool",
  "axe": "tool",
  "spanner": "tool",

  // object
  "chair": "object",
  "table": "object",
  "lamp": "object",
  "bottle": "object",
  "phone": "object",
  "laptop": "object",
  "book": "object",
  "pen": "object",
  "cup": "object",
  "mirror": "object",

  // location
  "school": "location",
  "hospital": "location",
  "market": "location",
  "airport": "location",
  "park": "location",
  "bank": "location",
  "restaurant": "location",
  "beach": "location",
  "museum": "location",
  "library": "location",

  // car brand
"toyota": "car brand",
"honda": "car brand",
"ford": "car brand",
"bmw": "car brand",
"audi": "car brand",
"mercedes": "car brand",
"tesla": "car brand",
"nissan": "car brand",
"hyundai": "car brand",
"kia": "car brand",
"volkswagen": "car brand",
"chevrolet": "car brand",
"jeep": "car brand",
"porsche": "car brand",
"ferrari": "car brand",

// animal
"lion": "animal",
"tiger": "animal",
"elephant": "animal",
"giraffe": "animal",
"zebra": "animal",
"bear": "animal",
"wolf": "animal",
"fox": "animal",
"monkey": "animal",
"panda": "animal",
"kangaroo": "animal",
"cheetah": "animal",
"hippopotamus": "animal",
"rhinoceros": "animal",
"leopard": "animal",

// country
"nepal": "country",
"india": "country",
"china": "country",
"japan": "country",
"usa": "country",
"canada": "country",
"brazil": "country",
"australia": "country",
"germany": "country",
"france": "country",
"italy": "country",
"spain": "country",
"russia": "country",
"uk": "country",
"mexico": "country",

// sports
"football": "sport",
"cricket": "sport",
"basketball": "sport",
"tennis": "sport",
"badminton": "sport",
"volleyball": "sport",
"rugby": "sport",
"hockey": "sport",
"golf": "sport",
"swimming": "sport",
"boxing": "sport",
"table tennis": "sport",
"wrestling": "sport",
"baseball": "sport",
"skating": "sport",

// movie
"avatar": "movie",
"titanic": "movie",
"inception": "movie",
"avengers": "movie",
"jurassic park": "movie",
"frozen": "movie",
"the godfather": "movie",
"black panther": "movie",
"iron man": "movie",
"interstellar": "movie",
"the dark knight": "movie",
"spider-man": "movie",
"joker": "movie",
"harry potter": "movie",
"the lion king": "movie",

// utensils
"spoon": "utensil",
"fork": "utensil",
"knife": "utensil",
"plate": "utensil",
"bowl": "utensil",
"cup": "utensil",
"glass": "utensil",
"teapot": "utensil",
"pan": "utensil",
"pot": "utensil",
"kettle": "utensil",
"whisk": "utensil",
"ladle": "utensil",
"tongs": "utensil",
"tray": "utensil"

};

function assignWordsToPlayers(players) {
  // Get all words keys
  const allWords = Object.keys(words_with_hints);
  // Pick a random word
  const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
  // Get category of chosen word
  const category = words_with_hints[randomWord];

  // Assign displayText per role
  return players.map(player => {
    if (player.role.toLowerCase() === "imposter") {
      return {
        ...player,

        displayText: `Category : ${category}`
      };
    } else {
      return {
        ...player,
        displayText: `Word : ${randomWord}`
      };
    }
  });
}
