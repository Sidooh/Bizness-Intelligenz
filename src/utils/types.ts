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