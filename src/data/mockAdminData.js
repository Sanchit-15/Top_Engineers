/**
 * Top Engineers - Demonstration Admin Data
 * Stored with LocalStorage synchronization for an interactive demonstration experience.
 */

const STORAGE_KEYS = {
  PRODUCTS: 'te_admin_products',
  CATEGORIES: 'te_admin_categories',
  ENQUIRIES: 'te_admin_enquiries',
  ORDERS: 'te_admin_orders',
  CUSTOM_REQUESTS: 'te_admin_custom_requests',
  CONTENT: 'te_admin_site_content',
};

// Initial demonstration enquiries
export const INITIAL_ENQUIRIES = [
  {
    id: 'enq-101',
    customer_name: 'Rajinder Kumar',
    phone: '+91 98721 34567',
    email: 'rajinder@punjabauto.com',
    subject: 'Quotation for 10ft Lathe Machine for Mandi Gobindgarh workshop',
    message: 'We operate an automotive component turning shop and require a 10ft heavy duty lathe with 14 inch center height and flame hardened bedways. Please provide delivery timelines to Mandi Gobindgarh.',
    status: 'New',
    internal_notes: 'Spoke briefly; customer requested quotation with 7.5 HP motor option.',
    created_at: '2026-11-14T10:30:00Z',
  },
  {
    id: 'enq-102',
    customer_name: 'Satnam Singh',
    phone: '+91 94172 88990',
    email: 'satnam.machining@gmail.com',
    subject: 'Radial Drilling Machine 50mm capacity specifications',
    message: 'Need technical specification sheet and foundation drawing for the 50mm radial drilling machine. What is the column diameter and spindle taper?',
    status: 'In Progress',
    internal_notes: 'Technical catalogue sent via email; awaiting foundation confirmation.',
    created_at: '2026-11-13T14:15:00Z',
  },
  {
    id: 'enq-103',
    customer_name: 'Vikramaditya Sharma',
    phone: '+91 98110 55432',
    email: 'vikram@sharmafoundry.in',
    subject: 'Double Column Planer 12ft requirement',
    message: 'We require a heavy double column planer for finishing surface plates up to 3000 mm length. Can Top Engineers manufacture this with an additional side tool head?',
    status: 'Resolved',
    internal_notes: 'Custom technical proposal and quotation provided directly from Batala works.',
    created_at: '2026-11-11T09:45:00Z',
  },
];

// Initial demonstration quote requests (orders)
export const INITIAL_ORDERS = [
  {
    id: 'ord-201',
    order_number: 'TE-REQ-2026-0042',
    customer_name: 'Gurpreet Singh',
    phone: '+91 98881 22334',
    email: 'gurpreet@singhengineers.com',
    billing_address: 'Plot 14, Focal Point, Ludhiana, Punjab 141010',
    delivery_address: 'Singh Engineering Works, Focal Point Phase 5, Ludhiana, Punjab 141010',
    notes: 'Please quote including delivery and transit insurance to Ludhiana.',
    status: 'New Request',
    internal_notes: 'New request received from customer; review available casting bed stock.',
    created_at: '2026-11-15T08:20:00Z',
    items: [
      {
        product_id: 'prod-1',
        product_name: 'Heavy Duty Lathe Machine',
        quantity: 1,
        unit_price: 345000,
      },
      {
        product_id: 'prod-7',
        product_name: 'Heavy Duty Radial Drilling Machine',
        quantity: 1,
        unit_price: 285000,
      },
    ],
  },
  {
    id: 'ord-202',
    order_number: 'TE-REQ-2026-0041',
    customer_name: 'Sunil Mehta',
    phone: '+91 98200 44556',
    email: 'sunil@mehtatooling.com',
    billing_address: 'GIDC Industrial Area, Rajkot, Gujarat 360002',
    delivery_address: 'Mehta Precision Tools, Shed C-18, GIDC, Rajkot, Gujarat 360002',
    notes: 'Need ISO 50 spindle taper on the Universal Milling Machine if available.',
    status: 'Quotation Sent',
    internal_notes: 'Formal quotation sent with transportation costs to Gujarat. Follow-up on Tuesday.',
    created_at: '2026-11-12T16:00:00Z',
    items: [
      {
        product_id: 'prod-5',
        product_name: 'Universal Milling Machine',
        quantity: 1,
        unit_price: 420000,
      },
      {
        product_id: 'prod-2',
        product_name: 'Extra Heavy Duty All Geared Lathe',
        quantity: 1,
        unit_price: null, // Price on Request
      },
    ],
  },
  {
    id: 'ord-203',
    order_number: 'TE-REQ-2026-0040',
    customer_name: 'Mohit Agarwal',
    phone: '+91 99350 77112',
    email: 'agarwal.fabricators@rediffmail.com',
    billing_address: 'Industrial Area, Kanpur, Uttar Pradesh 208001',
    delivery_address: 'Same as billing address',
    notes: 'Please confirm warranty and dispatch schedule.',
    status: 'Confirmed',
    internal_notes: 'Customer accepted quotation; manufacturing in progress at Batala workshop.',
    created_at: '2026-11-08T11:10:00Z',
    items: [
      {
        product_id: 'prod-11',
        product_name: 'Industrial Heavy Shaping Machine',
        quantity: 2,
        unit_price: 195000,
      },
    ],
  },
];

