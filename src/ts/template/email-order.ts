

export type EmailOrder = {
	id: string,
	showDeadline?: boolean,
	showPrice?: boolean,
	amount: string,
	items: {
		title: string,
		status: string
		deadline?: string | null,
		price?: number | null,
	}[],
	showDelivery?: boolean,
	delivery?: {
		method: 'bring',
		address: string,
		estimatedDeliveryDate: string,
		price: string,
	},
	showPayments?: boolean,
	payments?: {
		type: string,
		amount: string,
		cardInfo?: string,
		currency: string,
		taxAmount: string,
		paymentId: string,
		status: string,
		creationTime: string
	}[]
}