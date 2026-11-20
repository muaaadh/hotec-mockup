/* Hotec product data.
   Product names, photos and taglines come from Hotec's own Instagram posts.
   PRICES, RATINGS AND REVIEWS ARE SAMPLE VALUES for the mockup: replace before going live. */
window.HOTEC = {
  contact: {
    viber: '+9607264767',
    viberDisplay: '+960 726 4767',
    instagram: 'https://www.instagram.com/hoteconline/',
    instagramHandle: '@hoteconline'
  },

  brands: ['Kenwood', 'KitchenAid', 'Ariete', 'Faber', 'Bormioli Rocco', 'Bartscher', 'Icematic', 'Convotherm'],

  areas: {
    home: 'For home',
    restaurant: 'For restaurants',
    guesthouse: 'For guest houses'
  },

  categories: {
    prep: 'Food prep',
    cooking: 'Cooking',
    drinks: 'Coffee and drinks',
    care: 'Cleaning and laundry'
  },

  products: [
    {
      id: 'pizza-oven', brand: 'Ariete', name: 'Pizza Oven da Gennaro', cat: 'cooking',
      areas: ['home', 'restaurant'], price: 3450, rating: 4.9, reviewCount: 32, badge: 'Customer favourite',
      tagline: 'Authentic Neapolitan pizza at home.',
      desc: 'A countertop pizza oven that gets properly hot. Set the temperature, slide the pizza in and watch it cook through the window.',
      usp: {
        design: 'Red steel body with a brushed front and a wide viewing window.',
        quality: 'Temperature dial up to 430 °C with a built-in timer.',
        value: 'Pizzeria results without building an oven.'
      },
      specs: [['Max temperature', '430 °C'], ['Timer', 'Built in'], ['Use', 'Countertop']],
      photos: ['pizza-oven', 'pizza-oven-front']
    },
    {
      id: 'food-processor', brand: 'Ariete', name: 'Vintage Food Processor', cat: 'prep',
      areas: ['home', 'restaurant'], price: 1890, rating: 4.8, reviewCount: 21, badge: 'Design pick',
      tagline: 'Kitchen prep, simplified.',
      desc: 'Chops, slices and mixes in one bowl. The retro cream finish means it can stay out on the counter.',
      usp: {
        design: 'Cream retro body with chrome details.',
        quality: 'Two speeds plus pulse, with a clear bowl and feed tube.',
        value: 'One machine instead of three hand tools.'
      },
      specs: [['Speeds', '2 + pulse'], ['Bowl', 'Clear, with feed tube'], ['Finish', 'Vintage cream']],
      photos: ['food-processor']
    },
    {
      id: 'ice-machine', brand: 'Ariete', name: 'Ice Machine', cat: 'drinks',
      areas: ['home', 'restaurant', 'guesthouse'], price: 2950, rating: 4.7, reviewCount: 18, badge: 'Popular with cafés',
      tagline: 'Ice cubes ready in 6 minutes.',
      desc: 'A compact ice maker for the counter. Fill it with water and the first cubes are ready in minutes.',
      usp: {
        design: 'Brushed steel body that suits a bar or a kitchen.',
        quality: 'First ice cubes in about 6 minutes.',
        value: 'No more buying bagged ice for drinks.'
      },
      specs: [['First ice', '6 minutes'], ['Body', 'Brushed steel'], ['Use', 'Countertop']],
      photos: ['ice-machine']
    },
    {
      id: 'oven', brand: 'Ariete', name: 'Bon Cuisine 450 Electric Oven', cat: 'cooking',
      areas: ['home', 'guesthouse'], price: 2650, rating: 4.8, reviewCount: 27,
      tagline: 'The essential appliance for your kitchen.',
      desc: 'A 45 litre electric oven that fits on a worktop. Bake, roast or turn a whole chicken on the rotisserie.',
      usp: {
        design: 'Steel front with a double-glass door and interior light.',
        quality: '45 L capacity, convection fan and rotisserie.',
        value: 'A full oven without a built-in kitchen.'
      },
      specs: [['Capacity', '45 L'], ['Max temperature', '230 °C'], ['Timer', '60 minutes'], ['Functions', 'Convection, rotisserie']],
      photos: ['oven']
    },
    {
      id: 'blender', brand: 'Ariete', name: 'Blender', cat: 'drinks',
      areas: ['home', 'guesthouse', 'restaurant'], price: 1250, rating: 4.6, reviewCount: 15,
      tagline: 'Prepare the drink of your choice every day.',
      desc: 'A sturdy jug blender for smoothies, juices and soups, with one simple dial.',
      usp: {
        design: 'Black body with a steel band and a clear jug.',
        quality: 'Dial control and a jug that is easy to pour from.',
        value: 'Daily drinks at home for less than buying them out.'
      },
      specs: [['Control', 'Dial'], ['Jug', 'Clear, with handle'], ['Finish', 'Black']],
      photos: ['blender']
    },
    {
      id: 'capri-blender', brand: 'Ariete', name: 'Capri Blender', cat: 'drinks',
      areas: ['home'], price: 1650, rating: 4.9, reviewCount: 12, badge: 'Design pick',
      tagline: 'Cutting edge functionality with Capri charm.',
      desc: 'The same dependable blender, dressed in a blue and white tile pattern inspired by the island of Capri.',
      usp: {
        design: 'Blue and white tile pattern, made to be on display.',
        quality: 'Clear jug and dial control.',
        value: 'A statement piece at an everyday price.'
      },
      specs: [['Control', 'Dial'], ['Jug', 'Clear, with handle'], ['Finish', 'Capri pattern']],
      photos: ['capri-blender']
    },
    {
      id: 'double-induction', brand: 'Ariete', name: 'Double Induction Hob', cat: 'cooking',
      areas: ['home', 'guesthouse', 'restaurant'], price: 2100, rating: 4.7, reviewCount: 14,
      tagline: 'The solution just a plate away, make it double.',
      desc: 'Two induction zones on one slim glass plate. Plug it in and cook, with touch controls for each zone.',
      usp: {
        design: 'One sheet of black glass that wipes clean.',
        quality: 'Two zones, each with its own touch controls and display.',
        value: 'A second cooker for a guest kitchen or a busy line.'
      },
      specs: [['Zones', '2'], ['Controls', 'Touch, with display'], ['Surface', 'Black glass']],
      photos: ['double-induction', 'double-induction-angle']
    },
    {
      id: 'induction', brand: 'Ariete', name: 'Induction Hob', cat: 'cooking',
      areas: ['home', 'guesthouse'], price: 1150, rating: 4.6, reviewCount: 19,
      tagline: 'The solution just a plate away.',
      desc: 'A single induction zone you can put anywhere there is a socket. Heats fast and stays cool around the pan.',
      usp: {
        design: 'Slim black glass that stores away flat.',
        quality: 'Touch controls with timer and lock.',
        value: 'An extra burner whenever you need one.'
      },
      specs: [['Zones', '1'], ['Controls', 'Touch'], ['Surface', 'Black glass']],
      photos: ['induction']
    },
    {
      id: 'milk-frother', brand: 'Ariete', name: 'Vintage Milk Frother', cat: 'drinks',
      areas: ['home', 'restaurant'], price: 890, rating: 4.8, reviewCount: 23,
      tagline: 'Whip hot or cold milk in less than 2 minutes.',
      desc: 'Hot or cold milk foam at the press of one button, for cappuccinos, lattes and iced coffee.',
      usp: {
        design: 'Pastel green retro finish.',
        quality: 'Hot or cold foam in under 2 minutes.',
        value: 'Café coffee at home, every morning.'
      },
      specs: [['Foam', 'Hot or cold'], ['Ready in', 'Under 2 minutes'], ['Control', 'One button']],
      photos: ['milk-frother']
    },
    {
      id: 'faber-hob', brand: 'Faber', name: 'Hob Maxus HT603', cat: 'cooking',
      areas: ['home'], price: 4200, rating: 4.8, reviewCount: 9,
      tagline: 'Brass burners on tempered glass.',
      desc: 'A three-burner built-in gas hob with brass burners and a black tempered glass top. Model HT603 CRS BR CI AI.',
      usp: {
        design: 'Black tempered glass finish with brass details.',
        quality: 'High-quality brass burners with auto ignition.',
        value: 'A built-in hob made to last for years.'
      },
      specs: [['Burners', '3, brass'], ['Ignition', 'Auto'], ['Top', 'Tempered glass']],
      photos: ['faber-hob'], cutOnly: true
    },
    {
      id: 'steam-cleaner', brand: 'Ariete', name: 'Vaporì Jet Steam Cleaner', cat: 'care',
      areas: ['home', 'guesthouse'], price: 990, rating: 4.5, reviewCount: 11,
      tagline: 'Steam ready in 3 minutes.',
      desc: 'A handheld steam cleaner for tiles, taps, hobs and corners that a cloth cannot reach.',
      usp: {
        design: 'Compact and easy to hold in one hand.',
        quality: 'Steam ready in about 3 minutes.',
        value: 'Cleans with water, so you buy fewer chemicals.'
      },
      specs: [['Ready in', '3 minutes'], ['Type', 'Handheld'], ['Cleans with', 'Steam']],
      photos: ['steam-cleaner']
    },
    {
      id: 'steam-iron', brand: 'Ariete', name: 'Steam Iron', cat: 'care',
      areas: ['home', 'guesthouse'], price: 650, rating: 4.6, reviewCount: 16,
      tagline: 'Crisp shirts and linen, without the effort.',
      desc: 'A steam iron for everyday laundry and guest linen. Available in violet and pink.',
      usp: {
        design: 'Two bright colours with a clear water tank.',
        quality: 'Steady steam and a smooth soleplate.',
        value: 'Priced for homes and for guest rooms alike.'
      },
      specs: [['Colours', 'Violet, pink'], ['Type', 'Steam iron']],
      photos: ['iron-purple', 'iron-pink'], cut: 'iron-purple'
    }
  ],

  /* SAMPLE reviews for the mockup. Replace with real customer feedback. */
  reviews: [
    { who: 'Aishath R.', role: 'Home cook, Malé', type: 'home', rating: 5, product: 'pizza-oven',
      text: 'We make pizza every Friday now. It heats up quickly and the base comes out crisp, just like the restaurant.' },
    { who: 'Ibrahim N.', role: 'Café owner, Hulhumalé', type: 'business', rating: 5, product: 'ice-machine',
      text: 'The ice machine paid for itself in a month. The team at Hotec helped me pick the right size for my counter.' },
    { who: 'Mariyam S.', role: 'Guest house manager, Maafushi', type: 'business', rating: 5, product: 'steam-iron',
      text: 'We ordered irons and induction hobs for eight rooms on one quotation. Everything arrived together and the invoice was simple.' },
    { who: 'Hassan A.', role: 'Home, Hulhumalé', type: 'home', rating: 4, product: 'food-processor',
      text: 'Looks great on the counter and does the chopping in seconds. Good price for the quality.' },
    { who: 'Fathimath L.', role: 'Restaurant manager, Malé', type: 'business', rating: 5, product: 'double-induction',
      text: 'We use the double induction hob as an extra station at lunch. Easy to clean between services.' },
    { who: 'Ahmed Z.', role: 'Home, Addu City', type: 'home', rating: 5, product: 'milk-frother',
      text: 'Ordered on Viber and it was all very easy. The frother is used every single morning.' }
  ],

  rating: { average: 4.8, count: 217, breakdown: [168, 37, 9, 2, 1] }
};

HOTEC.product = function (id) { return HOTEC.products.find(function (p) { return p.id === id; }); };
HOTEC.cutOf = function (p) { return 'assets/img/cut/' + (p.cut || p.id) + '.webp'; };
HOTEC.photoOf = function (name) { return 'assets/img/photo/' + name + '.webp'; };
HOTEC.money = function (n) { return 'MVR ' + Number(n).toLocaleString('en-US'); };