// Initial demonstration custom heavy machinery requests
export const INITIAL_CUSTOM_REQUESTS = [
  {
    id: 'cm-301',
    customer_name: 'Harpreet Dhillon',
    company_name: 'Dhillon Heavy Engineering',
    phone: '+91 98760 11223',
    email: 'dhillon@dhilloneng.com',
    machinery_type: 'Heavy Duty Extra Long Lathe',
    intended_application: 'Railway axle turning and large marine roll machining',
    dimensions_capacity: 'Bed Length: 24 Feet (7300 mm), Swing Over Bed: 1200 mm, Spindle Bore: 150 mm',
    technical_requirements: 'Dual saddle carriages, motorized rapid traverse for cross slide and carriage, hardened guide ways, 20 HP main motor.',
    quantity: 1,
    file_name: 'axle_shaft_specification_drawing.pdf',
    status: 'Under Review',
    internal_notes: 'Engineering team in Batala reviewing bed casting mold requirements.',
    created_at: '2026-11-14T11:45:00Z',
  },
  {
    id: 'cm-302',
    customer_name: 'Anil Deshmukh',
    company_name: 'Maharashtra Forgings Ltd.',
    phone: '+91 98220 99441',
    email: 'anil@mhforgings.co.in',
    machinery_type: 'Custom Double Column Plano Miller (SPM)',
    intended_application: 'Face milling of heavy forged die blocks',
    dimensions_capacity: 'Table width 1500 mm x length 4000 mm, vertical daylight 1600 mm',
    technical_requirements: 'Two independent vertical 15 HP milling heads with hydraulic counter-balance.',
    quantity: 1,
    file_name: 'die_block_machining_plan.dxf',
    status: 'Feasibility Check',
    internal_notes: 'Feasibility approved; calculating pattern making and casting costs.',
    created_at: '2026-11-10T15:20:00Z',
  },
];

// Initial demonstration site content
export const INITIAL_SITE_CONTENT = {
  hero: {
    eyebrow: 'PRECISION. STRENGTH. SINCE 1964.',
    title: 'Heavy Industrial Machinery & Precision Machine Tools',
    subtitle: 'Top Engineers manufactures and supplies heavy-duty lathe machines, radial drills, plano millers, and industrial workshop equipment from Batala, Punjab.',
  },
  custom_section: {
    title: 'Custom Heavy Machinery Built to Customer Requirements',
    subtitle: 'Need non-standard bed lengths, large spindle bores, or specialized machine tools? Our Batala works designs and manufactures custom machinery tailored to your workshop specifications.',
  },
  about: {
    overview: 'Top Engineers is an industrial machinery manufacturer, supplier and exporter based in Batala, Punjab, India. The firm specializes in heavy-duty metal turning, milling, shaping, and drilling machine tools.',
    heritage_note: 'Reported establishment in 1964 with six decades in Punjab’s historic machine tool cluster (to be formally confirmed by the business owner).',
  },
  contact: {
    address: '28-BF, Industrial Estate, Batala, Punjab 143505, India',
    disclaimer: 'Direct telephone numbers, official email addresses, and WhatsApp links will be verified with the business owner before publishing.',
  },
  gallery: {
    title: 'Workshop & Machinery Gallery',
    description: 'Illustrative local catalogue images; not verified photographs of Top Engineers or its facilities.',
  },
};

/**
 * LocalStorage Data Helper Functions
 */
export function getStoredData(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item);
  } catch (e) {
    console.error(`Error loading ${key} from localStorage:`, e);
    return fallback;
  }
}

export function setStoredData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage:`, e);
  }
}

export { STORAGE_KEYS };
