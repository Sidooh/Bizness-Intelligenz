import { Model, Status } from "@nabcellent/sui-vue";
import { Initiator, TransactionType } from "@/utils/enums.ts";

export type Transaction = Model & {
    account_id: number
    product_id: number

    initiator: Initiator
    type: TransactionType
    amount: number
    charge: number
    status: Status
    description: string
    destination: string
}

export type Subscription = Model & {
    account_id: number
    start_date: string
    end_date: string
}