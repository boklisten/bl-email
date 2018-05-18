

export type EmailOrder = {
	id: string,
	showDeadline?: boolean,
	showPrice?: boolean,
	itemAmount: string,
	totalAmount: string,
	items: {
		title: string,
		status: string
		deadline?: string | null,
		price?: string | null,
	}[],
	showDelivery?: boolean,
	delivery?: {
		method: 'bring',
		address: string,
		estimatedDeliveryDate: string,
		price: string,
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