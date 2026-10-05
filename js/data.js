export const DOMAIN_COLORS = {
  eukaryotes: 0x7fb389,
  archaea: 0xd08458,
  bacteria: 0x9aa8b8,
  root: 0xc9a227,
};

// Optional on any trait: similarity: { "tipA::tipB": 0.8 }
// Pair keys are sorted tip ids. Values are 0–1 and set trait-arc stroke width.
// Binary traits omit the field and draw at constant width.
export const TRAITS = {
  motors: {
    id: "motors",
    label: "Swimming motors",
    note: "Three domains, three machines",
    help: "A whip for swimming, invented three times: bacterial flagellum, archaeal archaellum, eukaryotic flagellum.",
    examples: [
      {
        tip: "gamma",
        name: "E. coli",
        latin: "Escherichia coli",
        image: "img/ecoli.png",
        blurb: "A bacterial rotary flagellum — a motor with no kinship to the other two designs.",
      },
      {
        tip: "halophiles",
        name: "Halobacterium",
        latin: "Halobacterium salinarum",
        image: "img/halo.png",
        blurb: "An archaeal archaellum: the same job — swimming — built from different proteins.",
      },
      {
        tip: "euglenids",
        name: "Euglena",
        latin: "Euglena gracilis",
        image: "img/euglena.jpg",
        blurb: "A eukaryotic flagellum of microtubules, on a branch that split before animals or plants.",
      },
    ],
  },
  heat: {
    id: "heat",
    label: "Heat-loving life",
    note: "Bacteria and archaea",
    help: "Living near the boiling point — solved on both sides of the prokaryotic split.",
    examples: [
      {
        tip: "thermotogales",
        name: "Thermotoga",
        latin: "Thermotoga maritima",
        image: "img/thermotoga.png",
        blurb: "A bacterium in a toga-like sheath, at home near 80°C hydrothermal vents.",
      },
      {
        tip: "sulfolobus",
        name: "Sulfolobus",
        latin: "Sulfolobus acidocaldarius",
        image: "img/sulfolobus.jpg",
        blurb: "An archaeon of boiling acidic springs, where most proteins should fall apart.",
      },
      {
        tip: "pyrococcus",
        name: "Pyrococcus",
        latin: "Pyrococcus furiosus",
        image: "img/pyrococcus.jpg",
        blurb: "A euryarchaeon that thrives above 100°C — heat tolerance on a separate archaeal branch.",
      },
    ],
  },
  carbon: {
    id: "carbon",
    label: "Carbon from air",
    note: "Bacteria and archaea",
    help: "Two recipes for pulling living carbon out of CO₂, on opposite prokaryotic branches.",
    ancestor: {
      kicker: "Last shared organism",
      lacked: "no shared recipe",
      body: "LUCA. A cell at the root of the tree. It lived on chemistry. It did not yet have two kingdoms’ separate machines for turning CO₂ into biomass.",
    },
    solution: {
      kicker: "Shared solution",
      body: "Pull living carbon out of air — sunlight on one branch, hydrogen and methane on the other. Same hunger. Two inventions.",
    },
    examples: [
      {
        tip: "cyanobacteria",
        name: "Prochlorococcus",
        latin: "Prochlorococcus marinus",
        image: "img/prochloro.jpg",
        env: "Open ocean · sunlight",
        need: "Thin ocean light. Carbon in the air.",
        demo: "prochloro",
        blurb: "The ocean’s most abundant photosynthesizer. CO₂ in, sugar out, powered by light.",
      },
      {
        tip: "methanobacterium",
        name: "Methanobacterium",
        latin: "Methanobacterium",
        image: "img/methano.jpg",
        env: "Dark mud · hydrogen",
        need: "No sun. Only gas in the dark.",
        demo: "methano",
        blurb: "An archaeon that builds biomass from CO₂ and hydrogen, and breathes out methane.",
      },
    ],
  },
  carcinization: {
    id: "carcinization",
    label: "Carcinization",
    note: "Crabs, again and again",
    help: "Evolution keeps making crabs — a short, wide body, evolved many times in crustaceans.",
    ancestor: {
      kicker: "Last shared organism",
      lacked: "no crab body",
      body: "A long-bodied crustacean. It had a tail it could flap. It walked forward. It was not yet a crab.",
    },
    solution: {
      kicker: "Shared solution",
      body: "Tuck the tail, widen the carapace, walk sideways. Evolution keeps making crabs.",
    },
    examples: [
      {
        tip: "brachyura",
        name: "Blue crab",
        latin: "Callinectes sapidus",
        image: "img/blue-crab.jpg",
        env: "Estuary · shells",
        need: "Shallows. Predators. A tail in the way.",
        demo: "bluecrab",
        blurb: "A true crab: the classic wide carapace evolution keeps rediscovering.",
      },
      {
        tip: "anomura",
        name: "Coconut crab",
        latin: "Birgus latro",
        image: "img/coconut-crab.jpg",
        env: "Island forest · nuts",
        need: "Land. Climbing. Shells that will not open.",
        demo: "coconutcrab",
        blurb: "An anomuran that arrived at the crab shape on a separate crustacean branch.",
      },
    ],
  },
  antifreeze: {
    id: "antifreeze",
    label: "Antifreeze",
    note: "Arctic and Antarctic fish",
    help: "The same icy-blood trick, invented separately at opposite poles.",
    ancestor: {
      kicker: "Last shared organism",
      lacked: "no antifreeze",
      body: "A bony fish of temperate seas. Cold was seasonal. Its blood had no antifreeze proteins — ice was not yet a year-round problem.",
    },
    solution: {
      kicker: "Shared solution",
      body: "Proteins that stop ice from growing in the blood — invented at both poles, from an ancestor that never needed them.",
    },
    examples: [
      {
        tip: "arctic-cod",
        name: "Arctic cod",
        latin: "Boreogadus saida",
        image: "img/arctic-cod.jpg",
        env: "Pack ice · polar night",
        need: "Sea ice. Blood that wants to freeze.",
        demo: "arcticcod",
        blurb: "Northern fishes that keep their blood liquid in ice-covered seas with antifreeze proteins.",
      },
      {
        tip: "toothfish",
        name: "Antarctic toothfish",
        latin: "Dissostichus mawsoni",
        image: "img/toothfish.jpg",
        env: "Southern Ocean · ice shelf",
        need: "The Southern Ocean. Ice from below.",
        demo: "toothfish",
        blurb: "A Southern Ocean hunter with its own, independently evolved antifreeze.",
      },
    ],
  },
  wings: {
    id: "wings",
    label: "Wings",
    note: "Insects and birds",
    help: "Powered flight, invented on an arthropod branch and again in vertebrates.",
    ancestor: {
      kicker: "Last shared organism",
      lacked: "no wings",
      body: "A soft-bodied bilaterian in the sea. It crawled. Air was not a place it could go — wings were not yet a thought the tree could have.",
    },
    solution: {
      kicker: "Shared solution",
      body: "A surface that beats against air — chitin on one branch, feathered bone on the other. Same problem. Two machines for leaving the ground.",
    },
    examples: [
      {
        tip: "insects",
        name: "Dragonfly",
        latin: "Anax junius",
        env: "Still water · air",
        need: "Prey in the air. A body built for water’s edge.",
        demo: "dragonfly",
        blurb: "An insect wing of chitin and veins. Flight arose here hundreds of millions of years before birds.",
      },
      {
        tip: "birds",
        name: "Peregrine falcon",
        latin: "Falco peregrinus",
        env: "Open sky · birds",
        need: "Height. Speed. Prey that also flies.",
        demo: "falcon",
        blurb: "A vertebrate wing of bone, muscle, and feathers — flight rebuilt on a separate branch.",
      },
    ],
  },
  c4: {
    id: "c4",
    label: "C4 photosynthesis",
    note: "Grasses and saltbushes",
    help: "A drought-and-sunlight pathway that evolved more than 60 times in flowering plants.",
    ancestor: {
      kicker: "Last shared organism",
      lacked: "no C4",
      body: "A flowering plant with ordinary C3 photosynthesis. It could make sugar from air, but not this drought-and-sunlight shortcut.",
    },
    solution: {
      kicker: "Shared solution",
      body: "A plumbing-and-enzyme trick for capturing CO₂ in hot, dry light — evolved more than 60 times. Invented twice here, and many times besides.",
    },
    examples: [
      {
        tip: "grasses",
        name: "Maize",
        latin: "Zea mays",
        image: "img/maize.jpg",
        env: "Open field · hard sun",
        need: "Hot light. Water that wants to leave.",
        demo: "maize",
        blurb: "C4 arose some 20 times in grasses alone — maize is one famous product.",
      },
      {
        tip: "atriplex",
        name: "Saltbush",
        latin: "Atriplex",
        image: "img/atriplex.jpg",
        env: "Dry basin · salt",
        need: "Dry basin. Salt and sun.",
        demo: "saltbush",
        blurb: "A eudicot lineage that found the same high-light, arid-land biochemistry.",
      },
    ],
  },
  bodies: {
    id: "bodies",
    label: "Multicellular bodies",
    note: "Plants, animals, kelp",
    help: "Bodies of many cells, built independently in plants, animals, and brown algae — three distant eukaryotic experiments.",
    examples: [
      {
        tip: "conifers",
        name: "Coast redwood",
        latin: "Sequoia sempervirens",
        image: "img/redwood.jpg",
        blurb: "A land plant that stacks cells into wood, leaves, and a canopy hundreds of feet tall.",
      },
      {
        tip: "cnidarians",
        name: "Moon jelly",
        latin: "Aurelia aurita",
        image: "img/jelly.jpg",
        blurb: "An animal body: tissues and a gut, on a branch that never made wood or kelp blades.",
      },
      {
        tip: "phaeophytes",
        name: "Giant kelp",
        latin: "Macrocystis pyrifera",
        image: "img/kelp.jpg",
        blurb: "A brown alga — not a plant — that built holdfasts, stipes, and blades on its own.",
      },
    ],
  },
  spines: {
    id: "spines",
    label: "Spines",
    note: "Cacti and hedgehogs",
    help: "A coat of sharp points for not getting eaten — grown from plant tissue, and again from animal skin.",
    ancestor: {
      kicker: "Last shared organism",
      lacked: "no spines",
      body: "A single-celled eukaryote. It had a nucleus and a flagellum. It had no skin, no leaves, no body — spines were not a problem it could have.",
    },
    solution: {
      kicker: "Shared solution",
      body: "A coat of sharp points — grown from plant tissue, and again from animal skin. Same keep-away geometry. Invented twice.",
    },
    examples: [
      {
        tip: "cacti",
        name: "Saguaro",
        latin: "Carnegiea gigantea",
        image: "img/cactus.jpg",
        env: "Desert · thirsty mouths",
        need: "Desert drought. Mouths that want the water.",
        demo: "cactus",
        blurb: "Spines are modified leaves: shade, stored water, and a warning, all in one. Armor grown from plant tissue.",
      },
      {
        tip: "hedgehog",
        name: "European hedgehog",
        latin: "Erinaceus europaeus",
        image: "img/hedgehog.jpg",
        env: "Night ground · foxes",
        need: "Night ground. Foxes.",
        demo: "hedgehog",
        blurb: "Keratin quills on a mammal. The same keep-away geometry, a different material, a different world.",
      },
    ],
  },
  electric: {
    id: "electric",
    label: "Electric organs",
    note: "Africa and South America",
    help: "Muscles recast as batteries — once in African elephantfish, once in South American knifefish.",
    ancestor: {
      kicker: "Last shared organism",
      lacked: "no electric organ",
      body: "A bony fish of ordinary rivers. Its muscles moved it through water. They did not yet fire as a battery — sensing and stunning by electricity was not its trick.",
    },
    solution: {
      kicker: "Shared solution",
      body: "Muscle recast as a battery — a private sense, and sometimes a weapon. Invented in African rivers, and again in South American ones.",
    },
    examples: [
      {
        tip: "knifefish",
        name: "Electric eel",
        latin: "Electrophorus electricus",
        env: "Murky river · prey",
        need: "Dark water. Prey you cannot see.",
        demo: "eel",
        blurb: "A South American knifefish that pulses to sense — and can stun prey.",
      },
      {
        tip: "elephantfish",
        name: "Elephantnose fish",
        latin: "Gnathonemus petersii",
        env: "Turbid river · night",
        need: "Muddy water. A world made of pulses.",
        demo: "mormyrid",
        blurb: "An African mormyrid with its own electric organ — same job, separate invention.",
      },
    ],
  },
  tongues: {
    id: "tongues",
    label: "Ballistic tongues",
    note: "Chameleons and salamanders",
    help: "The same shooting tongue, in animals hundreds of millions of years apart.",
    ancestor: {
      kicker: "Last shared organism",
      lacked: "no ballistic tongue",
      body: "An early tetrapod. It had a tongue for tasting and swallowing. It did not yet fire that tongue like a spear.",
    },
    solution: {
      kicker: "Shared solution",
      body: "A tongue stored like a spring, then thrown farther than the body is long. Built once in lizards, and again in salamanders.",
    },
    examples: [
      {
        tip: "chameleon",
        name: "Veiled chameleon",
        latin: "Chamaeleo calyptratus",
        env: "Canopy · insects",
        need: "Distance. Prey that will not wait.",
        demo: "chameleon",
        blurb: "A lizard that fires a sticky tongue farther than its own body length.",
      },
      {
        tip: "salamander",
        name: "Lungless salamander",
        latin: "Hydromantes platycephalus",
        env: "Wet rock · springtails",
        need: "A crevice. Prey just out of reach.",
        demo: "salamander",
        blurb: "A woodland amphibian that independently engineered the same ballistic strike.",
      },
    ],
  },
  intelligence: {
    id: "intelligence",
    label: "Intelligence",
    note: "Apes, crows, octopuses",
    help: "Complex cognition in apes, corvids, and cephalopods — three brains, no shared blueprint.",
    examples: [
      {
        tip: "chimpanzee",
        name: "Chimpanzee",
        latin: "Pan troglodytes",
        image: "img/chimp.jpg",
        blurb: "A primate mind: tools, politics, and a brain that keeps rewriting itself.",
      },
      {
        tip: "corvids",
        name: "New Caledonian crow",
        latin: "Corvus moneduloides",
        image: "img/crow.jpg",
        blurb: "A bird that shapes tools — intelligence on a separate vertebrate branch.",
      },
      {
        tip: "cephalopods",
        name: "Common octopus",
        latin: "Octopus vulgaris",
        image: "img/octopus.jpg",
        blurb: "A mollusc with a distributed nervous system and a talent for solving puzzles.",
      },
    ],
  },
  echolocation: {
    id: "echolocation",
    label: "Echolocation",
    note: "Bats and dolphins",
    help: "The hearing protein Prestin — and other genes — converged in bats and toothed whales.",
    ancestor: {
      kicker: "Last shared organism",
      lacked: "no echolocation",
      body: "A small land mammal. It walked, it heard, it had a larynx. It did not echolocate — night air and dark water were not its problem.",
    },
    solution: {
      kicker: "Shared solution",
      body: "Hunting by sound — a pulse out, an echo home — invented twice, from an ancestor that only had ordinary hearing.",
    },
    examples: [
      {
        tip: "bats",
        name: "Little brown bat",
        latin: "Myotis lucifugus",
        image: "img/bat.jpg",
        env: "Night air · moths",
        need: "Night air. Prey you cannot see.",
        demo: "bat",
        blurb: "Flying in the dark, a moth is invisible until it returns a click. Ultrasound from the larynx; oversized ears catch the bounce. Sonar, built for air.",
      },
      {
        tip: "dolphins",
        name: "Bottlenose dolphin",
        latin: "Tursiops truncatus",
        image: "img/dolphin.jpg",
        env: "Open ocean · fish",
        need: "Dark water. Prey you cannot see.",
        demo: "dolphin",
        blurb: "Underwater, light dies fast. Clicks fire through a fatty melon; the lower jawbone is the microphone. Sonar, built for water.",
      },
    ],
  },
  pheromone: {
    id: "pheromone",
    label: "Same lure",
    note: "Butterflies and elephants",
    help: "The same molecule, (Z)-7-dodecen-1-yl acetate, used as a sex lure in moths, butterflies — and Asian elephants.",
    ancestor: {
      kicker: "Last shared organism",
      lacked: "no shared lure",
      body: "A bilaterian in the Cambrian sea. It had no air to scent, no flowers, no herds. The molecule that would later call mates on two distant branches was not yet a message.",
    },
    solution: {
      kicker: "Shared solution",
      body: "The same acetate molecule as a sex lure — written into moths and butterflies, and independently into Asian elephants.",
    },
    examples: [
      {
        tip: "butterflies",
        name: "Cabbage butterfly",
        latin: "Pieris rapae",
        env: "Field · night air",
        need: "A mate on the wind. A chemical that carries.",
        demo: "butterfly",
        blurb: "One of many lepidopterans that advertise with this exact acetate compound.",
      },
      {
        tip: "elephants",
        name: "Asian elephant",
        latin: "Elephas maximus",
        env: "Forest · urine trail",
        need: "A herd spread wide. A signal that lasts.",
        demo: "elephant",
        blurb: "The same molecule, in urine, tells bulls that a cow is ready to mate.",
      },
    ],
  },
  doppelgangers: {
    id: "doppelgangers",
    label: "Meadowlarks & longclaws",
    note: "Lookalikes on two continents",
    help: "Open-country birds that match in niche, shape, and yellow-and-black dress — and are not close kin.",
    examples: [
      {
        tip: "meadowlark",
        name: "Western meadowlark",
        latin: "Sturnella neglecta",
        image: "img/meadowlark.jpg",
        blurb: "A North American icterid of grasslands, black V on a yellow breast.",
      },
      {
        tip: "longclaw",
        name: "Yellow-throated longclaw",
        latin: "Macronyx croceus",
        image: "img/longclaw.jpg",
        blurb: "An African pipit relative playing the same part, in the same costume.",
      },
    ],
  },
  cavities: {
    id: "cavities",
    label: "Cavity nesters",
    note: "Swallows and warblers",
    help: "Compete for scarce nest holes, and aggression — even brain chemistry — evolves to match.",
    examples: [
      {
        tip: "swallows",
        name: "Barn swallow",
        latin: "Hirundo rustica",
        image: "img/swallow.jpg",
        blurb: "A cavity-adjacent nester whose boldness is part of the hole-scarcity story.",
      },
      {
        tip: "warblers",
        name: "Prothonotary warbler",
        latin: "Protonotaria citrea",
        image: "img/warbler.jpg",
        blurb: "A warbler that fights for tree cavities — same pressure, separate songbird branch.",
      },
    ],
  },
};

