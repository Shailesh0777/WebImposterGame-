const words_with_hints = {
  // brands
  "apple": "FruitTech",
  "samsung": "Galaxy",
  "nike": "Swoosh",
  "adidas": "Three",
  "puma": "Leap",
  "gucci": "Luxury",
  "zara": "FastFashion",
  "sony": "Play",
  "microsoft": "Windows",
  "coca-cola": "Fizzy",
  "pepsi": "Blue",
  "HP": "Ink",
  "dell": "Alienware",
  "lenovo": "Think",
  "LG": "DualScreen",
  "reebok": "Vector",
  "underarmour": "Armor",

  // vehicles
  "train": "Rails",
  "car": "Journey",
  "bike": "Throttle",
  "plane": "Altitude",
  "truck": "Haul",
  "ambulance": "Sirens",
  "bus": "Commute",
  "cycle": "Pedal",
  "skateboard": "Deck",
  "metro": "Underground",
  "helicopter": "Hover",
  "ship": "Odyssey",
  "boat": "Sail",
  "scooter": "Handle",
  "submarine": "Deep",
  "tram": "Tracks",
  "jet": "Supersonic",

  // food
  "pizza": "Circle",
  "burger": "Stack",
  "rice": "Grain",
  "noodles": "Twist",
  "apple": "RedFruit",
  "banana": "Curved",
  "bread": "Loaf",
  "salad": "Green",
  "chicken": "Poultry",
  "fish": "Scales",
  "pasta": "Strands",
  "steak": "Marbled",
  "apple" : "doctor",

  // tools
  "hammer": "Impact",
  "screwdriver": "Twist",
  "wrench": "Grip",
  "drill": "Spin",
  "pliers": "Pinch",
  "saw": "Teeth",
  "chisel": "Edge",
  "tape measure": "Stretch",
  "axe": "Chop",
  "spanner": "Turn",
  "level": "Balance",
  "crowbar": "Leverage",

  // objects
  "chair": "Sit",
  "table": "Flat",
  "lamp": "Glow",
  "bottle": "Seal",
  "phone": "Ring",
  "laptop": "Portable",
  "book": "fiber",
  "pen": "colors",
  "cup": "Sip",
  "mirror": "Yourself",
  "clock": "Tick",
  "wallet": "Pocket",

  // locations
  "school": "Learn",
  "hospital": "Cure",
  "market": "Stall",
  "airport": "Terminal",
  "park": "Recess",
  "bank": "Vault",
  "restaurant": "Menu",
  "beach": "Shore",
  "museum": "Exhibit",
  "library": "Silent",
  "stadium": "Bleachers",
  "cinema": "Screen",

  // car brands
  "toyota": "Reliable",
  "honda": "Accord",
  "ford": "Mustang",
  "bmw": "Luxury",
  "audi": "Rings",
  "mercedes": "Star",
  "tesla": "Electric",
  "nissan": "Leaf",
  "hyundai": "Korean",
  "kia": "Compact",
  "volkswagen": "Beetle",
  "chevrolet": "Bowtie",
  "jeep": "Trail",
  "porsche": "Fast",
  "ferrari": "Prancing",
  "mazda": "Zoom",
  "subaru": "Symmetry",

  // animals
  "lion": "Dominance",
  "tiger": "Stripes",
  "elephant": "Memory",
  "giraffe": "Perspective",
  "zebra": "StripeMix",
  "bear": "Hibernate",
  "wolf": "Pack",
  "fox": "Cunning",
  "monkey": "Mimic",
  "panda": "Duality",
  "kangaroo": "Pouch",
  "cheetah": "Sprint",
  "hippopotamus": "River",
  "rhinoceros": "Horn",
  "leopard": "Spots",
  "owl": "Nocturnal",
  "dolphin": "Echo",

  // countries
  "nepal": "Himalaya",
  "india": "Spices",
  "china": "GreatWall",
  "japan": "Sushi",
  "usa": "Stars",
  "canada": "Maple",
  "brazil": "Carnival",
  "australia": "Outback",
  "germany": "Brew",
  "france": "Eiffel",
  "italy": "Colosseum",
  "spain": "Flamenco",
  "russia": "Vodka",
  "uk": "Throne",
  "mexico": "Tequila",
  "egypt": "Pyramids",
  "greece": "Olympus",

  // sports
  "football": "Pitch",
  "cricket": "Crease",
  "basketball": "Court",
  "tennis": "Baseline",
  "badminton": "Shuttle",
  "volleyball": "Spike",
  "rugby": "Try",
  "hockey": "Stick",
  "golf": "Putter",
  "swimming": "Stroke",
  "boxing": "Ring",
  "table tennis": "Paddle",
  "wrestling": "Grapple",
  "baseball": "Diamond",
  "skating": "Blade",
  "archery": "Arrow",
  "cycling": "Pedal",

  // movies
  "avatar": "Pandora",
  "titanic": "Iceberg",
  "inception": "Dreams",
  "avengers": "Assemble",
  "jurassic park": "Dinosaurs",
  "frozen": "Snow",
  "the godfather": "Don",
  "black panther": "Vibranium",
  "iron man": "Suit",
  "interstellar": "Space",
  "the dark knight": "Gotham",
  "spider-man": "Web",
  "joker": "Chaos",
  "harry potter": "Wand",
  "the lion king": "Savannah",
  "matrix": "RedBlue",
  "gladiator": "Arena",

  // utensils
  "spoon": "Curve",
  "fork": "Tine",
  "knife": "Edge",
  "plate": "Dish",
  "bowl": "Round",
  "cup": "Handle",
  "glass": "Transparent",
  "teapot": "Steam",
  "pan": "Fry",
  "pot": "Cook",
  "kettle": "Whistle",
  "whisk": "Beat",
  "ladle": "Serve",
  "tongs": "Grip",
  "tray": "Carry",
  "strainer": "Sieve",
  "grater": "Shred"
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

        displayText: `Hint : ${category}`
      };
    } else {
      return {
        ...player,
        displayText: `Word : ${randomWord}`
      };
    }
  });
}
