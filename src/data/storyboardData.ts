import { CharacterProfile, StoryScene } from '../types';

export const TOTAL_STORY_DURATION = 136; // in seconds (~2 minutes 16 seconds)

export const CHARACTERS: Record<string, CharacterProfile> = {
  rama: {
    id: 'rama',
    name: 'Lord Rama',
    hindiName: 'श्री राम',
    sanskritName: 'श्री रामचंद्रः',
    title: 'मर्यादा पुरुषोत्तम',
    role: 'Seventh avatar of Lord Vishnu, embodiment of righteousness (Dharma)',
    appearance: 'Luminous cyan-blue Meghashyam complexion, piercing lotus eyes, royal golden mukut, Kodanda celestial bow, pitambara silk.',
    divineAttributes: ['Infinite Dharma', 'Supreme Archer', 'Patience', 'Protector of the Realms'],
    weaponsAndSymbols: ['Kodanda Bow', 'Brahmastra', 'Surya Vamsha Crest'],
    dharmaTheme: 'Righteous conduct above personal desire; truth unbroken by exile.',
    powerLevel: 'Divinity Supreme (अनन्त सामर्थ्य)',
    colorTheme: '#38bdf8'
  },
  sita: {
    id: 'sita',
    name: 'Mata Sita',
    hindiName: 'माता सीता',
    sanskritName: 'वैदेही जानकी',
    title: 'धरणीपुत्री • शक्ति स्वरूपा',
    role: 'Incarnation of Goddess Lakshmi, sovereign princess of Mithila',
    appearance: 'Radiant golden complexion, deep crimson and gold-bordered silk sari, chudamani jewel, divine unshakeable grace.',
    divineAttributes: ['Unshakable Will', 'Moral Fortress', 'Earth-born Purity', 'Fierce Dignity'],
    weaponsAndSymbols: ['Chudamani Jewel', 'Lotus of Lakshmi', 'Sacred Fire of Purity'],
    dharmaTheme: 'Unyielding dignity and spiritual courage in the face of captivity.',
    powerLevel: 'Aura of Invincible Virtue (अखंड पातिव्रत्य)',
    colorTheme: '#f43f5e'
  },
  lakshmana: {
    id: 'lakshmana',
    name: 'Lakshmana',
    hindiName: 'लक्ष्मण',
    sanskritName: 'सौमित्रिः',
    title: 'अनंत शेषनाग अवतार',
    role: 'Fierce protector, younger brother of Rama, warrior who conquered sleep',
    appearance: 'Golden armored warrior, blazing golden eyes, recurve bow, crimson sash, resolute guardian stance.',
    divineAttributes: ['Absolute Loyalty', 'Sleepless Vigilance', 'Fierce Valor', 'Cosmic Serpent Power'],
    weaponsAndSymbols: ['Celestial Recurve Bow', 'Broadhead Arrows', 'Nagastra'],
    dharmaTheme: 'Total devotion and selfless service to truth and righteousness.',
    powerLevel: 'Unconquerable Guardian (अजेय रक्षक)',
    colorTheme: '#fb923c'
  },
  hanuman: {
    id: 'hanuman',
    name: 'Hanuman',
    hindiName: 'महाबली हनुमान',
    sanskritName: 'पवनसुतः हनुमान्',
    title: 'संकटमोचन • महावीर',
    role: 'Son of Vayu, supreme devotee, warrior of infinite strength and humility',
    appearance: 'Golden muscular Vanara form, solar radiant halo, flying crimson scarf, giant golden Gada (mace), folded hands.',
    divineAttributes: ['Ashta Siddhi (8 Mystic Powers)', 'Speed of Thought', 'Immeasurable Strength', 'Boundless Bhakti'],
    weaponsAndSymbols: ['Golden Gada (Mace)', 'Rama’s Signet Ring', 'Vayu Aura'],
    dharmaTheme: 'Strength surrendered to selfless devotion; impossible obstacles conquered through faith.',
    powerLevel: 'Cosmic Kinetic Titan (अपरिमित बल)',
    colorTheme: '#eab308'
  },
  ravana: {
    id: 'ravana',
    name: 'Ravana',
    hindiName: 'दशानन रावण',
    sanskritName: 'दशग्रीवः रावणः',
    title: 'लंकाधिपति • त्रिलोक विजेता',
    role: 'Ten-headed King of Lanka, master of Vedas, tragic victim of unchecked pride',
    appearance: 'Colossal bronze-skinned titan, ten crowned heads with blazing demonic red eyes, twenty arms holding celestial swords and tridents.',
    divineAttributes: ['Master of 4 Vedas & 6 Shastras', 'Cosmic Boons', 'Chandrahas Blade', 'Fatal Hubris'],
    weaponsAndSymbols: ['Chandrahas Sword', 'Pushpaka Vimana', 'Dark Trident'],
    dharmaTheme: 'The destruction of boundless knowledge when corrupted by ego and lust.',
    powerLevel: 'Emperor of Calamity (दशकण्ठ संहारक)',
    colorTheme: '#ef4444'
  }
};