const V3 = (x, y, z) => [x, y, z];

export const TREE = {
  id: "root",
  name: "LUCA",
  domain: "root",
  length: 0.55,
  spread: 0.2,
  children: [
        {
          id: "bacteria",
          name: "Bacteria",
          domain: "bacteria",
          length: 2.35,
          direction: V3(0.78, -0.22, 0.58),
          spread: 1.18,
      children: [
        {
          id: "thermophiles-b",
          name: "Deep-branching thermophiles",
          domain: "bacteria",
          length: 1.15,
          spread: 0.45,
          children: [
            { id: "thermotogales", name: "Thermotogales", domain: "bacteria", length: 0.85 },
            { id: "aquificae", name: "Aquificae", domain: "bacteria", length: 0.72 },
          ],
        },
        { id: "firmicutes", name: "Firmicutes", domain: "bacteria", length: 1.55 },
        { id: "actinobacteria", name: "Actinobacteria", domain: "bacteria", length: 1.42 },
        {
          id: "cyanoline",
          name: "Cyanobacteria + plastids",
          domain: "bacteria",
          length: 1.2,
          spread: 0.38,
          children: [
            { id: "cyanobacteria", name: "Cyanobacteria", domain: "bacteria", length: 0.95 },
            { id: "plastids", name: "Plastids", domain: "bacteria", length: 0.7 },
            { id: "deinococcus", name: "Deinococcus / Thermus", domain: "bacteria", length: 0.82 },
          ],
        },
        { id: "chlorobi", name: "Chlorobi", domain: "bacteria", length: 1.28 },
        { id: "cfb", name: "CFB group", domain: "bacteria", length: 1.18 },
        { id: "chlamydia", name: "Chlamydia", domain: "bacteria", length: 1.05 },
        { id: "planctomycetes", name: "Planctomycetes", domain: "bacteria", length: 1.12 },
        { id: "spirochaetes", name: "Spirochaetes", domain: "bacteria", length: 1.22 },
        {
          id: "proteobacteria",
          name: "Proteobacteria",
          domain: "bacteria",
          length: 1.35,
          spread: 0.62,
          children: [
            { id: "epsilon", name: "ε-proteobacteria", domain: "bacteria", length: 0.82 },
            { id: "delta", name: "δ-proteobacteria", domain: "bacteria", length: 0.9 },
            { id: "alpha", name: "α-proteobacteria", domain: "bacteria", length: 0.78 },
            { id: "mitochondria", name: "Mitochondria", domain: "bacteria", length: 0.66 },
            { id: "beta", name: "β-proteobacteria", domain: "bacteria", length: 0.84 },
            { id: "gamma", name: "γ-proteobacteria", domain: "bacteria", length: 1.05 },
          ],
        },
        {
          id: "pvc-ish",
          name: "PVC / Acidobacteria",
          domain: "bacteria",
          length: 1.05,
          spread: 0.42,
          children: [
            { id: "acidobacteria", name: "Acidobacteria", domain: "bacteria", length: 0.8 },
            { id: "op11", name: "OP11", domain: "bacteria", length: 0.7 },
            { id: "verrucomicrobia", name: "Verrucomicrobia", domain: "bacteria", length: 0.88 },
            { id: "chloroflexi", name: "Chloroflexi", domain: "bacteria", length: 0.92 },
          ],
        },
      ],
    },
        {
          id: "archaea",
          name: "Archaea",
          domain: "archaea",
          length: 2.2,
          direction: V3(-0.82, 0.06, -0.56),
          spread: 0.88,
      children: [
        {
          id: "crenarchaea",
          name: "Crenarchaea",
          domain: "archaea",
          length: 1.25,
          spread: 0.55,
          children: [
            { id: "crenarchaeum", name: "Crenarchaeum", domain: "archaea", length: 0.95 },
            { id: "korarchaeota", name: "Korarchaeota", domain: "archaea", length: 0.82 },
            { id: "desulfurococcus", name: "Desulfurococcus", domain: "archaea", length: 0.88 },
            { id: "sulfolobus", name: "Sulfolobus", domain: "archaea", length: 1.05 },
            { id: "aeropyrum", name: "Aeropyrum", domain: "archaea", length: 0.78 },
            { id: "pyrobaculum", name: "Pyrobaculum", domain: "archaea", length: 0.86 },
            { id: "thermofilum", name: "Thermofilum", domain: "archaea", length: 0.7 },
            { id: "nanoarchaeota", name: "Nanoarchaeota", domain: "archaea", length: 0.74 },
          ],
        },
        {
          id: "euryarchaea",
          name: "Euryarchaea",
          domain: "archaea",
          length: 1.32,
          spread: 0.7,
          children: [
            { id: "archaeoglobus", name: "Archaeoglobus", domain: "archaea", length: 0.9 },
            { id: "halophiles", name: "Halophiles", domain: "archaea", length: 1.12 },
            { id: "methanosarcina", name: "Methanosarcina", domain: "archaea", length: 1.0 },
            { id: "methanospirillum", name: "Methanospirillum", domain: "archaea", length: 0.95 },
            { id: "anne1", name: "ANME-1", domain: "archaea", length: 0.78 },
            { id: "methanothermus", name: "Methanothermus", domain: "archaea", length: 0.82 },
            { id: "thermoplasma", name: "Thermoplasma", domain: "archaea", length: 0.88 },
            { id: "methanopyrus", name: "Methanopyrus", domain: "archaea", length: 0.84 },
            { id: "pyrococcus", name: "Pyrococcus", domain: "archaea", length: 1.08 },
            { id: "methanobacterium", name: "Methanobacterium", domain: "archaea", length: 0.92 },
          ],
        },
      ],
    },
        {
          id: "eukaryotes",
          name: "Eukaryotes",
          domain: "eukaryotes",
          length: 2.55,
          direction: V3(0.12, 0.86, -0.49),
          spread: 1.12,
      children: [
        {
          id: "opisthokonts",
          name: "Opisthokonts",
          domain: "eukaryotes",
          length: 1.15,
          direction: V3(-0.42, 0.78, -0.46),
          spread: 0.55,
          children: [
            {
              id: "animals",
              name: "Animals",
              domain: "eukaryotes",
              length: 1.2,
              spread: 1.22,
              children: [
                { id: "cnidarians", name: "Cnidarians", domain: "eukaryotes", length: 1.18 },
                {
                  id: "arthropods",
                  name: "Arthropods",
                  domain: "eukaryotes",
                  length: 1.05,
                  spread: 0.72,
                  children: [
                    {
                      id: "insects",
                      name: "Insects",
                      domain: "eukaryotes",
                      length: 0.85,
                      spread: 0.4,
                      children: [
                        { id: "butterflies", name: "Butterflies", domain: "eukaryotes", length: 1.05 },
                      ],
                    },
                    {
                      id: "crustaceans",
                      name: "Crustaceans",
                      domain: "eukaryotes",
                      length: 0.95,
                      spread: 0.5,
                      children: [
                        {
                          id: "decapods",
                          name: "Decapods",
                          domain: "eukaryotes",
                          length: 0.72,
                          spread: 0.42,
                          children: [
                            { id: "brachyura", name: "True crabs", domain: "eukaryotes", length: 1.12 },
                            { id: "anomura", name: "Anomurans", domain: "eukaryotes", length: 1.08 },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "molluscs",
                  name: "Molluscs",
                  domain: "eukaryotes",
                  length: 1.05,
                  spread: 0.4,
                  children: [
                    { id: "cephalopods", name: "Cephalopods", domain: "eukaryotes", length: 1.35 },
                  ],
                },
                {
                  id: "chordates",
                  name: "Chordates",
                  domain: "eukaryotes",
                  length: 1.15,
                  spread: 0.9,
                  children: [
                    {
                      id: "fishes",
                      name: "Fishes",
                      domain: "eukaryotes",
                      length: 1.05,
                      spread: 0.82,
                      children: [
                        {
                          id: "osteoglossomorphs",
                          name: "Osteoglossomorphs",
                          domain: "eukaryotes",
                          length: 0.78,
                          spread: 0.28,
                          children: [
                            { id: "elephantfish", name: "Elephantfish", domain: "eukaryotes", length: 1.1 },
                          ],
                        },
                        {
                          id: "gadiforms",
                          name: "Gadiforms",
                          domain: "eukaryotes",
                          length: 0.82,
                          spread: 0.28,
                          children: [
                            { id: "arctic-cod", name: "Arctic cod", domain: "eukaryotes", length: 1.05 },
                          ],
                        },
                        {
                          id: "percomorphs",
                          name: "Percomorphs",
                          domain: "eukaryotes",
                          length: 0.86,
                          spread: 0.28,
                          children: [
                            { id: "toothfish", name: "Notothenioids", domain: "eukaryotes", length: 1.12 },
                          ],
                        },
                        {
                          id: "ostariophysi",
                          name: "Ostariophysi",
                          domain: "eukaryotes",
                          length: 0.84,
                          spread: 0.28,
                          children: [
                            { id: "knifefish", name: "Knifefish", domain: "eukaryotes", length: 1.08 },
                          ],
                        },
                      ],
                    },
                    {
                      id: "tetrapods",
                      name: "Tetrapods",
                      domain: "eukaryotes",
                      length: 1.1,
                      spread: 0.88,
                      children: [
                        {
                          id: "amphibians",
                          name: "Amphibians",
                          domain: "eukaryotes",
                          length: 0.92,
                          spread: 0.32,
                          children: [
                            { id: "salamander", name: "Salamanders", domain: "eukaryotes", length: 1.05 },
                          ],
                        },
                        {
                          id: "amniotes",
                          name: "Amniotes",
                          domain: "eukaryotes",
                          length: 1.02,
                          spread: 0.78,
                          children: [
                            {
                              id: "squamates",
                              name: "Squamates",
                              domain: "eukaryotes",
                              length: 0.88,
                              spread: 0.3,
                              children: [
                                { id: "chameleon", name: "Chameleons", domain: "eukaryotes", length: 1.12 },
                              ],
                            },
                            {
                              id: "birds",
                              name: "Birds",
                              domain: "eukaryotes",
                              length: 1.05,
                              spread: 0.9,
                              children: [
                                { id: "corvids", name: "Corvids", domain: "eukaryotes", length: 0.95 },
                                {
                                  id: "icterids",
                                  name: "Icterids",
                                  domain: "eukaryotes",
                                  length: 0.72,
                                  spread: 0.28,
                                  children: [
                                    { id: "meadowlark", name: "Meadowlarks", domain: "eukaryotes", length: 1.0 },
                                  ],
                                },
                                {
                                  id: "motacillids",
                                  name: "Pipits and longclaws",
                                  domain: "eukaryotes",
                                  length: 0.74,
                                  spread: 0.28,
                                  children: [
                                    { id: "longclaw", name: "Longclaws", domain: "eukaryotes", length: 1.02 },
                                  ],
                                },
                                { id: "swallows", name: "Swallows", domain: "eukaryotes", length: 0.92 },
                                { id: "warblers", name: "Warblers", domain: "eukaryotes", length: 0.98 },
                              ],
                            },
                            {
                              id: "mammals",
                              name: "Mammals",
                              domain: "eukaryotes",
                              length: 1.08,
                              spread: 0.78,
                              children: [
                                { id: "bats", name: "Bats", domain: "eukaryotes", length: 1.05 },
                                {
                                  id: "primates",
                                  name: "Primates",
                                  domain: "eukaryotes",
                                  length: 0.7,
                                  spread: 0.28,
                                  children: [
                                    { id: "chimpanzee", name: "Apes", domain: "eukaryotes", length: 0.95 },
                                  ],
                                },
                                {
                                  id: "cetaceans",
                                  name: "Cetaceans",
                                  domain: "eukaryotes",
                                  length: 0.78,
                                  spread: 0.28,
                                  children: [
                                    { id: "dolphins", name: "Dolphins", domain: "eukaryotes", length: 1.1 },
                                  ],
                                },
                                { id: "elephants", name: "Elephants", domain: "eukaryotes", length: 0.92 },
                                { id: "hedgehog", name: "Hedgehogs", domain: "eukaryotes", length: 0.88 },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            { id: "choanoflagellates", name: "Choanoflagellates", domain: "eukaryotes", length: 0.72 },
            { id: "fungi", name: "Fungi", domain: "eukaryotes", length: 1.05 },
            { id: "nucleariids", name: "Nucleariids", domain: "eukaryotes", length: 0.62 },
            { id: "mesomycetozoa", name: "Mesomycetozoa", domain: "eukaryotes", length: 0.58 },
          ],
        },
        {
          id: "amoebozoa",
          name: "Amoebozoa",
          domain: "eukaryotes",
          length: 1.05,
          spread: 0.4,
          children: [
            { id: "cellular-slime", name: "Cellular slime molds", domain: "eukaryotes", length: 0.82 },
            { id: "plasmodial-slime", name: "Plasmodial slime molds", domain: "eukaryotes", length: 0.78 },
            { id: "amoebas", name: "Amoebas", domain: "eukaryotes", length: 0.7 },
          ],
        },
        {
          id: "rhizaria",
          name: "Rhizaria",
          domain: "eukaryotes",
          length: 1.12,
          spread: 0.42,
          children: [
            { id: "cercozoans", name: "Cercozoans", domain: "eukaryotes", length: 0.7 },
            { id: "foraminifera", name: "Foraminifera", domain: "eukaryotes", length: 0.86 },
            { id: "radiolarians", name: "Radiolarians", domain: "eukaryotes", length: 0.8 },
            { id: "chlorarachniophytes", name: "Chlorarachniophytes", domain: "eukaryotes", length: 0.66 },
          ],
        },
        {
          id: "plants",
          name: "Plants",
          domain: "eukaryotes",
          length: 1.22,
          direction: V3(0.22, 0.96, 0.15),
          spread: 0.72,
          children: [
            {
              id: "land-plants",
              name: "Land plants",
              domain: "eukaryotes",
              length: 1.18,
              spread: 0.92,
              children: [
                { id: "mosses", name: "Mosses", domain: "eukaryotes", length: 0.95 },
                {
                  id: "ferns",
                  name: "Ferns",
                  domain: "eukaryotes",
                  length: 1.05,
                  spread: 0.42,
                  children: [
                    { id: "tree-ferns", name: "Tree ferns", domain: "eukaryotes", length: 0.92 },
                    { id: "horsetails", name: "Horsetails", domain: "eukaryotes", length: 0.78 },
                  ],
                },
                {
                  id: "gymnosperms",
                  name: "Gymnosperms",
                  domain: "eukaryotes",
                  length: 1.08,
                  spread: 0.48,
                  children: [
                    { id: "conifers", name: "Conifers", domain: "eukaryotes", length: 1.12 },
                    { id: "cycads", name: "Cycads", domain: "eukaryotes", length: 0.88 },
                    { id: "ginkgo", name: "Ginkgo", domain: "eukaryotes", length: 0.82 },
                  ],
                },
                {
                  id: "flowering",
                  name: "Flowering plants",
                  domain: "eukaryotes",
                  length: 1.15,
                  spread: 0.78,
                  children: [
                    {
                      id: "monocots",
                      name: "Monocots",
                      domain: "eukaryotes",
                      length: 0.92,
                      spread: 0.52,
                      children: [
                        { id: "grasses", name: "Grasses", domain: "eukaryotes", length: 1.05 },
                        { id: "palms", name: "Palms", domain: "eukaryotes", length: 0.98 },
                        { id: "orchids", name: "Orchids", domain: "eukaryotes", length: 1.02 },
                      ],
                    },
                    {
                      id: "eudicots",
                      name: "Eudicots",
                      domain: "eukaryotes",
                      length: 0.96,
                      spread: 0.55,
                      children: [
                        { id: "atriplex", name: "Saltbushes", domain: "eukaryotes", length: 0.98 },
                        { id: "cacti", name: "Cacti", domain: "eukaryotes", length: 1.08 },
                        { id: "legumes", name: "Legumes", domain: "eukaryotes", length: 0.92 },
                        { id: "roses", name: "Roses", domain: "eukaryotes", length: 0.88 },
                      ],
                    },
                  ],
                },
              ],
            },
            { id: "green-algae", name: "Green algae", domain: "eukaryotes", length: 0.82 },
            { id: "red-algae", name: "Red algae", domain: "eukaryotes", length: 0.76 },
            { id: "glaucophytes", name: "Glaucophyte algae", domain: "eukaryotes", length: 0.64 },
          ],
        },
        {
          id: "alveolates",
          name: "Alveolates",
          domain: "eukaryotes",
          length: 1.08,
          spread: 0.4,
          children: [
            { id: "ciliates", name: "Ciliates", domain: "eukaryotes", length: 0.78 },
            { id: "dinoflagellates", name: "Dinoflagellates", domain: "eukaryotes", length: 0.86 },
            { id: "apicomplexa", name: "Apicomplexa", domain: "eukaryotes", length: 0.7 },
            { id: "syndiniales", name: "Syndiniales", domain: "eukaryotes", length: 0.58 },
          ],
        },
        {
          id: "heterokonts",
          name: "Heterokonts",
          domain: "eukaryotes",
          length: 1.18,
          spread: 0.46,
          children: [
            { id: "diatoms", name: "Diatoms", domain: "eukaryotes", length: 0.88 },
            { id: "phaeophytes", name: "Phaeophytes", domain: "eukaryotes", length: 1.02 },
            { id: "chrysophytes", name: "Chrysophytes", domain: "eukaryotes", length: 0.7 },
            { id: "oomycetes", name: "Oomycetes", domain: "eukaryotes", length: 0.66 },
            { id: "labyrinthulids", name: "Labyrinthulids", domain: "eukaryotes", length: 0.6 },
          ],
        },
        {
          id: "discicristates",
          name: "Discicristates",
          domain: "eukaryotes",
          length: 1.0,
          spread: 0.38,
          children: [
            { id: "euglenids", name: "Euglenids", domain: "eukaryotes", length: 0.72 },
            { id: "trypanosomes", name: "Trypanosomes", domain: "eukaryotes", length: 0.8 },
            { id: "leishmanias", name: "Leishmanias", domain: "eukaryotes", length: 0.68 },
            { id: "acrasid-slime", name: "Acrasid slime molds", domain: "eukaryotes", length: 0.74 },
          ],
        },
        {
          id: "excavates",
          name: "Excavates",
          domain: "eukaryotes",
          length: 0.95,
          spread: 0.36,
          children: [
            { id: "jakobids", name: "Core jakobids", domain: "eukaryotes", length: 0.66 },
            { id: "parabasalids", name: "Parabasalids", domain: "eukaryotes", length: 0.72 },
            { id: "diplomonads", name: "Diplomonads", domain: "eukaryotes", length: 0.7 },
            { id: "oxymonads", name: "Oxymonads", domain: "eukaryotes", length: 0.58 },
          ],
        },
        { id: "haptophytes", name: "Haptophytes", domain: "eukaryotes", length: 0.82 },
        { id: "cryptophytes", name: "Cryptophytes", domain: "eukaryotes", length: 0.76 },
      ],
    },
  ],
};

// Median/summary ages from TimeTree 5 (Kumar et al. 2022; timetree.org / api.timetree.org).
// Values are millions of years before present. Extant tips are 0.
const TIMETREE_AGES = {
  root: 4146.8, // cellular organisms
  bacteria: 3306.37,
  "thermophiles-b": 2868.85, // Thermotogati
  cyanoline: 1341.47, // Cyanobacteriota
  proteobacteria: 2077.69, // Pseudomonadota
  "pvc-ish": 2789.41, // MRCA Acidobacterium–Chloroflexus
  archaea: 4146.8, // Archaea
  crenarchaea: 2807.56, // Thermoproteota
  euryarchaea: 3053.83, // Methanobacteriati
  eukaryotes: 1455.26,
  opisthokonts: 896.51,
  animals: 750.1, // Metazoa
  arthropods: 559.62,
  insects: 431.27,
  crustaceans: 534.67,
  decapods: 316.72,
  molluscs: 534.26,
  chordates: 610.37,
  fishes: 391.49, // Actinopterygii
  osteoglossomorphs: 218.91,
  gadiforms: 48.08, // Gadiformes
  percomorphs: 122.39, // Percomorphaceae
  ostariophysi: 159.73,
  tetrapods: 352.08,
  amphibians: 316.95,
  amniotes: 318.82,
  squamates: 200.13,
  birds: 107.56, // Aves
  icterids: 19.75, // Passeriformes
  motacillids: 19.75, // Passeriformes
  mammals: 181.19,
  primates: 71.65,
  cetaceans: 33.55,
  plants: 974.18, // Viridiplantae
  "land-plants": 482.94, // Embryophyta
  ferns: 346.2, // Polypodiopsida
  gymnosperms: 261.78, // Acrogymnospermae
  flowering: 196.28, // Magnoliopsida
  monocots: 140.82, // Liliopsida
  eudicots: 121.06, // Pentapetalae
  amoebozoa: 1206.34,
  rhizaria: 1097.03,
  alveolates: 1082.39,
  heterokonts: 660.85, // Stramenopiles
  discicristates: 1175.63, // Euglenozoa
  excavates: 1220.0, // Metamonada
};

function assignTimeTreeAges(node) {
  const kids = node.children ?? [];
  kids.forEach(assignTimeTreeAges);
  if (!kids.length) {
    node.age = 0;
    return;
  }
  const sourced = TIMETREE_AGES[node.id];
  if (sourced == null) {
    throw new Error(`Missing TimeTree age for internal node "${node.id}"`);
  }
  node.age = sourced;
}

assignTimeTreeAges(TREE);
