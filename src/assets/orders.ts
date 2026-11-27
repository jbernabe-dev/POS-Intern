export type OrderStatus = 'Paid' | 'Held' | 'Refunded'

export type PaymentType = 'card' | 'cash' | 'tab' | 'refund' | 'contactless'

export type OrderLine = {
  quantity: number
  name: string
  /** Line total (quantity × unit price, including any modifiers). */
  amount: number
  note?: string
}

export type Order = {
  id: number
  time: string
  date: string
  cashier: string
  customer: string
  /** Second line under the items summary, e.g. "3 items • Dine-in". */
  detail: string
  lines: OrderLine[]
  payment: {
    type: PaymentType
    label: string
    detail: string
    receiptLabel: string
    authCode?: string
  }
  total: number
  status: OrderStatus
}

export const ORDERS: Order[] = [
  {
    id: 1042,
    time: '11:42 AM',
    date: 'Oct 24, 2024',
    cashier: 'Alex M.',
    customer: 'Walk-in (Loyalty #882)',
    detail: '3 items • Dine-in',
    lines: [
      {
        quantity: 2,
        name: 'Single Origin Flat White',
        amount: 13.5,
        note: '+ Oat Milk, Extra Shot',
      },
      { quantity: 1, name: 'Almond Croissant', amount: 5, note: 'Warmed' },
    ],
    payment: {
      type: 'card',
      label: 'Visa',
      detail: '···· 4821',
      receiptLabel: 'Credit Card (Visa ···· 4821)',
      authCode: '893122',
    },
    total: 19.98,
    status: 'Paid',
  },
  {
    id: 1041,
    time: '11:36 AM',
    date: 'Oct 24, 2024',
    cashier: 'Alex M.',
    customer: 'Walk-in',
    detail: '2 items • Takeout',
    lines: [
      { quantity: 1, name: 'Cold Brew Nitro (L)', amount: 5.57 },
      { quantity: 1, name: 'Avocado Toast', amount: 8.5 },
    ],
    payment: {
      type: 'cash',
      label: 'Cash',
      detail: '($20.00)',
      receiptLabel: 'Cash (Tendered $20.00, Change $4.80)',
    },
    total: 15.2,
    status: 'Paid',
  },
  {
    id: 1040,
    time: '11:28 AM',
    date: 'Oct 24, 2024',
    cashier: 'Marcus T.',
    customer: 'Table 04',
    detail: '8 items • Table 04',
    lines: [
      { quantity: 4, name: 'Americano', amount: 13 },
      { quantity: 2, name: 'Cinnamon Swirl', amount: 8.5 },
      { quantity: 2, name: 'Panini', amount: 17.85 },
    ],
    payment: {
      type: 'tab',
      label: 'Unpaid /',
      detail: 'Tab',
      receiptLabel: 'Open Tab (Unpaid)',
    },
    total: 42.5,
    status: 'Held',
  },
  {
    id: 1039,
    time: '11:15 AM',
    date: 'Oct 24, 2024',
    cashier: 'Alex M.',
    customer: 'Walk-in',
    detail: 'Wrong grind size returned',
    lines: [
      { quantity: 1, name: 'Whole Bean Roasters Blend (250g)', amount: 20.37 },
    ],
    payment: {
      type: 'refund',
      label: 'Mastercard',
      detail: '···· 1190',
      receiptLabel: 'Refund to Mastercard ···· 1190',
      authCode: '771045',
    },
    total: -22,
    status: 'Refunded',
  },
  {
    id: 1038,
    time: '10:55 AM',
    date: 'Oct 24, 2024',
    cashier: 'Marcus T.',
    customer: 'Walk-in',
    detail: '3 items • Takeout',
    lines: [
      { quantity: 2, name: 'Iced Matcha Latte (Oat)', amount: 11.5 },
      { quantity: 1, name: 'Banana Walnut Bread', amount: 4.94 },
    ],
    payment: {
      type: 'contactless',
      label: 'Apple Pay',
      detail: '(Amex)',
      receiptLabel: 'Apple Pay (Amex ···· 3007)',
      authCode: '402918',
    },
    total: 17.75,
    status: 'Paid',
  },
]