export const STORY_SCENES: StoryScene[] = [
  {
    id: 0,
    slug: 'the-screen-breaks',
    title: 'The Screen Breaks',
    hindiTitle: 'पर्दा टूटता है: ग्रंथारम्भ',
    sanskritTitle: 'ग्रंथारम्भः',
    chapterNumber: 0,
    startTime: 0,
    endTime: 10,
    subtitle: 'Some stories were never meant to stay on a page.',
    hindiSubtitle: 'कुछ गाथाएं पन्नों में बांधने के लिए नहीं बनी थीं।',
    sanskritSubtitle: 'आपदामपहर्तारं दातारं सर्वसम्पदाम्।',
    narration: 'Before memory began, the epic was inscribed in gold. Listen closely, seeker... for tonight, the ancient manuscript awakens, and the screen breaks.',
    hindiNarration: 'स्मृति के उद्भव से पूर्व, यह गाथा स्वर्णाक्षरों में रची गई थी। सुनो ध्यान से, ओ पथिक! आज यह पावन ग्रंथ जाग्रत होता है, और पर्दे की सीमाएं टूट जाती हैं!',
    sanskritShloka: 'ॐ आपदामपहर्तारं दातारं सर्वसम्पदाम्। लोकाभिरामं श्रीरामं भूयो भूयो नमाम्यहम्॥',
    sanskritMeaning: 'I bow again and again to Lord Sri Rama, the reliever of all perils and the bestower of all prosperity.',
    narrationCues: [
      { text: 'Before memory began, the epic was inscribed in gold.', start: 0.8, duration: 4.2 },
      { text: 'Listen closely, seeker... for tonight, the ancient manuscript awakens, and the screen breaks.', start: 5.2, duration: 4.5 }
    ],
    directorNotes: {
      cameraMove: 'Fast snap-zoom into the golden manuscript, followed by an explosion of golden runes as the screen shatters into the epic world.',
      palette: 'Deep temple obsidian, molten 24k gold, blazing cosmic amber.',
      atmosphere: 'Mystic stillness broken by kinetic shockwave of divine text.',
      lighting: 'Fierce gold backlighting erupting through ancient paper seams.',
      focalPoint: 'The central pages of the Ramayana breaking forward into the viewer.',
      actionImpact: 'medium'
    },
    audioCue: {
      theme: 'temple',
      sfx: ['temple_bell', 'page_turn', 'fire_crackle', 'bass_drop'],
      tempo: 'slow'
    },
    videoGenerationPrompt: {
      veo3Prompt: 'Cinematic manhwa action animation of an ancient temple altar. A massive illuminated manuscript of the Ramayana bursts open with golden shockwaves and glowing Sanskrit glyphs flying toward the lens. High contrast manhwa linework, 4k anime visual.',
      cameraMotion: 'Fast punch zoom into the opening book with particle explosion.',
      styleLock: 'High-contrast manhwa illustration with dynamic glowing aura lines.',
      characterLock: 'Sacred glowing manuscript breaking into the third dimension.'
    }
  },
  {
    id: 1,
    slug: 'ayodhya-kingdom-of-light',
    title: 'Ayodhya: The Kingdom of Light',
    hindiTitle: 'अयोध्या: सूर्यवंश की प्रभा',
    sanskritTitle: 'अयोध्या नगरी',
    chapterNumber: 1,
    startTime: 10,
    endTime: 22,
    subtitle: 'Where righteousness ruled, and the dawn carried no sorrow.',
    hindiSubtitle: 'जहां धर्म ही सिंहासन था, और प्रभात में कोई शोक न था।',
    sanskritSubtitle: 'अयोध्या नाम नगरी तत्रासील्लोकविश्रुता।',
    narration: 'Behold Ayodhya, city of the sun! Upon the sacred Sarayu, high temple spires pierce the golden dawn. Here, Prince Rama was born to walk the path of truth.',
    hindiNarration: 'निहारो अयोध्या को! सूर्यवंश की पावन राजधानी। पवित्र सरयू के तट पर स्वर्ण शिखर गगन को चूमते हैं। यहीं श्री राम का अवतरण हुआ, धर्म की ध्वजा फहराने के लिए!',
    sanskritShloka: 'अयोध्या नाम नगरी तत्रासील्लोकविश्रुता। मनुना मानवेन्द्रेण या पुरी निर्मिता स्वयम्॥',
    sanskritMeaning: 'There was the world-famous city named Ayodhya, founded by the foremost of kings, Manu himself.',
    narrationCues: [
      { text: 'Behold Ayodhya, city of the sun!', start: 0.6, duration: 3.2 },
      { text: 'Upon the sacred Sarayu, high temple spires pierce the golden dawn.', start: 4.0, duration: 4.0 },
      { text: 'Here, Prince Rama was born to walk the path of truth.', start: 8.2, duration: 3.5 }
    ],
    directorNotes: {
      cameraMove: 'Sweeping aerial dive-bomb across the Sarayu river into the majestic golden fortress gates of Ayodhya.',
      palette: 'Blazing saffron, royal gold, lapis lazuli water reflections.',
      atmosphere: 'Majestic, soaring, radiant solar triumph.',
      lighting: 'Piercing morning sun flare directly behind the central Shikhara temple spire.',
      focalPoint: 'The sunburst over the highest tower of the palace.',
      actionImpact: 'light'
    },
    audioCue: {
      theme: 'ayodhya',
      sfx: ['conch_blast', 'river_rush', 'shehnai_fanfare', 'cheering'],
      tempo: 'serene'
    },
    videoGenerationPrompt: {
      veo3Prompt: 'Sweeping cinematic manhwa action shot of ancient Ayodhya city. Golden sun rising over massive stone temples, fluttering saffron flags, Sarayu river with reflection, crowds rejoicing. Masterpiece anime art, saturated saffron and gold palette.',
      cameraMotion: 'Rapid flyover gliding over water and rising dynamically to temple peaks.',
      styleLock: 'Manhwa heroic anime, sharp golden rim light, epic scale.',
      characterLock: 'Ancient Indian architecture, Surya Vamsha motifs.'
    }
  },
  {
    id: 2,
    slug: 'the-forest-of-exile',
    title: 'The Forest of Exile',
    hindiTitle: 'वनवास: वचन का मान',
    sanskritTitle: 'दण्डकारण्य प्रवेशः',
    chapterNumber: 2,
    startTime: 22,
    endTime: 34,
    subtitle: 'Fourteen years in the wilderness. Duty before the crown.',
    hindiSubtitle: 'चौदह वर्षों का वनवास। मुकुट से पहले पिता का वचन।',
    sanskritSubtitle: 'सीतासहायो धर्मात्मा विजहार महायशाः।',
    narration: 'Yet destiny demanded sacrifice. For an unbroken vow, Rama surrendered the throne. With Sita and steadfast Lakshmana, he stepped into the untamed shadows of Dandakaranya.',
    hindiNarration: 'किंतु नियति ने बलिदान मांगा! पिता के वचन की रक्षा हेतु राम ने राजमुकुट त्याग दिया। विदेह-नंदिनी सीता और लक्ष्मण संग, वे दण्डकारण्य के गहन वन में प्रविष्ट हुए।',
    sanskritShloka: 'दण्डकारण्यप्रवेशे च सौमित्रिणा समन्वितः। सीतासहायो धर्मात्मा विजहार महायशाः॥',
    sanskritMeaning: 'Entering the Dandaka forest accompanied by Lakshmana and supported by Sita, the righteous Rama walked with glory.',
    narrationCues: [
      { text: 'Yet destiny demanded sacrifice. For an unbroken vow, Rama surrendered the throne.', start: 0.8, duration: 4.5 },
      { text: 'With Sita and steadfast Lakshmana, he stepped into the untamed shadows of Dandakaranya.', start: 5.5, duration: 5.5 }
    ],
    directorNotes: {
      cameraMove: 'Low angle tracking camera moving through ancient banyan roots; quick focus pull from Lakshmana’s notched arrow to Rama’s resolute face.',
      palette: 'Deep jungle jade, emerald mist, warm ochre bark garments.',
      atmosphere: 'Stoic resolve, primeval jungle tension, sacred brotherhood.',
      lighting: 'Shafts of hard sunlight cutting through dense leaves like laser beams.',
      focalPoint: 'Rama stepping forward with Kodanda bow, Sita walking in step.',
      actionImpact: 'none'
    },
    audioCue: {
      theme: 'forest',
      sfx: ['forest_wind', 'leaves_rustle', 'bansuri_melody', 'bowstring_creak'],
      tempo: 'slow'
    },
    videoGenerationPrompt: {
      veo3Prompt: 'Manhwa anime illustration of Lord Rama with cyan-blue skin, Queen Sita in crimson sari, and Lakshmana with warrior bow walking through the dense primeval forest of Dandakaranya. Volumetric green sunbeams, ancient mossy banyan roots, dynamic anime character design.',
      cameraMotion: 'Low tracking shot moving alongside the trio with dynamic parallax foliage.',
      styleLock: 'Modern manhwa graphic novel style with detailed linework and lush painterly nature.',
      characterLock: 'Rama: cyan skin, ascetic bark dhoti; Sita: graceful red sari; Lakshmana: vigilant warrior.'
    }
  },
  {
    id: 3,
    slug: 'the-turning-point',
    title: 'The Turning Point',
    hindiTitle: 'स्वर्णमृग का कपट जाल',
    sanskritTitle: 'सुवर्णमृग दर्शनम्',
    chapterNumber: 3,
    startTime: 34,
    endTime: 46,
    subtitle: 'A shimmering illusion in the twilight. The snare is set.',
    hindiSubtitle: 'मायावी स्वर्णमृग का आकर्षण। काल का चक्र घूम उठा।',
    sanskritSubtitle: 'सीता कमलपत्राक्षी सुवर्णमृगमन्वगात्।',
    narration: 'Then came the golden deer—a creature of pure illusion, crafted by dark sorcery. Sita marveled at its crystalline glow. The snare of fate was drawn.',
    hindiNarration: 'तभी प्रकट हुआ मायावी स्वर्णमृग! मारीच का रचा हुआ छद्म रूप। उसकी दीप्ति ने जानकी का मन मोह लिया। नियति का कुचक्र प्रारंभ हो चुका था!',
    sanskritShloka: 'दृष्ट्वा तु रूपसंपन्नं विस्मयं परमं गता। सीता कमलपत्राक्षी सुवर्णमृगमन्वगात्॥',
    sanskritMeaning: 'Beholding the resplendent creature, lotus-eyed Sita was filled with supreme wonder and followed the golden deer.',
    narrationCues: [
      { text: 'Then came the golden deer—a creature of pure illusion, crafted by dark sorcery.', start: 0.6, duration: 4.8 },
      { text: 'Sita marveled at its crystalline glow. The snare of fate was drawn.', start: 5.6, duration: 4.8 }
    ],
    directorNotes: {
      cameraMove: 'Snap push into the golden deer’s glowing crimson eye, shifting suddenly from enchanted beauty to dark demonic distortion.',
      palette: 'Neon golden amber against midnight indigo and poisonous violet.',
      atmosphere: 'Haunting enchantment turning into chilling deception.',
      lighting: 'Pulsing bioluminescent neon waves radiating from the deer’s golden pelt.',
      focalPoint: 'The glowing crystalline antlers of the golden deer Mareecha.',
      actionImpact: 'medium'
    },
    audioCue: {
      theme: 'suspense',
      sfx: ['mystic_sparkle', 'pulse_heartbeat', 'twig_snap', 'dark_drone'],
      tempo: 'tense'
    },
    videoGenerationPrompt: {
      veo3Prompt: 'Dynamic manhwa anime scene of the magical Golden Deer (Mareecha) glowing with blazing yellow neon energy in an enchanted midnight forest. Sita looks in awe while Rama draws his bow in suspicion. Dramatic high contrast lighting, glowing particle sparks.',
      cameraMotion: 'Whip pan from the glowing deer to Rama’s tensed bowstring.',
      styleLock: 'Action manhwa with neon particle effects and stark shadow contrasts.',
      characterLock: 'Golden deer with jewel antlers, Rama ready for combat.'
    }
  },
  {
    id: 4,
    slug: 'the-abduction',
    title: 'The Abduction',
    hindiTitle: 'सीता हरण: लंकापति का प्रहार',
    sanskritTitle: 'सीता हरणम्',
    chapterNumber: 4,
    startTime: 46,
    endTime: 57,
    subtitle: 'The sky weeps as the sovereign of Lanka strikes.',
    hindiSubtitle: 'थर्रा उठा आकाश, जब दशानन ने धर्म की सीमा लांघी।',
    sanskritSubtitle: 'जहार रावणः सीतां दण्डकारण्यमध्यतः।',
    narration: 'Lured away, the forest was left defenseless! Ravana, the ten-headed demon king, shattered the sacred threshold and carried Queen Sita into the raging skies!',
    hindiNarration: 'छल से राम को दूर कर, लंकापति रावण ने मर्यादा की रेखा तोड़ दी! दस मुखों वाला दानवराज दहाड़ उठा, और असहाय जानकी को पुष्पक विमान में बलपूर्वक आकाश में खींच ले गया!',
    sanskritShloka: 'क्रन्दन्तीं राम रामेति हा लक्ष्मणेति वादिनीम्। जहार रावणः सीतां दण्डकारण्यमध्यतः॥',
    sanskritMeaning: 'Crying out "O Rama! O Lakshmana!", Ravana violently abducted Sita from the heart of the Dandaka forest.',
    narrationCues: [
      { text: 'Lured away, the forest was left defenseless!', start: 0.6, duration: 2.8 },
      { text: 'Ravana, the ten-headed demon king, shattered the sacred threshold...', start: 3.6, duration: 3.8 },
      { text: '...and carried Queen Sita into the raging skies!', start: 7.6, duration: 3.2 }
    ],
    directorNotes: {
      cameraMove: 'VIOLENT SCREEN SHAKE. Camera tilts sharply upward as lightning tears the sky open; Ravana’s golden chariot blasts across the frame with speed lines.',
      palette: 'Blood crimson, apocalyptic charcoal smoke, electric golden lightning.',
      atmosphere: 'Violent cataclysm, tragic fury, desecration of cosmic order.',
      lighting: 'Flashes of strobe lightning silhouetting Ravana’s ten roaring crowned heads.',
      focalPoint: 'Ravana holding Sita as she reaches back toward earth.',
      actionImpact: 'heavy'
    },
    audioCue: {
      theme: 'abduction',
      sfx: ['thunder_crash', 'screen_shake', 'demonic_roar', 'chariot_sonic_boom'],
      tempo: 'frenetic'
    },
    videoGenerationPrompt: {
      veo3Prompt: 'High-octane action manhwa of ten-headed demon king Ravana in his airborne golden chariot Pushpaka Vimana tearing across a blood-red thunderstorm. Ravana has ten crowned heads with blazing red eyes and twenty muscular arms holding dark swords. Captive Sita struggles defiantly. Speed lines, violent lightning, intense anime action.',
      cameraMotion: 'Dynamic tilted tracking shot following the speeding demonic chariot with intense screen shake.',
      styleLock: 'Action manhwa / Shonen climax style with thick ink strokes and speed lines.',
      characterLock: 'Ravana: 10 heads, 20 arms; Sita: crimson sari, defiant grief.'
    }
  },
  {
    id: 5,
    slug: 'the-search-and-alliance',
    title: 'The Search and Alliance',
    hindiTitle: 'किष्किन्धा मिलन: अमर मित्रता',
    sanskritTitle: 'किष्किन्धा सन्धिः',
    chapterNumber: 5,
    startTime: 57,
    endTime: 68,
    subtitle: 'In the crags of Kishkindha, brotherhood is forged.',
    hindiSubtitle: 'किष्किन्धा के शिखरों पर अग्नि साक्षी बनी, और मित्रता इतिहास।',
    sanskritSubtitle: 'सुग्रीवराघवयोः सख्यमभवत्।',
    narration: 'Through weeping valleys, Rama searched with a broken heart. In the crags of Kishkindha, he met Hanuman and the Vanaras. In shared grief, an unbreakable alliance was born!',
    hindiNarration: 'शोक में डूबे श्री राम ने वन-वन जानकी को पुकारा। किष्किन्धा के विशाल पर्वतों पर उनकी भेंट हुई वीर हनुमान और सुग्रीव से। अग्नि को साक्षी मानकर एक अमर मैत्री की नींव रखी गई!',
    sanskritShloka: 'ततोऽभवत्सख्यमरिन्दमानां सुग्रीवराघवयोः समीपे। पवनसुतो वायुसमानवेगः प्रणम्य रामं शरणं जगाम॥',
    sanskritMeaning: 'Then occurred the sacred friendship between Rama and Sugriva, as Hanuman, swift as the wind, bowed before Rama in supreme surrender.',
    narrationCues: [
      { text: 'Through weeping valleys, Rama searched with a broken heart.', start: 0.6, duration: 3.5 },
      { text: 'In the crags of Kishkindha, he met Hanuman and the Vanaras.', start: 4.4, duration: 3.5 },
      { text: 'In shared grief, an unbreakable alliance was born!', start: 8.0, duration: 3.0 }
    ],
    directorNotes: {
      cameraMove: 'Low angle heroic pedestal shot rising up to Rama’s towering stance as Hanuman kneels with folded hands, bathed in burning sunset backlight.',
      palette: 'Molten bronze, volcanic orange rocks, radiant purple sunset clouds.',
      atmosphere: 'Heroic resurrection of hope, sacred vow of brotherhood.',
      lighting: 'Fierce golden hour rim light sculpting Hanuman’s muscular golden fur and Rama’s cyan silhouette.',
      focalPoint: 'Hanuman looking into Rama’s eyes with absolute surrender.',
      actionImpact: 'medium'
    },
    audioCue: {
      theme: 'alliance',
      sfx: ['pakhawaj_beat', 'mountain_wind', 'conch_call', 'heroic_swell'],
      tempo: 'serene'
    },
    videoGenerationPrompt: {
      veo3Prompt: 'Heroic manhwa anime keyframe of Lord Rama meeting Hanuman on the massive orange cliffs of Kishkindha during sunset. Hanuman kneels with folded hands in deep devotion before Rama. Sunburst flare between them, blowing mountain winds, rich anime linework.',
      cameraMotion: 'Low angle pedestal shot rising to heroic two-shot.',
      styleLock: 'Manhwa keyframe art with golden rim lighting and epic anatomy.',
      characterLock: 'Rama: blue skin with Kodanda bow; Hanuman: golden vanara warrior kneeling.'
    }
  },
  {
    id: 6,
    slug: 'hanumans-leap',
    title: "Hanuman's Impossible Leap",
    hindiTitle: 'महाछलांग: असीम भक्ति का वेग',
    sanskritTitle: 'समुद्र लङ्घनम्',
    chapterNumber: 6,
    startTime: 68,
    endTime: 80,
    subtitle: 'Boundless devotion makes the infinite ocean a puddle.',
    hindiSubtitle: 'भक्ति ने दिया ऐसा वेग, कि अनंत सागर भी एक पग बन गया।',
    sanskritSubtitle: 'मनोजवं मारुततुल्यवेगं श्रीरामदूतं शरणं प्रपद्ये।',
    narration: 'Remembering his boundless power, Hanuman swelled into the sky! With a thunderous cry of devotion, he leaped across the churning ocean, defying the impossible!',
    hindiNarration: 'जब जाम्बवंत ने जगाई उनकी सुप्त शक्ति, तो महाबली हनुमान का स्वरूप गगनचुम्बी हो उठा! "जय श्री राम" के भीषण घोष के साथ, वे गरजते हुए समुद्र को चीरकर लंका की ओर उड़ चले!',
    sanskritShloka: 'मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम्। वातात्मजं वानरयूथमुख्यं श्रीरामदूतं शरणं प्रपद्ये॥',
    sanskritMeaning: 'I take refuge in Sri Rama’s messenger, who is as swift as the mind, as fast as the wind, master of senses, foremost among the wise.',
    narrationCues: [
      { text: 'Remembering his boundless power, Hanuman swelled into the sky!', start: 0.6, duration: 3.8 },
      { text: 'With a thunderous cry of devotion, he leaped across the churning ocean...', start: 4.6, duration: 3.8 },
      { text: '...defying the impossible!', start: 8.6, duration: 2.6 }
    ],
    directorNotes: {
      cameraMove: 'MAXIMUM PUNCH. Explosive shockwave takeoff with supersonic cloud rings; horizontal high-speed action tracking shot flying alongside Hanuman with ocean spray lines.',
      palette: 'Cobalt sapphire ocean, blinding white wave crests, incandescent golden fur, crimson flying sash.',
      atmosphere: 'Exhilarating kinetic triumph, superhuman majesty.',
      lighting: 'Blinding sun reflecting off rushing waves; golden aura surrounding Hanuman’s body.',
      focalPoint: 'Hanuman in mid-air holding his golden Gada, gaze locked forward.',
      actionImpact: 'colossal'
    },
    audioCue: {
      theme: 'ocean_leap',
      sfx: ['sonic_boom', 'ocean_crash', 'war_cry', 'thunderous_brass'],
      tempo: 'frenetic'
    },
    videoGenerationPrompt: {
      veo3Prompt: 'Full throttle manhwa action animation of Lord Hanuman in colossal size leaping across the roaring sapphire ocean. Supersonic shockwave clouds cone behind him, giant ocean waves crash with white foam, golden mace in hand, flying red scarf. Extreme dynamic perspective, manga speed lines, god-tier animation.',
      cameraMotion: 'High-speed tracking shot right next to Hanuman as ocean roars below.',
      styleLock: 'Studio Mir / Ufotable level action anime aesthetic with blazing kinetic effects.',
      characterLock: 'Hanuman: golden vanara, flying red sash, golden mace, determined eyes.'
    }
  },
  {
    id: 7,
    slug: 'the-discovery-in-lanka',
    title: 'The Discovery in Lanka',
    hindiTitle: 'मुद्रिका दर्शन: आशा की ज्वाला',
    sanskritTitle: 'अशोकवनिकायां सीता',
    chapterNumber: 7,
    startTime: 80,
    endTime: 91,
    subtitle: 'In the shadow of despair, the token of remembrance shines.',
    hindiSubtitle: 'अशोक वाटिका में जब चमकी राम की मुद्रिका, तो बुझती आशा प्रज्वलित हो उठी।',
    sanskritSubtitle: 'मुद्रिकां रामचन्द्रस्य समर्पयति वानरः।',
    narration: 'In the moonlit groves of Ashoka Vatika, he found her—unyielding in her sorrow. Kneeling, Hanuman offered Rama’s signet ring. Hope, long dormant, blazed anew!',
    hindiNarration: 'अशोक वाटिका के एकांत में, राक्षसों के पहरे के बीच, उन्होंने माता सीता को पाया। नतमस्तक होकर हनुमान ने श्री राम की स्वर्णिम मुद्रिका भेंट की। जानकी के नयनों में आशा की ज्योति पुनः जल उठी!',
    sanskritShloka: 'ददर्श कपिशार्दूलो जानकीं शोककर्शिताम्। मुद्रिकां रामचन्द्रस्य समर्पयति वानरः॥',
    sanskritMeaning: 'The foremost of monkeys beheld Janaki emaciated by grief, and reverently offered her Sri Ramachandra’s signet ring.',
    narrationCues: [
      { text: 'In the moonlit groves of Ashoka Vatika, he found her—unyielding in her sorrow.', start: 0.6, duration: 4.4 },
      { text: 'Kneeling, Hanuman offered Rama’s signet ring. Hope, long dormant, blazed anew!', start: 5.2, duration: 4.8 }
    ],
    directorNotes: {
      cameraMove: 'Smooth intimate dolly in between carved stone pillars; sharp focus shift onto Rama’s glowing golden signet ring resting between their hands.',
      palette: 'Silvery moonlight, dark sapphire night, blooming scarlet ashoka blossoms, pure 24k golden ring glow.',
      atmosphere: 'Sacred emotional release, solemn fortitude, divine relief.',
      lighting: 'Chiaroscuro moonlight with intense warm golden bounce light from the signet ring.',
      focalPoint: 'The golden ring inscribed with "राम" radiating soft divine rays.',
      actionImpact: 'light'
    },
    audioCue: {
      theme: 'lanka',
      sfx: ['night_crickets', 'gentle_chime', 'sitar_tears', 'deep_reverence'],
      tempo: 'slow'
    },
    videoGenerationPrompt: {
      veo3Prompt: 'Emotional manhwa anime scene in the moonlit Ashoka Vatika of Lanka. Queen Sita sitting with dignified sorrow under blooming red ashoka trees. Hanuman kneeling with utmost reverence presenting Lord Rama’s glowing golden signet ring. Moonbeams, glowing petals, tender spiritual lighting, high-detail anime painting.',
      cameraMotion: 'Intimate slow push-in to the glowing ring reflecting in Sita’s tearful eyes.',
      styleLock: 'Emotional manhwa drama style with rich cinematic lighting.',
      characterLock: 'Sita: dignified queen in red; Hanuman: kneeling humble devotee.'
    }
  },
  {
    id: 8,
    slug: 'the-gathering-storm',
    title: 'The Gathering Storm & Bridge of Hope',
    hindiTitle: 'सेतुबंध: पत्थरों पर राम नाम',
    sanskritTitle: 'सेतुबन्ध निर्माणम्',
    chapterNumber: 8,
    startTime: 91,
    endTime: 103,
    subtitle: 'Stones inscribed with the sacred name float upon the deep.',
    hindiSubtitle: 'शिलाओं पर लिखा गया प्रभु का नाम, और अगाध सागर पर तैर उठी आस्था।',
    sanskritSubtitle: 'बबन्धुः सागरं घोरं रामनामप्रभाविताः।',
    narration: 'The army assembled at the edge of the world! Upon each stone, the holy name was carved—and by faith, the stones floated! Ram Setu arose, bridge between destiny and war!',
    hindiNarration: 'संसार के अंतिम छोर पर वानर सेना का महाकुंभ उमड़ पड़ा! प्रत्येक शिला पर "राम" नाम उत्कीर्ण किया गया, और चमत्कार हुआ—पत्थर तैरने लगे! राम सेतु निर्मित हुआ, अधर्म के विनाश का मार्ग!',
    sanskritShloka: 'नलस्य वचनात्सर्वे वानराः शैलसंनिभाः। बबन्धुः सागरं घोरं रामनामप्रभाविताः॥',
    sanskritMeaning: 'By the architectural genius of Nala and empowered by Rama’s name, the mountain-like Vanaras built a bridge across the raging sea.',
    narrationCues: [
      { text: 'The army assembled at the edge of the world!', start: 0.6, duration: 3.0 },
      { text: 'Upon each stone, the holy name was carved—and by faith, the stones floated!', start: 3.8, duration: 4.4 },
      { text: 'Ram Setu arose, bridge between destiny and war!', start: 8.4, duration: 3.2 }
    ],
    directorNotes: {
      cameraMove: 'Boom up from the crashing ocean waves to an immense wide shot showing millions of vanaras dropping glowing carved boulders, creating a highway of light directly toward fortress Lanka.',
      palette: 'Dark stormy cyan, ocean teal, glowing golden Devanagari runes, distant fortress gold.',
      atmosphere: 'Colossal collective will, unstoppable divine momentum.',
      lighting: 'Glowing Devanagari script "राम" pulsing with golden light on every floating stone.',
      focalPoint: 'The glowing bridge slicing through the dark ocean toward Lanka.',
      actionImpact: 'heavy'
    },
    audioCue: {
      theme: 'gathering',
      sfx: ['roaring_tide', 'clattering_stones', 'war_horns', 'rhythmic_marching'],
      tempo: 'solemn'
    },
    videoGenerationPrompt: {
      veo3Prompt: 'Epic wide panorama manhwa anime of Ram Setu construction. Millions of Vanara warriors carrying massive carved boulders with glowing golden Devanagari letters "राम" into the churning ocean. The floating stone bridge stretches to the horizon toward the fortified golden island of Lanka. Imposing anime scale.',
      cameraMotion: 'Grand camera pullback revealing the colossal floating causeway across the ocean.',
      styleLock: 'Historical epic manhwa with glowing rune effects and vast architectural perspective.',
      characterLock: 'Rama on cliffs; countless vanara warriors; glowing inscribed stones.'
    }
  },
  {
    id: 9,
    slug: 'the-great-battle',
    title: 'The Great Battle & The Final Arrow',
    hindiTitle: 'महायुद्ध: ब्रह्मास्त्र का संहार',
    sanskritTitle: 'महायुद्धम् एवं रावणवधः',
    chapterNumber: 9,
    startTime: 103,
    endTime: 115,
    subtitle: 'When adharma crowns itself, righteousness answers with the sun.',
    hindiSubtitle: 'जब अधर्म ने अहंकार का मुकुट पहना, तो धर्म ने सूर्य के तेज से उत्तर दिया।',
    sanskritSubtitle: 'दशग्रीवं समासाद्य पातयामास भूतले।',
    narration: 'Lanka burned in the clash of gods and titans! Ten heads roared defiance—until Rama drew the Kodanda bow! Releasing the Brahmastra, darkness fell, and truth was redeemed!',
    hindiNarration: 'लंका के समरांगण में प्रलयंकारी युद्ध छिड़ गया! दशानन अपने बीस हाथों में दिव्यास्त्र लिए दहाड़ा—तभी श्री राम ने कोदंड की प्रत्यंचा खींची! ब्रह्मास्त्र के छूटते ही अंधकार भस्म हो गया, और सत्य की विजय हुई!',
    sanskritShloka: 'ससर्ज रामो बाणौघान् महाविद्युत्समप्रभान्। दशग्रीवं समासाद्य पातयामास भूतले॥',
    sanskritMeaning: 'Rama released a storm of arrows radiating like great lightning; striking the ten-necked Ravana, he felled him to the earth.',
    narrationCues: [
      { text: 'Lanka burned in the clash of gods and titans!', start: 0.6, duration: 3.2 },
      { text: 'Ten heads roared defiance—until Rama drew the Kodanda bow!', start: 4.0, duration: 3.8 },
      { text: 'Releasing the Brahmastra, darkness fell, and truth was redeemed!', start: 8.0, duration: 3.8 }
    ],
    directorNotes: {
      cameraMove: 'MAXIMUM CINEMATIC IMPACT. Extreme snap zoom into Rama’s focused azure eyes -> snap back to full bow draw -> SCREEN FLASH -> shockwave following the blazing Brahmastra arrow piercing the screen -> Ravana’s crowns shattering in gold dust.',
      palette: 'Molten sun gold, explosive volcanic crimson, blinding pure diamond white arrow flare.',
      atmosphere: 'Cosmic apocalyptic showdown; the ultimate clash of dharma and adharma.',
      lighting: 'The Brahmastra burns like a thousand suns, wiping out all shadows.',
      focalPoint: 'The tip of the Brahmastra arrow releasing a blinding solar shockwave.',
      actionImpact: 'colossal'
    },
    audioCue: {
      theme: 'battle',
      sfx: ['battle_drums', 'bow_snap', 'solar_blast', 'screen_shake', 'reverberating_silence'],
      tempo: 'frenetic'
    },
    videoGenerationPrompt: {
      veo3Prompt: 'Ultimate climax battle manhwa illustration. Lord Rama with glowing cyan skin at full draw of the golden Kodanda bow, releasing the blinding golden Brahmastra arrow of solar light. Facing him is colossal ten-headed Ravana with twenty arms holding blazing weapons against burning chariots. Impact frames, manga speed lines, god-tier anime fight climax.',
      cameraMotion: 'Extreme rapid zoom into Rama’s eyes followed by high-speed bullet-time tracking shot of the arrow.',
      styleLock: 'Peak Shonen / Solo Leveling manhwa action art with blinding particle auras.',
      characterLock: 'Rama drawing Kodanda bow; Ravana with 10 crowned heads and 20 weapons.'
    }
  },
  {
    id: 10,
    slug: 'the-return-and-coronation',
    title: 'The Return & Coronation',
    hindiTitle: 'राज्याभिषेक: प्रकाश का पुनरागमन',
    sanskritTitle: 'श्री राम पट्टाभिषेकम्',
    chapterNumber: 10,
    startTime: 115,
    endTime: 128,
    subtitle: 'Ayodhya bathed in the light of ten thousand diyas.',
    hindiSubtitle: 'दीपोत्सव की जगमगाहट में अयोध्या ने अपने प्रभु का स्वागत किया।',
    sanskritSubtitle: 'रामे राज्यं प्रशासति।',
    narration: 'From darkness, light returned! Across Ayodhya, ten thousand diyas flickered in welcome. Rama and Sita ascended the golden throne, restoring Dharma to the cosmos!',
    hindiNarration: 'अंधकार परास्त हुआ, प्रकाश लौट आया! दीपों की जगमगाहट से अयोध्या दीपोत्सव बन गई। श्री राम और माता जानकी स्वर्ण सिंहासन पर आसीन हुए, और तीनों लोकों में रामराज्य का शंखनाद हुआ!',
    sanskritShloka: 'रामो रामो राम इति प्रजानामभवन् कथाः। रामभूतं जगदभूद् रामे राज्यं प्रशासति॥',
    sanskritMeaning: 'The people spoke only of Rama, Rama, Rama. The whole world became imbued with Rama as he ruled the kingdom.',
    narrationCues: [
      { text: 'From darkness, light returned!', start: 0.6, duration: 2.5 },
      { text: 'Across Ayodhya, ten thousand diyas flickered in welcome.', start: 3.4, duration: 4.2 },
      { text: 'Rama and Sita ascended the golden throne, restoring Dharma to the cosmos!', start: 7.8, duration: 4.8 }
    ],
    directorNotes: {
      cameraMove: 'Grand majestic crane pull-back inside the illuminated palace sanctum, revealing rows of thousands of glowing diyas, rain of red and gold lotus petals, and the crowned sovereigns.',
      palette: 'Divine royal 24k gold, ivory silk, warm amber diya flames, emerald garlands.',
      atmosphere: 'Transcendental peace, divine triumph, eternal cosmic warmth.',
      lighting: 'Warm golden ambient radiance from thousands of flickering diyas, celestial light pouring from palace dome.',
      focalPoint: 'Lord Rama and Queen Sita crowned on the golden Simhasana throne.',
      actionImpact: 'none'
    },
    audioCue: {
      theme: 'coronation',
      sfx: ['temple_bells', 'shower_of_petals', 'sacred_vedic_chant', 'triumphant_sitar'],
      tempo: 'triumphant'
    },
    videoGenerationPrompt: {
      veo3Prompt: 'Glorious coronation scene (Pattabhishekam) in manhwa anime style. Lord Rama and Queen Sita seated crowned on an ornate golden Simhasana throne inside a grand marble palace hall. Thousands of brass and clay oil lamps (diyas) illuminate the sanctum. Hanuman sits in devotion at their feet. Golden flower petals rain down from celestial sunbeams. Masterpiece royal anime court art.',
      cameraMotion: 'Majestic slow dolly-out revealing the full splendor of the royal coronation.',
      styleLock: 'Regal manhwa illustration with golden filigree and warm lighting.',
      characterLock: 'Rama and Sita crowned sovereigns; Hanuman at lotus feet; brothers in attendance.'
    }
  },
  {
    id: 11,
    slug: 'the-epilogue',
    title: 'Epilogue: When Darkness Fell',
    hindiTitle: 'उपसंहार: सत्यमेव जयते',
    sanskritTitle: 'धर्मो रक्षति रक्षितः',
    chapterNumber: 11,
    startTime: 128,
    endTime: 136,
    subtitle: 'When darkness fell, Dharma remained.',
    hindiSubtitle: 'जब अंधकार छाया, धर्म अडिग रहा।',
    sanskritSubtitle: 'धर्मो रक्षति रक्षितः। यतो धर्मस्ततो जयः॥',
    narration: 'The pages may close, but the fire never fades. For whenever darkness threatens to conquer... the story awakens again.',
    hindiNarration: 'ग्रंथ के पृष्ठ भले ही मुड़ जाएं, किंतु यह अग्नि कभी मंद नहीं पड़ती। जब-जब अधर्म सिर उठाएगा... यह गाथा पुनः जाग्रत होगी!',
    sanskritShloka: 'धर्मो रक्षति रक्षितः। यतो धर्मस्ततो जयः॥ शुभं भवतु कल्याणम्॥',
    sanskritMeaning: 'Dharma protects those who protect it. Where there is righteousness, there is victory.',
    narrationCues: [
      { text: 'The pages may close, but the fire never fades.', start: 0.6, duration: 3.5 },
      { text: 'For whenever darkness threatens to conquer... the story awakens again.', start: 4.2, duration: 3.6 }
    ],
    directorNotes: {
      cameraMove: 'Smooth pull-back as the ancient manuscript book gently seals with a golden Kodanda bow emblem; single diya flame burns in the darkness.',
      palette: 'Deep sacred charcoal obsidian, embossed 24k gold, single eternal diya flame.',
      atmosphere: 'Timeless spiritual resonance, eternal truth.',
      lighting: 'Single focused warm diya light illuminating the golden emblem.',
      focalPoint: 'The golden title emblem: "WHEN DARKNESS FELL, DHARMA REMAINED."',
      actionImpact: 'light'
    },
    audioCue: {
      theme: 'epilogue',
      sfx: ['final_bell_chime', 'page_close', 'gentle_flute_fade', 'sacred_om_resonance'],
      tempo: 'solemn'
    },
    videoGenerationPrompt: {
      veo3Prompt: 'The ancient illuminated manuscript of the Ramayana gently closes upon the sandalwood altar. Golden Kodanda bow emblem glows on the cover. A single diya flame burns in the temple darkness. Final text appears in glowing gold leaf: "WHEN DARKNESS FELL, DHARMA REMAINED". Slow fade to black.',
      cameraMotion: 'Very slow pull-back to centered sacred emblem, gentle lingering fade.',
      styleLock: 'Sacred Indian manuscript art, warm golden embers, solemn finale.',
      characterLock: 'Golden manuscript book and emblem.'
    }
  }
];
