

export type EmailOrder = {
	id: string,
	showDeadline?: boolean,
	showPrice?: boolean,
	showStatus?: boolean,
	itemAmount: string,
	totalAmount: string,
	currency?: string,
	items: {
		title: string,
		status: string,
		subject?: string | null,
		deadline?: string | null,
		price?: string | null
	}[],
	showDelivery?: boolean,
	delivery?: {
		method: 'bring',
		address: string,
		estimatedDeliveryDate: string,
		amount: string,
		currency: string
	},
	showPayment?: boolean,
	payment: {
		total: string,
		currency: string,
		taxRate?: string,
		taxAmount?: string,
		payments?: {
			method: string,
			amount: string,
			cardInfo?: string,
			taxAmount: string,
			paymentId: string,
			status: string,
			creationTime: string
		}[]
	}
}