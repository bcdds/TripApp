export type RatesRow = {
  Pair: string
  Rate: string | number
}

export type ItineraryRow = {
  Date: string
  'Start Time': string
  'End Time': string
  'Leg Type': string
  From?: string
  To?: string
  City?: string
  State?: string
  Country?: string
  'Location/Place'?: string
  Notes?: string
}

export type LodgingRow = {
  'Property Name': string
  City?: string
  'Check-in': string
  'Check-out': string
  Nights?: string | number
  'Platform (Booking/Airbnb/etc.)'?: string
  'Confirmation Code/URL'?: string
  Amount: string | number
  'Currency (SEK/BRL)': 'SEK' | 'BRL' | string
  'Paid By (Bruno/Sebastian)': 'Bruno' | 'Sebastian' | string
  'Split With (Both/Bruno/Sebastian/None)'?: string
  Notes?: string
}

export type ExpenseRow = {
  Date: string
  'Category (Restaurant/Transport/Flight/Activity/Other)': string
  Description?: string
  City?: string
  Amount: string | number
  'Currency (SEK/BRL)': 'SEK' | 'BRL' | string
  'Paid By (Bruno/Sebastian)': 'Bruno' | 'Sebastian' | string
  'Split Type (Split/Personal)': 'Split' | 'Personal' | string
  'Split % Bruno'?: string | number
  'Split % Sebastian'?: string | number
  Notes?: string
}
