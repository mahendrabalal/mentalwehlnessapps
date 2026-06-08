// International Crisis Support Resources
// Comprehensive database of crisis hotlines and emergency services worldwide
// Last updated: 2025
// Sources: IASP, Befrienders Worldwide, Find a Helpline, Wikipedia

export interface CrisisHotline {
  name: string
  phone?: string
  text?: string
  url?: string
  available: string
  languages?: string[]
  free: boolean
  description: string
}

export interface CountryCrisisResources {
  countryCode: string
  countryName: string
  emergencyNumber: string
  crisisLines: CrisisHotline[]
  onlineResources: {
    name: string
    url: string
    description: string
  }[]
  languages: string[]
}

export const INTERNATIONAL_CRISIS_RESOURCES: Record<string, CountryCrisisResources> = {
  // North America
  US: {
    countryCode: 'US',
    countryName: 'United States',
    emergencyNumber: '911',
    crisisLines: [
      {
        name: '988 Suicide & Crisis Lifeline',
        phone: '988',
        text: '988',
        available: '24/7',
        languages: ['en', 'es'],
        free: true,
        description: 'Free and confidential emotional support'
      },
      {
        name: 'Crisis Text Line',
        text: '741741',
        available: '24/7',
        languages: ['en'],
        free: true,
        description: 'Text HOME to 741741 for crisis support'
      },
      {
        name: 'Veterans Crisis Line',
        phone: '988 (press 1)',
        text: '838255',
        available: '24/7',
        languages: ['en'],
        free: true,
        description: 'Support for veterans and their families'
      },
      {
        name: 'Trans Lifeline',
        phone: '877-565-8860',
        available: '24/7',
        languages: ['en'],
        free: true,
        description: 'Peer support for transgender community'
      },
      {
        name: 'Trevor Project (LGBTQ Youth)',
        phone: '866-488-7386',
        text: 'START to 678678',
        available: '24/7',
        languages: ['en'],
        free: true,
        description: 'Crisis support for LGBTQ young people'
      }
    ],
    onlineResources: [
      {
        name: '988 Lifeline Chat',
        url: 'https://988lifeline.org/chat',
        description: 'Online chat with trained counselors'
      }
    ],
    languages: ['en', 'es']
  },

  CA: {
    countryCode: 'CA',
    countryName: 'Canada',
    emergencyNumber: '911',
    crisisLines: [
      {
        name: '988 Suicide Crisis Helpline',
        phone: '988',
        available: '24/7',
        languages: ['en', 'fr'],
        free: true,
        description: 'National suicide prevention and crisis support'
      },
      {
        name: 'Kids Help Phone',
        phone: '1-800-668-6868',
        text: '686868',
        available: '24/7',
        languages: ['en', 'fr'],
        free: true,
        description: 'Support for young people'
      },
      {
        name: 'Trans Lifeline Canada',
        phone: '1-877-330-6366',
        available: 'Limited',
        languages: ['en', 'fr'],
        free: true,
        description: 'Peer support for trans community'
      }
    ],
    onlineResources: [
      {
        name: 'Talk Suicide Canada',
        url: 'https://talksuicide.ca',
        description: 'Crisis chat and resources'
      }
    ],
    languages: ['en', 'fr']
  },

  MX: {
    countryCode: 'MX',
    countryName: 'Mexico',
    emergencyNumber: '911',
    crisisLines: [
      {
        name: 'Línea de la Vida',
        phone: '800-911-2000',
        available: '24/7',
        languages: ['es'],
        free: true,
        description: 'Prevención del suicidio'
      },
      {
        name: 'SAPTEL',
        phone: '55-5259-8121',
        available: '24/7',
        languages: ['es'],
        free: false,
        description: 'Sistema de Apoyo Psicológico'
      }
    ],
    onlineResources: [],
    languages: ['es']
  },

  // Europe
  GB: {
    countryCode: 'GB',
    countryName: 'United Kingdom',
    emergencyNumber: '999',
    crisisLines: [
      {
        name: 'Samaritans',
        phone: '116 123',
        available: '24/7',
        languages: ['en'],
        free: true,
        description: 'Free confidential emotional support'
      },
      {
        name: 'Crisis Text Line UK',
        text: 'SHOUT to 85258',
        available: '24/7',
        languages: ['en'],
        free: true,
        description: 'Free 24/7 text support service'
      },
      {
        name: 'CALM (Men)',
        phone: '0800 58 58 58',
        available: '5pm-midnight daily',
        languages: ['en'],
        free: true,
        description: 'Campaign Against Living Miserably'
      },
      {
        name: 'Papyrus (Under 35)',
        phone: '0800 068 4141',
        text: '07860 039967',
        available: 'Weekdays 9am-midnight',
        languages: ['en'],
        free: true,
        description: 'Support for young people'
      }
    ],
    onlineResources: [
      {
        name: 'Samaritans Online',
        url: 'https://www.samaritans.org/how-we-can-help/contact-samaritan',
        description: 'Email support and resources'
      }
    ],
    languages: ['en']
  },

  DE: {
    countryCode: 'DE',
    countryName: 'Germany',
    emergencyNumber: '112',
    crisisLines: [
      {
        name: 'Telefonseelsorge',
        phone: '0800 111 0 111',
        available: '24/7',
        languages: ['de'],
        free: true,
        description: 'Kostenlose Krisenberatung'
      },
      {
        name: 'Telefonseelsorge',
        phone: '0800 111 0 222',
        available: '24/7',
        languages: ['de'],
        free: true,
        description: 'Alternative Nummer'
      },
      {
        name: 'Nummer gegen Kummer (Kinder/Jugendliche)',
        phone: '116 111',
        available: 'Mon-Sat 2pm-8pm',
        languages: ['de'],
        free: true,
        description: 'Für Kinder und Jugendliche'
      }
    ],
    onlineResources: [
      {
        name: 'Telefonseelsorge Chat',
        url: 'https://online.telefonseelsorge.de',
        description: 'Online-Beratung'
      }
    ],
    languages: ['de']
  },

  FR: {
    countryCode: 'FR',
    countryName: 'France',
    emergencyNumber: '112',
    crisisLines: [
      {
        name: 'Numéro national de prévention du suicide',
        phone: '3114',
        available: '24/7',
        languages: ['fr'],
        free: true,
        description: 'Numéro national gratuit'
      },
      {
        name: 'SOS Amitié',
        phone: '09 72 39 40 50',
        available: '24/7',
        languages: ['fr'],
        free: false,
        description: 'Écoute et soutien'
      },
      {
        name: 'Fil Santé Jeunes',
        phone: '0800 235 236',
        available: '9am-11pm daily',
        languages: ['fr'],
        free: true,
        description: 'Pour les jeunes'
      }
    ],
    onlineResources: [
      {
        name: 'SOS Amitié Chat',
        url: 'https://www.sos-amitie.com',
        description: 'Tchat anonyme'
      }
    ],
    languages: ['fr']
  },

  ES: {
    countryCode: 'ES',
    countryName: 'Spain',
    emergencyNumber: '112',
    crisisLines: [
      {
        name: 'Teléfono de la Esperanza',
        phone: '717 003 717',
        available: '24/7',
        languages: ['es'],
        free: false,
        description: 'Atención 24 horas'
      },
      {
        name: 'Teléfono contra el Suicidio',
        phone: '911 385 385',
        available: '24/7',
        languages: ['es'],
        free: false,
        description: 'Prevención del suicidio'
      }
    ],
    onlineResources: [],
    languages: ['es']
  },

  PT: {
    countryCode: 'PT',
    countryName: 'Portugal',
    emergencyNumber: '112',
    crisisLines: [
      {
        name: 'Linha Nacional de Prevenção do Suicídio e Apoio Psicológico',
        phone: '1411',
        available: '24/7',
        languages: ['pt'],
        free: true,
        description: 'Apoio em situações de risco com psicólogos e enfermeiros especialistas em saúde mental'
      },
      {
        name: 'Linha Saúde 24',
        phone: '808 24 24 24',
        available: '24/7 for clinical support',
        languages: ['pt'],
        free: false,
        description: 'Triagem, aconselhamento e encaminhamento em situações de doença'
      },
      {
        name: 'SOS Voz Amiga',
        phone: '213 544 545',
        available: 'Daily 15:30-00:30',
        languages: ['pt'],
        free: false,
        description: 'Apoio emocional e prevenção do suicídio'
      }
    ],
    onlineResources: [
      {
        name: 'SOS Voz Amiga',
        url: 'https://www.sosvozamiga.org',
        description: 'Linhas de apoio emocional e prevenção ao suicídio'
      }
    ],
    languages: ['pt']
  },

  IT: {
    countryCode: 'IT',
    countryName: 'Italy',
    emergencyNumber: '112',
    crisisLines: [
      {
        name: 'Telefono Amico',
        phone: '02 2327 2327',
        available: '10am-midnight daily',
        languages: ['it'],
        free: false,
        description: 'Ascolto e supporto'
      },
      {
        name: 'Telefono Azzurro (bambini/adolescenti)',
        phone: '19696',
        available: '24/7',
        languages: ['it'],
        free: true,
        description: 'Per bambini e adolescenti'
      }
    ],
    onlineResources: [],
    languages: ['it']
  },

  // Asia-Pacific
  AU: {
    countryCode: 'AU',
    countryName: 'Australia',
    emergencyNumber: '000',
    crisisLines: [
      {
        name: 'Lifeline',
        phone: '13 11 14',
        text: '0477 13 11 14',
        available: '24/7',
        languages: ['en'],
        free: true,
        description: 'Crisis support and suicide prevention'
      },
      {
        name: 'Beyond Blue',
        phone: '1300 224 636',
        available: '24/7',
        languages: ['en'],
        free: true,
        description: 'Support for anxiety and depression'
      },
      {
        name: 'Kids Helpline',
        phone: '1800 551 800',
        available: '24/7',
        languages: ['en'],
        free: true,
        description: 'For young people aged 5-25'
      },
      {
        name: 'Suicide Call Back Service',
        phone: '1300 659 467',
        available: '24/7',
        languages: ['en'],
        free: true,
        description: 'Nationwide support service'
      }
    ],
    onlineResources: [
      {
        name: 'Lifeline Chat',
        url: 'https://www.lifeline.org.au/crisis-chat',
        description: 'Online crisis chat'
      }
    ],
    languages: ['en']
  },

  NZ: {
    countryCode: 'NZ',
    countryName: 'New Zealand',
    emergencyNumber: '111',
    crisisLines: [
      {
        name: '1737',
        phone: '1737',
        text: '1737',
        available: '24/7',
        languages: ['en'],
        free: true,
        description: 'Free call or text anytime'
      },
      {
        name: 'Lifeline',
        phone: '0800 543 354',
        available: '24/7',
        languages: ['en'],
        free: true,
        description: 'Crisis support'
      },
      {
        name: 'Youthline',
        phone: '0800 376 633',
        text: '234',
        available: '24/7',
        languages: ['en'],
        free: true,
        description: 'Support for young people'
      },
      {
        name: 'Suicide Crisis Helpline',
        phone: '0508 828 865',
        available: '24/7',
        languages: ['en'],
        free: true,
        description: '0508 TAUTOKO'
      }
    ],
    onlineResources: [],
    languages: ['en']
  },

  IN: {
    countryCode: 'IN',
    countryName: 'India',
    emergencyNumber: '112',
    crisisLines: [
      {
        name: 'KIRAN Mental Health Helpline',
        phone: '1800-599-0019',
        available: '24/7',
        languages: ['en', 'hi', 'multiple'],
        free: true,
        description: 'National helpline in 13 languages'
      },
      {
        name: 'iCall',
        phone: '9152987821',
        available: 'Mon-Sat 8am-10pm',
        languages: ['en', 'hi'],
        free: false,
        description: 'Psychosocial helpline'
      },
      {
        name: 'Vandrevala Foundation',
        phone: '1860-2662-345',
        available: '24/7',
        languages: ['en', 'hi'],
        free: true,
        description: 'Mental health support'
      },
      {
        name: 'AASRA',
        phone: '91-22-2754-6669',
        available: '24/7',
        languages: ['en', 'hi'],
        free: false,
        description: 'Suicide prevention'
      }
    ],
    onlineResources: [],
    languages: ['en', 'hi', 'multiple']
  },

  JP: {
    countryCode: 'JP',
    countryName: 'Japan',
    emergencyNumber: '110',
    crisisLines: [
      {
        name: 'よりそいホットライン (Yorisoi)',
        phone: '0120-279-338',
        available: '24/7',
        languages: ['ja'],
        free: true,
        description: '24時間無料電話相談'
      },
      {
        name: 'TELL Lifeline',
        phone: '03-5774-0992',
        available: '9am-11pm daily',
        languages: ['en'],
        free: false,
        description: 'English language support'
      },
      {
        name: 'いのちの電話 (Inochi no Denwa)',
        phone: '0570-783-556',
        available: '24/7',
        languages: ['ja'],
        free: false,
        description: '全国共通ダイヤル'
      }
    ],
    onlineResources: [],
    languages: ['ja', 'en']
  },

  SG: {
    countryCode: 'SG',
    countryName: 'Singapore',
    emergencyNumber: '999',
    crisisLines: [
      {
        name: 'Samaritans of Singapore (SOS)',
        phone: '1-767',
        available: '24/7',
        languages: ['en'],
        free: true,
        description: '24-hour hotline'
      },
      {
        name: 'Institute of Mental Health',
        phone: '6389-2222',
        available: '24/7',
        languages: ['en'],
        free: false,
        description: 'Mental health crisis helpline'
      },
      {
        name: 'Silver Ribbon',
        phone: '6385-3714',
        available: 'Mon-Fri 9am-6pm',
        languages: ['en'],
        free: false,
        description: 'Mental health support'
      }
    ],
    onlineResources: [],
    languages: ['en']
  },

  PH: {
    countryCode: 'PH',
    countryName: 'Philippines',
    emergencyNumber: '911',
    crisisLines: [
      {
        name: 'National Center for Mental Health Crisis Hotline',
        phone: '1553',
        available: '24/7',
        languages: ['en', 'tl'],
        free: true,
        description: 'NCMH Helpline'
      },
      {
        name: 'In Touch Crisis Line',
        phone: '(02) 8893-7603',
        available: '24/7',
        languages: ['en'],
        free: false,
        description: 'Community crisis support'
      },
      {
        name: 'Natasha Goulbourn Foundation',
        phone: '(02) 8804-4673',
        available: 'Limited',
        languages: ['en'],
        free: false,
        description: 'Hopeline'
      }
    ],
    onlineResources: [],
    languages: ['en', 'tl']
  },

  // South America
  BR: {
    countryCode: 'BR',
    countryName: 'Brazil',
    emergencyNumber: '190',
    crisisLines: [
      {
        name: 'CVV - Centro de Valorização da Vida',
        phone: '188',
        available: '24/7',
        languages: ['pt'],
        free: true,
        description: 'Apoio emocional e prevenção do suicídio'
      },
      {
        name: 'CAPS',
        phone: '0800-273-8255',
        available: 'Business hours',
        languages: ['pt'],
        free: true,
        description: 'Centros de Atenção Psicossocial'
      }
    ],
    onlineResources: [
      {
        name: 'CVV Chat',
        url: 'https://www.cvv.org.br',
        description: 'Chat online'
      }
    ],
    languages: ['pt']
  },

  AR: {
    countryCode: 'AR',
    countryName: 'Argentina',
    emergencyNumber: '911',
    crisisLines: [
      {
        name: 'Centro de Asistencia al Suicida',
        phone: '(011) 5275-1135',
        available: '24/7',
        languages: ['es'],
        free: false,
        description: 'Buenos Aires'
      },
      {
        name: 'Teléfono de la Esperanza',
        phone: '(011) 4785-8852',
        available: 'Limited',
        languages: ['es'],
        free: false,
        description: 'Apoyo emocional'
      }
    ],
    onlineResources: [],
    languages: ['es']
  },

  // Africa
  ZA: {
    countryCode: 'ZA',
    countryName: 'South Africa',
    emergencyNumber: '10111',
    crisisLines: [
      {
        name: 'South African Depression and Anxiety Group (SADAG)',
        phone: '0800 567 567',
        available: '8am-8pm daily',
        languages: ['en'],
        free: true,
        description: 'Mental health support'
      },
      {
        name: 'LifeLine',
        phone: '0861 322 322',
        available: '24/7',
        languages: ['en'],
        free: false,
        description: 'Crisis counselling'
      },
      {
        name: 'Suicide Crisis Line',
        phone: '0800 567 567',
        available: '24/7',
        languages: ['en'],
        free: true,
        description: 'SADAG suicide crisis line'
      }
    ],
    onlineResources: [],
    languages: ['en']
  },

  // Middle East
  IL: {
    countryCode: 'IL',
    countryName: 'Israel',
    emergencyNumber: '100',
    crisisLines: [
      {
        name: 'ERAN - Emotional First Aid',
        phone: '1201',
        available: '24/7',
        languages: ['he', 'ar', 'ru'],
        free: true,
        description: 'Mental health support'
      },
      {
        name: 'Sahar - Emotional Support Chat',
        phone: '*6555',
        available: 'Sun-Thu 5pm-8pm',
        languages: ['he'],
        free: true,
        description: 'For teens and young adults'
      }
    ],
    onlineResources: [],
    languages: ['he', 'ar', 'ru', 'en']
  }
}

// Universal fallback resources when country is unknown or not in database
export const UNIVERSAL_CRISIS_RESOURCES = {
  emergency112: {
    name: '112 - European Emergency Number',
    description: 'Works in 80+ countries worldwide (EU, Middle East, parts of Asia)',
    number: '112'
  },
  befrienders: {
    name: 'Befrienders Worldwide',
    url: 'https://www.befrienders.org',
    description: 'Find crisis centers in 30+ countries'
  },
  iasp: {
    name: 'International Association for Suicide Prevention',
    url: 'https://www.iasp.info/crisis-centres-helplines/',
    description: 'Global directory of crisis helplines'
  },
  findAHelpline: {
    name: 'Find a Helpline',
    url: 'https://findahelpline.com',
    description: 'Searchable directory for 130+ countries'
  }
}

// Get crisis resources for a specific country
export function getCrisisResources(countryCode: string): CountryCrisisResources | null {
  return INTERNATIONAL_CRISIS_RESOURCES[countryCode.toUpperCase()] || null
}

// Get all supported country codes
export function getSupportedCountries(): string[] {
  return Object.keys(INTERNATIONAL_CRISIS_RESOURCES)
}

// Check if a country is supported
export function isCountrySupported(countryCode: string): boolean {
  return countryCode.toUpperCase() in INTERNATIONAL_CRISIS_RESOURCES
}
